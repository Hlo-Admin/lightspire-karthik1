
import { useEffect, useRef, useState } from 'react';
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from 'lucide-react';

const ServicesSection2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

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

  // Calculate individual card animation based on scroll position
  const getCardTransform = (index: number) => {
    const scrollProgress = Math.max(0, scrollY - sectionTop + window.innerHeight * 0.3);
    const cardTrigger = index * 200; // Each card triggers 200px apart
    const cardProgress = Math.max(0, Math.min(1, (scrollProgress - cardTrigger) / 300));
    
    // Different animation styles for each card
    const animationStyles = [
      // Card 0: Slide in from left with rotation
      {
        transform: `translateX(${(1 - cardProgress) * -100}px) rotateY(${(1 - cardProgress) * -15}deg) scale(${0.8 + cardProgress * 0.2})`,
        opacity: cardProgress
      },
      // Card 1: Slide in from right with zoom
      {
        transform: `translateX(${(1 - cardProgress) * 100}px) scale(${0.7 + cardProgress * 0.3}) rotateZ(${(1 - cardProgress) * 5}deg)`,
        opacity: cardProgress
      },
      // Card 2: Zoom in from center
      {
        transform: `scale(${0.6 + cardProgress * 0.4}) translateY(${(1 - cardProgress) * 50}px)`,
        opacity: cardProgress
      },
      // Card 3: Slide up with rotation
      {
        transform: `translateY(${(1 - cardProgress) * 80}px) rotateX(${(1 - cardProgress) * 20}deg) scale(${0.8 + cardProgress * 0.2})`,
        opacity: cardProgress
      },
      // Card 4: Slide in from left with perspective
      {
        transform: `translateX(${(1 - cardProgress) * -120}px) rotateY(${(1 - cardProgress) * 25}deg) scale(${0.7 + cardProgress * 0.3})`,
        opacity: cardProgress
      },
      // Card 5: Final dramatic entrance
      {
        transform: `translateY(${(1 - cardProgress) * 100}px) scale(${0.5 + cardProgress * 0.5}) rotateZ(${(1 - cardProgress) * -10}deg)`,
        opacity: cardProgress
      }
    ];

    return animationStyles[index] || animationStyles[0];
  };

  // Calculate icon animation
  const getIconTransform = (index: number) => {
    const scrollProgress = Math.max(0, scrollY - sectionTop + window.innerHeight * 0.3);
    const cardTrigger = index * 200;
    const iconProgress = Math.max(0, Math.min(1, (scrollProgress - cardTrigger + 100) / 200));
    
    return {
      transform: `rotate(${iconProgress * 360}deg) scale(${0.8 + iconProgress * 0.2})`,
      opacity: 0.7 + iconProgress * 0.3
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-32 min-h-screen overflow-hidden"
      id="services-2"
      style={{ perspective: '1000px' }}
    >
      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 cinematic-title">
            Our Services
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 font-light italic">
            Stories in every frame. Impact in every second.
          </p>
        </div>
      </div>

      {/* Animated Cards Container */}
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardStyle = getCardTransform(index);
            const iconStyle = getIconTransform(index);
            
            return (
              <div
                key={service.title}
                className="relative"
                style={{
                  transform: cardStyle.transform,
                  opacity: cardStyle.opacity,
                  transition: 'all 0.1s ease-out'
                }}
              >
                <div className={`relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mx-auto max-w-2xl ${
                  index % 2 === 0 ? 'ml-0' : 'mr-0'
                }`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`}></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-12 text-center">
                    {/* Animated Icon */}
                    <div 
                      className={`inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-2xl mb-8 mx-auto`}
                      style={{
                        transform: iconStyle.transform,
                        opacity: iconStyle.opacity,
                        transition: 'all 0.2s ease-out'
                      }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-4xl font-bold text-gray-900 mb-6 cinematic-title">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xl text-gray-600 leading-relaxed font-light max-w-lg mx-auto">
                      {service.description}
                    </p>

                    {/* Decorative Element */}
                    <div className={`w-24 h-1 bg-gradient-to-r ${service.gradient} mx-auto mt-8 rounded-full`}></div>
                  </div>

                  {/* Floating Orbs for Depth */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-float"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Elements for Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
    </section>
  );
};

export default ServicesSection2;
