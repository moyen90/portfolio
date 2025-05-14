"use client"

import { useSystem } from "./system-context"
import { motion } from "framer-motion"
import { LayoutDashboard, Cpu, Network, TerminalIcon, Mail, User } from "lucide-react"

export default function Sidebar() {
  const { activeSection, setActiveSection, systemStatus, addNotification } = useSystem()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "skills", label: "Skills Matrix", icon: Cpu },
    { id: "projects", label: "Projects Network", icon: Network },
    { id: "terminal", label: "Terminal", icon: TerminalIcon },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const handleSectionChange = (sectionId: string) => {
    console.log("Changing section to:", sectionId)
    setActiveSection(sectionId)
    addNotification(`Navigated to ${sectionId}`, "info")
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-64 bg-gray-900 border-r border-green-900/30 flex flex-col"
    >
      <div className="p-4 border-b border-green-900/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
            <User className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h2 className="text-green-500 font-bold">Moyenul Islam</h2>
            <p className="text-green-600 text-xs">Backend Developer</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            type="button"
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md mb-1 transition-colors ${activeSection === item.id
              ? "bg-green-900/30 text-green-400"
              : "text-green-600 hover:bg-green-900/20 hover:text-green-500"
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-green-900/30">
        <h3 className="text-green-600 text-xs uppercase mb-2">System Status</h3>
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
    if (value < 30) return "bg-green-500"
    if (value < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="text-xs">
      <div className="flex justify-between mb-1">
        <span className="text-green-600">{label}</span>
        <span className="text-green-500">{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${getStatusColor(value)}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
