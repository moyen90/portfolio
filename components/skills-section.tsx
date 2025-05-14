"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, Server, CreditCard, Cpu, Radio, Code, Braces, Layers, Lock, Cloud } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
  {
    name: "Express.js",
    icon: Server,
    description: "Building RESTful APIs and microservices with Express.js",
    level: 90,
    category: "frameworks",
  },
  {
    name: "MongoDB",
    icon: Database,
    description: "Designing and optimizing NoSQL database schemas",
    level: 85,
    category: "databases",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    description: "Implementing complex relational database solutions",
    level: 80,
    category: "databases",
  },
  {
    name: "Stripe",
    icon: CreditCard,
    description: "Integrating payment processing and subscription management",
    level: 75,
    category: "services",
  },
  {
    name: "Generative AI",
    icon: Cpu,
    description: "Building applications leveraging LLMs and generative models",
    level: 70,
    category: "services",
  },
  {
    name: "Socket.io",
    icon: Radio,
    description: "Developing real-time communication features",
    level: 85,
    category: "frameworks",
  },
  {
    name: "Node.js",
    icon: Code,
    description: "Creating scalable server-side applications",
    level: 95,
    category: "frameworks",
  },
  {
    name: "GraphQL",
    icon: Braces,
    description: "Designing efficient API schemas and resolvers",
    level: 80,
    category: "frameworks",
  },
  {
    name: "Docker",
    icon: Layers,
    description: "Containerizing applications for consistent deployment",
    level: 75,
    category: "devops",
  },
  {
    name: "Security",
    icon: Lock,
    description: "Implementing authentication, authorization, and data protection",
    level: 85,
    category: "services",
  },
  {
    name: "AWS",
    icon: Cloud,
    description: "Deploying and managing applications on AWS infrastructure",
    level: 80,
    category: "devops",
  },
]

const categories = [
  { id: "all", name: "All Skills" },
  { id: "frameworks", name: "Frameworks" },
  { id: "databases", name: "Databases" },
  { id: "services", name: "Services" },
  { id: "devops", name: "DevOps" },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My toolkit for building robust, scalable, and secure backend systems.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 overflow-hidden h-full hover:bg-gray-800/80 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-emerald-500/10">
                      <skill.icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                      <p className="text-gray-400 mb-4">{skill.description}</p>
                      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute h-full bg-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Beginner</span>
                        <span className="text-xs text-gray-500">Expert</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
