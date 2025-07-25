import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  summary?: string; // Added summary field
};

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

const TeamTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);

  const [bottomQuoteRef, bottomQuoteVisible] =
    useElementVisible<HTMLParagraphElement>();

  const [headlineRef, headlineVisible] =
    useElementVisible<HTMLHeadingElement>();
  const [descParaRef, descParaVisible] =
    useElementVisible<HTMLParagraphElement>();
  const [quoteRef, quoteVisible] = useElementVisible<HTMLParagraphElement>();

  useEffect(() => {
    if (!bottomQuoteVisible || !bottomQuoteRef.current) return;
    const split = new SplitText(bottomQuoteRef.current, { type: "chars" });
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
  }, [bottomQuoteVisible, bottomQuoteRef]);

  const testimonials: Testimonial[] = [
    {
      quote:
        "With over 27 years of leadership in India's animation industry, I have built a legacy of operational excellence across 2D/3D, and VFX productions.",
      name: "Sathiya Narayanan",
      designation: "Co-Founder",
      src: "founders/narayanan1.jpeg",
      summary: `With over 27 years of leadership in India's animation industry, Sathiya Narayanan has built a legacy of operational excellence across 2D/3D, and VFX productions. As the former Head of Production at Green Gold Animation Studios, he managed large-scale projects from concept to delivery ensuring creative integrity, quality control, and global standards. Sathiya's journey spans India's top studios including TIL Studios, Criya Innfotainment, Inscribe Graphics, and Prime Focus. Known for orchestrating multi-million dollar projects with precision, he has played a critical role in building India's credibility as an outsourcing powerhouse for global animation.
\n
A regular at international markets like MIPCOM and Annecy, Sathiya has seen first-hand the growing global demand for culturally rooted, original content, something Indian studios often miss by focusing on service work.

Today, he's turning that insight into action. Co-founding LIGHTSPIRE MEDIA, Sathiya is shifting gears from service execution to IP ownership. His mission: to build original Indian stories with global appeal, blending artistic ambition with production efficiency. At a time when the world is hungry for diverse narratives, Sathiya is ready to lead that change on his own terms.`,
    },
    {
      quote:
        "With over 25 years of experience across 2D and 3D animation, I have been a creative force behind some of India's most recognized animated IPs.",
      name: "Leo Menezes",
      designation: "Co-Founder",
      src: "founders/leo1.jpeg",
      summary: `With over 25 years of experience across 2D and 3D animation, Leo Menezes has been a creative force behind some of India's most recognized animated IPs. Formerly the Head of Creative at Green Gold Animation Studios, Leo oversaw animation direction, story development, and production workflows bringing artistic depth and narrative clarity to every frame.

A Master of Fine Arts graduate, Leo has consistently demonstrated a rare balance of visual storytelling and production sensibility. His creative leadership has shaped numerous TV series and theatrical films across both domestic and international markets, establishing him as a trusted name in end-to-end animation delivery.

Leo's career spans acclaimed studios like Penta Media, DQ Entertainment, Toonz Media, Criya Infotainment, and Inscribe Graphics. He's also a regular at global forums such as MIPCOM and Annecy, where he engages with international producers, distributors, and creative leads to stay ahead of industry trends.

Now, as co-founder of LIGHTSPIRE MEDIA, Leo is pivoting from studio leadership to content ownership. His vision is clear: to develop original, culturally resonant animated stories for a global audience infusing his signature creative finesse into IPs that reflect India's voice on the world stage.`,
    },
  ];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

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
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
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

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

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
              <h2
                className="text-5xl md:text-6xl font-bold text-white"
                ref={headlineRef}
              >
                Meet Our <span className="text-[#f5f5f5]">Team</span>
              </h2>
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
          <div
            className="mx-auto px-4 py-20 font-sans antialiased max-w-7xl lg:px-8"
            style={{
              clipPath: "polygon(0 0, 100% 3vw, 100% 100%, 0 calc(100% - 3vw))",
              paddingBottom: "6rem",
            }}
          >
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Image Section - 40% width */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative h-[350px] w-[300px]">
                  <AnimatePresence>
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial.src}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          z: -100,
                          rotate: randomRotateY(),
                        }}
                        animate={{
                          opacity: isActive(index) ? 1 : 0.7,
                          scale: isActive(index) ? 1 : 0.95,
                          z: isActive(index) ? 0 : -100,
                          rotate: isActive(index) ? 0 : randomRotateY(),
                          zIndex: isActive(index)
                            ? 40
                            : testimonials.length + 2 - index,
                          y: isActive(index) ? [0, -80, 0] : 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          z: 100,
                          rotate: randomRotateY(),
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 origin-bottom"
                      >
                        <img
                          src={testimonial.src}
                          alt={testimonial.name}
                          width={300}
                          height={500}
                          draggable={false}
                          className="h-full w-full rounded-3xl object-cover object-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Name and designation */}
                <motion.div
                  key={active + "-name"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 text-center"
                >
                  <h3 className="text-2xl font-bold text-white">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {testimonials[active].designation}
                  </p>
                </motion.div>
              </div>

              {/* Summary Section - 60% width */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <motion.div
                  key={active + "-quote"}
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <motion.p
                    ref={quoteRef}
                    className="text-lg text-white dark:text-neutral-300 italic"
                  >
                    {testimonials[active].quote
                      .split(" ")
                      .map((word, index) => (
                        <motion.span
                          key={index}
                          initial={{
                            filter: "blur(10px)",
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.02 * index,
                          }}
                          className="inline-block"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                  </motion.p>
                </motion.div>

                {/* Founder Summary */}
                <motion.div
                  key={active + "-summary"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-base text-white dark:text-neutral-300 leading-relaxed"
                >
                  {testimonials[active].summary}
                </motion.div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handlePrev}
                    className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-300"
                  >
                    <IconArrowLeft className="h-6 w-6 text-gray-700 transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-300"
                  >
                    <IconArrowRight className="h-6 w-6 text-gray-700 transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>
            {/* Bottom Quote */}
            <div
              className={`text-center transition-all pt-16 duration-1000 delay-900 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative inline-block bg-[#0678cf]/10 backdrop-blur-sm border border-[#f5f5f5]/30 rounded-2xl px-12 py-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f5]/10 via-[#0678cf]/10 to-white/10 rounded-2xl blur-xl"></div>
                <div className="relative flex items-center justify-center">
                  <p
                    className="text-2xl md:text-3xl font-bold text-white"
                    ref={bottomQuoteRef}
                  >
                    "Together, we transform imagination into, visual reality."
                  </p>
                </div>
              </div>
            </div>

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
                stroke="gray-200"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset="0"
                style={{
                  transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamTestimonials;
