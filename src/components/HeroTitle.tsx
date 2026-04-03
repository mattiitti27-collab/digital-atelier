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
    </div>
  );
};

export default HeroTitle;
