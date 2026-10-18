import { ArrowUp, Heart, Code2, AtSign, Globe, Mail } from "lucide-react";
import { playWandClick } from "../utils/audio";

const socialLinks = [
  { icon: AtSign, href: "#", label: "Social" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Mail, href: "mailto:nirvan@gehu.in", label: "Email" },
  { icon: Code2, href: "#", label: "GitHub" },
];

export default function Footer() {
  const scrollToTop = () => {
    playWandClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id) => {
    playWandClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#f59e0b]/15 bg-[#04050a] relative overflow-hidden text-[#cbd5e1]">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1e2438]">
          {/* Brand & Crest Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0e1122] border border-[#f59e0b]/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <img
                  src="/gehu_logo.svg"
                  alt="GEHU Crest"
                  className="w-8 h-8 object-contain"
                />
                <div className="h-5 w-px bg-white/15" />
                <img
                  src="/techgeeks-white.svg"
                  alt="Tech Geeks Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <h3 className="font-magical text-xl font-bold text-shimmer leading-none">
                  NIRVAN '26
                </h3>
                <span className="label-mono text-[9px] text-[#94a3b8] mt-0.5 block">
                  GRAPHIC ERA HILL UNIVERSITY • HALDWANI
                </span>
              </div>
            </div>

            <p className="text-sm text-[#94a3b8] font-body leading-relaxed max-w-sm">
              The flagship annual technical conclave bringing together university developers, designers, and innovators. Where Ideas Become Innovation.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[#0c0f1e] border border-[#2a3154] flex items-center justify-center text-[#94a3b8] hover:text-[#fef08a] hover:border-[#f59e0b]/50 hover:bg-[#f59e0b]/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="label-mono text-[#f59e0b] text-xs tracking-widest font-bold">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {[
                { id: "about", label: "About NIRVAN '26" },
                { id: "events", label: "Events & Competitions" },
                { id: "schedule", label: "Festival Schedule" },
                { id: "speakers", label: "Keynote Speakers" },
                { id: "gallery", label: "Event Gallery" },
                { id: "sponsors", label: "Sponsors & Partners" },
                { id: "contact", label: "Contact & Venue" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="hover:text-[#fef08a] transition-colors cursor-pointer text-left hover:translate-x-1 transform duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Location */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="label-mono text-[#f59e0b] text-xs tracking-widest font-bold">
              CAMPUS VENUE
            </h4>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              <strong className="text-white block font-display text-sm mb-1">
                Graphic Era Hill University
              </strong>
              Haldwani Campus, Kalyanpur, Lamachaur,
              <br />
              Uttarakhand 263139
            </p>
            <div className="pt-1 space-y-1.5 text-xs font-mono text-stone-400">
              <p>
                Email:{" "}
                <a href="mailto:nirvan@gehu.in" className="text-[#fef08a] hover:underline">
                  nirvan@gehu.in
                </a>
              </p>
              <p>
                Inquiries: <span className="text-[#fef08a]">+91 1256489632</span>
              </p>
              <p>
                Organized by: <span className="text-[#818cf8]">Tech Geeks Club</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
          <span className="flex items-center gap-1.5">
            © 2026 NIRVAN Technical Fest • Made with
            <Heart size={12} className="text-[#ef4444] fill-[#ef4444]" />
            by Tech Geeks
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a3154] bg-[#0e1122] text-[#fef08a] hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all cursor-pointer text-xs group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
