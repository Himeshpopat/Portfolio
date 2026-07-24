import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import Card from '../components/Card';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((ach, idx) => (
            <Card key={idx} className="p-5 flex items-center gap-4.5">
              {/* Highlight numeric score / rating using amber count-ups */}
              <div className="text-lg sm:text-2xl font-mono font-bold text-signal-amber shrink-0 w-[110px] sm:w-[130px] border-r border-line pr-3 sm:pr-4 select-none text-left leading-tight">
                <AnimatedCounter target={ach.value} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-display font-bold text-sm text-text-primary leading-tight mb-1 select-none">
                  {ach.label}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed font-sans">
                  {ach.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
