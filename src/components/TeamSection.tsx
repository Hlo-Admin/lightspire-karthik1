import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "motion/react";
import gsap from "gsap";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

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

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [headlineRef, headlineVisible] =
    useElementVisible<HTMLHeadingElement>();
  const [descParaRef, descParaVisible] =
    useElementVisible<HTMLParagraphElement>();
  const [quoteRef, quoteVisible] = useElementVisible<HTMLParagraphElement>();

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
      id="testimonials"
      className="relative py-0 overflow-visible"
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
              {/* <Sparkles className="w-8 h-8 text-white mr-4 animate-pulse" /> */}
              <h2
                className="text-5xl md:text-6xl font-bold text-white"
                ref={headlineRef}
              >
                Meet Our <span className="text-[#f5f5f5]">Team</span>
              </h2>
              {/* <Sparkles
                className="w-8 h-8 text-[#f5f5f5] ml-4 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              /> */}
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

          {/* Testimonials Component */}
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
