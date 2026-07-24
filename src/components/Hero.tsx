import { motion } from 'framer-motion';
import { Terminal, ArrowDown, ChevronRight, Cpu, Sparkles, Code2, Rocket } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const roles = [
    { text: 'Full Stack Dev', icon: Code2, color: 'text-portfolio-primary' },
    { text: 'AI / ML Engineer', icon: Cpu, color: 'text-portfolio-secondary' },
    { text: 'Product Builder', icon: Rocket, color: 'text-portfolio-highlight' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-4 md:px-8 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center"
      >
        {/* Intro Pill Tag */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-portfolio-surface/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold text-portfolio-primary"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Vite × React × Three.js Stack</span>
        </motion.div>

        {/* Big Bold Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight leading-[1.05] mb-6 text-[#F8FAFC]"
        >
          Engineering ideas into{' '}
          <span className="bg-gradient-to-r from-portfolio-primary via-portfolio-secondary to-portfolio-highlight bg-clip-text text-transparent">
            intelligent products.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-portfolio-muted max-w-2xl mb-12 font-light leading-relaxed"
        >
          I am a software engineer, computer science student, and tech entrepreneur specialized in building high-performance full-stack web applications and AI integrations.
        </motion.p>

        {/* Roles Badges / Quick confidence check */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-14"
        >
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:border-white/10 hover:bg-portfolio-surface/75 group"
              >
                <div className={`p-3 rounded-xl bg-portfolio-bg border border-white/5 group-hover:border-portfolio-primary/20 transition-all ${role.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-portfolio-muted font-medium uppercase tracking-wider">Expertise</p>
                  <p className="text-sm font-semibold text-portfolio-text">{role.text}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => handleScrollTo('about')}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm bg-portfolio-surface hover:bg-portfolio-surface/70 border border-white/10 text-portfolio-text hover:text-portfolio-primary transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-portfolio-primary/5"
          >
            <Terminal className="w-4 h-4 text-portfolio-primary" />
            <span>Launch Developer Console</span>
            <ChevronRight className="w-4 h-4 text-portfolio-muted group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleScrollTo('projects')}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white hover:shadow-xl hover:shadow-portfolio-primary/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white/10"
          >
            <span>Browse Showcase</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating indicators at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleScrollTo('about')}>
        <span className="text-[10px] tracking-widest font-mono text-portfolio-muted uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-portfolio-primary" />
        </motion.div>
      </div>
    </section>
  );
}
