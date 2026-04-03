import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo3d from '@/assets/logo-3d.png';

const Hero3DScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      const c = currentRef.current;
      const m = mouseRef.current;
      c.rotY += (m.x * 8 - c.rotY) * 0.03;
      c.rotX += (-m.y * 5 - c.rotX) * 0.03;
      c.x += (m.x * 15 - c.x) * 0.02;
      c.y += (m.y * 10 - c.y) * 0.02;

      if (containerRef.current) {
        containerRef.current.style.transform =
          `translate(${c.x}px, ${c.y}px) rotateY(${c.rotY}deg) rotateX(${c.rotX}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none" style={{ marginTop: '-4vh' }}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ perspective: '1000px', willChange: 'transform' }}
      >
        <motion.img
          src={logo3d}
          alt="Intini Web Atelier Logo"
          className="w-[38vw] max-w-[480px] h-auto select-none opacity-60"
          style={{ filter: 'drop-shadow(0 0 60px rgba(119, 51, 204, 0.25))' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

export default Hero3DScene;
