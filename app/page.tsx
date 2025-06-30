import Hero from "@/components/Hero"
import Services from "@/components/Services"
import WhyChooseUs from "@/components/WhyChooseUs"
import AnimatedClothShowcase from "@/components/AnimatedClothShowcase"
import Portfolio from "@/components/Portfolio"
import Process from "@/components/Process"
import CustomerStories from "@/components/CustomerStories"
import Testimonials from "@/components/Testimonials"
import Newsletter from "@/components/Newsletter"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AnimatedClothShowcase />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <CustomerStories />
      <Testimonials />
      <Newsletter />
      <FloatingWhatsApp />
    </main>
  )
}
