"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CTO, TechStart Inc.",
    image: "/placeholder.svg?height=100&width=100",
    text: "John's backend development skills are exceptional. He built a robust API for our e-commerce platform that handled our Black Friday traffic without a hitch. His attention to security and performance optimization saved us countless hours of troubleshooting.",
  },
  {
    name: "Michael Chen",
    position: "Founder, DataFlow Systems",
    image: "/placeholder.svg?height=100&width=100",
    text: "Working with John was a game-changer for our startup. He implemented a complex database architecture that scaled seamlessly as our user base grew. His documentation was thorough and made onboarding new developers a breeze.",
  },
  {
    name: "Emily Rodriguez",
    position: "Product Manager, FinTech Solutions",
    image: "/placeholder.svg?height=100&width=100",
    text: "John delivered our payment processing system ahead of schedule and under budget. His expertise with Stripe integration and security protocols ensured our customers' data remained protected. I wouldn't hesitate to work with him again.",
  },
  {
    name: "David Kim",
    position: "Lead Developer, SocialConnect",
    image: "/placeholder.svg?height=100&width=100",
    text: "The real-time features John built using Socket.io transformed our platform. Our users love the instant messaging and notification system. His code was clean, well-tested, and easy to maintain.",
  },
  {
    name: "Lisa Patel",
    position: "CEO, AI Innovations",
    image: "/placeholder.svg?height=100&width=100",
    text: "John's work integrating our AI models with a scalable backend infrastructure exceeded our expectations. He has a rare combination of machine learning knowledge and backend expertise that made our project a success.",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleCount >= testimonials.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? Math.max(0, testimonials.length - visibleCount) : prevIndex - 1))
  }

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    Math.min(currentIndex + visibleCount, testimonials.length),
  )

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between mb-6">
            <h3 className="text-2xl font-semibold">What Clients Say</h3>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-emerald-500 mb-4" />
                  <p className="text-gray-300 mb-6 flex-grow">{testimonial.text}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
