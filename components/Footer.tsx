import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Twitter, Heart, Star } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full animate-float" />
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full animate-float delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full animate-float delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6 animate-slideInUp">
            <div className="group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <img src="/logo2.png" alt="Premium Tailoring Logo 2" className="w-12 h-12 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300 object-cover" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                    Premium Tailoring
                  </h3>
                  <p className="text-gray-400 text-sm">Premium Women's Tailoring</p>
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              With over 30 years of experience, we are India's premier women's tailoring center, specializing in
              traditional and contemporary designs with perfect fits that celebrate your unique style.
            </p>

            {/* Awards & Recognition */}
            <div className="flex items-center space-x-4 py-4 border-t border-gray-700">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-300">4.9 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span className="text-sm text-gray-300">5000+ Happy Clients</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="group bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Facebook className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="group bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Instagram className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="group bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Youtube className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="group bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Twitter className="w-5 h-5 group-hover:animate-bounce" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slideInUp delay-200">
            <h4 className="font-playfair text-xl font-semibold mb-6 text-white relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-rose-400 to-pink-500" />
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Size Guide", href: "/size-guide" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-slideInUp delay-400">
            <h4 className="font-playfair text-xl font-semibold mb-6 text-white relative">
              Our Services
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-blue-500" />
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Blouse Stitching", href: "/services#blouse" },
                { name: "Suit & Salwar", href: "/services#suits" },
                { name: "Bridal Wear", href: "/services#bridal" },
                { name: "Lehenga Choli", href: "/services#lehenga" },
                { name: "Kids Clothing", href: "/services#kids" },
                { name: "Alterations", href: "/services#alterations" },
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slideInUp delay-600">
            <h4 className="font-playfair text-xl font-semibold mb-6 text-white relative">
              Contact Info
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500" />
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">123 Fashion Street, Designer Colony</p>
                  <p className="text-gray-300">New Delhi - 110001</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">+91 98765 43210</p>
                  <p className="text-gray-300">+91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-300">info@silaicenter.com</p>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-300">Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6 p-4 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-2xl border border-rose-500/20">
              <h5 className="font-semibold text-white mb-2">Stay Updated</h5>
              <p className="text-gray-300 text-sm mb-3">Get fashion tips & offers</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                />
                <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:scale-105">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 animate-slideInUp delay-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">Build by Narender Singh© 2025 Silai Center. All rights reserved. | Crafted with</p>
              <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
              <p className="text-gray-400 text-sm">for Premium Tailoring</p>
            </div>

            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center items-center space-x-8 mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>30+ Years Trusted</span>
            </div>
          </div>

          {/* Build Credit */}
          <div className="flex justify-center items-center mt-8">
            <a
              href="https://www.linkedin.com/in/narendersingh1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors duration-300"
            >
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="inline-block mr-1"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z"/></svg>
              <span>Build by Narender Singh</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
