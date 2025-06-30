import { Calendar, Ruler, Scissors, Truck } from "lucide-react"

export default function Process() {
  const steps = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule a consultation at your convenience. Choose from home visit or studio appointment.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Ruler,
      title: "Perfect Measurements",
      description: "Our expert tailors take precise measurements ensuring the perfect fit for your body type.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Scissors,
      title: "Expert Stitching",
      description: "Master craftsmen work on your garment with attention to every detail and finishing.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Truck,
      title: "Timely Delivery",
      description: "Your perfectly tailored garment is delivered on time with quality assurance.",
      color: "from-rose-400 to-rose-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Simple Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From consultation to delivery, we've streamlined our process to make your tailoring experience smooth and
            hassle-free.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 to-rose-200 transform -translate-y-1/2" />

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative text-center group">
                  {/* Step Number */}
                  <div className="lg:absolute lg:-top-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-6 lg:mb-0">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-full text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">{step.title}</h3>

                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="font-playfair text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Experience the difference of professional tailoring. Book your appointment today and let us create the
              perfect outfit for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Book Appointment Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition-all duration-300">
                Call Us: +91 98765 43210
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
