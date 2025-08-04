"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useSystem } from "../system-context"

export default function Terminal() {
  const { terminalHistory, addTerminalEntry, clearTerminal } = useSystem()
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Focus input on mount and when terminal is clicked
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Scroll to bottom when terminal history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user input to history
    addTerminalEntry({ input })

    // Process command
    processCommand(input)

    // Clear input
    setInput("")
  }

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()

    // Command processing logic
    if (command === "help") {
      addTerminalEntry({
        output: (
          <div className="space-y-1">
            <p>Available commands:</p>
            <p>
              <span className="text-green-400">help</span> - Show this help message
            </p>
            <p>
              <span className="text-green-400">clear</span> - Clear the terminal
            </p>
            <p>
              <span className="text-green-400">about</span> - About the developer
            </p>
            <p>
              <span className="text-green-400">skills</span> - List developer skills
            </p>
            <p>
              <span className="text-green-400">projects</span> - List recent projects
            </p>
            <p>
              <span className="text-green-400">contact</span> - Show contact information
            </p>
            <p>
              <span className="text-green-400">github</span> - Open GitHub profile
            </p>
            <p>
              <span className="text-green-400">linkedin</span> - Open LinkedIn profile
            </p>
          </div>
        ),
      })
    } else if (command === "clear") {
      clearTerminal()
    } else if (command === "about") {
      addTerminalEntry({
        output: (
          <div className="space-y-1">
            <p className="text-green-400 font-bold">Moyenul Islam - Backend Developer</p>
            <p>Experienced backend developer with 6+ years of professional experience.</p>
            <p>Specializing in building scalable, secure, and efficient backend systems.</p>
            <p>Core expertise: Node.js, Express, MongoDB, PostgreSQL, and API development.</p>
          </div>
        ),
      })
    } else if (command === "skills") {
      addTerminalEntry({
        output: (
          <div className="space-y-1">
            <p className="text-green-400 font-bold">Technical Skills:</p>
            <p>
              • <span className="text-green-400">Languages:</span> JavaScript, TypeScript, Python, SQL
            </p>
            <p>
              • <span className="text-green-400">Frameworks:</span> Express.js, NestJS, Django, Flask
            </p>
            <p>
              • <span className="text-green-400">Databases:</span> MongoDB, PostgreSQL, MySQL, Redis
            </p>
            <p>
              • <span className="text-green-400">Cloud:</span> AWS, GCP, Azure, Heroku
            </p>
            <p>
              • <span className="text-green-400">DevOps:</span> Docker, Kubernetes, CI/CD, Terraform
            </p>
            <p>
              • <span className="text-green-400">Other:</span> GraphQL, REST APIs, WebSockets, Microservices
            </p>
          </div>
        ),
      })
    } else if (command === "projects") {
      addTerminalEntry({
        output: (
          <div className="space-y-4">
            <p className="text-green-400 font-bold">═══ FEATURED PROJECTS ═══</p>

            <div className="space-y-3">
              <div className="border-l-2 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-bold">● Photofox AI</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Professional photography platform with AI-powered image enhancement,
                  automated editing workflows, and enterprise-grade content management
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Tech: Node.js • Express • MongoDB • Generative AI • GCP • Docker
                </p>
              </div>

              <div className="border-l-2 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-bold">● Vocalo AI</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  AI-powered language learning platform with personalized curriculum,
                  immersive conversations, and real-time speech processing
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Tech: Socket.io • Express • MongoDB • Generative AI • GCP • Docker
                </p>
              </div>

              <div className="border-l-2 border-green-500 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-bold">● SketchToImage</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Transform sketches into stunning images using AI magic with
                  advanced image processing and multiple art styles
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Tech: Express.js • MongoDB • Generative AI • GCP • Docker
                </p>
              </div>
            </div>

            <div className="text-xs text-green-700 mt-4 pt-2 border-t border-green-900/30">
              <p>→ All projects feature scalable architecture and modern development practices</p>
              <p>→ Type 'contact' for collaboration opportunities</p>
            </div>
          </div>
        ),
      })
    } else if (command === "contact") {
      addTerminalEntry({
        output: (
          <div className="space-y-1">
            <p className="text-green-400 font-bold">Contact Information:</p>
            <p>
              • <span className="text-green-400">Email:</span> dev.moyenislam@gmail.com
            </p>
            <p>
              • <span className="text-green-400">Phone:</span> +880 1308 989743
            </p>
            <p>
              • <span className="text-green-400">Location:</span> Bogura, Bangladesh
            </p>
            <p>
              • <span className="text-green-400">GitHub:</span> github.com/moyen90
            </p>
            <p>
              • <span className="text-green-400">LinkedIn:</span> linkedin.com/in/moyenul-islam-675204211
            </p>
          </div>
        ),
      })
    } else if (command === "github") {
      addTerminalEntry({
        output: "Opening GitHub profile...",
      })
      window.open("https://github.com/moyen90", "_blank")
    } else if (command === "linkedin") {
      addTerminalEntry({
        output: "Opening LinkedIn profile...",
      })
      window.open("https://linkedin.com/in/moyenul-islam-675204211", "_blank")
    } else {
      addTerminalEntry({
        output: `Command not found: ${command}. Type 'help' for available commands.`,
        isError: true,
      })
    }
  }

  return (
    <section id="terminal" className="w-full py-1 md:py-1 lg:py-1">
      <div className="container px-4 md:px-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-green-400 mb-2">Terminal</h1>
          <p className="text-green-600 mb-6">
            Interactive command-line interface. Type 'help' to see available commands.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 border border-green-900/30 rounded-md overflow-hidden"
        >
          <div className="bg-gray-800 px-4 py-2 border-b border-green-900/30 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-green-400 text-sm">bash - moyen@server-control-center</div>
          </div>

          <div
            ref={terminalRef}
            className="p-4 h-96 overflow-y-auto font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {terminalHistory.map((entry, index) => (
              <div key={index} className="mb-2">
                {entry.input && (
                  <div className="flex">
                    <span className="text-green-500 mr-2">$</span>
                    <span className="text-white">{entry.input}</span>
                  </div>
                )}
                {entry.output && (
                  <div
                    className={`ml-4 ${entry.isError ? "text-red-400" : entry.isSystem ? "text-green-600" : "text-green-400"}`}
                  >
                    {entry.output}
                  </div>
                )}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex mt-2">
              <span className="text-green-500 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
                autoFocus
              />
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-green-600 text-sm"
        >
          <p>Tip: Type 'skills', 'projects', or 'projects-list' to learn more about my work.</p>
        </motion.div>
      </div>
    </section>
  )
}
