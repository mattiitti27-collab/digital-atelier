import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, Zap, Palette, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = ({ onContact }: { onContact: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
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

  const scrollToContact = () => {
    const el = document.querySelector('#contatti');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const packages = [
    {
      name: lang === 'it' ? 'Base' : 'Base',
      subtitle: lang === 'it' ? 'Sito Vetrina' : 'Showcase Website',
      icon: Globe,
      features: lang === 'it'
        ? ['Sito vetrina standard, responsive', 'Design cinematico su misura', 'SEO & performance ottimizzate', 'Consegna in 72 ore']
        : ['Standard responsive showcase site', 'Bespoke cinematic design', 'SEO & performance optimized', 'Delivery in 72 hours'],
      price: lang === 'it' ? 'A partire da 299€' : 'Starting from €299',
      showPrice: true,
      cta: lang === 'it' ? 'Richiedi Info' : 'Request Info',
      onAction: onContact,
      highlight: false,
    },
    {
      name: lang === 'it' ? 'Medio' : 'Medium',
      subtitle: lang === 'it' ? 'Automazioni' : 'Automations',
      icon: Zap,
      features: lang === 'it'
        ? ['Sito web completo', 'Integrazione CRM base', 'Automazioni e flussi avanzati', 'Configuratore Visuale Incluso']
        : ['Complete website', 'Basic CRM integration', 'Advanced automations & flows', 'Visual Configurator Included'],
      price: null,
      showPrice: false,
      cta: lang === 'it' ? 'Compila il form per info' : 'Fill the form for info',
      onAction: scrollToContact,
      highlight: true,
    },
    {
      name: lang === 'it' ? 'Alto' : 'Premium',
      subtitle: lang === 'it' ? 'Rebranding' : 'Rebranding',
      icon: Palette,
      features: lang === 'it'
        ? ['Sito web avanzato', 'Creazione Loghi & Visual Identity', 'Setup Profili Social', 'Rebranding completo']
        : ['Advanced website', 'Logo & Visual Identity creation', 'Social Profile Setup', 'Complete rebranding'],
      price: null,
      showPrice: false,
      cta: lang === 'it' ? 'Compila il form per info' : 'Fill the form for info',
      onAction: scrollToContact,
      highlight: false,
    },
  ];

  return (
    <section id="servizi" ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.5)' }}
          >
            {lang === 'it' ? 'I Nostri Servizi' : 'Our Services'}
          </p>
          <h2
            className="glow-trace text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1 }}
          >
            {lang === 'it' ? 'I Nostri Percorsi' : 'Our Paths'}
          </h2>
          <p
            className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em' }}
          >
            {lang === 'it'
              ? 'Ogni nostro progetto è 100% su misura. I pacchetti sottostanti rappresentano solo degli esempi illustrativi delle nostre potenzialità.'
              : 'Every project is 100% bespoke. The packages below are illustrative examples of our capabilities.'}
          </p>
        </div>

        {/* Package cards grid */}
        <div className="packages-grid grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="package-card relative rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500"
              style={{
                background: pkg.highlight
                  ? 'linear-gradient(145deg, rgba(212,165,116,0.1), rgba(212,165,116,0.03))'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${pkg.highlight ? 'rgba(212,165,116,0.25)' : 'rgba(255,255,255,0.06)'}`,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: pkg.highlight
                  ? '0 8px 60px rgba(212,165,116,0.08), inset 0 1px 0 rgba(212,165,116,0.1)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
                e.currentTarget.style.boxShadow = '0 16px 60px rgba(212,165,116,0.1)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = pkg.highlight ? 'rgba(212,165,116,0.25)' : 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = pkg.highlight
                  ? '0 8px 60px rgba(212,165,116,0.08), inset 0 1px 0 rgba(212,165,116,0.1)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {pkg.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[8px] tracking-[0.3em] uppercase"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,165,116,0.3), rgba(212,165,116,0.15))',
                    border: '1px solid rgba(212,165,116,0.4)',
                    color: '#d4a574',
                  }}
                >
                  {lang === 'it' ? 'Più Richiesto' : 'Most Popular'}
                </div>
              )}

              <pkg.icon size={24} className="mb-4" style={{ color: '#d4a574', opacity: 0.7 }} />

              <h3
                className="text-xl md:text-2xl mb-1"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: '#ffffff' }}
              >
                {pkg.name}
              </h3>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-5"
                style={{ color: 'rgba(212,165,116,0.6)', fontFamily: 'var(--font-body)' }}
              >
                {pkg.subtitle}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {pkg.features.map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#d4a574', opacity: 0.6 }} />
                    <span
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Configurator badge for non-base */}
              {i > 0 && (
                <div
                  className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(212,165,116,0.06)', border: '1px solid rgba(212,165,116,0.12)' }}
                >
                  <Settings size={12} style={{ color: '#d4a574' }} />
                  <span className="text-[10px] tracking-wider uppercase" style={{ color: '#d4a574', fontFamily: 'var(--font-body)' }}>
                    {lang === 'it' ? 'Configuratore Incluso' : 'Configurator Included'}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-auto">
                {pkg.showPrice ? (
                  <p className="glow-trace text-3xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}>
                    {pkg.price}
                  </p>
                ) : (
                  <p className="text-[11px] mb-5 leading-relaxed italic" style={{ color: 'rgba(212,165,116,0.7)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                    {lang === 'it' ? 'Disponibile previa consulenza gratuita' : 'Available after free consultation'}
                  </p>
                )}

                <button
                  onClick={pkg.onAction}
                  className="w-full py-3.5 rounded-full text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-all duration-500 min-h-[48px]"
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
                  {pkg.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
          {lang === 'it' ? 'Pacchetto Base pronto in 72 ore' : 'Base Package ready in 72 hours'} · {lang === 'it' ? 'Per gli altri pacchetti, consegna rapidissima in base al progetto.' : 'For other packages, ultra-fast delivery based on project scope.'}
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
