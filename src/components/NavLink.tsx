import React from 'react';

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavLink({ href, active, children, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative py-1.5 text-xs font-mono uppercase tracking-widest transition-colors duration-200 outline-none focus-visible:text-signal-cyan ${
        active ? 'text-signal-cyan font-bold' : 'text-text-muted hover:text-text-primary'
      } group`}
    >
      {children}
      <span 
        className={`absolute bottom-0 left-0 h-[1.5px] bg-signal-cyan transition-all duration-150 ease-out-expo ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </a>
  );
}
