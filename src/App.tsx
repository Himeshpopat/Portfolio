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

export default function App() {
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
