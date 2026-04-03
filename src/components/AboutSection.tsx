import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.about-orb', {
        y: -120,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
      });

      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
      });

      gsap.from(accentRef.current, {
        scaleX: 0, duration: 1, ease: 'power3.inOut', delay: 0.3,
        scrollTrigger: { trigger: accentRef.current, start: 'top 85%', once: true },
      });

      const paragraphs = bodyRef.current?.querySelectorAll('.about-p');
      if (paragraphs) {
        gsap.from(paragraphs, {
          y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.4,
          scrollTrigger: { trigger: bodyRef.current, start: 'top 80%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chi-siamo"
      ref={sectionRef}
      className="relative py-20 md:py-48 overflow-hidden"
    >
      <div
        className="about-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-16">
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-6 md:mb-8"
          style={{
            color: 'rgba(212,165,116,0.5)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {t.about.label}
        </p>

        <h2
          ref={titleRef}
          className="leading-[1.15] mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 4.5vw, 3.6rem)',
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          {t.about.title1}
          <br />
          <span style={{ color: '#d4a574', textShadow: '0 2px 16px rgba(212,165,116,0.3)' }}>
            {t.about.title2}
          </span>
        </h2>

        <div
          ref={accentRef}
          className="h-px w-24 mb-10 md:mb-14 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(212,165,116,0.6), transparent)' }}
        />

        <div ref={bodyRef} className="space-y-6 md:space-y-8">
          <p
            className="about-p leading-[2] text-xs md:text-[15px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: 'rgba(220,218,214,0.7)',
              maxWidth: '680px',
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}
          >
            {t.about.p1}<span style={{ color: '#ffffff', fontWeight: 400 }}>{t.about.p1Name}</span>{t.about.p1b}
          </p>

          <p
            className="about-p leading-[2] text-xs md:text-[15px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: 'rgba(220,218,214,0.7)',
              maxWidth: '680px',
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}
          >
            {t.about.p2}<span style={{ color: '#ffffff', fontWeight: 400 }}>{t.about.p2Bold}</span>{t.about.p2b}
          </p>

          <p
            className="about-p leading-[2] text-xs md:text-[15px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: 'rgba(220,218,214,0.7)',
              maxWidth: '680px',
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}
          >
            {t.about.p3}<span style={{ color: '#d4a574', fontWeight: 400, textShadow: '0 1px 8px rgba(212,165,116,0.2)' }}>{t.about.p3Bold}</span>{t.about.p3b}
          </p>

          <div
            className="about-p mt-10 md:mt-14 p-6 md:p-10 rounded-lg"
            style={{
              background: 'rgba(212,165,116,0.04)',
              border: '1px solid rgba(212,165,116,0.12)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <p
              className="italic"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.8,
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              {t.about.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
