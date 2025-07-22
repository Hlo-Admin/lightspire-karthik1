
import React, { useEffect, useRef } from "react";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { FlickeringGrid } from "./magicui/flickering-grid";
import { WordRotate } from "@/components/magicui/word-rotate";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { TextRevealAnimation } from "./animations/TextRevealAnimation";
import { TypingEffect } from "./animations/TypingEffect";
import { AnimatedGradientText } from "./animations/AnimatedGradientText";
import { NeonGlowText } from "./animations/NeonGlowText";
import { FlipboardText } from "./animations/FlipboardText";
import { ParallaxText } from "./animations/ParallaxText";
import gsap from "gsap";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const LightspireHero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<any>(null);
  const animationRef = useRef<any>(null);

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

  // Setup SplitText on mount and animate words
  useEffect(() => {
    if (!headlineRef.current) return;
    splitRef.current = new SplitText(headlineRef.current, {
      type: "lines,words,chars",
    });
    
    if (animationRef.current && animationRef.current.revert) {
      animationRef.current.revert();
    }
    animationRef.current = gsap.from(splitRef.current.words, {
      y: -100,
      opacity: 0,
      rotation: () => gsap.utils.random(-80, 80),
      duration: 0.7,
      ease: "back",
      stagger: 0.15,
    });
    return () => {
      splitRef.current && splitRef.current.revert();
      animationRef.current &&
        animationRef.current.revert &&
        animationRef.current.revert();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#0678cf]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#06b6d4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl">
            {/* Animated Badge */}
            <div className="flex items-center justify-center mb-6 animate-fade-in">
              <div className="bg-[#0678cf] bg-opacity-10 text-[#0678cf] rounded-full px-6 py-2 text-sm font-medium inline-flex items-center border border-[#0678cf]/20">
                <NeonGlowText className="text-sm" color="#0678cf">
                  27+ Years of Animation Excellence
                </NeonGlowText>
              </div>
            </div>

            {/* Main Headline with Multiple Animations */}
            <div className="mb-6 space-y-4">
              <TextRevealAnimation 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#222]"
                animationType="reveal"
                stagger={0.08}
              >
                India's Premier
              </TextRevealAnimation>
              
              <FlipboardText className="text-6xl font-bold text-[#0678cf]">
                2D Animation
              </FlipboardText>
              
              <ParallaxText 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#222]"
                speed={0.3}
              >
                Studio
              </ParallaxText>
            </div>

            {/* Animated Subtitle */}
            <div className="mb-8">
              <TypingEffect
                strings={[
                  "Trusted by the Best, Loved by Millions",
                  "Creating Magic Through Animation",
                  "Where Stories Come to Life"
                ]}
                className="text-lg md:text-xl text-[#8a8a8a]"
                typeSpeed={60}
                backSpeed={40}
                loop={true}
              />
            </div>

            {/* Action Buttons with Hover Animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <Link
                to="/projects"
                className="group bg-[#0678cf] hover:bg-[#055fa3] text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-none border-none transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="group-hover:animate-pulse">Explore Our Work</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group bg-transparent border-2 border-[#0678cf] text-[#0678cf] hover:bg-[#0678cf] hover:text-white font-medium py-4 px-8 rounded-lg transition-all duration-500 flex items-center justify-center shadow-none transform hover:scale-105"
              >
                <span className="group-hover:animate-bounce">Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <Sparkles className="h-8 w-8 text-[#0678cf] opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <Play className="h-12 w-12 text-[#0678cf] opacity-60" />
      </div>
    </div>
  );
};

export default LightspireHero;
