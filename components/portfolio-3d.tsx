"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Box, Sphere } from "@react-three/drei"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Server, CreditCard, Cpu, Radio, Code, Braces, Layers } from "lucide-react"

// Define the technologies with their details
const technologies = [
  {
    name: "Express.js",
    icon: Server,
    description: "Built RESTful APIs and microservices with Express.js",
    projects: ["E-commerce API", "Authentication Service", "Real-time Dashboard Backend"],
    color: "#4CAF50",
    position: [-5, 2, -3],
  },
  {
    name: "MongoDB",
    icon: Database,
    description: "Designed and optimized NoSQL database schemas",
    projects: ["User Management System", "Content Management System", "Analytics Platform"],
    color: "#4DB33D",
    position: [5, 1, -2],
  },
  {
    name: "PostgreSQL",
    icon: Database,
    description: "Implemented complex relational database solutions",
    projects: ["Financial Transaction System", "Inventory Management", "Data Warehouse"],
    color: "#336791",
    position: [-4, -2, -1],
  },
  {
    name: "Stripe",
    icon: CreditCard,
    description: "Integrated payment processing and subscription management",
    projects: ["SaaS Billing System", "Marketplace Payment Processing", "Donation Platform"],
    color: "#6772E5",
    position: [4, -1, -3],
  },
  {
    name: "Generative AI",
    icon: Cpu,
    description: "Built applications leveraging LLMs and generative models",
    projects: ["Content Generation Tool", "AI-powered Assistant", "Image Generation API"],
    color: "#FF5722",
    position: [0, 3, -2],
  },
  {
    name: "Socket.io",
    icon: Radio,
    description: "Developed real-time communication features",
    projects: ["Chat Application", "Live Collaboration Tool", "Real-time Notifications"],
    color: "#010101",
    position: [-3, 0, -4],
  },
  {
    name: "Node.js",
    icon: Code,
    description: "Created scalable server-side applications",
    projects: ["Job Queue System", "ETL Pipeline", "Serverless Functions"],
    color: "#8BC500",
    position: [3, 0, -5],
  },
  {
    name: "GraphQL",
    icon: Braces,
    description: "Designed efficient API schemas and resolvers",
    projects: ["API Gateway", "Data Aggregation Service", "Mobile App Backend"],
    color: "#E535AB",
    position: [0, -3, -3],
  },
  {
    name: "Docker",
    icon: Layers,
    description: "Containerized applications for consistent deployment",
    projects: ["Microservices Architecture", "CI/CD Pipeline", "Development Environment"],
    color: "#2496ED",
    position: [2, 2, -4],
  },
]

// Main 3D Portfolio component
export default function Portfolio3D({ onLoad, onError }) {
  const [selectedTech, setSelectedTech] = useState(null)

  useEffect(() => {
    try {
      console.log("Portfolio3D component mounted")
      // Signal that the component has loaded
      onLoad && onLoad()
    } catch (error) {
      console.error("Error in Portfolio3D:", error)
      onError && onError()
    }
  }, [onLoad, onError])

  return (
    <>
      <div className="fixed top-4 left-4 z-40">
        <h1 className="text-2xl font-bold text-white">Moyenul Islam</h1>
        <p className="text-gray-300">Backend Developer</p>
      </div>

      <div className="fixed bottom-4 left-4 z-40">
        <Button variant="outline" className="bg-black/50 text-white border-white/20 hover:bg-white/20">
          Contact Me
        </Button>
      </div>

      <Canvas
        className="w-full h-screen"
        camera={{ position: [0, 0, 15], fov: 60 }}
        onCreated={() => {
          console.log("Canvas created successfully")
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={5} maxDistance={20} />

        {/* Core box representing the developer */}
        <Box args={[3, 3, 3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#222222" />
        </Box>

        <Text position={[0, 0, 1.6]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          Backend Developer
        </Text>

        {/* Technology nodes */}
        {technologies.map((tech, index) => (
          <TechNode
            key={index}
            tech={tech}
            isSelected={selectedTech?.name === tech.name}
            onClick={() => setSelectedTech(tech)}
          />
        ))}
      </Canvas>

      {selectedTech && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 left-0 right-0 z-30 p-4 md:p-6"
        >
          <Card className="mx-auto max-w-2xl bg-black/80 border-white/10 text-white backdrop-blur-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: selectedTech.color }}
                  >
                    <selectedTech.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{selectedTech.name}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setSelectedTech(null)}
                >
                  Close
                </Button>
              </div>
              <CardDescription className="text-gray-300 mt-2">{selectedTech.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-medium text-white/70 mb-2">Projects</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTech.projects.map((project, index) => (
                  <Badge key={index} variant="outline" className="bg-white/10 hover:bg-white/20 text-white">
                    {project}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  )
}

// Technology node component
function TechNode({ tech, isSelected, onClick }) {
  const { name, position, color } = tech

  // Convert position array to individual values
  const [posX, posY, posZ] = position

  return (
    <group position={[posX, posY, posZ]}>
      <Sphere
        args={[0.8, 16, 16]}
        onClick={onClick}
        onPointerOver={(e) => {
          document.body.style.cursor = "pointer"
          e.stopPropagation()
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 0.8 : 0.3} />
      </Sphere>

      <Text position={[0, -1.2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  )
}
