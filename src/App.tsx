import { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import SignalLine from './components/SignalLine';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function App() {
  const isReduced = useReducedMotion();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    // If user prefers reduced motion, disable smooth scroll animations
    if (isReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isReduced]);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden selection:bg-signal-cyan/20 selection:text-signal-cyan">
      
      {/* Scroll-Reactive Signal Wave Trace */}
      <SignalLine />

      {/* Sticky Header Nav Bar */}
      <Navigation />

      {/* Structured Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />

    </div>
  );
}
