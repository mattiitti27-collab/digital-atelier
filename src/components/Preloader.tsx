import { useEffect, useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const playLuxurySwoosh = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;

    // Smooth filtered noise swoosh
    const bufferSize = ctx.sampleRate * 1.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(0.8, now);
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
    filter.frequency.exponentialRampToValueAtTime(800, now + 1.0);
    filter.frequency.exponentialRampToValueAtTime(200, now + 1.6);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.15);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

    // Subtle sine undertone for warmth
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 1.2);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.03, now + 0.2);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 1.8);
    osc.start(now);
    osc.stop(now + 1.5);
  } catch (e) {
    // Audio not available
  }
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    playLuxurySwoosh();
    // No animation - complete immediately
    onComplete();
  }, [onComplete]);

  return null;
};

export default Preloader;
