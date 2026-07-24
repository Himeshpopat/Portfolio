
interface EmptyStateProps {
  initials: string;
  className?: string;
}

export default function EmptyState({ initials, className = '' }: EmptyStateProps) {
  return (
    <div className={`w-full h-full min-h-[160px] bg-surface-raised/40 border border-line rounded-[10px] flex items-center justify-center relative overflow-hidden select-none ${className}`}>
      {/* Corner crosshairs for technical look */}
      <span className="absolute top-2 left-2 font-mono text-[9px] text-text-muted/20 select-none">+</span>
      <span className="absolute top-2 right-2 font-mono text-[9px] text-text-muted/20 select-none">+</span>
      <span className="absolute bottom-2 left-2 font-mono text-[9px] text-text-muted/20 select-none">+</span>
      <span className="absolute bottom-2 right-2 font-mono text-[9px] text-text-muted/20 select-none">+</span>
      
      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-dots-telemetry opacity-40" />

      <div className="flex flex-col items-center justify-center gap-1.5 z-10 text-center px-4">
        <span className="font-mono text-[10px] tracking-wider text-signal-cyan/50 uppercase">
          [Telemetry Offline]
        </span>
        <h3 className="font-display text-2xl font-bold text-text-muted/80 tracking-widest">
          {initials}
        </h3>
      </div>
    </div>
  );
}
