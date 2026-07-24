import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <SectionWrapper id="projects" ariaLabel="Projects Showcase">
      <Container>
        <SectionEyebrow label="ENGINEERING_PROJECTS" code="0x03" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Technical Showcase
        </h2>

        {/* Project showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, idx) => (
            <div key={idx} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
