import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
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
  ShoppingBag,
  Target,
  Zap,
} from "lucide-react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const KidsIPStrategy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    let split: any = null;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            split = new SplitText(headingRef.current, { type: "words" });
            gsap.from(split.words, {
              duration: 1,
              opacity: 0,
              y: 50,
              stagger: 0.05,
              ease: "power3.out",
            });
          }
        });
      },
      { threshold: 0.3 } // Adjust threshold as needed
    );

    observer.observe(headingRef.current);

    return () => {
      observer.disconnect();
      if (split) split.revert();
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(
            ".strategy-item, .platform-item"
          );
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate-fade-in");
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Scroll progress observer for timeline fill
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress through the section
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;

        let progress = 0;

        if (sectionTop < windowHeight && sectionBottom > 0) {
          const visibleHeight =
            Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);
          const totalScrollableHeight = sectionHeight + windowHeight;
          const scrolled = windowHeight - sectionTop;
          progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
        }

        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const strategyItems = [
    {
      icon: Handshake,
      title: "Co-Production Deals",
      desc: "Global animation studio partnerships",
    },
    {
      icon: Globe,
      title: "International Syndication",
      desc: "Global agents for IP reach & formats",
    },
    {
      icon: Share2,
      title: "Social Media",
      desc: "Animation snippets & insights on IG, LinkedIn & YouTube",
    },
    {
      icon: FileText,
      title: "Content & Community",
      desc: "Case studies & IP diaries via blog & Medium",
    },
    {
      icon: Calendar,
      title: "Events & Visibility",
      desc: "Annecy, MIPCOM, ATF & Indian B2B markets",
    },
    {
      icon: Megaphone,
      title: "PR & Outreach",
      desc: "AnimationXpress, Animation Magazine interviews",
    },
    {
      icon: Users,
      title: "Inbound Sales",
      desc: "Custom sample episodes via website",
    },
    {
      icon: Building,
      title: "Direct Studio Outreach",
      desc: "OTT, kids' TV & licensing decision-makers",
    },
  ];

  const platformItems = [
    {
      icon: Tv,
      title: "Kids' Animation for OTT",
      desc: "Netflix, Amazon Prime, Disney+, YouTube Kids",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Monitor,
      title: "Children's Television",
      desc: "Broadcasters and Cable Networks",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Film,
      title: "Animated Feature Films",
      desc: "For family audiences",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: ShoppingBag,
      title: "Consumer Brands",
      desc: "Co-branded IP opportunities & licensing",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ffffff] from-gray-50 via-white to-blue-50 py-20 px-6 font-toasty overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-blue-50 px-6 py-3 rounded-full">
            <img
              src="/target.svg"
              alt="Mission Icon"
              className="w-8 h-8 text-white"
            />

            <AnimatedShinyText className="text-[#0678cf] font-semibold text-lg">
              IP Strategy Framework
            </AnimatedShinyText>
          </div>

          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight max-w-5xl mx-auto"
          >
            Launch original IPs via global partners, platform deals &
            storytelling to position{" "} <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-[#0678cf]">
              LightSpire
            </span>{" "}
            as a <span className="text-[#0678cf]">kids' animation leader</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1 max-w-32"></div>
            <Zap className="w-8 h-8 text-blue-500" />
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1 max-w-32"></div>
          </div>
        </div>

        {/* Strategy Timeline Layout */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Strategic Action Framework
          </h3>
          <div className="relative">
            {/* Timeline Line - Background (gray) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full hidden lg:block"></div>

            {/* Timeline Line - Animated Fill */}
            <div
              ref={timelineRef}
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full hidden lg:block transition-all duration-300 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            ></div>

            {/* Strategy Items in Timeline */}
            <div className="space-y-8">
              {strategyItems.map((item, index) => {
                const IconComponent = item.icon;
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`strategy-item opacity-0 flex items-center gap-8 ${
                      isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col lg:gap-16`}
                  >
                    {/* Content Card */}
                    <div
                      className={`flex-1 ${
                        isLeft ? "lg:text-right" : "lg:text-left"
                      } text-center`}
                    >
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0678cf] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative lg:flex-shrink-0">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white"
                        style={{ backgroundColor: "#0678cf" }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="flex-1 hidden lg:block"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Platform Focus - Horizontal Cards */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Distribution Target Focus
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="platform-item opacity-0 relative overflow-hidden"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-500 h-full relative">
                    {/* Animated Border */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <span className="block w-full h-full rounded-2xl border-2 border-[#0678cf] animate-border-draw"></span>
                    </div>
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: "#0678cf" }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-[#0779cf] from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Globe className="w-6 h-6" />
            <span className="font-semibold text-lg">
              Ready to Launch Your Next IP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsIPStrategy;
