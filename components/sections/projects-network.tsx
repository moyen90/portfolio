"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSystem } from "../system-context"

interface Project {
  id: string
  name: string
  description: string
  type: "major" | "service" | "infrastructure"
  technologies: string[]
  links: string[]
}

// Real project data
const realProjects: Project[] = [
  {
    id: "p1",
    name: "Photofox AI",
    description: "PhotoFox provides professional photography and videography services to help small brands look Fortune-500-level online.",
    type: "major",
    technologies: ["Node.js", "Express", "MongoDB", "Generative AI"],
    links: ["p4", "p5"],
  },
  {
    id: "p2",
    name: "Vocalo AI",
    description: "Vocalo.ai is an AI-powered language learning platform that enhances users' English speaking skills through personalized curriculum, immersive conversations, detailed feedback, and tailored exercises.",
    type: "major",
    technologies: ["Socket.io", "Express", "MongoDB", "Generative AI"],
    links: ["p4", "p5", "p6"],
  },
  {
    id: "p3",
    name: "SketchToImage",
    description: "Sketch To Image (previously Scribble To Art) transforms any sketches into stunning image using AI magic.",
    type: "major",
    technologies: ["Express.js", "MongoDB", "Generative AI"],
    links: ["p4", "p5"],
  },
  {
    id: "p4",
    name: "MongoDB Atlas",
    description: "Cloud-hosted MongoDB database service powering all applications",
    type: "infrastructure",
    technologies: ["MongoDB", "Cloud", "Atlas"],
    links: ["p1", "p2", "p3"],
  },
  {
    id: "p5",
    name: "AI Service Layer",
    description: "Shared generative AI infrastructure and API integration layer",
    type: "service",
    technologies: ["Generative AI", "OpenAI", "API Gateway"],
    links: ["p1", "p2", "p3"],
  },
  {
    id: "p6",
    name: "WebSocket Service",
    description: "Real-time bidirectional communication service for interactive features",
    type: "service",
    technologies: ["Socket.io", "WebSockets", "Node.js"],
    links: ["p2"],
  },
]

export const ProjectsNetwork: React.FC = () => {
  const [projects] = useState<Project[]>(realProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { addNotification } = useSystem()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Simulate project network loading - only run once on mount
    if (isFirstRender.current) {
      addNotification("Loading project network data", "info")
      isFirstRender.current = false

      // Simulate selecting a project after a delay
      setTimeout(() => {
        const randomProject = projects[Math.floor(Math.random() * projects.length)]
        setSelectedProject(randomProject)
        addNotification(`Selected project: ${randomProject.name}`, "info")
      }, 1500)
    }

    // Basic canvas rendering
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const width = canvas.width = canvas.offsetWidth
        const height = canvas.height = canvas.offsetHeight

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw connections and nodes (basic implementation)
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)'
        ctx.lineWidth = 1

        // Position nodes in a circle
        const centerX = width / 2
        const centerY = height / 2
        const radius = Math.min(width, height) / 3

        // Calculate node positions
        const nodePositions = projects.map((_, index) => {
          const angle = (2 * Math.PI * index) / projects.length
          return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
          }
        })

        // Draw connections
        projects.forEach((project, index) => {
          const fromPos = nodePositions[index]

          project.links.forEach(linkId => {
            const linkIndex = projects.findIndex(p => p.id === linkId)
            if (linkIndex !== -1) {
              const toPos = nodePositions[linkIndex]
              ctx.beginPath()
              ctx.moveTo(fromPos.x, fromPos.y)
              ctx.lineTo(toPos.x, toPos.y)
              ctx.stroke()
            }
          })
        })

        // Draw nodes
        projects.forEach((project, index) => {
          const pos = nodePositions[index]

          // Node color based on type
          let color = 'rgba(74, 222, 128, 0.3)'
          if (project.type === 'service') color = 'rgba(99, 102, 241, 0.3)'
          if (project.type === 'infrastructure') color = 'rgba(245, 158, 11, 0.3)'

          // Draw node
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, 15, 0, 2 * Math.PI)
          ctx.fillStyle = color
          ctx.fill()
          ctx.strokeStyle = 'rgba(74, 222, 128, 0.5)'
          ctx.stroke()

          // Highlight selected node
          if (selectedProject && project.id === selectedProject.id) {
            ctx.beginPath()
            ctx.arc(pos.x, pos.y, 18, 0, 2 * Math.PI)
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.8)'
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.lineWidth = 1
          }

          // Add node click handling
          canvas.onclick = (e) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            projects.forEach((p, i) => {
              const pos = nodePositions[i]
              const dist = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2))
              if (dist < 15) {
                setSelectedProject(p)
                addNotification(`Selected project: ${p.name}`, "info")
              }
            })
          }
        })
      }
    }
  }, [projects, selectedProject, addNotification])

  // Get connected projects
  const connectedProjects = selectedProject
    ? projects.filter(p => selectedProject.links.includes(p.id))
    : []

  return (
    <section id="projects" className="w-full py-1 md:py-1 lg:py-1">
      <div className="container px-4 md:px-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-green-400 mb-2">Projects Network</h1>
          <p className="text-green-600 mb-6">Visualize the connections between different projects and services.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="lg:col-span-2 bg-gray-800 border border-green-900/30 rounded-md overflow-hidden"
          >
            <div className="relative w-full" style={{ height: "500px" }}>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

              {!selectedProject && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-green-600 text-center p-4 bg-gray-900/50 rounded-md">
                    <p>Click on a project node to view details</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="bg-gray-800 border border-green-900/30 rounded-md p-4"
          >
            {selectedProject ? (
              <div>
                <h2 className="text-green-400 font-bold text-xl mb-2">{selectedProject.name}</h2>
                <div className="mb-4">
                  <div className="inline-block px-2 py-1 rounded text-xs bg-gray-700 text-green-400 mb-2">
                    {selectedProject.type === "major"
                      ? "Major Project"
                      : selectedProject.type === "service"
                        ? "Service"
                        : "Infrastructure"}
                  </div>
                  <p className="text-green-600">{selectedProject.description}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-green-500 text-sm font-medium mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-green-900/20 text-green-400 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <h3 className="text-green-500 text-sm font-medium tracking-wide">CONNECTED SERVICES</h3>
                    <div className="flex-1 ml-2 h-px bg-gradient-to-r from-green-400/20 to-transparent"></div>
                  </div>
                  {connectedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {connectedProjects.map((linkedProject) => {
                        const getProjectStyle = (type: string) => {
                          switch (type) {
                            case 'major':
                              return {
                                bg: 'bg-gray-900/40 border-green-900/20 hover:border-green-500/40 hover:shadow-green-500/10',
                                color: 'from-green-400 to-green-600 shadow-green-500/25 group-hover:shadow-green-500/40',
                                symbol: '◆'
                              }
                            case 'service':
                              return {
                                bg: 'bg-gray-900/40 border-green-900/20 hover:border-indigo-500/40 hover:shadow-indigo-500/10',
                                color: 'from-indigo-400 to-indigo-600 shadow-indigo-500/25 group-hover:shadow-indigo-500/40',
                                symbol: '◯'
                              }
                            case 'infrastructure':
                              return {
                                bg: 'bg-gray-900/40 border-green-900/20 hover:border-amber-500/40 hover:shadow-amber-500/10',
                                color: 'from-amber-400 to-amber-600 shadow-amber-500/25 group-hover:shadow-amber-500/40',
                                symbol: '▲'
                              }
                            default:
                              return {
                                bg: 'bg-gray-900/40 border-green-900/20 hover:border-green-500/40 hover:shadow-green-500/10',
                                color: 'from-green-400 to-green-600 shadow-green-500/25 group-hover:shadow-green-500/40',
                                symbol: '◆'
                              }
                          }
                        }

                        const style = getProjectStyle(linkedProject.type)

                        return (
                          <motion.button
                            key={linkedProject.id}
                            onClick={() => setSelectedProject(linkedProject)}
                            type="button"
                            className={`group relative p-3 rounded-lg border transition-all duration-300 hover:shadow-lg w-full ${style.bg}`}
                            whileHover={{ scale: 1.01, y: -1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="relative mr-3">
                                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${style.color} shadow-lg transition-shadow duration-300`}></div>
                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 text-xs font-bold">
                                    {style.symbol}
                                  </div>
                                </div>
                                <span className="text-green-400 font-medium text-sm">{linkedProject.name}</span>
                              </div>
                              <span className="text-xs text-green-600/80 bg-green-900/20 px-2 py-1 rounded">
                                {linkedProject.type === "major"
                                  ? "Major"
                                  : linkedProject.type === "service"
                                    ? "Service"
                                    : "Infrastructure"}
                              </span>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-green-600/60 text-sm">No connected services</div>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <button
                    onClick={() => setSelectedProject(null)}
                    type="button"
                    className="text-green-500 hover:text-green-400 text-sm"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-green-600">
                  <div className="mb-2 text-4xl">⟨⟩</div>
                  <p>Select a project to view details</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border border-green-900/30 rounded-lg p-6 overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/10 to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-green-400/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-green-400/10 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <h2 className="text-green-400 font-bold text-lg tracking-wide">PROJECT LEGEND</h2>
              <div className="flex-1 ml-4 h-px bg-gradient-to-r from-green-400/30 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="group relative p-4 rounded-lg bg-gray-900/40 border border-green-900/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-shadow duration-300"></div>
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-green-400/20 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 text-xs font-bold">◆</div>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold text-sm">Major Projects</span>
                    <p className="text-green-600/80 text-xs mt-1">Core applications</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="group relative p-4 rounded-lg bg-gray-900/40 border border-green-900/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300"></div>
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-indigo-400/20 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 text-xs font-bold">◯</div>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold text-sm">Services</span>
                    <p className="text-green-600/80 text-xs mt-1">Shared utilities</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="group relative p-4 rounded-lg bg-gray-900/40 border border-green-900/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow duration-300"></div>
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-amber-400/20 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 text-xs font-bold">▲</div>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold text-sm">Infrastructure</span>
                    <p className="text-green-600/80 text-xs mt-1">Foundation layer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsNetwork
