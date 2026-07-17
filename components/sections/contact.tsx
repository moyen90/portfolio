"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageSquare, Clock } from "lucide-react"
import { buildContactMailto, contactInfo, socialLinks } from "@/lib/contact"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] },
})

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
} as const

const inputClass =
  "w-full rounded-lg border border-brand-river-mist/15 bg-brand-midnight/50 px-3 py-2.5 text-sm text-brand-frost outline-none transition-shadow placeholder:text-brand-river-mist/40 focus:border-brand-lime/40 focus:ring-1 focus:ring-brand-lime/50"

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    window.open(buildContactMailto(name, email, subject, message), "_self")
  }

  return (
    <section id="contact" className="w-full pb-8">
      <div className="mx-auto max-w-6xl space-y-8 px-1 md:px-2">
        <motion.header {...fade()} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-lime">Comms</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-brand-white md:text-3xl">Contact</h1>
            <p className="mt-2 max-w-xl text-sm text-brand-river-mist">
              Project inquiries, backend architecture, or AI integration — send a message or use the channels below.
            </p>
          </div>
          <div className="lab-glass self-start rounded-full px-3 py-1.5 text-xs text-brand-lime sm:self-auto">
            {contactInfo.availability}
          </div>
        </motion.header>

        <div className="grid gap-4 lg:grid-cols-5 lg:gap-5">
          <motion.div {...fade(0.06)} className="space-y-4 lg:col-span-2">
            <div className="lab-glass p-5 md:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-river-mist">Direct channels</h2>
              <ul className="mt-5 space-y-4">
                <ContactRow
                  icon={Mail}
                  label="Email"
                  href={`mailto:${contactInfo.email}`}
                  value={contactInfo.email}
                />
                <ContactRow icon={Phone} label="Phone" href={contactInfo.phoneHref} value={contactInfo.phone} />
                <ContactRow icon={MapPin} label="Location" value={contactInfo.location} />
              </ul>
            </div>

            <div className="lab-glass p-5 md:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-river-mist">Social</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map(({ href, label }) => {
                  const Icon = socialIcons[label as keyof typeof socialIcons]
                  return (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center gap-2 rounded-full border border-brand-river-mist/15 bg-brand-forest/40 px-3 py-2 text-sm text-brand-frost transition-colors hover:border-brand-lime/35 hover:text-brand-lime"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="lab-glass flex gap-3 p-4">
              <Clock className="h-5 w-5 shrink-0 text-brand-lime" />
              <div>
                <p className="text-sm font-medium text-brand-frost">Typical response</p>
                <p className="mt-1 text-xs text-brand-river-mist">Within 1–2 business days for project inquiries.</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.1)} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="lab-glass h-full p-5 md:p-6">
              <div className="mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-brand-lime" />
                <h2 className="text-lg font-semibold text-brand-white">Send a message</h2>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" id="lab-contact-name" name="name" required />
                  <Field label="Email" id="lab-contact-email" name="email" type="email" required />
                </div>
                <Field label="Subject" id="lab-contact-subject" name="subject" required />
                <div>
                  <label htmlFor="lab-contact-message" className="mb-1.5 block text-xs font-medium text-brand-river-mist">
                    Message
                  </label>
                  <textarea
                    id="lab-contact-message"
                    name="message"
                    required
                    rows={6}
                    className={`${inputClass} resize-y min-h-[140px]`}
                    placeholder="Tell me about your project…"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-brand-river-mist/80">Opens your mail client with a pre-filled draft.</p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-6 py-2.5 text-sm font-medium text-brand-forest transition-colors hover:bg-brand-lime/90"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div {...fade(0.14)} className="lab-glass flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-brand-river-mist">Prefer the main site contact flow?</p>
          <Link
            href="/#contact"
            className="text-sm font-medium text-brand-lime transition-colors hover:text-brand-frost"
          >
            Open marketing site contact →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail
  label: string
  value: string
  href?: string
}) {
  const content = (
    <>
      <p className="text-xs font-medium uppercase tracking-wider text-brand-lime">{label}</p>
      <p className="mt-0.5 break-words text-sm text-brand-frost">{value}</p>
    </>
  )

  return (
    <li className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-lime/10">
        <Icon className="h-5 w-5 text-brand-lime" />
      </div>
      <div className="min-w-0">
        {href ? (
          <a href={href} className="block transition-colors hover:text-brand-lime">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </li>
  )
}

function Field({
  label,
  id,
  name,
  type = "text",
  required,
}: {
  label: string
  id: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-brand-river-mist">
        {label}
      </label>
      <input id={id} name={name} type={type} required={required} className={inputClass} />
    </div>
  )
}
