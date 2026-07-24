import { motion } from 'framer-motion';
import { Github, Linkedin, Award, Mail, ChevronRight, FileText } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import SocialIconButton from '../components/SocialIconButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Hero() {
  const isReduced = useReducedMotion();

  // Entrance animations timed to orchestrate with the SignalLine (0.6s) and Navigation entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReduced ? 0 : 0.12,
        delayChildren: isReduced ? 0.1 : 0.7,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isReduced ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for sticky nav
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: isReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-[85vh] flex items-center justify-center pt-24 pb-12 relative overflow-hidden bg-grid-telemetry radar-sweep"
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 bg-dots-telemetry opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/80 to-bg" />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left max-w-4xl"
        >
          {/* Eyebrow Status Readout */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 mb-4 px-2 py-0.5 bg-signal-cyan/5 border border-signal-cyan/20 rounded-md font-mono text-xs text-signal-cyan select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan animate-pulse" />
            <span>AI/ML INTERN &middot; INDIA METEOROLOGICAL DEPARTMENT</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] text-text-primary mb-6"
          >
            Himesh Popat
          </motion.h1>

          {/* Positioning statement (prose, direct, no buzzwords) */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mb-10 font-sans"
          >
            B.Tech Information Technology student at KJSIT and AI/ML Intern at the India Meteorological Department. I design and build highly optimized time-series weather forecasting pipelines and scalable web backends.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
          >
            <Button 
              variant="primary" 
              onClick={() => handleScrollTo('projects')}
              className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider"
            >
              <span>View Projects</span>
              <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Contact Candidate</span>
            </Button>
          </motion.div>

          {/* Social Row */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3.5"
          >
            <SocialIconButton 
              href="https://github.com/himesh-popat" // TODO: verify username
              icon={Github} 
              label="GitHub Profile" 
            />
            <SocialIconButton 
              href="https://linkedin.com/in/himesh-popat" // TODO: verify profile
              icon={Linkedin} 
              label="LinkedIn Profile" 
            />
            <SocialIconButton 
              href="https://leetcode.com/u/himesh-popat" // TODO: verify username
              icon={Award} 
              label="LeetCode Profile" 
            />
            <SocialIconButton 
              href="mailto:himesh.popat@example.com" // TODO: update with real email
              icon={Mail} 
              label="Email Candidate" 
            />
          </motion.div>

        </motion.div>
      </Container>

      {/* Structural bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-line" />
    </section>
  );
}
