import { useEffect, useRef, useState, Suspense, lazy } from "react";
import {
  Target,
  Award,
  Building2,
  Sparkles,
  Play,
  Crown,
  Zap,
  Film,
  Tv,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Globe } from "@/components/magicui/globe";
// --- GSAP for line animation ---
import gsap from "gsap";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);
// --- Custom hook for per-element visibility ---
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

// Lazy load Spline for better performance
const LazySpline = lazy(() => import("@splinetool/react-spline"));

// Optimized loading component
const SplineLoader = () => (
  <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-400 text-xs">Loading 3D Model...</p>
    </div>
  </div>
);

const AboutSectionDark = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const [yearsCount, setYearsCount] = useState(0);
  const [bottomLineVisible, setBottomLineVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // --- Add headlineRef for GSAP animation ---
  const [headlineRef, headlineVisible] =
    useElementVisible<HTMLHeadingElement>();
  // --- Add refs for paragraphs ---
  const [missionPara1Ref, missionPara1Visible] =
    useElementVisible<HTMLParagraphElement>();
  const [missionPara2Ref, missionPara2Visible] =
    useElementVisible<HTMLParagraphElement>();

  const [missionPara3Ref, missionPara3Visible] =
    useElementVisible<HTMLParagraphElement>();
  // --- Add ref for bottom quote ---
  const [bottomQuoteRef, bottomQuoteVisible] =
    useElementVisible<HTMLParagraphElement>();

  const studios = [
    { name: "Netflix", icon: Play, color: "text-red-500" },
    { name: "Disney+", icon: Crown, color: "text-blue-500" },
    { name: "Amazon Prime", icon: Zap, color: "text-blue-600" },
    { name: "HBO Max", icon: Tv, color: "text-purple-500" },
    { name: "Warner Bros", icon: Film, color: "text-blue-700" },
    { name: "Universal", icon: Globe, color: "text-green-600" },
    { name: "Sony Pictures", icon: Building2, color: "text-blue-800" },
    { name: "Paramount", icon: Sparkles, color: "text-indigo-600" },
  ];

  // Count-up animation for years
  useEffect(() => {
    if (countStarted && yearsCount < 27) {
      const timer = setTimeout(() => {
        setYearsCount((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [countStarted, yearsCount]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCountStarted(true), 1000);
        } else {
          setIsVisible(false);
          setCountStarted(false);
          setYearsCount(0);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBottomLineVisible(true);
          } else {
            setBottomLineVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // GSAP line animation for About heading
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

  // GSAP character animation for mission paragraph 1
  useEffect(() => {
    if (!missionPara1Visible || !missionPara1Ref.current) return;
    const split = new SplitText(missionPara1Ref.current, { type: "chars" });
    gsap.from(split.chars, {
      y: 20,
      opacity: 0,
      stagger: 0.005, // much faster
      duration: 0.3, // much faster
      ease: "power2.out",
      overwrite: "auto",
    });
    return () => split.revert();
  }, [missionPara1Visible, missionPara1Ref]);

  // GSAP character animation for mission paragraph 2
  useEffect(() => {
    if (!missionPara2Visible || !missionPara2Ref.current) return;
    const split = new SplitText(missionPara2Ref.current, { type: "chars" });
    gsap.from(split.chars, {
      y: 20,
      opacity: 0,
      stagger: 0.005, // much faster
      duration: 0.3, // much faster
      ease: "power2.out",
      overwrite: "auto",
    });
    return () => split.revert();
  }, [missionPara2Visible, missionPara2Ref]);

  // GSAP character animation for bottom quote
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

  // GSAP character animation for mission paragraph 3
  useEffect(() => {
    if (!missionPara3Visible || !missionPara3Ref.current) return;
    const split = new SplitText(missionPara3Ref.current, { type: "chars" });
    gsap.from(split.chars, {
      y: 20,
      opacity: 0,
      stagger: 0.005, // much faster
      duration: 0.3, // much faster
      ease: "power2.out",
      overwrite: "auto",
    });
    return () => split.revert();
  }, [missionPara3Visible, missionPara3Ref]);

  return (
    <section
      ref={sectionRef}
      className="relative py-0 overflow-visible"
      id="about"
    >
      <div
        className="relative"
        style={{
          // backgroundImage: "url('/abtbg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          clipPath: "polygon(0 3vw, 100% 0, 100% 100%, 0 calc(100% - 3vw))",
          paddingTop: "6rem", // Add extra padding for top slant
          paddingBottom: "6rem", // Add extra padding for bottom slant
        }}
      >
        {/* --- Background Layers Start --- */}
        {/* Blue Overlay Layer */}
        <div
          className="absolute inset-0 w-full h-full z-10"
          style={{
            background: "#0678cf",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />
        {/* --- Background Layers End --- */}
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          {/* Place ALL your content here, including background effects */}
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-32 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-20">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h2
                className="text-5xl md:text-6xl font-bold text-[#f5f5f5] mb-6"
                ref={headlineRef}
              >
                About <span className="text-white">Lightspire Media</span>
              </h2>
              <div className="w-24 h-1 bg-[#f5f5f5] mx-auto mb-8"></div>
              <p className="text-xl text-[#f5f5f5] max-w-3xl mx-auto leading-relaxed">
                <span className="text-white">
                  Creative to Final Frame <br />
                </span>
                We Do It All.
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="w-full flex flex-col items-center justify-center min-h-[500px]">
            <div
              className={`transition-all duration-1000 delay-300 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-8`}
            >
              {/* About Description */}
              <div className="bg-[#0678cf]/10 backdrop-blur-sm border border-[#f5f5f5]/20 rounded-2xl p-8 w-full max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/mission.svg"
                    alt="Mission Icon"
                    className="w-8 h-8 text-white mr-3"
                  />
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p
                  className="text-[#f5f5f5] leading-relaxed mb-6"
                  ref={missionPara1Ref}
                >
                  <span className="text-white font-semibold">
                    Lightspire Media
                  </span>{" "}
                  is a creative animation studio specializing in 2D animation
                  for TV animated series, OTT platforms, <br /> and feature
                  films. With a strong foundation in visual storytelling and
                  character driven design, we craft high-quality <br />
                  animation that captivates audiences and enhances the viewer
                  experience. Our work is rooted in a passion for art and
                  motion, bringing bold, original ideas to life with clarity and
                  impact.
                </p>
                <p
                  className="text-white leading-relaxed mb-6"
                  ref={missionPara2Ref}
                >
                  Alongside our primary focus on 2D, we also provide 3D
                  animation and VFX services to support a variety of creative
                  needs, including video games, advertisements, mobile apps, and
                  social media networks.
                </p>

                <p className="text-white leading-relaxed" ref={missionPara3Ref}>
                  At Lightspire Media, we blend creativity and technical
                  expertise to deliver visually engaging content across
                  entertainment and digital platforms.
                </p>
              </div>

              {/* Experience Card */}
              <div className="bg-[#0678cf]/10 backdrop-blur-sm border border-[#f5f5f5]/20 rounded-2xl p-6 text-center w-full max-w-xs mx-auto">
                <div className="flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-white mr-2" />
                  <div className="text-4xl font-bold text-white">
                    {yearsCount}+
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Years of Excellence
                </h3>
                {/* <p className="text-[#f5f5f5] text-sm">
                  Over two decades mastering{" "}
                  <span className="text-white">animation</span> and{" "}
                  <span className="text-white">visual effects</span>.
                </p> */}
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
                {/* <Sparkles className="w-8 h-8 text-white mr-4 animate-pulse" /> */}
                <p
                  className="text-2xl md:text-3xl font-bold text-white"
                  ref={bottomQuoteRef}
                >
                  "We don't just animate. We envision worlds, frame by frame."
                </p>
                {/* <Sparkles
                  className="w-8 h-8 text-[#f5f5f5] ml-4 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                /> */}
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </section>
  );
};

export default AboutSectionDark;
