import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', onMove);

    // Observe project cards
    const observer = new MutationObserver(() => {
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Animation loop
    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        zIndex: 9998,
        width: hovering ? 120 : 12,
        height: hovering ? 120 : 12,
        borderRadius: '50%',
        backgroundColor: hovering ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)',
        backdropFilter: hovering ? 'blur(8px)' : 'none',
        border: hovering ? '1px solid rgba(255,255,255,0.2)' : 'none',
        transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease',
      }}
    >
      <span
        ref={textRef}
        className="text-foreground text-[10px] font-medium tracking-[0.2em] uppercase"
        style={{
          opacity: hovering ? 1 : 0,
          transition: 'opacity 0.3s ease 0.1s',
          fontFamily: 'var(--font-body)',
        }}
      >
        VISIT
      </span>
    </div>
  );
};

export default CustomCursor;
