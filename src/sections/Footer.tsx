import Container from '../components/Container';

export default function Footer() {
  return (
    <footer className="py-6 border-t border-line bg-bg relative z-10 select-none" aria-label="Footer Site Status">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-text-muted uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan animate-pulse" />
          <span>Status: Uplink Nominal [200 OK]</span>
        </div>
        <span>&copy; {new Date().getFullYear()} Himesh Popat &middot; Core Instrument Panel</span>
      </Container>
    </footer>
  );
}
