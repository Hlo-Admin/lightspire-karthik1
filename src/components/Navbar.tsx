
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled 
            ? "bg-black/80 backdrop-blur-lg border-b border-cyan-500/20" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-text cinematic-title">
                LIGHT SPIRE MEDIA
              </h1>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="relative z-60 p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={cn(
                    "absolute inset-0 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300",
                    isMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <X 
                  className={cn(
                    "absolute inset-0 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300",
                    isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
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
          "fixed inset-0 z-40 transition-all duration-700 ease-out",
          isMenuOpen 
            ? "opacity-100 visible" 
            : "opacity-0 invisible"
        )}
      >
        {/* Background Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-700",
            isMenuOpen ? "backdrop-blur-xl" : "backdrop-blur-none"
          )}
          onClick={toggleMenu}
        />
        
        {/* Menu Content */}
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8">
            {/* Menu Items */}
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
                    transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms' 
                  }}
                >
                  <a
                    href={item.href}
                    onClick={toggleMenu}
                    className="group block text-5xl md:text-7xl font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text transition-all duration-500 relative cinematic-title"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 blur-xl transition-all duration-500 transform scale-150" />
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
              style={{ transitionDelay: isMenuOpen ? '800ms' : '0ms' }}
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
