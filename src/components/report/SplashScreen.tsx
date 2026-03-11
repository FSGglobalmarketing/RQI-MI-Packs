import { useState, useEffect, useCallback } from "react";
import galaxyImg from "@/assets/galaxy-loader.png";

const facts = [
  "Systematic indexing across 20+ global markets 🌐",
  "Scientific approach to factor investing since 2008 📊",
  "AUD $32B+ in assets under management 💎",
  "Proprietary multi-factor models across equities 🔬",
  "Tilting portfolios towards value, quality and low volatility 📈",
  "Carbon-aware strategies across all mandates 🌱",
  "Headquartered in Sydney, serving global institutions 🏛",
  "Evidence-based investing with transparent process 🧪",
  "Partnering with First Sentier Investors globally 🤝",
  "Quantitative research team of 15+ specialists 🧑‍💻",
];

const loadingPhrases = [
  "Aligning constellations…",
  "Mapping data points…",
  "Connecting the network…",
  "Calibrating factors…",
  "Processing signals…",
  "Building the universe…",
  "Weighting portfolios…",
  "Scanning horizons…",
];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(
    () => loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]
  );

  const finish = useCallback(() => {
    setDone(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // Progress & facts
  useEffect(() => {
    const duration = 5500;
    const step = 16;
    const totalSteps = duration / step;
    let count = 0;

    const interval = setInterval(() => {
      count++;
      const p = Math.min(count / totalSteps, 1);
      setProgress(p * 100);
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
    }, 2800);

    const phraseInterval = setInterval(() => {
      setLoadingPhrase(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);
    }, 1800);

    const skipTimer = setTimeout(() => setShowSkip(true), 3000);

    return () => {
      clearInterval(interval);
      clearInterval(factInterval);
      clearInterval(phraseInterval);
      clearTimeout(skipTimer);
    };
  }, [finish]);

  return (
    <div className={`splash-screen ${done ? "splash-done" : ""}`}>
      {/* Spinning galaxy image */}
      <div className="splash-galaxy-container">
        <img
          src={galaxyImg}
          alt=""
          className="splash-galaxy-img"
        />
        {/* Twinkle overlay via CSS */}
        <div className="splash-galaxy-twinkles" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="splash-logo mb-2">
          <span style={{
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            lineHeight: 1,
          }}>
            RQI
          </span>
          <span style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "rgba(255, 255, 255, 0.5)",
            marginTop: 4,
          }}>
            Investors
          </span>
        </div>

        <div className="splash-counter">
          <span className="splash-unit">{loadingPhrase}</span>
        </div>

        <p className="splash-fact" style={{ opacity: factVisible ? 1 : 0 }}>
          {facts[factIndex]}
        </p>

        <div className="splash-bar">
          <div className="splash-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {showSkip && (
          <button className="splash-skip" onClick={finish}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
