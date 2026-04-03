import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParticleConfig {
  size: number;
  x: string;
  y: string;
  speed: number;
  opacity: number;
  color: string;
  blur?: number;
}

const particles: ParticleConfig[] = [
  { size: 4, x: '12%', y: '15%', speed: -80, opacity: 0.4, color: '#d4a574' },
  { size: 2, x: '85%', y: '25%', speed: -120, opacity: 0.25, color: '#ffffff' },
  { size: 6, x: '70%', y: '45%', speed: -60, opacity: 0.15, color: '#d4a574', blur: 2 },
  { size: 3, x: '25%', y: '60%', speed: -100, opacity: 0.3, color: '#ffffff' },
  { size: 5, x: '90%', y: '70%', speed: -50, opacity: 0.12, color: '#d4a574', blur: 3 },
  { size: 2, x: '45%', y: '80%', speed: -140, opacity: 0.2, color: '#ffffff' },
  { size: 8, x: '8%', y: '50%', speed: -40, opacity: 0.08, color: '#d4a574', blur: 4 },
  { size: 3, x: '55%', y: '35%', speed: -90, opacity: 0.18, color: '#ffffff' },
];

const ParallaxElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const els = containerRef.current.querySelectorAll('.parallax-particle');

    els.forEach((el, i) => {
      const p = particles[i];
      gsap.to(el, {
        y: p.speed,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="parallax-particle absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: p.color,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxElements;
