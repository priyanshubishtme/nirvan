import { ArrowUp } from "lucide-react";
import { playWandClick } from "../utils/audio";

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
    <footer className="border-t border-[#f59e0b]/20 bg-[#06070d] relative overflow-hidden text-[#cbd5e1]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2a3154]">
          {/* Brand & Crest Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0e1122] border border-[#f59e0b]/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <img
                  src="/gehu_logo.svg"
                  alt="GEHU Crest"
                  className="w-8 h-8 object-contain"
                />
                <div className="h-5 w-px bg-white/20" />
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
                <span className="label-mono text-[9px] text-[#fef08a] mt-0.5 block">
                  GRAPHIC ERA HILL UNIVERSITY • HALDWANI
                </span>
              </div>
            </div>

            <p className="text-sm text-[#cbd5e1] font-body leading-relaxed max-w-sm">
              The flagship annual technical conclave of Graphic Era Hill University. Where Ideas Become Innovation through hackathons, competitive programming, robotics, and creative sprints.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
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
                    className="hover:text-[#fef08a] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Location */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="label-mono text-[#f59e0b] text-xs tracking-widest font-bold">
              CAMPUS VENUE
            </h4>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              <strong className="text-white block font-display text-sm">
                Graphic Era Hill University, Haldwani Campus
              </strong>
              Kalyanpur, Lamachaur, Haldwani, Uttarakhand 263139
            </p>
            <div className="pt-2 space-y-1 text-xs font-mono text-stone-400">
              <p>Email: <span className="text-[#fef08a]">nirvan@gehu.in</span></p>
              <p>Inquiries: <span className="text-[#fef08a]">+91 1256489632</span></p>
              <p>Organized by: <span className="text-[#818cf8]">Tech Geeks Club</span></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#cbd5e1]">
          <span>© 2026 NIRVAN Technical Fest • Graphic Era Hill University.</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#f59e0b]/30 bg-[#0e1122] text-[#fef08a] hover:border-[#fef08a] transition-all cursor-pointer text-xs"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
