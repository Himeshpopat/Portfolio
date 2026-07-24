export interface Achievement {
  value: string;
  label: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    value: "150+",
    label: "LeetCode Problems Solved",
    description: "Algorithmic puzzles solved across arrays, dynamic programming, and graph structures."
  },
  {
    value: "1st",
    label: "Department Rank Twice",
    description: "Ranked first in the Information Technology department for consecutive terms (SGPA 10.0)."
  },
  {
    value: "96th %ile",
    label: "JEE Main 2024",
    description: "Scored in the 96th percentile in Joint Entrance Examination among 1.4 million examinees."
  },
  {
    value: "Completed",
    label: "Deloitte Data Analytics",
    description: "Completed the Deloitte Data Analytics Job Simulation (Forage) in data analysis and forensic technology."
  },
  {
    value: "Qualified",
    label: "AMD Online Hackathon",
    description: "Qualified and participated, delivering a working solution under time constraints."
  },
  {
    value: "Certified",
    label: "IIT Bombay Spoken Tutorial",
    description: "Earned certifications in advanced C++ programming and data structures."
  }
];
