"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      text: "Absolutely amazing work! My bridal lehenga was perfect in every way. The attention to detail and the quality of stitching exceeded my expectations. Highly recommended!",
      service: "Bridal Wear",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Anita Gupta",
      location: "Mumbai",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      text: "I have been getting my blouses stitched here for 5 years now. The fit is always perfect and the designs are trendy. The team is very professional and friendly.",
      service: "Blouse Stitching",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Meera Patel",
      location: "Ahmedabad",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      text: "The best tailoring center I have ever visited! They completed my entire wedding trousseau with such precision. Every outfit was a masterpiece.",
      service: "Wedding Collection",
      date: "2024-01-05",
    },
    {
      id: 4,
      name: "Sunita Devi",
      location: "Jaipur",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      text: "Excellent service and timely delivery. My daughter's party dress came out beautifully. The staff is very cooperative and understanding.",
      service: "Kids Wear",
      date: "2023-12-28",
    },
    {
      id: 5,
      name: "Deepika Singh",
      location: "Bangalore",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      text: "Professional service with a personal touch. They understood exactly what I wanted and delivered beyond expectations. Will definitely come back!",
      service: "Suit Stitching",
      date: "2023-12-20",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with
            us.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="relative mb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-3 gap-0">
              {/* Client Image */}
              <div className="relative bg-gradient-to-br from-rose-400 to-pink-500 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-rose-100 mb-4">{testimonials[currentTestimonial].location}</p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                <Quote className="w-12 h-12 text-rose-400 mb-6" />
                <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Service:</p>
                    <p className="font-semibold text-rose-600">{testimonials[currentTestimonial].service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Date:</p>
                    <p className="font-semibold text-gray-700">
                      {new Date(testimonials[currentTestimonial].date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{testimonial.text}"</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{testimonial.service}</span>
                  <span>{new Date(testimonial.date).toLocaleDateString("en-IN")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-rose-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">4.9</div>
              <div className="flex justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Overall Rating</p>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">500+</div>
              <p className="text-sm text-gray-600">Happy Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
