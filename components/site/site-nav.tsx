"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-300",
        scrolled ? "glass-nav border-b border-brand-river-mist/10" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-brand-frost">
          Moyenul Islam
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-brand-river-mist transition-colors hover:text-brand-frost"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/lab"
            className="rounded-full border border-brand-river-mist/25 px-3 py-1.5 text-xs font-medium text-brand-frost transition-colors hover:border-brand-lime/40 hover:text-brand-lime"
          >
            Control Lab
          </Link>
        </nav>
        <Link
          href="/lab"
          className="rounded-full border border-brand-river-mist/25 px-3 py-1.5 text-xs font-medium text-brand-frost md:hidden"
        >
          Lab
        </Link>
      </div>
    </motion.header>
  )
}
