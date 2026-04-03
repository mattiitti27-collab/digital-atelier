import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ripetiamoLogo from '@/assets/logos/ripetiamo.png';
import lumiereLogo from '@/assets/logos/lumiere.png';
import marchettiLogo from '@/assets/logos/marchetti.png';
import monacoLogo from '@/assets/logos/monaco.png';
import intiniJournalLogo from '@/assets/logos/intini-journal.png';
import yachtLogo from '@/assets/logos/yacht.png';

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  { src: ripetiamoLogo, alt: 'Ripetiamo Online' },
  { src: intiniJournalLogo, alt: 'Intini Journal Suite' },
  { src: monacoLogo, alt: 'Monaco Luxury Experience' },
  { src: marchettiLogo, alt: 'Marchetti Concessionario' },
  { src: lumiereLogo, alt: 'Lumière' },
  { src: yachtLogo, alt: 'Yacht Charter' },
];

const Marquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % totalWidth),
      },
    });

    gsap.to(track, {
      scrollTrigger: {
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      x: `-=${totalWidth * 0.3}`,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === track) st.kill();
      });
    };
  }, []);

  const renderItems = () =>
    LOGOS.map((logo, i) => (
      <span key={i} className="flex items-center gap-8 md:gap-12 whitespace-nowrap px-4 md:px-6">
        <img
          src={logo.src}
          alt={logo.alt}
          className="h-10 md:h-14 lg:h-16 w-auto object-contain"
          style={{ filter: 'brightness(0.6) contrast(1.2)', opacity: 0.35 }}
          loading="lazy"
        />
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: 'rgba(212,165,116,0.3)' }}
        />
      </span>
    ));

  return (
    <div className="relative py-8 md:py-16 overflow-hidden pointer-events-none select-none">
      <div ref={trackRef} className="flex items-center gap-8" style={{ width: 'max-content' }}>
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
};

export default Marquee;
