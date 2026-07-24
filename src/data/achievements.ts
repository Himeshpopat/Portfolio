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
    description: "Scored in the 96th percentile in Joint Entrance Examination among 1.4 million candidates."
  },
  {
    value: "Completed",
    label: "Deloitte Data Analytics",
    description: "Completed the virtual simulation covering data cleaning, analysis, and dashboarding design."
  },
  {
    value: "Finalist",
    label: "AMD Hackathon",
    description: "Pitched and engineered prototypes utilizing edge AI algorithms and high-performance computing."
  },
  {
    value: "Certified",
    label: "IIT Bombay Spoken Tutorial",
    description: "Earned certifications in advanced C++ programming and data structures."
  }
];
