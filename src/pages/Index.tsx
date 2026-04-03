import { useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import WebGLBackground from '@/components/WebGLBackground';
import Hero3DScene from '@/components/Hero3DScene';
import HeroTitle from '@/components/HeroTitle';
import HorizontalPortfolio from '@/components/HorizontalPortfolio';
import CustomCursor from '@/components/CustomCursor';
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

          {/* Spacer for next phases */}
          <section className="min-h-screen" />
        </main>
      </SmoothScroll>
      <CookieBanner />
    </>
  );
};

export default Index;
