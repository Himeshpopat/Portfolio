
interface SectionEyebrowProps {
  label: string;
  code?: string;
}

export default function SectionEyebrow({ label, code }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-2 mb-3 text-signal-cyan font-mono text-xs uppercase tracking-wider select-none">
      {code && (
        <span className="text-signal-cyan/50 font-medium">
          [{code}]
        </span>
      )}
      <span className="text-signal-cyan/30">&#8212;</span>
      <span className="font-semibold tracking-widest">{label}</span>
    </div>
  );
}
