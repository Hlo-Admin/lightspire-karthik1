
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
    const sectionHeight = window.innerHeight * 4; // Total section scroll height
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

  // Card animation with arc movement
  const getCardAnimation = (index: number) => {
    const sectionHeight = window.innerHeight * 4;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
    
    // Each card gets 1/6 of the total scroll progress
    const cardStartProgress = index / services.length;
    const cardEndProgress = (index + 1) / services.length;
    
    // Current progress within this card's range
    const cardProgress = Math.max(0, Math.min(1, 
      (scrollProgress - cardStartProgress) / (cardEndProgress - cardStartProgress)
    ));
    
    // Arc movement calculation
    const arcRadius = 300;
    const angle = (1 - cardProgress) * Math.PI * 0.7; // Reduced angle for smoother arc
    const translateX = Math.cos(angle) * arcRadius * (index % 2 === 0 ? -1 : 1);
    const translateY = Math.sin(angle) * arcRadius - arcRadius;
    
    // Scale and rotation for cinematic effect
    const scale = 0.6 + (cardProgress * 0.4);
    const rotateZ = (1 - cardProgress) * (index % 2 === 0 ? -20 : 20);
    const opacity = cardProgress;
    
    // Show card when it's the active one or about to be active
    const isVisible = scrollProgress >= cardStartProgress && scrollProgress < cardEndProgress + 0.1;
    
    // Exit animation for completed cards
    let finalTranslateY = translateY;
    let finalOpacity = opacity;
    
    if (scrollProgress > cardEndProgress) {
      finalTranslateY = translateY - 200; // Exit upward
      finalOpacity = Math.max(0, 1 - (scrollProgress - cardEndProgress) * 10);
    }
    
    return {
      transform: `translate3d(${translateX}px, ${finalTranslateY}px, 0) scale(${scale}) rotateZ(${rotateZ}deg)`,
      opacity: isVisible ? finalOpacity : 0,
      zIndex: services.length - index,
      transition: 'opacity 0.3s ease-out',
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      id="services"
      style={{ 
        perspective: '1200px',
        minHeight: `${services.length * 100}vh` // Height based on number of services
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

      {/* Cards Container */}
      <div className="relative flex items-center justify-center" style={{ minHeight: '100vh' }}>
        {services.map((service, index) => {
          const Icon = service.icon;
          const cardStyle = getCardAnimation(index);
          const isActive = index === activeCardIndex;
          
          return (
            <div
              key={service.title}
              className="absolute w-full max-w-2xl px-6"
              style={cardStyle}
            >
              <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform-gpu ${isActive ? 'shadow-3xl' : ''}`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                
                {/* Floating Icon Background */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Icon className="w-24 h-24 text-gray-900" />
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-12 md:p-16 text-center">
                  {/* Animated Icon */}
                  <div 
                    className={`inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-lg mb-8 transform transition-all duration-500`}
                    style={{
                      transform: `scale(${isActive ? 1.1 : 1}) rotateY(${isActive ? 360 : 0}deg)`
                    }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 cinematic-title">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  {/* Decorative Line */}
                  <div 
                    className={`mt-8 h-1 bg-gradient-to-r ${service.gradient} rounded-full mx-auto transition-all duration-700`}
                    style={{
                      width: isActive ? '100px' : '60px',
                    }}
                  ></div>
                </div>
                
                {/* Glow Effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-opacity duration-500 ${isActive ? 'opacity-10' : 'opacity-0'}`}
                ></div>
              </div>
            </div>
          );
        })}
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

      {/* Bottom Spacing */}
      <div className="h-40"></div>
    </section>
  );
};

export default ServicesSection;
