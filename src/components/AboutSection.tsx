
import { useEffect, useRef, useState } from 'react';
import { User, Trophy, Tv, Film, Globe, Gamepad2, Smartphone, Users } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const [yearsCount, setYearsCount] = useState(0);

  const domains = [
    { icon: Tv, label: "TV" },
    { icon: Film, label: "Films" },
    { icon: Globe, label: "OTT Platforms" },
    { icon: Gamepad2, label: "Games" },
    { icon: Smartphone, label: "Mobile Apps" }
  ];

  const studios = [
    "TIL Studios",
    "Prime Focus",
    "Sanraa Media",
    "Criya Infotainment",
    "INSCRIBE Graphics",
    "Green Gold Animation",
    "DQ Entertainment",
    "Toonz Media",
    "Pixagon Digital"
  ];

  const leaders = [
    {
      name: "K. Sathiya Narayanan",
      role: "Production Lead",
      description: "Visionary producer with expertise in large-scale animation projects"
    },
    {
      name: "T. Leo Menezes",
      role: "Creative Director",
      description: "Award-winning creative with mastery in storytelling and visual design"
    }
  ];

  // Count-up animation for years
  useEffect(() => {
    if (countStarted && yearsCount < 27) {
      const timer = setTimeout(() => {
        setYearsCount(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [countStarted, yearsCount]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCountStarted(true), 1000);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 overflow-hidden"
      id="about"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-200/20 to-red-300/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-60 right-1/4 w-36 h-36 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Title */}
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 cinematic-title transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            About <span className="text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text">Light Spire</span>
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}></div>
        </div>

        {/* Leadership Section */}
        <div className="mb-24">
          <h3 className={`text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Led by Industry Experts
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {leaders.map((leader, index) => (
              <div
                key={leader.name}
                className={`group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${700 + index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">{leader.name}</h4>
                    <p className="text-cyan-600 font-semibold">{leader.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{leader.description}</p>
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>
          
          <p className={`text-center text-lg text-gray-600 mt-8 font-light transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Decades of combined experience across every frame.
          </p>
        </div>

        {/* Experience Highlight */}
        <div className={`text-center mb-24 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <div className="text-6xl md:text-8xl font-bold text-white mb-4 neon-text-strong">
              {yearsCount}+
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Years of Animation Excellence
            </h3>
            <p className="text-xl text-cyan-100 max-w-2xl">
              With over two decades in the industry, we've mastered captivating 2D animation across platforms.
            </p>
          </div>
        </div>

        {/* Domain Expertise */}
        <div className="mb-24">
          <h3 className={`text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 transition-all duration-700 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Domain Expertise
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {domains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.label}
                  className={`group flex items-center bg-white rounded-full px-6 py-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${1100 + index * 100}ms` }}
                >
                  <Icon className="w-6 h-6 text-cyan-500 mr-3 group-hover:text-purple-500 transition-colors duration-300" />
                  <span className="font-semibold text-gray-800 group-hover:text-gray-900">{domain.label}</span>
                </div>
              );
            })}
          </div>
          
          <p className={`text-center text-lg text-gray-600 font-light transition-all duration-700 delay-1300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Delivering across all animation formats.
          </p>
        </div>

        {/* Studios We've Worked With */}
        <div className="mb-16">
          <h3 className={`text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16 transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Studios We've Worked With
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {studios.map((studio, index) => (
              <div
                key={studio}
                className={`group bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${1200 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {studio}
                </h4>
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Ending Line */}
        <div className={`text-center transition-all duration-1000 delay-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-block bg-gray-900 rounded-2xl px-8 py-6 shadow-2xl">
            <p className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
              We don't just animate stories — we elevate them.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};

export default AboutSection;
