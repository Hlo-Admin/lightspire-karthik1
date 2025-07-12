
import React, { useEffect, useRef } from 'react';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const LightspireHero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      backgroundRef.current.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Cinematic Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-300/5 rounded-full blur-2xl"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-10 hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="h-8 w-8 text-blue-400/40" />
      </div>
      <div className="absolute bottom-1/3 right-10 hidden lg:block animate-fade-in" style={{ animationDelay: '1s' }}>
        <Play className="h-12 w-12 text-blue-400/40" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center mb-6 animate-fade-in">
              <div className="bg-blue-500/20 text-white rounded-full px-6 py-2 text-sm font-medium inline-flex items-center border border-blue-500/20">
                <Sparkles className="h-4 w-4 mr-2" />
                27+ Years of Animation Excellence
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              India's Premier <span className="text-blue-500">2D Animation</span> Studio
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Trusted by the Best, Loved by Millions
            </p>
            <br></br>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Link
                to="/projects"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightspireHero;
