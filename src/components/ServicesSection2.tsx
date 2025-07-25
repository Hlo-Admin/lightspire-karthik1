import { useEffect, useRef, useState } from "react";
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from "lucide-react";
import { TypingAnimation } from "./magicui/typing-animation";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";

const ServicesSection2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      icon: Tv,
      title: "TV Animated Series",
      description:"We produce high quality 2D animated series for television with engaging characters and storytelling.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "OTT & Web Series",
      description:
        "We create binge worthy animated content tailored for OTT and web platforms.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Film,
      title: "Feature Films",
      description: "We develop full length 2D animated films with cinematic visuals and strong narratives.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Megaphone,
      title: "Ad Animations",
      description: "We design short, impactful animated ads for brands and campaigns.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Users,
      title: "International Co-Productions",
      description: "We partner with global studios to co create culturally relevant animated content.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Smartphone,
      title: "Social Media Creatives",
      description: "We deliver eye catching animated content optimized for social media engagement.",
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white bg-gradient-to-b from-white via-white to-white py-24 overflow-hidden"
      id="services"
      style={{
        clipPath: "polygon(0 0, 100% 3vw, 100% 100%, 0 calc(100% - 3vw))",
        paddingBottom: "6rem", // adjust as needed
      }}
    >
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative transform transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:-translate-x-1">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Animated Icon */}
                    <div
                      className={`inline-flex w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl items-center justify-center shadow-lg mb-4 sm:mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 bg-[#0678cf]`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-2 sm:mb-4 cinematic-title group-hover:text-gray-800 transition-colors duration-300">
                      {isVisible ? (
                        <TypingAnimation startOnView duration={60}>
                          {service.title}
                        </TypingAnimation>
                      ) : (
                        service.title
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div
                      className={`
                        absolute bottom-0 left-0 h-1 
                        bg-gray-200 
                        w-0 group-hover:w-full 
                        group-hover:bg-[#0678cf]
                        transition-all duration-500 rounded-full
                      `}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      {/* Bottom Slant SVG Line */}
      <svg
        className="absolute left-0 bottom-0 w-full h-[3vw] pointer-events-none transition-all duration-2000"
        style={{ zIndex: 20 }}
        width="100%"
        height="3vw"
        viewBox="0 0 100 3"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="3"
          stroke="white" // Tailwind's gray-200, adjust as needed
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset="0"
          style={{
            transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </svg>
    </section>
  );
};

export default ServicesSection2;
