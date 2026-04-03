import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Reflective Ring (anello elegante, logo-inspired) ── */
function ReflectiveRing() {
  const groupRef = useRef<THREE.Group>(null);

  const torusGeo = useMemo(() => new THREE.TorusGeometry(1.1, 0.025, 32, 128), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} scale={0.75}>
        {/* Main ring */}
        <mesh geometry={torusGeo}>
          <meshPhysicalMaterial
            color="#c0c0c0"
            metalness={1}
            roughness={0.05}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.02}
            envMapIntensity={2}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner ring — slightly smaller, tilted */}
        <mesh geometry={torusGeo} rotation={[Math.PI * 0.12, 0, Math.PI * 0.08]} scale={0.82}>
          <meshPhysicalMaterial
            color="#d4d4d8"
            metalness={1}
            roughness={0.08}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Thin accent ring */}
        <mesh rotation={[Math.PI * -0.06, Math.PI * 0.15, 0]} scale={0.95}>
          <torusGeometry args={[1.1, 0.012, 16, 128]} />
          <meshPhysicalMaterial
            color="#8899ff"
            metalness={1}
            roughness={0.1}
            emissive="#4466ff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Orbiting Particles (subtle) ── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#8899ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Camera Parallax ── */
function CameraParallax() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        mouse.current.x = (e.gamma / 45) * 0.5;
        mouse.current.y = (e.beta / 45 - 1) * 0.5;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.12 - target.current.x) * 0.04;
    target.current.y += (-mouse.current.y * 0.08 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Environment Map for reflections ── */
function EnvMap() {
  const { scene } = useThree();

  useMemo(() => {
    const pmremGenerator = new THREE.PMREMGenerator(
      new THREE.WebGLRenderer({ antialias: false })
    );
    // We don't have an HDR, so we create a simple gradient environment
    // The metalness + clearcoat will still give a nice reflective look
  }, []);

  return null;
}

/* ── Main Hero3D Scene ── */
const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4], fov: 40 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-2, 1.5, -1]} intensity={0.8} color="#4466ff" distance={8} />
        <pointLight position={[2, -1, 2]} intensity={0.5} color="#6633cc" distance={8} />

        <ReflectiveRing />
        <Particles />
        <CameraParallax />

        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
