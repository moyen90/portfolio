"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ExternalLink,
  Globe,
  Cpu,
  Server,
  Database,
  Layers,
  Rocket,
  type LucideIcon,
} from "lucide-react"
import { projects, type Project } from "@/lib/projects"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] },
})

const typeIcons: Record<Project["type"], LucideIcon> = {
  major: Globe,
  service: Cpu,
  infrastructure: Server,
}

function typeLabel(type: Project["type"]) {
  switch (type) {
    case "major":
      return "Major product"
    case "service":
      return "Service"
    case "infrastructure":
      return "Infrastructure"
  }
}

export default function ProjectsList() {
  const [selectedId, setSelectedId] = useState<string | null>(projects[0]?.id ?? null)

  const selected = projects.find((p) => p.id === selectedId) ?? null

  const uniqueTechCount = useMemo(() => {
    return new Set(projects.flatMap((p) => p.technologies)).size
  }, [])

  const liveCount = projects.filter((p) => p.status === "active").length

  return (
    <section id="projects-list" className="w-full pb-8">
      <div className="mx-auto max-w-6xl space-y-8 px-1 md:px-2">
        <motion.header {...fade()} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-lime">Deployments</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-brand-white md:text-3xl">Projects</h1>
            <p className="mt-2 max-w-xl text-sm text-brand-river-mist">
              Production applications — backend architecture, AI integration, and cloud delivery.
            </p>
          </div>
          <div className="flex gap-3">
            <StatPill label="Live" value={String(liveCount)} highlight />
            <StatPill label="Technologies" value={String(uniqueTechCount)} />
          </div>
        </motion.header>

        <div className="grid gap-4 lg:grid-cols-5 lg:gap-5">
          <div className="space-y-3 lg:col-span-3">
            {projects.map((project, index) => (
              <ProjectListItem
                key={project.id}
                project={project}
                index={index}
                selected={selectedId === project.id}
                onSelect={() => setSelectedId(project.id)}
              />
            ))}
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3 }}
                  className="lab-glass sticky top-4 p-5 md:p-6"
                >
                  <ProjectDetail project={selected} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="lab-glass flex min-h-[320px] items-center justify-center p-8 text-center text-sm text-brand-river-mist"
                >
                  Select a project to view details
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div {...fade(0.1)} className="lab-glass p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand-lime" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-river-mist">Shared stack</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...new Set(projects.flatMap((p) => p.technologies))].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-brand-river-mist/10 bg-brand-forest/40 px-3 py-1 text-xs text-brand-frost"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatPill({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="lab-glass rounded-xl px-4 py-3 text-center">
      <p className="text-[10px] uppercase tracking-wider text-brand-river-mist">{label}</p>
      <p className={`mt-1 text-lg font-semibold tabular-nums ${highlight ? "text-brand-lime" : "text-brand-white"}`}>
        {value}
      </p>
    </div>
  )
}

function ProjectListItem({
  project,
  index,
  selected,
  onSelect,
}: {
  project: Project
  index: number
  selected: boolean
  onSelect: () => void
}) {
  const Icon = typeIcons[project.type] ?? Database

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`lab-glass w-full p-4 text-left transition-colors md:p-5 ${
        selected ? "ring-1 ring-brand-lime/40" : "hover:border-brand-lime/20"
      }`}
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime/10">
          <Icon className="h-5 w-5 text-brand-lime" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-brand-frost">{project.name}</h3>
            {project.status === "active" && (
              <span className="rounded-full bg-brand-lime/10 px-2 py-0.5 text-[10px] font-medium uppercase text-brand-lime">
                Live
              </span>
            )}
          </div>
          {project.highlight && (
            <p className="mt-1 text-xs font-medium text-brand-lime/90">{project.highlight}</p>
          )}
          <p className="mt-2 line-clamp-2 text-sm text-brand-river-mist">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-brand-river-mist/10 bg-brand-midnight/30 px-2 py-0.5 text-[10px] text-brand-frost"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] text-brand-river-mist">+{project.technologies.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  const Icon = typeIcons[project.type] ?? Database

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-lime/10">
            <Icon className="h-6 w-6 text-brand-lime" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-lime">{typeLabel(project.type)}</p>
            <h2 className="text-xl font-semibold text-brand-white">{project.name}</h2>
          </div>
        </div>
        {project.status === "active" && (
          <span className="shrink-0 rounded-full bg-brand-lime/10 px-2.5 py-1 text-xs font-medium text-brand-lime">
            Active
          </span>
        )}
      </div>

      {project.highlight && (
        <p className="mt-4 text-sm font-medium text-brand-lime">{project.highlight}</p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-brand-river-mist">{project.description}</p>

      <div className="mt-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-river-mist">Technologies</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-brand-river-mist/10 bg-brand-forest/50 px-2.5 py-1 text-xs text-brand-frost"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <DetailMini icon={Rocket} label="Status" value={project.status ?? "—"} />
        <DetailMini icon={Globe} label="Domain" value={project.liveUrl ?? "—"} />
      </div>

      {project.liveUrl && (
        <a
          href={`https://${project.liveUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-lime py-2.5 text-sm font-medium text-brand-forest transition-colors hover:bg-brand-lime/90 sm:w-auto sm:px-6"
        >
          Visit live site
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </>
  )
}

function DetailMini({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-brand-river-mist/10 bg-brand-midnight/25 p-3">
      <Icon className="mb-2 h-4 w-4 text-brand-lime" />
      <p className="text-[10px] uppercase tracking-wider text-brand-river-mist">{label}</p>
      <p className="mt-1 truncate text-sm font-medium capitalize text-brand-frost">{value}</p>
    </div>
  )
}

export { ProjectsList }
