import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const RibbonKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.5, 1, 0.8),
        new THREE.Vector3(2.5, 0.3, -0.5),
        new THREE.Vector3(1.8, -1.2, 0.6),
        new THREE.Vector3(0, -1.5, -0.3),
        new THREE.Vector3(-1.8, -1.2, 0.8),
        new THREE.Vector3(-2.5, 0.3, -0.6),
        new THREE.Vector3(-1.5, 1, 0.5),
        new THREE.Vector3(-0.5, 1.8, -0.4),
        new THREE.Vector3(0.8, 2, 0.3),
        new THREE.Vector3(1.5, 1.2, -0.8),
        new THREE.Vector3(0.5, -0.2, -1),
        new THREE.Vector3(-0.8, -0.8, 0.5),
        new THREE.Vector3(-1.2, 0.5, 1),
        new THREE.Vector3(0, 0, 0),
      ],
      true,
      'catmullrom',
      0.5
    );
    return new THREE.TubeGeometry(curve, 200, 0.08, 12, true);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.iridescenceIOR = 1.3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} scale={1.1}>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#6a3d99"
          metalness={0.2}
          roughness={0.15}
          transmission={0.6}
          thickness={1.5}
          ior={1.5}
          iridescence={1}
          iridescenceIOR={1.3}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
};

const GoldSphere = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * 0.4;
      ref.current.position.x = Math.cos(t) * 1.2;
      ref.current.position.y = Math.sin(t * 1.3) * 0.8;
      ref.current.position.z = Math.sin(t * 0.7) * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.12, 32, 32]} />
      <meshStandardMaterial color="#d4a574" metalness={0.9} roughness={0.1} />
    </mesh>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" style={{ marginTop: '-4vh' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -2, 4]} intensity={0.5} color="#7733cc" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#d4a574" />
        <RibbonKnot />
        <GoldSphere />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
