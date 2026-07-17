"use client"

import { useSystem } from "./system-context"
import { motion } from "framer-motion"
import { LayoutDashboard, Cpu, TerminalIcon, Mail, User, FolderOpen, X } from "lucide-react"

export default function Sidebar({ onMobileClose }: { onMobileClose?: () => void }) {
  const { activeSection, setActiveSection, systemStatus, addNotification } = useSystem()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "skills", label: "Skills Matrix", icon: Cpu },
    { id: "projects-list", label: "Projects", icon: FolderOpen },
    { id: "terminal", label: "Terminal", icon: TerminalIcon },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const handleSectionChange = (sectionId: string) => {
    console.log("Changing section to:", sectionId)
    setActiveSection(sectionId)
    addNotification(`Navigated to ${sectionId}`, "info")
    // Close mobile sidebar when an item is selected
    if (onMobileClose) {
      onMobileClose()
    }
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`bg-brand-forest flex flex-col ${onMobileClose
        ? "w-full h-full rounded-lg border border-brand-deep-forest/50 shadow-2xl"
        : "w-64 border-r border-brand-deep-forest/50 h-full"
        }`}
    >
      <div className="p-4 border-b border-brand-deep-forest/50">
        {/* Mobile Close Button */}
        {onMobileClose && (
          <div className="flex justify-end mb-4 md:hidden">
            <button
              onClick={onMobileClose}
              className="text-brand-lime hover:text-brand-frost transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center">
            <User className="w-6 h-6 text-brand-lime" />
          </div>
          <div>
            <h2 className="text-brand-lime font-bold">Moyenul Islam</h2>
            <p className="text-brand-river-mist text-xs">Backend Developer</p>
          </div>
        </div>
      </div>

      <nav className={`flex-1 p-2 ${onMobileClose ? "overflow-y-auto" : ""}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            type="button"
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md mb-1 transition-colors ${activeSection === item.id
              ? "bg-brand-lime/10 text-brand-frost"
              : "text-brand-river-mist hover:bg-brand-lime/10 hover:text-brand-lime"
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-brand-deep-forest/50">
        <h3 className="text-brand-river-mist text-xs uppercase mb-2">System Status</h3>
        <div className="space-y-2">
          <StatusBar label="CPU" value={systemStatus.cpu} />
          <StatusBar label="Memory" value={systemStatus.memory} />
          <StatusBar label="Network" value={systemStatus.network} />
          <StatusBar label="Storage" value={systemStatus.storage} />
        </div>
      </div>
    </motion.div>
  )
}

function StatusBar({ label, value }: { label: string; value: number }) {
  const getStatusColor = (value: number) => {
    if (value < 30) return "bg-brand-lime"
    if (value < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="text-xs">
      <div className="flex justify-between mb-1">
        <span className="text-brand-river-mist">{label}</span>
        <span className="text-brand-lime tabular-nums">{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-brand-deep-forest rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-[width] duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${getStatusColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
