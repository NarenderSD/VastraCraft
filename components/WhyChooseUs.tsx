import { Shield, Clock, Award, Heart, Users, Sparkles } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Certified Tailors",
      description: "Our master tailors are certified professionals with decades of experience in premium stitching.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Sparkles,
      title: "Trendy Designs",
      description: "Stay ahead with the latest fashion trends and timeless traditional designs.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "We respect your time and ensure all orders are completed within the promised timeframe.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Shield,
      title: "100% Fit Guarantee",
      description: "Not satisfied with the fit? We offer free alterations until you're completely happy.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "Every garment is crafted with love and attention to your personal style preferences.",
      color: "from-rose-400 to-red-500",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to exceed expectations.",
      color: "from-indigo-400 to-purple-500",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With over 30 years of experience and thousands of satisfied customers, we've built our reputation on
            quality, reliability, and exceptional service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">30+</div>
              <div className="text-rose-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">5000+</div>
              <div className="text-rose-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <div className="text-rose-100">Design Varieties</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">4.9★</div>
              <div className="text-rose-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
