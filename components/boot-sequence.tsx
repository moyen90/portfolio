"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function BootSequence({ progress }: { progress: number }) {
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const bootSequenceMessages = [
    "Initializing system kernel...",
    "Loading system modules...",
    "Mounting virtual file systems...",
    "Starting network services...",
    "Initializing database connections...",
    "Loading API endpoints...",
    "Starting authentication services...",
    "Configuring security protocols...",
    "Initializing real-time event system...",
    "Loading developer profile...",
    "Preparing command center interface...",
    "System boot sequence complete.",
  ]

  useEffect(() => {
    // Use deterministic timing for boot messages
    const addMessage = (index: number) => {
      if (index < bootSequenceMessages.length) {
        setBootMessages((prev) => [...prev, bootSequenceMessages[index]])
        setTimeout(() => addMessage(index + 1), 300)
      }
    }

    // Only start message sequence on client-side
    setTimeout(() => addMessage(0), 300)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-brand-midnight flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-brand-lime mb-2 glitch-text"
          >
            SERVER CONTROL CENTER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-brand-frost text-lg"
          >
            Backend Engineering Command Interface
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="terminal-window bg-brand-midnight border border-brand-lime rounded p-4 h-80 overflow-y-auto font-mono text-sm"
        >
          {bootMessages.map((message, index) => (
            <div key={index} className="mb-1">
              <span className="text-brand-river-mist">[SYSTEM]</span> <span className="text-brand-frost">{message}</span>
            </div>
          ))}
          {bootMessages.length < bootSequenceMessages.length && (
            <div className="inline-block">
              <span className="text-brand-lime animate-pulse">▋</span>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-6">
          <div className="w-full bg-brand-forest rounded-full h-2.5">
            <motion.div
              className="bg-brand-lime h-2.5 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-brand-frost">
            <span>BOOT SEQUENCE: {Math.floor(progress)}%</span>
            <span>{progress >= 100 ? "COMPLETE" : "IN PROGRESS"}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
