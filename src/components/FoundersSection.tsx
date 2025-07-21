import { useEffect, useRef, useState } from "react";
import { Sparkles, Star } from "lucide-react";
import gsap from "gsap";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);
import { useCallback } from "react";
function useElementVisible<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    },
    []
  );
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [observerCallback]);
  return [ref, isVisible] as const;
}

const FoundersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Add for bottom slant animation
  // const [bottomLineVisible, setBottomLineVisible] = useState(false);
  // const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }, observerOptions);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Add observer for bottom slant line
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setBottomLineVisible(true);
  //         } else {
  //           setBottomLineVisible(false);
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );
  //   if (bottomRef.current) {
  //     observer.observe(bottomRef.current);
  //   }
  //   return () => observer.disconnect();
  // }, []);

  const founders = [
    {
      name: "Sathiya Narayanan",
      title: "Co-Founder",
      tagline: "Vision meets production mastery.",
      delay: 200,
    },
    {
      name: "Leo Menezes",
      title: "Co-Founder",
      tagline: "Creative direction with storytelling soul.",
      delay: 400,
    },
  ];

  const [headlineRef, headlineVisible] =
    useElementVisible<HTMLHeadingElement>();
  const [descParaRef, descParaVisible] =
    useElementVisible<HTMLParagraphElement>();
  const [quoteRef, quoteVisible] = useElementVisible<HTMLParagraphElement>();

  useEffect(() => {
    if (!headlineVisible || !headlineRef.current) return;
    const split = new SplitText(headlineRef.current, { type: "lines" });
    gsap.from(split.lines, {
      rotationX: -80,
      transformOrigin: "50% 50% -80px",
      opacity: 0,
      duration: 0.7,
      stagger: 0.5,
      ease: "expo.out",
    });
    return () => split.revert();
  }, [headlineVisible, headlineRef]);

  useEffect(() => {
    if (!descParaVisible || !descParaRef.current) return;
    const split = new SplitText(descParaRef.current, { type: "chars" });
    gsap.from(split.chars, {
      y: 20,
      opacity: 0,
      stagger: 0.005,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    return () => split.revert();
  }, [descParaVisible, descParaRef]);

  useEffect(() => {
    if (!quoteVisible || !quoteRef.current) return;
    const split = new SplitText(quoteRef.current, { type: "chars" });
    gsap.from(split.chars, {
      scale: 2.5,
      rotationX: -180,
      opacity: 0,
      transformOrigin: "100% 50%",
      ease: "back",
      duration: 1,
      stagger: 0.02,
    });
    return () => split.revert();
  }, [quoteVisible, quoteRef]);

  return (
    <section
      ref={sectionRef}
      className="relative py-0 overflow-visible"
      id="founders"
    >
      <div
        className="relative w-full"
        style={{
          background: "#8a8a8a",
          clipPath: "polygon(0 3vw, 100% 0, 100% 100%, 0 calc(100% - 3vw))",
          paddingTop: "6rem",
          paddingBottom: "6rem",
        }}
      >
        {/* Top Slant Animated Line */}
        {/*
        <svg
          className={`absolute left-0 top-0 w-full h-[3vw] pointer-events-none transition-all duration-2000 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ zIndex: 20 }}
          width="100%"
          height="3vw"
          viewBox="0 0 100 3"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="3"
            x2="100"
            y2="0"
            stroke="#f5f5f5"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={isVisible ? "0" : "100"}
            style={{
              transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Title */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-white mr-4 animate-pulse" />
              <h2
                className="text-5xl md:text-6xl font-bold text-white"
                ref={headlineRef}
              >
                Meet Our <span className="text-[#f5f5f5]">Team</span>
              </h2>
              <Sparkles
                className="w-8 h-8 text-[#f5f5f5] ml-4 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-white to-[#f5f5f5] mx-auto mb-8 rounded-full"></div>
            <p
              className="text-xl text-[#f5f5f5] max-w-3xl mx-auto leading-relaxed"
              ref={descParaRef}
            >
              The visionary minds behind Light Spire Media, bringing together
              decades of experience in{" "}
              <span className="text-white">creative direction</span> and{" "}
              <span className="text-[#f5f5f5]">production excellence</span>.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder, index) => (
              <div
                key={founder.name}
                className={`group relative transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: `${founder.delay}ms` }}
              >
                {/* Founder Card */}
                <div className="relative bg-[#7a7a7a]/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-10 hover:bg-[#9a9a9a]/80 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(245,245,245,0.15)] group-hover:border-white/40">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#f5f5f5]/10 to-[#8a8a8a]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  {/* Avatar placeholder with animated border */}
                  <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#bdbdbd] to-[#8a8a8a] rounded-full flex items-center justify-center group-hover:from-white/30 group-hover:to-[#f5f5f5]/30 transition-all duration-500">
                      <div className="w-28 h-28 bg-gradient-to-br from-[#8a8a8a] to-[#bdbdbd] rounded-full flex items-center justify-center">
                        <Star className="w-12 h-12 text-white group-hover:text-[#f5f5f5] transition-colors duration-500" />
                      </div>
                    </div>
                    {/* Animated ring */}
                    <div
                      className="absolute inset-0 w-32 h-32 mx-auto border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-white group-hover:to-[#f5f5f5] rounded-full group-hover:animate-spin transition-all duration-1000"
                      style={{ animationDuration: "8s" }}
                    ></div>
                  </div>
                  {/* Founder Info */}
                  <div className="text-center relative z-10">
                    {/* Name with animated underline */}
                    <div className="relative mb-2">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#f5f5f5] group-hover:bg-clip-text transition-all duration-500">
                        {founder.name}
                      </h3>
                      {/* Signature-like underline animation */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-white to-[#f5f5f5] group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                    {/* Title */}
                    <div className="flex items-center justify-center mb-6">
                      <Star className="w-5 h-5 text-white mr-2 group-hover:animate-pulse" />
                      <p className="text-xl text-white font-semibold tracking-wide">
                        {founder.title}
                      </p>
                      <Star
                        className="w-5 h-5 text-[#f5f5f5] ml-2 group-hover:animate-pulse"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                    {/* Tagline */}
                    <p className="text-lg text-[#f5f5f5] italic leading-relaxed group-hover:text-white transition-colors duration-500">
                      "{founder.tagline}"
                    </p>
                    {/* Floating starbursts */}
                    <div className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <Star
                        className="w-5 h-5 text-[#f5f5f5] animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </div>
                  </div>
                  {/* Card corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/0 group-hover:border-white rounded-tl-3xl transition-all duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#f5f5f5]/0 group-hover:border-[#f5f5f5] rounded-br-3xl transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Quote */}
          <div
            className={`text-center mt-20 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative inline-block bg-[#7a7a7a]/80 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#f5f5f5]/10 to-[#8a8a8a]/10 rounded-2xl blur-xl"></div>
              <p
                className="text-xl md:text-2xl font-light text-[#f5f5f5] italic relative z-10"
                ref={quoteRef}
              >
                "Together, we transform imagination into{" "}
                <span className="text-white font-semibold">visual reality</span>
                ."
              </p>
            </div>
          </div>
        </div>
        {/* Bottom Slant Animated Line */}
        {/*
        <svg
          className={`absolute left-0 bottom-0 w-full h-[3vw] pointer-events-none transition-all duration-2000 ${
            bottomLineVisible
              ? "opacity-100 scale-x-100"
              : "opacity-0 scale-x-0"
          }`}
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
            stroke="#f5f5f5"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={bottomLineVisible ? "0" : "100"}
            style={{
              transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        <div
          ref={bottomRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "1px",
          }}
        />
        */}
      </div>
    </section>
  );
};

export default FoundersSection;
