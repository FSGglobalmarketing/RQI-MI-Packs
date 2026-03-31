import { useState } from "react";

type DeviceMode = "ipad" | "iphone";

export default function SneakPeekSection() {
  const [device, setDevice] = useState<DeviceMode>("ipad");

  return (
    <section id="sneak-peek" className="section-dark py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="stage-badge inline-block mb-3">Coming Soon</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Sneak Peek: RQI's Dedicated Website
          </h2>
        </div>

        {/* 20 : 60 : 20 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] gap-8 items-center">
          {/* Left text */}
          <div className="space-y-4 text-center lg:text-right">
            <h3 className="text-lg font-bold text-foreground">A New Digital Home</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A purpose-built platform designed to showcase RQI's investment philosophy, strategies and team — delivering a premium digital experience for advisers, consultants and institutional investors.
            </p>
          </div>

          {/* Centre: device mockup with pill toggle */}
          <div className="flex flex-col items-center gap-5">
            {/* Pill toggle */}
            <div className="device-toggle">
              <button
                className={`device-toggle-btn ${device === "ipad" ? "is-active" : ""}`}
                onClick={() => setDevice("ipad")}
              >
                iPad
              </button>
              <button
                className={`device-toggle-btn ${device === "iphone" ? "is-active" : ""}`}
                onClick={() => setDevice("iphone")}
              >
                iPhone
              </button>
            </div>

            {/* Device shell */}
            <div className="w-full flex justify-center">
              <div className={`device-shell ${device === "ipad" ? "device-ipad" : "device-iphone"}`}>
                {device === "ipad" && <div className="device-camera" />}
                {device === "iphone" && (
                  <>
                    <div className="device-island" />
                    <div className="device-home" />
                  </>
                )}

                {/* Placeholder — screenshots will be added */}
                <div className="device-scroll-viewport">
                  <div className="w-full h-full flex items-center justify-center bg-card/40">
                    <span className="text-xs text-muted-foreground font-medium">Screenshot coming soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right text */}
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-lg font-bold text-foreground">Built for Impact</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Optimised for speed, SEO and accessibility — the new site will serve as the central hub for all RQI content, fund information and thought leadership, with a seamless experience across every device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
