import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  // Select the Color Vision Deficiency project as the featured engineering case study
  const featuredProject = projects.find(p => p.initials === 'CVD') || projects[0];
  const supportingProjects = projects.filter(p => p !== featuredProject);

  return (
    <SectionWrapper id="projects" ariaLabel="Projects Showcase">
      <Container>
        <SectionEyebrow label="ENGINEERING_PROJECTS" code="0x03" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Technical Showcase
        </h2>

        {/* Asymmetrical grid composition: Featured spans full width, supporting split columns */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Featured Project Panel */}
          <div className="col-span-12">
            <ProjectCard project={featuredProject} isFeatured={true} />
          </div>

          {/* Supporting Projects */}
          {supportingProjects.map((project, idx) => (
            <div key={idx} className="col-span-12 md:col-span-6 h-full">
              <ProjectCard project={project} isFeatured={false} />
            </div>
          ))}
          
        </div>
      </Container>
    </SectionWrapper>
  );
}
