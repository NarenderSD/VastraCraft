"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Shirt, Crown, Baby, Wrench } from "lucide-react"

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: Shirt,
      title: "Blouse Stitching",
      description: "Perfect fitting blouses with intricate designs and premium finishing",
      features: ["Custom measurements", "Designer patterns", "Premium fabrics", "Quick delivery"],
      image: "/Blouse Stitching.png",
      price: "Starting ₹800",
    },
    {
      icon: Scissors,
      title: "Suit & Salwar",
      description: "Traditional and contemporary suits tailored to perfection",
      features: ["Traditional designs", "Modern cuts", "Comfortable fit", "Quality assurance"],
      image: "/c4.png",
      price: "Starting ₹1200",
    },
    {
      icon: Crown,
      title: "Bridal Wear",
      description: "Exquisite bridal outfits for your special day",
      features: ["Luxury fabrics", "Intricate embroidery", "Perfect fit guarantee", "Bridal consultation"],
      image: "/c1.png",
      price: "Starting ₹5000",
    },
    {
      icon: Crown,
      title: "Lehenga Choli",
      description: "Stunning lehengas for weddings and special occasions",
      features: ["Designer patterns", "Custom embellishments", "Perfect draping", "Size adjustments"],
      image: "/c3.png",
      price: "Starting ₹3000",
    },
    {
      icon: Baby,
      title: "Kids Clothing",
      description: "Comfortable and stylish clothing for children",
      features: ["Soft fabrics", "Comfortable designs", "Growth adjustments", "Fun patterns"],
      image: "/c12 kid.png",
      price: "Starting ₹500",
    },
    {
      icon: Wrench,
      title: "Alterations",
      description: "Professional alterations and repairs for all garments",
      features: ["Size adjustments", "Style modifications", "Repair services", "Quick turnaround"],
      image: "/c13.png",
      price: "Starting ₹200",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From traditional Indian wear to modern designs, we offer comprehensive tailoring services with unmatched
            quality and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  activeService === index ? "ring-2 ring-rose-400 shadow-xl" : ""
                }`}
                onClick={() => setActiveService(index)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600 text-lg">{service.price}</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Service Detail */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-auto">
              <Image
                src={services[activeService].image || "/placeholder.svg"}
                alt={services[activeService].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                {(() => {
                  const IconComponent = services[activeService].icon
                  return <IconComponent className="w-8 h-8 text-rose-500 mr-4" />
                })()}
                <h3 className="font-playfair text-3xl font-bold text-gray-900">{services[activeService].title}</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">{services[activeService].description}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {services[activeService].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-playfair text-2xl font-bold text-rose-600">{services[activeService].price}</span>
                <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 px-8">
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
