import { useState } from "react";
import "@/styles/device-mockup.css";
import naScrollImage from "@/assets/na-campaign-scroll.png";

type DeviceMode = "iphone" | "ipad";
type HeatLevel = "high" | "medium" | "low";

interface HeatmapPoint {
  className: string;
  level: HeatLevel;
  clicks: number;
}

const DUMMY_HEATMAP: HeatmapPoint[] = [
  { className: "heat-1", level: "high", clicks: 342 },
  { className: "heat-2", level: "medium", clicks: 187 },
  { className: "heat-3", level: "medium", clicks: 114 },
  { className: "heat-4", level: "high", clicks: 276 },
  { className: "heat-5", level: "low", clicks: 89 },
  { className: "heat-6", level: "low", clicks: 52 },
  { className: "heat-7", level: "medium", clicks: 156 },
  { className: "heat-8", level: "low", clicks: 71 },
  { className: "heat-9", level: "medium", clicks: 98 },
  { className: "heat-10", level: "low", clicks: 44 },
];

/* Native image dimensions */
const IMG_NATIVE_W = 780;
const IMG_NATIVE_H = 12042;

interface DeviceMockupProps {
  scrollImageSrc?: string;
  alt?: string;
}

export default function DeviceMockup({
  scrollImageSrc = naScrollImage,
  alt = "Campaign preview",
}: DeviceMockupProps) {
  const [device, setDevice] = useState<DeviceMode>("iphone");
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="device-mockup-wrap">
      <div className="device-toggle" role="tablist" aria-label="Device switch">
        <button
          type="button"
          role="tab"
          aria-selected={device === "iphone"}
          className={`device-toggle-btn ${device === "iphone" ? "is-active" : ""}`}
          onClick={() => setDevice("iphone")}
        >
          📱 iPhone
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={device === "ipad"}
          className={`device-toggle-btn ${device === "ipad" ? "is-active" : ""}`}
          onClick={() => setDevice("ipad")}
        >
          📱 iPad
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowHeatmap((value) => !value)}
        className={`device-heat-toggle ${showHeatmap ? "is-active" : ""}`}
      >
        {showHeatmap ? "🔥 Heatmap On" : "Heatmap Off"}
      </button>

      <div className={`device-shell ${device === "iphone" ? "device-iphone" : "device-ipad"}`}>
        {device === "iphone" && (
          <>
            <span className="device-island" aria-hidden="true" />
            <span className="device-home" aria-hidden="true" />
          </>
        )}

        {device === "ipad" && <span className="device-camera" aria-hidden="true" />}

        <div className="device-scroll-viewport">
          <img
            src={scrollImageSrc}
            alt={alt}
            draggable={false}
            className="device-scroll-image"
            width={IMG_NATIVE_W}
            height={IMG_NATIVE_H}
          />
        </div>

        {showHeatmap && (
          <div className="device-heatmap" aria-label="Heatmap overlay">
            {DUMMY_HEATMAP.map((point) => (
              <div
                key={point.className}
                className={`heatmap-point ${point.className} ${point.level}`}
                data-clicks={`${point.clicks} clicks`}
              >
                <span className="heatmap-glow" />
                <span className="heatmap-core" />
              </div>
            ))}
          </div>
        )}
      </div>

      {showHeatmap && (
        <div className="device-heat-legend" aria-label="Heatmap legend">
          <span>
            <i className="legend-dot high" /> High
          </span>
          <span>
            <i className="legend-dot medium" /> Medium
          </span>
          <span>
            <i className="legend-dot low" /> Low
          </span>
        </div>
      )}
    </div>
  );
}
