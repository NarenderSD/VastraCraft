"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Award, Users, Clock, Scissors, Sparkles } from "lucide-react"
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/hero1.png",
      title: "Perfect Stitch, Perfect Fit",
      subtitle: "Premium Women's Tailoring by Radha",
    },
    {
      image: "/hero2.png",
      title: "Bridal Couture Specialists",
      subtitle: "Making Your Special Day Perfect",
    },
    {
      image: "/hero3.png",
      title: "Young, Modern, Confident",
      subtitle: "Tailoring for the Next Generation",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce">
          <Scissors className="w-8 h-8 text-rose-300/30 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-1000">
          <Sparkles className="w-6 h-6 text-pink-300/40 animate-spin" />
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce delay-2000">
          <div className="w-4 h-4 bg-rose-300/30 rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-32 animate-bounce delay-500">
          <div className="w-3 h-3 bg-pink-300/40 rounded-full animate-ping" />
        </div>
      </div>

      {/* Background Slider with Enhanced Animation */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-60 animate-pulse" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float delay-1000">
          <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-50 animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float delay-2000">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-rose-500 rounded-full opacity-70 animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fadeInUp">
          {/* Animated Title */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 animate-slideInDown">
              <Star className="w-5 h-5 text-yellow-400 animate-spin" />
              <span className="text-white font-medium">India's Best Women's Tailoring</span>
              <Star className="w-5 h-5 text-yellow-400 animate-spin" />
            </div>

            <h1 className="font-playfair text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight animate-slideInUp px-2 break-words">
              <span className="block animate-typewriter">{slides[currentSlide].title}</span>
            </h1>
            <p className="text-base xs:text-lg sm:text-2xl md:text-3xl text-rose-100 font-light animate-slideInUp delay-300 px-2 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slideInUp delay-500">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Award className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 animate-countUp">2+</div>
              <p className="text-rose-200 text-sm">Years Experience</p>
            </div>

            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 animate-countUp">1000+</div>
              <p className="text-rose-200 text-sm">Happy Clients</p>
            </div>

            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Star className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 animate-countUp">4.9</div>
              <p className="text-rose-200 text-sm">Star Rating</p>
            </div>

            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 animate-countUp">24hr</div>
              <p className="text-rose-200 text-sm">Quick Service</p>
            </div>
          </div>

          {/* CTA Buttons with Enhanced Animation */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slideInUp delay-700">
            <Link href="/booking" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                className="group bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-10 py-5 text-xl font-semibold shadow-2xl hover:shadow-rose-500/25 transform hover:scale-105 transition-all duration-500 border-2 border-white/20 hover:border-white/40"
              >
                <span className="mr-2">✨</span>
                Book Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Button>
            </Link>
            <Link href="/portfolio" passHref legacyBehavior>
              <Button
                as="a"
                variant="outline"
                size="lg"
                className="group border-2 border-white/60 text-white hover:bg-white hover:text-rose-600 px-10 py-5 text-xl font-semibold backdrop-blur-sm hover:backdrop-blur-md transform hover:scale-105 transition-all duration-500"
              >
                <span className="mr-2">👗</span>
                View Our Work
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative overflow-hidden transition-all duration-500 ${
              index === currentSlide
                ? "w-12 h-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
                : "w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full hover:scale-125"
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full animate-shimmer" />
            )}
          </button>
        ))}
      </div>

      {/* Animated Sewing Elements */}
      <div className="absolute bottom-20 left-10 animate-sewing opacity-30">
        <Scissors className="w-12 h-12 text-white transform rotate-45" />
      </div>

      <div className="absolute top-32 right-16 animate-float opacity-20">
        <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
        </div>
      </div>
    </section>
  )
}
