export interface SkillItem {
  name: string
  level: number
}

export interface SkillCategory {
  category: string
  items: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", level: 95 },
      { name: "REST & WebSockets", level: 90 },
      { name: "FastAPI / Flask", level: 65 },
    ],
  },
  {
    category: "Data",
    items: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 75 },
      { name: "Firebase", level: 80 },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "Docker", level: 75 },
      { name: "GCP", level: 85 },
      { name: "CI/CD", level: 70 },
    ],
  },
  {
    category: "AI & Security",
    items: [
      { name: "Generative AI integration", level: 88 },
      { name: "Agentic AI", level: 85 },
      { name: "Encryption & data protection", level: 80 },
    ],
  },
]

export const stackPills = [
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Socket.io",
  "Docker",
  "GCP",
  "Generative AI",
  "REST",
  "CI/CD",
]
