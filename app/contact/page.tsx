"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })
      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", phone: "", service: "", message: "" })
      } else {
        throw new Error("Failed to submit contact form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our services? Want to book an appointment? We'd love to hear from you. Reach out to us
            through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
                <p className="text-gray-600">
                  123 Fashion Street
                  <br />
                  Designer Colony
                  <br />
                  New Delhi - 110001
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">Call Us</h3>
                <p className="text-gray-600">
                  +91 98765 43210
                  <br />
                  +91 98765 43211
                  <br />
                  Mon-Sat: 10AM-8PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                <p className="text-gray-600">
                  info@silaicenter.com
                  <br />
                  bookings@silaicenter.com
                  <br />
                  Quick Response
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">WhatsApp</h3>
                <p className="text-gray-600">
                  +91 98765 43210
                  <br />
                  Instant Support
                  <br />
                  24/7 Available
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    >
                      <option value="">Select a service</option>
                      <option value="blouse">Blouse Stitching</option>
                      <option value="suits">Suit & Salwar</option>
                      <option value="bridal">Bridal Wear</option>
                      <option value="lehenga">Lehenga Choli</option>
                      <option value="kids">Kids Clothing</option>
                      <option value="alterations">Alterations</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full"
                      placeholder="Tell us about your requirements, preferred dates, or any questions you have..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 py-3 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map and Business Hours */}
            <div className="space-y-8">
              {/* Google Map */}
              <div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Find Us Here</h3>
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                  {/* Replace this with actual Google Maps embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674314594267!2d77.20902731508236!3d28.65195908240063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683d1c7a3%3A0x8c5b5b5b5b5b5b5b!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Clock className="w-6 h-6 text-rose-500 mr-3" />
                    <h3 className="font-playfair text-xl font-bold text-gray-900">Business Hours</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium text-gray-900">10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium text-gray-900">10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-gray-900">11:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-rose-50 rounded-lg">
                    <p className="text-sm text-rose-700">
                      <strong>Note:</strong> We're also available for emergency alterations. Call us for urgent
                      requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions about our services</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does it take to stitch a blouse?",
                answer:
                  "Typically 3-5 days for regular blouses. Rush orders can be completed in 24-48 hours with additional charges.",
              },
              {
                question: "Do you provide home pickup and delivery?",
                answer: "Yes, we offer home pickup and delivery services within Delhi NCR for orders above ₹1000.",
              },
              {
                question: "What if the fit is not perfect?",
                answer:
                  "We offer free alterations until you're completely satisfied with the fit. Your satisfaction is our guarantee.",
              },
              {
                question: "Do you work with customer's own fabric?",
                answer: "You can bring your own fabric, and we'll create beautiful outfits with it.",
              },
              {
                question: "How far in advance should I book for bridal wear?",
                answer:
                  "We recommend booking at least 1-2 months in advance for bridal wear to ensure proper fittings and finishing.",
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
    </div>
  )
}
