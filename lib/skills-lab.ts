export interface LabSkillItem {
  name: string
  level: number
  years: number
  projects: string
}

export interface LabSkillCategory {
  category: string
  items: LabSkillItem[]
}

export const labSkillCategories: LabSkillCategory[] = [
  {
    category: "Backend Frameworks",
    items: [
      { name: "Express.js", level: 95, years: 4, projects: "25+" },
      { name: "Flask", level: 55, years: 1, projects: "3" },
      { name: "FastAPI", level: 65, years: 1, projects: "1" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", level: 90, years: 4, projects: "20+" },
      { name: "PostgreSQL", level: 75, years: 1, projects: "1" },
      { name: "Firebase", level: 80, years: 2, projects: "1" },
    ],
  },
  {
    category: "API Technologies",
    items: [
      { name: "REST", level: 95, years: 4, projects: "20+" },
      { name: "WebSockets", level: 80, years: 3, projects: "2" },
      { name: "Webhooks", level: 85, years: 4, projects: "10+" },
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "Docker", level: 85, years: 4, projects: "20+" },
      { name: "GCP", level: 85, years: 3, projects: "20+" },
      { name: "AWS", level: 30, years: 1, projects: "1" },
      { name: "CI/CD", level: 85, years: 4, projects: "20+" },
      { name: "Terraform", level: 70, years: 1, projects: "1" },
    ],
  },
  {
    category: "Security",
    items: [
      { name: "Authentication", level: 90, years: 4, projects: "25+" },
      { name: "Authorization", level: 85, years: 4, projects: "25+" },
      { name: "Data Encryption", level: 80, years: 3, projects: "5" },
    ],
  },
]

export function categoryAverage(category: LabSkillCategory) {
  return Math.round(category.items.reduce((sum, item) => sum + item.level, 0) / category.items.length)
}
