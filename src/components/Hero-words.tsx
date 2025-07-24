
import React, { useEffect, useRef } from "react";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { FlickeringGrid } from "./magicui/flickering-grid";
import { WordRotate } from "@/components/magicui/word-rotate";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import gsap from "gsap";

const LightspireHero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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

  // Animate the entire headline as one block from top to bottom
  useEffect(() => {
    if (!headlineRef.current) return;
    
    gsap.fromTo(headlineRef.current, {
      y: -100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* FlickeringGrid Background */}
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
              ref={headlineRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-[#222]"
              style={{
                willChange: "transform, opacity",
              }}
            >
              India's Premier <br />
              <span className="text-[#0678cf] text-6xl">
                2D Animation <br />
              </span>
              Studio
            </h1>

            {/* Typing Subtext */}
            <div className="hero-subtext text-lg md:text-xl text-[#8a8a8a] mb-4 h-[36px]">
              <TypingAnimation duration={60} delay={1000} loop>
                Trusted by the Best, Loved by Millions
              </TypingAnimation>
            </div>
            <br></br>
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
