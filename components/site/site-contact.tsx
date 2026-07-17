"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SiteContact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const mailtoLink = `mailto:dev.moyenislam@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
    window.open(mailtoLink, "_self")
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-lime">Contact</p>
          <h2 className="text-3xl font-semibold tracking-tight text-brand-white md:text-4xl">Let&apos;s build something</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel flex flex-col justify-between p-6 md:p-8"
          >
            <div>
              <p className="text-brand-river-mist leading-relaxed">
                Project inquiries, backend architecture, or AI integration — reach out anytime.
              </p>
              <a
                href="mailto:dev.moyenislam@gmail.com"
                className="mt-6 inline-flex items-center gap-2 text-lg font-medium text-brand-lime hover:text-brand-frost"
              >
                <Mail className="h-5 w-5" />
                dev.moyenislam@gmail.com
              </a>
              <p className="mt-4 text-sm text-brand-river-mist">Dhaka, Bangladesh · +880 1308 989743</p>
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { href: "https://github.com/moyen90", Icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/moyenul-islam-675204211/", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://x.com/moyen900", Icon: Twitter, label: "X" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg border border-brand-river-mist/15 p-2.5 text-brand-lime transition-colors hover:border-brand-lime/30 hover:bg-brand-lime/5"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            onSubmit={handleSubmit}
            className="glass-panel space-y-4 p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="site-name" className="mb-1 block text-xs font-medium text-brand-river-mist">
                  Name
                </label>
                <input
                  id="site-name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-brand-river-mist/15 bg-brand-forest/60 px-3 py-2 text-brand-frost outline-none ring-brand-lime focus:ring-1"
                />
              </div>
              <div>
                <label htmlFor="site-email" className="mb-1 block text-xs font-medium text-brand-river-mist">
                  Email
                </label>
                <input
                  id="site-email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-brand-river-mist/15 bg-brand-forest/60 px-3 py-2 text-brand-frost outline-none ring-brand-lime focus:ring-1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="site-subject" className="mb-1 block text-xs font-medium text-brand-river-mist">
                Subject
              </label>
              <input
                id="site-subject"
                name="subject"
                required
                className="w-full rounded-lg border border-brand-river-mist/15 bg-brand-forest/60 px-3 py-2 text-brand-frost outline-none ring-brand-lime focus:ring-1"
              />
            </div>
            <div>
              <label htmlFor="site-message" className="mb-1 block text-xs font-medium text-brand-river-mist">
                Message
              </label>
              <textarea
                id="site-message"
                name="message"
                required
                rows={5}
                className="w-full rounded-lg border border-brand-river-mist/15 bg-brand-forest/60 px-3 py-2 text-brand-frost outline-none ring-brand-lime focus:ring-1"
              />
            </div>
            <Button type="submit" className="w-full rounded-full bg-brand-lime text-brand-forest hover:bg-brand-lime/90 sm:w-auto">
              <Send className="h-4 w-4" />
              Send message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
