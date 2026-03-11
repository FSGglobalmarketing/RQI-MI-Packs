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

/* --- Constellation types --- */
interface Star {
  x: number;
  y: number;
  r: number;
  brightness: number;
  speed: number;
  angle: number;
  orbitR: number;
  cx: number;
  cy: number;
  label?: string;
}

interface Edge {
  a: number;
  b: number;
}

function buildConstellation(w: number, h: number): { stars: Star[]; edges: Edge[] } {
  const count = 40;
  const stars: Star[] = [];
  const dataLabels = [
    "+12%", "3.2x", "97%", "142", "$32B", "0.87", "+21%", "15+", "20+", "AAA",
    "α", "β", "σ", "μ", "Σ", "0.46", "+36%", "99.9%", "305", "1.3m",
  ];

  for (let i = 0; i < count; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const hasLabel = i < dataLabels.length && Math.random() > 0.4;
    stars.push({
      x: cx,
      y: cy,
      r: Math.random() * 2 + 1,
      brightness: Math.random() * 0.6 + 0.4,
      speed: (Math.random() - 0.5) * 0.0008,
      angle: Math.random() * Math.PI * 2,
      orbitR: Math.random() * 30 + 10,
      cx,
      cy,
      label: hasLabel ? dataLabels[i] : undefined,
    });
  }

  // Build edges: connect nearby stars (Delaunay-like, simplified)
  const edges: Edge[] = [];
  const maxDist = Math.min(w, h) * 0.3;
  for (let i = 0; i < count; i++) {
    let closest: { idx: number; dist: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = stars[i].cx - stars[j].cx;
      const dy = stars[i].cy - stars[j].cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) closest.push({ idx: j, dist });
    }
    closest.sort((a, b) => a.dist - b.dist);
    closest.slice(0, 3).forEach(({ idx }) => {
      const exists = edges.some(
        (e) => (e.a === i && e.b === idx) || (e.a === idx && e.b === i)
      );
      if (!exists) edges.push({ a: i, b: idx });
    });
  }

  return { stars, edges };
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
  const constellationRef = useRef<ReturnType<typeof buildConstellation> | null>(null);
  const animRef = useRef<number>(0);

  const finish = useCallback(() => {
    setDone(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // Canvas constellation animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      constellationRef.current = buildConstellation(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      if (!constellationRef.current) return;
      const { stars, edges } = constellationRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Update star positions (gentle orbit)
      stars.forEach((s) => {
        s.angle += s.speed;
        s.x = s.cx + Math.cos(s.angle) * s.orbitR;
        s.y = s.cy + Math.sin(s.angle) * s.orbitR;
      });

      // Draw edges
      edges.forEach(({ a, b }) => {
        const sa = stars[a];
        const sb = stars[b];
        const dx = sa.x - sb.x;
        const dy = sa.y - sb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxD = Math.min(w, h) * 0.35;
        const alpha = Math.max(0, 1 - dist / maxD) * 0.15;
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = `hsla(181, 42%, 59%, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw stars
      stars.forEach((s) => {
        const pulse = 0.7 + 0.3 * Math.sin(time * 0.002 + s.cx);
        const alpha = s.brightness * pulse;

        // Glow
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
        grad.addColorStop(0, `hsla(181, 42%, 59%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(181, 42%, 59%, 0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(181, 42%, 75%, ${alpha})`;
        ctx.fill();

        // Data label
        if (s.label) {
          ctx.font = "500 10px Inter, sans-serif";
          ctx.fillStyle = `hsla(56, 72%, 87%, ${alpha * 0.5})`;
          ctx.fillText(s.label, s.x + s.r * 2 + 4, s.y + 3);
        }
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
      {/* Constellation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Brand */}
      <div className="relative z-10 flex flex-col items-center">
        {/* RQI text logo */}
        <div className="splash-logo mb-2">
          <span style={{
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "hsl(181, 42%, 59%)",
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
            color: "hsla(56, 72%, 87%, 0.6)",
            marginTop: 4,
          }}>
            Investors
          </span>
        </div>

        {/* Loading phrase */}
        <div className="splash-counter">
          <span className="splash-unit">{loadingPhrase}</span>
        </div>

        {/* Rotating fact */}
        <p className="splash-fact" style={{ opacity: factVisible ? 1 : 0 }}>
          {facts[factIndex]}
        </p>

        {/* Progress bar */}
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
