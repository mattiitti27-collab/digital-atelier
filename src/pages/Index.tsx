import { useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import WebGLBackground from '@/components/WebGLBackground';
import Hero3DScene from '@/components/Hero3DScene';
import HeroTitle from '@/components/HeroTitle';
import PortfolioSection from '@/components/PortfolioSection';
import CookieBanner from '@/components/CookieBanner';
import FAQSection from '@/components/FAQSection';
import ContactModal from '@/components/ContactModal';
import FooterReveal from '@/components/FooterReveal';
import FloatingButler from '@/components/FloatingButler';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import Marquee from '@/components/Marquee';
import ParallaxElements from '@/components/ParallaxElements';
import { useLanguage } from '@/i18n/LanguageContext';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { t } = useLanguage();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <WebGLBackground />
      <ParallaxElements />
      <Navbar />
      <SmoothScroll>
        <main className="relative z-10">
          <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <Hero3DScene />
            <HeroTitle visible={loaded} />
          </section>

          <Marquee />

          <AboutSection />

          <Marquee />

          <PortfolioSection />

          <div id="faq" className="py-12 md:py-24 relative">
            <FAQSection />
          </div>

          <section id="contatti" className="py-16 md:py-32 flex items-center justify-center relative">
            <button
              onClick={() => setContactOpen(true)}
              className="px-10 md:px-12 py-4 md:py-5 text-[10px] tracking-[0.35em] uppercase rounded-md transition-all duration-300 min-h-[48px]"
              style={{
                background: 'transparent',
                border: '1px solid rgba(212,165,116,0.3)',
                color: '#d4a574',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,165,116,0.08)';
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)';
              }}
            >
              {t.contact.cta}
            </button>
          </section>

          <FooterReveal />
        </main>
      </SmoothScroll>
      <FloatingButler />
      <CookieBanner />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Index;
