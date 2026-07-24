import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({ message, onRetry, className = '' }: ErrorStateProps) {
  return (
    <div className={`p-4 bg-signal-amber/5 border border-signal-amber/35 rounded-[10px] flex gap-3 text-signal-amber font-mono text-xs select-none ${className}`}>
      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-bold uppercase tracking-wider mb-1">
          [System Error: DATA_TRANSMISSION_FAILURE]
        </p>
        <p className="text-text-muted leading-relaxed">
          {message}
        </p>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="mt-2.5 inline-flex items-center text-signal-cyan underline font-bold uppercase tracking-wider hover:brightness-115 transition-all cursor-pointer"
          >
            Re-establish Connection &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
