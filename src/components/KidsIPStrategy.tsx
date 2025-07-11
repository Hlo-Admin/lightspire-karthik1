
import { useEffect, useRef } from 'react';
import { 
  Share2, 
  FileText, 
  Calendar, 
  Megaphone, 
  Users, 
  Building, 
  Handshake, 
  Globe, 
  Tv, 
  Monitor, 
  Film, 
  ShoppingBag 
} from 'lucide-react';

const KidsIPStrategy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.strategy-card, .platform-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-fade-in');
            }, index * 150);
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const strategyItems = [
    {
      icon: Share2,
      title: "Social Media",
      description: "Post animation snippets, storyboards & insights on IG, LinkedIn & YouTube."
    },
    {
      icon: FileText,
      title: "Content & Community",
      description: "Share case studies, IP diaries & character designs via blog, Medium & Substack."
    },
    {
      icon: Calendar,
      title: "Events & Visibility",
      description: "Attend/exhibit at Annecy, MIPCOM, ATF & Indian B2B markets to pitch projects."
    },
    {
      icon: Megaphone,
      title: "PR & Outreach",
      description: "Publish interviews in AnimationXpress, Animation Magazine & trade portals."
    },
    {
      icon: Users,
      title: "Inbound Sales",
      description: "Custom sample episodes shared via website and by request."
    },
    {
      icon: Building,
      title: "Direct Studio Outreach",
      description: "Connect with OTT, kids' TV & licensing decision-makers."
    },
    {
      icon: Handshake,
      title: "Co-Production & Distribution Deals",
      description: "Partner with animation studios globally for development."
    },
    {
      icon: Globe,
      title: "International Syndication & Licensing",
      description: "Collaborate with global agents to expand IP reach & formats."
    }
  ];

  const platformItems = [
    {
      icon: Tv,
      title: "Kids' Animation for OTT Platforms",
      description: "Netflix, Amazon Prime, Disney+, YouTube Kids etc.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Monitor,
      title: "Children's Television Content",
      description: "Broadcasters and Cable Networks.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Film,
      title: "Animated Feature Films",
      description: "For family audiences.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: ShoppingBag,
      title: "Consumer Brands Targeting Children",
      description: "Co-branded IP opportunities and licensing.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 px-6 font-toasty"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Launch original IPs via global partners,<br />
            platform deals & storytelling to position{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Light Spire
            </span>{' '}
            as a{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              kids' animation leader
            </span>
            .
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Strategy Grid */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Strategic Action Framework
              </h3>
              <p className="text-lg text-gray-600">
                Comprehensive approach to market positioning and brand building
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategyItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="strategy-card opacity-0 group relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Platform & Distribution Focus */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Distribution Target Focus
              </h3>
              <p className="text-lg text-gray-600">
                Key platforms and audience channels for maximum reach
              </p>
            </div>

            <div className="space-y-6">
              {platformItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="platform-card opacity-0 group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden animate-float-gentle"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <div className="relative z-10 flex items-start space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold shadow-lg">
            <Globe className="w-6 h-6" />
            <span>Ready to Launch Your Next IP</span>
            <Globe className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsIPStrategy;
