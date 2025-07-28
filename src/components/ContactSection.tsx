import { useEffect, useRef, useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScheduleCallForm from "@/components/ScheduleCallForm";
import gsap from "gsap";
// @ts-ignore
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const PremiumContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !headlineRef.current) return;
    const split = new SplitText(headlineRef.current, {
      type: "chars,words,lines",
    });
    const tl = gsap.timeline();
    tl.from(
      split.chars,
      {
        duration: 0.6,
        autoAlpha: 0,
        scale: 3,
        force3D: true,
        stagger: 0.02,
      },
      0.5
    )
      .to(
        split.words,
        {
          duration: 0.2,
          color: "#0678cf",
          scale: 0.9,
          stagger: 0.1,
        },
        "words"
      )
      .to(
        split.words,
        {
          duration: 0.4,
          color: "white",
          scale: 1,
          stagger: 0.1,
        },
        "words+=0.1"
      );
    return () => split.revert();
  }, [isVisible]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "connect@lightspiremedia.tv",
      subtext: "Quick response within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 9840880908 / +91 9841937856",
      subtext: "Mon-Fri, 9 AM - 6 PM IST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: (
        <>
          New no.111, AWFIS Building <br />
          Rajiv Gandhi Salai, Kandanvhavadi, OMR,
        </>
      ),
      subtext: "Chennai, Tamil Nadu, INDIA - 600096",
    },
    // {
    //   icon: Clock,
    //   title: "Working Hours",
    //   content: "Mon - Fri: 9 AM - 6 PM",
    //   subtext: "Weekend consultations available"
    // }
  ];

  return (
   <div className="bg-[#fcfcfc]">
     <section
      ref={sectionRef}
      className="relative bg-[#0678cf] py-20 md:py-32 overflow-hidden"
      id="contact"
      style={{
        clipPath: "polygon(0 3vw, 100% 0, 100% 100%, 0 calc(100% - 3vw))",
        paddingTop: "6rem", // Add extra padding for top slant
        paddingBottom: "6rem", // Add extra padding for bottom slant
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 md:top-20 left-5 md:left-20 w-60 md:w-96 h-60 md:h-96 bg-gradient-radial from-cyan-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-16 md:bottom-32 right-5 md:right-20 w-48 md:w-80 h-48 md:h-80 bg-gradient-radial from-purple-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Existing floating elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {/* <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" /> */}
          </div>
        ))}
      </div>

      <div className="max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div
            className={`inline-flex items-center gap-2 md:gap-3 mb-6 md:mb-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <Send className="w-6 h-6 md:w-8 md:h-8 text-white" />
            <span className="text-white font-semibold text-base md:text-lg tracking-wider">
              GET IN TOUCH
            </span>
          </div>

          <h2
            ref={headlineRef}
            className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-tight transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            Let's Bring Your
            <span className=" text-black"> Vision to Life</span>
          </h2>

          <p
            className={`text-base sm:text-xl md:text-2xl text-blue-100 max-w-xl md:max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            Ready to create something extraordinary? <br /> Let's discuss your
            next animated masterpiece.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-white backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border border-white/30">
              <h3 className="text-xl md:text-2xl font-bold text-[#0678cf] mb-6 md:mb-8">
                Start Your Project
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-[#0678cf] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#e6f2ff] border border-[#0678cf] rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0678cf] focus:border-transparent transition-all duration-300 group-hover:shadow-md text-[#0678cf] placeholder:text-[#6bb2f3]"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-[#0678cf] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#e6f2ff] border border-[#0678cf] rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0678cf] focus:border-transparent transition-all duration-300 group-hover:shadow-md text-[#0678cf] placeholder:text-[#6bb2f3]"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Company Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-[#0678cf] mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#e6f2ff] border border-[#0678cf] rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0678cf] focus:border-transparent transition-all duration-300 group-hover:shadow-md text-[#0678cf] placeholder:text-[#6bb2f3]"
                    placeholder="Your company name"
                  />
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-[#0678cf] mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#e6f2ff] border border-[#0678cf] rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0678cf] focus:border-transparent transition-all duration-300 group-hover:shadow-md text-[#0678cf] placeholder:text-[#6bb2f3] resize-none"
                    placeholder="Tell us about your animation project, timeline, and goals..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-[#0678cf] hover:bg-[#045a9e] text-white hover:text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl rounded-xl md:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:text-[#0678cf] transition-transform duration-300" />
                      Send Message
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:text-[#0678cf] transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-6 md:space-y-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="group bg-white backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-[#0678cf]/30 hover:shadow-xl transition-all duration-500 hover:scale-105"
                    style={{
                      animationDelay: `${1000 + index * 100}ms`,
                      animation: isVisible
                        ? "fade-in 0.8s ease-out forwards"
                        : "none",
                    }}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0678cf] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-lg font-bold text-[#0678cf] mb-1 group-hover:text-[#045a9e] transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-[#0678cf] font-semibold mb-1 text-sm md:text-base">
                          {info.content}
                        </p>
                        <p className="text-[#6bb2f3] text-xs md:text-sm">
                          {info.subtext}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Box */}
            <div className="mt-8 md:mt-12 bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 text-[#0678cf] relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                  Ready for a Quick Chat?
                </h4>
                <p className="text-[#0678cf] mb-4 md:mb-6 font-light text-sm md:text-base">
                  Schedule a 15-minute discovery call to discuss your project
                  requirements and timeline.
                </p>
                <ScheduleCallForm>
                  <Button
                    variant="outline"
                    className="bg-[#0678cf] border-white/20 text-white hover:bg-[#045a9e] hover:text-white transition-all duration-300 font-semibold"
                  >
                    Schedule Call
                  </Button>
                </ScheduleCallForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   </div>
  );
};

export default PremiumContactSection;
