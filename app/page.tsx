"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import BootSequence from "@/components/boot-sequence"
import CommandCenter from "@/components/command-center"
import { SystemProvider } from "@/components/system-context"

export default function Home() {
  const [booting, setBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)

  useEffect(() => {
    // Simulate boot sequence
    const bootTimer = setTimeout(() => {
      setBooting(false)
    }, 5000)

    // Update boot progress with deterministic increments
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        const next = prev + 10;
        return next >= 100 ? 100 : next;
      })
    }, 300)

    return () => {
      clearTimeout(bootTimer)
      clearInterval(interval)
    }
  }, [])

  return (
    <SystemProvider>
      <main className="h-screen w-screen bg-black text-green-500 font-mono">
        <AnimatePresence mode="wait">
          {booting ? <BootSequence progress={bootProgress} /> : <CommandCenter />}
        </AnimatePresence>
      </main>
    </SystemProvider>
  )
}
