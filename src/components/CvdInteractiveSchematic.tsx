import { useState } from 'react';

type BlindnessType = 'NORMAL' | 'PROTANOPIA' | 'DEUTERANOPIA' | 'TRITANOPIA';

interface MatrixData {
  matrix: number[][];
  label: string;
  lmsVector: string;
}

const MATRICES: Record<BlindnessType, MatrixData> = {
  NORMAL: {
    matrix: [
      [1.00, 0.00, 0.00],
      [0.00, 1.00, 0.00],
      [0.00, 0.00, 1.00]
    ],
    label: "Identity Matrix [1:1 Spectrum Passthrough]",
    lmsVector: "LMS_FULL [L=1.0, M=1.0, S=1.0]"
  },
  PROTANOPIA: {
    matrix: [
      [0.567, 0.433, 0.000],
      [0.558, 0.442, 0.000],
      [0.000, 0.242, 0.758]
    ],
    label: "L-Cone Deficiency Projection [Red Shift]",
    lmsVector: "LMS_PROTAN [L=0.0, M=1.0, S=1.0]"
  },
  DEUTERANOPIA: {
    matrix: [
      [0.625, 0.375, 0.000],
      [0.700, 0.300, 0.000],
      [0.000, 0.142, 0.858]
    ],
    label: "M-Cone Deficiency Projection [Green Shift]",
    lmsVector: "LMS_DEUTER [L=1.0, M=0.0, S=1.0]"
  },
  TRITANOPIA: {
    matrix: [
      [0.950, 0.050, 0.000],
      [0.000, 0.433, 0.567],
      [0.000, 0.475, 0.525]
    ],
    label: "S-Cone Deficiency Projection [Blue Shift]",
    lmsVector: "LMS_TRITAN [L=1.0, M=1.0, S=0.0]"
  }
};

export default function CvdInteractiveSchematic() {
  const [activeType, setActiveType] = useState<BlindnessType>('NORMAL');
  const [showMatrixSheet, setShowMatrixSheet] = useState(false);

  const currentData = MATRICES[activeType];

  return (
    <div className="w-full bg-surface-raised/40 border border-line/60 rounded-[10px] p-4 md:p-5 flex flex-col gap-4 font-sans select-none">
      
      {/* 1. Header Row: System Status (Primitive D) */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${activeType === 'NORMAL' ? 'bg-signal-cyan animate-pulse' : 'bg-signal-amber'}`} />
          <span className="text-text-muted uppercase tracking-wider">
            [SYS_CVD_TRANSFORM]
          </span>
        </div>
        <span className="text-[10px] text-signal-cyan/70 tracking-widest uppercase">
          {activeType === 'NORMAL' ? 'STATUS: NOMINAL' : 'STATUS: EVALUATING'}
        </span>
      </div>

      {/* 2. Interactive Wavelength Canvas (Primitive B) */}
      <div className="w-full h-[140px] md:h-[160px] bg-bg/80 border border-line/50 rounded-[8px] relative overflow-hidden flex items-center justify-center">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 400 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="cvd-interactive-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31, 39, 51, 0.4)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cvd-interactive-grid)"/>

          <line x1="20" y1="80" x2="380" y2="80" stroke="rgba(31, 39, 51, 0.6)" strokeWidth="1" strokeDasharray="3 3"/>

          {/* Dynamic Spectrum Wave Lines driven by matrix multipliers */}
          <path 
            d={`M 20 80 C 60 ${80 - 40 * currentData.matrix[0][0]}, 100 ${80 + 50 * currentData.matrix[0][1]}, 140 80 C 180 ${80 - 40 * currentData.matrix[0][0]}, 220 ${80 + 50 * currentData.matrix[0][1]}, 260 80 C 300 40, 340 120, 380 80`}
            stroke="#9d8cf0" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="transition-all duration-500 ease-out-expo"
            opacity={activeType === 'PROTANOPIA' ? 0.3 : 0.75}
          />
          <path 
            d={`M 20 80 C 50 ${80 + 45 * currentData.matrix[1][0]}, 90 ${80 - 45 * currentData.matrix[1][1]}, 130 80 C 170 ${80 + 45 * currentData.matrix[1][0]}, 210 ${80 - 45 * currentData.matrix[1][1]}, 250 80 C 290 120, 330 40, 370 80`}
            stroke="#5fd4d6" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="transition-all duration-500 ease-out-expo"
            opacity={activeType === 'DEUTERANOPIA' ? 0.3 : 0.75}
          />
          <path 
            d={`M 20 80 C 70 ${80 + 35 * currentData.matrix[2][1]}, 110 ${80 - 35 * currentData.matrix[2][2]}, 150 80 C 190 ${80 + 35 * currentData.matrix[2][1]}, 230 ${80 - 35 * currentData.matrix[2][2]}, 270 80 C 310 100, 350 60, 380 80`}
            stroke="#e8a94c" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="transition-all duration-500 ease-out-expo"
            opacity={activeType === 'TRITANOPIA' ? 0.3 : 0.75}
          />

          {/* Matrix Projection Box Indicator */}
          <g transform="translate(160, 45)">
            <rect width="80" height="70" rx="6" fill="#11151c" stroke="rgba(95, 212, 214, 0.4)" strokeWidth="1"/>
            <text x="40" y="30" fill="#5fd4d6" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">[BRETTEL_3X3]</text>
            <text x="40" y="46" fill="rgba(231, 234, 240, 0.6)" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">{activeType}</text>
          </g>
        </svg>
      </div>

      {/* 3. Control Panel Bar (Primitive A) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface/50 p-1 border border-line/60 rounded-[8px]">
        {(['NORMAL', 'PROTANOPIA', 'DEUTERANOPIA', 'TRITANOPIA'] as BlindnessType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`py-2 px-2 rounded-[6px] font-mono text-[10px] tracking-wider uppercase transition-all duration-200 min-h-[44px] flex items-center justify-center outline-none ${
              activeType === type
                ? 'bg-signal-cyan/15 border border-signal-cyan/40 text-signal-cyan font-bold'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-raised/60 border border-transparent'
            }`}
          >
            {type === 'NORMAL' ? 'NORMAL' : type.substring(0, 6)}
          </button>
        ))}
      </div>

      {/* 4. Monospaced Formula & Output Spec Sheet (Primitive C) */}
      <div className="bg-bg/90 border border-line/60 rounded-[8px] p-3 text-xs font-mono text-text-muted">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-line/40">
          <span className="text-[10px] text-signal-cyan uppercase tracking-wider">
            {currentData.label}
          </span>
          <button 
            onClick={() => setShowMatrixSheet(!showMatrixSheet)}
            className="text-[9px] text-text-muted/60 hover:text-signal-cyan underline uppercase outline-none"
          >
            {showMatrixSheet ? '[HIDE_COEFFICIENTS]' : '[VIEW_MATRIX_COEFFICIENTS]'}
          </button>
        </div>

        {/* Real-time 3x3 Matrix Projection Display */}
        {showMatrixSheet && (
          <div className="my-2 p-2 bg-surface-raised/50 border border-line/40 rounded-[6px] space-y-1 text-[10px] text-text-primary font-mono transition-all">
            <div className="text-text-muted/50 text-[9px] mb-1">// PROJECTION MATRIX Multipliers [3x3]</div>
            {currentData.matrix.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-between px-2">
                {row.map((val, cIdx) => (
                  <span key={cIdx} className={val > 0.5 ? 'text-signal-cyan' : 'text-text-muted'}>
                    {val.toFixed(3)}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="text-[10px] text-text-muted/70 flex justify-between pt-1">
          <span>VECTOR: {currentData.lmsVector}</span>
          <span>LATENCY: &lt; 200ms</span>
        </div>
      </div>

    </div>
  );
}
