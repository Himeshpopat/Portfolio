import React, { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import NavLink from './NavLink';
import { Menu, X } from 'lucide-react';

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

  // Safe navigation click to account for the floating header height offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -72; // Header offset (including margins & padding)
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ 
        top: y, 
        behavior: isReduced ? 'auto' : 'smooth' 
      });
    }
  };

  return (
    <nav 
      className="fixed top-4 left-0 w-full z-50 px-4 md:px-6 select-none pointer-events-none"
      aria-label="Primary Navigation Feed"
    >
      <div 
        className={`mx-auto max-w-5xl rounded-[12px] bg-bg/80 border backdrop-blur-md px-6 flex items-center justify-between pointer-events-auto transition-all duration-300 relative ${
          scrolled 
            ? 'py-2.5 shadow-soft border-line' 
            : 'py-3.5 border-line/40'
        }`}
      >
        {/* Technical Logo without CPU icon */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 font-display font-bold text-xs tracking-widest text-text-primary outline-none focus-visible:text-signal-cyan"
        >
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

        {/* Mobile Drawer panel: Drops down elegantly directly below the floating pill */}
        {mobileMenuOpen && (
          <div className="absolute top-[58px] left-0 right-0 bg-bg/95 border border-line/60 rounded-[12px] p-6 backdrop-blur-md flex flex-col items-center gap-5 font-mono pointer-events-auto shadow-soft md:hidden">
            {SECTIONS.map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={(e) => handleNavClick(e, sec)}
                className={`text-sm uppercase tracking-widest transition-colors relative py-1 focus-visible:text-signal-cyan outline-none ${
                  activeSection === sec ? 'text-signal-cyan font-bold' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {sec}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
