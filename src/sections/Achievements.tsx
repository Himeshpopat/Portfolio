import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import AnimatedCounter from '../components/AnimatedCounter';
import { achievements } from '../data/achievements';

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" ariaLabel="Key Achievements">
      <Container>
        <SectionEyebrow label="SYSTEM_METRICS" code="0x05" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Engineering Ranks & Achievements
        </h2>

        {/* Unified border-partitioned System Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line/40 rounded-[12px] overflow-hidden bg-surface/5 backdrop-blur-sm">
          {achievements.map((ach, idx) => (
            <div 
              key={idx} 
              className="p-6 md:p-8 border-r border-b border-line/40 flex flex-col justify-between hover:bg-surface/10 transition-colors duration-300 gap-6"
            >
              {/* Telemetry Numeric Score reading at the top */}
              <div>
                <div className="text-3xl md:text-4xl font-mono font-bold text-signal-amber tracking-tight select-none mb-3">
                  <AnimatedCounter target={ach.value} />
                </div>
                <span className="font-mono text-[8px] tracking-widest text-signal-cyan/50 uppercase block select-none mb-1">
                  [METRIC_READOUT_0{idx + 1}]
                </span>
              </div>
              
              {/* Metadata Details at the bottom */}
              <div>
                <h4 className="font-display font-bold text-sm text-text-primary leading-tight mb-1.5 select-none">
                  {ach.label}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed font-sans">
                  {ach.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
