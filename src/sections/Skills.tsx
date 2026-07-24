import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import TechChip from '../components/TechChip';
import { skillCategories } from '../data/skills';

export default function Skills() {
  return (
    <SectionWrapper id="skills" ariaLabel="Technical Skills">
      <Container>
        <SectionEyebrow label="SKILL_INVENTORY" code="0x04" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Capabilities & Toolkit
        </h2>

        {/* Matrix of capabilities (Divided technical grid rows) */}
        <div className="max-w-5xl border-t border-line/40 mt-8 divide-y divide-line/30">
          {skillCategories.map((cat, idx) => (
            <div 
              key={idx} 
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 md:py-8 items-start hover:bg-surface/5 transition-colors duration-200 px-2 rounded-md"
            >
              {/* Category indicator label (left 4 columns) */}
              <div className="md:col-span-4 select-none">
                <span className="font-mono text-[9px] tracking-widest text-signal-cyan/50 uppercase block mb-1">
                  [CATEGORY_{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}]
                </span>
                <h3 className="font-mono text-xs uppercase tracking-widest text-text-primary font-bold">
                  {cat.category}
                </h3>
              </div>

              {/* Tag grid (right 8 columns) */}
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {cat.items.map((skill, skillIdx) => (
                  <TechChip key={skillIdx} label={skill} />
                ))}
              </div>

            </div>
          ))}
        </div>

      </Container>
    </SectionWrapper>
  );
}
