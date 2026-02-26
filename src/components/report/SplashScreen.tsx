import { useState, useEffect, useCallback } from "react";

const facts = [
  "Our team speaks over 30 languages across 3 continents 🌍",
  "770 wind turbines spinning across Portugal and Spain ⚡",
  "Scandlines ferries cross Denmark ↔ Sweden every 15 minutes ⛴",
  "99.99% uptime across 9 data centres in the US Midwest 🖥",
  "enfinium processes 2.3 million tonnes of waste per year ♻️",
  "Adelaide Airport — SA's largest single-site employer ✈️",
  "1,727 MW renewable capacity across Australian wind & solar 🌱",
  "EVOS stores 6.3 million cubic metres of liquid energy 🛢",
  "Active infrastructure investors since 1994 — over 30 years 📈",
  "Operating in 15+ countries from Sydney to New York 🗺",
  "Höegh Evi's 9 floating vessels deliver energy security 🚢",
  "Finerge avoids 1.6 million tonnes of CO₂ every year 🌿",
];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [gwValue, setGwValue] = useState("0.0");
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const finish = useCallback(() => {
    setDone(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    const duration = 3400;
    const step = 16;
    const totalSteps = duration / step;
    const targetGW = 3.2;
    let count = 0;

    const interval = setInterval(() => {
      count++;
      const p = Math.min(count / totalSteps, 1);
      setProgress(p * 100);
      setGwValue((targetGW * p).toFixed(1));
      if (count >= totalSteps) {
        clearInterval(interval);
        setTimeout(finish, 500);
      }
    }, step);

    const factInterval = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % facts.length);
        setFactVisible(true);
      }, 280);
    }, 2400);

    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    return () => {
      clearInterval(interval);
      clearInterval(factInterval);
      clearTimeout(skipTimer);
    };
  }, [finish]);

  return (
    <div
      className={`splash-screen ${done ? "splash-done" : ""}`}
    >
      {/* Logo */}
      <div className="splash-logo">
        <span className="splash-logo-text">igneo</span>
        <span className="splash-logo-sub">Infrastructure Partners</span>
      </div>

      {/* Infrastructure Scene */}
      <div className="splash-scene">
        {/* Ground line */}
        <div className="splash-ground" />

        {/* Turbine 1 */}
        <div className="splash-turbine splash-turbine-1">
          <div className="splash-turbine-hub" />
          <div className="splash-turbine-blades">
            <div className="splash-blade" />
            <div className="splash-blade" />
            <div className="splash-blade" />
          </div>
          <div className="splash-turbine-tower" />
        </div>

        {/* Turbine 2 (smaller, dimmer) */}
        <div className="splash-turbine splash-turbine-2">
          <div className="splash-turbine-hub" />
          <div className="splash-turbine-blades">
            <div className="splash-blade" />
            <div className="splash-blade" />
            <div className="splash-blade" />
          </div>
          <div className="splash-turbine-tower" />
        </div>

        {/* Ferry */}
        <div className="splash-ferry">
          <div className="splash-ferry-stack" />
          <div className="splash-ferry-cabin" />
          <div className="splash-ferry-body" />
          <div className="splash-ferry-wave" />
        </div>

        {/* Solar panels */}
        <div className="splash-solar">
          <div className="splash-solar-panel" />
          <div className="splash-solar-panel" />
          <div className="splash-solar-panel" />
          <div className="splash-solar-post" />
        </div>

        {/* Data center */}
        <div className="splash-dc">
          <div className="splash-dc-rack">
            <div className="splash-dc-led splash-dc-led-green" />
            <div className="splash-dc-led splash-dc-led-orange" />
            <div className="splash-dc-led splash-dc-led-green" />
            <div className="splash-dc-led splash-dc-led-orange" />
          </div>
          <div className="splash-dc-rack">
            <div className="splash-dc-led splash-dc-led-green" />
            <div className="splash-dc-led splash-dc-led-orange" />
            <div className="splash-dc-led splash-dc-led-green" />
          </div>
        </div>
      </div>

      {/* GW Counter */}
      <div className="splash-counter">
        <span className="splash-gw">{gwValue} GW</span>
        <span className="splash-unit">Assets Under Management</span>
      </div>

      {/* Rotating fact */}
      <p
        className="splash-fact"
        style={{ opacity: factVisible ? 1 : 0 }}
      >
        {facts[factIndex]}
      </p>

      {/* Progress bar */}
      <div className="splash-bar">
        <div className="splash-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Skip */}
      {showSkip && (
        <button className="splash-skip" onClick={finish}>
          Skip
        </button>
      )}
    </div>
  );
}
