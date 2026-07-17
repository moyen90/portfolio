export type ProjectStatus = "active" | "maintenance" | "development"
export type ProjectType = "major" | "service" | "infrastructure"

export interface Project {
  id: string
  name: string
  description: string
  type: ProjectType
  technologies: string[]
  liveUrl?: string
  status?: ProjectStatus
  featured?: boolean
  highlight?: string
}

export const projects: Project[] = [
  {
    id: "p1",
    name: "Photofox AI",
    description:
      "Professional photography and videography platform with AI-powered enhancement, automated editing workflows, and enterprise content management.",
    type: "major",
    technologies: ["Node.js", "Express", "MongoDB", "Generative AI", "GCP", "Docker"],
    liveUrl: "photofox.ai",
    status: "active",
    featured: true,
    highlight: "AI media pipeline · GCP · Docker",
  },
  {
    id: "p2",
    name: "Vocalo AI",
    description:
      "AI language learning with real-time conversations, speech processing, personalized curriculum, and detailed feedback.",
    type: "major",
    technologies: ["Socket.io", "Express", "MongoDB", "Generative AI", "GCP", "Docker"],
    liveUrl: "vocalo.ai",
    status: "active",
    featured: true,
    highlight: "WebSockets · real-time AI · scalable APIs",
  },
  {
    id: "p3",
    name: "SketchToImage",
    description:
      "Transforms sketches into polished images with multiple art styles, real-time preview, and generative AI backends.",
    type: "major",
    technologies: ["Express.js", "MongoDB", "Generative AI", "GCP", "Docker"],
    liveUrl: "sketchtoimage.com",
    status: "active",
    featured: true,
    highlight: "Generative AI · image processing at scale",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
