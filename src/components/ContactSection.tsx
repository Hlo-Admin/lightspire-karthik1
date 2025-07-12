
import { useEffect, useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PremiumContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@lightspire.media",
      subtext: "Quick response within 24 hours"
    },
    {
      icon: Phone, 
      title: "Call Us",
      content: "+1 (555) 123-4567",
      subtext: "Mon-Fri, 9 AM - 6 PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Creative District, Animation Hub",
      subtext: "Los Angeles, CA 90028"
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Fri: 9 AM - 6 PM",
      subtext: "Weekend consultations available"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-32 overflow-hidden"
      id="contact"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-cyan-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-blue-400" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-3 mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <Send className="w-8 h-8 text-[#0678cf]" />
            <span className="text-[#0678cf] font-semibold text-lg tracking-wider">GET IN TOUCH</span>
          </div>

          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}>
            Let's Bring Your 
            <span className=" text-[#0678cf]"> Vision to Life</span>
          </h2>

          <p className={`text-xl md:text-2xl text-[#8a8a8a] max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            Ready to create something extraordinary? Let's discuss your next animated masterpiece.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Start Your Project</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
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
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
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
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
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
                    rows={5}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md resize-none"
                    placeholder="Tell us about your animation project, timeline, and goals..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-[#0678cf] from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-500 hover:scale-105"
                    style={{ 
                      animationDelay: `${1000 + index * 100}ms`,
                      animation: isVisible ? 'fade-in 0.8s ease-out forwards' : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#0678cf] from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-gray-800 font-semibold mb-1">
                          {info.content}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {info.subtext}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-[#0678cf] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-3">Ready for a Quick Chat?</h4>
                <p className="text-blue-100 mb-6 font-light">
                  Schedule a 15-minute discovery call to discuss your project requirements and timeline.
                </p>
                <Button 
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold"
                >
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumContactSection;
