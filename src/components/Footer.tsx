
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Linkedin, Instagram, Youtube, Heart, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and insights."
    });
    setEmail('');
  };

  const navigationLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work / Showreel', href: '#work' },
    { name: 'Founders', href: '#founders' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo + Tagline */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-wider text-gray-900 mb-2">
                LIGHT SPIRE MEDIA
              </h3>
              <p className="text-gray-600 text-lg font-light italic">
                "Stories that move. Frames that matter."
              </p>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Navigation</h4>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Stay Connected</h4>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-600 ${social.color} transition-all duration-200 hover:shadow-md hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div>
              <p className="text-gray-600 mb-3 text-sm">Get creative insights delivered to your inbox</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 transition-colors duration-200"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © 2025 Light Spire Media. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Built with <Heart className="h-4 w-4 mx-1 text-red-500" fill="currentColor" /> for creative excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
