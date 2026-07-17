"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Terminal, Cloud, Database, ArrowUpRight } from "lucide-react"
import { stackPills } from "@/lib/skills"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45 },
}

export default function BentoSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-lime">About</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-brand-white md:text-4xl">
            From APIs to production — full backend ownership
          </h2>
          <p className="mt-4 text-lg text-brand-river-mist">
            I&apos;m Moyenul Islam, a backend developer focused on Express/Node services, data layers,
            DevOps on GCP, and integrating generative AI into real products — not demos.
          </p>
        </motion.div>

        <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="glass-panel md:col-span-4 md:row-span-2 p-6 md:p-8"
          >
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-brand-frost">What I do</h3>
                <p className="mt-3 max-w-xl text-brand-river-mist leading-relaxed">
                  Architect REST and WebSocket APIs, model MongoDB/Postgres schemas, containerize with
                  Docker, and ship CI/CD pipelines. Recent work spans AI media tools, language learning, and
                  high-traffic content platforms.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {stackPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-brand-river-mist/15 bg-brand-forest/50 px-3 py-1 text-xs text-brand-frost"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="glass-panel p-6 md:col-span-2">
            <Cloud className="mb-4 h-8 w-8 text-brand-lime" />
            <h3 className="font-semibold text-brand-frost">Cloud-native</h3>
            <p className="mt-2 text-sm text-brand-river-mist">GCP-first deployments, Docker, CI/CD, observability-minded ops.</p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="glass-panel p-6 md:col-span-2">
            <Database className="mb-4 h-8 w-8 text-brand-lime" />
            <h3 className="font-semibold text-brand-frost">Data & realtime</h3>
            <p className="mt-2 text-sm text-brand-river-mist">MongoDB at scale, Postgres where relational fits, Socket.io for live UX.</p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="glass-panel group relative overflow-hidden p-6 md:col-span-3"
          >
            <Terminal className="mb-4 h-8 w-8 text-brand-lime" />
            <h3 className="font-semibold text-brand-frost">Server Control Lab</h3>
            <p className="mt-2 text-sm text-brand-river-mist">
              Interactive command-center UI — skills matrix, projects, and terminal. Built as a
              playground for the old portfolio shell.
            </p>
            <Link
              href="/lab"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-lime transition-colors group-hover:text-brand-frost"
            >
              Open lab
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="glass-panel p-6 md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-wider text-brand-river-mist">Currently</p>
            <p className="mt-3 text-2xl font-semibold text-brand-white">Shipping AI-backed SaaS</p>
            <p className="mt-2 text-sm text-brand-river-mist">Based in Dhaka, Bangladesh · open to remote collaboration</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
