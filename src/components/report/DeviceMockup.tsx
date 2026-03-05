import { useState } from "react";
import "@/styles/device-mockup.css";
import naScrollImage from "@/assets/na-campaign-scroll.png";
import naIpadImage from "@/assets/na-campaign-ipad.png";

type DeviceMode = "iphone" | "ipad";

const IPHONE_W = 780;
const IPHONE_H = 12042;
const IPAD_W = 488;
const IPAD_H = 7334;

interface DeviceMockupProps {
  iphoneImageSrc?: string;
  ipadImageSrc?: string;
  alt?: string;
}

export default function DeviceMockup({
  iphoneImageSrc = naScrollImage,
  ipadImageSrc = naIpadImage,
  alt = "Campaign preview",
}: DeviceMockupProps) {
  const [device, setDevice] = useState<DeviceMode>("ipad");

  const isIphone = device === "iphone";
  const imgSrc = isIphone ? iphoneImageSrc : ipadImageSrc;
  const imgW = isIphone ? IPHONE_W : IPAD_W;
  const imgH = isIphone ? IPHONE_H : IPAD_H;

  return (
    <div className="device-mockup-wrap">
      <div className="device-toggle" role="tablist" aria-label="Device switch">
        <button
          type="button"
          role="tab"
          aria-selected={isIphone}
          className={`device-toggle-btn ${isIphone ? "is-active" : ""}`}
          onClick={() => setDevice("iphone")}
        >
          iPhone
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isIphone}
          className={`device-toggle-btn ${!isIphone ? "is-active" : ""}`}
          onClick={() => setDevice("ipad")}
        >
          iPad
        </button>
      </div>

      <div className={`device-shell ${isIphone ? "device-iphone" : "device-ipad"}`}>
        {isIphone && (
          <>
            <span className="device-island" aria-hidden="true" />
            <span className="device-home" aria-hidden="true" />
          </>
        )}

        {!isIphone && <span className="device-camera" aria-hidden="true" />}

        <div className="device-scroll-viewport">
          <img
            key={device}
            src={imgSrc}
            alt={alt}
            draggable={false}
            className="device-scroll-image"
            width={imgW}
            height={imgH}
          />
        </div>
      </div>
    </div>
  );
}
