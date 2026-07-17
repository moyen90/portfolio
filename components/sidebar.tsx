"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, useSpring, useTransform, useMotionValueEvent } from "framer-motion"
import { useSystem } from "./system-context"
import {
  LayoutDashboard,
  Cpu,
  TerminalIcon,
  Mail,
  User,
  FolderOpen,
  X,
  ExternalLink,
  Activity,
} from "lucide-react"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "skills", label: "Skills Matrix", icon: Cpu },
  { id: "projects-list", label: "Projects", icon: FolderOpen },
  { id: "terminal", label: "Terminal", icon: TerminalIcon },
  { id: "contact", label: "Contact", icon: Mail },
] as const

export default function Sidebar({ onMobileClose }: { onMobileClose?: () => void }) {
  const { activeSection, setActiveSection, systemStatus } = useSystem()
  const isMobile = Boolean(onMobileClose)

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    onMobileClose?.()
  }

  return (
    <motion.aside
      initial={isMobile ? false : { x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex h-full flex-col ${isMobile
        ? "w-full rounded-2xl border border-brand-river-mist/10 bg-brand-deep-forest/95 shadow-2xl backdrop-blur-xl"
        : "w-[17.5rem] shrink-0 border-r border-brand-river-mist/10 bg-brand-midnight/40 backdrop-blur-xl"
        }`}
    >
      {isMobile && (
        <div className="flex items-center justify-between border-b border-brand-river-mist/10 px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-widest text-brand-lime">Navigation</span>
          <button
            type="button"
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-brand-river-mist transition-colors hover:bg-brand-forest/60 hover:text-brand-frost"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="border-b border-brand-river-mist/10 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime/10 ring-1 ring-brand-lime/25">
            <User className="h-5 w-5 text-brand-lime" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-brand-midnight bg-brand-lime" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-brand-frost">Moyenul Islam</p>
            <p className="truncate text-xs text-brand-river-mist">Backend Developer</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Lab sections">
        {menuItems.map((item) => {
          const active = activeSection === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionChange(item.id)}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${active
                ? "bg-brand-lime/10 text-brand-white"
                : "text-brand-river-mist hover:bg-brand-forest/50 hover:text-brand-frost"
                }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-brand-lime" />
              )}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${active
                  ? "bg-brand-lime/15 text-brand-lime"
                  : "bg-brand-forest/40 text-brand-river-mist group-hover:text-brand-lime"
                  }`}
              >
                <item.icon className="h-4 w-4" />
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="space-y-3 border-t border-brand-river-mist/10 p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-xl border border-brand-river-mist/15 bg-brand-forest/30 px-3 py-2 text-xs font-medium text-brand-river-mist transition-colors hover:border-brand-lime/30 hover:text-brand-lime"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Main site
        </Link>

        <div className="rounded-xl border border-brand-river-mist/10 bg-brand-deep-forest/35 p-3">
          <div className="mb-3 flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-brand-lime" />
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-brand-river-mist">System status</h3>
          </div>
          <div className="space-y-2.5">
            <StatusBar label="CPU" value={systemStatus.cpu} />
            <StatusBar label="Memory" value={systemStatus.memory} />
            <StatusBar label="Network" value={systemStatus.network} />
            <StatusBar label="Storage" value={systemStatus.storage} />
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

function StatusBar({ label, value }: { label: string; value: number }) {
  const spring = useSpring(value, { stiffness: 55, damping: 22, mass: 0.6 })
  const width = useTransform(spring, (v) => `${Math.max(0, Math.min(100, v))}%`)

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  const [display, setDisplay] = useState(() => Math.round(value))
  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(Math.round(v))
  })

  const barColor =
    display < 30 ? "from-brand-lime/80 to-brand-lime" : display < 70 ? "from-amber-400/80 to-amber-400" : "from-red-400/80 to-red-400"

  return (
    <div className="text-[11px]">
      <div className="mb-1 flex justify-between gap-2">
        <span className="min-w-0 truncate text-brand-river-mist">{label}</span>
        <span className="shrink-0 tabular-nums text-brand-frost">{display}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-brand-midnight/80">
        <motion.div className={`h-full rounded-full bg-gradient-to-r ${barColor}`} style={{ width }} />
      </div>
    </div>
  )
}
