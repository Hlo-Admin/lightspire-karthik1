
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
    const progress = Math.max(0, (scrollY - sectionTop) / window.innerHeight);
    const cardStart = index * 0.8; // Increased spacing between cards
    const cardDuration = 1.2; // Longer duration for smoother transitions
    const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / cardDuration));
    
    // Slower exit - card stays visible longer
    const exitStart = cardStart + cardDuration + 0.5; // Stay visible longer
    const exitDuration = 0.8; // Slower exit
    const exitProgress = Math.max(0, Math.min(1, (progress - exitStart) / exitDuration));
    
    // Calculate final opacity (slower fade out)
    const entranceOpacity = Math.pow(cardProgress, 0.3); // Smoother entrance
    const exitOpacity = 1 - Math.pow(exitProgress, 2); // Slower exit
    const finalOpacity = entranceOpacity * exitOpacity;
    
    // Alternating left/right entrance from completely outside
    const isEven = index % 2 === 0;
    const slideDistance = window.innerWidth * 0.7; // Start from 70% outside viewport
    const translateX = (1 - cardProgress) * (isEven ? -slideDistance : slideDistance);
    const translateY = (1 - cardProgress) * 60 + (exitProgress * 40); // Slower vertical movement
    
    // Enhanced parallax effect
    const parallaxOffset = (scrollY - sectionTop) * (isEven ? 0.1 : -0.1);
    
    // Smoother scale animation
    const scale = 0.8 + cardProgress * 0.2; // Scale from 80% to 100%
    const rotateY = (1 - cardProgress) * (isEven ? -20 : 20); // 3D rotation
    const rotateZ = (1 - cardProgress) * (isEven ? 5 : -5); // Z rotation
    
    // Bounce effect at the end (less pronounced)
    const bounceEffect = cardProgress > 0.9 ? Math.sin((cardProgress - 0.9) * 30) * 3 : 0;
    
    return {
      transform: `translate3d(${translateX + parallaxOffset}px, ${translateY + bounceEffect}px, 0) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      opacity: finalOpacity,
      filter: `blur(${(1 - cardProgress) * 5 + exitProgress * 3}px)`,
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
      className="relative min-h-[500vh] bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      id="services"
    >
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

      {/* Service Cards - Enhanced Parallax */}
      <div className="relative py-20" style={{ perspective: '1500px' }}>
        <div className="max-w-4xl mx-auto px-6 space-y-60">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardStyle = getCardAnimation(index);
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={service.title}
                className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}
                style={cardStyle}
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 w-full max-w-3xl transform-gpu">
                  {/* Enhanced background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  
                  {/* Animated floating icon background */}
                  <div 
                    className={`absolute top-8 ${isEven ? 'right-8' : 'left-8'} opacity-10 transition-all duration-1000`}
                    style={{
                      transform: `rotate(${cardStyle.opacity * 360}deg) scale(${0.8 + cardStyle.opacity * 0.4})`
                    }}
                  >
                    <Icon className="w-32 h-32 text-gray-900" />
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-12 md:p-16">
                    <div className={`flex items-start space-x-6 ${isEven ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      {/* Enhanced animated icon */}
                      <div 
                        className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg transition-all duration-1000`}
                        style={{
                          transform: `scale(${0.7 + cardStyle.opacity * 0.3}) rotate(${cardStyle.opacity * 8}deg)`,
                          boxShadow: `0 0 ${cardStyle.opacity * 25}px rgba(59, 130, 246, 0.4)`
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Text content with enhanced animations */}
                      <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                        <h3 
                          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000"
                          style={{
                            transform: `translateY(${(1 - cardStyle.opacity) * 15}px)`,
                            opacity: cardStyle.opacity
                          }}
                        >
                          {service.title}
                        </h3>
                        <p 
                          className="text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-1000 delay-300"
                          style={{
                            transform: `translateY(${(1 - cardStyle.opacity) * 20}px)`,
                            opacity: cardStyle.opacity
                          }}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced decorative line with animation */}
                    <div 
                      className={`mt-8 h-1 bg-gradient-to-r ${service.gradient} rounded-full transition-all duration-1200 delay-600 ${isEven ? '' : 'ml-auto'}`}
                      style={{
                        width: `${cardStyle.opacity * 100}%`,
                        boxShadow: `0 0 ${cardStyle.opacity * 12}px rgba(59, 130, 246, 0.3)`
                      }}
                    ></div>
                  </div>
                  
                  {/* Enhanced glow effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-all duration-1000 pointer-events-none`}
                    style={{
                      opacity: cardStyle.opacity * 0.08,
                      filter: `blur(${(1 - cardStyle.opacity) * 15}px)`
                    }}
                  ></div>

                  {/* Animated border glow */}
                  <div 
                    className={`absolute inset-0 rounded-3xl transition-all duration-1000 pointer-events-none`}
                    style={{
                      boxShadow: `inset 0 0 ${cardStyle.opacity * 30}px rgba(59, 130, 246, 0.15), 0 0 ${cardStyle.opacity * 50}px rgba(59, 130, 246, 0.08)`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced bottom spacing */}
      <div className="h-40"></div>
    </section>
  );
};

export default ServicesSection;
