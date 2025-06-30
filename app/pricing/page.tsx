import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Star, Clock, Shield } from "lucide-react"

export default function Pricing() {
  const pricingPlans = [
    {
      category: "Blouse Stitching",
      plans: [
        {
          name: "Basic",
          price: 800,
          duration: "5-7 days",
          features: [
            "Simple design",
            "Standard fitting",
            "Basic finishing",
            "One alteration included",
            "Quality guarantee",
          ],
          popular: false,
        },
        {
          name: "Premium",
          price: 1200,
          duration: "3-5 days",
          features: [
            "Designer patterns",
            "Perfect fitting",
            "Premium finishing",
            "Two alterations included",
            "Express service",
            "Style consultation",
          ],
          popular: true,
        },
        {
          name: "Luxury",
          price: 1800,
          duration: "2-3 days",
          features: [
            "Custom design",
            "Hand-finished details",
            "Premium fabrics",
            "Unlimited alterations",
            "Same-day service",
            "Personal designer",
            "Home pickup/delivery",
          ],
          popular: false,
        },
      ],
    },
    {
      category: "Suit & Salwar",
      plans: [
        {
          name: "Basic",
          price: 1200,
          duration: "7-10 days",
          features: [
            "Traditional cuts",
            "Standard fitting",
            "Basic finishing",
            "One alteration included",
            "Quality guarantee",
          ],
          popular: false,
        },
        {
          name: "Premium",
          price: 1800,
          duration: "5-7 days",
          features: [
            "Modern & traditional styles",
            "Perfect fitting",
            "Premium finishing",
            "Two alterations included",
            "Style consultation",
            "Express service",
          ],
          popular: true,
        },
        {
          name: "Luxury",
          price: 2500,
          duration: "3-5 days",
          features: [
            "Custom design",
            "Designer patterns",
            "Hand-finished details",
            "Unlimited alterations",
            "Personal consultation",
            "Home service",
            "Priority booking",
          ],
          popular: false,
        },
      ],
    },
    {
      category: "Bridal Wear",
      plans: [
        {
          name: "Essential",
          price: 5000,
          duration: "20-25 days",
          features: [
            "Traditional designs",
            "Quality fabrics",
            "Standard embellishments",
            "Three fittings",
            "Basic alterations",
            "Quality guarantee",
          ],
          popular: false,
        },
        {
          name: "Premium",
          price: 8000,
          duration: "15-20 days",
          features: [
            "Designer collections",
            "Premium fabrics",
            "Intricate embroidery",
            "Five fittings",
            "Unlimited alterations",
            "Bridal consultation",
            "Styling advice",
          ],
          popular: true,
        },
        {
          name: "Royal",
          price: 15000,
          duration: "10-15 days",
          features: [
            "Exclusive designs",
            "Luxury fabrics",
            "Hand embroidery",
            "Unlimited fittings",
            "Complete bridal package",
            "Personal designer",
            "Home service",
            "Photography session",
          ],
          popular: false,
        },
      ],
    },
  ]

  const additionalServices = [
    { service: "Express Service (24-48 hours)", price: "+50% of base price" },
    { service: "Home Pickup & Delivery", price: "₹200 per visit" },
    { service: "Design Consultation", price: "₹500 (adjustable)" },
    { service: "Fabric Selection Guidance", price: "Free with booking" },
    { service: "Additional Alterations", price: "₹200-500 each" },
    { service: "Rush Orders (Same Day)", price: "+100% of base price" },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your tailoring needs. All prices are transparent with no hidden charges. Quality
            craftsmanship at every price point.
          </p>
        </div>
      </section>

      {/* Pricing Categories */}
      {pricingPlans.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">{category.category}</h2>
              <p className="text-lg text-gray-600">Choose from our carefully crafted pricing tiers</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {category.plans.map((plan, planIndex) => (
                <Card
                  key={planIndex}
                  className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    plan.popular ? "ring-2 ring-rose-400 shadow-xl" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-rose-600">₹{plan.price}</span>
                        <span className="text-gray-600 ml-2">onwards</span>
                      </div>
                      <div className="flex items-center justify-center text-gray-600 mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{plan.duration}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-3 ${
                        plan.popular
                          ? "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600">Extra services to enhance your tailoring experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.service}</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-rose-600">{service.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Our Guarantees</h2>
            <p className="text-lg text-gray-600">We stand behind our work with comprehensive guarantees</p>
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

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Pricing FAQs</h2>
            <p className="text-lg text-gray-600">Common questions about our pricing and services</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Are there any hidden charges?",
                answer:
                  "No, all our prices are transparent. The only additional charges are for express services, home visits, or extra alterations beyond what's included in your plan.",
              },
              {
                question: "Can I upgrade my plan after booking?",
                answer:
                  "Yes, you can upgrade your plan anytime before we start working on your garment. You'll only pay the difference.",
              },
              {
                question: "What's included in the consultation fee?",
                answer:
                  "The consultation fee covers design discussion, measurement taking, fabric guidance, and style advice. This fee is adjustable against your final bill.",
              },
              {
                question: "Do you offer discounts for bulk orders?",
                answer:
                  "Yes, we offer attractive discounts for bulk orders, wedding packages, and repeat customers. Contact us for custom pricing.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept cash, UPI, credit/debit cards, and bank transfers. A 50% advance is required to start work.",
              },
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Choose your perfect plan and book your appointment today. Experience the difference of professional
            tailoring.
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
              Get Custom Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
