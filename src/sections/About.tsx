import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import Card from '../components/Card';
import MetricReadout from '../components/MetricReadout';
import { GraduationCap, Award, Calendar } from 'lucide-react';

export default function About() {
  return (
    <SectionWrapper id="about" ariaLabel="About Himesh Popat">
      <Container>
        <SectionEyebrow label="SYSTEM_OVERVIEW" code="0x01" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Candidate Profile
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Prose Bio column */}
          <div className="lg:col-span-7 space-y-5 text-sm text-text-muted leading-relaxed font-sans">
            <p>
              I am a second-year Information Technology student at <strong className="text-text-primary font-medium">KJ Somaiya Institute of Technology</strong>, specialized in artificial intelligence pipelines, time-series regression models, and high-performance backend development.
            </p>
            <p>
              My engineering approach prioritizes efficiency, rigorous validation, and clean data modeling. Whether optimizing SQL relational structures or developing gradient-boosted regression algorithms, I focus on building systems that solve operational bottlenecks.
            </p>
            <p>
              Currently, I am working as an AI/ML intern at the <strong className="text-text-primary font-medium">India Meteorological Department (IMD)</strong>, training machine learning classifiers on large weather records to output accurate climatic forecasts.
            </p>
          </div>

          {/* Education Card column */}
          <div className="lg:col-span-5">
            <Card className="flex flex-col gap-6 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-signal-cyan/5 border border-signal-cyan/20 rounded-[10px] text-signal-cyan">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-wider text-signal-cyan uppercase block mb-1">
                    Education Profile
                  </span>
                  <h3 className="font-display font-bold text-lg text-text-primary leading-tight">
                    KJ Somaiya Institute of Technology
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    B.Tech in Information Technology
                  </p>
                </div>
              </div>

              {/* CGPA display */}
              <div className="grid grid-cols-2 gap-4 border-t border-line/60 pt-5">
                <MetricReadout value="9.83" label="Cumulative CGPA" />
                <MetricReadout value="1st Rank" label="IT Department (x2)" />
              </div>

              {/* Metadata rows */}
              <div className="space-y-3.5 pt-1.5 font-mono text-[11px] text-text-muted">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-text-muted/60" />
                  <span>Timeline: 2024 &mdash; 2028 (Undergrad)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-text-muted/60" />
                  <span>JEE Main: 96th Percentile (2024)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
