import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      const s = 1 + Math.sin(t * 1.5) * 0.08;
      meshRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const gs = 1.8 + Math.sin(t * 0.8) * 0.3;
      glowRef.current.scale.setScalar(gs);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(t * 1.2) * 0.04;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color="#d4a574" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#d4a574" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();
    const convergeFactor = 0.3 + Math.sin(t * 0.5) * 0.15;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      let x = posAttr.getX(i) + velocities[ix];
      let y = posAttr.getY(i) + velocities[ix + 1];
      let z = posAttr.getZ(i) + velocities[ix + 2];
      // Pull toward center
      x += (0 - x) * convergeFactor * 0.008;
      y += (0 - y) * convergeFactor * 0.008;
      z += (0 - z) * convergeFactor * 0.008;
      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial color="#d4a574" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function OrbitalRings() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });
  return (
    <group ref={group}>
      {[1.2, 1.6, 2.1].map((r, i) => (
        <mesh key={i} rotation={[Math.PI * 0.3 * i, Math.PI * 0.2 * i, 0]}>
          <torusGeometry args={[r, 0.005, 8, 80]} />
          <meshBasicMaterial color="#d4a574" transparent opacity={0.1 + i * 0.03} />
        </mesh>
      ))}
    </group>
  );
}

const ScrollTransition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.7, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <div ref={ref} className="relative h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      <motion.div
        className="w-full h-full"
        style={{ opacity, scale, y }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <CoreOrb />
          <Particles />
          <OrbitalRings />
        </Canvas>
      </motion.div>

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212,165,116,0.06) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default ScrollTransition;
