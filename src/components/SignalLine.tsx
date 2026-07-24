import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SignalLine() {
  const isReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll progress to adjust amplitude & speed
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = 30 * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = '100%';
      canvas.style.height = '30px';
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#5fd4d6'; // --signal-cyan
      ctx.lineWidth = 1.2;
      ctx.beginPath();

      // Adjust wave parameters dynamically based on scroll progress
      const ampBase = 3;
      const ampScroll = scrollProgress * 6; // Amplitude swells as you scroll down
      const freqBase = 0.015;
      const freqScroll = (1 - scrollProgress) * 0.01; // Wavelength lengthens as you scroll down
      
      const speed = isReduced ? 0 : 0.02 + scrollProgress * 0.03; // Wave speed accelerates on scroll
      phase += speed;

      for (let x = 0; x < width; x++) {
        // Combine a primary telemetry wave with a secondary frequency modulation
        const wave1 = Math.sin(x * (freqBase + freqScroll) + phase);
        const wave2 = Math.cos(x * 0.003 - phase * 0.5) * 0.4;
        
        // Add random signal "spikes" simulating live meteorological data transmission
        const spikeTrigger = Math.sin(x * 0.005 + phase * 0.1);
        const spike = Math.pow(Math.max(0, spikeTrigger), 5) * Math.sin(x * 0.08) * 4;

        const y = centerY + (wave1 + wave2) * (ampBase + ampScroll) + spike;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      if (!isReduced) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgress, isReduced]);

  return (
    <div className="fixed top-12 left-0 w-full h-[30px] z-40 pointer-events-none select-none overflow-hidden bg-bg/40 backdrop-blur-[1px] border-b border-line/50">
      <canvas ref={canvasRef} className="opacity-80" />
    </div>
  );
}
