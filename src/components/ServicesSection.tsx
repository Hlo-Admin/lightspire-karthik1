
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

  // Calculate which card should be active and scroll progress
  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * (services.length + 1); // Extra space for smooth transitions
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
    const cardIndex = Math.min(Math.floor(scrollProgress * services.length), services.length - 1);
    setActiveCardIndex(Math.max(0, cardIndex));
  }, [scrollY, sectionTop, services.length]);

  // Calculate scroll progress for the progress bar
  const getScrollProgress = () => {
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * (services.length + 1);
    return Math.max(0, Math.min(100, ((scrollY - sectionTop) / sectionHeight) * 100));
  };

  // Calculate horizontal position for each card
  const getCardPosition = (index: number) => {
    const progress = Math.max(0, (scrollY - sectionTop) / (window.innerHeight * (services.length + 1)));
    const cardProgress = (progress * services.length) - index;
    
    // Cards come from right, center, then exit to left
    let translateX = 100; // Start off-screen right
    let opacity = 0;
    let scale = 0.8;
    let rotateY = 15;

    if (cardProgress >= 0 && cardProgress <= 1) {
      // Card is transitioning in or centered
      translateX = 100 - (cardProgress * 200); // Move from right (100) to left (-100)
      
      // Opacity and scale based on distance from center
      const distanceFromCenter = Math.abs(0.5 - cardProgress);
      opacity = Math.max(0, 1 - (distanceFromCenter * 4));
      scale = 0.8 + (1 - distanceFromCenter * 2) * 0.4;
      rotateY = (0.5 - cardProgress) * 30;
    } else if (cardProgress > 1) {
      // Card has exited to the left
      translateX = -100;
      opacity = 0;
      scale = 0.8;
      rotateY = -15;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex: opacity > 0.5 ? 10 : 1,
    };
  };

  // Background parallax elements
  const getBackgroundElementStyle = (index: number) => {
    const speed = 0.2 + (index * 0.1);
    const translateX = -(scrollY - sectionTop) * speed * 0.1;
    return {
      transform: `translateX(${translateX}px)`,
      opacity: 0.3 - (index * 0.1),
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden"
      id="services"
      style={{ 
        height: `${100 * (services.length + 2)}vh` // Extra height for smooth scrolling
      }}
    >
      {/* Moving Background Elements - Train Track Metaphor */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating background shapes */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-2xl"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              ...getBackgroundElementStyle(i),
            }}
          />
        ))}
        
        {/* Train track lines */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* Sticky Header */}
      <div className="sticky top-20 z-30 text-center py-12 bg-gradient-to-b from-white/90 to-transparent backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 cinematic-title">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            A journey through animation, design, and visual magic.
          </p>
          
          {/* Horizontal Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
                style={{ width: `${getScrollProgress()}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {activeCardIndex + 1} of {services.length}
            </div>
          </div>
        </div>
      </div>

      {/* Cards Container - Train Cars */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="relative w-full max-w-4xl mx-auto px-6 perspective-1000">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardStyle = getCardPosition(index);
            
            return (
              <div
                key={service.title}
                className="absolute inset-0 transition-all duration-700 ease-out transform-gpu"
                style={cardStyle}
              >
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 overflow-hidden max-w-2xl mx-auto">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  
                  {/* Motion Glow */}
                  <div className={`absolute -inset-8 bg-gradient-to-br ${service.gradient} opacity-20 blur-2xl transition-all duration-700`}></div>
                  
                  {/* Floating Icon Background */}
                  <div className="absolute top-8 right-8 opacity-5">
                    <Icon className="w-24 h-24 text-gray-900" />
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-12 text-center">
                    {/* Animated Icon */}
                    <div 
                      className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-xl mb-6 transform transition-all duration-500 hover:scale-110 hover:rotate-12`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 cinematic-title">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed font-light max-w-md mx-auto">
                      {service.description}
                    </p>
                    
                    {/* Decorative Line */}
                    <div 
                      className={`mt-6 h-1 bg-gradient-to-r ${service.gradient} rounded-full mx-auto transition-all duration-1000`}
                      style={{ width: '80px' }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speed Lines Effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
            style={{
              top: `${15 + i * 10}%`,
              left: '0%',
              right: '0%',
              transform: `translateX(${-(scrollY - sectionTop) * (0.3 + i * 0.05)}px)`,
              opacity: 0.6 - (i * 0.05),
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
