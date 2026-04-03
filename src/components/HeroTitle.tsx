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

  const title = "Esperienze Digitali d'Élite";
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
    </div>
  );
};

export default HeroTitle;
