"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full border border-brand-lime/20 bg-brand-deep-forest/40" />
    </div>
  ),
})

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-60 md:opacity-100">
      <div className="relative h-48 w-48 md:h-64 md:w-64">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-brand-lime/30" />
        <div className="absolute inset-4 animate-spin-slower rounded-full border border-brand-river-mist/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rotate-45 border-2 border-brand-lime/50 bg-brand-deep-forest/80" />
        </div>
      </div>
    </div>
  )
}

export default function SiteHero() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const handler = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 md:left-[35%]">
        {!reduceMotion ? <HeroScene /> : <HeroFallback />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-midnight via-brand-midnight/80 to-transparent md:from-brand-midnight md:via-brand-midnight/40 md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl space-y-6 md:max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-river-mist/20 bg-brand-deep-forest/40 px-3 py-1 text-xs text-brand-river-mist backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-lime" />
            Backend engineer · AI-enabled products
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl md:text-6xl lg:text-7xl">
            Building scalable APIs &{" "}
            <span className="text-brand-lime">intelligent backends</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-brand-river-mist">
            I design Node.js systems, real-time services, and cloud-native infrastructure for products
            like Photofox, Vocalo, and SketchToImage.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full bg-brand-lime text-brand-forest hover:bg-brand-lime/90">
              <a href="#work">View selected work</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-brand-river-mist/30 bg-brand-deep-forest/30 text-brand-frost backdrop-blur-sm hover:bg-brand-deep-forest/60"
            >
              <a href="#contact">Get in touch</a>
            </Button>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-brand-river-mist transition-colors hover:text-brand-lime"
        aria-label="Scroll to about"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
