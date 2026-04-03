import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Calligraphic logo monogram curve (IWA-style flowing script) ── */
function buildLogoCurve(): THREE.CatmullRomCurve3 {
  // Approximate the calligraphic monogram from the reference:
  // A flowing, interconnected cursive with large loops and elegant swirls
  const pts: THREE.Vector3[] = [];

  const add = (x: number, y: number, z: number) =>
    pts.push(new THREE.Vector3(x, y, z));

  // Large opening loop (left oval of the "I"/first letter)
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * Math.PI * 2;
    add(
      -0.55 + Math.cos(t) * 0.45,
      Math.sin(t) * 0.25,
      Math.sin(t * 0.5) * 0.08
    );
  }

  // Connecting swirl upward to center
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    add(
      -0.1 + t * 0.15,
      0.25 - t * 0.15 + Math.sin(t * Math.PI) * 0.2,
      t * 0.06
    );
  }

  // Central ascending loop (top of the monogram)
  for (let i = 0; i <= 30; i++) {
    const t = (i / 30) * Math.PI * 1.8;
    add(
      0.05 + Math.sin(t) * 0.2,
      0.3 + Math.cos(t) * 0.15 + Math.sin(t * 0.5) * 0.1,
      Math.cos(t * 0.7) * 0.1
    );
  }

  // Descending right stroke with flourish
  for (let i = 0; i <= 25; i++) {
    const t = i / 25;
    add(
      0.15 + t * 0.25,
      0.3 - t * 0.55,
      Math.sin(t * Math.PI) * 0.12
    );
  }

  // Lower right loop
  for (let i = 0; i <= 30; i++) {
    const t = (i / 30) * Math.PI * 1.6;
    add(
      0.4 + Math.cos(t) * 0.15,
      -0.25 + Math.sin(t) * 0.18,
      Math.sin(t * 0.8) * 0.07
    );
  }

  // Crossing back to center with undulating wave
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    add(
      0.3 - t * 0.35,
      -0.15 + t * 0.1 + Math.sin(t * Math.PI * 2) * 0.08,
      -0.05 + Math.sin(t * Math.PI) * 0.1
    );
  }

  // Lower left descending curl
  for (let i = 0; i <= 25; i++) {
    const t = (i / 25) * Math.PI * 1.4;
    add(
      -0.05 - Math.sin(t) * 0.2,
      -0.05 - t * 0.06,
      Math.cos(t) * 0.09
    );
  }

  // Final tail flourish sweeping left
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    add(
      -0.25 - t * 0.3,
      -0.3 + Math.sin(t * Math.PI) * 0.15,
      -0.05 + t * 0.08
    );
  }

  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.4);
}

/* ── Organic flowing ribbon (dissolved state) ── */
function buildOrganicCurve(): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  const N = 200;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    pts.push(new THREE.Vector3(
      (Math.sin(t * 1.3) * 0.7 + Math.sin(t * 3.1) * 0.2 + Math.cos(t * 0.7) * 0.3) * 0.5,
      (Math.cos(t * 0.9) * 0.4 + Math.sin(t * 2.3) * 0.25 - Math.cos(t * 1.7) * 0.15) * 0.5,
      (Math.sin(t * 1.7) * 0.35 + Math.cos(t * 2.9) * 0.2) * 0.5
    ));
  }
  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
}

/* ── Gold sphere accent ── */
function GoldSphere() {
  const ref = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!ref.current) return;
    // Orbit slowly around the ribbon
    const t = timeRef.current * 0.3;
    ref.current.position.set(
      Math.sin(t) * 0.35,
      Math.cos(t * 0.7) * 0.15 + 0.05,
      Math.cos(t) * 0.2
    );
  });

  return (
    <mesh ref={ref} scale={0.025}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#c9a84c"
        metalness={1}
        roughness={0.15}
        emissive="#8b7530"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

/* ── Main ribbon with logo morph ── */
function SilkRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const { logoCurve, organicCurve } = useMemo(() => ({
    logoCurve: buildLogoCurve(),
    organicCurve: buildOrganicCurve(),
  }), []);

  const { tubeGeo, logoPositions, organicPositions } = useMemo(() => {
    const logoTube = new THREE.TubeGeometry(logoCurve, 300, 0.032, 12, true);
    const organicTube = new THREE.TubeGeometry(organicCurve, 300, 0.032, 12, true);

    const count = logoTube.attributes.position.count;

    // Sample both tubes to same vertex count
    const sampleTube = (tube: THREE.TubeGeometry) => {
      const src = tube.attributes.position;
      const srcCount = src.count;
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const t = (i / (count - 1)) * (srcCount - 1);
        const idx = Math.floor(t);
        const f = t - idx;
        const next = Math.min(idx + 1, srcCount - 1);
        arr[i * 3] = src.getX(idx) * (1 - f) + src.getX(next) * f;
        arr[i * 3 + 1] = src.getY(idx) * (1 - f) + src.getY(next) * f;
        arr[i * 3 + 2] = src.getZ(idx) * (1 - f) + src.getZ(next) * f;
      }
      return arr;
    };

    const lp = sampleTube(logoTube);
    const op = sampleTube(organicTube);

    return { tubeGeo: logoTube, logoPositions: lp, organicPositions: op };
  }, [logoCurve, organicCurve]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!meshRef.current) return;

    // Gentle continuous rotation
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = Math.sin(timeRef.current * 0.12) * 0.04;

    // Morph cycle: 3s per state
    // logo(3s) → transition(1s) → organic(2s) → transition(1s) → logo...
    // Simplified: 6s total cycle
    const cycleDuration = 6;
    const time = timeRef.current % cycleDuration;

    // 0-2s: logo hold, 2-3s: dissolve, 3-5s: organic, 5-6s: recompose
    let morphT: number;
    if (time < 2) {
      morphT = 0; // logo
    } else if (time < 3) {
      const t = (time - 2); // 0→1
      morphT = t * t * (3 - 2 * t); // smoothstep to organic
    } else if (time < 5) {
      morphT = 1; // organic
    } else {
      const t = (time - 5); // 0→1
      morphT = 1 - t * t * (3 - 2 * t); // smoothstep back to logo
    }

    const positions = meshRef.current.geometry.attributes.position;
    const count = positions.count;

    // Add organic motion to dissolved state
    const drift = timeRef.current * 0.5;

    for (let i = 0; i < count; i++) {
      const lx = logoPositions[i * 3];
      const ly = logoPositions[i * 3 + 1];
      const lz = logoPositions[i * 3 + 2];

      // Add subtle turbulence to organic positions
      const phase = (i / count) * Math.PI * 4;
      const ox = organicPositions[i * 3] + Math.sin(drift + phase) * 0.03;
      const oy = organicPositions[i * 3 + 1] + Math.cos(drift * 0.7 + phase) * 0.02;
      const oz = organicPositions[i * 3 + 2] + Math.sin(drift * 1.3 + phase * 0.5) * 0.025;

      positions.setXYZ(
        i,
        lx * (1 - morphT) + ox * morphT,
        ly * (1 - morphT) + oy * morphT,
        lz * (1 - morphT) + oz * morphT
      );
    }
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <Float speed={0.4} rotationIntensity={0.03} floatIntensity={0.08}>
      <mesh ref={meshRef} geometry={tubeGeo} scale={1.1}>
        <meshPhysicalMaterial
          color="#0a0a18"
          metalness={0.85}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.03}
          sheen={1}
          sheenRoughness={0.2}
          sheenColor={new THREE.Color('#7733cc')}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 700]}
          reflectivity={1}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          envMapIntensity={2.5}
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
  <div className="absolute inset-0 -z-10 pointer-events-none" style={{ opacity: 0.8 }}>
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 2.5], fov: 42 }}
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
