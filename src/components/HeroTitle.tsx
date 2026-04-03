import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroTitleProps {
  visible: boolean;
}

const HeroTitle = ({ visible }: HeroTitleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;

    const chars = containerRef.current.querySelectorAll('.hero-char');
    gsap.set(chars, { opacity: 0, y: 60, rotateX: -90 });
    gsap.to(chars, {
      opacity: 1, y: 0, rotateX: 0,
      duration: 1, ease: 'power3.out', stagger: 0.035, delay: 0.2,
    });
  }, [visible]);

  // Spawn particles on hover
  useEffect(() => {
    if (!hovered) return;
    const interval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const newParticle: Particle = {
        id: particleId.current++,
        x: 50 + (Math.random() - 0.5) * 80,
        y: 50 + (Math.random() - 0.5) * 60,
        size: 1.5 + Math.random() * 2.5,
        duration: 0.8 + Math.random() * 1.2,
        delay: 0,
        angle,
        distance: 30 + Math.random() * 50,
      };
      setParticles((p) => [...p.slice(-25), newParticle]);
    }, 60);
    return () => clearInterval(interval);
  }, [hovered]);

  // Glow pulse via GSAP
  const onEnter = useCallback(() => {
    setHovered(true);
    if (!btnRef.current) return;
    gsap.killTweensOf(btnRef.current);
    gsap.to(btnRef.current, {
      boxShadow: '0 0 60px rgba(212,165,116,0.25), 0 0 120px rgba(212,165,116,0.1), inset 0 0 30px rgba(212,165,116,0.06)',
      background: 'rgba(212,165,116,0.12)',
      borderColor: 'rgba(212,165,116,0.6)',
      duration: 0.5,
      ease: 'power2.out',
    });
    // Pulsing glow loop
    gsap.to(btnRef.current, {
      boxShadow: '0 0 80px rgba(212,165,116,0.35), 0 0 160px rgba(212,165,116,0.12), inset 0 0 40px rgba(212,165,116,0.08)',
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    });
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    setParticles([]);
    if (!btnRef.current) return;
    gsap.killTweensOf(btnRef.current);
    gsap.to(btnRef.current, {
      boxShadow: '0 0 30px rgba(212,165,116,0)',
      background: 'rgba(212,165,116,0.04)',
      borderColor: 'rgba(212,165,116,0.35)',
      duration: 0.6,
      ease: 'power2.inOut',
    });
  }, []);

  const title = 'Esperienze Digitali d\'Élite';
  const words = title.split(' ');

  return (
    <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
      <h1
        ref={containerRef}
        className="text-foreground leading-[1.1] mb-8"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2.4rem, 7vw, 6rem)',
          perspective: '600px',
        }}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split('').map((char, ci) => (
              <span key={`${wi}-${ci}`} className="hero-char inline-block" style={{ opacity: 0 }}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <p
        className="text-sm md:text-base tracking-widest uppercase mt-2 max-w-lg mx-auto"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.35)',
          lineHeight: '1.8',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.5s',
        }}
      >
        Creiamo presenze digitali su misura per chi non accetta compromessi
      </p>

      <div className="flex gap-6 justify-center mt-10">
        <button
          onClick={() => {
            const el = document.querySelector('#hero');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-10 py-4 text-[10px] tracking-[0.35em] uppercase transition-all duration-500"
          style={{
            border: '1px solid rgba(212,165,116,0.35)',
            color: '#d4a574',
            background: 'rgba(212,165,116,0.04)',
            backdropFilter: 'blur(10px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 2s, transform 1s ease 2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.12)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.04)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Chi Siamo
        </button>
        <button
          onClick={() => {
            const el = document.querySelector('#portfolio');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-10 py-4 text-[10px] tracking-[0.35em] uppercase transition-all duration-500"
          style={{
            border: '1px solid rgba(212,165,116,0.35)',
            color: '#d4a574',
            background: 'rgba(212,165,116,0.04)',
            backdropFilter: 'blur(10px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 2.2s, transform 1s ease 2.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.12)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.04)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          I Nostri Lavori
        </button>
      </div>

      <style>{`
        @keyframes atelier-particle {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--particle-x), var(--particle-y)) scale(0); }
        }
        @keyframes atelier-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default HeroTitle;
