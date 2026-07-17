"use client"

import { motion } from "framer-motion"
import { skillCategories } from "@/lib/skills"

export default function SkillsBento() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-lime">Capabilities</p>
          <h2 className="text-3xl font-semibold tracking-tight text-brand-white md:text-4xl">Stack depth</h2>
          <p className="mt-4 text-brand-river-mist">
            Proficiency across backend, data, cloud, and security — tuned for production systems.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.06 }}
              className="glass-panel p-6"
            >
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand-lime">{cat.category}</h3>
              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-brand-frost">{item.name}</span>
                      <span className="text-brand-river-mist">{item.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-brand-forest">
                      <motion.div
                        className="h-full rounded-full bg-brand-lime"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
