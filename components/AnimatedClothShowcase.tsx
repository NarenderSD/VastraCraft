"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sparkles, Star } from "lucide-react"

export default function AnimatedClothShowcase() {
  const [activeStyle, setActiveStyle] = useState(0)

  const clothStyles = [
    {
      id: 1,
      name: "Traditional Silk Saree Blouse",
      image: "/c1.png",
      era: "Traditional",
      color: "from-yellow-400 to-orange-500",
      pattern: "Intricate Gold Embroidery",
    },
    {
      id: 2,
      name: "Modern Crop Top Blouse",
      image: "/c3.png",
      era: "Modern",
      color: "from-pink-400 to-purple-500",
      pattern: "Contemporary Cut",
    },
    {
      id: 3,
      name: "Royal Bridal Lehenga",
      image: "/c5.png",
      era: "Bridal",
      color: "from-red-500 to-rose-600",
      pattern: "Heavy Zardozi Work",
    },
    {
      id: 4,
      name: "Designer Anarkali Suit",
      image: "/c9.png",
      era: "Fusion",
      color: "from-blue-400 to-cyan-500",
      pattern: "Mirror & Thread Work",
    },
    {
      id: 5,
      name: "Western Gown",
      image: "/c13.png",
      era: "Modern/Western",
      color: "from-purple-400 to-pink-500",
      pattern: "Minimalist Silhouette",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStyle((prev) => (prev + 1) % clothStyles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [clothStyles.length])

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-rose-200 mb-6">
            <Sparkles className="w-5 h-5 text-rose-500 animate-spin" />
            <span className="text-rose-600 font-semibold">Cloth Styles & Designs</span>
            <Sparkles className="w-5 h-5 text-rose-500 animate-spin" />
          </div>

          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Traditional to Modern</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the evolution of fashion through our animated showcase of timeless designs
          </p>
        </div>

        {/* Animated Cloth Display */}
        <div className="relative">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-rose-300/20 to-pink-300/20 rounded-full animate-float" />
            <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-full animate-float delay-1000" />
            <div className="absolute bottom-20 left-32 w-12 h-12 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full animate-float delay-2000" />
          </div>

          {/* Main Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Animated Cloth Display */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Sewing Machine Animation */}
                <div className="absolute -top-16 -left-8 animate-sewing opacity-30">
                  <div className="w-12 h-8 bg-gray-600 rounded-lg">
                    <div className="w-2 h-6 bg-gray-800 mx-auto animate-bounce" />
                  </div>
                </div>

                {/* Main Cloth Display */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                  {clothStyles.map((style, index) => (
                    <div
                      key={style.id}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === activeStyle ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-3"
                      }`}
                    >
                      <Image src={style.image || "/placeholder.svg"} alt={style.name} fill className="object-cover" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${style.color} opacity-20`} />

                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`px-3 py-1 bg-gradient-to-r ${style.color} text-white rounded-full text-xs font-semibold animate-pulse`}
                        >
                          {style.era}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl border-4 border-gradient-to-r from-rose-400 via-pink-400 to-purple-400 animate-borderGlow" />
                </div>

                {/* Floating Design Elements */}
                <div className="absolute -bottom-8 -right-8 animate-float">
                  <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <Star className="w-8 h-8 text-yellow-500 animate-spin" />
                  </div>
                </div>

                {/* Thread Animation */}
                <div className="absolute top-1/2 -left-12 animate-thread">
                  <div className="w-1 h-32 bg-gradient-to-b from-rose-400 to-transparent" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8 animate-slideInRight">
              <div>
                <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-4">{clothStyles[activeStyle].name}</h3>
                <p className="text-lg text-gray-600 mb-6">{clothStyles[activeStyle].pattern}</p>
              </div>

              {/* Style Indicators */}
              <div className="grid grid-cols-2 gap-4">
                {clothStyles.map((style, index) => (
                  <button
                    key={style.id}
                    onClick={() => setActiveStyle(index)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      index === activeStyle
                        ? `border-gradient-to-r ${style.color} bg-white shadow-lg scale-105`
                        : "border-gray-200 hover:border-rose-300 hover:shadow-md"
                    }`}
                  >
                    <div className="text-left">
                      <div
                        className={`text-sm font-semibold mb-1 ${
                          index === activeStyle ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {style.era}
                      </div>
                      <div className="text-xs text-gray-500">{style.pattern}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Animated Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 animate-slideInLeft">
                  <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-pulse" />
                  <span className="text-gray-700">Hand-crafted with precision</span>
                </div>
                <div className="flex items-center space-x-3 animate-slideInLeft delay-200">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse" />
                  <span className="text-gray-700">Premium fabric selection</span>
                </div>
                <div className="flex items-center space-x-3 animate-slideInLeft delay-400">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
                  <span className="text-gray-700">Perfect fit guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
