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
          <h1 className="text-3xl font-bold text-green-400 mb-2">Contact</h1>
          <p className="text-green-600 mb-6">Get in touch for project inquiries, collaborations, or just to say hello.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <div className="bg-gray-800 border border-green-900/30 rounded-md p-6 h-full flex flex-col">
              <h2 className="text-green-400 font-bold text-xl mb-6">Contact Information</h2>

              <div className="flex flex-col flex-grow justify-between">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-green-900/20 rounded-md mr-4">
                      <Mail className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-green-500 font-medium">Email</h3>
                      <a
                        href="mailto:dev.moyenislam@gmail.com"
                        className="text-green-600 hover:text-green-400 transition-colors break-words"
                      >
                        dev.moyenislam@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-green-900/20 rounded-md mr-4">
                      <Phone className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-green-500 font-medium">Phone</h3>
                      <a href="tel:+11234567890" className="text-green-600 hover:text-green-400 transition-colors">
                        +880 1308 989743
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-green-900/20 rounded-md mr-4">
                      <MapPin className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-green-500 font-medium">Location</h3>
                      <p className="text-green-600">Bogura, Bangladesh</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-green-500 font-medium mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/moyen90"
                      className="p-2 bg-green-900/20 rounded-md text-green-500 hover:text-green-400 hover:bg-green-900/30 transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/moyenul-islam-675204211/"
                      className="p-2 bg-green-900/20 rounded-md text-green-500 hover:text-green-400 hover:bg-green-900/30 transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="https://x.com/moyen900"
                      className="p-2 bg-green-900/20 rounded-md text-green-500 hover:text-green-400 hover:bg-green-900/30 transition-colors"
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
            <div className="bg-gray-800 border border-green-900/30 rounded-md p-6 h-full">
              <h2 className="text-green-400 font-bold text-xl mb-6">Send Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-green-500 text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 bg-gray-700 border border-green-900/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-green-500 text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 bg-gray-700 border border-green-900/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-green-500 text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-green-900/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-green-500 text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-3 py-2 bg-gray-700 border border-green-900/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                  ></textarea>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center justify-center"
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
