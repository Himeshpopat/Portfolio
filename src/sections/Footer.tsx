import Container from '../components/Container';

export default function Footer() {
  return (
    <footer 
      className="py-8 border-t border-line bg-bg relative z-10 select-none" 
      aria-label="Footer Technical Specifications"
    >
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-text-muted/50 uppercase tracking-widest">
        
        {/* Pulsing signal status */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan animate-pulse shrink-0" />
          <span>Status: Uplink Nominal [200 OK]</span>
        </div>

        {/* Local time and coordinates spec */}
        <div className="hidden sm:block">
          <span>LOC: BOM_IND &middot; CLOCK: T+{new Date().getFullYear()}</span>
        </div>

        {/* Copyright notice */}
        <span>
          &copy; {new Date().getFullYear()} Himesh Popat &middot; Core Instrument Panel
        </span>

      </Container>
    </footer>
  );
}
