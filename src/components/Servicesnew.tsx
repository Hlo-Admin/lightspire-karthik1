import { useEffect, useRef, useState } from "react";
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from "lucide-react";
import { HyperText } from "./magicui/hyper-text";
import ScrollStack, {
  ScrollStackItem,
} from "../../Components/ScrollStack/ScrollStack";

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

  useEffect(() => {
    // Scroll to the section on mount
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-200 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 py-24 overflow-hidden"
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

      {/* Services ScrollStack */}
      <div
        className="relative w-full mx-0 z-10"
        style={{
          height: "600px",
          paddingLeft: 0,
          paddingRight: 0,
          maxWidth: "100vw",
        }}
      >
        <div className="flex justify-center mb-4">
          <span className="animate-bounce text-2xl text-blue-500">
            ↓ Scroll
          </span>
        </div>
        <ScrollStack
          itemDistance={60}
          itemScale={0.04}
          baseScale={0.92}
          className="h-full"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollStackItem
                key={service.title}
                itemClassName="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-8 flex flex-col items-center text-center"
              >
                <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center shadow-lg mb-6 bg-[#0678cf]">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 cinematic-title">
                  {service.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed font-light">
                  {service.description}
                </p>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
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
          stroke="gray-200" // Tailwind's gray-200, adjust as needed
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
