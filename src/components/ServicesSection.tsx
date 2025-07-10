
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

  const getCardFocus = (index: number) => {
    const progress = Math.max(0, (scrollY - sectionTop) / window.innerHeight);
    const cardCenter = index + 1; // Cards are centered at 1vh, 2vh, 3vh etc
    const distance = Math.abs(progress - cardCenter);
    const isInFocus = distance < 0.5;
    
    // Calculate opacity and scale based on distance from center
    const opacity = Math.max(0.2, 1 - distance * 2);
    const scale = isInFocus ? 1 : 0.85;
    const translateY = (distance * 100) * (progress < cardCenter ? -1 : 1);
    const blur = isInFocus ? 0 : Math.min(8, distance * 10);
    
    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      filter: `blur(${blur}px)`,
      transition: 'all 0.3s ease-out',
      zIndex: isInFocus ? 10 : 1,
    };
  };

  const getIconAnimation = (index: number) => {
    const progress = Math.max(0, (scrollY - sectionTop) / window.innerHeight);
    const cardCenter = index + 1;
    const distance = Math.abs(progress - cardCenter);
    const isInFocus = distance < 0.5;
    
    const rotation = isInFocus ? 0 : distance * 20;
    const iconScale = isInFocus ? 1.1 : 0.9;
    
    return {
      transform: `rotate(${rotation}deg) scale(${iconScale})`,
      transition: 'all 0.4s ease-out',
    };
  };

  const services = [
    {
      icon: Tv,
      title: "TV Animated Series",
      description: "High-quality 2D/3D animated series for broadcast networks.",
      gradient: "from-blue-500/20 to-purple-600/20"
    },
    {
      icon: Globe,
      title: "OTT & Web Series",
      description: "Stylized content for streaming and digital media.",
      gradient: "from-cyan-500/20 to-blue-600/20"
    },
    {
      icon: Film,
      title: "Feature Films",
      description: "End-to-end cinematic VFX and animation.",
      gradient: "from-purple-500/20 to-pink-600/20"
    },
    {
      icon: Megaphone,
      title: "Ad Animations",
      description: "Short, sharp brand storytelling in motion.",
      gradient: "from-orange-500/20 to-red-600/20"
    },
    {
      icon: Users,
      title: "International Co-Productions",
      description: "Collaborative animation across borders.",
      gradient: "from-green-500/20 to-emerald-600/20"
    },
    {
      icon: Smartphone,
      title: "Social Media Creatives",
      description: "Snackable animated content for social platforms.",
      gradient: "from-pink-500/20 to-rose-600/20"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white"
      style={{ height: `${(services.length + 1) * 100}vh` }}
      id="services"
    >
      {/* Section Header - Fixed at top */}
      <div className="sticky top-0 z-20 py-20 bg-gradient-to-b from-gray-50 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 cinematic-title">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Designed to move. Engineered to inspire.
          </p>
        </div>
      </div>

      {/* Service Cards Container */}
      <div className="relative">
        {services.map((service, index) => {
          const Icon = service.icon;
          const cardStyle = getCardFocus(index);
          const iconStyle = getIconAnimation(index);
          
          return (
            <div
              key={service.title}
              className="fixed inset-0 flex items-center justify-center px-6"
              style={cardStyle}
            >
              <div className="max-w-2xl w-full">
                {/* Glassmorphism Card */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl`}></div>
                  
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse-glow"></div>
                  
                  {/* Card content */}
                  <div className="relative z-10 text-center">
                    {/* Animated Icon */}
                    <div 
                      className="flex justify-center mb-8"
                      style={iconStyle}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-xl">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Service Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 cinematic-title">
                      {service.title}
                    </h3>
                    
                    {/* Service Description */}
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
