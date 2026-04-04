import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lineHRef = useRef<HTMLDivElement>(null);
  const lineVRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    });

    // Central glow pulse
    tl.fromTo(
      glowRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Horizontal line draws out from center
    tl.fromTo(
      lineHRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.inOut' },
      '-=0.3'
    );

    // Vertical line draws out from center
    tl.fromTo(
      lineVRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.4, ease: 'power3.inOut' },
      '-=0.25'
    );

    // Glow expands and fades
    tl.to(glowRef.current, {
      scale: 8,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in',
    });

    // Lines fade
    tl.to([lineHRef.current, lineVRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.5');

    // Split curtain: top half slides up, bottom half slides down
    tl.to(topRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '-=0.2');

    tl.to(bottomRef.current, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '<');

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Top half */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2"
        style={{ backgroundColor: '#050505' }}
      />
      {/* Bottom half */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ backgroundColor: '#050505' }}
      />
      {/* Center glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.4) 0%, rgba(212,165,116,0.08) 50%, transparent 70%)',
        }}
      />
      {/* Horizontal line */}
      <div
        ref={lineHRef}
        className="absolute top-1/2 left-[10%] w-[80%] h-px -translate-y-1/2"
        style={{
          background: 'linear-gradient(90deg, transparent, #d4a574, transparent)',
          transformOrigin: 'center',
        }}
      />
      {/* Vertical line */}
      <div
        ref={lineVRef}
        className="absolute left-1/2 top-[20%] h-[60%] w-px -translate-x-1/2"
        style={{
          background: 'linear-gradient(180deg, transparent, #d4a574, transparent)',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
};

export default Preloader;
