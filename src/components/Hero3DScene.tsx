import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Trefoil Knot with Möbius Twist ── */
function SilkKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    // Parametric trefoil knot curve
    const points: THREE.Vector3[] = [];
    const segments = 300;

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;

      // Trefoil knot parametric equations
      const x = Math.sin(t) + 2 * Math.sin(2 * t);
      const y = Math.cos(t) - 2 * Math.cos(2 * t);
      const z = -Math.sin(3 * t);

      points.push(new THREE.Vector3(x * 0.22, y * 0.22, z * 0.22));
    }

    const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5);

    // Create tube with ribbon-like cross section (flattened)
    const tubeGeo = new THREE.TubeGeometry(curve, 256, 0.028, 12, true);

    // Flatten the tube into a ribbon by modifying normals direction
    const pos = tubeGeo.attributes.position;
    const normals = tubeGeo.attributes.normal;
    const count = pos.count;
    const radialSegments = 13; // 12 + 1
    const tubularSegments = 257; // 256 + 1

    for (let i = 0; i < tubularSegments; i++) {
      const t = (i / (tubularSegments - 1)) * Math.PI * 2;
      // Möbius twist: rotate the cross-section as we go along
      const twist = t * 1.5;

      for (let j = 0; j < radialSegments; j++) {
        const idx = i * radialSegments + j;
        if (idx >= count) continue;

        const angle = (j / (radialSegments - 1)) * Math.PI * 2;

        // Get point on curve
        const curvePoint = curve.getPointAt(i / (tubularSegments - 1));
        const tangent = curve.getTangentAt(i / (tubularSegments - 1));

        // Current position relative to curve center
        const px = pos.getX(idx) - curvePoint.x;
        const py = pos.getY(idx) - curvePoint.y;
        const pz = pos.getZ(idx) - curvePoint.z;

        // Flatten: reduce one dimension to create ribbon
        const flatFactor = Math.cos(angle + twist);
        const scale = 0.3 + 0.7 * Math.abs(flatFactor);

        pos.setX(idx, curvePoint.x + px * (1 + 0.3 * Math.sin(twist)));
        pos.setY(idx, curvePoint.y + py * scale);
        pos.setZ(idx, curvePoint.z + pz * (1 + 0.2 * Math.cos(twist)));
      }
    }

    pos.needsUpdate = true;
    tubeGeo.computeVertexNormals();
    return tubeGeo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.04;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} geometry={geometry} scale={0.85}>
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.7}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          sheen={1}
          sheenRoughness={0.3}
          sheenColor={new THREE.Color('#6633cc')}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 800]}
          reflectivity={1}
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

/* ── Subtle Particles ── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 40;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.6;
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
      <pointsMaterial size={0.006} color="#7755cc" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
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
      camera={{ position: [0, 0, 3.2], fov: 40 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      {/* Environment for reflections */}
      <Environment preset="night" />

      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, 2, -2]} intensity={1} color="#4466ff" distance={8} />
      <pointLight position={[3, -1, 3]} intensity={0.6} color="#6633cc" distance={8} />
      <pointLight position={[0, -2, 1]} intensity={0.3} color="#9944ff" distance={6} />

      <SilkKnot />
      <Particles />
      <CameraParallax />

      <EffectComposer>
        <Bloom intensity={0.45} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Canvas>
  </div>
);

export default Hero3DScene;
