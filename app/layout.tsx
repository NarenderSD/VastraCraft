import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Head from "next/head"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "India's Best Women's Stitching & Tailoring Center | Premium Silai Services",
  description:
    "Premium women's tailoring services with 30+ years of experience. Expert blouse stitching, bridal wear, alterations & custom designs. Perfect Stitch, Perfect Fit.",
  keywords: "women tailoring, blouse stitching, bridal wear, silai center, custom tailoring, alterations",
  authors: [{ name: "Premium Tailoring Center" }],
  openGraph: {
    title: "India's Best Women's Stitching & Tailoring Center",
    description: "Premium women's tailoring services with expert craftsmanship",
    type: "website",
  },
  manifest: '/site.webmanifest',
  // metadataBase: new URL('https://your-domain.com'), // Add your domain here
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <Head>
        <link rel="icon" href="/logo1.png" type="image/png" />
      </Head>
      <body className="font-inter antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
