
import { useEffect, useRef, useState } from 'react';
import { Trophy, Tv, Film, Globe, Gamepad2, Smartphone, Star, Sparkles, Zap } from 'lucide-react';

const AboutSectionDark = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const [yearsCount, setYearsCount] = useState(0);

  const domains = [
    { icon: Tv, label: "TV", color: "from-cyan-400 to-blue-500" },
    { icon: Film, label: "Films", color: "from-purple-400 to-pink-500" },
    { icon: Globe, label: "OTT", color: "from-green-400 to-emerald-500" },
    { icon: Gamepad2, label: "Games", color: "from-orange-400 to-red-500" },
    { icon: Smartphone, label: "Mobile Apps", color: "from-yellow-400 to-amber-500" }
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
      className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 py-32 overflow-hidden"
      id="about"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Spotlight Effects */}
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-gradient-radial from-cyan-500/15 via-cyan-500/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-radial from-purple-500/12 via-purple-500/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-60 h-60 bg-gradient-radial from-pink-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-32 right-24 w-2 h-2 bg-cyan-400 rounded-full animate-float shadow-[0_0_15px_rgba(6,182,212,0.8)]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-64 left-20 w-3 h-3 bg-purple-400 rounded-full animate-float shadow-[0_0_20px_rgba(168,85,247,0.8)]" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-48 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-float shadow-[0_0_18px_rgba(244,114,182,0.8)]" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-80 right-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-float shadow-[0_0_12px_rgba(251,191,36,0.8)]" style={{ animationDelay: '2.2s' }}></div>
        
        {/* Geometric Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute bottom-1/3 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-20">
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

        {/* About Us Description */}
        <div className={`text-center mb-24 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative max-w-5xl mx-auto">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8">
              <Star className="w-full h-full text-cyan-400 animate-pulse" />
            </div>
            <div className="absolute -top-4 -right-4 w-6 h-6">
              <Sparkles className="w-full h-full text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 shadow-2xl">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light mb-6">
                At <span className="text-cyan-400 font-semibold">Light Spire Media</span>, we are passionate storytellers who transform imagination into stunning visual reality. Our studio specializes in creating captivating <span className="text-purple-400">2D animations</span>, immersive <span className="text-pink-400">3D experiences</span>, and cutting-edge <span className="text-yellow-400">VFX solutions</span> that bring stories to life across every platform.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                From concept to completion, we blend artistic vision with technical excellence to deliver content that not only meets but exceeds expectations. Every frame we create is a testament to our commitment to quality, creativity, and the magic of visual storytelling.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Stats Block */}
        <div className={`text-center mb-32 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="relative inline-block">
            {/* Enhanced Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent rounded-3xl"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-16 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <Zap className="w-12 h-12 text-yellow-400 mr-4 animate-pulse" />
                <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text neon-text-strong leading-none">
                  {yearsCount}+
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Years of Excellence
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
                Over two decades mastering the art of <span className="text-cyan-400">animation</span> and <span className="text-purple-400">visual effects</span> across all platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Domain Expertise */}
        <div className="mb-32">
          <h3 className={`text-4xl md:text-5xl font-bold text-white text-center mb-16 transition-all duration-700 delay-900 ${
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
                  className={`group relative overflow-hidden bg-gray-800/60 backdrop-blur-sm border border-gray-600 rounded-2xl px-10 py-8 hover:border-transparent hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500 hover:scale-110 hover:-translate-y-3 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${1100 + index * 100}ms` }}
                >
                  {/* Dynamic Gradient Border */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm`}></div>
                  <div className="absolute inset-[1px] bg-gray-800 rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <Icon className="w-10 h-10 text-gray-400 group-hover:text-white mx-auto mb-4 transition-all duration-300 group-hover:scale-110" />
                    <span className="block text-white font-semibold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                      {domain.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studios Grid */}
        <div className="mb-24">
          <h3 className={`text-4xl md:text-5xl font-bold text-white text-center mb-20 transition-all duration-700 delay-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Trusted By <span className="text-pink-400 neon-text">Studios Worldwide</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {studios.map((studio, index) => (
              <div
                key={studio}
                className={`group relative bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${1300 + index * 80}ms` }}
              >
                {/* Hover Glow Effect */}
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
        <div className={`text-center transition-all duration-1000 delay-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative inline-block">
            {/* Quote Background Effects */}
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
