import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Gold accent line draws across
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }
    );

    // Line fades out
    tl.to(lineRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });

    // Curtain slides up
    tl.to(overlayRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power4.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: '#050505',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      <div
        ref={lineRef}
        className="absolute w-24 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #d4a574, transparent)',
          opacity: 0.7,
        }}
      />
    </div>
  );
};

export default Preloader;
