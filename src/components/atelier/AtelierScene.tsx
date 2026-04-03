import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useAtelierStore, MaterialType, palettes } from '@/stores/atelierStore';

function getMaterial(type: MaterialType) {
  switch (type) {
    case 'obsidian':
      return <meshPhysicalMaterial color="#0a0a0a" metalness={0.9} roughness={0.05} clearcoat={1} clearcoatRoughness={0.1} reflectivity={1} envMapIntensity={2} />;
    case 'frosted-glass':
      return <meshPhysicalMaterial color="#ffffff" metalness={0} roughness={0.15} transmission={0.9} thickness={0.5} ior={1.5} transparent opacity={0.7} envMapIntensity={1.5} />;
    case 'gold':
      return <meshPhysicalMaterial color="#d4a574" metalness={1} roughness={0.15} clearcoat={0.5} clearcoatRoughness={0.2} envMapIntensity={2.5} />;
    case 'marble':
      return <meshPhysicalMaterial color="#f0ede8" metalness={0.05} roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.15} envMapIntensity={1.2} />;
    case 'carbon':
      return <meshPhysicalMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1.8} />;
    case 'holographic':
      return <meshPhysicalMaterial color="#c084fc" metalness={0.3} roughness={0.1} clearcoat={1} clearcoatRoughness={0.05} iridescence={1} iridescenceIOR={1.3} envMapIntensity={3} />;
  }
}

// ─── Floating Device / Site Preview Card ───
function FloatingDevice() {
  const groupRef = useRef<THREE.Group>(null);
  const brandName = useAtelierStore((s) => s.brandName);
  const palette = useAtelierStore((s) => s.palette);
  const material = useAtelierStore((s) => s.material);

  const paletteColors = palettes.find((p) => p.id === palette)?.colors || palettes[0].colors;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef}>
        {/* Device Frame — like a floating MacBook/iPad screen */}
        <RoundedBox args={[2.8, 1.7, 0.04]} radius={0.04} smoothness={8} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#111111"
            metalness={0.95}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* Screen surface */}
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[2.6, 1.5]} />
          <meshPhysicalMaterial
            color={paletteColors[0]}
            metalness={0.1}
            roughness={0.8}
            envMapIntensity={0.3}
          />
        </mesh>

        {/* Nav bar mockup */}
        <mesh position={[0, 0.62, 0.022]}>
          <planeGeometry args={[2.5, 0.06]} />
          <meshBasicMaterial color={paletteColors[2]} transparent opacity={0.5} />
        </mesh>

        {/* Hero text area */}
        <mesh position={[-0.5, 0.2, 0.022]}>
          <planeGeometry args={[1.2, 0.04]} />
          <meshBasicMaterial color={paletteColors[4]} transparent opacity={0.7} />
        </mesh>
        <mesh position={[-0.65, 0.1, 0.022]}>
          <planeGeometry args={[0.9, 0.025]} />
          <meshBasicMaterial color={paletteColors[3]} transparent opacity={0.4} />
        </mesh>
        <mesh position={[-0.75, 0.0, 0.022]}>
          <planeGeometry args={[0.7, 0.025]} />
          <meshBasicMaterial color={paletteColors[3]} transparent opacity={0.25} />
        </mesh>

        {/* CTA button mockup */}
        <RoundedBox args={[0.5, 0.1, 0.005]} radius={0.02} smoothness={4} position={[-0.65, -0.12, 0.022]}>
          <meshBasicMaterial color={paletteColors[3]} transparent opacity={0.6} />
        </RoundedBox>

        {/* Image placeholder on right */}
        <RoundedBox args={[0.8, 0.7, 0.005]} radius={0.02} smoothness={4} position={[0.8, 0.05, 0.022]}>
          <meshPhysicalMaterial color={paletteColors[1]} metalness={0.2} roughness={0.6} />
        </RoundedBox>

        {/* Bottom grid cards */}
        {[-0.85, -0.15, 0.55].map((x, i) => (
          <RoundedBox key={i} args={[0.6, 0.35, 0.005]} radius={0.015} smoothness={4} position={[x, -0.45, 0.022]}>
            <meshPhysicalMaterial color={paletteColors[i === 1 ? 2 : 1]} metalness={0.1} roughness={0.7} transparent opacity={0.4} />
          </RoundedBox>
        ))}

        {/* Screen reflection/gloss overlay */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[2.6, 1.5]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.03}
            color="#ffffff"
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Brand Text 3D ───
function BrandText3D() {
  const brandName = useAtelierStore((s) => s.brandName);
  const material = useAtelierStore((s) => s.material);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  if (!brandName) return null;

  return (
    <group ref={groupRef} position={[0, 1.4, 0]}>
      <Center>
        <Text3D
          font="/fonts/inter_bold.json"
          size={0.2}
          height={0.06}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.005}
          bevelSegments={3}
          curveSegments={16}
        >
          {brandName}
          {getMaterial(material)}
        </Text3D>
      </Center>
    </group>
  );
}

// ─── Module Particles ───
function ModuleParticles() {
  const modules = useAtelierStore((s) => s.modules);
  const activeCount = modules.filter((m) => m.active).length;
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = activeCount * 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(Math.max(particleCount, 3) * 3);
    for (let i = 0; i < pos.length; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 2.5;
      pos[i] = Math.cos(angle) * radius;
      pos[i + 1] = (Math.random() - 0.5) * 3;
      pos[i + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  if (activeCount === 0) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#d4a574" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ─── Physical Spotlight Fixture ───
function SpotlightFixture({ position, target = [0, 0, 0], color = '#fff5e6', intensity = 2.5 }: {
  position: [number, number, number];
  target?: [number, number, number];
  color?: string;
  intensity?: number;
}) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetObj = useMemo(() => {
    const t = new THREE.Object3D();
    t.position.set(...target);
    return t;
  }, [target]);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.target = targetObj;
    }
  });

  // Direction from position to target for fixture rotation
  const dir = useMemo(() => {
    const d = new THREE.Vector3(...target).sub(new THREE.Vector3(...position)).normalize();
    return d;
  }, [position, target]);

  const rotation = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir);
    const e = new THREE.Euler().setFromQuaternion(q);
    return [e.x, e.y, e.z] as [number, number, number];
  }, [dir]);

  return (
    <group position={position}>
      {/* Fixture body — black metal cylinder */}
      <group rotation={rotation}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.18, 0.4, 12]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Barn door rim */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.19, 0.2, 0.06, 12]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.2} />
        </mesh>
        {/* Inner glow lens */}
        <mesh position={[0, -0.24, 0]}>
          <circleGeometry args={[0.14, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Mounting arm */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Clamp */}
      <mesh position={[0, 0.48, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial color="#222222" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Actual spotlight */}
      <spotLight
        ref={lightRef}
        intensity={intensity}
        angle={0.4}
        penumbra={0.8}
        color={color}
        castShadow
        shadow-mapSize={1024}
        distance={15}
      />
      <primitive object={targetObj} />
    </group>
  );
}

// ─── Cinema Rig (visible fixtures + lights) ───
function CinemaRig() {
  return (
    <>
      {/* Front-left key light — visible in frame */}
      <SpotlightFixture position={[-2.2, 2, 2]} target={[0, 0, 0]} color="#fff5e6" intensity={3} />
      {/* Front-right fill */}
      <SpotlightFixture position={[2.2, 2, 2]} target={[0, 0, 0]} color="#d4e5ff" intensity={1.8} />
      {/* Back-left rim */}
      <SpotlightFixture position={[-2.5, 2.2, -2]} target={[0, 0, 0]} color="#d4a574" intensity={2} />
      {/* Back-right rim */}
      <SpotlightFixture position={[2.5, 2.2, -2]} target={[0, 0, 0]} color="#d4a574" intensity={2} />
      {/* Top center — hero spot */}
      <SpotlightFixture position={[0, 3.2, 0.5]} target={[0, 0, 0]} color="#ffffff" intensity={2.5} />
      {/* Low side accents — on floor level */}
      <SpotlightFixture position={[-3, 0.5, 0]} target={[0, 0, 0]} color="#c084fc" intensity={0.8} />
      <SpotlightFixture position={[3, 0.5, 0]} target={[0, 0, 0]} color="#c084fc" intensity={0.8} />

      {/* Ceiling truss — lower to be visible */}
      {[-2, 0, 2].map((z) => (
        <mesh key={z} position={[0, 3, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 7, 6]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {[-3, -1.5, 0, 1.5, 3].map((x) => (
        <mesh key={x} position={[x, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 4.5, 6]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* Floor bounce */}
      <pointLight position={[0, -2, 0]} intensity={0.1} color="#1a1a2e" />
      <ambientLight intensity={0.04} />
    </>
  );
}

// ─── Dark Room Floor ───
function DarkRoomFloor() {
  return (
    <>
      {/* Reflective dark floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial
          color="#050505"
          metalness={0.85}
          roughness={0.1}
          envMapIntensity={0.6}
        />
      </mesh>
      {/* Back wall — barely visible */}
      <mesh position={[0, 1.5, -5]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#030303" metalness={0.2} roughness={0.9} />
      </mesh>
      <ContactShadows position={[0, -1.29, 0]} opacity={0.7} scale={12} blur={2.5} far={5} />
    </>
  );
}

function SceneContent() {
  return (
    <>
      <CinemaRig />

      <Suspense fallback={null}>
        <FloatingDevice />
        <BrandText3D />
        <ModuleParticles />
        <DarkRoomFloor />
        <Environment preset="city" background={false} />
      </Suspense>

      <EffectComposer>
        <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} />
        <Noise opacity={0.035} />
        <Vignette eskil={false} offset={0.15} darkness={0.9} />
      </EffectComposer>
    </>
  );
}

const AtelierScene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 0.8, 5.5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: '#020202' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default AtelierScene;
