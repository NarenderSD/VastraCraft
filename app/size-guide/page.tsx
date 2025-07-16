"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Shirt, Scissors, Crown, Baby, Ruler, User } from "lucide-react"
import { jsPDF } from "jspdf"
import { motion, AnimatePresence } from "framer-motion"

const unitOptions = [
  { label: "Inches", value: "in" },
  { label: "Centimeters", value: "cm" },
]

function convertValue(val: any, from: any, to: any) {
  if (!val) return ""
  if (from === to) return val
  // 1 inch = 2.54 cm
  return to === "cm" ? (Number(val) * 2.54).toFixed(1) : (Number(val) / 2.54).toFixed(1)
}

function convertRange(range: any, from: any, to: any, colIdx: number = 0) {
  // Always return original value for first column (Size, Age, etc.)
  if (colIdx === 0) return range
  if (!range.includes("-") && isNaN(Number(range))) return range
  if (!range.includes("-")) return convertValue(range, from, to)
  // Only convert if both min and max are numbers
  const [min, max] = range.split("-").map(Number)
  if (isNaN(min) || isNaN(max)) return range
  return `${convertValue(min, from, to)}-${convertValue(max, from, to)}`
}

const sizeCharts = [
  {
    key: "blouse",
    label: "Blouse Size Chart",
    icon: <Shirt className="w-8 h-8 text-rose-500" />,
    columns: ["Size", "Bust (in)", "Waist (in)", "Shoulder (in)", "Length (in)"],
    data: [
      ["XS", "30-32", "24-26", "13-14", "13-14"],
      ["S", "32-34", "26-28", "14-15", "14-15"],
      ["M", "34-36", "28-30", "15-16", "15-16"],
      ["L", "36-38", "30-32", "16-17", "16-17"],
      ["XL", "38-40", "32-34", "17-18", "17-18"],
      ["XXL", "40-42", "34-36", "18-19", "18-19"],
    ],
    guide: [
      { label: "Bust", tip: "Measure around the fullest part of your bust.", icon: <User className="w-6 h-6 text-pink-500" /> },
      { label: "Waist", tip: "Measure around your natural waistline.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Shoulder", tip: "Measure from shoulder point to shoulder point.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Length", tip: "From shoulder to desired blouse end.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
    ],
    calculatorFields: [
      { name: "bust", label: "Bust (in)", required: true },
      { name: "waist", label: "Waist (in)", required: true },
      { name: "shoulder", label: "Shoulder (in)", required: false },
      { name: "length", label: "Length (in)", required: false },
    ],
  },
  {
    key: "suit",
    label: "Suit & Salwar Size Chart",
    icon: <Scissors className="w-8 h-8 text-pink-500" />,
    columns: ["Size", "Bust (in)", "Waist (in)", "Hips (in)", "Length (in)"],
    data: [
      ["XS", "32-34", "26-28", "34-36", "42-44"],
      ["S", "34-36", "28-30", "36-38", "44-46"],
      ["M", "36-38", "30-32", "38-40", "46-48"],
      ["L", "38-40", "32-34", "40-42", "48-50"],
      ["XL", "40-42", "34-36", "42-44", "50-52"],
      ["XXL", "42-44", "36-38", "44-46", "52-54"],
    ],
    guide: [
      { label: "Bust", tip: "Measure around the fullest part of your bust.", icon: <User className="w-6 h-6 text-pink-500" /> },
      { label: "Waist", tip: "Measure around your natural waistline.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Hips", tip: "Measure around the fullest part of your hips.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Length", tip: "From shoulder to desired suit length.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
    ],
    calculatorFields: [
      { name: "bust", label: "Bust (in)", required: true },
      { name: "waist", label: "Waist (in)", required: true },
      { name: "hips", label: "Hips (in)", required: true },
      { name: "length", label: "Length (in)", required: false },
    ],
  },
  {
    key: "lehenga",
    label: "Lehenga Size Chart",
    icon: <Crown className="w-8 h-8 text-yellow-500" />,
    columns: ["Size", "Waist (in)", "Hips (in)", "Length (in)"],
    data: [
      ["XS", "24-26", "32-34", "40-41"],
      ["S", "26-28", "34-36", "41-42"],
      ["M", "28-30", "36-38", "42-43"],
      ["L", "30-32", "38-40", "43-44"],
      ["XL", "32-34", "40-42", "44-45"],
      ["XXL", "34-36", "42-44", "45-46"],
    ],
    guide: [
      { label: "Waist", tip: "Measure around your natural waistline.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Hips", tip: "Measure around the fullest part of your hips.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Length", tip: "From waist to desired lehenga end.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
    ],
    calculatorFields: [
      { name: "waist", label: "Waist (in)", required: true },
      { name: "hips", label: "Hips (in)", required: true },
      { name: "length", label: "Length (in)", required: false },
    ],
  },
  {
    key: "kurti",
    label: "Kurti Size Chart",
    icon: <Crown className="w-8 h-8 text-green-500" />,
    columns: ["Size", "Bust (in)", "Waist (in)", "Hips (in)", "Length (in)"],
    data: [
      ["XS", "32-34", "26-28", "34-36", "36-38"],
      ["S", "34-36", "28-30", "36-38", "38-40"],
      ["M", "36-38", "30-32", "38-40", "40-42"],
      ["L", "38-40", "32-34", "40-42", "42-44"],
      ["XL", "40-42", "34-36", "42-44", "44-46"],
      ["XXL", "42-44", "36-38", "44-46", "46-48"],
    ],
    guide: [
      { label: "Bust", tip: "Measure around the fullest part of your bust.", icon: <User className="w-6 h-6 text-pink-500" /> },
      { label: "Waist", tip: "Measure around your natural waistline.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Hips", tip: "Measure around the fullest part of your hips.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Length", tip: "From shoulder to desired kurti end.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
    ],
    calculatorFields: [
      { name: "bust", label: "Bust (in)", required: true },
      { name: "waist", label: "Waist (in)", required: true },
      { name: "hips", label: "Hips (in)", required: true },
      { name: "length", label: "Length (in)", required: false },
    ],
  },
  {
    key: "gown",
    label: "Gown Size Chart",
    icon: <Crown className="w-8 h-8 text-purple-500" />,
    columns: ["Size", "Bust (in)", "Waist (in)", "Hips (in)", "Length (in)"],
    data: [
      ["XS", "32-34", "24-26", "34-36", "54-55"],
      ["S", "34-36", "26-28", "36-38", "55-56"],
      ["M", "36-38", "28-30", "38-40", "56-57"],
      ["L", "38-40", "30-32", "40-42", "57-58"],
      ["XL", "40-42", "32-34", "42-44", "58-59"],
      ["XXL", "42-44", "34-36", "44-46", "59-60"],
    ],
    guide: [
      { label: "Bust", tip: "Measure around the fullest part of your bust.", icon: <User className="w-6 h-6 text-pink-500" /> },
      { label: "Waist", tip: "Measure around your natural waistline.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Hips", tip: "Measure around the fullest part of your hips.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Length", tip: "From shoulder to gown hem.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
    ],
    calculatorFields: [
      { name: "bust", label: "Bust (in)", required: true },
      { name: "waist", label: "Waist (in)", required: true },
      { name: "hips", label: "Hips (in)", required: true },
      { name: "length", label: "Length (in)", required: false },
    ],
  },
  {
    key: "kids",
    label: "Kids Size Chart",
    icon: <Baby className="w-8 h-8 text-blue-400" />,
    columns: ["Size", "Age (yrs)", "Chest (in)", "Waist (in)", "Height (in)"],
    data: [
      ["0-1", "0-1", "18-20", "18-19", "28-30"],
      ["1-2", "1-2", "20-21", "19-20", "30-32"],
      ["2-3", "2-3", "21-22", "20-21", "32-34"],
      ["3-4", "3-4", "22-23", "21-22", "34-36"],
      ["4-5", "4-5", "23-24", "22-23", "36-38"],
      ["5-6", "5-6", "24-25", "23-24", "38-40"],
    ],
    guide: [
      { label: "Chest", tip: "Measure around the fullest part of the chest.", icon: <User className="w-6 h-6 text-blue-400" /> },
      { label: "Waist", tip: "Measure around the natural waistline.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
      { label: "Height", tip: "Measure from top of head to floor.", icon: <Ruler className="w-6 h-6 text-rose-400" /> },
    ],
    calculatorFields: [
      { name: "chest", label: "Chest (in)", required: true },
      { name: "waist", label: "Waist (in)", required: true },
      { name: "height", label: "Height (in)", required: true },
    ],
  },
]

function downloadChart(chart: any, unit: any, recommendedSize: any, userValues?: Record<string, string | number>) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  // Faint background for luxury feel
  doc.setFillColor(255, 245, 250)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  // Header background
  doc.setFillColor(255, 230, 236)
  doc.rect(0, 0, pageWidth, 70, 'F')
  // Logo and website name
  const logoUrl = window.location.origin + '/logo1.png'
  try {
    doc.addImage(logoUrl, 'PNG', 32, 18, 32, 32)
  } catch (e) {}
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(244, 63, 94)
  doc.text('VastraCraft', pageWidth / 2, 44, { align: 'center' })
  // Date (left, below header color block, in white space)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(120, 120, 120)
  const today = new Date()
  const dateStr = today.toLocaleDateString()
  doc.text(`Date: ${dateStr}`, 40, 80)
  // Chart title
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(18)
  doc.setTextColor(60, 60, 60)
  doc.text(chart.label + (unit === "cm" ? " (cm)" : " (in)"), pageWidth / 2, 100, { align: 'center' })
  let y = 120
  // Show recommended size if available
  if (recommendedSize && recommendedSize !== 'Custom') {
    doc.setFillColor(255, 243, 207)
    doc.roundedRect(pageWidth / 2 - 110, y, 220, 36, 8, 8, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(244, 63, 94)
    doc.text(`Recommended Size: ${recommendedSize}`, pageWidth / 2, y + 24, { align: 'center' })
    y += 48
  } else if (recommendedSize === 'Custom') {
    doc.setFillColor(255, 243, 207)
    doc.roundedRect(pageWidth / 2 - 140, y, 280, 36, 8, 8, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.setTextColor(244, 63, 94)
    doc.text('Custom tailoring required for your measurements', pageWidth / 2, y + 24, { align: 'center' })
    y += 48
  }
  // User entered measurements (if any)
  if (userValues && Object.keys(userValues).length > 0) {
    y += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(60, 60, 60)
    doc.text('Your Measurements:', pageWidth / 2, y, { align: 'center' })
    y += 18
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(13)
    doc.setTextColor(100, 100, 100)
    const entries = Object.entries(userValues)
    const colCount = entries.length > 3 ? 2 : 1
    const colWidth = 180
    entries.forEach(([key, value], i) => {
      const label = chart.calculatorFields?.find((f: any) => f.name === key)?.label || key
      const x = colCount === 2 ? (i % 2 === 0 ? pageWidth / 2 - colWidth : pageWidth / 2 + 10) : pageWidth / 2
      const align = colCount === 2 ? 'left' : 'center'
      doc.text(`${label}: ${value}`, x, y + Math.floor(i / colCount) * 18, { align })
    })
    y += Math.ceil(entries.length / colCount) * 18 + 10
  }
  // Care Instructions
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(60, 60, 60)
  doc.text('Care Instructions:', 60, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(13)
  doc.setTextColor(100, 100, 100)
  const careLines = [
    '• Dry clean only',
    '• Iron at low temperature',
    '• Store in a cool, dry place'
  ]
  careLines.forEach((line, i: number) => {
    doc.text(line, 80, y + 22 + i * 18)
  })
  y += 22 + careLines.length * 18 + 10
  // Contact Info
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(60, 60, 60)
  doc.text('Contact:', 60, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(13)
  doc.setTextColor(100, 100, 100)
  doc.text('8595962615 | www.premium-tailoring-website.vercel.app', 80, y + 20)
  // QR Code (centered above footer)
  try {
    const qrUrl = window.location.origin + '/qr.png'
    doc.addImage(qrUrl, 'PNG', pageWidth / 2 - 24, pageHeight - 100, 48, 48)
  } catch (e) {}
  // Call to action for QR (centered, below QR)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(12)
  doc.setTextColor(120, 120, 120)
  doc.text('Scan QR to visit our website', pageWidth / 2, pageHeight - 48, { align: 'center' })
  // Footer: Build by Narender Singh, centered at very bottom
  doc.setFontSize(12)
  doc.setTextColor(120, 120, 120)
  doc.setFont('helvetica', 'normal')
  doc.text('Build by Narender Singh', pageWidth / 2, pageHeight - 24, { align: 'center' })
  // Save
  doc.save(`${chart.label.replace(/\s+/g, "_")}_${unit}.pdf`)
}

function getRecommendedSize(chart: any, values: any, unit: any) {
  // For each row, check if all required fields are in range
  for (const row of chart.data) {
    let match = true
    for (let i = 1; i < row.length; i++) {
      const col = chart.columns[i]
      const val = values[chart.calculatorFields[i - 1]?.name]
      if (val) {
        // Convert table data to the selected unit for comparison
        let [min, max] = row[i].split("-").map(Number)
        let inputVal = Number(val)
        if (unit === "cm") {
          min = min * 2.54
          max = max * 2.54
        }
        if (isNaN(min) || isNaN(max)) continue
        if (inputVal < min || inputVal > max) {
          match = false
        break
        }
      }
    }
    if (match) return row[0]
  }
  return "Custom"
}

export default function SizeGuide() {
  const [calcValues, setCalcValues] = useState({})
  const [calcResults, setCalcResults] = useState({})
  const [unit, setUnit] = useState("in")

  // Animation variants
  const heroVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 + 0.2, duration: 0.7, ease: "easeOut" },
    }),
  }
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-rose-50 via-pink-50 to-white relative overflow-x-hidden">
      {/* Animated SVG/Lottie Banner */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-0 right-0 top-0 z-0 flex justify-center pointer-events-none"
      >
        {/* Example: Animated SVG tape measure or flowing fabric */}
        <svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 60 Q80 10 160 60 T320 60"
            stroke="#f43f5e"
            strokeWidth="8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
      {/* Hero Section */}
      <motion.section
        variants={heroVariant}
        initial="hidden"
        animate="visible"
        className="py-12 sm:py-20 bg-gradient-to-r from-rose-50 to-pink-50 text-center relative z-10"
      >
        <motion.h1
          className="font-playfair text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight sm:leading-tight px-2"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Size & Measurement Guide
        </motion.h1>
        <motion.p
          className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-xs xs:max-w-md sm:max-w-3xl mx-auto mb-6 sm:mb-8 px-2"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          Get the perfect fit every time with our premium, detailed measurement guide for every garment type. Download charts, follow expert tips, and contact us for custom sizing.
        </motion.p>
        <motion.div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-4 sm:p-6 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto mb-6 sm:mb-8 shadow" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
          <h2 className="font-playfair text-lg sm:text-2xl font-bold text-rose-600 mb-2">General Measurement Tips</h2>
          <ul className="text-left text-gray-700 space-y-2 text-sm sm:text-base">
            <li>• Always use a soft measuring tape and keep it parallel to the floor.</li>
            <li>• Wear light clothing while measuring for best accuracy.</li>
            <li>• Stand straight and breathe normally while taking measurements.</li>
            <li>• If unsure, take help from a friend or professional tailor.</li>
          </ul>
        </motion.div>
        {/* Unit Switcher */}
        <motion.div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-2 sm:mb-4" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
          <span className="font-medium text-gray-700 text-sm sm:text-base">Unit:</span>
          {unitOptions.map(opt => (
            <Button
              key={opt.value}
              onClick={() => setUnit(opt.value)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 ${unit === opt.value ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white scale-105 shadow-lg' : 'bg-white text-rose-600 border border-rose-200 hover:scale-105'}`}
            >
              {opt.label}
            </Button>
          ))}
        </motion.div>
      </motion.section>
      {/* Size Charts */}
      <section className="py-12 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 grid gap-12">
          {sizeCharts.map((chart, i) => (
            <motion.div
              key={chart.key}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.015, boxShadow: "0 8px 32px 0 rgba(244,63,94,0.10)" }}
            >
              <Card className="shadow-xl border-2 border-rose-100 transition-all duration-300">
                <CardContent className="p-4 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
                    {chart.icon}
                    <h2 className="font-playfair text-2xl font-bold text-gray-900 ml-0 sm:ml-4">{chart.label}</h2>
                    <motion.div whileHover={{ scale: 1.08, boxShadow: "0 4px 16px 0 rgba(244,63,94,0.15)" }}>
                      <Button
                        className="sm:ml-auto bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white transition-all duration-200"
                        onClick={() => downloadChart(chart, unit, calcResults[chart.key], calcValues[chart.key])}
                      >
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                      </Button>
                    </motion.div>
                  </div>
                  {/* Size Calculator */}
                  <div className="mb-8">
                    <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Find Your {chart.label.replace(' Size Chart','')} Size</h3>
                    <form
                      className="grid md:grid-cols-2 gap-4 mb-2"
                      onSubmit={e => {
                        e.preventDefault()
                        setCalcResults(r => ({ ...r, [chart.key]: getRecommendedSize(chart, calcValues[chart.key] || {}, unit) }))
                      }}
                    >
                      {chart.calculatorFields.map(field => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label.replace('(in)', unit === 'cm' ? '(cm)' : '(in)')}{field.required && ' *'}</label>
                    <Input
                      type="number"
                            required={field.required}
                            value={calcValues[chart.key]?.[field.name] || ''}
                            onChange={e => setCalcValues(v => ({
                              ...v,
                              [chart.key]: { ...v[chart.key], [field.name]: e.target.value }
                            }))}
                            placeholder={`Enter ${field.label.toLowerCase().replace('(in)', unit === 'cm' ? '(cm)' : '(in)')}`}
                    />
                  </div>
                      ))}
                      <div className="md:col-span-2">
                        <Button type="submit" className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 mt-2 transition-all duration-200">Calculate Size</Button>
                  </div>
                    </form>
                    {calcResults[chart.key] && (
                      <motion.div className="bg-rose-50 p-4 rounded-lg text-center mt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h4 className="font-semibold text-rose-800 mb-1">Recommended Size:</h4>
                        <div className="text-2xl font-bold text-rose-600">{calcResults[chart.key]}</div>
                        {calcResults[chart.key] === 'Custom' && (
                          <p className="text-sm text-rose-700 mt-1">Your measurements require custom tailoring for the perfect fit.</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full text-center border border-gray-200 rounded-xl text-xs sm:text-sm">
                      <thead className="bg-gradient-to-r from-rose-100 to-pink-100">
                        <tr>
                          {chart.columns.map((col) => (
                            <th key={col} className="px-2 sm:px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">
                              {col.replace('(in)', unit === 'cm' ? '(cm)' : '(in)')}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                        {chart.data.map((row, i) => (
                          <tr key={i} className="hover:bg-rose-50">
                            {row.map((cell, j) => (
                              <td key={j} className="px-2 sm:px-4 py-2 text-gray-800 border-b border-gray-100">
                                {convertRange(cell, 'in', unit)}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {chart.guide.map((g, i) => (
                      <motion.div key={i} className="flex items-center bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}>
                        {g.icon}
                        <div className="ml-4">
                          <div className="font-semibold text-gray-900">{g.label}</div>
                          <div className="text-gray-600 text-sm">{g.tip}</div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Custom Sizing Note */}
      <motion.section className="py-12 bg-gradient-to-r from-rose-50 to-pink-50 text-center relative z-10" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Need a Custom Size?</h2>
          <p className="text-lg text-gray-700 mb-6">
            If your measurements don't fit our standard charts, we offer fully custom tailoring. Contact us for a personalized consultation and perfect fit.
          </p>
          <motion.div whileHover={{ scale: 1.06, boxShadow: "0 4px 16px 0 rgba(244,63,94,0.15)" }}>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
