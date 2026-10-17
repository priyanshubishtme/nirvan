import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  User,
  Mail,
  Phone,
  GraduationCap,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Users,
  ShieldCheck,
} from "lucide-react";
import { events } from "../data/events";
import { playSpellSound, playWandClick } from "../utils/audio";

export default function RegisterModal({ isOpen, onClose, preSelectedEvent = "" }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "Graphic Era Hill University, Haldwani",
    eventSlug: preSelectedEvent || (events[0] ? events[0].slug : ""),
    teamSize: "1",
    teamMembers: "",
    agreeToTerms: true,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preSelectedEvent) {
      setFormData((prev) => ({ ...prev, eventSlug: preSelectedEvent }));
    }
  }, [preSelectedEvent]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    playWandClick();
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.college) {
        alert("Please fill in all attendee contact details.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.eventSlug) {
        alert("Please select an event.");
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    playWandClick();
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playSpellSound();
    setSubmitted(true);
  };

  const handleClose = () => {
    playWandClick();
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  const selectedEventObj = events.find((e) => e.slug === formData.eventSlug) || events[0];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Spacious Full Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0a0d1a] border border-[#f59e0b]/40 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden z-10 animate-fade-in my-auto">
        {/* Shimmering Top Edge */}
        <div className="h-1.5 bg-gradient-to-r from-[#f59e0b] via-[#fef08a] to-[#818cf8]" />

        <div className="p-6 sm:p-10">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-[#1f2542] mb-6">
            <div>
              <span className="label-mono text-[#f59e0b] text-[10px] tracking-widest block font-bold">
                NIRVAN '26 OFFICIAL REGISTRATION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                Delegate Pass & Entry
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl border border-[#2a3154] text-[#cbd5e1] hover:text-white hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all cursor-pointer"
              aria-label="Close registration"
            >
              <X size={18} />
            </button>
          </div>

          {/* Stepper Progress Bar (Only visible before final submission) */}
          {!submitted && (
            <div className="flex items-center justify-between gap-2 mb-8 px-2 sm:px-6">
              {[
                { num: 1, label: "Personal Info" },
                { num: 2, label: "Event & Team" },
                { num: 3, label: "Confirm Pass" },
              ].map((s, idx) => {
                const isActive = step === s.num;
                const isPassed = step > s.num;
                return (
                  <div key={s.num} className="flex-1 flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#f59e0b] text-[#070810] shadow-[0_0_15px_#f59e0b]"
                            : isPassed
                            ? "bg-[#10b981] text-white"
                            : "bg-[#14182c] text-stone-400 border border-[#2a3154]"
                        }`}
                      >
                        {isPassed ? "✓" : s.num}
                      </div>
                      <span
                        className={`text-xs font-mono hidden sm:inline ${
                          isActive
                            ? "text-[#fef08a] font-bold"
                            : isPassed
                            ? "text-stone-300"
                            : "text-stone-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 rounded transition-all ${
                          step > idx + 1 ? "bg-[#10b981]" : "bg-[#1f2542]"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {submitted ? (
            /* Registration Success & Digital Delegate Pass */
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981] mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <CheckCircle2 size={36} className="text-[#34d399]" />
              </div>

              <div>
                <span className="label-mono text-[#34d399] text-xs tracking-widest block mb-1 font-bold">
                  PASS ALLOCATED SUCCESSFULLY
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Welcome to NIRVAN '26!
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-md mx-auto">
                  A verification confirmation has been recorded for your college delegation.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12162e] to-[#080a14] border border-[#f59e0b]/40 text-left space-y-3 font-mono shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[#fef08a] font-bold text-sm tracking-wider">
                    NIRVAN '26 DELEGATE PASS
                  </span>
                  <span className="text-[10px] text-[#10b981] bg-[#10b981]/15 px-2 py-0.5 rounded border border-[#10b981]/30">
                    VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">DELEGATE NAME</span>
                    <strong className="text-white text-sm font-display">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">EVENT ASSIGNED</span>
                    <strong className="text-[#fef08a] text-sm font-display">{selectedEventObj?.title}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">INSTITUTION</span>
                    <span className="text-stone-300 truncate block">{formData.college}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">TEAM COMPOSITION</span>
                    <span className="text-stone-300">{formData.teamSize} Member(s)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                  <span>DATES: OCT 24 – 26, 2026</span>
                  <span className="text-[#818cf8]">GEHU HALDWANI CAMPUS</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="btn-gold w-full text-center py-3.5 tracking-wider font-bold cursor-pointer"
              >
                CLOSE & EXPLORE FESTIVAL
              </button>
            </div>
          ) : (
            <div>
              {/* Step 1: Attendee Information */}
              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-5 animate-fade-in">
                  <div>
                    <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-3 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aryan Sharma"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl pl-10 pr-4 py-3 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                        EMAIL ADDRESS *
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-3 text-stone-400" />
                        <input
                          type="email"
                          required
                          placeholder="aryan@college.edu"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl pl-10 pr-4 py-3 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                        PHONE / WHATSAPP *
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-3 text-stone-400" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl pl-10 pr-4 py-3 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                      COLLEGE / UNIVERSITY *
                    </label>
                    <div className="relative">
                      <GraduationCap size={16} className="absolute left-3.5 top-3 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Graphic Era Hill University"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl pl-10 pr-4 py-3 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="btn-gold !py-3 !px-8 text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      <span>CONTINUE TO EVENT SELECTION</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Event Selection & Team Configuration */}
              {step === 2 && (
                <form onSubmit={handleNext} className="space-y-5 animate-fade-in">
                  <div>
                    <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                      CHOOSE COMPETITION / CHALLENGE *
                    </label>
                    <select
                      name="eventSlug"
                      value={formData.eventSlug}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all cursor-pointer"
                    >
                      {events.map((ev) => (
                        <option key={ev.slug} value={ev.slug} className="bg-[#0b0e1a] py-1">
                          {ev.title} — {ev.category.toUpperCase()} (Prize: {ev.prize} • Fee: {ev.fee})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Event Summary Preview */}
                  <div className="p-4 rounded-xl bg-[#14182c] border border-[#f59e0b]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#f59e0b] block font-bold">
                        SELECTED EVENT
                      </span>
                      <h4 className="font-display text-lg font-bold text-white">
                        {selectedEventObj.title}
                      </h4>
                      <p className="text-xs text-stone-300 font-mono mt-0.5">
                        Venue: {selectedEventObj.venue} • Duration: {selectedEventObj.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-[#fef08a] block font-bold">
                        Prize: {selectedEventObj.prize}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        Fee: {selectedEventObj.fee}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                        TEAM SIZE *
                      </label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all cursor-pointer"
                      >
                        <option value="1">1 (Solo Participant)</option>
                        <option value="2">2 Members</option>
                        <option value="3">3 Members</option>
                        <option value="4">4 Members</option>
                        <option value="5">5 Members (Hackathon max)</option>
                      </select>
                    </div>

                    <div>
                      <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                        TEAM / GUILD NAME (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Binary Wizards"
                        className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {parseInt(formData.teamSize) > 1 && (
                    <div>
                      <label className="label-mono text-[11px] text-[#cbd5e1] block mb-1.5 font-semibold">
                        TEAMMATES' FULL NAMES & EMAILS *
                      </label>
                      <textarea
                        rows={3}
                        required
                        name="teamMembers"
                        value={formData.teamMembers}
                        onChange={handleChange}
                        placeholder="Teammate 2: Name, Email&#10;Teammate 3: Name, Email"
                        className="w-full bg-[#12162a] border border-[#2a3154] rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                      />
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl border border-[#2a3154] text-xs font-mono text-stone-300 hover:text-white cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      <span>BACK</span>
                    </button>

                    <button
                      type="submit"
                      className="btn-gold !py-3 !px-8 text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      <span>PROCEED TO CONFIRM</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Review & Final Submission */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
                  <div className="p-5 rounded-2xl bg-[#0f1325] border border-[#2a3154] space-y-3 font-mono text-xs text-[#cbd5e1]">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white font-bold text-sm">
                      <span>DELEGATE REGISTRATION SUMMARY</span>
                      <span className="text-[#f59e0b]">{selectedEventObj.title}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="text-stone-400">Name:</span> {formData.fullName}</p>
                      <p><span className="text-stone-400">Email:</span> {formData.email}</p>
                      <p><span className="text-stone-400">Phone:</span> {formData.phone}</p>
                      <p><span className="text-stone-400">College:</span> {formData.college}</p>
                      <p><span className="text-stone-400">Team Size:</span> {formData.teamSize} Member(s)</p>
                      <p><span className="text-stone-400">Event Fee:</span> {selectedEventObj.fee}</p>
                    </div>

                    {formData.teamMembers && (
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-stone-400 block mb-0.5">Teammates:</span>
                        <p className="text-white whitespace-pre-line">{formData.teamMembers}</p>
                      </div>
                    )}
                  </div>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-[#080a14] border border-[#1f2542] cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="mt-1 accent-[#f59e0b] cursor-pointer"
                    />
                    <span className="text-xs text-stone-300 font-mono leading-relaxed">
                      I agree to the NIRVAN '26 Code of Conduct, confirm that our team members are enrolled students, and will present valid college photo IDs during check-in.
                    </span>
                  </label>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl border border-[#2a3154] text-xs font-mono text-stone-300 hover:text-white cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      <span>BACK</span>
                    </button>

                    <button
                      type="submit"
                      className="btn-gold !py-3 !px-8 text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                    >
                      <Sparkles size={16} />
                      <span>COMPLETE REGISTRATION</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
