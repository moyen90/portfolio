"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BootSequence from "./boot-sequence"
import { SystemProvider } from "./system-context"
import CommandCenter from "./command-center"

export default function TechWorldHero() {
  const [bootProgress, setBootProgress] = useState(0)
  const [bootComplete, setBootComplete] = useState(false)

  // Simulate boot sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        const newProgress = prev + (Math.random() * 5 + 1)
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => setBootComplete(true), 1000)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence>
        {!bootComplete ? (
          <BootSequence progress={bootProgress} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
            <SystemProvider>
              <CommandCenter />
            </SystemProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
