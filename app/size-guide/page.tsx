"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Calculator, Ruler, User } from "lucide-react"

export default function SizeGuide() {
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    shoulder: "",
    armHole: "",
    blouseLength: "",
    sleeveLength: "",
  })

  const [calculatedSize, setCalculatedSize] = useState("")

  const sizeChart = {
    blouse: [
      { size: "XS", bust: "30-32", waist: "24-26", hips: "32-34" },
      { size: "S", bust: "32-34", waist: "26-28", hips: "34-36" },
      { size: "M", bust: "34-36", waist: "28-30", hips: "36-38" },
      { size: "L", bust: "36-38", waist: "30-32", hips: "38-40" },
      { size: "XL", bust: "38-40", waist: "32-34", hips: "40-42" },
      { size: "XXL", bust: "40-42", waist: "34-36", hips: "42-44" },
    ],
    suit: [
      { size: "XS", bust: "32-34", waist: "26-28", hips: "34-36", length: "42-44" },
      { size: "S", bust: "34-36", waist: "28-30", hips: "36-38", length: "44-46" },
      { size: "M", bust: "36-38", waist: "30-32", hips: "38-40", length: "46-48" },
      { size: "L", bust: "38-40", waist: "32-34", hips: "40-42", length: "48-50" },
      { size: "XL", bust: "40-42", waist: "34-36", hips: "42-44", length: "50-52" },
      { size: "XXL", bust: "42-44", waist: "36-38", hips: "44-46", length: "52-54" },
    ],
  }

  const measurementGuide = [
    {
      name: "Bust",
      description: "Measure around the fullest part of your bust",
      image: "/placeholder.svg?height=200&width=200",
      tips: "Keep the tape measure parallel to the floor and not too tight",
    },
    {
      name: "Waist",
      description: "Measure around your natural waistline",
      image: "/placeholder.svg?height=200&width=200",
      tips: "This is usually the narrowest part of your torso",
    },
    {
      name: "Hips",
      description: "Measure around the fullest part of your hips",
      image: "/placeholder.svg?height=200&width=200",
      tips: "Usually about 7-9 inches below your waist",
    },
    {
      name: "Shoulder",
      description: "Measure from shoulder point to shoulder point",
      image: "/placeholder.svg?height=200&width=200",
      tips: "Across the back, from one shoulder edge to the other",
    },
    {
      name: "Arm Hole",
      description: "Measure around the arm hole area",
      image: "/placeholder.svg?height=200&width=200",
      tips: "Lift your arm and measure around the armpit area",
    },
    {
      name: "Blouse Length",
      description: "Measure from shoulder to desired length",
      image: "/placeholder.svg?height=200&width=200",
      tips: "From the highest point of shoulder to where you want the blouse to end",
    },
  ]

  const calculateSize = () => {
    const bust = Number.parseFloat(measurements.bust)
    const waist = Number.parseFloat(measurements.waist)
    const hips = Number.parseFloat(measurements.hips)

    if (!bust || !waist || !hips) {
      alert("Please enter bust, waist, and hip measurements")
      return
    }

    // Simple size calculation logic
    let size = "Custom"

    for (const sizeData of sizeChart.blouse) {
      const [bustMin, bustMax] = sizeData.bust.split("-").map(Number)
      const [waistMin, waistMax] = sizeData.waist.split("-").map(Number)
      const [hipsMin, hipsMax] = sizeData.hips.split("-").map(Number)

      if (
        bust >= bustMin &&
        bust <= bustMax &&
        waist >= waistMin &&
        waist <= waistMax &&
        hips >= hipsMin &&
        hips <= hipsMax
      ) {
        size = sizeData.size
        break
      }
    }

    setCalculatedSize(size)
  }

  const downloadSizeChart = () => {
    // In a real application, this would generate and download a PDF
    alert("Size chart download feature will be implemented with PDF generation")
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Size & Measurement Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the perfect fit every time with our comprehensive measurement guide. Learn how to take accurate
            measurements and use our size calculator.
          </p>
        </div>
      </section>

      {/* Size Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Size Calculator</h2>
            <p className="text-lg text-gray-600">Enter your measurements to find your perfect size</p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bust (inches) *</label>
                    <Input
                      type="number"
                      value={measurements.bust}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, bust: e.target.value }))}
                      placeholder="Enter bust measurement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waist (inches) *</label>
                    <Input
                      type="number"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, waist: e.target.value }))}
                      placeholder="Enter waist measurement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hips (inches) *</label>
                    <Input
                      type="number"
                      value={measurements.hips}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, hips: e.target.value }))}
                      placeholder="Enter hip measurement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shoulder (inches)</label>
                    <Input
                      type="number"
                      value={measurements.shoulder}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, shoulder: e.target.value }))}
                      placeholder="Enter shoulder measurement"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arm Hole (inches)</label>
                    <Input
                      type="number"
                      value={measurements.armHole}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, armHole: e.target.value }))}
                      placeholder="Enter arm hole measurement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blouse Length (inches)</label>
                    <Input
                      type="number"
                      value={measurements.blouseLength}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, blouseLength: e.target.value }))}
                      placeholder="Enter desired blouse length"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sleeve Length (inches)</label>
                    <Input
                      type="number"
                      value={measurements.sleeveLength}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, sleeveLength: e.target.value }))}
                      placeholder="Enter sleeve length"
                    />
                  </div>

                  <Button
                    onClick={calculateSize}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 flex items-center justify-center space-x-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate My Size</span>
                  </Button>

                  {calculatedSize && (
                    <div className="bg-rose-50 p-4 rounded-lg text-center">
                      <h3 className="font-semibold text-rose-800 mb-2">Your Recommended Size:</h3>
                      <div className="text-2xl font-bold text-rose-600">{calculatedSize}</div>
                      {calculatedSize === "Custom" && (
                        <p className="text-sm text-rose-700 mt-2">
                          Your measurements require custom tailoring for the perfect fit.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Measurement Guide */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">How to Take Measurements</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these step-by-step instructions to take accurate measurements at home. For best results, have
              someone help you with the measurements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {measurementGuide.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="aspect-square bg-rose-50 rounded-lg mb-4 flex items-center justify-center">
                    <Ruler className="w-12 h-12 text-rose-500" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">{guide.name}</h3>
                  <p className="text-gray-600 mb-3">{guide.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> {guide.tips}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Size Charts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Standard Size Charts</h2>
            <p className="text-lg text-gray-600">Reference our standard size charts for different garment types</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Blouse Size Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Blouse Size Chart</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold">Size</th>
                        <th className="text-left py-2 font-semibold">Bust (inches)</th>
                        <th className="text-left py-2 font-semibold">Waist (inches)</th>
                        <th className="text-left py-2 font-semibold">Hips (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.blouse.map((size, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 font-medium">{size.size}</td>
                          <td className="py-2">{size.bust}</td>
                          <td className="py-2">{size.waist}</td>
                          <td className="py-2">{size.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Suit Size Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Suit Size Chart</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold">Size</th>
                        <th className="text-left py-2 font-semibold">Bust</th>
                        <th className="text-left py-2 font-semibold">Waist</th>
                        <th className="text-left py-2 font-semibold">Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.suit.map((size, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 font-medium">{size.size}</td>
                          <td className="py-2">{size.bust}</td>
                          <td className="py-2">{size.waist}</td>
                          <td className="py-2">{size.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Button */}
          <div className="text-center mt-12">
            <Button
              onClick={downloadSizeChart}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 px-8 py-3 flex items-center space-x-2 mx-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete Size Chart</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-white mb-8">Pro Tips for Perfect Measurements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <User className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-3">Get Help</h3>
              <p className="text-rose-100 text-sm">
                Have someone help you take measurements for better accuracy. It's difficult to measure yourself
                properly.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Ruler className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-3">Use Proper Tools</h3>
              <p className="text-rose-100 text-sm">
                Use a flexible measuring tape and ensure it's not too tight or too loose. The tape should be snug but
                comfortable.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3">
              Book Measurement Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
