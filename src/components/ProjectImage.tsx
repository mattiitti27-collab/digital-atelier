import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // RGB shift on hover
    float shift = uHover * 0.012;
    float wave = sin(uv.y * 12.0 + uTime * 2.0) * uHover * 0.008;
    
    float r = texture2D(uTexture, uv + vec2(shift + wave, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift + wave, 0.0)).b;
    float a = texture2D(uTexture, uv).a;
    
    // Subtle distortion near mouse
    vec2 dist = uv - uMouse;
    float proximity = 1.0 - smoothstep(0.0, 0.4, length(dist));
    float ripple = sin(length(dist) * 20.0 - uTime * 3.0) * proximity * uHover * 0.01;
    
    r += ripple;
    g += ripple * 0.5;
    b += ripple;
    
    gl_FragColor = vec4(r, g, b, a);
  }
`;

interface ShaderImageProps {
  imageUrl: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
}

function ShaderPlane({ imageUrl, isHovered, mousePos }: ShaderImageProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(imageUrl);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [imageUrl]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;

    const targetHover = isHovered ? 1 : 0;
    materialRef.current.uniforms.uHover.value +=
      (targetHover - materialRef.current.uniforms.uHover.value) * 0.08;

    materialRef.current.uniforms.uMouse.value.set(mousePos.x, mousePos.y);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

interface ProjectImageProps {
  imageUrl: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
}

const ProjectImage = ({ imageUrl, isHovered, mousePos }: ProjectImageProps) => (
  <Canvas
    gl={{ alpha: true, antialias: false }}
    camera={{ position: [0, 0, 1] }}
    style={{ background: 'transparent' }}
    dpr={[1, 1.5]}
  >
    <ShaderPlane imageUrl={imageUrl} isHovered={isHovered} mousePos={mousePos} />
  </Canvas>
);

export default ProjectImage;
