import { useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import WebGLBackground from '@/components/WebGLBackground';
import Hero3DScene from '@/components/Hero3DScene';
import HeroTitle from '@/components/HeroTitle';
import HorizontalPortfolio from '@/components/HorizontalPortfolio';
import CustomCursor from '@/components/CustomCursor';
import CookieBanner from '@/components/CookieBanner';
import FAQSection from '@/components/FAQSection';
import ContactModal from '@/components/ContactModal';
import FooterReveal from '@/components/FooterReveal';
import FloatingButler from '@/components/FloatingButler';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <WebGLBackground />
      <CustomCursor />
      <SmoothScroll>
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <Hero3DScene />
            <HeroTitle visible={loaded} />
          </section>

          {/* Portfolio Section */}
          <HorizontalPortfolio />

          {/* FAQ Section */}
          <div className="py-16 md:py-24" style={{ background: '#050505' }}>
            <FAQSection />
          </div>

          {/* Contact CTA */}
          <section className="py-24 md:py-32 flex items-center justify-center" style={{ background: '#050505' }}>
            <button
              onClick={() => setContactOpen(true)}
              className="px-12 py-5 text-[10px] tracking-[0.35em] uppercase rounded-md transition-all duration-300"
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
              CONTATTACI
            </button>
          </section>

          {/* Footer Reveal */}
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
