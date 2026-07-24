import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import MetricReadout from '../components/MetricReadout';
import { Calendar, Award, GraduationCap, Cpu, Layers } from 'lucide-react';

export default function About() {
  return (
    <SectionWrapper id="about" ariaLabel="About Himesh Popat">
      <Container>
        <SectionEyebrow label="SYSTEM_OVERVIEW" code="0x01" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          About Me
        </h2>

        {/* Cohesive Engineering Spec Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-t border-l border-line/40 rounded-[12px] overflow-hidden bg-surface/5 backdrop-blur-sm">
          
          {/* Panel 1: Profile Overview (col-span-7) */}
          <div className="md:col-span-7 border-r border-b border-line/40 p-6 md:p-8 flex flex-col justify-between hover:bg-surface/10 transition-colors duration-300">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-signal-cyan/60 uppercase block mb-4 select-none">
                [01 // INTRODUCTION]
              </span>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-4">
                Systems Architect & ML Modeler
              </h3>
              <div className="space-y-4 text-sm text-text-muted leading-relaxed font-sans">
                <p>
                  I am a second-year Information Technology student at <strong className="text-text-primary font-medium">KJ Somaiya Institute of Technology</strong>. My research and engineering focus lies in artificial intelligence pipelines, time-series regression models, and high-performance backend infrastructures.
                </p>
                <p>
                  My approach prioritizes efficiency, mathematical rigor, and clean data modeling. Whether optimizing database schemas or developing gradient-boosted regression algorithms, I focus on building software that solves operational bottlenecks.
                </p>
              </div>
            </div>
            
            <div className="pt-6 font-mono text-[10px] text-text-muted/50 block select-none">
              STATUS: nominal // BUILD: active_undergrad
            </div>
          </div>

          {/* Panel 2: Academic Profile (col-span-5) */}
          <div className="md:col-span-5 border-r border-b border-line/40 p-6 md:p-8 flex flex-col justify-between bg-surface/10 hover:bg-surface/20 transition-colors duration-300">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-signal-cyan/60 uppercase block mb-4 select-none">
                [02 // ACADEMIC RECORD]
              </span>
              
              <div className="flex items-start gap-3.5 mb-6">
                <div className="p-2.5 bg-signal-cyan/5 border border-signal-cyan/20 rounded-[8px] text-signal-cyan shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-text-primary leading-tight">
                    KJ Somaiya Institute of Technology
                  </h4>
                  <p className="text-xs text-text-muted mt-1 leading-normal font-sans">
                    B.Tech in Information Technology
                  </p>
                </div>
              </div>

              {/* CGPA display stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-line/30 pt-4.5 mb-6">
                <MetricReadout value="9.83" label="Cumulative CGPA" />
                <MetricReadout value="1st Rank" label="IT Department (x2)" />
              </div>
            </div>

            {/* Academic metadata */}
            <div className="space-y-2.5 pt-3 border-t border-line/30 font-mono text-[11px] text-text-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-text-muted/50" />
                <span>Timeline: 2024 &mdash; 2028</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-text-muted/50" />
                <span>JEE Main: 96th Percentile (2024)</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Engineering Mindset (col-span-4) */}
          <div className="md:col-span-4 border-r border-b border-line/40 p-6 md:p-8 hover:bg-surface/10 transition-colors duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-signal-cyan/60 uppercase block mb-4 select-none">
                [03 // ENGINE MINDSET]
              </span>
              <h3 className="text-lg font-display font-bold text-text-primary mb-3">
                Core Focus Areas
              </h3>
              
              <ul className="space-y-3.5 text-[12px] text-text-muted font-sans mt-4">
                <li className="flex gap-2">
                  <span className="text-signal-cyan font-mono select-none">&rsaquo;</span>
                  <span><strong>Mathematical Rigor:</strong> Evaluating machine learning model errors using MAE, RMSE, and R² scores.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-signal-cyan font-mono select-none">&rsaquo;</span>
                  <span><strong>Scalable Backends:</strong> Designing secure relational schemas, REST endpoints, and OTP authorizations.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-signal-cyan font-mono select-none">&rsaquo;</span>
                  <span><strong>Data Modeling:</strong> Performing dense feature engineering and SMOTE classifications on large records.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Panel 4: Current Engagement (col-span-8) */}
          <div className="md:col-span-8 border-r border-b border-line/40 p-6 md:p-8 hover:bg-surface/10 transition-colors duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-signal-cyan/60 uppercase block mb-4 select-none">
                [04 // ACTIVE EXPERIENCE]
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-line/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-signal-cyan/5 border border-signal-cyan/20 rounded-[8px] text-signal-cyan shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-text-primary">
                      AI/ML Intern
                    </h4>
                    <p className="text-xs text-signal-cyan font-mono tracking-wide mt-0.5">
                      India Meteorological Department (IMD)
                    </p>
                  </div>
                </div>

                <div className="font-mono text-[10px] text-text-muted select-none">
                  Jun 2026 &mdash; Present &middot; Mumbai, India
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                <div className="space-y-2 text-xs text-text-muted font-sans">
                  <div className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-signal-cyan shrink-0 mt-0.5" />
                    <span>Engineered automated time-series pipelines for feature extraction on <strong>297K+</strong> historical climate records.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-signal-cyan shrink-0 mt-0.5" />
                    <span>Trained and benchmarked LightGBM/XGBoost models to forecast temperatures and relative humidity.</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs text-text-muted font-sans">
                  <div className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-signal-cyan shrink-0 mt-0.5" />
                    <span>Achieved predictive R² scores of <strong>0.9955</strong> (temperature) and <strong>0.9817</strong> (humidity).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-signal-cyan shrink-0 mt-0.5" />
                    <span>Integrated regression forecasts into a live meteorological telemetry status dashboard.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </SectionWrapper>
  );
}
