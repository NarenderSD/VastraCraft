"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 85959626xx</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>123 Fashion Street, Delhi</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 10AM-8PM</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-rose-600 text-xs px-4 py-1 h-8"
            >
              <Phone className="w-3 h-3 mr-1" />
              Call Now
            </Button>
            <Link href="/booking" passHref legacyBehavior>
              <Button as="a" size="sm" className="bg-white text-rose-600 hover:bg-rose-50 text-xs px-4 py-1 h-8 font-semibold">
                <Calendar className="w-3 h-3 mr-1" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "top-0 bg-white/95 backdrop-blur-md shadow-xl" : "top-10 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img src="/logo2.png" alt="Premium Tailoring Logo" className="w-12 h-12 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300 object-cover" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-playfair text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Premium Tailoring
                </h1>
                <p className="text-xs text-gray-600 font-medium">Premium Tailoring Excellence</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-rose-600 transition-colors duration-300 font-medium py-2 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl">
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-300 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
