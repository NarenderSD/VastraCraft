"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Scissors } from "lucide-react"
import { jsPDF } from "jspdf";

export default function Booking() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    // Personal Information
    name: "",
    phone: "",
    email: "",
    address: "",

    // Service Selection
    service: "",
    subService: "",
    urgency: "regular",

    // Appointment Details
    appointmentType: "studio", // studio or home
    preferredDate: "",
    preferredTime: "",
    alternateDate: "",
    alternateTime: "",

    // Additional Information
    measurements: "",
    specialRequirements: "",
    fabricDetails: "",
    designPreferences: "",

    // Pricing
    estimatedPrice: 0,
  })

  const services = {
    blouse: {
      name: "Blouse Stitching",
      subServices: ["Simple Blouse", "Designer Blouse", "Bridal Blouse", "Party Wear Blouse"],
      basePrice: 800,
    },
    suits: {
      name: "Suit & Salwar",
      subServices: ["Simple Suit", "Designer Suit", "Anarkali", "Palazzo Set"],
      basePrice: 1200,
    },
    bridal: {
      name: "Bridal Wear",
      subServices: ["Bridal Lehenga", "Wedding Saree Blouse", "Reception Outfit", "Complete Bridal Set"],
      basePrice: 5000,
    },
    lehenga: {
      name: "Lehenga Choli",
      subServices: ["Party Lehenga", "Wedding Lehenga", "Sangeet Lehenga", "Kids Lehenga"],
      basePrice: 3000,
    },
    kids: {
      name: "Kids Clothing",
      subServices: ["Party Dress", "Traditional Wear", "School Uniform", "Casual Wear"],
      basePrice: 500,
    },
    alterations: {
      name: "Alterations",
      subServices: ["Size Adjustment", "Length Alteration", "Style Modification", "Repair Work"],
      basePrice: 200,
    },
  }

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ]

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Calculate estimated price
    if (field === "service" || field === "subService" || field === "urgency") {
      calculatePrice({ ...bookingData, [field]: value })
    }
  }

  const calculatePrice = (data: typeof bookingData) => {
    if (!data.service) return

    let basePrice = services[data.service as keyof typeof services]?.basePrice || 0

    // Add urgency multiplier
    if (data.urgency === "urgent") basePrice *= 1.5
    if (data.urgency === "express") basePrice *= 2

    // Add home visit charge
    if (data.appointmentType === "home") basePrice += 200

    setBookingData((prev) => ({ ...prev, estimatedPrice: basePrice }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          createdAt: new Date().toISOString(),
          status: "pending",
        }),
      })
      if (response.ok) {
        setStep(5) // Success step
      } else {
        throw new Error("Failed to submit booking")
      }
    } catch (error) {
      console.error("Error submitting booking:", error)
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  // PDF generation for booking slip
  const downloadBookingSlip = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    // Faint background
    doc.setFillColor(255, 245, 250);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    // Header background
    doc.setFillColor(255, 230, 236);
    doc.rect(0, 0, pageWidth, 70, 'F');
    // Logo
    const logoUrl = window.location.origin + '/logo1.png';
    try {
      doc.addImage(logoUrl, 'PNG', 32, 18, 32, 32);
    } catch (e) {}
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(244, 63, 94);
    doc.text('Premium Tailoring', pageWidth / 2, 44, { align: 'center' });
    // Booking Confirmation Heading
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(60, 60, 60);
    doc.text('Booking Confirmation', pageWidth / 2, 100, { align: 'center' });
    let y = 130;
    // User Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(`Name: ${bookingData.name}`, 60, y);
    y += 22;
    doc.text(`Phone: ${bookingData.phone}`, 60, y);
    y += 22;
    if (bookingData.email) { doc.text(`Email: ${bookingData.email}`, 60, y); y += 22; }
    if (bookingData.address) { doc.text(`Address: ${bookingData.address}`, 60, y); y += 22; }
    // Service Info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(60, 60, 60);
    doc.text('Service Details:', 60, y);
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(`Service: ${bookingData.service}`, 80, y);
    y += 18;
    if (bookingData.subService) { doc.text(`Sub-Service: ${bookingData.subService}`, 80, y); y += 18; }
    if (bookingData.urgency) { doc.text(`Urgency: ${bookingData.urgency}`, 80, y); y += 18; }
    if (bookingData.appointmentType) { doc.text(`Appointment Type: ${bookingData.appointmentType}`, 80, y); y += 18; }
    if (bookingData.preferredDate) { doc.text(`Preferred Date: ${bookingData.preferredDate}`, 80, y); y += 18; }
    if (bookingData.preferredTime) { doc.text(`Preferred Time: ${bookingData.preferredTime}`, 80, y); y += 18; }
    if (bookingData.alternateDate) { doc.text(`Alternate Date: ${bookingData.alternateDate}`, 80, y); y += 18; }
    if (bookingData.alternateTime) { doc.text(`Alternate Time: ${bookingData.alternateTime}`, 80, y); y += 18; }
    if (bookingData.measurements) { doc.text(`Measurements: ${bookingData.measurements}`, 80, y); y += 18; }
    if (bookingData.specialRequirements) { doc.text(`Special Requirements: ${bookingData.specialRequirements}`, 80, y); y += 18; }
    if (bookingData.fabricDetails) { doc.text(`Fabric Details: ${bookingData.fabricDetails}`, 80, y); y += 18; }
    if (bookingData.designPreferences) { doc.text(`Design Preferences: ${bookingData.designPreferences}`, 80, y); y += 18; }
    // Pricing
    if (bookingData.estimatedPrice) { doc.text(`Estimated Price: ₹${bookingData.estimatedPrice}`, 80, y); y += 18; }
    // Status
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text(`Status: Pending`, 60, y);
    y += 24;
    // Booking Time
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120);
    doc.text(`Booking Time: ${new Date().toLocaleString()}`, 60, y);
    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120);
    doc.text('Build by Narender Singh  |  premium-tailoring-website.vercel.app', pageWidth / 2, pageHeight - 40, { align: 'center' });
    doc.save(`Booking_Slip_${bookingData.name || 'user'}.pdf`);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
          <p className="text-xl text-gray-600">Schedule your tailoring consultation in just a few simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-full h-1 mx-4 ${
                      step > stepNumber ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Service Selection</span>
            <span>Appointment</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            {step === 1 && (
              <div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      value={bookingData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <Input
                      value={bookingData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Service Selection</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Service *</label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(services).map(([key, service]) => (
                        <div
                          key={key}
                          onClick={() => handleInputChange("service", key)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            bookingData.service === key
                              ? "border-rose-500 bg-rose-50"
                              : "border-gray-200 hover:border-rose-300"
                          }`}
                        >
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">Starting ₹{service.basePrice}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {bookingData.service && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specific Service *</label>
                      <select
                        value={bookingData.subService}
                        onChange={(e) => handleInputChange("subService", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="">Select specific service</option>
                        {services[bookingData.service as keyof typeof services]?.subServices.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { key: "regular", label: "Regular", desc: "Standard timeline" },
                        { key: "urgent", label: "Urgent", desc: "+50% charges" },
                        { key: "express", label: "Express", desc: "+100% charges" },
                      ].map((option) => (
                        <div
                          key={option.key}
                          onClick={() => handleInputChange("urgency", option.key)}
                          className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all duration-200 ${
                            bookingData.urgency === option.key
                              ? "border-rose-500 bg-rose-50"
                              : "border-gray-200 hover:border-rose-300"
                          }`}
                        >
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-xs text-gray-600">{option.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {bookingData.estimatedPrice > 0 && (
                    <div className="bg-rose-50 p-4 rounded-lg">
                      <div className="text-lg font-semibold text-rose-700">
                        Estimated Price: ₹{bookingData.estimatedPrice}
                      </div>
                      <div className="text-sm text-rose-600">
                        Final price may vary based on design complexity and fabric
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Appointment Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        onClick={() => handleInputChange("appointmentType", "studio")}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          bookingData.appointmentType === "studio"
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-rose-300"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <Scissors className="w-5 h-5 text-rose-500 mr-2" />
                          <span className="font-semibold">Studio Visit</span>
                        </div>
                        <p className="text-sm text-gray-600">Visit our premium studio</p>
                      </div>
                      <div
                        onClick={() => handleInputChange("appointmentType", "home")}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          bookingData.appointmentType === "home"
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-rose-300"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 text-rose-500 mr-2" />
                          <span className="font-semibold">Home Visit</span>
                        </div>
                        <p className="text-sm text-gray-600">We come to you (+₹200)</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                      <Input
                        type="date"
                        value={bookingData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                      <select
                        value={bookingData.preferredTime}
                        onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Date</label>
                      <Input
                        type="date"
                        value={bookingData.alternateDate}
                        onChange={(e) => handleInputChange("alternateDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Time</label>
                      <select
                        value={bookingData.alternateTime}
                        onChange={(e) => handleInputChange("alternateTime", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                    <Textarea
                      value={bookingData.specialRequirements}
                      onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                      placeholder="Any specific requirements, design preferences, or measurements you'd like to share..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Booking Confirmation</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium">{bookingData.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2 font-medium">{bookingData.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Service:</span>
                        <span className="ml-2 font-medium">
                          {bookingData.service && services[bookingData.service as keyof typeof services]?.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Sub-service:</span>
                        <span className="ml-2 font-medium">{bookingData.subService}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 font-medium">{bookingData.preferredDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <span className="ml-2 font-medium">{bookingData.preferredTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 font-medium capitalize">{bookingData.appointmentType} Visit</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Estimated Price:</span>
                        <span className="ml-2 font-medium text-rose-600">₹{bookingData.estimatedPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Important Notes:</h4>
                    <ul className="text-sm text-rose-700 space-y-1">
                      <li>• Please bring your fabric and any reference designs</li>
                      <li>• Consultation fee: ₹200 (adjustable against final bill)</li>
                      <li>• Final pricing will be confirmed after consultation</li>
                      <li>• We'll call you to confirm the appointment</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center">
                <h2 className="font-playfair text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-gray-700 mb-6">Thank you for booking your appointment. We look forward to serving you!</p>
                <Button onClick={downloadBookingSlip} className="mb-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white">Download Booking Slip (PDF)</Button>
                <br />
                <Button onClick={() => setStep(1)} className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">Book Another</Button>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={prevStep} disabled={step === 1} className="px-8">
                  Previous
                </Button>
                <Button
                  onClick={step === 4 ? handleSubmit : nextStep}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 px-8"
                  disabled={
                    (step === 1 && (!bookingData.name || !bookingData.phone)) ||
                    (step === 2 && (!bookingData.service || !bookingData.subService)) ||
                    (step === 3 && (!bookingData.preferredDate || !bookingData.preferredTime))
                  }
                >
                  {step === 4 ? "Confirm Booking" : "Next"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
