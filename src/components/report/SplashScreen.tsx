import { useState, useEffect, useCallback, useRef } from "react";

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

/* --- Galaxy types --- */
interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Connection {
  a: number;
  b: number;
  life: number;
  maxLife: number;
  delay: number;
}

function buildGalaxy(): Star[] {
  const stars: Star[] = [];
  const armCount = 4;
  const starsPerArm = 120;
  const coreStars = 80;

  // Spiral arms
  for (let arm = 0; arm < armCount; arm++) {
    const armAngle = (arm / armCount) * Math.PI * 2;
    for (let i = 0; i < starsPerArm; i++) {
      const t = i / starsPerArm;
      const dist = t * 280 + 20;
      const angle = armAngle + t * 3.5 + (Math.random() - 0.5) * 0.6;
      const spread = (Math.random() - 0.5) * (30 + t * 40);
      const x = Math.cos(angle) * dist + (Math.random() - 0.5) * spread;
      const z = Math.sin(angle) * dist + (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * (8 + t * 18); // thin disc, thicker at edges
      stars.push({
        x, y, z,
        r: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  // Core bulge
  for (let i = 0; i < coreStars; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 50;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    const y = (Math.random() - 0.5) * 20;
    stars.push({
      x, y, z,
      r: Math.random() * 2 + 0.8,
      brightness: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 0.004 + 0.001,
      twinkleOffset: Math.random() * Math.PI * 2,
    });
  }

  return stars;
}

function projectStar(star: Star, rotation: number, cx: number, cy: number, tilt: number): { px: number; py: number; depth: number } {
  // Rotate around Y axis
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);
  const rx = star.x * cosR - star.z * sinR;
  const rz = star.x * sinR + star.z * cosR;

  // Tilt for side view (rotate around X axis)
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);
  const ry = star.y * cosT - rz * sinT;
  const finalZ = star.y * sinT + rz * cosT;

  const scale = 600 / (600 + finalZ);
  return {
    px: cx + rx * scale,
    py: cy + ry * scale,
    depth: finalZ,
  };
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(
    () => loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);

  const finish = useCallback(() => {
    setDone(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // Canvas galaxy animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    starsRef.current = buildGalaxy();
    window.addEventListener("resize", resize);

    const tilt = 1.25; // ~72 degrees — side/edge-on view
    let lastConnectionTime = 0;

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Slow rotation
      rotationRef.current += 0.0012;
      const rotation = rotationRef.current;

      const stars = starsRef.current;
      const connections = connectionsRef.current;

      // Project all stars
      const projected = stars.map((s) => {
        const p = projectStar(s, rotation, cx, cy, tilt);
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        return { ...p, star: s, twinkle };
      });

      // Sort by depth (back to front)
      projected.sort((a, b) => b.depth - a.depth);

      // Spawn new connections periodically
      if (time - lastConnectionTime > 400 && connections.length < 8) {
        lastConnectionTime = time;
        // Pick two nearby bright stars
        const bright = projected.filter((p) => p.star.brightness > 0.5 && p.twinkle > 0.6);
        if (bright.length >= 2) {
          const idx = Math.floor(Math.random() * Math.min(bright.length, 30));
          const a = bright[idx];
          let bestIdx = -1;
          let bestDist = Infinity;
          for (let j = 0; j < bright.length; j++) {
            if (j === idx) continue;
            const dx = a.px - bright[j].px;
            const dy = a.py - bright[j].py;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120 && d > 20 && d < bestDist) {
              bestDist = d;
              bestIdx = j;
            }
          }
          if (bestIdx >= 0) {
            const starA = stars.indexOf(a.star);
            const starB = stars.indexOf(bright[bestIdx].star);
            connections.push({
              a: starA,
              b: starB,
              life: 0,
              maxLife: 1200 + Math.random() * 800,
              delay: 0,
            });
          }
        }
      }

      // Core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
      coreGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
      coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Draw connections
      for (let i = connections.length - 1; i >= 0; i--) {
        const conn = connections[i];
        conn.life += 16;
        if (conn.life > conn.maxLife) {
          connections.splice(i, 1);
          continue;
        }

        const t = conn.life / conn.maxLife;
        // Fade in then out
        const alpha = t < 0.15 ? t / 0.15 : t > 0.7 ? (1 - t) / 0.3 : 1;

        const pA = projectStar(stars[conn.a], rotation, cx, cy, tilt);
        const pB = projectStar(stars[conn.b], rotation, cx, cy, tilt);

        ctx.beginPath();
        ctx.moveTo(pA.px, pA.py);
        ctx.lineTo(pB.px, pB.py);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Connection node glow at both ends
        [pA, pB].forEach((p) => {
          const g = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, 6);
          g.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.5})`);
          g.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.beginPath();
          ctx.arc(p.px, p.py, 6, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        });
      }

      // Draw stars
      projected.forEach(({ px, py, star, twinkle, depth }) => {
        const depthFade = Math.max(0.2, 1 - (depth + 300) / 800);
        const alpha = star.brightness * twinkle * depthFade;
        const size = star.r * (600 / (600 + depth));

        // Star glow
        if (twinkle > 0.7 && star.brightness > 0.5) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, size * 5);
          g.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.25})`);
          g.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.beginPath();
          ctx.arc(px, py, size * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // Star dot
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

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
