"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import BootSequence from "@/components/boot-sequence"
import CommandCenter from "@/components/command-center"
import { SystemProvider } from "@/components/system-context"

export default function LabPage() {
  const [booting, setBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (skipped) {
      setBooting(false)
      return
    }
    const bootTimer = setTimeout(() => setBooting(false), 2500)
    const interval = setInterval(() => {
      setBootProgress((prev) => Math.min(100, prev + 12))
    }, 200)
    return () => {
      clearTimeout(bootTimer)
      clearInterval(interval)
    }
  }, [skipped])

  return (
    <SystemProvider>
      <main className="relative h-screen w-screen overflow-hidden bg-brand-midnight font-mono text-brand-frost">
        <Link
          href="/"
          className="absolute bottom-1 right-4 z-[60] rounded-lg border border-brand-lime/35 bg-brand-deep-forest/90 px-4 py-2 text-sm font-medium text-brand-frost shadow-lg shadow-brand-midnight/50 backdrop-blur-sm transition-colors hover:border-brand-lime hover:bg-brand-deep-forest hover:text-brand-lime"
        >
          ← Site
        </Link>
        {booting && (
          <button
            type="button"
            onClick={() => setSkipped(true)}
            className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 text-xs text-brand-river-mist underline-offset-2 hover:text-brand-lime hover:underline"
          >
            Skip boot
          </button>
        )}
        <AnimatePresence mode="wait">
          {booting ? (
            <motion.div key="boot" exit={{ opacity: 0 }} className="h-full w-full">
              <BootSequence progress={bootProgress} />
            </motion.div>
          ) : (
            <motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
              <CommandCenter />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SystemProvider>
  )
}
