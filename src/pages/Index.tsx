
import { useEffect, useRef, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Play, Quote, ArrowRight } from "lucide-react";
import { ParticleSystem } from "@/components/ParticleSystem";
import { FloatingElements } from "@/components/FloatingElements";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import ServicesSection2 from "@/components/ServicesSection2";
import AboutSectionDark from "@/components/AboutSectionDark";
import KidsIPStrategy from "@/components/KidsIPStrategy";
import FoundersSection from "@/components/FoundersSection";
import MagneticHover from "@/components/MagneticHover";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LightspireHero from "@/components/Hero";

// Lazy load Spline component for better performance
const LazySpline = lazy(() => import("@splinetool/react-spline"));

// Loading fallback component
const SplineLoader = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400 text-sm">Loading 3D Experience...</p>
    </div>
  </div>
);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    // Staggered animation sequence
    setTimeout(() => {
      if (titleRef.current) titleRef.current.classList.add("animate-fade-in");
    }, 500);

    setTimeout(() => {
      if (subtitleRef.current)
        subtitleRef.current.classList.add("animate-fade-in");
    }, 1000);

    setTimeout(() => {
      if (ctaRef.current) ctaRef.current.classList.add("animate-fade-in");
    }, 1500);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative font-toasty">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
    <LightspireHero/>

      {/* Premium Services Section */}
      <div className="creative-section" data-cursor="creative" id="services">
        <ServicesSection2 />
      </div>

      {/* Dark About Section */}
      <div className="creative-section" data-cursor="creative" id="about">
        <AboutSectionDark />
      </div>

      {/* Kids IP Strategy Section - Now placed after About Us */}
      <div className="creative-section" data-cursor="creative">
        <KidsIPStrategy />
      </div>

      {/* Founders Section - New section after Kids IP Strategy */}
      <div className="creative-section" data-cursor="creative">
        <FoundersSection />
      </div>

      {/* Contact Section - New section */}
      <div className="creative-section" data-cursor="creative" id="contact">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
