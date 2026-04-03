import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useAtelierStore, MaterialType } from '@/stores/atelierStore';

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

function BrandText3D() {
  const brandName = useAtelierStore((s) => s.brandName);
  const material = useAtelierStore((s) => s.material);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const displayText = brandName || 'ATELIER';

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        <Center>
          <Text3D
            font="/fonts/inter_bold.json"
            size={0.5}
            height={0.15}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.01}
            bevelSegments={5}
            curveSegments={32}
          >
            {displayText}
            {getMaterial(material)}
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

function ModuleParticles() {
  const modules = useAtelierStore((s) => s.modules);
  const activeCount = modules.filter((m) => m.active).length;
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = activeCount * 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(Math.max(particleCount, 3) * 3);
    for (let i = 0; i < pos.length; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2;
      pos[i] = Math.cos(angle) * radius;
      pos[i + 1] = (Math.random() - 0.5) * 3;
      pos[i + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  if (activeCount === 0) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#d4a574"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <spotLight position={[5, 8, 5]} intensity={1.5} angle={0.3} penumbra={0.8} color="#ffffff" />
      <spotLight position={[-5, 5, -5]} intensity={0.8} angle={0.4} penumbra={1} color="#d4a574" />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#1a1a2e" />
      
      <Suspense fallback={null}>
        <BrandText3D />
        <ModuleParticles />
        <Environment preset="city" background={false} />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={8} blur={2.5} far={3} />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.8} />
        <Noise opacity={0.04} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

const AtelierScene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: '#050505' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default AtelierScene;
