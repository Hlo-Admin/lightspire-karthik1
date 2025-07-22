
import React, { useEffect, useRef } from "react";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { FlickeringGrid } from "./magicui/flickering-grid";
import { WordRotate } from "@/components/magicui/word-rotate";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import gsap from "gsap";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import TypedAnimation from "./animations/TypedAnimation";
import ParallaxText from "./animations/ParallaxText";

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

  useEffect(() => {
    if (!headlineRef.current) return;
    const split = new SplitText(headlineRef.current, { type: "lines" });
    gsap.from(split.lines, {
      rotationX: -80,
      transformOrigin: "50% 50% -80px",
      opacity: 0,
      duration: 0.7,
      stagger: 0.5,
    });
    return () => split.revert();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center mb-6 animate-fade-in">
              <div className="bg-[#0678cf] bg-opacity-10 text-[#0678cf] rounded-full px-6 py-2 text-sm font-medium inline-flex items-center border border-[#0678cf]/20">
                <TypedAnimation 
                  strings={["27+ Years of Animation Excellence"]}
                  typeSpeed={80}
                  showCursor={false}
                  className="text-[#0678cf] font-medium"
                />
              </div>
            </div>

            <ParallaxText speed={0.3}>
              <h1
                ref={headlineRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-[#222] animated-gradient-text"
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
            </ParallaxText>

            <div className="animated-gradient-text-subtle">
              <p
                className="text-lg md:text-xl text-[#8a8a8a] mb-4 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                Trusted by the Best, Loved by Millions
              </p>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightspireHero;
