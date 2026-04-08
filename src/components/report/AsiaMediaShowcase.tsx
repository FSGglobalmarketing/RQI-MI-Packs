import { useState } from "react";
import macbookMockup from "@/assets/macbook-mockup.png";
import iphoneMockup from "@/assets/iphone-mockup.png";
import asiaOoh from "@/assets/asia-ooh.jpg";
import asiaAdv1 from "@/assets/asia-advertorial-1.jpg";
import asiaAdv2 from "@/assets/asia-advertorial-2.jpg";
import asiaNative1 from "@/assets/asia-native-1.jpg";
import asiaNative2 from "@/assets/asia-native-2.jpg";
import asiaLinkedin1 from "@/assets/asia-linkedin-1.jpg";
import asiaLinkedin2 from "@/assets/asia-linkedin-2.jpg";

const MEDIA_TABS = ["Out of Home", "Advertorial", "Native", "LinkedIn"] as const;
type MediaTab = typeof MEDIA_TABS[number];

type DeviceType = "laptop" | "phone" | "none";

const TAB_CONFIG: Record<MediaTab, { device: DeviceType; images: string[] }> = {
  "Out of Home": { device: "none", images: [asiaOoh] },
  "Advertorial": { device: "laptop", images: [asiaAdv1, asiaAdv2] },
  "Native": { device: "phone", images: [asiaNative1, asiaNative2] },
  "LinkedIn": { device: "phone", images: [asiaLinkedin1, asiaLinkedin2] },
};

export default function AsiaMediaShowcase() {
  const [activeTab, setActiveTab] = useState<MediaTab>("Out of Home");
  const [imgIdx, setImgIdx] = useState(0);
  const config = TAB_CONFIG[activeTab];
  const images = config.images;

  const handleTabChange = (tab: MediaTab) => {
    setActiveTab(tab);
    setImgIdx(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {/* Tab switcher */}
      <div className="flex gap-1 flex-wrap justify-center">
        {MEDIA_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-white/50 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {config.device === "laptop" ? (
        /* Laptop mockup for Advertorial */
        <div className="relative w-full max-w-[600px]">
          <img src={macbookMockup} alt="Laptop mockup" className="w-full h-auto relative z-10" />
          <div className="absolute top-[5.5%] left-[11.5%] w-[77%] h-[73%] z-20 overflow-hidden bg-background/80 rounded-[2px] flex items-center justify-center">
            {images.length > 0 ? (
              <img src={images[imgIdx]} alt={activeTab} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-white/30 text-xs p-4">
                <p className="font-semibold mb-1">{activeTab}</p>
                <p className="text-[10px]">Campaign images coming soon</p>
              </div>
            )}
          </div>
          {/* Thumbnail dots for multiple images */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === imgIdx ? "bg-primary scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : config.device === "phone" ? (
        /* iPhone mockup for Native & LinkedIn */
        <div className="relative w-full max-w-[260px]">
          <img src={iphoneMockup} alt="iPhone mockup" className="w-full h-auto relative z-10" />
          {/* Screen overlay — fits inside the iPhone bezel */}
          <div className="absolute top-[2.8%] left-[5.5%] w-[89%] h-[94.5%] z-20 overflow-hidden rounded-[32px] flex items-center justify-center bg-background/80">
            {images.length > 0 ? (
              <img src={images[imgIdx]} alt={activeTab} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-white/30 text-xs p-4">
                <p className="font-semibold mb-1">{activeTab}</p>
                <p className="text-[10px]">Campaign images coming soon</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Out of Home — plain image, no device */
        <div className="w-full max-w-[600px] rounded-xl overflow-hidden">
          {images.length > 0 ? (
            <img src={images[0]} alt="Out of Home — Tram wrap" className="w-full h-auto rounded-xl" />
          ) : (
            <div className="aspect-[16/10] border border-white/10 bg-white/5 flex items-center justify-center rounded-xl">
              <div className="text-center text-white/30 text-xs p-4">
                <p className="font-semibold mb-1">Out of Home</p>
                <p className="text-[10px]">Tram wraps & billboard images coming soon</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
