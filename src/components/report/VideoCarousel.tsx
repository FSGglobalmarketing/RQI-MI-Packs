import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Eye, Clock, BarChart3 } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  videoId: string;
  totalViews: number;
  avgCompletion: number;
  peakEngagement: number;
}

const VIDEOS: VideoItem[] = [
  {
    id: "consistency",
    title: "Consistency and transparency in a complex world",
    videoId: "6391065128112",
    totalViews: 4,
    avgCompletion: 93,
    peakEngagement: 3.67,
  },
  {
    id: "value-strategies",
    title: "Value Strategies",
    videoId: "6391065343112",
    totalViews: 2,
    avgCompletion: 88,
    peakEngagement: 2.0,
  },
  {
    id: "morningstar-award",
    title: "ANZ RQI Investors Morningstar Award — Ausbiz Andrew Francis",
    videoId: "6391793262112",
    totalViews: 1,
    avgCompletion: 100,
    peakEngagement: 0.28,
  },
  {
    id: "our-strategies-value",
    title: "Our strategies — Value",
    videoId: "6391812395112",
    totalViews: 2,
    avgCompletion: 15,
    peakEngagement: 2.0,
  },
];

const ACCOUNT_ID = "1143621127001";

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const video = VIDEOS[current];

  const prev = () => setCurrent((c) => (c === 0 ? VIDEOS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === VIDEOS.length - 1 ? 0 : c + 1));

  return (
    <div className="mt-10">
      <h4 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2">
        <Play className="w-4 h-4 text-primary" />
        Demystified Video Series
      </h4>

      <div className="relative">
        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute -left-4 top-1/3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-background transition-all"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="absolute -right-4 top-1/3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-background transition-all"
          aria-label="Next video"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Video player */}
        <div className="rounded-xl overflow-hidden border border-foreground/10 bg-black">
          <div className="relative w-full" style={{ paddingTop: "50%" }}>
            <iframe
              key={video.videoId}
              src={`https://players.brightcove.net/${ACCOUNT_ID}/default_default/index.html?videoId=${video.videoId}`}
              allowFullScreen
              allow="encrypted-media"
              className="absolute inset-0 w-full h-full"
              title={video.title}
            />
          </div>
        </div>

        {/* Title + stats card */}
        <div className="mt-4 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5">
          <p className="text-sm font-semibold text-foreground mb-4">{video.title}</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground leading-none">{video.totalViews}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Total views</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground leading-none">{video.avgCompletion}%</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Avg completion</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground leading-none">{video.peakEngagement}x</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Peak engagement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-primary w-6" : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
