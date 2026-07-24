import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import { experiences } from '../data/experience';
import { Calendar, MapPin } from 'lucide-react';

interface TextSegment {
  text: string;
  bold: boolean;
}

export default function Experience() {
  const parseExperienceBullet = (text: string): TextSegment[] => {
    const segments: TextSegment[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ text: text.substring(lastIndex, match.index), bold: false });
      }
      segments.push({ text: match[1], bold: true });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      segments.push({ text: text.substring(lastIndex), bold: false });
    }
    return segments;
  };

  return (
    <SectionWrapper id="experience" ariaLabel="Professional Experience">
      <Container>
        <SectionEyebrow label="TELEMETRY_LOGS" code="0x02" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Experience History
        </h2>

        {/* Refined vertical timeline stream */}
        <div className="max-w-4xl border-l-2 border-line/50 pl-6 md:pl-8 ml-4 relative py-2">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              
              {/* Active pulsing timeline node indicator */}
              <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-[14px] h-[14px] rounded-full border border-signal-cyan/40 bg-bg flex items-center justify-center select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-signal-cyan animate-pulse" />
              </span>

              {/* Node Header info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-6">
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-signal-cyan tracking-wider uppercase block mt-1">
                    {exp.company}
                  </span>
                </div>

                {/* Metadata tags row */}
                <div className="flex items-center gap-4 text-xs font-mono text-text-muted select-none mt-1 md:mt-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-text-muted/40" />
                    <span>{exp.startDate} &mdash; {exp.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-text-muted/40" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Work Outcomes list details */}
              <ul className="space-y-4 text-sm md:text-base text-text-muted leading-relaxed font-sans mt-4">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-start gap-3">
                    <span className="text-signal-cyan font-mono select-none mt-1 text-base">&rsaquo;</span>
                    <span className="text-text-muted">
                      {parseExperienceBullet(bullet).map((seg, sIdx) => 
                        seg.bold ? (
                          <strong key={sIdx} className="text-text-primary font-bold">{seg.text}</strong>
                        ) : (
                          <span key={sIdx}>{seg.text}</span>
                        )
                      )}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
