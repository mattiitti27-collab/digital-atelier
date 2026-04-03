import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.value)}`;
        }
      },
    });

    tl.to(
      overlayRef.current,
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'power4.inOut',
      },
      '+=0.2'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: '#050505',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      <span
        ref={counterRef}
        className="text-foreground font-light tracking-tighter"
        style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
      >
        0
      </span>
    </div>
  );
};

export default Preloader;
