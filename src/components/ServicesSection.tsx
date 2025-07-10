
import { useEffect, useRef, useState } from 'react';
import { Tv, Globe, Film, Megaphone, Users, Smartphone, MapPin, Play, Monitor } from 'lucide-react';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateSectionTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateSectionTop);
    updateSectionTop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionTop);
    };
  }, []);

  const parallaxOffset = (scrollY - sectionTop) * 0.5;
  const slowParallax = (scrollY - sectionTop) * 0.3;
  const fastParallax = (scrollY - sectionTop) * 0.7;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[500vh] bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      id="services"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 font-light">From big screens to mobile feeds — we animate it all.</p>
        </div>
      </div>

      {/* TV Animated Series */}
      <div className="relative h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-30"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        ></div>
        
        {/* Floating character animation */}
        <div 
          className="absolute right-10 top-1/2 transform -translate-y-1/2"
          style={{ transform: `translateY(${slowParallax}px) translateX(${Math.sin(scrollY * 0.01) * 20}px)` }}
        >
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-70 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10">
          <div className="max-w-2xl">
            <div className="flex items-center mb-6">
              <Tv className="w-12 h-12 text-blue-600 mr-4" />
              <span className="text-blue-600 font-semibold text-lg">01</span>
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">TV Animated Series</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              High-quality 2D/3D animated series for broadcast platforms, bringing characters to life with cinematic storytelling.
            </p>
          </div>
        </div>
      </div>

      {/* OTT & Web Series */}
      <div className="relative h-screen flex items-center overflow-hidden bg-gradient-to-r from-cyan-50 to-blue-50">
        {/* UI mockup elements */}
        <div 
          className="absolute left-10 top-1/4"
          style={{ transform: `translateY(${fastParallax}px)` }}
        >
          <Monitor className="w-16 h-16 text-cyan-500 opacity-60" />
        </div>
        <div 
          className="absolute right-20 bottom-1/4"
          style={{ transform: `translateY(${-fastParallax * 0.5}px)` }}
        >
          <Play className="w-12 h-12 text-blue-500 opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10">
          <div className="max-w-2xl ml-auto text-right">
            <div className="flex items-center justify-end mb-6">
              <span className="text-cyan-600 font-semibold text-lg mr-4">02</span>
              <Globe className="w-12 h-12 text-cyan-600" />
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">OTT & Web Series</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Visually compelling content for streaming platforms and web, optimized for digital consumption and binge-watching.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Films */}
      <div className="relative h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 opacity-20"
          style={{ transform: `scale(${1 + (scrollY - sectionTop) * 0.0002})` }}
        ></div>
        
        {/* VFX particles */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${parallaxOffset * 1.5}px)` }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 30}px)`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Film className="w-12 h-12 text-purple-600 mr-4" />
              <span className="text-purple-600 font-semibold text-lg">03</span>
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">Feature Films</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Full-scale animation and VFX for theatrical storytelling, creating immersive worlds that captivate audiences.
            </p>
          </div>
        </div>
      </div>

      {/* Ad Animations */}
      <div className="relative h-screen flex items-center overflow-hidden bg-gradient-to-r from-orange-50 to-red-50">
        {/* Motion trails */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30"
              style={{
                width: '200px',
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                transform: `translateX(${fastParallax * (1 + i * 0.2)}px) rotate(${i * 15}deg)`
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10">
          <div className="max-w-2xl">
            <div className="flex items-center mb-6">
              <Megaphone className="w-12 h-12 text-orange-600 mr-4" />
              <span className="text-orange-600 font-semibold text-lg">04</span>
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">Ad Animations</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Dynamic commercials and brand storytelling in motion, creating memorable campaigns that drive engagement.
            </p>
          </div>
        </div>
      </div>

      {/* International Co-Productions */}
      <div className="relative h-screen flex items-center overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50">
        {/* World map connections */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${slowParallax}px)` }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute">
              <MapPin 
                className="w-6 h-6 text-green-500 opacity-60" 
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${25 + Math.sin(i * 2) * 20}%`,
                  transform: `scale(${1 + Math.sin(scrollY * 0.01 + i) * 0.2})`
                }}
              />
              {i < 5 && (
                <div
                  className="absolute h-px bg-green-400 opacity-40"
                  style={{
                    width: '80px',
                    top: '12px',
                    left: '24px',
                    transform: `rotate(${20 + i * 15}deg)`
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10">
          <div className="max-w-2xl ml-auto text-right">
            <div className="flex items-center justify-end mb-6">
              <span className="text-green-600 font-semibold text-lg mr-4">05</span>
              <Users className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">International Co-Productions</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Collaborative cross-border projects with creative synergy, bringing together global talent and perspectives.
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Creatives */}
      <div className="relative h-screen flex items-center overflow-hidden">
        {/* Floating social elements */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + i * 15}%`,
                transform: `translateY(${Math.sin(scrollY * 0.008 + i) * 40}px) rotate(${Math.sin(scrollY * 0.005 + i) * 10}deg)`
              }}
            >
              <div className="w-16 h-28 bg-gradient-to-b from-pink-200 to-rose-300 rounded-lg opacity-60 shadow-lg"></div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Smartphone className="w-12 h-12 text-pink-600 mr-4" />
              <span className="text-pink-600 font-semibold text-lg">06</span>
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">Social Media Creatives</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Short-form animations tailored for digital platforms, optimized for social engagement and viral potential.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="h-32 bg-gradient-to-b from-white to-gray-100"></div>
    </section>
  );
};

export default ServicesSection;
