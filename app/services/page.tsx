import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Shirt, Crown, Baby, Wrench, Star, Clock, Shield } from "lucide-react"
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: Shirt,
      title: "Blouse Stitching",
      description: "Perfect fitting blouses with intricate designs and premium finishing for all occasions.",
      features: [
        "Custom measurements",
        "Designer patterns",
        "Premium fabrics",
        "Quick delivery",
        "Perfect fit guarantee",
      ],
      image: "/Blouse Stitching.png",
      price: "Starting ₹800",
      duration: "3-5 days",
      popular: true,
    },
    {
      icon: Scissors,
      title: "Suit & Salwar Stitching",
      description: "Traditional and contemporary suits tailored to perfection with comfortable fits.",
      features: ["Traditional designs", "Modern cuts", "Comfortable fit", "Quality assurance", "Style consultation"],
      image: "/c9.png",
      price: "Starting ₹1200",
      duration: "5-7 days",
      popular: false,
    },
    {
      icon: Crown,
      title: "Bridal Wear",
      description: "Exquisite bridal outfits for your special day with luxury fabrics and intricate work.",
      features: [
        "Luxury fabrics",
        "Intricate embroidery",
        "Perfect fit guarantee",
        "Bridal consultation",
        "Multiple fittings",
      ],
      image: "/c1.png",
      price: "Starting ₹5000",
      duration: "15-20 days",
      popular: true,
    },
    {
      icon: Crown,
      title: "Lehenga Choli",
      description: "Stunning lehengas for weddings and special occasions with designer patterns.",
      features: ["Designer patterns", "Custom embellishments", "Perfect draping", "Size adjustments", "Style guidance"],
      image: "/c3.png",
      price: "Starting ₹3000",
      duration: "10-12 days",
      popular: false,
    },
    {
      icon: Baby,
      title: "Kids Clothing",
      description: "Comfortable and stylish clothing for children with soft fabrics and fun designs.",
      features: ["Soft fabrics", "Comfortable designs", "Growth adjustments", "Fun patterns", "Quick turnaround"],
      image: "/c12 kid.png",
      price: "Starting ₹500",
      duration: "2-3 days",
      popular: false,
    },
    {
      icon: Wrench,
      title: "Alterations & Repairs",
      description: "Professional alterations and repairs for all types of garments with quick service.",
      features: ["Size adjustments", "Style modifications", "Repair services", "Quick turnaround", "Quality guarantee"],
      image: "/c13.png",
      price: "Starting ₹200",
      duration: "1-2 days",
      popular: false,
    },
  ]

  const additionalServices = [
    "Custom Design Consultation",
    "Fabric Selection Guidance",
    "Home Pickup & Delivery",
    "Express Service Available",
    "Bulk Order Discounts",
    "Wedding Package Deals",
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Premium Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From traditional Indian wear to modern designs, we offer comprehensive tailoring services with unmatched
            quality and attention to detail. Each garment is crafted with precision and passion to ensure the perfect
            fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
            >
              Book Consultation
            </Button>
            <Button size="lg" variant="outline">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative">
                    {service.popular && (
                      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                    <div className="aspect-[3/2] relative overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-xl mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-playfair text-2xl font-bold text-gray-900">{service.title}</h3>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-rose-400 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center text-rose-600 mb-1">
                            <Star className="w-4 h-4 mr-1" />
                            <span className="font-bold text-lg">{service.price}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{service.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href="/booking" passHref legacyBehavior>
                        <Button as="a" className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                          Book Now
                        </Button>
                      </Link>
                      <Link href="/booking" passHref legacyBehavior>
                        <Button variant="outline" className="flex-1">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond basic tailoring to provide comprehensive fashion solutions that make your experience seamless
              and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mr-4" />
                  <span className="font-semibold text-gray-900">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Our Service Guarantees</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We stand behind our work with comprehensive guarantees that ensure your complete satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">Perfect Fit Guarantee</h3>
              <p className="text-gray-600">
                Not satisfied with the fit? We offer free alterations until you're completely happy.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">Timely Delivery</h3>
              <p className="text-gray-600">
                We respect your time and ensure all orders are completed within the promised timeframe.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                Every garment undergoes strict quality checks to ensure premium finishing and durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-white mb-6">Ready to Experience Premium Tailoring?</h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Book your consultation today and let our expert tailors create the perfect outfit for you. Experience the
            difference of professional craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100 px-8">
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-rose-600 px-8"
            >
              Call: +91 98765 43210
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
