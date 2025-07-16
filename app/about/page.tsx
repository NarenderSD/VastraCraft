import Image from "next/image"
import { Award, Users, Clock, Heart, Star, CheckCircle } from "lucide-react"

export default function About() {
  const milestones = [
    { year: "2022", event: "Radha started her tailoring journey at age 18" },
    { year: "2023", event: "Opened her first premium boutique in Delhi" },
    { year: "2023", event: "Launched online VastraCraft services" },
    { year: "2024", event: "Featured in Young Entrepreneurs Magazine" },
    { year: "2024", event: "Serving 1000+ happy clients in just 2 years" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion for Perfection",
      description: "Every stitch is made with love and attention to detail",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction and comfort are our top priorities",
    },
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description: "Traditional techniques combined with modern precision",
    },
    {
      icon: Clock,
      title: "Timely Service",
      description: "Respecting your time with prompt and reliable service",
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Meet Radha: Young Tailoring Prodigy
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Hi, I'm Radha, a 20-year-old passionate tailor and entrepreneur. My dream is to empower young women to express their unique style through premium, custom-fitted garments. Every piece I create is a blend of modern fashion and traditional craftsmanship, designed for today's confident woman.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">2+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">1000+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/c13.png"
                alt="Radha - Young Tailor"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl object-contain bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/c13.png"
                alt="Radha - Founder"
                width={400}
                height={500}
                className="rounded-2xl shadow-xl object-contain bg-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <Star className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">Radha</div>
                  <div className="text-rose-100">Young Tailor & Founder</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">My Story</h2>
              <h3 className="text-2xl font-semibold text-rose-600 mb-4">Radha - Founder & Designer</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I started my journey at 18, inspired by my mother's artistry and a love for fashion. In just two years, I've built a boutique that's become a hub for young women seeking premium, custom tailoring. My mission is to make every client feel confident and beautiful in their own skin.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From a small studio to a thriving business, I believe in the power of creativity, hard work, and a personal touch. Thank you for being part of my story!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Young Entrepreneur</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Modern & Traditional Styles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Empowering Young Women</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Premium, Personalized Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming India's premier women's tailoring center, here's how we've grown over
              the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-400 to-pink-600 rounded-full" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-rose-600 mb-2">{milestone.year}</div>
                      <div className="text-gray-700">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-white border-4 border-rose-500 rounded-full" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape the experience we create for our valued customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our skilled artisans and designers work together to bring your vision to life with precision and
              creativity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sushma Devi", role: "Founder & Master Tailor", experience: "30+ Years", image: "/c7.png" },
              { name: "Priya Sharma", role: "Senior Designer", experience: "15+ Years", image: "/c2.png" },
              { name: "Anita Gupta", role: "Bridal Specialist", experience: "12+ Years", image: "/c4.png" },
              { name: "Meera Patel", role: "Pattern Maker", experience: "10+ Years", image: "/c3.png" },
              { name: "Sunita Devi", role: "Quality Controller", experience: "8+ Years", image: "/c9.png" },
              { name: "Kavya Singh", role: "Customer Relations", experience: "5+ Years", image: "/c12 kid.png" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-rose-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
