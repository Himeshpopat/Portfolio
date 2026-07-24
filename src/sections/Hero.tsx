import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Award, Mail, ChevronRight, FileText } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import SocialIconButton from '../components/SocialIconButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Hero() {
  const isReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track normalized pointer coordinates (-1 to 1) for desktop ease-in-out rotation
  const [, setMousePos] = useState({ x: 0, y: 0, isOver: false });
  const mouseRef = useRef({ x: 0, y: 0, isOver: false, actualX: 0, actualY: 0 });

  // Entrance animations timed to orchestrate with the SignalLine (0.6s) and Navigation entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReduced ? 0 : 0.08,
        delayChildren: isReduced ? 0.05 : 0.45,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isReduced ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  // Pointer event listeners on the parent container (Disabled on touch devices to ensure smooth touch-scrolling)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect touch device via media queries
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const normX = ((x / rect.width) - 0.5) * 2;
      const normY = ((y / rect.height) - 0.5) * 2;

      mouseRef.current = {
        x: normX,
        y: normY,
        isOver: true,
        actualX: e.clientX,
        actualY: e.clientY
      };
      setMousePos({ x: normX, y: normY, isOver: true });
    };

    const handlePointerLeave = () => {
      mouseRef.current.isOver = false;
      setMousePos(prev => ({ ...prev, isOver: false }));
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Blueprint Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rx = 0.5; // X rotation
    let ry = 0.5; // Y rotation
    let time = 0;

    // 3D vertices of a structural wireframe box
    const vertices = [
      [-1.0, -1.0, -1.0], [1.0, -1.0, -1.0], [1.0, 1.0, -1.0], [-1.0, 1.0, -1.0],
      [-1.0, -1.0,  1.0], [1.0, -1.0,  1.0], [1.0, 1.0,  1.0], [-1.0, 1.0,  1.0],
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // front face
      [4, 5], [5, 6], [6, 7], [7, 4], // back face
      [0, 4], [1, 5], [2, 6], [3, 7], // structural columns
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resize);
    resize();

    // Draw frame
    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Determine viewport scale and touch capabilities
      const isTouch = window.matchMedia('(hover: none)').matches;
      const isMobile = window.innerWidth < 768;
      
      // 1. Draw Grid Lines (Sub-pixel blueprint calibration background)
      ctx.strokeStyle = isMobile ? 'rgba(31, 39, 51, 0.2)' : 'rgba(31, 39, 51, 0.35)'; // lighter grid on mobile
      ctx.lineWidth = 0.5;
      const gridSize = isMobile ? 30 : 40; // denser lines on desktop
      
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Interpolate rotational target positions
      const mouse = mouseRef.current;
      
      // Slow down auto-spin on mobile to save GPU cycles and maintain absolute thermal sanity
      time += isMobile ? 0.002 : 0.004;

      let targetRx = 0.4 + Math.sin(time) * 0.1;
      let targetRy = 0.4 + time * 0.15;

      // Only apply cursor tracking on desktop hover-supported screens
      if (mouse.isOver && !isReduced && !isTouch) {
        targetRx = mouse.y * 0.7;
        targetRy = mouse.x * 0.7;
      }

      // Smooth physics ease
      if (!isReduced) {
        rx += (targetRx - rx) * 0.04;
        ry += (targetRy - ry) * 0.04;
      } else {
        rx = 0.4;
        ry = 0.5;
      }

      // 3. Draw crosshair cursor tracking (Desktop Hover Only, completely hidden on touch devices)
      if (mouse.isOver && !isReduced && !isTouch && containerRef.current) {
        const localCanvasRect = canvas.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const canvasMouseX = mouse.actualX - (localCanvasRect.left - containerRect.left);
        const canvasMouseY = mouse.actualY - (localCanvasRect.top - containerRect.top);

        if (canvasMouseX >= 0 && canvasMouseX <= width && canvasMouseY >= 0 && canvasMouseY <= height) {
          ctx.strokeStyle = 'rgba(95, 212, 214, 0.12)';
          ctx.lineWidth = 0.5;
          ctx.setLineDash([5, 5]);

          ctx.beginPath();
          ctx.moveTo(0, canvasMouseY);
          ctx.lineTo(width, canvasMouseY);
          ctx.moveTo(canvasMouseX, 0);
          ctx.lineTo(canvasMouseX, height);
          ctx.stroke();
          
          ctx.setLineDash([]); // reset

          // Coordinate readings
          ctx.fillStyle = 'rgba(95, 212, 214, 0.5)';
          ctx.font = '9px JetBrains Mono';
          ctx.fillText(`SYS_X: ${Math.round(canvasMouseX)}`, canvasMouseX + 8, canvasMouseY - 6);
          ctx.fillText(`SYS_Y: ${Math.round(canvasMouseY)}`, canvasMouseX + 8, canvasMouseY + 6);
        }
      }

      // 4. Project 3D points
      // Shrink scaling factor slightly on mobile to avoid overflow border collisions
      const scaleMultiplier = isMobile ? 0.17 : 0.20;
      const scale = Math.min(width, height) * scaleMultiplier;
      const projected: [number, number][] = [];

      vertices.forEach(v => {
        // Rotate X
        let y1 = v[1] * Math.cos(rx) - v[2] * Math.sin(rx);
        let z1 = v[1] * Math.sin(rx) + v[2] * Math.cos(rx);

        // Rotate Y
        let x2 = v[0] * Math.cos(ry) + z1 * Math.sin(ry);
        
        const px = centerX + x2 * scale;
        const py = centerY + y1 * scale;
        projected.push([px, py]);
      });

      // 5. Draw structural projection lines
      ctx.strokeStyle = isMobile ? 'rgba(95, 212, 214, 0.1)' : 'rgba(95, 212, 214, 0.15)'; // faint line vectors
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      edges.forEach(e => {
        const p1 = projected[e[0]];
        const p2 = projected[e[1]];
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
      });
      ctx.stroke();

      // 6. Draw Vertex nodes (precision calibration anchors)
      projected.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, isMobile ? 2.0 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0a0d12'; // Backdrop fill matching background color
        ctx.fill();
        ctx.strokeStyle = isMobile ? 'rgba(95, 212, 214, 0.45)' : 'rgba(95, 212, 214, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 7. Calibration Label signature
      ctx.fillStyle = 'rgba(137, 146, 163, 0.2)';
      ctx.font = '8px JetBrains Mono';
      ctx.fillText(isMobile ? '[BLUEPRINT LOGIC]' : '[BLUEPRINT MATRIX INTERACTIVE CORE]', 16, height - 16);

      if (!isReduced) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isReduced]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: isReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-[85vh] md:min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-24 lg:pb-16 relative overflow-hidden bg-bg"
      aria-label="Hero Section"
    >
      {/* Background layout vertical projection lines (hidden on mobile and tablet grids for absolute space optimization) */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-line/10 hidden xl:block" />
      <div className="absolute inset-y-0 left-2/3 w-[1px] bg-line/10 hidden xl:block" />
      
      <Container className="relative z-10 w-full px-4 sm:px-6 md:px-8">
        {/* Responsive grid mapping:
            - Mobile (<768px): Stacks text first, followed by static visual at bottom.
            - Tablet & Desktop (>=768px): Dual column split prevent awkward vertical stacks. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Core Stack (col-span-7) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-7 flex flex-col items-start text-left z-10 w-full"
          >
            {/* System Profile tag */}
            <motion.div 
              variants={itemVariants}
              className="font-mono text-[9px] md:text-[10px] tracking-widest text-signal-cyan/60 uppercase mb-3.5 md:mb-4 select-none"
            >
              // SYSTEM PROFILE: SOFTWARE ARCHITECT & ENGINEER
            </motion.div>

            {/* Title Header */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-[1.05] md:leading-[1.03] text-text-primary mb-5 md:mb-6"
            >
              Himesh Popat
            </motion.h1>

            {/* Positioning Statement */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-xl lg:text-2xl font-display font-light text-text-muted leading-snug max-w-full md:max-w-2xl mb-5 md:mb-6"
            >
              Building scalable backends & intelligence pipelines with mathematical precision.
            </motion.p>

            {/* Compact Prose Introduction */}
            <motion.p 
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-sm lg:text-base text-text-muted/80 leading-relaxed max-w-full md:max-w-xl mb-8 md:mb-10 font-sans"
            >
              I am an Information Technology student and full-stack developer based in Mumbai. Specialized in designing structured databases, regression forecasting algorithms, and microservice architectures.
            </motion.p>

            {/* Call To Actions (Stacks vertically on extra small mobile screens, horizontally elsewhere) */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3.5 md:gap-4 w-full sm:w-auto"
            >
              <Button 
                variant="primary" 
                onClick={() => handleScrollTo('projects')}
                className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider gap-1.5 py-3 md:py-3.5"
              >
                <span>View engineering work</span>
                <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider py-3 md:py-3.5"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Get in touch</span>
              </Button>
            </motion.div>

            {/* Social Links Row */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 mt-8 md:mt-10"
            >
              <SocialIconButton 
                href="https://github.com/Himeshpopat"
                icon={Github} 
                label="GitHub Profile" 
              />
              <SocialIconButton 
                href="https://linkedin.com/in/himesh-popat"
                icon={Linkedin} 
                label="LinkedIn Profile" 
              />
              <SocialIconButton 
                href="https://leetcode.com/u/himesh_popat/"
                icon={Award} 
                label="LeetCode Profile" 
              />
              <SocialIconButton 
                href="mailto:himeshpopat2006@gmail.com"
                icon={Mail} 
                label="Email me" 
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Supporting Blueprint Matrix (col-span-5) */}
          <div className="md:col-span-5 relative w-full aspect-square max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[400px] mx-auto md:mx-0 select-none z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="w-full h-full bg-surface/10 border border-line/40 rounded-[12px] relative overflow-hidden backdrop-blur-sm"
            >
              {/* Corner calibrations */}
              <span className="absolute top-2.5 left-2.5 font-mono text-[8px] text-text-muted/20 select-none">[0,0]</span>
              <span className="absolute top-2.5 right-2.5 font-mono text-[8px] text-text-muted/20 select-none">[1,0]</span>
              <span className="absolute bottom-2.5 left-2.5 font-mono text-[8px] text-text-muted/20 select-none">[0,1]</span>
              <span className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-text-muted/20 select-none">[1,1]</span>

              {/* Drawing surface */}
              <canvas ref={canvasRef} className="w-full h-full block" />
            </motion.div>
          </div>

        </div>
      </Container>

      {/* Structural bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-line/40" />
    </section>
  );
}

