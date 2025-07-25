import { useEffect, useRef, useState, Suspense, lazy } from "react";
import {
  Target,
  Award,
  Building2,
  Sparkles,
  Play,
  Crown,
  Zap,
  Globe,
  Film,
  Tv,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <section
      ref={sectionRef}
      className="relative py-0 overflow-visible"
      id="about"
    >
      <div
        className="relative w-full"
        style={{
          background: "#0678cf", // Blue background - bottom layer
          clipPath: "polygon(0 3vw, 100% 0, 100% 100%, 0 calc(100% - 3vw))",
          paddingTop: "6rem",
          paddingBottom: "6rem",
        }}
      >
        {/* World Map Background - middle layer */}
        <div
          className="absolute inset-0 z-10 opacity-30"
          style={{
            backgroundImage: `url('/lovable-uploads/1bfa71d5-65c9-42ee-919c-06fbd6583e7a.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Content Container - top layer */}
        <div className="max-w-7xl mx-auto px-6 relative z-20">
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
              <h2 className="text-5xl md:text-6xl font-bold text-[#f5f5f5] mb-6">
                About <span className="text-white">LIGHTSPIRE MEDIA</span>
              </h2>
              <div className="w-24 h-1 bg-[#f5f5f5] mx-auto mb-8"></div>
              <p className="text-xl text-[#f5f5f5] max-w-3xl mx-auto leading-relaxed">
                Crafting stories with character, color, and{" "}
                <span className="text-white">cinematic precision</span>.
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - About Description and Experience Card */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              {/* About Description */}
              <div className="bg-[#0678cf]/60 backdrop-blur-sm border border-[#f5f5f5]/30 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-white mr-3" />
                  <h3 className="text-2xl font-bold text-white">About Us</h3>
                </div>
                <p className="text-[#f5f5f5] leading-relaxed mb-6">
                  LIGHTSPIRE MEDIA is a creative animation studio specializing
                  in <span className="text-white">2D animation</span> for TV
                  animated series, OTT platforms, and feature films. With a
                  strong foundation in visual storytelling and character driven
                  design, we craft high quality animation that captivates
                  audiences and enhances the viewer experience. Our work is
                  rooted in a passion for art and motion, bringing bold,
                  original ideas to life with clarity and impact.
                </p>
                <p className="text-white leading-relaxed">
                  Alongside our primary focus on 2D, we also provide{" "}
                  <span className="text-white">
                    3D animation and VFX services
                  </span>{" "}
                  to support a variety of creative needs, including video games,
                  advertisements, mobile apps, and social media networks. At
                  LIGHTSPIRE MEDIA, we blend creativity and technical expertise
                  to deliver visually engaging content across entertainment and
                  digital platforms.
                </p>
              </div>

              {/* Experience Card */}
              <div className="bg-[#0678cf]/60 backdrop-blur-sm border border-[#f5f5f5]/30 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-white mr-2" />
                  <div className="text-4xl font-bold text-white">
                    {yearsCount}+
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Years of Excellence
                </h3>
                <p className="text-[#f5f5f5] text-sm">
                  Over two decades mastering{" "}
                  <span className="text-white">animation</span> and{" "}
                  <span className="text-white">visual effects</span>.
                </p>
              </div>
            </div>

            {/* Right Column - Optimized Spline 3D Component */}
            {!isMobile && (
              <div
                className={`transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden">
                  <Suspense fallback={<SplineLoader />}>
                    <LazySpline
                      scene="https://prod.spline.design/6dQW-8PtBylGcVV9/scene.splinecode"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Suspense>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Quote */}
          <div
            className={`text-center transition-all pt-16 duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative inline-block bg-[#0678cf]/60 backdrop-blur-sm border border-[#f5f5f5]/30 rounded-2xl px-12 py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f5]/10 via-[#0678cf]/10 to-white/10 rounded-2xl blur-xl"></div>
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white mr-4 animate-pulse" />
                <p className="text-2xl md:text-3xl font-bold text-white">
                  "We don't just animate. We envision worlds, frame by frame."
                </p>
                <Sparkles
                  className="w-8 h-8 text-[#f5f5f5] ml-4 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
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
