import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

/* ── Silk Ribbon (Möbius-inspired abstract geometry) ── */
function SilkRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(-1, 1.2, 0.8),
        new THREE.Vector3(0, 0.3, -1),
        new THREE.Vector3(0.8, -0.8, 0.6),
        new THREE.Vector3(1.8, 0.5, -0.3),
        new THREE.Vector3(2.2, -0.2, 0.8),
      ],
      true, // closed
      'catmullrom',
      0.6
    );

    const frames = curve.computeFrenetFrames(200, true);
    const tubeGeo = new THREE.TubeGeometry(curve, 200, 0.08, 16, true);

    // Flatten it into a ribbon by scaling normals
    const positions = tubeGeo.attributes.position;
    const count = positions.count;
    const segCount = 201;
    const radialCount = 17;

    for (let i = 0; i < segCount; i++) {
      const t = i / (segCount - 1);
      // Add twist
      const twist = t * Math.PI * 2;
      for (let j = 0; j < radialCount; j++) {
        const idx = i * radialCount + j;
        if (idx < count) {
          const angle = (j / (radialCount - 1)) * Math.PI * 2 + twist;
          const px = positions.getX(idx);
          const py = positions.getY(idx);
          const pz = positions.getZ(idx);
          // Flatten along one axis to make ribbon-like
          positions.setY(idx, py + Math.sin(angle) * 0.02);
        }
      }
    }

    positions.needsUpdate = true;
    tubeGeo.computeVertexNormals();
    return tubeGeo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} scale={1.2}>
        <meshStandardMaterial
          ref={materialRef}
          color="#ffffff"
          emissive="#4466ff"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.9}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

/* ── Orbiting Particles ── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#8899ff"
        transparent
        opacity={0.6}
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
    target.current.x += (mouse.current.x * 0.15 - target.current.x) * 0.05;
    target.current.y += (-mouse.current.y * 0.1 - target.current.y) * 0.05;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Main Hero3D Scene ── */
const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 3, 5]} intensity={0.4} color="#ffffff" />
        <pointLight position={[-3, 2, -2]} intensity={1.2} color="#4466ff" distance={12} />
        <pointLight position={[3, -1, 3]} intensity={0.8} color="#6633cc" distance={10} />
        <pointLight position={[0, 3, 0]} intensity={0.3} color="#ffffff" distance={8} />

        <SilkRibbon />
        <Particles />
        <CameraParallax />

        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Noise opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
