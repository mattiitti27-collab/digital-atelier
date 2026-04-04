import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, Share2, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = ({ onContact }: { onContact: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { icon: Globe, title: t.services.web, desc: t.services.webDesc },
    { icon: Share2, title: t.services.social, desc: t.services.socialDesc },
    { icon: Headphones, title: t.services.support, desc: t.services.supportDesc },
  ];

  return (
    <section id="servizi" ref={sectionRef} className="relative py-20 md:py-40 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.5)' }}
          >
            {t.services.label}
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#ffffff', lineHeight: 1.1 }}
          >
            {t.services.title}
          </h2>
          <p
            className="text-xs md:text-base max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', lineHeight: 1.8 }}
          >
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {services.map((s, i) => (
            <div
              key={i}
              className="service-card p-6 md:p-8 rounded-xl transition-all duration-500 group"
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
                className="text-xs md:text-[13px] leading-[1.8]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p
            className="text-xs md:text-sm tracking-[0.15em] mb-1"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: '#d4a574' }}
          >
            {t.services.delivery}
          </p>
          <p
            className="text-[10px] md:text-xs tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}
          >
            {t.services.deliveryNote}
          </p>
          <p
            className="text-[11px] md:text-xs tracking-[0.3em] uppercase mb-1"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.5)' }}
          >
            {t.services.price}
          </p>
          <p
            className="text-4xl md:text-5xl mb-8 md:mb-10"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#d4a574' }}
          >
            {t.services.priceValue}
          </p>
          <button
            onClick={onContact}
            className="px-8 md:px-12 py-3.5 md:py-4 text-[10px] tracking-[0.3em] uppercase rounded-full transition-all duration-500 min-h-[48px]"
            style={{
              border: '1px solid rgba(212,165,116,0.4)',
              color: '#d4a574',
              background: 'rgba(212,165,116,0.06)',
              backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212,165,116,0.12)';
              e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212,165,116,0.06)';
              e.currentTarget.style.borderColor = 'rgba(212,165,116,0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {t.services.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
