"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Globe, Database, Cpu, Server } from "lucide-react"
import { useSystem } from "../system-context"

interface Project {
    id: string
    name: string
    description: string
    type: "major" | "service" | "infrastructure"
    technologies: string[]
    liveUrl?: string
    status?: "active" | "maintenance" | "development"
}

// Real project data with enhanced details
const realProjects: Project[] = [
    {
        id: "p1",
        name: "Photofox AI",
        description: "PhotoFox provides professional photography and videography services to help small brands look Fortune-500-level online. Features AI-powered image enhancement, automated editing workflows, and enterprise-grade content management.",
        type: "major",
        technologies: ["Node.js", "Express", "MongoDB", "Generative AI", "GCP", "Docker"],
        liveUrl: "photofox.ai",
        status: "active"
    },
    {
        id: "p2",
        name: "Vocalo AI",
        description: "Vocalo.ai is an AI-powered language learning platform that enhances users' English speaking skills through personalized curriculum, immersive conversations, detailed feedback, and tailored exercises. Built with real-time communication and advanced speech processing.",
        type: "major",
        technologies: ["Socket.io", "Express", "MongoDB", "Generative AI", "GCP", "Docker"],
        liveUrl: "vocalo.ai",
        status: "active"
    },
    {
        id: "p3",
        name: "SketchToImage",
        description: "Sketch To Image (previously Scribble To Art) transforms any sketches into stunning images using AI magic. Features advanced image processing, multiple art styles, and seamless user experience with real-time preview.",
        type: "major",
        technologies: ["Express.js", "MongoDB", "Generative AI", "GCP", "Docker"],
        liveUrl: "sketchtoimage.com",
        status: "active"
    }
]

const getProjectIcon = (type: string) => {
    switch (type) {
        case 'major':
            return <Globe className="w-5 h-5" />
        case 'service':
            return <Cpu className="w-5 h-5" />
        case 'infrastructure':
            return <Server className="w-5 h-5" />
        default:
            return <Database className="w-5 h-5" />
    }
}

const getProjectColors = () => {
    // Consistent styling matching dashboard theme
    return {
        border: 'border-green-900/30 hover:border-green-800/50',
        background: 'bg-gray-800',
        badge: 'bg-green-900/20 text-green-500',
        iconBg: 'bg-green-900/20'
    }
}

const getStatusBadge = (status?: string) => {
    switch (status) {
        case 'active':
            return <Badge className="bg-green-900/20 text-green-500">● Active</Badge>
        case 'maintenance':
            return <Badge className="bg-green-900/20 text-green-500">⚠ Maintenance</Badge>
        case 'development':
            return <Badge className="bg-green-900/20 text-green-500">🔧 Development</Badge>
        default:
            return null
    }
}

export const ProjectsList: React.FC = () => {
    const { addNotification } = useSystem()

    return (
        <section id="projects-list" className="w-full py-8 md:py-12">
            <div className="container px-4 md:px-6 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-green-400 tracking-tight">
                        Featured Projects
                    </h1>
                    <p className="text-green-600 text-lg max-w-2xl mx-auto">
                        A showcase of my major applications and services that demonstrate full-stack development expertise,
                        AI integration, and scalable architecture design.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {realProjects.map((project, index) => {
                        const colors = getProjectColors()

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Card className={`
                  h-full ${colors.background} 
                  border ${colors.border} 
                  transition-all duration-300 
                  hover:border-green-700/50
                  cursor-pointer relative overflow-hidden
                `}>
                                    <CardContent className="p-6 h-full flex flex-col">
                                        {/* Background decoration matching dashboard */}
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-bl-full"></div>

                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`
                          p-2 rounded-md ${colors.iconBg}
                        `}>
                                                    <div className="text-green-500">
                                                        {getProjectIcon(project.type)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                                                        {project.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Badge className={colors.badge}>
                                                            {project.type === "major" ? "Major Project" :
                                                                project.type === "service" ? "Service" : "Infrastructure"}
                                                        </Badge>
                                                        {getStatusBadge(project.status)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-green-600 text-sm leading-relaxed mb-6 flex-grow">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="mb-6">
                                            <h4 className="text-green-500 text-sm font-medium mb-3 flex items-center">
                                                <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                                                Technologies
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 text-xs bg-gray-800/60 text-green-400 rounded border border-green-900/30 hover:border-green-500/50 transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex space-x-3">
                                                {project.liveUrl && (
                                                    <button
                                                        onClick={() => {
                                                            window.open(`https://${project.liveUrl}`, '_blank')
                                                            addNotification(`Opening ${project.name}`, "info")
                                                        }}
                                                        className="flex items-center space-x-1 text-green-400 hover:text-green-300 text-sm transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        <span>Live Demo</span>
                                                    </button>
                                                )}

                                            </div>

                                            <motion.button
                                                onClick={() => {
                                                    window.open(`https://${project.liveUrl}`, '_blank')
                                                    addNotification(`Viewing ${project.name} details`, "info")
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-3 py-1 text-xs font-medium rounded-md bg-green-900/20 text-green-500 border border-green-900/30 hover:bg-green-800/30 hover:border-green-700/50 transition-all duration-200"
                                            >
                                                View Details
                                            </motion.button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="text-center pt-8"
                >
                    <div className="inline-flex items-center space-x-2 text-green-600 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>More projects available in the network view</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsList