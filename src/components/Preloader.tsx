import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const playRevealSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Ethereal shimmer chord
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    const now = ctx.currentTime;
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 1.5);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.Q.setValueAtTime(1, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.1 + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.06);
      osc.stop(now + 2.5);
    });

    // Subtle "whoosh" noise sweep
    const bufferSize = ctx.sampleRate * 1.5;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(4000, now + 0.6);
    noiseFilter.frequency.exponentialRampToValueAtTime(200, now + 1.2);
    noiseFilter.Q.setValueAtTime(0.5, now);
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.03, now + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 1.5);
  } catch (e) {
    // Audio not available, fail silently
  }
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const soundPlayed = useRef(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    });

    // Phase 1: Grid pattern fades in
    tl.fromTo(gridRef.current, 
      { opacity: 0 },
      { opacity: 0.15, duration: 0.4, ease: 'power2.out' }
    );

    // Phase 2: Scan line sweeps down
    tl.fromTo(scanRef.current,
      { top: '-2px' },
      { top: '100%', duration: 0.7, ease: 'power2.inOut' },
      '-=0.1'
    );

    // Phase 3: Center glow emerges
    tl.fromTo(glowRef.current,
      { scale: 0, opacity: 0, rotation: 0 },
      { scale: 1.5, opacity: 1, rotation: 90, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.3'
    );

    // Phase 4: Cross lines draw
    tl.fromTo('.preloader-line-h',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: 'power3.inOut' },
      '-=0.2'
    );
    tl.fromTo('.preloader-line-v',
      { scaleY: 0 },
      { scaleY: 1, duration: 0.3, ease: 'power3.inOut' },
      '-=0.2'
    );

    // Phase 5: Play sound & explode glow
    tl.call(() => {
      if (!soundPlayed.current) {
        soundPlayed.current = true;
        playRevealSound();
      }
    });

    tl.to(glowRef.current, {
      scale: 20, opacity: 0, duration: 0.8, ease: 'power3.in',
    });

    // Fade grid and lines
    tl.to([gridRef.current, linesRef.current], {
      opacity: 0, duration: 0.3,
    }, '-=0.6');

    // Phase 6: Split curtain reveal
    tl.to(topRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
    }, '-=0.3');
    tl.to(bottomRef.current, {
      yPercent: 100,
      duration: 0.7,
      ease: 'power4.inOut',
    }, '<');

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999]">
      {/* Top curtain */}
      <div ref={topRef} className="absolute top-0 left-0 w-full h-1/2" style={{ backgroundColor: '#050505' }} />
      {/* Bottom curtain */}
      <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-1/2" style={{ backgroundColor: '#050505' }} />
      
      {/* Tech grid pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          backgroundImage: `
            linear-gradient(rgba(212,165,116,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,165,116,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scan line */}
      <div
        ref={scanRef}
        className="absolute left-0 w-full h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.6), rgba(212,165,116,0.8), rgba(212,165,116,0.6), transparent)',
          boxShadow: '0 0 20px rgba(212,165,116,0.4), 0 0 60px rgba(212,165,116,0.2)',
        }}
      />

      {/* Center glow diamond */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.5) 0%, rgba(212,165,116,0.15) 40%, transparent 70%)',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
      />

      {/* Cross lines */}
      <div ref={linesRef} className="absolute inset-0 pointer-events-none">
        <div
          className="preloader-line-h absolute top-1/2 left-[5%] w-[90%] h-px -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,165,116,0.5) 20%, rgba(212,165,116,0.8) 50%, rgba(212,165,116,0.5) 80%, transparent 100%)',
            transformOrigin: 'center',
          }}
        />
        <div
          className="preloader-line-v absolute left-1/2 top-[10%] h-[80%] w-px -translate-x-1/2"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(212,165,116,0.5) 20%, rgba(212,165,116,0.8) 50%, rgba(212,165,116,0.5) 80%, transparent 100%)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
