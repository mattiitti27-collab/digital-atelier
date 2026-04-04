import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollTransition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -60]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [20, 0, 0, 10]);

  // Particles converging to center
  const p1x = useTransform(scrollYProgress, [0, 0.5], [-120, 0]);
  const p2x = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const p3y = useTransform(scrollYProgress, [0, 0.5], [-80, 0]);
  const p4y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.6, 0]);
  const glowScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 1.2, 0.5]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.4, 0]);

  return (
    <div ref={ref} className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Central glow orb */}
      <motion.div
        className="absolute"
        style={{
          opacity: glowOpacity,
          scale: glowScale,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,165,116,0.25) 0%, rgba(212,165,116,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Converging particles */}
      {[
        { x: p1x, y: 0 },
        { x: p2x, y: 0 },
        { x: 0, y: p3y },
        { x: 0, y: p4y },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            x: p.x,
            y: p.y,
            opacity: particleOpacity,
            width: 4 + i * 2,
            height: 4 + i * 2,
            borderRadius: '50%',
            background: '#d4a574',
            boxShadow: `0 0 ${12 + i * 6}px rgba(212,165,116,0.5)`,
          }}
        />
      ))}

      {/* Central abstract element */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{ opacity, scale, y, filter: blur.get ? undefined : undefined }}
      >
        <motion.div
          style={{ filter: `blur(${blur}px)` } as any}
        >
          {/* Diamond shape */}
          <div
            className="w-16 h-16 md:w-24 md:h-24 rotate-45"
            style={{
              border: '1px solid rgba(212,165,116,0.3)',
              background: 'linear-gradient(135deg, rgba(212,165,116,0.08), transparent)',
              boxShadow: '0 0 60px rgba(212,165,116,0.1), inset 0 0 30px rgba(212,165,116,0.05)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Decorative lines */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px h-32 md:h-48"
        style={{
          opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 0.2]),
          background: 'linear-gradient(to bottom, transparent, rgba(212,165,116,0.3), transparent)',
        }}
      />
    </div>
  );
};

export default ScrollTransition;
