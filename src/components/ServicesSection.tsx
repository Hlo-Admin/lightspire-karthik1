
import { useEffect, useRef } from 'react';
import { ServiceCard } from './ServiceCard';
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from 'lucide-react';

const services = [
  {
    icon: Tv,
    title: "TV Animated Series",
    description: "High-quality 2D/3D animated series for broadcast platforms.",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Globe,
    title: "OTT & Web Series",
    description: "Visually compelling content for streaming platforms and web.",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: Film,
    title: "Feature Films",
    description: "Full-scale animation and VFX for theatrical storytelling.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Megaphone,
    title: "Ad Animations",
    description: "Dynamic commercials and brand storytelling in motion.",
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: Users,
    title: "International Co-Productions",
    description: "Collaborative cross-border projects with creative synergy.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Smartphone,
    title: "Social Media Creatives",
    description: "Short-form animations tailored for digital platforms.",
    gradient: "from-pink-500 to-rose-600"
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe title and subtitle
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    // Observe cards with staggered animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      }
    });

    return () => observer.disconnect();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-6 overflow-hidden"
      id="services"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="opacity-0 text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent cinematic-title"
          >
            Our Services
          </h2>
          <p 
            ref={subtitleRef}
            className="opacity-0 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            We bring stories to life across every screen and platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => setCardRef(el, index)}
              className="opacity-0"
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                gradient={service.gradient}
                delay={index * 200}
              />
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-20 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
