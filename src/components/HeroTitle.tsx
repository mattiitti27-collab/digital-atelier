import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/i18n/LanguageContext';

interface HeroTitleProps {
  visible: boolean;
  onContact?: () => void;
}

const HeroTitle = ({ visible, onContact }: HeroTitleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { t } = useLanguage();

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

  const words = t.hero.title.split(' ');

  return (
    <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto">
      <h1
        ref={containerRef}
        className="text-foreground leading-[1.1] mb-6 md:mb-8"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 7vw, 6rem)',
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
        className="text-[10px] md:text-base tracking-widest uppercase mt-2 max-w-lg mx-auto text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.35)',
          lineHeight: '1.8',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.5s',
        }}
      >
        {t.hero.subtitle}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mt-6 md:mt-10">
        <button
          onClick={() => {
            const footer = document.querySelector('#contatti');
            if (footer) {
              footer.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => onContact?.(), 1200);
            } else {
              onContact?.();
            }
          }}
          className="px-6 md:px-10 py-3 md:py-4 text-[9px] md:text-[10px] tracking-[0.3em] uppercase transition-all duration-500 rounded-full min-h-[42px]"
          style={{
            border: '1px solid rgba(212,165,116,0.35)',
            color: '#d4a574',
            background: 'rgba(212,165,116,0.04)',
            backdropFilter: 'blur(10px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 2s, transform 1s ease 2s, background 0.3s, border-color 0.3s, box-shadow 0.3s',
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
          {t.hero.cta1}
        </button>
        <button
          onClick={() => {
            const el = document.querySelector('#portfolio');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 md:px-10 py-3 md:py-4 text-[9px] md:text-[10px] tracking-[0.3em] uppercase transition-all duration-500 rounded-full min-h-[42px]"
          style={{
            border: '1px solid rgba(212,165,116,0.35)',
            color: '#d4a574',
            background: 'rgba(212,165,116,0.04)',
            backdropFilter: 'blur(10px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 2.2s, transform 1s ease 2.2s, background 0.3s, border-color 0.3s, box-shadow 0.3s',
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
          {t.hero.cta2}
        </button>
      </div>
    </div>
  );
};

export default HeroTitle;
