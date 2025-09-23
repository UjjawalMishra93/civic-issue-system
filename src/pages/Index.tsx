import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import BeforeAfter from "@/components/landing/BeforeAfter";
import Testimonials from "@/components/landing/Testimonials";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Header />
      <Hero />
      <Features />
      <BeforeAfter />
      <Testimonials />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;