import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

    // Mouse tracking for parallax effect (keep or remove if unused)
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

  const founders = [
    {
      name: "Sathiya Narayanan",
      title: "Co-Founder",
      tagline: "Vision meets production mastery.",
      image: "founders/narayanan1.jpeg",
      delay: 200,
      bio: `With over 27 years of leadership in India's animation industry, Sathiya Narayanan has built a legacy of operational excellence across 2D/3D, and VFX productions. As the former Head of Production at Green Gold Animation Studios, he managed large-scale projects from concept to delivery ensuring creative integrity, quality control, and global standards. Sathiya's journey spans India's top studios including TIL Studios, Criya Innfotainment, Inscribe Graphics, and Prime Focus. Known for orchestrating multi-million dollar projects with precision, he has played a critical role in building India's credibility as an outsourcing powerhouse for global animation.

A regular at international markets like MIPCOM and Annecy, Sathiya has seen first-hand the growing global demand for culturally rooted, original content, something Indian studios often miss by focusing on service work.

Today, he's turning that insight into action. Co-founding Lightspire Media, Sathiya is shifting gears from service execution to IP ownership. His mission: to build original Indian stories with global appeal, blending artistic ambition with production efficiency. At a time when the world is hungry for diverse narratives, Sathiya is ready to lead that change on his own terms.`,
    },
    {
      name: "Leo Menezes",
      title: "Co-Founder",
      tagline: "Creative direction with storytelling soul.",
      image: "founders/leo1.jpeg",
      delay: 400,
      bio: `With over 25 years of experience across 2D and 3D animation, Leo Menezes has been a creative force behind some of India's most recognized animated IPs. Formerly the Head of Creative at Green Gold Animation Studios, Leo oversaw animation direction, story development, and production workflows bringing artistic depth and narrative clarity to every frame.

A Master of Fine Arts graduate, Leo has consistently demonstrated a rare balance of visual storytelling and production sensibility. His creative leadership has shaped numerous TV series and theatrical films across both domestic and international markets, establishing him as a trusted name in end-to-end animation delivery.

Leo's career spans acclaimed studios like Penta Media, DQ Entertainment, Toonz Media, Criya Infotainment, and Inscribe Graphics. He's also a regular at global forums such as MIPCOM and Annecy, where he engages with international producers, distributors, and creative leads to stay ahead of industry trends.

Now, as co-founder of Lightspire Media, Leo is pivoting from studio leadership to content ownership. His vision is clear: to develop original, culturally resonant animated stories for a global audience infusing his signature creative finesse into IPs that reflect India's voice on the world stage.`,
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
              The visionary minds behind Lightspire Media, bringing together
              decades of experience in{" "}
              <span className="text-white">creative direction</span> and{" "}
              <span className="text-[#f5f5f5]">production excellence</span>.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className={`relative transition-transform duration-500 hover:scale-105 
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: `${founder.delay}ms` }}
              >
                {/* Founder Card */}
                <div className="relative bg-[#7a7a7a]/80 border border-white/20 rounded-3xl p-8 lg:p-10 flex flex-col">
                  {/* Avatar */}
                  <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  {/* Founder Info */}
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {founder.name}
                    </h3>
                    <p className="text-xl text-white font-semibold tracking-wide mb-6">
                      {founder.title}
                    </p>
                    <p className="text-lg text-[#f5f5f5] italic leading-relaxed mb-4 flex-grow">
                      "{founder.tagline}"
                    </p>
                    {/* Bio Accordion */}
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full mt-auto"
                    >
                      <AccordionItem value="bio">
                        <AccordionTrigger className="text-white hover:text-[#f5f5f5] hover:no-underline justify-center text-sm">
                          Read Full Bio
                        </AccordionTrigger>
                        <AccordionContent className="text-left text-[#f5f5f5] p-4 bg-[#6a6a6a]/50 rounded-lg mt-2 text-sm">
                          {founder.bio}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
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
            <div className="relative inline-block bg-[#7a7a7a]/80 border border-white/20 rounded-2xl px-8 py-6 backdrop-blur-sm">
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
      </div>
    </section>
  );
};

export default FoundersSection;
