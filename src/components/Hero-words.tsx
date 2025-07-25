import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import gsap from "gsap";

const LightspireHero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Refs for headline parts
  const premierRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<HTMLSpanElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      backgroundRef.current.style.transform = `translate(${x * -10}px, ${
        y * -10
      }px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GSAP animation for headline parts
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.out" },
    });

    if (premierRef.current && animationRef.current && studioRef.current) {
      tl.from(premierRef.current, { x: -200, opacity: 0 })
        .from(animationRef.current, { x: 200, opacity: 0 }, "-=0.5")
        .from(studioRef.current, { x: -200, opacity: 0 }, "-=0.5");
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden sm:pt-8">
      {/* Background div for possible future flickering grid or background */}
      {/* <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{ willChange: "transform" }}
      >
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#0678cf"
          maxOpacity={0.2}
          flickerChance={0.08}
        />
      </div> */}

      {/* Decorative Elements */}
      <div
        className="absolute top-1/3 left-10 hidden lg:block animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        {/* <Sparkles className="h-8 w-8 text-[#0678cf] opacity-30" /> */}
      </div>
      <div
        className="absolute bottom-1/3 right-10 hidden lg:block animate-fade-in"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center mb-6 animate-fade-in">
              <div className="bg-[#0678cf] bg-opacity-10 text-[#0678cf] rounded-full px-6 py-2 text-sm font-medium inline-flex items-center border border-[#0678cf]/20">
                {/* <Sparkles className="h-4 w-4 mr-2 text-[#0678cf]" /> */}
                27+ Years of Animation Excellence
              </div>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-[#222]"
              style={{
                willChange: "transform, opacity",
              }}
            >
              {/* India's Premier - animate from left */}
              <span ref={premierRef} className="block">
                India's Premier
              </span>

              {/* 2D Animation - animate from right */}
              <span
                ref={animationRef}
                className="block text-[#0678cf] text-4xl md:text-6xl lg:text-7xl leading-tight mt-2"
              >
                2D Animation
              </span>

              {/* Studio - animate from left */}
              <span ref={studioRef} className="block leading-tight mt-2">
                Studio
              </span>
            </h1>

            {/* Typing Subtext */}
            <div className="hero-subtext text-lg md:text-xl text-[#8a8a8a] mb-4 h-[36px]">
              <TypingAnimation duration={60} delay={1000} loop>
                Trusted by the Best, Loved by Millions
              </TypingAnimation>
            </div>
            <br></br>
            {/* Uncomment below if you want buttons */}
            {/* <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <Link
                to="/projects"
                className="bg-[#0678cf] hover:bg-[#055fa3] text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-none border-none"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-[#0678cf] text-[#0678cf] hover:bg-[#0678cf] hover:text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-none"
              >
                Get in Touch
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightspireHero;
