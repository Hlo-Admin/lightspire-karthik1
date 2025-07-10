
import { useEffect, useRef, useState } from 'react';
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from 'lucide-react';

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

  const getCardAnimation = (index: number) => {
    const progress = Math.max(0, (scrollY - sectionTop + window.innerHeight * 0.5) / (window.innerHeight * 2));
    const cardStart = index * 0.15; // Cards appear more frequently
    const cardEnd = cardStart + 0.4; // Longer visibility window
    const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));
    
    // Alternating left/right entrance from far outside
    const isEven = index % 2 === 0;
    const slideDistance = window.innerWidth * 0.8; // Start from 80% outside viewport
    const translateX = (1 - cardProgress) * (isEven ? -slideDistance : slideDistance);
    
    // Enhanced vertical movement with bounce effect
    const bounceHeight = 60;
    const bounceProgress = Math.sin(cardProgress * Math.PI);
    const translateY = (1 - cardProgress) * bounceHeight - bounceProgress * 15;
    
    // Complex parallax effect with floating motion
    const parallaxOffset = (scrollY - sectionTop) * (isEven ? 0.08 : -0.08);
    const floatOffset = Math.sin((scrollY + index * 100) * 0.01) * 5;
    
    // Enhanced opacity with smooth fade
    const opacity = Math.pow(cardProgress, 0.5);
    
    // Dynamic scaling with elastic effect
    const elasticScale = cardProgress < 0.8 
      ? cardProgress * 1.1 
      : 1.1 - (cardProgress - 0.8) * 0.5;
    const scale = 0.7 + elasticScale * 0.3;
    
    // 3D rotation effects
    const rotateY = (1 - cardProgress) * (isEven ? -25 : 25);
    const rotateX = (1 - cardProgress) * 10;
    const rotateZ = Math.sin(cardProgress * Math.PI) * (isEven ? 3 : -3);
    
    // Blur effect for depth
    const blur = (1 - cardProgress) * 8;
    
    // Glow intensity
    const glowIntensity = cardProgress * (1 + Math.sin((scrollY + index * 200) * 0.02) * 0.3);
    
    return {
      transform: `translate3d(${translateX + parallaxOffset}px, ${translateY + floatOffset}px, 0) 
                  scale(${scale}) 
                  rotateY(${rotateY}deg) 
                  rotateX(${rotateX}deg) 
                  rotateZ(${rotateZ}deg)`,
      opacity,
      filter: `blur(${blur}px)`,
      boxShadow: `0 ${20 + glowIntensity * 20}px ${40 + glowIntensity * 30}px rgba(0, 0, 0, ${0.1 + glowIntensity * 0.15}), 
                  0 0 ${30 + glowIntensity * 50}px rgba(59, 130, 246, ${glowIntensity * 0.3})`,
      transition: cardProgress > 0.9 ? 'all 0.3s ease-out' : 'none',
    };
  };

  const getIconAnimation = (index: number, cardProgress: number) => {
    const iconRotation = cardProgress * 360 + Math.sin((scrollY + index * 150) * 0.015) * 10;
    const iconScale = 0.6 + cardProgress * 0.4 + Math.sin((scrollY + index * 100) * 0.02) * 0.1;
    const iconGlow = cardProgress * (1 + Math.sin((scrollY + index * 180) * 0.025) * 0.5);
    
    return {
      transform: `rotate(${iconRotation}deg) scale(${iconScale})`,
      filter: `drop-shadow(0 0 ${10 + iconGlow * 20}px rgba(255, 255, 255, ${iconGlow * 0.8}))`,
      transition: 'transform 0.1s ease-out',
    };
  };

  const getTextAnimation = (cardProgress: number, delay: number = 0) => {
    const textProgress = Math.max(0, Math.min(1, (cardProgress - delay) / (1 - delay)));
    return {
      opacity: textProgress,
      transform: `translateY(${(1 - textProgress) * 20}px) scale(${0.95 + textProgress * 0.05})`,
      transition: cardProgress > 0.8 ? 'all 0.4s ease-out' : 'none',
    };
  };

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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[400vh] bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden"
      id="services"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translateY(${Math.sin((scrollY + i * 200) * 0.005) * 20}px)`,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Stories in every frame. Impact in every second.
          </p>
        </div>
      </div>

      {/* Service Cards - Enhanced Animations */}
      <div className="relative py-20" style={{ perspective: '2000px' }}>
        <div className="max-w-5xl mx-auto px-6 space-y-40">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardStyle = getCardAnimation(index);
            const isEven = index % 2 === 0;
            const progress = Math.max(0, (scrollY - sectionTop + window.innerHeight * 0.5) / (window.innerHeight * 2));
            const cardStart = index * 0.15;
            const cardEnd = cardStart + 0.4;
            const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));
            
            return (
              <div
                key={service.title}
                className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}
                style={{
                  ...cardStyle,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 w-full max-w-4xl transform-gpu">
                  {/* Dynamic gradient overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
                    style={{
                      opacity: 0.03 + cardProgress * 0.07,
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}
                  />
                  
                  {/* Animated border glow */}
                  <div 
                    className={`absolute inset-0 rounded-3xl border-2 bg-gradient-to-r ${service.gradient}`}
                    style={{
                      opacity: cardProgress * 0.6,
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                      animation: cardProgress > 0.5 ? 'spin 8s linear infinite' : 'none',
                    }}
                  />
                  
                  {/* Floating icon background with enhanced animation */}
                  <div 
                    className={`absolute top-8 ${isEven ? 'right-8' : 'left-8'} opacity-5`}
                    style={{
                      transform: `scale(${0.8 + cardProgress * 0.4}) rotate(${cardProgress * 15}deg)`,
                    }}
                  >
                    <Icon className="w-40 h-40 text-gray-900" />
                  </div>
                  
                  {/* Card content with staggered animations */}
                  <div className="relative z-10 p-12 md:p-20">
                    <div className={`flex items-start space-x-8 ${isEven ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      {/* Enhanced animated icon */}
                      <div 
                        className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl relative overflow-hidden`}
                        style={getIconAnimation(index, cardProgress)}
                      >
                        {/* Icon glow effect */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-xl`}
                          style={{ opacity: cardProgress * 0.6 }}
                        />
                        <Icon className="w-10 h-10 text-white relative z-10" />
                        
                        {/* Sparkle effects */}
                        {cardProgress > 0.7 && (
                          <>
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping" />
                            <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
                          </>
                        )}
                      </div>
                      
                      {/* Enhanced text content */}
                      <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                        <h3 
                          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                          style={getTextAnimation(cardProgress, 0.1)}
                        >
                          {service.title}
                        </h3>
                        <p 
                          className="text-xl md:text-2xl text-gray-600 leading-relaxed"
                          style={getTextAnimation(cardProgress, 0.2)}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced decorative line with wave effect */}
                    <div 
                      className={`mt-10 h-1 bg-gradient-to-r ${service.gradient} rounded-full relative overflow-hidden ${isEven ? '' : 'ml-auto'}`}
                      style={{
                        width: `${Math.min(100, cardProgress * 120)}%`,
                        ...getTextAnimation(cardProgress, 0.3)
                      }}
                    >
                      {/* Moving shimmer effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
                        style={{
                          transform: `translateX(${cardProgress * 200 - 50}%)`,
                          transition: 'transform 0.1s ease-out',
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Enhanced interaction glow */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 hover:opacity-5 transition-all duration-700 pointer-events-none rounded-3xl`}
                    style={{
                      background: `radial-gradient(circle at center, var(--tw-gradient-stops))`,
                    }}
                  />
                  
                  {/* Particle effects for high progress cards */}
                  {cardProgress > 0.8 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${10 + i * 20}%`,
                            animationDelay: `${i * 0.3}s`,
                            opacity: 0.6,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-32"></div>
    </section>
  );
};

export default ServicesSection;
