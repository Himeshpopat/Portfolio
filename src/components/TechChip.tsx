
interface TechChipProps {
  label: string;
}

export default function TechChip({ label }: TechChipProps) {
  return (
    <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-mono rounded-full border border-signal-violet/25 bg-signal-violet/5 text-signal-violet select-none hover:border-signal-violet/50 hover:bg-signal-violet/10 transition-colors duration-200">
      {label}
    </span>
  );
}
