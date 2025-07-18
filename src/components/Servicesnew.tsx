import { useEffect, useRef, useState } from "react";
import { Tv, Globe, Film, Megaphone, Users, Smartphone } from "lucide-react";
import { HyperText } from "./magicui/hyper-text";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Tv,
    title: "TV Animated Series",
    description: "High-quality 2D/3D animated series for broadcast platforms.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: Globe,
    title: "OTT & Web Series",
    description: "Visually compelling content for streaming platforms and web.",
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

const ServicesSection2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Remove isVisible and IntersectionObserver logic

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

      {/* Swipe Card Services */}
      <SwipeCardServices />

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

// SwipeCardServices component
const SwipeCardServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Refs for text animation
  const titleRefs = useRef<(HTMLHeadingElement | null)[][]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[][]>([]);

  // Group services into pairs
  const servicePairs = [];
  for (let i = 0; i < services.length; i += 2) {
    servicePairs.push(services.slice(i, i + 2));
  }

  // Ensure refs arrays are the right length
  if (titleRefs.current.length !== servicePairs.length) {
    titleRefs.current = Array(servicePairs.length)
      .fill(null)
      .map(() => []);
  }
  if (descRefs.current.length !== servicePairs.length) {
    descRefs.current = Array(servicePairs.length)
      .fill(null)
      .map(() => []);
  }

  useEffect(() => {
    let allowScroll = true;
    let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause();
    let swipePanels = cardsRef.current;
    let restoreScroll: (() => void) | null = null;

    function gotoPanel(index: number, isScrollingDown: boolean) {
      if (
        (index > servicePairs.length - 1 && isScrollingDown) ||
        (index < 0 && !isScrollingDown)
      ) {
        intentObserver.disable();
        return;
      }
      allowScroll = false;
      scrollTimeout.restart(true);
      // Animate stack effect
      swipePanels.forEach((panel, i) => {
        if (!panel) return;
        if (i < index) {
          gsap.to(panel, {
            zIndex: 10 + i,
            scale: 0.92,
            y: 40,
            opacity: 0.5,
            duration: 0.6,
            ease: "power3.inOut",
          });
        } else if (i === index) {
          gsap.to(panel, {
            zIndex: 30,
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.inOut",
          });
        } else {
          gsap.to(panel, {
            zIndex: 10,
            scale: 0.96,
            y: 20,
            opacity: 0.7,
            duration: 0.6,
            ease: "power3.inOut",
          });
        }
      });
      setCurrentIndex(index);
    }

    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
      tolerance: 10,
      preventDefault: true,
      onEnable(self) {
        allowScroll = false;
        scrollTimeout.restart(true);
        let savedScroll = self.scrollY();
        restoreScroll = () => self.scrollY(savedScroll);
        document.addEventListener("scroll", restoreScroll, { passive: false });
      },
      onDisable: () => {
        if (restoreScroll) {
          document.removeEventListener("scroll", restoreScroll);
          restoreScroll = null;
        }
      },
    });
    intentObserver.disable();

    let scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: "top top",
      end: "+=200",
      onEnter: (self) => {
        if (intentObserver.isEnabled) return;
        self.scroll(self.start + 1);
        intentObserver.enable();
      },
      onEnterBack: (self) => {
        if (intentObserver.isEnabled) return;
        self.scroll(self.end - 1);
        intentObserver.enable();
      },
    });

    // Initial stack effect
    swipePanels.forEach((panel, i) => {
      if (!panel) return;
      if (i < currentIndex) {
        gsap.set(panel, { zIndex: 10 + i, scale: 0.92, y: 40, opacity: 0.5 });
      } else if (i === currentIndex) {
        gsap.set(panel, { zIndex: 30, scale: 1, y: 0, opacity: 1 });
      } else {
        gsap.set(panel, { zIndex: 10, scale: 0.96, y: 20, opacity: 0.7 });
      }
    });

    return () => {
      scrollTrigger.kill();
      intentObserver.disable();
      scrollTimeout.kill();
      if (restoreScroll) {
        document.removeEventListener("scroll", restoreScroll);
      }
    };
  }, [currentIndex, servicePairs.length]);

  // Animate text when card pair becomes active
  useEffect(() => {
    if (!titleRefs.current[currentIndex]) return;
    titleRefs.current[currentIndex].forEach((title, i) => {
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15 * i,
            ease: "power3.out",
          }
        );
      }
    });
    if (!descRefs.current[currentIndex]) return;
    descRefs.current[currentIndex].forEach((desc, i) => {
      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.25 + 0.15 * i,
            ease: "power3.out",
          }
        );
      }
    });
  }, [currentIndex]);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {servicePairs.map((pair, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) cardsRef.current[idx] = el;
          }}
          className={`panel absolute inset-0 flex items-center justify-center pointer-events-none`}
          style={{
            // pointer-events only for the top card
            pointerEvents: idx === currentIndex ? "auto" : "none",
          }}
        >
          <div className="flex gap-8">
            {pair.map((service, subIdx) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden w-96 h-96 flex flex-col items-center justify-center"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`}
                  ></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center shadow-lg mb-6`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-4"
                      ref={(el) => {
                        titleRefs.current[idx][subIdx] = el;
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-base text-gray-600 text-center"
                      ref={(el) => {
                        descRefs.current[idx][subIdx] = el;
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
