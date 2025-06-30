"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)

  const categories = [
    { id: "all", name: "All Work" },
    { id: "blouse", name: "Blouses" },
    { id: "bridal", name: "Bridal Wear" },
    { id: "lehenga", name: "Lehengas" },
    { id: "suits", name: "Suits" },
    { id: "kids", name: "Kids Wear" },
  ]

  const portfolioItems = [
    {
      id: 1,
      category: "bridal",
      title: "Royal Bridal Lehenga",
      description: "Exquisite red bridal lehenga with gold embroidery",
      image: "/placeholder.svg?height=500&width=400",
      beforeImage: "/placeholder.svg?height=500&width=400",
      client: "Priya Sharma",
    },
    {
      id: 2,
      category: "blouse",
      title: "Designer Silk Blouse",
      description: "Elegant silk blouse with intricate mirror work",
      image: "/placeholder.svg?height=500&width=400",
      beforeImage: "/placeholder.svg?height=500&width=400",
      client: "Anita Gupta",
    },
    {
      id: 3,
      category: "lehenga",
      title: "Party Wear Lehenga",
      description: "Stunning pink lehenga for special occasions",
      image: "/placeholder.svg?height=500&width=400",
      beforeImage: "/placeholder.svg?height=500&width=400",
      client: "Meera Patel",
    },
    {
      id: 4,
      category: "suits",
      title: "Traditional Salwar Suit",
      description: "Classic salwar suit with modern touch",
      image: "/placeholder.svg?height=500&width=400",
      beforeImage: "/placeholder.svg?height=500&width=400",
      client: "Sunita Devi",
    },
    {
      id: 5,
      category: "kids",
      title: "Kids Party Dress",
      description: "Adorable party dress for little princess",
      image: "/placeholder.svg?height=500&width=400",
      beforeImage: "/placeholder.svg?height=500&width=400",
      client: "Baby Kavya",
    },
    {
      id: 6,
      category: "bridal",
      title: "Wedding Saree Blouse",
      description: "Heavily embroidered blouse for wedding saree",
      image: "/placeholder.svg?height=500&width=400",
      beforeImage: "/placeholder.svg?height=500&width=400",
      client: "Deepika Singh",
    },
  ]

  const filteredItems =
    activeCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Best Work Showcase</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the artistry and craftsmanship that goes into every piece we create. Each garment tells a story of
            precision, passion, and perfection.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentSlide(0)
              }}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg"
                  : "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Featured Carousel */}
        <div className="relative mb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={filteredItems[currentSlide]?.image || "/placeholder.svg?height=500&width=400"}
                    alt={filteredItems[currentSlide]?.title || "Portfolio item"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-90">Client: {filteredItems[currentSlide]?.client}</p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                  {filteredItems[currentSlide]?.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8">{filteredItems[currentSlide]?.description}</p>

                {/* Before/After Toggle could go here */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Project Details:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <p className="font-medium capitalize">{filteredItems[currentSlide]?.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Client:</span>
                      <p className="font-medium">{filteredItems[currentSlide]?.client}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Full Gallery</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {filteredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-rose-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.slice(0, 6).map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h4 className="font-playfair text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-200">{item.client}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 border-2 border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
          >
            View Complete Portfolio
          </Button>
        </div>
      </div>
    </section>
  )
}
