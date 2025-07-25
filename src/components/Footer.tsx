import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Sparkles,
  Play,
} from "lucide-react";

const PremiumFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById("footer");
    if (footerElement) observer.observe(footerElement);

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Founders", href: "#founders" },
    { name: "Strategy", href: "#strategy" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "TV Animation Series",
    "OTT & Web Series",
    "Feature Films",
    "Ad Animations",
    "International Co-Productions",
    "Social Media Creatives",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <>
      <footer
        id="footer"
        className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-cyan-200/15 to-pink-200/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-8">
                <img
                  src="/logo.png"
                  alt="Light Spire Media"
                  className="h-12 w-auto object-contain mb-6 drop-shadow-lg"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Lightspire Media
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md font-light">
                  Crafting cinematic worlds frame by frame. We bring imagination
                  to life through premium 2D/3D animation and VFX for global
                  audiences.
                </p>
              </div>

              {/* Contact Info */}
              {/* <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">hello@Lightspire.media</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Los Angeles, CA</span>
                </div>
              </div> */}
            </div>

            {/* Navigation Links */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h4 className="text-lg font-bold text-gray-900 mb-6">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h4 className="text-lg font-bold text-gray-900 mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-600 font-medium text-sm">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          {/* <div className={`bg-[#0678cf] from-blue-600 to-purple-600 rounded-3xl p-8 mb-12 relative overflow-hidden transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
            <div className="relative z-10 text-center text-white">
              <Sparkles className="w-8 h-8 mx-auto mb-4 animate-pulse" />
              <h4 className="text-2xl font-bold mb-3">Stay Updated</h4>
              <p className="text-blue-100 mb-6 font-light max-w-2xl mx-auto">
                Get the latest news about our projects, industry insights, and behind-the-scenes content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="bg-white text-[#0678cf] px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}

          {/* Bottom Section */}
          <div
            className={`border-t border-gray-200 pt-8 transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="text-gray-600 text-center lg:text-left">
                <p className="font-medium">
                  © 2025 Lightspire Media. All rights reserved.
                </p>
                <p className="text-sm mt-1 flex items-center gap-2">
                  Crafted with ❤️ by{" "}
                  <img src="/realm.png" alt="Realm" className="h-8 w-auto" />
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="group w-12 h-12 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#0678cf]  text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 mx-auto group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
    </>
  );
};

export default PremiumFooter;
