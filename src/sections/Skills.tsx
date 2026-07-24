import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import Card from '../components/Card';
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

        {/* 12-column grid layout for skills classification */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <Card key={idx} className="p-5 flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-signal-cyan font-bold border-b border-line pb-3 select-none">
                {cat.category}
              </h3>
              
              <div className="flex flex-wrap gap-2 pt-1.5">
                {cat.items.map((skill, skillIdx) => (
                  <TechChip key={skillIdx} label={skill} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
