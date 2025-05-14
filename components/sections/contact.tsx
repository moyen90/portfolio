"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSystem } from "../system-context"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Loader2 } from "lucide-react"

export default function Contact() {
  const { addNotification } = useSystem()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      addNotification("Message sent successfully", "success")
      console.log("Form submitted:", formData)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      addNotification("Failed to send message", "error")
    } finally {
      setIsSubmitting(false)
    }
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
                    <div>
                      <h3 className="text-green-500 font-medium">Email</h3>
                      <a
                        href="mailto:dev.moyenislam@gmail.com"
                        className="text-green-600 hover:text-green-400 transition-colors"
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
                      href="#"
                      className="p-2 bg-green-900/20 rounded-md text-green-500 hover:text-green-400 hover:bg-green-900/30 transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="p-2 bg-green-900/20 rounded-md text-green-500 hover:text-green-400 hover:bg-green-900/30 transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
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

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/20 mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-green-400 font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-green-600 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    type="button"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
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
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
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
                      value={formData.subject}
                      onChange={handleChange}
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
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 bg-gray-700 border border-green-900/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                    ></textarea>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
