
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ParticleSystem } from '@/components/ParticleSystem';
import { FloatingElements } from '@/components/FloatingElements';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { MorphingCanvas } from '@/components/MorphingCanvas';
import Navbar from '@/components/Navbar';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Staggered animation sequence
    setTimeout(() => {
      if (titleRef.current) titleRef.current.classList.add('animate-fade-in');
    }, 800);
    
    setTimeout(() => {
      if (subtitleRef.current) subtitleRef.current.classList.add('animate-fade-in');
    }, 1300);
    
    setTimeout(() => {
      if (ctaRef.current) ctaRef.current.classList.add('animate-fade-in');
    }, 1800);

    // Scroll-triggered depth effects
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      
      if (heroElement) {
        const parallaxOffset = scrollY * 0.5;
        heroElement.style.transform = `translateY(${parallaxOffset}px) scale(${1 + scrollY * 0.0002})`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Navbar */}
      <Navbar />
      
      {/* Morphing 3D Canvas Background */}
      <MorphingCanvas />
      
      {/* Animated Background Canvas */}
      <AnimatedBackground />
      
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Floating 3D Elements */}
      <FloatingElements />
      
      {/* Main Hero Content */}
      <div 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-6"
        id="home"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Company Logo/Brand */}
          <div className="mb-12 opacity-0 animate-fade-in">
            <div className="inline-block relative">
              <h3 className="text-2xl font-light tracking-widest text-cyan-400 mb-4 neon-text">
                LIGHT SPIRE MEDIA
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 
            ref={titleRef}
            className="opacity-0 text-6xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent leading-tight cinematic-title"
          >
            Designing Realities.
            <br />
            <span className="text-cyan-400 neon-text-strong">Animating Dreams.</span>
          </h1>

          {/* Subheading */}
          <p 
            ref={subtitleRef}
            className="opacity-0 text-xl md:text-2xl text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed font-light"
          >
            <span className="text-cyan-400">VFX</span>, <span className="text-purple-400">2D</span> & <span className="text-pink-400">3D Animation</span> Studio
            <br />
            for Film, Gaming, and Digital Media
          </p>

          {/* CTA Buttons */}
          <div 
            ref={ctaRef}
            className="opacity-0 flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-5 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border-2 border-cyan-500/50 hover:border-cyan-400"
            >
              <span className="relative z-10 flex items-center">
                Explore Our Worlds
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group relative overflow-hidden border-2 border-purple-500 text-purple-400 hover:text-white px-10 py-5 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:bg-purple-500/20 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] motion-border"
            >
              <span className="relative z-10 flex items-center">
                Get in Touch
                <div className="ml-3 w-2 h-2 bg-purple-400 rounded-full group-hover:animate-pulse"></div>
              </span>
              <div className="absolute inset-0 border-2 border-purple-400 rounded-lg animate-pulse opacity-0 group-hover:opacity-50"></div>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-cyan-400 text-sm font-light mb-4 animate-pulse">Scroll Down</p>
            <div className="flex flex-col items-center animate-bounce">
              <ChevronDown className="w-6 h-6 text-cyan-400 mb-2" />
              <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Index;
