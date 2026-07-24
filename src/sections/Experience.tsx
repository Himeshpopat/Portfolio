import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import Card from '../components/Card';
import { experiences } from '../data/experience';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  // Utility function to inject amber-mono metrics in bold outcomes
  const formatBullet = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<span class="text-signal-amber font-mono font-bold">$1</span>');
  };

  return (
    <SectionWrapper id="experience" ariaLabel="Professional Experience">
      <Container>
        <SectionEyebrow label="TELEMETRY_LOGS" code="0x02" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Experience History
        </h2>

        <div className="max-w-4xl">
          {experiences.map((exp, idx) => (
            <Card key={idx} className="p-6 md:p-8">
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-line/60">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-signal-cyan/5 border border-signal-cyan/20 rounded-[10px] text-signal-cyan mt-1">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-signal-cyan font-mono tracking-wider mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                </div>

                {/* Metadata Column */}
                <div className="flex flex-row md:flex-col items-start gap-3 md:gap-1.5 md:items-end text-xs font-mono text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-text-muted/60" />
                    <span>{exp.startDate} &mdash; {exp.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-text-muted/60" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Outcomes Bullet List */}
              <ul className="space-y-4 text-sm text-text-muted leading-relaxed font-sans">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-start gap-3">
                    {/* Status marker */}
                    <span className="text-signal-cyan font-mono select-none mt-1 text-base">&rsaquo;</span>
                    <span 
                      dangerouslySetInnerHTML={{ __html: formatBullet(bullet) }}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
