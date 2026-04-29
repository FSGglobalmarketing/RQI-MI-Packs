import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import fmotyPhoto from "@/assets/fmoty-photo.jpg";
import fmotyTrophy from "@/assets/fmoty-trophy.png";

interface Slide {
  src: string;
  caption: string;
}

const SLIDES: Slide[] = [
  { src: fmotyPhoto,  caption: "RQI team accepting the Morningstar Fund Manager of the Year Award" },
  { src: fmotyTrophy, caption: "RQI team — Morningstar Awards 2026, Sydney" },
];

export default function FmotyCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[idx];

  return (
    <div
      className="w-full max-w-[640px] mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Frame */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black/5" style={{ aspectRatio: "4 / 5" }}>
        {SLIDES.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.caption}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}

        {/* Caption gradient */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
          <p className="text-xs font-medium text-white/95 leading-snug">
            {slide.caption}
          </p>
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? "w-8 bg-primary" : "w-3 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
