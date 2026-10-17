import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { playWandClick } from "../utils/audio";

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !images || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Lightbox container */}
      <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center z-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => {
            playWandClick();
            onClose();
          }}
          className="absolute -top-12 right-0 sm:right-2 p-2 rounded-full border border-[#f59e0b]/40 text-[#fef08a] hover:bg-[#f59e0b]/20 transition-all cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>

        {/* Main Image Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-[#f59e0b]/40 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.25)] bg-[#05060c] max-h-[75vh]">
          <img
            src={current.src}
            alt={current.alt || "NIRVAN '26 Gallery Archive"}
            className="w-auto h-auto max-h-[75vh] max-w-full object-contain mx-auto"
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playWandClick();
              onPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-[#f59e0b]/40 text-[#fef08a] hover:bg-[#f59e0b] hover:text-black transition-all cursor-pointer shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playWandClick();
              onNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-[#f59e0b]/40 text-[#fef08a] hover:bg-[#f59e0b] hover:text-black transition-all cursor-pointer shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h4 className="font-display text-lg font-bold text-[#fef08a]">
            {current.alt || "Enchanted Archive"}
          </h4>
          <span className="font-mono text-xs text-[#cbd5e1] block mt-0.5">
            Artifact {currentIndex + 1} of {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
