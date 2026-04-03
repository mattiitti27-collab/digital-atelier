import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Logo curve: exact calligraphic monogram from reference ── */
function buildLogoCurve(): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  const s = 0.9;
  const p = (x: number, y: number, z: number) =>
    pts.push(new THREE.Vector3(x * s, y * s, z * s));

  // Large outer oval (left)
  p(0.05, 0.38, 0.0);
  p(-0.05, 0.42, 0.02);
  p(-0.18, 0.43, 0.04);
  p(-0.32, 0.40, 0.05);
  p(-0.48, 0.32, 0.04);
  p(-0.58, 0.20, 0.02);
  p(-0.64, 0.05, 0.0);
  p(-0.62, -0.10, -0.02);
  p(-0.55, -0.20, -0.03);
  p(-0.42, -0.25, -0.02);
  p(-0.28, -0.22, -0.01);
  p(-0.15, -0.12, 0.0);

  // Central ascending stroke
  p(-0.08, 0.0, 0.03);
  p(-0.04, 0.12, 0.05);
  p(-0.02, 0.22, 0.06);
  p(0.0, 0.32, 0.04);
  p(0.03, 0.38, 0.02);

  // Upper right loop
  p(0.10, 0.42, 0.0);
  p(0.20, 0.40, -0.02);
  p(0.30, 0.34, -0.04);
  p(0.38, 0.25, -0.05);
  p(0.40, 0.15, -0.04);
  p(0.36, 0.06, -0.02);
  p(0.28, 0.0, 0.0);

  // Crossing back, descending
  p(0.18, -0.04, 0.03);
  p(0.08, -0.06, 0.05);
  p(0.0, -0.10, 0.04);
  p(-0.06, -0.18, 0.03);

  // Lower left curl
  p(-0.10, -0.28, 0.02);
  p(-0.14, -0.38, 0.0);
  p(-0.12, -0.45, -0.02);
  p(-0.06, -0.48, -0.03);
  p(0.0, -0.44, -0.02);
  p(0.04, -0.36, 0.0);
  p(0.06, -0.26, 0.02);

  // Lower right curl
  p(0.10, -0.20, 0.04);
  p(0.16, -0.18, 0.05);
  p(0.22, -0.24, 0.04);
  p(0.24, -0.34, 0.02);
  p(0.22, -0.42, 0.0);
  p(0.16, -0.46, -0.02);
  p(0.10, -0.42, -0.03);
  p(0.12, -0.34, -0.02);

  // Right tail with spiral
  p(0.18, -0.26, 0.0);
  p(0.28, -0.20, 0.02);
  p(0.38, -0.16, 0.03);
  p(0.48, -0.14, 0.02);
  p(0.52, -0.10, 0.0);
  p(0.50, -0.06, -0.02);
  p(0.44, -0.04, -0.03);
  p(0.38, -0.06, -0.02);
  p(0.34, -0.10, 0.0);

  // Return to start
  p(0.28, -0.04, 0.02);
  p(0.22, 0.06, 0.04);
  p(0.16, 0.18, 0.05);
  p(0.12, 0.28, 0.04);
  p(0.08, 0.35, 0.02);

  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.35);
}

/* ── Gold sphere ── */
function GoldSphere() {
  const ref = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!ref.current) return;
    const t = timeRef.current * 0.25;
    ref.current.position.set(
      -0.35 * 0.9 + Math.sin(t) * 0.02,
      0.05 * 0.9 + Math.cos(t * 0.7) * 0.015,
      Math.sin(t * 1.3) * 0.02
    );
  });

  return (
    <mesh ref={ref} scale={0.035}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#c9a84c"
        metalness={1}
        roughness={0.12}
        emissive="#8b7530"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

/* ── Static logo ribbon – only floats and rotates gently ── */
function SilkRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);

  const logoCurve = useMemo(() => buildLogoCurve(), []);
  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(logoCurve, 350, 0.028, 14, true),
    [logoCurve]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle slow rotation
    meshRef.current.rotation.y = Math.sin(t * 0.15) * 0.25;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    meshRef.current.rotation.z = Math.cos(t * 0.12) * 0.03;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.08}>
      <mesh ref={meshRef} geometry={tubeGeo} scale={1.0}>
        <meshPhysicalMaterial
          color="#0a0a18"
          metalness={0.88}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.03}
          sheen={1}
          sheenRoughness={0.18}
          sheenColor={new THREE.Color('#7733cc')}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 700]}
          reflectivity={1}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          envMapIntensity={2.8}
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
  <div className="absolute inset-0 -z-10 pointer-events-none" style={{ opacity: 0.85 }}>
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 2.2], fov: 42 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <Environment preset="night" />
      <ambientLight intensity={0.1} />
      <directionalLight position={[4, 3, 4]} intensity={0.5} />
      <pointLight position={[-3, 2, -2]} intensity={0.8} color="#4466ff" distance={7} />
      <pointLight position={[3, -1, 3]} intensity={0.5} color="#7733cc" distance={7} />

      <SilkRibbon />
      <GoldSphere />
      <Particles />
      <CameraParallax />

      <EffectComposer>
        <Bloom intensity={0.35} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
        <Noise opacity={0.012} />
      </EffectComposer>
    </Canvas>
  </div>
);

export default Hero3DScene;
