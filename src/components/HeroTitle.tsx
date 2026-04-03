import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.035,
      delay: 0.2,
    });
  }, [visible]);

  const title = 'Sartoria Digitale Inattaccabile';
  const words = title.split(' ');

  return (
    <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
      <h1
        ref={containerRef}
        className="text-foreground leading-[1.1] mb-6"
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
              <span
                key={`${wi}-${ci}`}
                className="hero-char inline-block"
                style={{ opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <p
        className="text-muted-foreground text-sm md:text-base tracking-widest uppercase"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          letterSpacing: '0.3em',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.5s',
        }}
      >
        Web Atelier — Mattia Intini
      </p>

      <Link
        to="/atelier"
        className="inline-block mt-10 px-10 py-4 text-[10px] tracking-[0.35em] uppercase transition-all duration-500 hover:scale-[1.03]"
        style={{
          border: '1px solid rgba(212,165,116,0.35)',
          color: '#d4a574',
          background: 'rgba(212,165,116,0.04)',
          backdropFilter: 'blur(10px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease 2s, transform 1s ease 2s, background 0.4s, box-shadow 0.4s, scale 0.3s',
          boxShadow: '0 0 30px rgba(212,165,116,0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(212,165,116,0.1)';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(212,165,116,0.04)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(212,165,116,0)';
        }}
      >
        Accedi all'Atelier
      </Link>
    </div>
  );
};

export default HeroTitle;
