import { useEffect, useRef, useState } from "react";
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from "lucide-react";

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  const services = [
    {
      icon: Tv,
      title: "TV Animated Series",
      description: "High-quality 2D/3D animated series for broadcast networks.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "Animation for OTT & WEB Series",
      description: "Stylized content for streaming and digital media.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Film,
      title: "Animated Features Films",
      description: "End-to-end cinematic VFX and animation.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Megaphone,
      title: "Ad Animations",
      description: "Short, sharp brand storytelling in motion.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Users,
      title: "Co-Productions for International & Domestic",
      description: "Collaborative animation across borders.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Smartphone,
      title: "Social Media Creatives",
      description: "Snackable animated content for social platforms.",
      gradient: "from-pink-500 to-rose-600",
    },
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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateSectionTop);
    updateSectionTop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSectionTop);
    };
  }, []);

  // Calculate parallax movement - cards move from right to left with first card starting from center
  const getParallaxOffset = () => {
    const scrollProgress = Math.max(
      0,
      scrollY - sectionTop + window.innerHeight * 0.5
    );
    const baseOffset = window.innerWidth * 0.3; // Start first card from center
    const scrollMultiplier = 0.8; // Speed of parallax movement
    return baseOffset - scrollProgress * scrollMultiplier;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20"
     
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 cinematic-title">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            A journey through animation, design, and visual magic.
          </p>
        </div>
      </div>

      {/* Cards Container with Horizontal Parallax */}
      <div className="relative overflow-hidden h-96">
        <div
          className="flex absolute top-0 transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(${getParallaxOffset()}px)`,
            width: `${services.length * 320}px`, // Fixed width for seamless movement
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div key={service.title} className="flex-shrink-0 w-80 h-80 mr-0">
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 text-center h-full flex flex-col justify-center">
                    {/* Icon */}
                    <div
                      className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-lg mb-6 mx-auto`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 cinematic-title">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-600 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
