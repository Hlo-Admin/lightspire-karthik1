import { useEffect, useRef, useState } from "react";
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from "lucide-react";

const ServicesSection2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      icon: Tv,
      title: "TV Animated Series",
      description:
        "High-quality 2D/3D animated series for broadcast platforms.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "OTT & Web Series",
      description:
        "Visually compelling content for streaming platforms and web.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Film,
      title: "Feature Films",
      description: "Full-scale animation and VFX for theatrical storytelling.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Megaphone,
      title: "Ad Animations",
      description: "Dynamic commercials and brand storytelling in motion.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Users,
      title: "International Co-Productions",
      description: "Collaborative cross-border projects with creative synergy.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Smartphone,
      title: "Social Media Creatives",
      description: "Short-form animations tailored for digital platforms.",
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
      className="relative bg-[#ffffff] from-gray-50 via-white to-gray-100 py-24 overflow-hidden"
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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full p-8 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:-translate-x-1">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Animated Icon */}
                    <div
                      className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}
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
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} w-0 group-hover:w-full transition-all duration-500 rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>

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
          stroke="#f7f9fa" // Tailwind's gray-200, adjust as needed
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
