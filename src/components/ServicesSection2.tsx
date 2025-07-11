
import { useEffect, useRef, useState } from 'react';
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from 'lucide-react';

const ServicesSection2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      icon: Tv,
      title: "TV Animated Series",
      description: "High-quality 2D/3D animated series for broadcast platforms.",
      gradient: "from-blue-500 to-purple-600",
      animation: "slide-left"
    },
    {
      icon: Globe,
      title: "OTT & Web Series", 
      description: "Visually compelling content for streaming platforms and web.",
      gradient: "from-cyan-500 to-blue-600",
      animation: "slide-right"
    },
    {
      icon: Film,
      title: "Feature Films",
      description: "Full-scale animation and VFX for theatrical storytelling.",
      gradient: "from-purple-500 to-pink-600",
      animation: "zoom-in"
    },
    {
      icon: Megaphone,
      title: "Ad Animations",
      description: "Dynamic commercials and brand storytelling in motion.",
      gradient: "from-orange-500 to-red-600",
      animation: "slide-up"
    },
    {
      icon: Users,
      title: "International Co-Productions",
      description: "Collaborative cross-border projects with creative synergy.",
      gradient: "from-green-500 to-emerald-600",
      animation: "rotate-in"
    },
    {
      icon: Smartphone,
      title: "Social Media Creatives",
      description: "Short-form animations tailored for digital platforms.",
      gradient: "from-pink-500 to-rose-600",
      animation: "scale-in"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const getCardTransform = (index: number, animationType: string) => {
    if (!isVisible) return {};
    
    const scrollProgress = Math.max(0, scrollY - (sectionRef.current?.offsetTop || 0) + window.innerHeight * 0.3);
    const cardDelay = index * 200;
    const progress = Math.max(0, scrollProgress - cardDelay) / 500;
    const clampedProgress = Math.min(1, progress);

    const animations = {
      'slide-left': {
        transform: `translateX(${(1 - clampedProgress) * -100}px) translateY(${(1 - clampedProgress) * 30}px)`,
        opacity: clampedProgress
      },
      'slide-right': {
        transform: `translateX(${(1 - clampedProgress) * 100}px) translateY(${(1 - clampedProgress) * 30}px)`,
        opacity: clampedProgress
      },
      'zoom-in': {
        transform: `scale(${0.8 + (clampedProgress * 0.2)}) translateY(${(1 - clampedProgress) * 50}px)`,
        opacity: clampedProgress
      },
      'slide-up': {
        transform: `translateY(${(1 - clampedProgress) * 80}px)`,
        opacity: clampedProgress
      },
      'rotate-in': {
        transform: `rotate(${(1 - clampedProgress) * 15}deg) translateY(${(1 - clampedProgress) * 40}px)`,
        opacity: clampedProgress
      },
      'scale-in': {
        transform: `scale(${0.7 + (clampedProgress * 0.3)}) rotate(${(1 - clampedProgress) * -10}deg)`,
        opacity: clampedProgress
      }
    };

    return animations[animationType as keyof typeof animations] || animations['slide-up'];
  };

  const getIconRotation = (index: number) => {
    if (!isVisible) return 0;
    const scrollProgress = Math.max(0, scrollY - (sectionRef.current?.offsetTop || 0) + window.innerHeight * 0.3);
    const cardDelay = index * 200;
    const progress = Math.max(0, scrollProgress - cardDelay) / 300;
    return Math.min(360, progress * 360);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 py-24 overflow-hidden"
      id="services-premium"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-md animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-200/30 to-red-300/30 rounded-full blur-lg animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 cinematic-title">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            We bring stories to life across every screen and platform.
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardStyle = getCardTransform(index, service.animation);
            
            return (
              <div
                key={service.title}
                className="group relative"
                style={{
                  ...cardStyle,
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Animated Icon */}
                    <div 
                      className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-all duration-500`}
                      style={{
                        transform: `rotate(${getIconRotation(index)}deg)`,
                        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 cinematic-title group-hover:text-gray-800 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base text-gray-600 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} w-0 group-hover:w-full transition-all duration-500 rounded-full`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ServicesSection2;
