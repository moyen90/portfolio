"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { featuredProjects } from "@/lib/projects"

export default function FeaturedProjects() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-lime">Selected work</p>
            <h2 className="text-3xl font-semibold tracking-tight text-brand-white md:text-4xl">Products in production</h2>
          </div>
          <p className="max-w-md text-brand-river-mist">Flagship apps — backend architecture, AI integration, and cloud delivery.</p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel group overflow-hidden transition-colors hover:border-brand-lime/25"
            >
              <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold text-brand-frost group-hover:text-brand-lime transition-colors">
                      {project.name}
                    </h3>
                    {project.status === "active" && (
                      <span className="rounded-full bg-brand-lime/10 px-2 py-0.5 text-xs text-brand-lime">Live</span>
                    )}
                  </div>
                  {project.highlight && (
                    <p className="mb-3 text-sm font-medium text-brand-lime/90">{project.highlight}</p>
                  )}
                  <p className="max-w-2xl text-brand-river-mist leading-relaxed">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-brand-river-mist/10 bg-brand-forest/40 px-2 py-1 text-xs text-brand-frost"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.liveUrl && (
                  <a
                    href={`https://${project.liveUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-brand-river-mist/20 px-5 text-sm font-medium text-brand-frost transition-colors hover:border-brand-lime/40 hover:text-brand-lime"
                  >
                    Visit
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
