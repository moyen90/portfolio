"use client"

import { useEffect } from "react"

import { createContext, useContext, useState, type ReactNode } from "react"

type SystemContextType = {
  activeSection: string
  setActiveSection: (section: string) => void
  systemStatus: {
    cpu: number
    memory: number
    network: number
    storage: number
  }
  notifications: Array<{
    id: string
    message: string
    type: "info" | "warning" | "error" | "success"
    timestamp: Date
  }>
  addNotification: (message: string, type: "info" | "warning" | "error" | "success") => void
  dismissNotification: (id: string) => void
  terminalHistory: Array<{
    input?: string
    output?: string | ReactNode
    isError?: boolean
    isSystem?: boolean
  }>
  addTerminalEntry: (entry: {
    input?: string
    output?: string | ReactNode
    isError?: boolean
    isSystem?: boolean
  }) => void
  clearTerminal: () => void
}

const SystemContext = createContext<SystemContextType | undefined>(undefined)

// Use fixed initial values for hydration consistency
const INITIAL_SYSTEM_STATUS = {
  cpu: 20,
  memory: 45,
  network: 35,
  storage: 70,
}

export function SystemProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [systemStatus, setSystemStatus] = useState(INITIAL_SYSTEM_STATUS)
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      message: string
      type: "info" | "warning" | "error" | "success"
      timestamp: Date
    }>
  >([
    {
      id: "welcome",
      message: "Welcome to the Server Control Center",
      type: "info",
      timestamp: new Date(2023, 0, 1),
    },
  ])
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{
      input?: string
      output?: string | ReactNode
      isError?: boolean
      isSystem?: boolean
    }>
  >([
    {
      isSystem: true,
      output: "SERVER CONTROL CENTER v1.0.0",
    },
    {
      isSystem: true,
      output: "Type 'help' to see available commands",
    },
  ])

  // Update system status periodically - only on client side
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus({
        cpu: Math.min(100, Math.max(5, systemStatus.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(100, Math.max(20, systemStatus.memory + (Math.random() - 0.5) * 5)),
        network: Math.min(100, Math.max(10, systemStatus.network + (Math.random() - 0.5) * 15)),
        storage: Math.min(100, Math.max(50, systemStatus.storage + (Math.random() - 0.5) * 2)),
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [systemStatus])

  // Update the addNotification function to prevent infinite loops
  const addNotification = (message: string, type: "info" | "warning" | "error" | "success") => {
    const newNotification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    }
    setNotifications((prev) => {
      // Check if this exact notification already exists to prevent duplicates
      if (prev.some((n) => n.message === message && n.type === type)) {
        return prev
      }
      return [newNotification, ...prev].slice(0, 5)
    })
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const addTerminalEntry = (entry: {
    input?: string
    output?: string | ReactNode
    isError?: boolean
    isSystem?: boolean
  }) => {
    setTerminalHistory((prev) => [...prev, entry])
  }

  const clearTerminal = () => {
    setTerminalHistory([
      {
        isSystem: true,
        output: "Terminal cleared",
      },
    ])
  }

  return (
    <SystemContext.Provider
      value={{
        activeSection,
        setActiveSection,
        systemStatus,
        notifications,
        addNotification,
        dismissNotification,
        terminalHistory,
        addTerminalEntry,
        clearTerminal,
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  const context = useContext(SystemContext)
  if (context === undefined) {
    throw new Error("useSystem must be used within a SystemProvider")
  }
  return context
}
