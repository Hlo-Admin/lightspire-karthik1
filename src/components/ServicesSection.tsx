
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
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * services.length; // Each service gets one viewport height
    const scrollProgress = Math.max(0, (scrollY - sectionTop) / sectionHeight);
    const cardIndex = Math.min(Math.floor(scrollProgress * services.length), services.length - 1);
    setActiveCardIndex(Math.max(0, cardIndex));
  }, [scrollY, sectionTop, services.length]);

  // Header animation - fades and moves up as user scrolls
  const getHeaderAnimation = () => {
    const progress = Math.max(0, (scrollY - sectionTop) / (window.innerHeight * 0.8));
    const opacity = Math.max(0.1, 1 - progress * 0.9);
    const translateY = progress * -50;
    
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
    };
  };

  // Card animation with parallax and 3D effects
  const getCardAnimation = (index: number) => {
    const isActive = index === activeCardIndex;
    const progress = Math.max(0, (scrollY - sectionTop) / (window.innerHeight * services.length));
    const cardProgress = Math.max(0, Math.min(1, (progress * services.length) - index));
    
    if (!isActive) {
      return {
        opacity: 0,
        transform: 'translateY(100px) scale(0.8) rotateX(15deg)',
        zIndex: 1,
      };
    }

    // Active card animations
    const scale = 0.9 + (cardProgress * 0.1);
    const rotateX = 15 - (cardProgress * 15);
    const rotateZ = Math.sin(cardProgress * Math.PI) * 2;
    const translateY = 50 - (cardProgress * 50);
    const translateX = Math.sin(cardProgress * Math.PI * 0.5) * 10;

    return {
      opacity: Math.min(1, cardProgress * 2),
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
      zIndex: 10,
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      id="services"
      style={{ 
        height: `${100 * (services.length + 1)}vh` // +1 for intro space
      }}
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-200/40 to-blue-200/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-gradient-to-r from-purple-200/35 to-pink-200/35 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Section Header - Fixed at top */}
      <div 
        className="fixed top-20 left-0 right-0 z-20 text-center pointer-events-none"
        style={getHeaderAnimation()}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 cinematic-title">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Stories in every frame. Impact in every second.
          </p>
        </div>
      </div>

      {/* Single Card Display - Fixed Center */}
      <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative w-full max-w-2xl mx-auto px-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardStyle = getCardAnimation(index);
            
            return (
              <div
                key={service.title}
                className="absolute inset-0 transition-all duration-1000 ease-out transform-gpu"
                style={cardStyle}
              >
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  {/* Gradient Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  
                  {/* Motion Shadow */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${service.gradient} opacity-20 blur-xl -z-10`}></div>
                  
                  {/* Floating Icon Background */}
                  <div className="absolute top-8 right-8 opacity-5">
                    <Icon className="w-32 h-32 text-gray-900" />
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-12 text-center">
                    {/* Animated Icon */}
                    <div 
                      className={`inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-xl mb-8 transform transition-all duration-700`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 cinematic-title">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xl text-gray-600 leading-relaxed font-light max-w-lg mx-auto">
                      {service.description}
                    </p>
                    
                    {/* Decorative Line */}
                    <div 
                      className={`mt-8 h-1 bg-gradient-to-r ${service.gradient} rounded-full mx-auto transition-all duration-1000`}
                      style={{ width: '120px' }}
                    ></div>
                  </div>
                  
                  {/* Enhanced Glow Effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 transition-opacity duration-500`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col space-y-4">
          <div className="text-xs text-gray-500 font-medium mb-2 rotate-90 origin-center whitespace-nowrap">
            {activeCardIndex + 1} / {services.length}
          </div>
          {services.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-12 rounded-full transition-all duration-500 ${
                index === activeCardIndex 
                  ? 'bg-gradient-to-b from-blue-500 to-purple-600 shadow-lg' 
                  : index < activeCardIndex
                  ? 'bg-gray-400'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
