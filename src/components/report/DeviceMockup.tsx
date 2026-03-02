import { useState } from "react";
import "@/styles/device-mockup.css";
import naScrollImage from "@/assets/na-campaign-scroll.png";

type DeviceMode = "iphone" | "ipad";

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
          iPhone
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={device === "ipad"}
          className={`device-toggle-btn ${device === "ipad" ? "is-active" : ""}`}
          onClick={() => setDevice("ipad")}
        >
          iPad
        </button>
      </div>

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
      </div>
    </div>
  );
}
