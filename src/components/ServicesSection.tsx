
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
    const cardStart = index * 0.3; // Cards appear every 30% of scroll
    const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / 0.3));
    
    // Alternating left/right entrance
    const isEven = index % 2 === 0;
    const slideDistance = 120;
    const translateX = (1 - cardProgress) * (isEven ? -slideDistance : slideDistance);
    const translateY = (1 - cardProgress) * 50; // Slight upward movement
    
    // Parallax effect - cards move at different speeds based on position
    const parallaxOffset = (scrollY - sectionTop) * (isEven ? 0.1 : -0.1);
    
    const opacity = cardProgress;
    const scale = 0.85 + cardProgress * 0.15; // Scale from 85% to 100%
    const rotateY = (1 - cardProgress) * (isEven ? -15 : 15); // 3D rotation effect
    
    return {
      transform: `translate3d(${translateX + parallaxOffset}px, ${translateY}px, 0) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
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
      className="relative min-h-[300vh] bg-gradient-to-b from-gray-50 to-white overflow-hidden"
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

      {/* Service Cards - Alternating Parallax */}
      <div className="relative py-20" style={{ perspective: '1000px' }}>
        <div className="max-w-4xl mx-auto px-6 space-y-32">
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
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  
                  {/* Floating icon background */}
                  <div className={`absolute top-8 ${isEven ? 'right-8' : 'left-8'} opacity-10`}>
                    <Icon className="w-32 h-32 text-gray-900" />
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-12 md:p-16">
                    <div className={`flex items-start space-x-6 ${isEven ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      {/* Animated icon */}
                      <div 
                        className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        style={{
                          transform: `scale(${0.8 + cardStyle.opacity * 0.2})`
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Text content */}
                      <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative line */}
                    <div 
                      className={`mt-8 h-1 bg-gradient-to-r ${service.gradient} rounded-full ${isEven ? '' : 'ml-auto'}`}
                      style={{
                        width: `${cardStyle.opacity * 100}%`,
                        transition: 'width 0.6s ease-out'
                      }}
                    ></div>
                  </div>
                  
                  {/* Enhanced glow effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 hover:opacity-10 transition-all duration-700 pointer-events-none`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reduced bottom spacing */}
      <div className="h-20"></div>
    </section>
  );
};

export default ServicesSection;
