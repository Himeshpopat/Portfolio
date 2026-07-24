import type { Project } from '../data/projects';
import Card from './Card';
import TechChip from './TechChip';
import MetricReadout from './MetricReadout';

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
}

// 1. Custom SVG Schematic: Color Vision Deficiency Simulation (RGB light channels matrix operation)
function CvdSchematic() {
  return (
    <svg className="w-full h-full bg-surface-raised/40 border border-line rounded-[8px]" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cvd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31, 39, 51, 0.4)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cvd-grid)"/>
      <line x1="40" y1="112.5" x2="360" y2="112.5" stroke="rgba(31, 39, 51, 0.5)" strokeWidth="1" strokeDasharray="3 3"/>
      
      {/* Lightwaves curves */}
      <path d="M 40 112.5 C 80 50, 120 175, 160 112.5 C 200 50, 240 175, 280 112.5" stroke="#9d8cf0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M 40 112.5 C 70 175, 110 50, 150 112.5 C 190 175, 230 50, 270 112.5" stroke="#5fd4d6" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M 40 112.5 C 90 150, 130 75, 170 112.5" stroke="#e8a94c" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>

      {/* Central Matrix coefficient block */}
      <rect x="175" y="72.5" width="90" height="80" rx="6" fill="#11151c" stroke="rgba(95, 212, 214, 0.35)" strokeWidth="1"/>
      <text x="220" y="108" fill="#5fd4d6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">[NUMPY]</text>
      <text x="220" y="122" fill="rgba(231, 234, 240, 0.6)" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">MATRIX_OP</text>

      {/* Tech parameters */}
      <text x="50" y="30" fill="rgba(137, 146, 163, 0.5)" fontSize="7" fontFamily="JetBrains Mono">[INPUT_SPECTRUM]</text>
      <text x="300" y="30" fill="rgba(137, 146, 163, 0.5)" fontSize="7" fontFamily="JetBrains Mono">[SIM_OUTPUT]</text>
      <circle cx="220" cy="112.5" r="3" fill="#5fd4d6"/>
    </svg>
  );
}

// 2. Custom SVG Schematic: Veloxa Transaction Workflow
function VeloxaSchematic() {
  return (
    <svg className="w-full h-full bg-surface-raised/40 border border-line rounded-[8px]" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="vx-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31, 39, 51, 0.4)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#vx-grid)"/>

      <g opacity="0.8">
        <rect x="35" y="92.5" width="75" height="40" rx="6" fill="#11151c" stroke="rgba(31, 39, 51, 0.8)" strokeWidth="1"/>
        <text x="72.5" y="112" fill="rgba(231, 234, 240, 0.8)" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">OTP_AUTH</text>
        <text x="72.5" y="124" fill="rgba(137, 146, 163, 0.5)" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle">[STAGE_01]</text>
        
        <line x1="110" y1="112.5" x2="160" y2="112.5" stroke="rgba(95, 212, 214, 0.3)" strokeWidth="1" strokeDasharray="2 2"/>

        <rect x="162.5" y="92.5" width="75" height="40" rx="6" fill="#11151c" stroke="rgba(95, 212, 214, 0.3)" strokeWidth="1"/>
        <text x="200" y="112" fill="#5fd4d6" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">ORDER_PIPE</text>
        <text x="200" y="124" fill="rgba(95, 212, 214, 0.6)" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle">[3-STAGE]</text>

        <line x1="237.5" y1="112.5" x2="287.5" y2="112.5" stroke="rgba(95, 212, 214, 0.3)" strokeWidth="1" strokeDasharray="2 2"/>

        <rect x="290" y="92.5" width="75" height="40" rx="6" fill="#11151c" stroke="rgba(31, 39, 51, 0.8)" strokeWidth="1"/>
        <text x="327.5" y="112" fill="rgba(231, 234, 240, 0.8)" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">BREVO_TX</text>
        <text x="327.5" y="124" fill="rgba(137, 146, 163, 0.5)" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle">[STAGE_03]</text>
      </g>

      <text x="40" y="35" fill="rgba(137, 146, 163, 0.5)" fontSize="7" fontFamily="JetBrains Mono">[B2B_TRANSACTION_PIPELINE]</text>
    </svg>
  );
}

// 3. Custom SVG Schematic: Diabetes Classifier Decision Boundary Plot
function DiabetesSchematic() {
  return (
    <svg className="w-full h-full bg-surface-raised/40 border border-line rounded-[8px]" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="drp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31, 39, 51, 0.4)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#drp-grid)"/>

      <line x1="50" y1="35" x2="50" y2="190" stroke="rgba(31, 39, 51, 0.6)" strokeWidth="1"/>
      <line x1="50" y1="190" x2="350" y2="190" stroke="rgba(31, 39, 51, 0.6)" strokeWidth="1"/>

      <path d="M 50 170 Q 150 150, 200 112.5 T 350 55" stroke="#e8a94c" strokeWidth="1.5" opacity="0.8"/>
      <text x="210" y="95" fill="#e8a94c" fontSize="7" fontFamily="JetBrains Mono">[DECISION_BOUNDARY]</text>

      {/* Group dots */}
      <circle cx="100" cy="150" r="3" fill="#5fd4d6" opacity="0.6"/>
      <circle cx="120" cy="160" r="3" fill="#5fd4d6" opacity="0.6"/>
      <circle cx="80" cy="120" r="3" fill="#5fd4d6" opacity="0.6"/>
      <circle cx="140" cy="140" r="3" fill="#5fd4d6" opacity="0.6"/>

      <circle cx="280" cy="80" r="3" fill="#9d8cf0" opacity="0.6"/>
      <circle cx="310" cy="70" r="3" fill="#9d8cf0" opacity="0.6"/>
      <circle cx="250" cy="90" r="3" fill="#9d8cf0" opacity="0.6"/>
      <circle cx="290" cy="100" r="3" fill="#9d8cf0" opacity="0.6"/>

      <text x="60" y="30" fill="rgba(137, 146, 163, 0.5)" fontSize="7" fontFamily="JetBrains Mono">[LOGISTIC_REGRESSION_MODEL]</text>
    </svg>
  );
}

export default function ProjectCard({ project, isFeatured = false }: ProjectCardProps) {
  
  const renderSchematic = () => {
    switch (project.initials) {
      case 'VX':
        return <VeloxaSchematic />;
      case 'CVD':
        return <CvdSchematic />;
      case 'DRP':
        return <DiabetesSchematic />;
      default:
        return (
          <div className="w-full h-full bg-surface-raised/40 border border-line rounded-[8px] flex items-center justify-center font-mono text-text-muted/60">
            [{project.initials}]
          </div>
        );
    }
  };

  // Card details block wrapper (Side-by-side grid on desktop if featured, vertical stacks otherwise)
  return (
    <Card className="flex flex-col h-full p-6 md:p-8 gap-6 hover:border-signal-cyan/30 transition-all duration-300">
      
      <div className={`grid grid-cols-1 ${isFeatured ? 'lg:grid-cols-12 lg:gap-8' : 'gap-6'} items-stretch flex-grow`}>
        
        {/* Schematic Canvas Section (col-span-5 on featured desktop) */}
        <div className={`w-full aspect-video rounded-[10px] overflow-hidden border border-line relative shrink-0 group/visual ${isFeatured ? 'lg:col-span-5 lg:h-full lg:aspect-auto lg:min-h-[220px]' : ''}`}>
          <div className="w-full h-full transition-transform duration-500 ease-out-expo group-hover/visual:scale-[1.015]">
            {renderSchematic()}
          </div>
        </div>

        {/* Content Details Section (col-span-7 on featured desktop) */}
        <div className={`flex flex-col gap-4.5 ${isFeatured ? 'lg:col-span-7' : ''}`}>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display font-bold text-xl text-text-primary tracking-tight">
                {project.title}
              </h3>
              {isFeatured && (
                <span className="font-mono text-[8px] px-2 py-0.5 border border-signal-cyan/30 bg-signal-cyan/5 text-signal-cyan rounded-md tracking-wider uppercase select-none">
                  Featured Case Study
                </span>
              )}
            </div>
            
            <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Core tech badges using clean tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((item, idx) => (
              <TechChip key={idx} label={item} />
            ))}
          </div>

          {/* Problem & Solution block */}
          <div className="text-xs space-y-2.5 border-l border-line/60 pl-3.5 py-1 font-sans">
            <p className="text-text-muted leading-relaxed">
              <strong className="text-text-primary font-medium">Problem:</strong> {project.problem}
            </p>
            <p className="text-text-muted leading-relaxed">
              <strong className="text-text-primary font-medium">Solution:</strong> {project.solution}
            </p>
          </div>

          {/* Outcomes Bullets parser */}
          <ul className="space-y-2 text-xs text-text-muted list-none pl-0 font-sans">
            {project.bullets.map((bullet, idx) => {
              const segments = [];
              const regex = /\*\*(.*?)\*\*/g;
              let lastIndex = 0;
              let match;
              while ((match = regex.exec(bullet)) !== null) {
                if (match.index > lastIndex) {
                  segments.push({ text: bullet.substring(lastIndex, match.index), bold: false });
                }
                segments.push({ text: match[1], bold: true });
                lastIndex = regex.lastIndex;
              }
              if (lastIndex < bullet.length) {
                segments.push({ text: bullet.substring(lastIndex), bold: false });
              }

              return (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-signal-cyan font-mono select-none mt-0.5">&rsaquo;</span>
                  <span>
                    {segments.map((seg, sIdx) => 
                      seg.bold ? (
                        <strong key={sIdx} className="text-text-primary font-medium">{seg.text}</strong>
                      ) : (
                        <span key={sIdx}>{seg.text}</span>
                      )
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex-grow" />

          {/* Dynamic key statistics bottom row */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line/40">
            {project.metrics.map((metric, idx) => (
              <MetricReadout key={idx} value={metric.value} label={metric.label} />
            ))}
          </div>

          {/* Monospaced code navigation links */}
          <div className="flex items-center gap-5 pt-1.5 text-xs font-mono select-none">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-signal-cyan py-0.5 group/link outline-none focus-visible:text-signal-cyan"
              >
                <span>Live Demo &rarr;</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-signal-cyan transition-all duration-200 ease-out-expo group-hover/link:w-full" />
              </a>
            ) : (
              <span className="text-text-muted/30 cursor-not-allowed select-none">
                [Demo Coming Soon]
              </span>
            )}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-signal-cyan py-0.5 group/link outline-none focus-visible:text-signal-cyan"
              >
                <span>Source Code &rarr;</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-signal-cyan transition-all duration-200 ease-out-expo group-hover/link:w-full" />
              </a>
            ) : (
              <span className="text-text-muted/30 cursor-not-allowed select-none">
                [Source Private]
              </span>
            )}
          </div>
        </div>

      </div>
    </Card>
  );
}
