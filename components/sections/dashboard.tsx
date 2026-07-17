"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform, useMotionValueEvent } from "framer-motion"
import { useSystem } from "../system-context"
import { featuredProjects } from "@/lib/projects"
import {
  Server,
  Database,
  Code,
  Radio,
  CreditCard,
  ArrowRight,
  ExternalLink,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Terminal,
  FolderOpen,
  Zap,
  Mail,
  type LucideIcon,
} from "lucide-react"

const services = [
  { title: "Express.js", icon: Server, status: "Online", metric: "99.9% uptime", description: "REST & microservices" },
  { title: "MongoDB", icon: Database, status: "Online", metric: "Primary store", description: "Document workloads" },
  { title: "PostgreSQL", icon: Database, status: "Online", metric: "Relational", description: "Complex queries" },
  { title: "Node.js", icon: Code, status: "Active", metric: "LTS runtime", description: "Server-side JS" },
  { title: "Socket.io", icon: Radio, status: "Active", metric: "Realtime", description: "Bidirectional events" },
  { title: "Stripe", icon: CreditCard, status: "Connected", metric: "Billing", description: "Payments & subs" },
] as const

const quickActions = [
  { id: "skills", label: "Skills", icon: Zap, description: "Stack matrix" },
  { id: "projects-list", label: "Projects", icon: FolderOpen, description: "Shipped products" },
  { id: "terminal", label: "Terminal", icon: Terminal, description: "CLI profile" },
  { id: "contact", label: "Contact", icon: Mail, description: "Get in touch" },
] as const

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Dashboard() {
  const { addNotification, setActiveSection, systemStatus, notifications } = useSystem()

  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification("System resources optimized", "success")
    }, 5000)
    return () => clearTimeout(timer)
  }, [addNotification])

  const latestNotification = notifications[0]

  return (
    <section id="dashboard" className="w-full pb-8">
      <div className="mx-auto max-w-6xl space-y-8 px-1 md:px-2">
        <motion.header {...fade()} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-lime">Control lab</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-brand-white md:text-3xl">Overview</h1>
            <p className="mt-2 max-w-xl text-sm text-brand-river-mist">
              Live view of backend services, resource telemetry, and recent deployments.
            </p>
          </div>
          <div className="lab-glass inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lime opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime" />
            </span>
            <span className="text-brand-frost">All systems operational</span>
          </div>
        </motion.header>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <MetricCard label="CPU" value={systemStatus.cpu} icon={Cpu} delay={0.05} />
          <MetricCard label="Memory" value={systemStatus.memory} icon={Activity} delay={0.1} />
          <MetricCard label="Network" value={systemStatus.network} icon={Wifi} delay={0.15} />
          <MetricCard label="Storage" value={systemStatus.storage} icon={HardDrive} delay={0.2} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          <motion.div {...fade(0.12)} className="lab-glass lg:col-span-2 p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-river-mist">Infrastructure</h2>
              <span className="text-xs text-brand-river-mist/80">6 services</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceTile key={service.title} {...service} delay={0.08 + i * 0.04} />
              ))}
            </div>
          </motion.div>

          <motion.div {...fade(0.18)} className="flex flex-col gap-4">
            <div className="lab-glass flex-1 p-5 md:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-river-mist">Quick access</h2>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => setActiveSection(action.id)}
                    className="group rounded-xl border border-brand-river-mist/10 bg-brand-forest/40 p-3 text-left transition-colors hover:border-brand-lime/30 hover:bg-brand-forest/70"
                  >
                    <action.icon className="mb-2 h-4 w-4 text-brand-lime" />
                    <p className="text-sm font-medium text-brand-frost group-hover:text-brand-white">{action.label}</p>
                    <p className="text-[11px] text-brand-river-mist">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {latestNotification && (
              <div className="lab-glass p-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-brand-river-mist">Latest event</p>
                <p className="mt-2 text-sm text-brand-frost">{latestNotification.message}</p>
                <p className="mt-1 text-xs capitalize text-brand-lime/90">{latestNotification.type}</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div {...fade(0.22)}>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-brand-white">Recent deployments</h2>
              <p className="text-sm text-brand-river-mist">Production apps currently in your stack.</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSection("projects-list")}
              className="hidden items-center gap-1 text-sm text-brand-lime transition-colors hover:text-brand-frost sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActiveSection("projects-list")}
            className="mt-4 inline-flex items-center gap-1 text-sm text-brand-lime transition-colors hover:text-brand-frost sm:hidden"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function MetricCard({
  label,
  value,
  icon: Icon,
  delay,
}: {
  label: string
  value: number
  icon: LucideIcon
  delay: number
}) {
  const spring = useSpring(value, {
    stiffness: 55,
    damping: 22,
    mass: 0.6,
    restDelta: 0.05,
  })

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  const barWidth = useTransform(spring, (v) => `${Math.max(0, Math.min(100, v))}%`)

  const [displayValue, setDisplayValue] = useState(() => Math.round(value))
  useMotionValueEvent(spring, "change", (v) => {
    setDisplayValue(Math.round(v))
  })

  return (
    <motion.div
      {...fade(delay)}
      className="lab-glass group relative overflow-hidden p-4 md:p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-river-mist">{label}</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-brand-white md:text-3xl">{displayValue}%</p>
        </div>
        <div className="rounded-lg bg-brand-lime/10 p-2 text-brand-lime">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand-forest/80">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-lime/80 to-brand-lime will-change-[width]"
          style={{ width: barWidth }}
        />
      </div>
    </motion.div>
  )
}

function ServiceTile({
  title,
  icon: Icon,
  status,
  metric,
  description,
  delay,
}: {
  title: string
  icon: LucideIcon
  status: string
  metric: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-start gap-3 rounded-xl border border-brand-river-mist/10 bg-brand-midnight/30 p-3 transition-colors hover:border-brand-lime/25"
    >
      <div className="rounded-lg bg-brand-lime/10 p-2">
        <Icon className="h-4 w-4 text-brand-lime" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-medium text-brand-frost">{title}</h3>
          <span className="rounded-full bg-brand-lime/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-lime">
            {status}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-brand-river-mist">{description}</p>
        <p className="mt-1 font-mono text-[10px] text-brand-river-mist/70">{metric}</p>
      </div>
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number]
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.06 }}
      className="lab-glass group flex h-full flex-col p-4 md:p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-brand-frost transition-colors group-hover:text-brand-lime">{project.name}</h3>
        {project.liveUrl && (
          <a
            href={`https://${project.liveUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md p-1 text-brand-river-mist transition-colors hover:bg-brand-lime/10 hover:text-brand-lime"
            aria-label={`Open ${project.name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
      {project.highlight && <p className="mb-2 text-xs font-medium text-brand-lime/90">{project.highlight}</p>}
      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-brand-river-mist">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-brand-river-mist/10 bg-brand-forest/50 px-2 py-0.5 text-[10px] text-brand-frost"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
