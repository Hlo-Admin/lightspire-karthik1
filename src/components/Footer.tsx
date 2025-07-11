import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Instagram, Youtube, Heart, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and insights.",
    });
    setEmail("");
  };

  const navigationLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work / Showreel", href: "#work" },
    { name: "Founders", href: "#founders" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-400",
    },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-400" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo + Tagline */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-wider text-white mb-2 font-toasty">
                LIGHT SPIRE MEDIA
              </h3>
              <p className="text-gray-400 text-lg font-light italic font-toasty">
                "Stories that move. Frames that matter."
              </p>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 font-toasty">
              Navigation
            </h4>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200 relative group font-toasty w-fit"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-6 font-toasty">
              Stay Connected
            </h4>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 rounded-full shadow-sm flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:shadow-lg hover:scale-110 border border-gray-700 hover:border-gray-600`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div>
              <p className="text-gray-400 mb-3 text-sm font-toasty">
                Get creative insights delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-500 font-toasty"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 transition-colors duration-200"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm font-toasty">
              © 2025 Light Spire Media. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center font-toasty">
              Built with{" "}
              <Heart
                className="h-4 w-4 mx-1 text-red-400"
                fill="currentColor"
              />{" "}
              for creative excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
