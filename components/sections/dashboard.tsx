"use client"

import type React from "react"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useSystem } from "../system-context"
import { Server, Database, Code, Radio, CreditCard, ArrowRight, LucideIcon } from "lucide-react"

export default function Dashboard() {
  const { addNotification } = useSystem()

  useEffect(() => {
    // Simulate system notifications
    const timer = setTimeout(() => {
      addNotification("System resources optimized", "success")
    }, 5000)

    return () => clearTimeout(timer)
  }, [addNotification])

  return (
    <section id="dashboard" className="w-full py-1 md:py-1 lg:py-1">
      <div className="container px-4 md:px-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-green-400 mb-2">System Dashboard</h1>
          <p className="text-green-600 mb-6">
            Welcome to the Server Control Center. Explore the backend architecture and capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SystemCard
            title="Express.js Server"
            icon={Server}
            status="Online"
            description="RESTful API and microservices architecture"
            delay={0.1}
          />
          <SystemCard
            title="MongoDB Cluster"
            icon={Database}
            status="Online"
            description="NoSQL database with optimized schemas"
            delay={0.2}
          />
          <SystemCard
            title="PostgreSQL Database"
            icon={Database}
            status="Online"
            description="Relational database with complex queries"
            delay={0.3}
          />
          <SystemCard
            title="Node.js Runtime"
            icon={Code}
            status="Active"
            description="Server-side JavaScript execution environment"
            delay={0.4}
          />
          <SystemCard
            title="Socket.io Service"
            icon={Radio}
            status="Active"
            description="Real-time bidirectional event-based communication"
            delay={0.5}
          />
          <SystemCard
            title="Stripe Integration"
            icon={CreditCard}
            status="Connected"
            description="Payment processing and subscription management"
            delay={0.6}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-green-400 mb-4">Recent Projects</h2>
          <div className="space-y-3">
            <ProjectItem
              name="E-commerce Platform"
              description="Full-featured backend with product management, cart functionality, and order processing"
              technologies={["Node.js", "Express", "MongoDB", "Redis"]}
              delay={0.25}
            />
            <ProjectItem
              name="Real-time Chat Application"
              description="Scalable chat platform with private messaging, group chats, and notifications"
              technologies={["Socket.io", "Express", "PostgreSQL", "Redis"]}
              delay={0.3}
            />
            <ProjectItem
              name="Content Management System"
              description="Headless CMS with GraphQL API, role-based access control, and content versioning"
              technologies={["GraphQL", "Node.js", "MongoDB", "AWS S3"]}
              delay={0.35}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.2 }}
            className="mt-4"
          >
            <button
              onClick={() => {
                const { setActiveSection } = useSystem();
                setActiveSection("projects");
              }}
              type="button"
              className="flex items-center text-green-500 hover:text-green-400 transition-colors"
            >
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SystemCard({
  title,
  icon: Icon,
  status,
  description,
  delay = 0,
}: {
  title: string
  icon: LucideIcon
  status: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-800 border border-green-900/30 rounded-md p-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-bl-full"></div>
      <div className="flex items-start">
        <div className="p-2 bg-green-900/20 rounded-md mr-3">
          <Icon className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h3 className="text-green-400 font-bold">{title}</h3>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-500 text-xs">{status}</span>
          </div>
          <p className="text-green-600 text-sm mt-2">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectItem({
  name,
  description,
  technologies,
  delay = 0,
}: {
  name: string
  description: string
  technologies: string[]
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="bg-gray-800 border border-green-900/30 rounded-md p-4"
    >
      <h3 className="text-green-400 font-bold">{name}</h3>
      <p className="text-green-600 text-sm mt-1">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech) => (
          <span key={tech} className="text-xs bg-green-900/20 text-green-500 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
