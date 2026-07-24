import React, { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import NavLink from './NavLink';
import Container from './Container';
import { Menu, X, Cpu } from 'lucide-react';

const SECTIONS = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isReduced = useReducedMotion();
  
  // Highlight navigation item as active when corresponding section takes up >= 35% of observed area
  const activeSection = useActiveSection(SECTIONS, 35);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe navigation click to account for the fixed header height
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -72; // Nav height offset (including borders & line)
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ 
        top: y, 
        behavior: isReduced ? 'auto' : 'smooth' 
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 select-none ${
        scrolled 
          ? 'py-3 bg-bg/95 border-b border-line shadow-soft backdrop-blur-sm' 
          : 'py-4.5 bg-transparent border-b border-transparent'
      }`}
      aria-label="Primary Navigation Feed"
    >
      <Container className="flex items-center justify-between">
        {/* Technical Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5 font-display font-bold text-xs tracking-widest text-text-primary outline-none focus-visible:text-signal-cyan"
        >
          <Cpu className="w-4 h-4 text-signal-cyan" />
          <span>HIMESH_POPAT</span>
        </a>

        {/* Desktop menu row */}
        <div className="hidden md:flex items-center gap-7">
          {SECTIONS.map((sec) => (
            <NavLink
              key={sec}
              href={`#${sec}`}
              active={activeSection === sec}
              onClick={(e) => handleNavClick(e, sec)}
            >
              {sec}
            </NavLink>
          ))}
        </div>

        {/* Hamburger button on mobile view */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-text-muted hover:text-text-primary focus-visible:text-signal-cyan outline-none"
          aria-label="Toggle navigation overlay drawer"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {/* Mobile Drawer panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[52px] bg-bg/98 z-40 md:hidden flex flex-col items-center justify-center gap-8 py-8 border-t border-line font-mono">
          {SECTIONS.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              onClick={(e) => handleNavClick(e, sec)}
              className={`text-base uppercase tracking-widest transition-colors relative py-1 focus-visible:text-signal-cyan outline-none ${
                activeSection === sec ? 'text-signal-cyan font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {sec}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
