import type { Project } from '../data/projects';
import Card from './Card';
import TechChip from './TechChip';
import MetricReadout from './MetricReadout';
import EmptyState from './EmptyState';

interface ProjectCardProps {
  project: Project;
  screenshot?: string;
}

export default function ProjectCard({ project, screenshot }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full p-5 gap-4.5">
      {/* 16:9 Visual screenshot / Empty state placeholder */}
      <div className="w-full aspect-video rounded-[8px] overflow-hidden border border-line relative shrink-0 group/visual">
        {screenshot ? (
          <img
            src={screenshot}
            alt={`${project.title} display panel`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-out-expo group-hover/visual:scale-[1.03]"
          />
        ) : (
          <EmptyState initials={project.initials} className="w-full h-full" />
        )}
      </div>

      {/* Body details */}
      <div className="flex flex-col flex-grow gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-text-primary tracking-tight">
            {project.title}
          </h3>
          <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Stack categories using violet chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((item, idx) => (
            <TechChip key={idx} label={item} />
          ))}
        </div>

        {/* Engineering challenges & design */}
        <div className="text-xs space-y-2 border-l border-line/60 pl-3 py-1 font-sans">
          <p className="text-text-muted leading-relaxed">
            <strong className="text-text-primary font-medium">Problem:</strong> {project.problem}
          </p>
          <p className="text-text-muted leading-relaxed">
            <strong className="text-text-primary font-medium">Solution:</strong> {project.solution}
          </p>
        </div>

        {/* Project outcome points */}
        <ul className="space-y-1.5 text-xs text-text-muted list-none pl-0 font-sans">
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

        {/* Push metrics to bottom */}
        <div className="flex-grow" />

        {/* Highlighted core performance metrics (Amber stats) */}
        <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-line/60">
          {project.metrics.map((metric, idx) => (
            <MetricReadout key={idx} value={metric.value} label={metric.label} />
          ))}
        </div>

        {/* External links */}
        <div className="flex items-center gap-5 pt-1.5 text-xs font-mono select-none">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-signal-cyan py-0.5 group/link"
            >
              <span>Live Demo &rarr;</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-signal-cyan transition-all duration-150 ease-out-expo group-hover/link:w-full" />
            </a>
          ) : (
            <span className="text-text-muted/40 cursor-not-allowed select-none">
              [Demo Coming Soon]
            </span>
          )}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-signal-cyan py-0.5 group/link"
            >
              <span>Source Code &rarr;</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-signal-cyan transition-all duration-150 ease-out-expo group-hover/link:w-full" />
            </a>
          ) : (
            <span className="text-text-muted/40 cursor-not-allowed select-none">
              [Source Private]
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
