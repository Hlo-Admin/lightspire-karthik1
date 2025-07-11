
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Quote, ArrowRight } from 'lucide-react';
import { ParticleSystem } from '@/components/ParticleSystem';
import { FloatingElements } from '@/components/FloatingElements';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';

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
    }, 500);
    
    setTimeout(() => {
      if (subtitleRef.current) subtitleRef.current.classList.add('animate-fade-in');
    }, 1000);
    
    setTimeout(() => {
      if (ctaRef.current) ctaRef.current.classList.add('animate-fade-in');
    }, 1500);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden bg-black">
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
            <div className="mb-8 opacity-0 animate-fade-in">
              <div className="inline-block relative">
                <h3 className="text-2xl font-light tracking-widest text-cyan-400 mb-2 neon-text">
                  LIGHT SPIRE MEDIA
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 
              ref={titleRef}
              className="opacity-0 text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent leading-tight cinematic-title"
            >
              Where Imagination
              <br />
              <span className="text-cyan-400 neon-text-strong">Meets Reality</span>
            </h1>

            {/* Subheading */}
            <p 
              ref={subtitleRef}
              className="opacity-0 text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Crafting breathtaking <span className="text-cyan-400">2D</span>, <span className="text-purple-400">3D</span> & <span className="text-pink-400">VFX</span> experiences
              <br />
              for film, gaming, and beyond.
            </p>

            {/* CTA Buttons */}
            <div 
              ref={ctaRef}
              className="opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Watch Our Reel
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden border-2 border-purple-500 text-purple-400 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              >
                <Quote className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
      </div>

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
};

export default Index;
