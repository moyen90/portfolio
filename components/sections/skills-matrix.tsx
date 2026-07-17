"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useSystem } from "../system-context"

const skills = [
  {
    category: "Backend Frameworks",
    items: [
      { name: "Express.js", level: 95, years: 4, projects: "25+" },
      { name: "Flask", level: 55, years: 1, projects: "3" },
      { name: "FastAPI", level: 45, years: 1, projects: "1" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", level: 90, years: 4, projects: "20+" },
      { name: "PostgreSQL", level: 55, years: 1, projects: "1" },
      { name: "Firebase", level: 80, years: 2, projects: "1" }
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
      { name: "Data Encryption", level: 80, years: 3, projects: "5" }
    ],
  },
]

export default function SkillsMatrix() {
  const { addNotification } = useSystem()
  const [selectedSkill, setSelectedSkill] = useState<null | {
    name: string
    level: number
    years: number
    projects: string
    category: string
  }>(null)
  const [activeCategory, setActiveCategory] = useState("Backend Frameworks")
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Simulate system notification when changing categories
    if (activeCategory) {
      if (!isFirstRender.current) {
        addNotification(`Loading ${activeCategory} skill data`, "info")
      } else {
        isFirstRender.current = false
      }
    }
  }, [activeCategory, addNotification])

  // Debug handler functions
  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category)
    setActiveCategory(category)
    addNotification(`Selected category: ${category}`, "info")
  }

  const handleSkillClick = (skill: any, category: string) => {
    console.log("Skill clicked:", skill.name)
    setSelectedSkill({ ...skill, category })
    addNotification(`Selected skill: ${skill.name}`, "info")
  }

  return (
    <section id="skills" className="w-full py-1 md:py-1 lg:py-1">
      <div className="container px-4 md:px-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-brand-frost mb-2">Skills Matrix</h1>
          <p className="text-brand-river-mist mb-6">
            Technical capabilities and expertise levels across various backend technologies.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((category) => (
            <button
              key={category.category}
              onClick={() => handleCategoryClick(category.category)}
              type="button"
              className={`px-3 py-1.5 rounded text-sm transition-colors ${activeCategory === category.category
                ? "bg-brand-lime/15 text-brand-frost border border-brand-lime/50"
                : "bg-brand-deep-forest text-brand-river-mist border border-brand-deep-forest/50 hover:bg-brand-lime/10"
                }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-deep-forest border border-brand-deep-forest/50 rounded-md p-4"
          >
            <h2 className="text-brand-frost font-bold mb-4">{activeCategory}</h2>
            <div className="space-y-4">
              {skills
                .find((cat) => cat.category === activeCategory)
                ?.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleSkillClick(skill, activeCategory)
                        }}
                        type="button"
                        className="text-brand-lime hover:text-brand-frost transition-colors cursor-pointer"
                      >
                        {skill.name}
                      </button>
                      <span className="text-brand-river-mist">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-brand-forest rounded-full h-1.5">
                      <motion.div
                        className="bg-brand-lime h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {selectedSkill ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-brand-deep-forest border border-brand-deep-forest/50 rounded-md p-4"
            >
              <h2 className="text-brand-frost font-bold mb-4">{selectedSkill.name}</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-brand-river-mist mb-1">Proficiency Level</div>
                  <div className="w-full bg-brand-forest rounded-full h-2">
                    <motion.div
                      className="bg-brand-lime h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-brand-river-mist text-xs">Beginner</span>
                    <span className="text-brand-river-mist text-xs">Expert</span>
                  </div>
                </div>

                <div>
                  <div className="text-brand-river-mist mb-1">Experience</div>
                  <div className="text-brand-frost text-2xl font-bold">{selectedSkill.years} years</div>
                </div>

                <div>
                  <div className="text-brand-river-mist mb-1">Category</div>
                  <div className="text-brand-frost">{selectedSkill.category}</div>
                </div>

                <div>
                  <div className="text-brand-river-mist mb-1">Projects Implemented</div>
                  <div className="text-brand-frost">{selectedSkill.projects}</div>
                </div>

                <div className="pt-2">
                  <div className="text-xs text-brand-river-mist border-t border-brand-deep-forest/50 pt-2">
                    Last updated: 2 months ago
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-brand-deep-forest border border-brand-deep-forest/50 rounded-md p-4 flex items-center justify-center"
            >
              <div className="text-center text-brand-river-mist">
                <div className="mb-2 text-4xl">⟨⟩</div>
                <p>Select a skill to view detailed information</p>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-brand-deep-forest border border-brand-deep-forest/50 rounded-md p-4 mt-6"
        >
          <h2 className="text-brand-frost font-bold mb-4">Skill Distribution</h2>
          <div className="h-20 flex items-end justify-between gap-2">
            {skills.map((category, index) => {
              const avgLevel = category.items.reduce((sum, item) => sum + item.level, 0) / category.items.length

              return (
                <div key={category.category} className="flex flex-col items-center flex-1">
                  <motion.div
                    className="w-full bg-brand-lime/10 rounded-t relative overflow-hidden"
                    style={{ height: `${avgLevel * 0.5}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${avgLevel * 0.5}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-lime/30 to-transparent"></div>
                    <div className="absolute inset-0 grid grid-rows-5 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="border-t border-brand-lime/10"></div>
                      ))}
                    </div>
                  </motion.div>
                  <div className="text-brand-river-mist text-xs mt-2 transform -rotate-45 origin-top-left">
                    {category.category.split(" ")[0]}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-5 gap-2 mt-8">
            {skills.map((category) => (
              <div key={category.category} className="text-center">
                <div className="text-brand-frost text-lg font-bold">
                  {Math.round(category.items.reduce((sum, item) => sum + item.level, 0) / category.items.length)}%
                </div>
                <div className="text-brand-river-mist text-xs">Avg. Proficiency</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
