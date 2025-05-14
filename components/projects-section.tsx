import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce backend with product management, cart functionality, payment processing, and order management.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Node.js", "Express", "MongoDB", "Stripe", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Real-time Chat Application",
    description: "A scalable chat platform with private messaging, group chats, and notifications using WebSockets.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Express", "Socket.io", "PostgreSQL", "Redis", "JWT"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Content Management System",
    description: "A headless CMS with a GraphQL API, role-based access control, and content versioning.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Node.js", "GraphQL", "MongoDB", "Docker", "AWS S3"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI-powered Recommendation Engine",
    description: "A recommendation system that analyzes user behavior to suggest relevant content and products.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Python", "Node.js", "TensorFlow", "PostgreSQL", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Financial Transaction System",
    description:
      "A secure payment processing system with multi-currency support, fraud detection, and detailed reporting.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Node.js", "Express", "PostgreSQL", "Stripe", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "API Gateway",
    description:
      "A centralized API gateway that handles authentication, rate limiting, and request routing for microservices.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Node.js", "Express", "Redis", "JWT", "Kubernetes"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on that showcase my backend development skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 overflow-hidden h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-gray-700/50">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    <span>Source Code</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
