import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  'Web Design',
  '3D Experiences',
  'Brand Identity',
  'UI / UX',
  'Motion Design',
  'Digital Strategy',
  'E-Commerce',
  'Luxury Web',
];

const Marquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    // Infinite loop
    gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % totalWidth),
      },
    });

    // Speed up on scroll
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
    ITEMS.map((item, i) => (
      <span
        key={i}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        <span
          className="text-3xl md:text-5xl lg:text-6xl tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.06)',
            WebkitTextStroke: '1px rgba(212,165,116,0.15)',
          }}
        >
          {item}
        </span>
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: 'rgba(212,165,116,0.3)' }}
        />
      </span>
    ));

  return (
    <div className="relative py-12 md:py-16 overflow-hidden pointer-events-none select-none">
      <div ref={trackRef} className="flex items-center gap-8" style={{ width: 'max-content' }}>
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
};

export default Marquee;
