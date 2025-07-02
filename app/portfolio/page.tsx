"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Heart, Share2, Filter } from "lucide-react"

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // grid or masonry

  const categories = [
    { id: "all", name: "All Work", count: 48 },
    { id: "bridal", name: "Bridal Wear", count: 12 },
    { id: "blouse", name: "Blouses", count: 15 },
    { id: "lehenga", name: "Lehengas", count: 8 },
    { id: "suits", name: "Suits", count: 10 },
    { id: "kids", name: "Kids Wear", count: 3 },
  ]

  const portfolioItems = [
    {
      id: 1,
      category: "bridal",
      title: "Royal Red Bridal Lehenga",
      description: "Exquisite red bridal lehenga with intricate gold embroidery and mirror work",
      image: "/c1.png",
      client: "Priya Sharma",
      date: "2024-01-15",
      likes: 45,
      featured: true,
    },
    {
      id: 2,
      category: "blouse",
      title: "Designer Silk Blouse",
      description: "Elegant silk blouse with traditional motifs and modern cut",
      image: "/c2.png",
      client: "Anita Gupta",
      date: "2024-01-10",
      likes: 32,
      featured: false,
    },
    {
      id: 3,
      category: "lehenga",
      title: "Pink Party Lehenga",
      description: "Stunning pink lehenga perfect for special occasions",
      image: "/c3.png",
      client: "Meera Patel",
      date: "2024-01-08",
      likes: 28,
      featured: true,
    },
    {
      id: 4,
      category: "suits",
      title: "Traditional Anarkali Suit",
      description: "Classic Anarkali suit with contemporary styling",
      image: "/c4.png",
      client: "Sunita Devi",
      date: "2024-01-05",
      likes: 22,
      featured: false,
    },
    {
      id: 5,
      category: "bridal",
      title: "Golden Bridal Ensemble",
      description: "Luxurious golden bridal outfit with heavy embellishments",
      image: "/c5.png",
      client: "Deepika Singh",
      date: "2024-01-03",
      likes: 56,
      featured: true,
    },
    {
      id: 6,
      category: "blouse",
      title: "Contemporary Crop Blouse",
      description: "Modern crop blouse with traditional elements",
      image: "/c6.png",
      client: "Kavya Reddy",
      date: "2024-01-01",
      likes: 19,
      featured: false,
    },
    {
      id: 7,
      category: "kids",
      title: "Princess Party Dress",
      description: "Adorable party dress for little princess",
      image: "/c7.png",
      client: "Baby Aisha",
      date: "2023-12-28",
      likes: 34,
      featured: false,
    },
    {
      id: 8,
      category: "lehenga",
      title: "Sangeet Special Lehenga",
      description: "Vibrant lehenga perfect for sangeet celebrations",
      image: "/c8.png",
      client: "Riya Kapoor",
      date: "2023-12-25",
      likes: 41,
      featured: true,
    },
    // Add more items as needed, use c9.png, c10.png, c11.png for new entries
  ]

  const filteredItems =
    activeFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/logo3.png" alt="Portfolio Logo" className="mx-auto mb-6 w-32 h-32 object-contain rounded-full shadow-lg" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the artistry and craftsmanship that goes into every piece we create. Each garment tells a story of
            precision, passion, and perfection.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg"
                      : "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
                </Button>
              ))}
            </div>

            {/* View Options */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Showing {filteredItems.length} of {portfolioItems.length} items
              </span>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-rose-500">
                  <option>Latest First</option>
                  <option>Most Liked</option>
                  <option>Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {item.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}

                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                      <Share2 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="font-playfair text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200 mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Client: {item.client}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-rose-600 uppercase tracking-wide">
                      {categories.find((cat) => cat.id === item.category)?.name}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString("en-IN")}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By: {item.client}</span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 border-2 border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
            >
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">50+</div>
              <div className="text-gray-600">Design Varieties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">30+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-white mb-6">Ready to Create Your Masterpiece?</h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Join our satisfied customers and let us create something beautiful for you. Book your consultation today and
            bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100 px-8">
              Book Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-rose-600 px-8"
            >
              View More Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
