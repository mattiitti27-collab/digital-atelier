import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Subtle glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16">
        {/* Label */}
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-8"
          style={{
            color: 'rgba(212,165,116,0.5)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
          }}
        >
          Chi Siamo
        </p>

        {/* Title */}
        <h2
          ref={titleRef}
          className="leading-[1.15] mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 4.5vw, 3.6rem)',
            color: 'hsl(var(--foreground))',
          }}
        >
          L'Arte del Digitale,
          <br />
          <span style={{ color: '#d4a574' }}>la Precisione dell'Ingegneria</span>
        </h2>

        {/* Accent line */}
        <div
          ref={accentRef}
          className="h-px w-24 mb-14 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(212,165,116,0.6), transparent)' }}
        />

        {/* Body */}
        <div ref={bodyRef} className="space-y-8">
          <p
            className="about-p leading-[2] text-sm md:text-[15px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '680px',
            }}
          >
            Dietro ogni grande esperienza digitale c'è un equilibrio perfetto tra creatività e logica.
            Sono <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>Mattia Intini</span>, fondatore di Intini Web Atelier.
            Il mio percorso nasce nel mondo dell'ingegneria e si è evoluto attraverso la mia carriera
            nel trading professionistico e la profonda passione per il business. Questo background mi ha
            forgiato una mentalità unica: la precisione analitica e la visione strategica di un trader
            applicate al design di lusso.
          </p>

          <p
            className="about-p leading-[2] text-sm md:text-[15px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '680px',
            }}
          >
            Intini Web Atelier è una <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>boutique digitale</span> nata
            con una missione chiara: rivoluzionare la presenza online dei brand attraverso esperienze
            web 3D cinematiche e immersive.
          </p>

          <p
            className="about-p leading-[2] text-sm md:text-[15px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '680px',
            }}
          >
            Creiamo siti web che non si limitano a farsi guardare, ma che si fanno vivere. Trattandosi
            di un progetto nuovo ed esclusivo, ho deciso di rendere accessibile l'eccellenza: offriamo
            la stessa qualità visiva e tecnologica riservata tipicamente ai top brand internazionali,
            ma a <span style={{ color: '#d4a574', fontWeight: 400 }}>condizioni di lancio privilegiate e fuori mercato</span>.
          </p>

          {/* Closing statement – glassmorphism card */}
          <div
            className="about-p mt-14 p-8 md:p-10 rounded-lg"
            style={{
              background: 'rgba(212,165,116,0.03)',
              border: '1px solid rgba(212,165,116,0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <p
              className="text-sm md:text-[15px] leading-[2] italic"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.8,
              }}
            >
              "Nessun compromesso. Solo estetica premium, performance ingegneristiche
              e un impatto visivo indimenticabile."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
