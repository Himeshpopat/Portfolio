export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "C++", "SQL", "JavaScript", "HTML5/CSS3"]
  },
  {
    category: "Frameworks & Web",
    items: ["Flask", "SQLAlchemy", "React", "Node.js", "Vite", "Tailwind CSS"]
  },
  {
    category: "Data & ML",
    items: ["LightGBM", "XGBoost", "Scikit-Learn", "Pandas", "NumPy", "Time-series Forecasting"]
  },
  {
    category: "Tools & Infrastructure",
    items: ["Git", "GitHub", "Docker", "Postman", "Linux", "Powershell"]
  },
  {
    category: "Core CS",
    items: ["Data Structures & Algorithms", "Object Oriented Programming (OOP)", "Database Management Systems (DBMS)", "Operating Systems"]
  }
];
