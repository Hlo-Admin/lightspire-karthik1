import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HyperText } from "@/components/magicui/hyper-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import gsap from "gsap";

const ColorWaveText = ({ text }: { text: string }) => {
  return (
    <div className="inline-block color-wave-text">
      {text.split(" ").map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              style={{
                display: "inline-block",
                animation: "colorwave 0.8s ease-in-out forwards",
                animationDelay: `${charIndex * 0.05}s`,
                marginRight: charIndex === word.length - 1 ? "0.3em" : "0",
              }}
            >
              {char}
            </span>
          ))}
        </React.Fragment>
      ))}
      <style>
        {`
          @keyframes colorwave {
            0%   { color: #6a6a6a; transform: translateY(0);}
            25%  { color: #0678cf; transform: translateY(-8px);}
            50%  { color: #6a6a6a; transform: translateY(0);}
            100% { color: #6a6a6a;}
          }
        `}
      </style>
    </div>
  );
};

const LIGHTSPIREHero = () => {
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden sm:pt-8 pt-16 mt-8">
      {/* Animated color strike style */}
      <style>
        {`
          @keyframes strike-appear {
            0% {
              transform: skewX(-12deg) rotate(-1deg) scaleX(0);
              opacity: 0.1;
            }
            100% {
              transform: skewX(-12deg) rotate(-1deg) scaleX(1);
              opacity: 0.2;
            }
          }
          .color-strike {
            position: absolute;
            inset: 0;
            background: #0678cf;
            opacity: 0.2;
            transform: skewX(-12deg) rotate(-2deg) scaleX(0);
            transform-origin: left;
            pointer-events: none;
            z-index: 1;
            animation: strike-appear 1s cubic-bezier(0.4,0,0.2,1) 0.5s forwards;
          }
        `}
      </style>

      {/* Background div with image */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 w-full bg-center opacity-50 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url(/hero1.jpg)",
          backgroundSize: "60% 80%",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
          filter: "grayscale(50%) brightness(120%)",
        }}
      />

      {/* Decorative Elements */}
      <div
        className="absolute top-1/3 left-10 hidden lg:block animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1/3 right-10 hidden lg:block animate-fade-in"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-8 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl w-full">
            <div className="flex items-center justify-center mb-4 animate-fade-in">
              <div className="bg-[#0678cf] bg-opacity-10 text-[#0678cf] rounded-full px-6 py-2 text-sm font-medium inline-flex items-center border border-[#0678cf]/20">
                27+ Years of Animation Excellence
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-[#222]">
              <span ref={premierRef} className="block">
                The Premier
              </span>
              <span
                ref={animationRef}
                className="block text-[#0678cf] text-4xl md:text-6xl lg:text-7xl leading-tight"
              >
                2D Animation
              </span>
              <span ref={studioRef} className="block leading-tight">
                Studio
              </span>
            </h1>

            <div className="space-y-3 mb-6">
              <div className="hero-subtext text-lg md:text-xl text-[#8a8a8a] h-[36px] flex justify-center items-center">
                <TypingAnimation duration={60} delay={1000} loop>
                  Trusted by the Best, Loved by Millions
                </TypingAnimation>
              </div>

              {/* Animated strike-through highlight effect */}
              <div className="mt-8 pt-4 text-center">
                <span className="relative inline-block">
                  <span className="color-strike"></span>
                  <span className="relative z-10 tracking-wide text-xl">
                    We Bring Characters to Life-Frame by Frame
                  </span>
                </span>
              </div>

              {/* Color Wave animated text line */}
              <div className="hero-subtext text-lg md:text-xl text-[#6a6a6a]">
                <ColorWaveText text="Creating powerful visual storytelling for brands, broadcasters, and dreamers." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LIGHTSPIREHero;
