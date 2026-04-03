import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Ribbon that morphs: flowing silk → I → A → W → silk → repeat ── */
function SilkRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  // Build curves for each shape
  const curves = useMemo(() => {
    const makePoints = (fn: (t: number) => THREE.Vector3, n = 400) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= n; i++) pts.push(fn(i / n));
      return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
    };

    // Flowing silk ribbon (organic lemniscate)
    const silk = makePoints((p) => {
      const t = p * Math.PI * 2;
      return new THREE.Vector3(
        (Math.sin(t) * 1.6 + Math.sin(2 * t) * 0.5) * 0.3,
        (Math.cos(t) * 0.5 - Math.cos(3 * t) * 0.3) * 0.3,
        (Math.sin(2 * t) * 0.6 + Math.cos(t) * 0.25) * 0.3
      );
    });

    // "I" — tall vertical with slight curves for elegance
    const letterI = makePoints((p) => {
      const t = p * Math.PI * 2;
      const phase = t / (Math.PI * 2);
      // Draw an elongated loop that reads as "I"
      const x = Math.sin(t) * 0.08 + Math.sin(3 * t) * 0.03;
      const y = Math.sin(t) * 0.5;
      const z = Math.cos(t) * 0.15;
      return new THREE.Vector3(x * 0.9, y * 0.9, z * 0.4);
    });

    // "A" — triangular loop
    const letterA = makePoints((p) => {
      const t = p * Math.PI * 2;
      // Triangle with crossbar impression
      const seg = (t / (Math.PI * 2)) * 4;
      let x, y;
      if (seg < 1) { x = -0.3 + seg * 0.3; y = -0.45 + seg * 0.95; }
      else if (seg < 2) { x = 0.0 + (seg - 1) * 0.3; y = 0.5 - (seg - 1) * 0.95; }
      else if (seg < 3) { x = 0.3 - (seg - 2) * 0.15; y = -0.45 + (seg - 2) * 0.35; }
      else { x = 0.15 - (seg - 3) * 0.45; y = -0.1 - (seg - 3) * 0.35; }
      const z = Math.sin(t * 2) * 0.12;
      return new THREE.Vector3(x * 0.7, y * 0.6, z * 0.5);
    });

    // "W" — zigzag loop
    const letterW = makePoints((p) => {
      const t = p * Math.PI * 2;
      const seg = (t / (Math.PI * 2)) * 5;
      let x, y;
      if (seg < 1) { x = -0.4 + seg * 0.2; y = 0.45 - seg * 0.9; }
      else if (seg < 2) { x = -0.2 + (seg - 1) * 0.2; y = -0.45 + (seg - 1) * 0.55; }
      else if (seg < 3) { x = 0.0 + (seg - 2) * 0.2; y = 0.1 - (seg - 2) * 0.55; }
      else if (seg < 4) { x = 0.2 + (seg - 3) * 0.2; y = -0.45 + (seg - 3) * 0.9; }
      else { x = 0.4 - (seg - 4) * 0.8; y = 0.45 - (seg - 4) * 0.0; }
      const z = Math.sin(t * 1.5) * 0.15;
      return new THREE.Vector3(x * 0.65, y * 0.55, z * 0.5);
    });

    return [silk, letterI, letterA, letterW];
  }, []);

  // Create tube geometry from first curve (will be morphed)
  const { baseGeo, sampledArrays } = useMemo(() => {
    const vertCount = 3000; // fixed vertex budget

    const sampleCurve = (curve: THREE.CatmullRomCurve3) => {
      const tube = new THREE.TubeGeometry(curve, 250, 0.045, 8, true);
      const src = tube.attributes.position;
      const count = src.count;
      const out = new Float32Array(vertCount * 3);
      for (let i = 0; i < vertCount; i++) {
        const t = (i / (vertCount - 1)) * (count - 1);
        const idx = Math.floor(t);
        const f = t - idx;
        const next = Math.min(idx + 1, count - 1);
        out[i * 3] = src.getX(idx) * (1 - f) + src.getX(next) * f;
        out[i * 3 + 1] = src.getY(idx) * (1 - f) + src.getY(next) * f;
        out[i * 3 + 2] = src.getZ(idx) * (1 - f) + src.getZ(next) * f;
      }
      tube.dispose();
      return out;
    };

    const arrays = curves.map(sampleCurve);

    // Base geometry from first curve
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(arrays[0]);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    // Create simple indices for a line-based tube look
    const indices: number[] = [];
    for (let i = 0; i < vertCount - 1; i++) {
      indices.push(i, i + 1);
    }
    geo.setIndex(indices);

    return { baseGeo: geo, sampledArrays: arrays };
  }, [curves]);

  // Also create a proper tube for the mesh
  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curves[0], 250, 0.04, 8, true);
  }, [curves]);

  const sampledTubes = useMemo(() => {
    return curves.map((curve) => {
      const tube = new THREE.TubeGeometry(curve, 250, 0.04, 8, true);
      const src = tube.attributes.position;
      const count = src.count;
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3] = src.getX(i);
        arr[i * 3 + 1] = src.getY(i);
        arr[i * 3 + 2] = src.getZ(i);
      }
      return { arr, count };
    });
  }, [curves]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x = Math.sin(timeRef.current * 0.15) * 0.05;

    // Morph cycle: silk(3s) → I(3s) → silk(3s) → A(3s) → silk(3s) → W(3s)
    // Total cycle = 18s, each shape holds for 2s, transitions take 1s
    const cycleDuration = 3; // seconds per shape
    const totalCycle = cycleDuration * 4; // 4 shapes
    const time = timeRef.current % totalCycle;
    const shapeIndex = Math.floor(time / cycleDuration);
    const localT = (time % cycleDuration) / cycleDuration;

    // Hold shape for first 0.66, transition for last 0.33
    const holdRatio = 0.66;
    let morphT = 0;
    if (localT > holdRatio) {
      const transT = (localT - holdRatio) / (1 - holdRatio);
      morphT = transT * transT * (3 - 2 * transT); // smoothstep
    }

    const fromIdx = shapeIndex % 4;
    const toIdx = (shapeIndex + 1) % 4;

    const positions = meshRef.current.geometry.attributes.position;
    const count = positions.count;
    const from = sampledTubes[fromIdx];
    const to = sampledTubes[toIdx];

    if (from && to) {
      for (let i = 0; i < count; i++) {
        const fi = Math.min(i, from.count - 1);
        const ti = Math.min(i, to.count - 1);
        positions.setXYZ(
          i,
          from.arr[fi * 3] * (1 - morphT) + to.arr[ti * 3] * morphT,
          from.arr[fi * 3 + 1] * (1 - morphT) + to.arr[ti * 3 + 1] * morphT,
          from.arr[fi * 3 + 2] * (1 - morphT) + to.arr[ti * 3 + 2] * morphT
        );
      }
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.04} floatIntensity={0.1}>
      <mesh ref={meshRef} geometry={tubeGeo} scale={0.85}>
        <meshPhysicalMaterial
          color="#0a0a14"
          metalness={0.8}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.04}
          sheen={1}
          sheenRoughness={0.25}
          sheenColor={new THREE.Color('#5522aa')}
          iridescence={1}
          iridescenceIOR={1.4}
          iridescenceThicknessRange={[100, 600]}
          reflectivity={1}
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          envMapIntensity={2}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Particles ── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 30;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.9 + Math.random() * 0.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.004} color="#6644aa" transparent opacity={0.2} sizeAttenuation depthWrite={false} />
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
    target.current.x += (mouse.current.x * 0.08 - target.current.x) * 0.03;
    target.current.y += (-mouse.current.y * 0.06 - target.current.y) * 0.03;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

const Hero3DScene = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none" style={{ opacity: 0.7 }}>
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 3], fov: 42 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <Environment preset="night" />
      <ambientLight intensity={0.08} />
      <directionalLight position={[4, 3, 4]} intensity={0.4} />
      <pointLight position={[-3, 2, -2]} intensity={0.7} color="#4466ff" distance={7} />
      <pointLight position={[3, -1, 3]} intensity={0.4} color="#5522aa" distance={7} />

      <SilkRibbon />
      <Particles />
      <CameraParallax />

      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur />
        <Noise opacity={0.015} />
      </EffectComposer>
    </Canvas>
  </div>
);

export default Hero3DScene;
