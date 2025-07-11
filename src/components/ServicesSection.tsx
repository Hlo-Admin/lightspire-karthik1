
import { useEffect, useRef, useState } from 'react';
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from 'lucide-react';

const ServicesSection = () => {
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

  // Calculate current active card based on scroll progress
  const getCurrentCardIndex = () => {
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * services.length;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
    return Math.min(Math.floor(scrollProgress * services.length), services.length - 1);
  };

  // Calculate scroll progress for the progress bar
  const getScrollProgress = () => {
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * services.length;
    const progress = Math.max(0, Math.min(100, ((scrollY - sectionTop) / sectionHeight) * 100));
    return progress;
  };

  // Calculate position for each card based on continuous scroll
  const getCardPosition = (index: number) => {
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * services.length;
    const scrollProgress = Math.max(0, (scrollY - sectionTop) / sectionHeight);
    
    // Calculate how far along we are in the entire sequence
    const totalProgress = scrollProgress * services.length;
    
    // Calculate this card's position relative to center
    const cardOffset = totalProgress - index;
    
    // Start with first card at center (cardOffset = 0)
    let translateX = -cardOffset * 120; // 120% spacing between cards
    let opacity = 1;
    let scale = 1;
    let rotateY = 0;
    let zIndex = 1;

    // Card is approaching center from right
    if (cardOffset < 0) {
      opacity = Math.max(0, 1 + cardOffset * 2); // Fade in as it approaches
      scale = 0.8 + Math.max(0, 1 + cardOffset) * 0.2;
      rotateY = Math.max(-15, cardOffset * 15);
    }
    // Card is at or near center
    else if (cardOffset >= 0 && cardOffset <= 1) {
      const centerDistance = Math.abs(cardOffset - 0.5);
      opacity = Math.max(0.3, 1 - centerDistance * 1.5);
      scale = 0.9 + (1 - centerDistance * 2) * 0.1;
      rotateY = (cardOffset - 0.5) * 10;
      
      // Higher z-index for centered card
      if (centerDistance < 0.5) {
        zIndex = 10;
      }
    }
    // Card is moving away to the left
    else {
      const exitProgress = cardOffset - 1;
      opacity = Math.max(0, 1 - exitProgress * 2);
      scale = Math.max(0.7, 1 - exitProgress * 0.3);
      rotateY = Math.min(15, exitProgress * 15);
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: Math.max(0, opacity),
      zIndex,
    };
  };

  // Background parallax elements
  const getBackgroundElementStyle = (index: number) => {
    const speed = 0.1 + (index * 0.05);
    const translateX = -(scrollY - sectionTop) * speed * 0.1;
    return {
      transform: `translateX(${translateX}px)`,
      opacity: 0.2 - (index * 0.03),
    };
  };

  const currentCardIndex = getCurrentCardIndex();

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden"
      id="services"
      style={{ 
        height: `${100 * services.length}vh` // One viewport height per card
      }}
    >
      {/* Moving Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating background shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-2xl"
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 18}%`,
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
              {currentCardIndex + 1} of {services.length}
            </div>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="relative w-full max-w-4xl mx-auto px-6 perspective-1000">
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardStyle = getCardPosition(index);
            
            return (
              <div
                key={service.title}
                className="absolute inset-0 transition-all duration-500 ease-out transform-gpu"
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
              transform: `translateX(${-(scrollY - sectionTop) * (0.2 + i * 0.03)}px)`,
              opacity: 0.4 - (i * 0.03),
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
