import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MenuItem {
  name: string;
  href: string;
}

interface ScrollSpyProps {
  menuItems: MenuItem[];
  className?: string;
}

const ScrollSpy = ({ menuItems, className }: ScrollSpyProps) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section && scrollPosition >= section.offsetTop) {
          const sectionId = section.id;
          setActiveSection(`#${sectionId}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={cn(
        "fixed right-6 top-[40%] transform -translate-y-1/2 z-40 hidden lg:block animate-scrollspy-fade-in",
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        {menuItems.map((item, index) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.href)}
            className={cn(
              "group relative flex items-center justify-end transition-all duration-300 ease-out",
              "hover:scale-110 transform-gpu"
            )}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {/* Active indicator line */}
            <div
              className={cn(
                "absolute right-0 w-8 h-0.5 transition-all duration-300",
                activeSection === item.href
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              )}
              style={{
                backgroundColor:
                  activeSection === item.href ? "#0678cf" : "transparent",
              }}
            />

            {/* Menu item text */}
            <span
              className={cn(
                "text-sm font-medium transition-all duration-300 whitespace-nowrap text-3xl",
                "group-hover:translate-x-1 transform-gpu",
                activeSection === item.href ? "font-semibold" : "text-gray-600"
              )}
              style={{
                color:
                  activeSection === item.href
                    ? "#0678cf"
                    : activeSection !== item.href
                    ? "#6b7280" // gray-600 equivalent
                    : "#0678cf",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.href) {
                  e.currentTarget.style.color = "#0678cf";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.href) {
                  e.currentTarget.style.color = "#6b7280";
                }
              }}
            >
              {item.name}
            </span>

            {/* Active dot indicator */}
            <div
              className={cn(
                "ml-2 w-2 h-2 rounded-full transition-all duration-300",
                activeSection === item.href
                  ? "scale-100 shadow-[0_0_8px_rgba(6,120,207,0.6)] animate-scrollspy-pulse"
                  : "bg-gray-400 scale-75 group-hover:scale-90"
              )}
              style={{
                backgroundColor:
                  activeSection === item.href ? "#0678cf" : "#9ca3af",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.href) {
                  e.currentTarget.style.backgroundColor = "#0678cf";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.href) {
                  e.currentTarget.style.backgroundColor = "#9ca3af";
                }
              }}
            />
          </button>
        ))}
      </div>

      {/* Vertical line connecting items */}
      <div className="absolute right-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

      {/* Background blur effect */}
      <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-sm rounded-full blur-xl" />
    </div>
  );
};

export default ScrollSpy;
