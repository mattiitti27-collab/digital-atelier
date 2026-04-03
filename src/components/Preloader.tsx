import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(overlayRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999]"
      style={{
        backgroundColor: '#050505',
        clipPath: 'inset(0 0 0% 0)',
      }}
    />
  );
};

export default Preloader;
