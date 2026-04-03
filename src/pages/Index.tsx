import { useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import WebGLBackground from '@/components/WebGLBackground';
import CookieBanner from '@/components/CookieBanner';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <WebGLBackground />
      <SmoothScroll>
        <main className="relative z-10">
          {/* Phase 2: Hero 3D will go here */}
          <section className="flex min-h-screen items-center justify-center">
            <h1
              className="text-foreground tracking-tight text-center px-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                letterSpacing: '0.02em',
                fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 1s ease 0.3s',
              }}
            >
              Sartoria Digitale Inattaccabile
            </h1>
          </section>

          {/* Spacer for scroll testing */}
          <section className="min-h-screen" />
        </main>
      </SmoothScroll>
      <CookieBanner />
    </>
  );
};

export default Index;
