import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, Share2, Headphones, Layers, Settings, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = ({ onContact }: { onContact: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 80, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.package-card', {
        y: 100, opacity: 0, scale: 0.95, duration: 1.4, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '.packages-grid', start: 'top 85%', once: true },
      });
      const glowEls = sectionRef.current!.querySelectorAll('.glow-trace');
      glowEls.forEach((el) => {
        gsap.fromTo(el,
          { textShadow: '0 0 0px rgba(212,165,116,0)' },
          {
            textShadow: '0 0 18px rgba(212,165,116,0.35), 0 0 40px rgba(212,165,116,0.12)',
            duration: 1.2, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 30%', scrub: 1.5 },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { icon: Globe, title: t.services.web, desc: t.services.webDesc },
    { icon: Share2, title: t.services.social, desc: t.services.socialDesc },
    { icon: Headphones, title: t.services.support, desc: t.services.supportDesc },
  ];

  const packages = [
    {
      name: lang === 'it' ? 'Pacchetto Base' : 'Base Package',
      icon: Layers,
      desc: lang === 'it' ? 'Sito web su misura con design cinematico, SEO e performance ottimizzate. Consegna in 72 ore.' : 'Bespoke website with cinematic design, SEO and optimized performance. Delivery in 72 hours.',
      price: '299€',
      showPrice: true,
      highlight: false,
    },
    {
      name: lang === 'it' ? 'Pacchetto Intermedio' : 'Intermediate Package',
      icon: Settings,
      desc: lang === 'it' ? 'Sito web completo + automazioni avanzate, integrazioni CRM e configuratore visuale incluso.' : 'Complete website + advanced automations, CRM integrations and visual configurator included.',
      price: lang === 'it' ? 'Disponibile previa consulenza gratuita' : 'Available after free consultation',
      showPrice: false,
      highlight: true,
    },
    {
      name: lang === 'it' ? 'Pacchetto Completo' : 'Complete Package',
      icon: Sparkles,
      desc: lang === 'it' ? 'Sito web premium + integrazioni avanzate + creazione e gestione completa profili social + configuratore.' : 'Premium website + advanced integrations + complete social media management + configurator.',
      price: lang === 'it' ? 'Disponibile previa consulenza gratuita' : 'Available after free consultation',
      showPrice: false,
      highlight: false,
    },
  ];

  

  return (
    <section id="servizi" ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.5)' }}
          >
            {t.services.label}
          </p>
          <h2
            className="glow-trace text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1 }}
          >
            {t.services.title}
          </h2>
          <p
            className="glow-trace text-xs md:text-base max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', lineHeight: 1.8 }}
          >
            {t.services.subtitle}
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
          {services.map((s, i) => (
            <div
              key={i}
              className="service-card p-6 md:p-8 rounded-xl transition-all duration-500"
              style={{
                background: 'rgba(212,165,116,0.03)',
                border: '1px solid rgba(212,165,116,0.08)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.2)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(212,165,116,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <s.icon size={24} className="mb-5" style={{ color: '#d4a574', opacity: 0.7 }} />
              <h3
                className="text-base md:text-lg mb-3"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: '#ffffff' }}
              >
                {s.title}
              </h3>
              <p
                className="glow-trace text-xs md:text-[13px] leading-[1.8]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Package cards */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="glow-trace text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.5)' }}
          >
            {lang === 'it' ? 'I Nostri Pacchetti' : 'Our Packages'}
          </p>
          <h3
            className="glow-trace text-2xl md:text-4xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#ffffff' }}
          >
            {lang === 'it' ? 'Scegli il tuo percorso' : 'Choose your path'}
          </h3>
        </div>

        <div className="packages-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="package-card relative p-6 md:p-8 rounded-2xl transition-all duration-500 flex flex-col"
              style={{
                background: pkg.highlight
                  ? 'linear-gradient(145deg, rgba(212,165,116,0.08), rgba(212,165,116,0.02))'
                  : 'rgba(212,165,116,0.03)',
                border: `1px solid ${pkg.highlight ? 'rgba(212,165,116,0.25)' : 'rgba(212,165,116,0.08)'}`,
                backdropFilter: 'blur(20px)',
                boxShadow: pkg.highlight ? '0 0 60px rgba(212,165,116,0.06)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
                e.currentTarget.style.boxShadow = '0 12px 50px rgba(212,165,116,0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = pkg.highlight ? 'rgba(212,165,116,0.25)' : 'rgba(212,165,116,0.08)';
                e.currentTarget.style.boxShadow = pkg.highlight ? '0 0 60px rgba(212,165,116,0.06)' : 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {pkg.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[8px] tracking-[0.3em] uppercase"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,165,116,0.3), rgba(212,165,116,0.15))',
                    border: '1px solid rgba(212,165,116,0.4)',
                    color: '#d4a574',
                  }}
                >
                  {lang === 'it' ? 'Più Richiesto' : 'Most Popular'}
                </div>
              )}

              <pkg.icon size={22} className="mb-4" style={{ color: '#d4a574', opacity: 0.7 }} />

              <h4
                className="text-lg md:text-xl mb-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: '#ffffff' }}
              >
                {pkg.name}
              </h4>

              <p
                className="text-xs leading-[1.8] mb-6 flex-1"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}
              >
                {pkg.desc}
              </p>

              {/* Configuratore badge */}
              {i > 0 && (
                <div
                  className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(212,165,116,0.06)', border: '1px solid rgba(212,165,116,0.12)' }}
                >
                  <Settings size={12} style={{ color: '#d4a574' }} />
                  <span className="text-[10px] tracking-wider uppercase" style={{ color: '#d4a574', fontFamily: 'var(--font-body)' }}>
                    {lang === 'it' ? 'Configuratore Incluso' : 'Configurator Included'}
                  </span>
                </div>
              )}

              <div className="mt-auto">
                {pkg.showPrice ? (
                  <p className="glow-trace text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#d4a574' }}>
                    {pkg.price}
                  </p>
                ) : (
                  <p className="text-[11px] md:text-xs mb-4 leading-relaxed" style={{ color: 'rgba(212,165,116,0.7)', fontFamily: 'var(--font-body)', fontWeight: 300, fontStyle: 'italic' }}>
                    {pkg.price}
                  </p>
                )}

                <button
                  onClick={onContact}
                  className="w-full py-3 rounded-full text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-all duration-500 min-h-[44px]"
                  style={{
                    border: '1px solid rgba(212,165,116,0.4)',
                    color: '#d4a574',
                    background: pkg.highlight
                      ? 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))'
                      : 'rgba(212,165,116,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,165,116,0.15)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(212,165,116,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = pkg.highlight
                      ? 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))'
                      : 'rgba(212,165,116,0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {t.services.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
          {t.services.delivery} · {t.services.deliveryNote}
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
