import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Clock } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  videoId: string;
  totalViews: number;
  avgCompletion: number;
}

const VIDEOS: VideoItem[] = [
  { id: "consistency",          title: "Consistency and transparency in a complex world", videoId: "6391065128112", totalViews: 109, avgCompletion: 93 },
  { id: "value-strategies",     title: "Value Strategies",                                videoId: "6391065343112", totalViews: 113, avgCompletion: 88 },
  { id: "our-strategies-value", title: "Our strategies — Value",                          videoId: "6391812395112", totalViews:  20, avgCompletion: 15 },
];

const ACCOUNT_ID = "1143621127001";

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const video = VIDEOS[current];
  const total = VIDEOS.length;

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <div className="w-full max-w-[720px] mx-auto">
      {/* Player */}
      <div className="relative">
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
          style={{ aspectRatio: "16 / 9" }}
        >
          <iframe
            key={video.videoId}
            src={`https://players.brightcove.net/${ACCOUNT_ID}/default_default/index.html?videoId=${video.videoId}`}
            allowFullScreen
            allow="encrypted-media"
            className="absolute inset-0 w-full h-full"
            title={video.title}
          />
        </div>

        {/* Arrows — outside the player so they don't collide with controls */}
        <button
          onClick={prev}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-secondary-foreground/10 shadow-lg flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-secondary-foreground/10 shadow-lg flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          aria-label="Next video"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Title + clean metric strip */}
      <div className="mt-5">
        <p className="text-base font-semibold text-secondary-foreground mb-3 leading-snug">
          {video.title}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-secondary-foreground/10 bg-white px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-secondary-foreground leading-none tabular-nums">{video.totalViews}</p>
              <p className="text-[11px] text-secondary-foreground/55 mt-1">Total views</p>
            </div>
          </div>
          <div className="rounded-xl border border-secondary-foreground/10 bg-white px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-secondary-foreground leading-none tabular-nums">{video.avgCompletion}%</p>
              <p className="text-[11px] text-secondary-foreground/55 mt-1">Avg completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-3 bg-secondary-foreground/20 hover:bg-secondary-foreground/40"
            }`}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
