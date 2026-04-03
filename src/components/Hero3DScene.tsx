import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Fluid Ribbon that morphs through I → M → A ── */
function FluidRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  // Define letter paths as smooth curves
  const letterCurves = useMemo(() => {
    // "I" shape as a flowing ribbon path
    const iPoints = [
      new THREE.Vector3(-0.15, 0.5, 0),
      new THREE.Vector3(0.15, 0.5, 0.05),
      new THREE.Vector3(0.05, 0.45, -0.05),
      new THREE.Vector3(0.0, 0.2, 0.08),
      new THREE.Vector3(0.0, 0.0, -0.06),
      new THREE.Vector3(0.0, -0.2, 0.08),
      new THREE.Vector3(-0.05, -0.45, -0.05),
      new THREE.Vector3(-0.15, -0.5, 0.03),
      new THREE.Vector3(0.15, -0.5, 0),
    ];

    // "M" shape as flowing ribbon
    const mPoints = [
      new THREE.Vector3(-0.4, -0.5, 0),
      new THREE.Vector3(-0.38, 0.0, 0.1),
      new THREE.Vector3(-0.35, 0.45, -0.05),
      new THREE.Vector3(-0.2, 0.5, 0.08),
      new THREE.Vector3(-0.05, 0.1, -0.06),
      new THREE.Vector3(0.0, -0.1, 0.1),
      new THREE.Vector3(0.05, 0.1, -0.06),
      new THREE.Vector3(0.2, 0.5, 0.08),
      new THREE.Vector3(0.35, 0.45, -0.05),
      new THREE.Vector3(0.38, 0.0, 0.1),
      new THREE.Vector3(0.4, -0.5, 0),
    ];

    // "A" shape as flowing ribbon
    const aPoints = [
      new THREE.Vector3(-0.35, -0.5, 0),
      new THREE.Vector3(-0.25, -0.15, 0.08),
      new THREE.Vector3(-0.18, 0.05, -0.05),
      new THREE.Vector3(-0.15, 0.1, 0.03),
      new THREE.Vector3(0.15, 0.1, -0.03),
      new THREE.Vector3(0.18, 0.05, 0.05),
      new THREE.Vector3(0.12, 0.2, -0.06),
      new THREE.Vector3(0.0, 0.5, 0.1),
      new THREE.Vector3(-0.12, 0.2, -0.06),
      new THREE.Vector3(-0.18, 0.05, 0.05),
      new THREE.Vector3(-0.15, 0.1, -0.03),
      new THREE.Vector3(0.15, 0.1, 0.03),
      new THREE.Vector3(0.18, 0.05, -0.05),
      new THREE.Vector3(0.25, -0.15, 0.08),
      new THREE.Vector3(0.35, -0.5, 0),
    ];

    return {
      i: new THREE.CatmullRomCurve3(iPoints, false, 'catmullrom', 0.5),
      m: new THREE.CatmullRomCurve3(mPoints, false, 'catmullrom', 0.5),
      a: new THREE.CatmullRomCurve3(aPoints, false, 'catmullrom', 0.5),
    };
  }, []);

  // Create tube geometries for each letter
  const tubeGeometries = useMemo(() => ({
    i: new THREE.TubeGeometry(letterCurves.i, 80, 0.022, 12, false),
    m: new THREE.TubeGeometry(letterCurves.m, 100, 0.022, 12, false),
    a: new THREE.TubeGeometry(letterCurves.a, 120, 0.022, 12, false),
  }), [letterCurves]);

  // Morphing: interpolate between geometries
  const maxVertices = useMemo(() => {
    return Math.max(
      tubeGeometries.i.attributes.position.count,
      tubeGeometries.m.attributes.position.count,
      tubeGeometries.a.attributes.position.count
    );
  }, [tubeGeometries]);

  // Resample geometries to same vertex count for morphing
  const sampledPositions = useMemo(() => {
    const resample = (geo: THREE.TubeGeometry, target: number) => {
      const src = geo.attributes.position;
      const count = src.count;
      const out = new Float32Array(target * 3);
      for (let i = 0; i < target; i++) {
        const t = (i / (target - 1)) * (count - 1);
        const idx = Math.floor(t);
        const frac = t - idx;
        const next = Math.min(idx + 1, count - 1);
        out[i * 3] = src.getX(idx) * (1 - frac) + src.getX(next) * frac;
        out[i * 3 + 1] = src.getY(idx) * (1 - frac) + src.getY(next) * frac;
        out[i * 3 + 2] = src.getZ(idx) * (1 - frac) + src.getZ(next) * frac;
      }
      return out;
    };
    return {
      i: resample(tubeGeometries.i, maxVertices),
      m: resample(tubeGeometries.m, maxVertices),
      a: resample(tubeGeometries.a, maxVertices),
    };
  }, [tubeGeometries, maxVertices]);

  // Use the M geometry as base (most vertices)
  const geometry = useMemo(() => {
    const geo = tubeGeometries.m.clone();
    // Ensure we have enough vertices
    return geo;
  }, [tubeGeometries]);

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPos.xyz;
      gl_Position = projectionMatrix * mvPos;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // Fresnel / rim light effect
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
      
      // Base silver color
      vec3 baseColor = vec3(0.78, 0.78, 0.82);
      // Blue accent
      vec3 accent = vec3(0.35, 0.45, 0.95);
      
      vec3 color = mix(baseColor, accent, fresnel * 0.6);
      
      // Subtle shimmer
      float shimmer = sin(vUv.x * 40.0 + uTime * 2.0) * 0.03 + 0.97;
      color *= shimmer;
      
      // Add rim glow
      color += accent * fresnel * 0.4;
      
      float alpha = 0.28 + fresnel * 0.15;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state, delta) => {
    timeRef.current += delta;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
    }

    if (meshRef.current) {
      // Slow elegant rotation
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(timeRef.current * 0.25) * 0.08;
      meshRef.current.rotation.z = Math.cos(timeRef.current * 0.18) * 0.04;

      // Morph between letters
      const cycle = (timeRef.current * 0.15) % 3; // each letter ~6.6s
      const phase = Math.floor(cycle);
      const t = cycle - phase;
      // Smooth step for transition
      const smooth = t < 0.7 ? 0 : (t - 0.7) / 0.3;
      const eased = smooth * smooth * (3 - 2 * smooth);

      const positions = meshRef.current.geometry.attributes.position;
      const count = positions.count;

      const letters = [sampledPositions.i, sampledPositions.m, sampledPositions.a];
      const from = letters[phase % 3];
      const to = letters[(phase + 1) % 3];

      if (from && to) {
        for (let i = 0; i < count; i++) {
          const fi = Math.min(i, from.length / 3 - 1);
          const ti = Math.min(i, to.length / 3 - 1);
          const x = from[fi * 3] * (1 - eased) + to[ti * 3] * eased;
          const y = from[fi * 3 + 1] * (1 - eased) + to[ti * 3 + 1] * eased;
          const z = from[fi * 3 + 2] * (1 - eased) + to[ti * 3 + 2] * eased;
          positions.setXYZ(i, x, y, z);
        }
        positions.needsUpdate = true;
        meshRef.current.geometry.computeVertexNormals();
      }
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.15}>
      <mesh ref={meshRef} geometry={geometry} scale={0.7}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

/* ── Subtle Particles ── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 35;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.0 + Math.random() * 0.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.005} color="#8899ff" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Camera Parallax ── */
function CameraParallax() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onGyro = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        mouse.current.x = (e.gamma / 45) * 0.5;
        mouse.current.y = (e.beta / 45 - 1) * 0.5;
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('deviceorientation', onGyro);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('deviceorientation', onGyro);
    };
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.1 - target.current.x) * 0.04;
    target.current.y += (-mouse.current.y * 0.07 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

const Hero3DScene = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none">
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 3], fov: 40 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[4, 3, 4]} intensity={0.5} />
      <pointLight position={[-2, 1.5, -1]} intensity={0.6} color="#4466ff" distance={6} />
      <pointLight position={[2, -1, 2]} intensity={0.35} color="#6633cc" distance={6} />

      <FluidRibbon />
      <Particles />
      <CameraParallax />

      <EffectComposer>
        <Bloom intensity={0.35} luminanceThreshold={0.4} luminanceSmoothing={0.9} mipmapBlur />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Canvas>
  </div>
);

export default Hero3DScene;
