"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

export default function CustomerStories() {
  const [currentStory, setCurrentStory] = useState(0)

  const customerStories = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 28,
      occasion: "Wedding",
      story:
        "My dream bridal lehenga came to life exactly as I imagined. The intricate gold embroidery and perfect fit made me feel like a princess on my special day. The attention to detail was incredible!",
      beforeImage: "/placeholder.svg?height=400&width=300",
      afterImage: "/placeholder.svg?height=400&width=300",
      rating: 5,
      service: "Bridal Lehenga",
      location: "Delhi",
      testimonial: "Best tailoring experience ever! Highly recommended for all brides.",
      transformation: "From a simple sketch to a royal masterpiece",
    },
    {
      id: 2,
      name: "Anita Gupta",
      age: 35,
      occasion: "Office Party",
      story:
        "I needed a professional yet stylish blouse for an important office event. The team understood my requirements perfectly and created a stunning piece that boosted my confidence.",
      beforeImage: "/placeholder.svg?height=400&width=300",
      afterImage: "/placeholder.svg?height=400&width=300",
      rating: 5,
      service: "Designer Blouse",
      location: "Mumbai",
      testimonial: "Perfect blend of professional and stylish. Loved the modern touch!",
      transformation: "From corporate boring to stylishly professional",
    },
    {
      id: 3,
      name: "Meera Patel",
      age: 24,
      occasion: "Sister's Wedding",
      story:
        "As the bride's sister, I wanted something special but not too flashy. The beautiful pink lehenga with subtle work was perfect. I received so many compliments!",
      beforeImage: "/placeholder.svg?height=400&width=300",
      afterImage: "/placeholder.svg?height=400&width=300",
      rating: 5,
      service: "Party Lehenga",
      location: "Ahmedabad",
      testimonial: "Elegant, beautiful, and perfectly fitted. Couldn't ask for more!",
      transformation: "From simple to elegantly stunning",
    },
    {
      id: 4,
      name: "Sunita Devi",
      age: 45,
      occasion: "Festival Celebration",
      story:
        "After years of wearing ready-made clothes, I decided to get a custom suit made. The comfort and fit were amazing. It felt like the clothes were made just for me!",
      beforeImage: "/placeholder.svg?height=400&width=300",
      afterImage: "/placeholder.svg?height=400&width=300",
      rating: 5,
      service: "Traditional Suit",
      location: "Jaipur",
      testimonial: "Custom tailoring makes all the difference. So comfortable and beautiful!",
      transformation: "From ill-fitting to perfectly comfortable",
    },
  ]

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % customerStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + customerStories.length) % customerStories.length)
  }

  const currentCustomer = customerStories[currentStory]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-200 mb-6">
            <Heart className="w-5 h-5 text-purple-500 animate-pulse" />
            <span className="text-purple-600 font-semibold">Customer Success Stories</span>
            <Heart className="w-5 h-5 text-purple-500 animate-pulse" />
          </div>

          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Real Stories, Real Transformations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped women feel confident and beautiful through our craftsmanship
          </p>
        </div>

        {/* Main Story Display */}
        <div className="relative">
          <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-white/80 backdrop-blur-sm border border-white/50">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Before/After Images */}
              <div className="relative">
                <div className="aspect-[4/5] relative overflow-hidden">
                  {/* Before Image */}
                  <div className="absolute inset-0 grid grid-cols-2 gap-1">
                    <div className="relative overflow-hidden">
                      <div className="absolute top-2 left-2 z-10 bg-gray-800/80 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Before
                      </div>
                      <Image
                        src={currentCustomer.beforeImage || "/placeholder.svg"}
                        alt="Before"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="relative overflow-hidden">
                      <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        After
                      </div>
                      <Image
                        src={currentCustomer.afterImage || "/placeholder.svg"}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                      {/* Sparkle Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-400/20 animate-shimmer" />
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevStory}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextStory}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Story Content */}
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Customer Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {currentCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-gray-900">{currentCustomer.name}</h3>
                    <p className="text-gray-600">
                      {currentCustomer.age} years • {currentCustomer.location}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(currentCustomer.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Service & Occasion */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
                    <span className="text-purple-700 font-semibold text-sm">{currentCustomer.service}</span>
                  </div>
                  <div className="bg-gradient-to-r from-rose-100 to-orange-100 px-4 py-2 rounded-full">
                    <span className="text-rose-700 font-semibold text-sm">{currentCustomer.occasion}</span>
                  </div>
                </div>

                {/* Story */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-purple-400 mb-4" />
                  <p className="text-gray-700 text-lg leading-relaxed mb-4 italic">"{currentCustomer.story}"</p>
                  <p className="text-purple-600 font-semibold">{currentCustomer.transformation}</p>
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl mb-6">
                  <p className="text-gray-800 font-medium">"{currentCustomer.testimonial}"</p>
                </div>

                {/* Action Button */}
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300">
                  Share Your Story Too
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* Story Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {customerStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`transition-all duration-300 ${
                  index === currentStory
                    ? "w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-125"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stories Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerStories.map((story, index) => (
            <Card
              key={story.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                index === currentStory ? "ring-2 ring-purple-400 shadow-lg" : ""
              }`}
              onClick={() => setCurrentStory(index)}
            >
              <CardContent className="p-4">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
                  <Image src={story.afterImage || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{story.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{story.service}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
