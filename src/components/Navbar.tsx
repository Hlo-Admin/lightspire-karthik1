import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordRotate } from "@/components/magicui/word-rotate";
import { TypingAnimation } from "@/components/magicui/typing-animation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out bg-white border-b border-cyan-500/30",
          isScrolled ? "shadow-md" : ""
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-4 ml-0 md:ml-6">
              <img
                src="/logo.png"
                alt="Light Spire Media Logo"
                className="h-10 w-auto object-contain drop-shadow-md"
                style={{ filter: "drop-shadow(0 2px 8px #0678cf55)" }}
              />
            </div>

            {/* Centered Hero Text - only visible after scroll */}
            <div
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-2xl px-4 transition-all duration-500 ml-12 lg:ml-24 hidden md:flex",
                isScrolled
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              )}
              style={{ zIndex: 55 }}
            >
              {/* Column 1 */}
              <span className="flex-1 text-base md:text-lg font-semibold text-[#222] text-right pr-4 whitespace-nowrap">
                India's Premier
              </span>
              {/* Column 2: Animated center with separators */}
              <span className="flex-1 flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-[#0678cf] whitespace-nowrap">
                <span>|</span>
                <WordRotate
                  words={[
                    "2D",
                    "Animation",
                  
                  ]}
                  className="inline-block text-[#0678cf] font-bold"
                />
                <span>|</span>
              </span>
              {/* Column 3 */}
              <span className="flex-1 text-base md:text-lg font-semibold text-[#222] text-left pl-4 whitespace-nowrap">
                Studio
              </span>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-60 p-3 rounded-lg bg-black from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-300 group hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-500/30"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={cn(
                    "absolute inset-0 text-cyan-300 transition-all duration-300 group-hover:text-white drop-shadow-lg",
                    isMenuOpen
                      ? "opacity-0 rotate-90 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 text-cyan-300 transition-all duration-300 group-hover:text-white drop-shadow-lg",
                    isMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 rotate-90 scale-75"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-700 ease-out bg-[#f5f5f5]",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Background Overlay with better contrast */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-700 bg-[#f5f5f5]",
            isMenuOpen ? "" : ""
          )}
          onClick={toggleMenu}
        />

        {/* Menu Content */}
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8">
            {/* Menu Items with improved visibility */}
            <div className="space-y-6">
              {menuItems.map((item, index) => (
                <div
                  key={item.name}
                  className={cn(
                    "transform transition-all duration-700 ease-out",
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  )}
                  style={{
                    transitionDelay: isMenuOpen
                      ? `${index * 100 + 200}ms`
                      : "0ms",
                  }}
                >
                  <a
                    href={item.href}
                    onClick={toggleMenu}
                    className="group block text-5xl md:text-7xl font-bold text-black hover:text-[#0678cf] transition-all duration-500 relative cinematic-title hover:scale-105 transform-gpu"
                    style={{
                      textShadow:
                        "0 0 20px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.08)",
                    }}
                  >
                    <span className="relative z-10 drop-shadow-xl">
                      {item.name}
                    </span>
                  </a>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div
              className={cn(
                "mt-16 flex justify-center space-x-8 transition-all duration-700 ease-out",
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: isMenuOpen ? "800ms" : "0ms" }}
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
