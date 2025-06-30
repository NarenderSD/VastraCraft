"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift, Bell, Sparkles } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your newsletter service (Mailchimp, etc.)
    console.log("Newsletter subscription:", email)
    setIsSubscribed(true)
    setEmail("")

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Stay Updated with Fashion Trends
          </h2>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive offers, fashion tips, and be the first to know about our
            latest collections.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Exclusive Offers</h3>
            <p className="text-rose-100 text-sm">Get special discounts and early access to sales</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Fashion Tips</h3>
            <p className="text-rose-100 text-sm">Expert styling advice and trend updates</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">New Collections</h3>
            <p className="text-rose-100 text-sm">Be first to see our latest designs</p>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="max-w-md mx-auto">
          {isSubscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                <p className="text-rose-100">You've successfully subscribed to our newsletter.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/90 border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white"
                />
                <Button
                  type="submit"
                  className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-rose-100 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
