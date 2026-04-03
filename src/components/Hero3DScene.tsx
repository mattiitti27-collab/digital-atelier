import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Letter shape builders (return arrays of Vector2 paths for extrusion) ── */
function createLetterI(): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  const w = 0.08; // stroke width

  // Vertical bar
  const bar = new THREE.Shape();
  bar.moveTo(-w, -0.5);
  bar.lineTo(w, -0.5);
  bar.lineTo(w, 0.5);
  bar.lineTo(-w, 0.5);
  bar.closePath();
  shapes.push(bar);

  // Top serif
  const top = new THREE.Shape();
  top.moveTo(-0.18, 0.42);
  top.lineTo(0.18, 0.42);
  top.lineTo(0.18, 0.5);
  top.lineTo(-0.18, 0.5);
  top.closePath();
  shapes.push(top);

  // Bottom serif
  const bot = new THREE.Shape();
  bot.moveTo(-0.18, -0.5);
  bot.lineTo(0.18, -0.5);
  bot.lineTo(0.18, -0.42);
  bot.lineTo(-0.18, -0.42);
  bot.closePath();
  shapes.push(bot);

  return shapes;
}

function createLetterM(): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  const w = 0.07;

  // Left vertical
  const left = new THREE.Shape();
  left.moveTo(-0.35, -0.5);
  left.lineTo(-0.35 + w * 2, -0.5);
  left.lineTo(-0.35 + w * 2, 0.5);
  left.lineTo(-0.35, 0.5);
  left.closePath();
  shapes.push(left);

  // Left diagonal
  const ld = new THREE.Shape();
  ld.moveTo(-0.35, 0.5);
  ld.lineTo(-0.35 + w * 2, 0.5);
  ld.lineTo(0 + w, -0.05);
  ld.lineTo(0 - w, -0.05);
  ld.closePath();
  shapes.push(ld);

  // Right diagonal
  const rd = new THREE.Shape();
  rd.moveTo(0 - w, -0.05);
  rd.lineTo(0 + w, -0.05);
  rd.lineTo(0.35, 0.5);
  rd.lineTo(0.35 - w * 2, 0.5);
  rd.closePath();
  shapes.push(rd);

  // Right vertical
  const right = new THREE.Shape();
  right.moveTo(0.35 - w * 2, -0.5);
  right.lineTo(0.35, -0.5);
  right.lineTo(0.35, 0.5);
  right.lineTo(0.35 - w * 2, 0.5);
  right.closePath();
  shapes.push(right);

  return shapes;
}

function createLetterA(): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  const w = 0.07;

  // Left leg
  const ll = new THREE.Shape();
  ll.moveTo(-0.3, -0.5);
  ll.lineTo(-0.3 + w * 2, -0.5);
  ll.lineTo(0 + w, 0.5);
  ll.lineTo(0 - w, 0.5);
  ll.closePath();
  shapes.push(ll);

  // Right leg
  const rl = new THREE.Shape();
  rl.moveTo(0.3 - w * 2, -0.5);
  rl.lineTo(0.3, -0.5);
  rl.lineTo(0 + w, 0.5);
  rl.lineTo(0 - w, 0.5);
  rl.closePath();
  shapes.push(rl);

  // Crossbar
  const cb = new THREE.Shape();
  cb.moveTo(-0.16, -0.05);
  cb.lineTo(0.16, -0.05);
  cb.lineTo(0.16, 0.03);
  cb.lineTo(-0.16, 0.03);
  cb.closePath();
  shapes.push(cb);

  return shapes;
}

/* ── Anamorphic Letter Sculpture ── */
function AnamorphicSculpture() {
  const groupRef = useRef<THREE.Group>(null);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.01,
    bevelEnabled: false,
  };

  const letterI = useMemo(() => {
    const shapes = createLetterI();
    return shapes.map((s) => new THREE.ExtrudeGeometry(s, extrudeSettings));
  }, []);

  const letterM = useMemo(() => {
    const shapes = createLetterM();
    return shapes.map((s) => new THREE.ExtrudeGeometry(s, extrudeSettings));
  }, []);

  const letterA = useMemo(() => {
    const shapes = createLetterA();
    return shapes.map((s) => new THREE.ExtrudeGeometry(s, extrudeSettings));
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#d4d4d8',
        metalness: 1,
        roughness: 0.06,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#8899ff',
        metalness: 1,
        roughness: 0.1,
        emissive: '#4466ff',
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Slow continuous rotation to reveal I → M → A
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.06;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.03;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.65}>
        {/* I — facing front (rotation Y = 0) */}
        <group rotation={[0, 0, 0]}>
          {letterI.map((geo, i) => (
            <mesh key={`i-${i}`} geometry={geo} material={material} />
          ))}
        </group>

        {/* M — facing 120° */}
        <group rotation={[0, (Math.PI * 2) / 3, 0]}>
          {letterM.map((geo, i) => (
            <mesh key={`m-${i}`} geometry={geo} material={material} />
          ))}
        </group>

        {/* A — facing 240° */}
        <group rotation={[0, (Math.PI * 4) / 3, 0]}>
          {letterA.map((geo, i) => (
            <mesh key={`a-${i}`} geometry={geo} material={accentMaterial} />
          ))}
        </group>

        {/* Thin orbital ring around the letters */}
        <mesh>
          <torusGeometry args={[0.7, 0.008, 16, 100]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.05}
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
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
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.006}
        color="#8899ff"
        transparent
        opacity={0.35}
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

/* ── Main Scene ── */
const Hero3DScene = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none">
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 3.5], fov: 40 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.12} />
      <directionalLight position={[4, 3, 4]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-2, 1.5, -1]} intensity={0.7} color="#4466ff" distance={7} />
      <pointLight position={[2, -1, 2]} intensity={0.4} color="#6633cc" distance={7} />

      <AnamorphicSculpture />
      <Particles />
      <CameraParallax />

      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Canvas>
  </div>
);

export default Hero3DScene;
