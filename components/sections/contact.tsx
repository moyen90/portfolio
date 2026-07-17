"use client"

import type React from "react"
import { useEffect } from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react"

export default function Contact() {
  // Suppress browser extension errors
  useEffect(() => {
    const originalError = console.error
    console.error = (...args) => {
      if (args[0]?.includes?.('message channel closed') ||
        args[0]?.includes?.('asynchronous response')) {
        return // Ignore extension errors
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    const mailtoLink = `mailto:dev.moyenislam@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

    window.open(mailtoLink, '_self')
  }

  return (
    <section id="contact" className="w-full py-1 md:py-1 lg:py-1">
      <div className="container px-4 md:px-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-brand-frost mb-2">Contact</h1>
          <p className="text-brand-river-mist mb-6">Get in touch for project inquiries, collaborations, or just to say hello.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <div className="bg-brand-deep-forest border border-brand-deep-forest/50 rounded-md p-6 h-full flex flex-col">
              <h2 className="text-brand-frost font-bold text-xl mb-6">Contact Information</h2>

              <div className="flex flex-col flex-grow justify-between">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-brand-lime/10 rounded-md mr-4">
                      <Mail className="w-6 h-6 text-brand-lime" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-brand-lime font-medium">Email</h3>
                      <a
                        href="mailto:dev.moyenislam@gmail.com"
                        className="text-brand-river-mist hover:text-brand-frost transition-colors break-words"
                      >
                        dev.moyenislam@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-brand-lime/10 rounded-md mr-4">
                      <Phone className="w-6 h-6 text-brand-lime" />
                    </div>
                    <div>
                      <h3 className="text-brand-lime font-medium">Phone</h3>
                      <a href="tel:+11234567890" className="text-brand-river-mist hover:text-brand-frost transition-colors">
                        +880 1308 989743
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-brand-lime/10 rounded-md mr-4">
                      <MapPin className="w-6 h-6 text-brand-lime" />
                    </div>
                    <div>
                      <h3 className="text-brand-lime font-medium">Location</h3>
                      <p className="text-brand-river-mist">Bogura, Bangladesh</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-brand-lime font-medium mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/moyen90"
                      className="p-2 bg-brand-lime/10 rounded-md text-brand-lime hover:text-brand-frost hover:bg-brand-lime/10 transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/moyenul-islam-675204211/"
                      className="p-2 bg-brand-lime/10 rounded-md text-brand-lime hover:text-brand-frost hover:bg-brand-lime/10 transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="https://x.com/moyen900"
                      className="p-2 bg-brand-lime/10 rounded-md text-brand-lime hover:text-brand-frost hover:bg-brand-lime/10 transition-colors"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-full"
          >
            <div className="bg-brand-deep-forest border border-brand-deep-forest/50 rounded-md p-6 h-full">
              <h2 className="text-brand-frost font-bold text-xl mb-6">Send Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-brand-lime text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 bg-brand-forest border border-brand-deep-forest/50 rounded-md text-brand-frost focus:outline-none focus:ring-1 focus:ring-brand-lime"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-brand-lime text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 bg-brand-forest border border-brand-deep-forest/50 rounded-md text-brand-frost focus:outline-none focus:ring-1 focus:ring-brand-lime"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-brand-lime text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 bg-brand-forest border border-brand-deep-forest/50 rounded-md text-brand-frost focus:outline-none focus:ring-1 focus:ring-brand-lime"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-brand-lime text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-3 py-2 bg-brand-forest border border-brand-deep-forest/50 rounded-md text-brand-frost focus:outline-none focus:ring-1 focus:ring-brand-lime"
                  ></textarea>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-lime hover:bg-brand-lime/90 text-brand-forest rounded-md transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
