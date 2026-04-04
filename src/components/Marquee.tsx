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

    // Scroll to RIGHT → positive x direction, start from -totalWidth
    gsap.set(track, { x: -totalWidth });
    gsap.to(track, {
      x: 0,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === track) st.kill();
      });
    };
  }, []);

  const renderItems = () =>
    LOGOS.map((logo, i) => (
      <span key={i} className="flex items-center gap-16 md:gap-24 whitespace-nowrap px-8 md:px-14">
        <img
          src={logo.src}
          alt={logo.alt}
          className="h-14 md:h-20 lg:h-24 w-auto object-contain transition-opacity duration-500 hover:opacity-100"
          style={{ filter: 'brightness(0.9) contrast(1.1)', opacity: 0.9 }}
          loading="lazy"
        />
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: 'rgba(212,165,116,0.25)' }}
        />
      </span>
    ));

  return (
    <div className="relative py-10 md:py-20 overflow-hidden pointer-events-none select-none">
      <div ref={trackRef} className="flex items-center" style={{ width: 'max-content' }}>
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
};

export default Marquee;
