
import { useEffect, useRef, useState } from 'react';
import { Trophy, Tv, Film, Globe, Gamepad2, Smartphone, Star, Sparkles, Zap, Award, Target } from 'lucide-react';

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
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24 overflow-hidden"
      id="about"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">Light Spire Media</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Crafting stories with character, color, and <span className="text-cyan-400">cinematic precision</span>.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - About Description */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                At <span className="text-cyan-400 font-semibold">Light Spire Media</span>, we are passionate storytellers who transform imagination into stunning visual reality. Our studio specializes in creating captivating <span className="text-purple-400">2D animations</span>, immersive <span className="text-pink-400">3D experiences</span>, and cutting-edge <span className="text-yellow-400">VFX solutions</span> that bring stories to life across every platform.
              </p>
              <p className="text-gray-400 leading-relaxed">
                From concept to completion, we blend artistic vision with technical excellence to deliver content that not only meets but exceeds expectations. Every frame we create is a testament to our commitment to quality, creativity, and the magic of visual storytelling.
              </p>
            </div>

            {/* Experience Card */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-yellow-400 mr-3" />
                <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
                  {yearsCount}+
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Years of Excellence</h3>
              <p className="text-gray-300">
                Over two decades mastering the art of <span className="text-cyan-400">animation</span> and <span className="text-purple-400">visual effects</span> across all platforms.
              </p>
            </div>
          </div>

          {/* Right Column - Domains & Studios */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {/* Domains */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                <span className="text-purple-400">Visual Realms</span> We Master
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {domains.map((domain, index) => {
                  const Icon = domain.icon;
                  return (
                    <div
                      key={domain.label}
                      className="group bg-gray-700/50 rounded-xl p-4 hover:bg-gray-600/50 transition-all duration-300 hover:scale-105"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Icon className="w-8 h-8 text-gray-400 group-hover:text-white mx-auto mb-2 transition-colors duration-300" />
                      <span className="block text-center text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
                        {domain.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trusted Studios */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Trusted By <span className="text-pink-400">Studios Worldwide</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {studios.map((studio, index) => (
                  <div
                    key={studio}
                    className="group bg-gray-700/30 rounded-lg p-3 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 transition-all duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-gray-400 group-hover:text-purple-400 mr-3 transition-colors duration-300" />
                      <span className="text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
                        {studio}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative inline-block bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl px-12 py-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-cyan-400 mr-4 animate-pulse" />
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text italic">
                "We don't just animate. We envision worlds, frame by frame."
              </p>
              <Sparkles className="w-8 h-8 text-purple-400 ml-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionDark;
