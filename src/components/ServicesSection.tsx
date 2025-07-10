
import { useEffect, useRef, useState } from 'react';
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from 'lucide-react';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const services = [
    {
      icon: Tv,
      title: "TV Animated Series",
      description: "High-quality 2D/3D animated series for broadcast networks.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Globe,
      title: "OTT & Web Series", 
      description: "Stylized content for streaming and digital media.",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: Film,
      title: "Feature Films",
      description: "End-to-end cinematic VFX and animation.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Megaphone,
      title: "Ad Animations",
      description: "Short, sharp brand storytelling in motion.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Users,
      title: "International Co-Productions",
      description: "Collaborative animation across borders.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Smartphone,
      title: "Social Media Creatives",
      description: "Snackable animated content for social platforms.",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

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

  // Calculate which card should be active based on scroll
  useEffect(() => {
    const sectionHeight = window.innerHeight * 3; // Section scroll range
    const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
    const cardIndex = Math.min(Math.floor(progress * services.length), services.length - 1);
    setActiveCardIndex(Math.max(0, cardIndex));
  }, [scrollY, sectionTop, services.length]);

  // Header animation
  const getHeaderAnimation = () => {
    const progress = Math.max(0, (scrollY - sectionTop) / (window.innerHeight * 0.5));
    const opacity = Math.max(0.3, 1 - progress * 0.7);
    const translateY = progress * -30;
    
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden min-h-screen"
      id="services"
      style={{ 
        perspective: '1200px',
        height: '400vh' // Enough scroll space for all cards
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-cyan-100 rounded-full opacity-35 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Section Header */}
      <div 
        className="relative z-10 py-20 text-center"
        style={getHeaderAnimation()}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 cinematic-title">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            Stories in every frame. Impact in every second.
          </p>
        </div>
      </div>

      {/* Cards Grid - Fixed Position */}
      <div className="sticky top-0 flex items-center justify-center min-h-screen px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = index === activeCardIndex;
            
            return (
              <div
                key={service.title}
                className={`transition-all duration-500 transform ${
                  isActive 
                    ? 'scale-105 opacity-100 z-10' 
                    : 'scale-95 opacity-60 z-5'
                }`}
              >
                <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform-gpu ${isActive ? 'shadow-3xl ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  
                  {/* Floating Icon Background */}
                  <div className="absolute top-8 right-8 opacity-10">
                    <Icon className="w-24 h-24 text-gray-900" />
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-8 text-center">
                    {/* Animated Icon */}
                    <div 
                      className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-lg mb-6 transform transition-all duration-500`}
                      style={{
                        transform: `scale(${isActive ? 1.1 : 1}) rotateY(${isActive ? 360 : 0}deg)`
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 cinematic-title">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base text-gray-600 leading-relaxed font-light">
                      {service.description}
                    </p>
                    
                    {/* Decorative Line */}
                    <div 
                      className={`mt-6 h-1 bg-gradient-to-r ${service.gradient} rounded-full mx-auto transition-all duration-700`}
                      style={{
                        width: isActive ? '80px' : '40px',
                      }}
                    ></div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-opacity duration-500 ${isActive ? 'opacity-5' : 'opacity-0'}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col space-y-3">
          {services.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                index === activeCardIndex 
                  ? 'bg-gradient-to-b from-blue-500 to-purple-600' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
