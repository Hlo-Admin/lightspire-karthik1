import { useEffect, useRef, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Play, Quote, ArrowRight } from "lucide-react";
import { ParticleSystem } from "@/components/ParticleSystem";
import { FloatingElements } from "@/components/FloatingElements";
import Navbar from "@/components/Navbar";
import ScrollSpy from "@/components/ScrollSpy";
import ServicesSection from "@/components/ServicesSection";
import ServicesSection2 from "@/components/Servicesnew";
import AboutSectionDark from "@/components/AboutBg";
import KidsIPStrategy from "@/components/KidsIPStrategy";
import FoundersSection from "@/components/FoundersSection";
import MagneticHover from "@/components/MagneticHover";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LightspireHero from "@/components/Hero-words";
import SwipeSection from "@/components/SwipeSection";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import TestimonialsSection from "@/components/TeamSection";

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

const HomeNew = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Founders", href: "#founders" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

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

      {/* ScrollSpy */}
      <ScrollSpy menuItems={menuItems} />

      {/* Hero Section */}
      <div id="home">
        <LightspireHero />
      </div>

      {/* Dark About Section */}
      <div className="creative-section" data-cursor="creative" id="about">
        <AboutSectionDark />
      </div>

      {/* Premium Services Section */}
      <div className="creative-section" data-cursor="creative" id="services">
        <ServicesSection2 />
      </div>

      {/* Kids IP Strategy Section - Now placed after About Us */}
      <div className="creative-section" data-cursor="creative" id="portfolio">
        <KidsIPStrategy />
      </div>

      {/* Swipe Section - New GSAP powered section */}
      {/* <div className="creative-section" data-cursor="creative">
        <SwipeSection />
      </div> */}

      {/* Founders Section - New section after Kids IP Strategy */}
      <div className="creative-section" data-cursor="creative">
        <FoundersSection />
      </div>

      {/* Contact Section - New section */}
      <div className="creative-section" data-cursor="creative" id="contact">
        <ContactSection />
      </div>

      {/* Testimonials Section */}
      <div
        className="creative-section"
        data-cursor="creative"
        id="testimonials"
      >
        <TestimonialsSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeNew;
