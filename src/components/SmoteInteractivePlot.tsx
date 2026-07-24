import { useState } from 'react';

export default function SmoteInteractivePlot() {
  const [smoteActive, setSmoteActive] = useState(false);

  return (
    <div className="w-full bg-surface-raised/40 border border-line/60 rounded-[10px] p-4 md:p-5 flex flex-col gap-4 font-sans select-none">
      
      {/* 1. Header Row: System Status (Primitive D) */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${smoteActive ? 'bg-signal-cyan animate-pulse' : 'bg-signal-amber'}`} />
          <span className="text-text-muted uppercase tracking-wider">
            [SYS_SMOTE_CLASSIFIER]
          </span>
        </div>
        <span className="text-[10px] text-signal-cyan/70 tracking-widest uppercase">
          {smoteActive ? 'STATUS: SMOTE_OPTIMIZED' : 'STATUS: UNBALANCED'}
        </span>
      </div>

      {/* 2. Interactive Coordinate Scatter Plot (Primitive B) */}
      <div className="w-full h-[140px] md:h-[160px] bg-bg/80 border border-line/50 rounded-[8px] relative overflow-hidden flex items-center justify-center">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 400 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="smote-interactive-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31, 39, 51, 0.4)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smote-interactive-grid)"/>

          {/* Coordinate Axes */}
          <line x1="40" y1="20" x2="40" y2="140" stroke="rgba(31, 39, 51, 0.6)" strokeWidth="1"/>
          <line x1="40" y1="140" x2="380" y2="140" stroke="rgba(31, 39, 51, 0.6)" strokeWidth="1"/>

          {/* Dynamic Logistic Decision Boundary Curve */}
          <path 
            d={smoteActive ? "M 40 130 Q 140 110, 210 75 T 380 30" : "M 40 110 Q 140 100, 240 90 T 380 70"} 
            stroke="#e8a94c" 
            strokeWidth="1.8" 
            className="transition-all duration-500 ease-out-expo"
          />

          {/* Majority Class Scatter Points (Cyan) */}
          <circle cx="80" cy="120" r="3" fill="#5fd4d6" opacity="0.7"/>
          <circle cx="100" cy="125" r="3" fill="#5fd4d6" opacity="0.7"/>
          <circle cx="120" cy="115" r="3" fill="#5fd4d6" opacity="0.7"/>
          <circle cx="140" cy="130" r="3" fill="#5fd4d6" opacity="0.7"/>
          <circle cx="90" cy="100" r="3" fill="#5fd4d6" opacity="0.7"/>
          <circle cx="160" cy="105" r="3" fill="#5fd4d6" opacity="0.7"/>

          {/* Original Minority Class Points (Violet) */}
          <circle cx="260" cy="50" r="3" fill="#9d8cf0" opacity="0.8"/>
          <circle cx="290" cy="40" r="3" fill="#9d8cf0" opacity="0.8"/>
          <circle cx="310" cy="65" r="3" fill="#9d8cf0" opacity="0.8"/>
          <circle cx="330" cy="35" r="3" fill="#9d8cf0" opacity="0.8"/>

          {/* Synthetic SMOTE Resampled Points (Appears when SMOTE is active) */}
          {smoteActive && (
            <g className="transition-all duration-500">
              <circle cx="220" cy="70" r="3.5" fill="#9d8cf0" stroke="#5fd4d6" strokeWidth="0.8" opacity="0.9" />
              <circle cx="240" cy="60" r="3.5" fill="#9d8cf0" stroke="#5fd4d6" strokeWidth="0.8" opacity="0.9" />
              <circle cx="275" cy="55" r="3.5" fill="#9d8cf0" stroke="#5fd4d6" strokeWidth="0.8" opacity="0.9" />
              <circle cx="300" cy="48" r="3.5" fill="#9d8cf0" stroke="#5fd4d6" strokeWidth="0.8" opacity="0.9" />
              <circle cx="345" cy="42" r="3.5" fill="#9d8cf0" stroke="#5fd4d6" strokeWidth="0.8" opacity="0.9" />
            </g>
          )}

          <text x="50" y="25" fill="rgba(137, 146, 163, 0.5)" fontSize="7" fontFamily="JetBrains Mono">[GLUCOSE_VS_BMI]</text>
        </svg>
      </div>

      {/* 3. Control Panel Bar (Primitive A) */}
      <div className="grid grid-cols-2 gap-2 bg-surface/50 p-1 border border-line/60 rounded-[8px]">
        <button
          onClick={() => setSmoteActive(false)}
          className={`py-2 px-3 rounded-[6px] font-mono text-[10px] tracking-wider uppercase transition-all duration-200 min-h-[44px] flex items-center justify-center outline-none ${
            !smoteActive
              ? 'bg-signal-amber/15 border border-signal-amber/40 text-signal-amber font-bold'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-raised/60 border border-transparent'
          }`}
        >
          SMOTE: OFF (RAW DATA)
        </button>
        <button
          onClick={() => setSmoteActive(true)}
          className={`py-2 px-3 rounded-[6px] font-mono text-[10px] tracking-wider uppercase transition-all duration-200 min-h-[44px] flex items-center justify-center outline-none ${
            smoteActive
              ? 'bg-signal-cyan/15 border border-signal-cyan/40 text-signal-cyan font-bold'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-raised/60 border border-transparent'
          }`}
        >
          SMOTE: ON (BALANCED)
        </button>
      </div>

      {/* 4. Monospaced Formula & Output Spec Sheet (Primitive C) */}
      <div className="bg-bg/90 border border-line/60 rounded-[8px] p-3 text-xs font-mono text-text-muted">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-line/40">
          <span className="text-[10px] text-signal-cyan uppercase tracking-wider">
            {smoteActive ? 'Synthetic Minority Over-sampling Active' : 'Unbalanced Medical Class Partition'}
          </span>
          <span className="text-[9px] text-text-muted/60 uppercase">
            [768 RECORDS]
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-text-muted/60 block">// DIAGNOSTIC RECALL</span>
            <span className={smoteActive ? 'text-signal-cyan font-bold' : 'text-signal-amber font-bold'}>
              {smoteActive ? '67.0% [OPTIMIZED]' : '58.0% [HIGH FALSE NEGATIVES]'}
            </span>
          </div>
          <div>
            <span className="text-text-muted/60 block">// MODEL ACCURACY</span>
            <span className="text-text-primary font-bold">71.4% (LOGISTIC_REGRESSION)</span>
          </div>
        </div>

        <div className="text-[10px] text-text-muted/60 pt-2 flex justify-between border-t border-line/40 mt-2">
          <span>SAMPLING: {smoteActive ? 'k_neighbors=5 (k-NN)' : 'none'}</span>
          <span>DATASET: Pima Indians</span>
        </div>
      </div>

    </div>
  );
}
