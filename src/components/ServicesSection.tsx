
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
    const cardProgress = Math.max(0, Math.min(1, progress - index * 0.8)); // More spacing between card triggers
    
    // Circular arc animation - starts from side/top and orbits to center
    const angle = (1 - cardProgress) * Math.PI; // Half circle
    const radius = 300 * (1 - cardProgress); // Radius for arc
    const translateX = Math.cos(angle) * radius;
    const translateY = Math.sin(angle) * radius * 0.3; // Flatter arc
    
    const opacity = cardProgress;
    const scale = 0.7 + cardProgress * 0.3;
    const rotateZ = (1 - cardProgress) * 45; // Rotation during orbit
    
    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotateZ(${rotateZ}deg)`,
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
      className="relative bg-gradient-to-b from-gray-50 to-white py-20"
      id="services"
    >
      {/* Section Header */}
      <div className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Stories in every frame. Impact in every second.
          </p>
        </div>
      </div>

      {/* Service Cards - Stacked Vertically */}
      <div className="relative space-y-40">
        {services.map((service, index) => {
          const Icon = service.icon;
          const cardStyle = getCardAnimation(index);
          
          return (
            <div
              key={service.title}
              className="relative"
              style={cardStyle}
            >
              <div className="flex justify-center px-6">
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-2xl w-full">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  
                  {/* Floating icon background */}
                  <div className="absolute top-8 right-8 opacity-10">
                    <Icon className="w-32 h-32 text-gray-900" />
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-12 md:p-16">
                    <div className="flex items-start space-x-6">
                      {/* Animated icon */}
                      <div 
                        className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        style={{
                          transform: `scale(${0.8 + cardStyle.opacity * 0.2}) rotate(${(1 - cardStyle.opacity) * 10}deg)`
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Text content */}
                      <div className="flex-1">
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
                      className={`mt-8 h-1 bg-gradient-to-r ${service.gradient} rounded-full`}
                      style={{
                        width: `${cardStyle.opacity * 100}%`,
                        transition: 'width 0.6s ease-out'
                      }}
                    ></div>
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </section>
  );
};

export default ServicesSection;
