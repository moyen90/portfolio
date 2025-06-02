"use client"

import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useSystem } from "./system-context"
import Sidebar from "./sidebar"
import Dashboard from "./sections/dashboard"
import SkillsMatrix from "./sections/skills-matrix"
// ProjectsNetwork import removed as the file was deleted
import Terminal from "./sections/terminal"
import Contact from "./sections/contact"
import SystemHeader from "./system-header"
import Footer from "./footer"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CommandCenter() {
  const { activeSection, notifications, addNotification } = useSystem()

  // Add notification only once on mount
  useEffect(() => {
    addNotification("Command Center interface loaded", "info")
  }, [addNotification])

  // Map sections to components - memoized to prevent recreation on each render
  const sectionComponents = useMemo(() => ({
    dashboard: Dashboard,
    skills: SkillsMatrix,
    // projects: ProjectsNetwork, // Removed as ProjectsNetwork is deleted
    terminal: Terminal,
    contact: Contact,
  }), [])

  // Get the current active component - memoized based on activeSection
  const ActiveComponent = useMemo(() =>
    sectionComponents[activeSection as keyof typeof sectionComponents] || Dashboard,
    [activeSection, sectionComponents])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col"
      transition={{ duration: 0.2 }}
    >
      <SystemHeader
        notificationCount={notifications.length}
      />

      <div className="flex flex-1 overflow-auto">
        <Sidebar />

        <main className="flex-1 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

          <ScrollArea className="h-full w-full">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              <ActiveComponent />
            </motion.div>
          </ScrollArea>

        </main>
      </div>
      <Footer />
    </motion.div>
  )
}
