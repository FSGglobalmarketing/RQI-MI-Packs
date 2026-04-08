import { useState } from "react";
import macbookMockup from "@/assets/macbook-mockup.png";

const MEDIA_TABS = ["Out of Home", "Advertorial", "Native", "LinkedIn"] as const;
type MediaTab = typeof MEDIA_TABS[number];

// Placeholder images per tab — replace with real carousel images later
const TAB_IMAGES: Record<MediaTab, string[]> = {
  "Out of Home": [],
  "Advertorial": [],
  "Native": [],
  "LinkedIn": [],
};

export default function AsiaMediaShowcase() {
  const [activeTab, setActiveTab] = useState<MediaTab>("Advertorial");
  const images = TAB_IMAGES[activeTab];
  const showLaptop = activeTab !== "Out of Home";

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {/* Tab switcher */}
      <div className="flex gap-1 flex-wrap justify-center">
        {MEDIA_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-white/50 hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {showLaptop ? (
        /* Laptop mockup — screen area is ~1280×800 at native resolution */
        <div className="relative w-full max-w-[600px]">
          <img src={macbookMockup} alt="Laptop mockup" className="w-full h-auto relative z-10" />
          {/* Screen overlay — matches the MacBook Pro 16″ bezel */}
          <div className="absolute top-[5.5%] left-[11.5%] w-[77%] h-[73%] z-20 overflow-hidden bg-background/80 rounded-[2px] flex items-center justify-center">
            {images.length > 0 ? (
              <img src={images[0]} alt={activeTab} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-white/30 text-xs p-4">
                <p className="font-semibold mb-1">{activeTab}</p>
                <p className="text-[10px]">Campaign images coming soon</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Out of Home — no laptop, placeholder for OOH imagery */
        <div className="w-full max-w-[600px] aspect-[16/10] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
          <div className="text-center text-white/30 text-xs p-4">
            <p className="font-semibold mb-1">Out of Home</p>
            <p className="text-[10px]">Tram wraps & billboard images coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
