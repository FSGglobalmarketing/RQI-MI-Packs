import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import fmotyPhoto from "@/assets/fmoty-photo.jpg";
import fmotyTrophy from "@/assets/fmoty-trophy.png";

const TABS = ["Event", "Interview", "Sponsored Content", "Website"] as const;
type Tab = typeof TABS[number];

const EVENT_IMAGES = [
  { src: fmotyPhoto,  caption: "RQI team accepting the Morningstar Fund Manager of the Year Award" },
  { src: fmotyTrophy, caption: "RQI team — Morningstar Awards 2026, Sydney" },
];

const BRIGHTCOVE_ACCOUNT = "1143621127001";
const INTERVIEW_VIDEO_ID = "6391793262112";

export default function FmotyShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>("Event");
  const [imgIdx, setImgIdx] = useState(0);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setImgIdx(0);
  };

  const prev = () => setImgIdx((i) => (i - 1 + EVENT_IMAGES.length) % EVENT_IMAGES.length);
  const next = () => setImgIdx((i) => (i + 1) % EVENT_IMAGES.length);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
      {/* Tab switcher */}
      <div className="flex gap-1 flex-wrap justify-center">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-white hover:text-white/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Event" && (
        <div className="relative w-full max-w-[640px]">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/5" style={{ aspectRatio: "4 / 5" }}>
            {EVENT_IMAGES.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.caption}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === imgIdx ? 1 : 0 }}
              />
            ))}
            {/* Caption gradient */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
              <p className="text-xs font-medium text-white/95 leading-snug">
                {EVENT_IMAGES[imgIdx].caption}
              </p>
            </div>
            {/* Arrows */}
            {EVENT_IMAGES.length > 1 && (
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
          {EVENT_IMAGES.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {EVENT_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === imgIdx ? "w-8 bg-primary" : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "Interview" && (
        <div className="w-full max-w-[720px]">
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              src={`https://players.brightcove.net/${BRIGHTCOVE_ACCOUNT}/default_default/index.html?videoId=${INTERVIEW_VIDEO_ID}`}
              allowFullScreen
              allow="encrypted-media"
              className="absolute inset-0 w-full h-full"
              title="Andrew Francis — Ausbiz interview on the Morningstar FMOTY win"
            />
          </div>
          <p className="text-xs text-white/70 text-center mt-3">
            Andrew Francis on Ausbiz — RQI's Fund Manager of the Year win
          </p>
        </div>
      )}

      {activeTab === "Sponsored Content" && <PendingAsset label="Sponsored Content — pending assets" />}
      {activeTab === "Website" && <PendingAsset label="Website — pending assets" />}
    </div>
  );
}

function PendingAsset({ label }: { label: string }) {
  return (
    <div
      className="w-full max-w-[640px] rounded-2xl px-6 py-16 flex items-center justify-center text-center"
      style={{ aspectRatio: "16 / 9", background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.18)" }}
    >
      <div>
        <p className="text-sm font-semibold text-white mb-1">{label}</p>
        <p className="text-xs text-white/60">Will populate once supplied.</p>
      </div>
    </div>
  );
}
