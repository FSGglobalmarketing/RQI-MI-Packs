import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import bus1 from "@/assets/asia-phase3-bus-1.jpg";
import bus2 from "@/assets/asia-phase3-bus-2.jpg";
import busShelter from "@/assets/asia-phase3-bus-shelter.jpg";

const IMAGES = [
  { src: bus1, label: "Bus Wrap — Route 3700", info: { market: "Hong Kong", format: "Bus Wrap", detail: "30 buses across HK", liveDate: "Q1 2026" } },
  { src: bus2, label: "Bus Wrap — Route 4160", info: { market: "Hong Kong", format: "Bus Wrap", detail: "30 buses across HK", liveDate: "Q1 2026" } },
  { src: busShelter, label: "Bus Shelter PP", info: { market: "Hong Kong", format: "Bus Shelter Poster", detail: "3820×1710mm display", liveDate: "24 Mar 2026" } },
];

export default function AsiaPhaseIIIShowcase() {
  const [idx, setIdx] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const current = IMAGES[idx];

  const prev = () => { setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length); setShowInfo(false); };
  const next = () => { setIdx((i) => (i + 1) % IMAGES.length); setShowInfo(false); };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-3">
      {/* Image container */}
      <div className="relative w-full max-w-[720px]">
        {/* Info pin */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
          className="absolute top-3 right-3 z-40 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-[0_0_0_4px_hsl(var(--primary)/0.25)] hover:shadow-[0_0_0_6px_hsl(var(--primary)/0.3)] transition-all hover:scale-110"
          title={showInfo ? "Close" : "Ad info"}
        >
          {showInfo ? <X className="w-4 h-4 text-primary-foreground" /> : <Info className="w-4 h-4 text-primary-foreground" />}
        </button>

        {/* Info overlay */}
        {showInfo && (
          <div
            onClick={() => setShowInfo(false)}
            role="button"
            aria-label="Close ad info"
            className="absolute inset-0 z-30 bg-black/75 backdrop-blur-sm flex items-center justify-center rounded-xl p-4 animate-in fade-in duration-200 cursor-pointer"
          >
            <div className="text-center space-y-2">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">{current.info.format}</p>
              <div className="space-y-1">
                <p className="text-white text-sm"><span className="text-white">Market:</span> {current.info.market}</p>
                <p className="text-white text-sm"><span className="text-white">Detail:</span> {current.info.detail}</p>
                <p className="text-white text-sm"><span className="text-white">Live:</span> {current.info.liveDate}</p>
              </div>
              <p className="text-[10px] text-white/60 uppercase tracking-wider pt-2">Tap to close</p>
            </div>
          </div>
        )}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-[-36px] top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-secondary-foreground" />
        </button>
        <button
          onClick={next}
          className="absolute right-[-36px] top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-4 h-4 text-secondary-foreground" />
        </button>

        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={current.src}
            alt={current.label}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Caption + dots */}
      <p className="text-xs font-medium text-secondary-foreground/60">{current.label}</p>
      <div className="flex gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setShowInfo(false); }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === idx ? "bg-primary scale-125" : "bg-secondary-foreground/20 hover:bg-secondary-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
