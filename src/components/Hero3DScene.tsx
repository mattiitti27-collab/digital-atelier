import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Luxury silk ribbon — a dark, reflective flowing band
 * that slowly twists and catches golden light.
 */
const SilkRibbon = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const geometry = useMemo(() => {
    // Elegant flowing ribbon path — wide, soft curves
    const points = [
      new THREE.Vector3(-2.2, 0.8, 0),
      new THREE.Vector3(-1.2, 1.4, 0.8),
      new THREE.Vector3(-0.2, 0.6, -0.4),
      new THREE.Vector3(0.6, -0.3, 0.6),
      new THREE.Vector3(1.4, -1.0, -0.3),
      new THREE.Vector3(2.0, -0.2, 0.5),
      new THREE.Vector3(2.4, 0.8, -0.2),
      new THREE.Vector3(1.6, 1.6, 0.4),
      new THREE.Vector3(0.4, 1.8, -0.6),
      new THREE.Vector3(-0.8, 1.2, 0.3),
      new THREE.Vector3(-1.6, 0.2, -0.5),
      new THREE.Vector3(-2.2, 0.8, 0),
    ];

    const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.4);

    // Flat ribbon cross-section (wide and thin like silk)
    const ribbonShape = new THREE.Shape();
    ribbonShape.moveTo(-0.28, -0.012);
    ribbonShape.quadraticCurveTo(-0.28, 0.012, 0, 0.018);
    ribbonShape.quadraticCurveTo(0.28, 0.012, 0.28, -0.012);
    ribbonShape.quadraticCurveTo(0.28, -0.018, 0, -0.018);
    ribbonShape.quadraticCurveTo(-0.28, -0.018, -0.28, -0.012);

    return new THREE.ExtrudeGeometry(ribbonShape, {
      steps: 300,
      extrudePath: curve,
      bevelEnabled: false,
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.06;
      meshRef.current.rotation.x = Math.sin(t * 0.04) * 0.08;
      meshRef.current.rotation.z = Math.cos(t * 0.03) * 0.04;
    }
    if (materialRef.current) {
      // Subtle shifting reflectivity
      materialRef.current.envMapIntensity = 1.8 + Math.sin(t * 0.3) * 0.3;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} geometry={geometry} scale={1.3}>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#1a1612"
          metalness={0.85}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={1}
          envMapIntensity={2}
          sheen={0.8}
          sheenRoughness={0.3}
          sheenColor={new THREE.Color('#d4a574')}
        />
      </mesh>
    </Float>
  );
};

/**
 * Smoky glass orb — dark, semi-transparent sphere
 * with golden internal refraction.
 */
const SmokedGlassOrb = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.x = Math.sin(t * 0.15) * 0.6;
      ref.current.position.y = Math.cos(t * 0.12) * 0.4 + 0.2;
      ref.current.position.z = Math.sin(t * 0.1) * 0.3;
      ref.current.rotation.y = t * 0.08;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.35, 64, 64]} />
      <meshPhysicalMaterial
        color="#0d0b09"
        metalness={0.1}
        roughness={0.05}
        transmission={0.7}
        thickness={2.5}
        ior={2.0}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2.5}
        transparent
        opacity={0.9}
        attenuationColor={new THREE.Color('#d4a574')}
        attenuationDistance={1.5}
      />
    </mesh>
  );
};

/**
 * Small brushed-gold accent sphere orbiting gently.
 */
const GoldAccent = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.25;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * 1.8;
      ref.current.position.y = Math.sin(t * 0.8) * 0.6;
      ref.current.position.z = Math.sin(t * 0.6) * 0.4;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 32, 32]} />
      <meshStandardMaterial
        color="#d4a574"
        metalness={0.95}
        roughness={0.25}
        envMapIntensity={3}
      />
    </mesh>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" style={{ marginTop: '-4vh' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} color="#f5e6d3" />
        <directionalLight position={[5, 4, 6]} intensity={0.8} color="#f5e6d3" />
        <directionalLight position={[-4, -2, 3]} intensity={0.3} color="#d4a574" />
        <pointLight position={[0, 2, 4]} intensity={0.5} color="#d4a574" distance={12} decay={2} />
        <pointLight position={[-2, -1, 2]} intensity={0.2} color="#ffffff" distance={8} decay={2} />
        <Environment preset="city" />
        <SilkRibbon />
        <SmokedGlassOrb />
        <GoldAccent />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
