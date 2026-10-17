import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "schedule", label: "Schedule" },
  { id: "speakers", label: "Speakers" },
  { id: "gallery", label: "Gallery" },
  { id: "sponsors", label: "Sponsors" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ onOpenRegister }) {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const scrollPos = window.scrollY + 180;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070810]/95 backdrop-blur-md border-b border-[#f59e0b]/20 shadow-[0_4px_25px_rgba(0,0,0,0.8)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Title — Clean, Zero Overlap */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <img
                src="/gehu_logo.svg"
                alt="GEHU Crest"
                className="w-9 h-9 object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)] transition-transform group-hover:scale-105"
              />
              <div className="h-6 w-px bg-white/20 hidden sm:block" />
              <img
                src="/techgeeks-white.svg"
                alt="Tech Geeks Logo"
                className="w-7 h-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity hidden sm:block"
              />
            </div>
            <div className="border-l border-[#f59e0b]/30 pl-3">
              <span className="font-magical text-lg sm:text-xl font-bold text-shimmer tracking-wider leading-none block">
                NIRVAN '26
              </span>
              <span className="label-mono text-[9px] text-[#cbd5e1] block tracking-[0.16em] mt-0.5">
                GEHU HALDWANI
              </span>
            </div>
          </button>

          {/* Clean Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative text-xs sm:text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer ${
                    isActive
                      ? "text-[#fef08a] font-semibold"
                      : "text-[#cbd5e1] hover:text-white"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f59e0b] to-[#fef08a] rounded-full shadow-[0_0_8px_#f59e0b]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Clean Register Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="btn-gold !py-2 !px-5 text-xs sm:text-sm tracking-wider cursor-pointer"
            >
              <span>REGISTER</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#cbd5e1] hover:text-white hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-[#0a0c16] border-l border-[#f59e0b]/20 p-6 flex flex-col justify-between shadow-2xl pt-20">
            <div className="space-y-4">
              <span className="label-mono text-[10px] text-[#f59e0b] block tracking-widest pb-2 border-b border-white/10">
                NAVIGATION
              </span>
              <div className="flex flex-col gap-2">
                {navLinks.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeSection === id
                        ? "text-[#fef08a] bg-[#f59e0b]/15 font-semibold"
                        : "text-[#cbd5e1] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenRegister();
              }}
              className="btn-gold w-full text-center py-2.5 text-xs tracking-wider"
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      )}
    </>
  );
}
