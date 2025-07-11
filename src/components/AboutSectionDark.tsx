
import { useEffect, useRef, useState } from 'react';
import { User, Trophy, Tv, Film, Globe, Gamepad2, Smartphone, Users } from 'lucide-react';

const AboutSectionDark = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const [yearsCount, setYearsCount] = useState(0);

  const domains = [
    { icon: Tv, label: "TV" },
    { icon: Film, label: "Films" },
    { icon: Globe, label: "OTT" },
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
      role: "Production",
      initials: "KS"
    },
    {
      name: "T. Leo Menezes", 
      role: "Creative",
      initials: "TL"
    }
  ];

  // Count-up animation for years
  useEffect(() => {
    if (countStarted && yearsCount < 27) {
      const timer = setTimeout(() => {
        setYearsCount(prev => prev + 1);
      }, 80);
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
          setTimeout(() => setCountStarted(true), 1500);
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
      className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 py-32 overflow-hidden"
      id="about"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Spotlight Effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-float"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-float shadow-[0_0_20px_rgba(6,182,212,0.8)]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-80 left-16 w-2 h-2 bg-purple-400 rounded-full animate-float shadow-[0_0_15px_rgba(168,85,247,0.8)]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-pink-400 rounded-full animate-float shadow-[0_0_25px_rgba(244,114,182,0.8)]" style={{ animationDelay: '1s' }}></div>
        
        {/* Animated Lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transform -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className={`text-6xl md:text-7xl font-bold text-white mb-8 cinematic-title transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            Who <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text neon-text">We Are</span>
          </h2>
          <p className={`text-xl md:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Crafting stories with character, color, and <span className="text-cyan-400">cinematic precision</span>.
          </p>
        </div>

        {/* Founders Section */}
        <div className="mb-32">
          <h3 className={`text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Led by <span className="text-cyan-400 neon-text">Industry Experts</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {leaders.map((leader, index) => (
              <div
                key={leader.name}
                className={`group text-center transition-all duration-1000 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${700 + index * 200}ms` }}
              >
                {/* Animated Avatar */}
                <div className="relative mb-8 mx-auto w-32 h-32">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-1 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-500">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{leader.initials}</span>
                    </div>
                  </div>
                  {/* Orbiting Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-spin group-hover:border-cyan-400/60 transition-all duration-500" style={{ animationDuration: '10s' }}></div>
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {leader.name}
                </h4>
                <p className="text-cyan-400 text-lg font-semibold mb-4">({leader.role})</p>
              </div>
            ))}
          </div>
          
          <p className={`text-center text-xl text-gray-300 mt-12 font-light transition-all duration-700 delay-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            With decades of combined experience, we shape every frame with <span className="text-purple-400">purpose</span>.
          </p>
        </div>

        {/* Experience Stats Block */}
        <div className={`text-center mb-32 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="relative inline-block">
            {/* Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-16 shadow-2xl">
              <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-8 neon-text-strong leading-none">
                {yearsCount}+
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Years Experience
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
                Over two decades mastering the art of <span className="text-cyan-400">2D animation</span> across platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Domain Tags */}
        <div className="mb-32">
          <h3 className={`text-4xl md:text-5xl font-bold text-white text-center mb-16 transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Versatile Across <span className="text-purple-400 neon-text">Visual Realms</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {domains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.label}
                  className={`group relative overflow-hidden bg-gray-800/60 backdrop-blur-sm border border-gray-600 rounded-2xl px-8 py-6 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${1200 + index * 100}ms` }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:text-white transition-colors duration-300" />
                  <span className="block text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
                    {domain.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studios Grid */}
        <div className="mb-24">
          <h3 className={`text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 delay-1300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Trusted By <span className="text-pink-400 neon-text">Studios Worldwide</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {studios.map((studio, index) => (
              <div
                key={studio}
                className={`group relative bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${1400 + index * 80}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 rounded-xl transition-all duration-500"></div>
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-purple-500 group-hover:to-cyan-500 flex items-center justify-center mx-auto mb-4 transition-all duration-500">
                    <Trophy className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-gray-300 group-hover:text-white font-semibold transition-colors duration-300">
                    {studio}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Quote */}
        <div className={`text-center transition-all duration-1000 delay-1600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative inline-block">
            {/* Quote Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
            
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl px-12 py-8">
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text italic">
                "We don't just animate. We envision worlds, frame by frame."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default AboutSectionDark;
