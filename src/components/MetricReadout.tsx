
interface MetricReadoutProps {
  value: string;
  label: string;
  className?: string;
}

export default function MetricReadout({ value, label, className = '' }: MetricReadoutProps) {
  return (
    <div className={`flex flex-col font-mono border-l-2 border-signal-amber/40 pl-3.5 select-none ${className}`}>
      <span className="text-xl sm:text-2xl font-bold text-signal-amber tracking-tight">
        {value}
      </span>
      <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}
