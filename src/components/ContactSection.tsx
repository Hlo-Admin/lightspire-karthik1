
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours."
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Bring Your Vision to Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether it's a feature film, a series, or a co-production—start the conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-700 font-medium">
                  Company/Organization
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                  placeholder="Your company name (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="group w-full bg-[#0779cf] from-brand to-purple-600 hover:from-brand hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                Send Message
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in touch</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Ready to transform your creative vision into stunning reality? Our team is here to collaborate with you every step of the way.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <a 
                    href="mailto:hello@lightspiremedia.com" 
                    className="text-brand hover:text-brand/80 transition-colors duration-200"
                  >
                    hello@lightspiremedia.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <a 
                    href="tel:+91XXXXXXXXXX" 
                    className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
                  >
                    +91-XXXXXXXXXX
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Studio Location</h4>
                  <p className="text-green-600">Chennai, India</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-brand/10 to-purple-50 rounded-xl p-6 border border-brand/20">
              <h4 className="font-semibold text-gray-900 mb-2">Ready to start your project?</h4>
              <p className="text-gray-600 mb-4">
                Let's discuss how we can bring your creative vision to life with our expertise in 2D, 3D, and VFX.
              </p>
              <Button 
                variant="outline" 
                className="border-brand text-brand hover:bg-brand/10 hover:border-brand/80 transition-all duration-200"
              >
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
