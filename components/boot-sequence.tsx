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
      className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-green-500 mb-2 glitch-text"
          >
            SERVER CONTROL CENTER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-green-400 text-lg"
          >
            Backend Engineering Command Interface
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="terminal-window bg-black border border-green-500 rounded p-4 h-80 overflow-y-auto font-mono text-sm"
        >
          {bootMessages.map((message, index) => (
            <div key={index} className="mb-1">
              <span className="text-green-600">[SYSTEM]</span> <span className="text-green-400">{message}</span>
            </div>
          ))}
          {bootMessages.length < bootSequenceMessages.length && (
            <div className="inline-block">
              <span className="text-green-500 animate-pulse">▋</span>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-6">
          <div className="w-full bg-gray-900 rounded-full h-2.5">
            <motion.div
              className="bg-green-500 h-2.5 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-green-400">
            <span>BOOT SEQUENCE: {Math.floor(progress)}%</span>
            <span>{progress >= 100 ? "COMPLETE" : "IN PROGRESS"}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
