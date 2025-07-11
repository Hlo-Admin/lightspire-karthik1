
import { useEffect, useRef, useState } from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

const FoundersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, observerOptions);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const founders = [
    {
      name: "Sathiya Narayanan",
      title: "Founder",
      tagline: "Vision meets production mastery.",
      delay: 200
    },
    {
      name: "Leo Menezes", 
      title: "Co-Founder",
      tagline: "Creative direction with storytelling soul.",
      delay: 400
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24 overflow-hidden"
      id="founders"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          ))}
        </div>

        {/* Gradient glows */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />

        {/* Animated lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="inline-flex items-center mb-6">
            <Sparkles className="w-8 h-8 text-cyan-400 mr-4 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Meet Our <span className="text-[#0678cf]">Founders</span>
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400 ml-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The visionary minds behind Light Spire Media, bringing together decades of experience 
            in <span className="text-cyan-400">creative direction</span> and <span className="text-[#0678cf]">production excellence</span>.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${founder.delay}ms` }}
            >
              {/* Founder Card */}
              <div className="relative bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-3xl p-8 lg:p-10 hover:bg-gray-700/60 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] group-hover:border-cyan-400/50">
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                {/* Avatar placeholder with animated border */}
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                    <div className="w-28 h-28 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                      <Star className="w-12 h-12 text-gray-400 group-hover:text-cyan-400 transition-colors duration-500" />
                    </div>
                  </div>
                  
                  {/* Animated ring */}
                  <div className="absolute inset-0 w-32 h-32 mx-auto border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 rounded-full group-hover:animate-spin transition-all duration-1000" style={{ animationDuration: '8s' }}></div>
                </div>

                {/* Founder Info */}
                <div className="text-center relative z-10">
                  {/* Name with animated underline */}
                  <div className="relative mb-2">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                      {founder.name}
                    </h3>
                    
                    {/* Signature-like underline animation */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </div>

                  {/* Title */}
                  <div className="flex items-center justify-center mb-6">
                    <Zap className="w-5 h-5 text-cyan-400 mr-2 group-hover:animate-pulse" />
                    <p className="text-xl text-cyan-400 font-semibold tracking-wide">
                      {founder.title}
                    </p>
                    <Zap className="w-5 h-5 text-purple-400 ml-2 group-hover:animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </div>

                  {/* Tagline */}
                  <p className="text-lg text-gray-300 italic leading-relaxed group-hover:text-white transition-colors duration-500">
                    "{founder.tagline}"
                  </p>

                  {/* Floating starbursts */}
                  <div className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <Star className="w-5 h-5 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>

                {/* Card corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/0 group-hover:border-cyan-400 rounded-tl-3xl transition-all duration-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400/0 group-hover:border-purple-400 rounded-br-3xl transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative inline-block bg-gray-800/40 backdrop-blur-sm border border-gray-600/30 rounded-2xl px-8 py-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-xl"></div>
            <p className="text-xl md:text-2xl font-light text-gray-300 italic relative z-10">
              "Together, we transform imagination into <span className="text-[#0779cf] font-semibold">visual reality</span>."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
