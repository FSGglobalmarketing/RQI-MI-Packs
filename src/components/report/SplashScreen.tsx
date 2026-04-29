import { useState, useEffect, useCallback, useRef } from "react";

const STATUS_MSGS = [
  'CALIBRATING FACTOR SIGNALS',
  'ANALYSING CROSS-SECTIONAL MOMENTUM',
  'SYNTHESISING ALPHA DECAY CURVES',
  'QUANTIFYING SYSTEMATIC EXPOSURES',
  'MAPPING FACTOR CROWDING METRICS',
  'RESOLVING VALUE FACTOR DISPERSION',
  'PROCESSING RISK-ADJUSTED RETURNS',
  'EVALUATING SIGNAL-TO-NOISE RATIOS',
  'CONSTRUCTING COVARIANCE MATRIX',
  'STRESS-TESTING TAIL RISK SCENARIOS',
  'OPTIMISING PORTFOLIO FACTOR WEIGHTS',
  'SCREENING FOR MEAN-REVERSION SIGNALS',
  'DENOISING PRICE MOMENTUM DATA',
  'BOOTSTRAPPING RETURN DISTRIBUTIONS',
  'RUNNING PRINCIPAL COMPONENT ANALYSIS',
  'DECOMPOSING SYSTEMATIC RISK PREMIA',
  'REBALANCING MULTI-FACTOR TILTS',
  'VALIDATING OUT-OF-SAMPLE BACKTESTS',
  'COMPUTING INFORMATION COEFFICIENT',
  'PARSING CROSS-ASSET CORRELATION REGIMES',
];

const C = { blue: '#0f9aff', orange: '#f59e47', moss: '#347b7e', mint: '#53b8bb', grass: '#7ba98b', pollen: '#f3f2c9' };
const TILT = 0.11;

function hexA(h: string, a: number) {
  const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function project(a: number, r: number, cx: number, cy: number) {
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * TILT };
}

// RQI Logo SVG inline
const RQI_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
<defs><style>.w{fill:#fff}.t{fill:#54b8ba}</style>
<filter id="lg"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g filter="url(#lg)">
<path class="w" d="M109.06,587.96v-26.6h4.66v26.6h-4.66Z"/>
<path class="w" d="M171.24,566.72v21.24h-4.51v-26.6h6.24l11.27,21.24v-21.24h4.51v26.6h-6.24l-11.26-21.24Z"/>
<path class="w" d="M250.92,582.46l6.57-21.1h4.92l-9.1,26.6h-4.99l-9.21-26.6h5.06l6.75,21.1Z"/>
<path class="w" d="M331.59,561.37v3.89h-14.16v7.12h13.39v3.85h-13.39v7.82h14.16v3.92h-18.82v-26.6h18.82Z"/>
<path class="w" d="M381.99,568.37c0-4.99,5.17-7.48,10.05-7.48,5.25,0,9.35,2.39,10.42,7.93h-4.51c-.77-3.19-3.56-4.11-6.17-4.11-2.05,0-5.1.92-5.1,3.52,0,2.06,1.69,3.08,3.96,3.52l3.26.62c4.66.92,9.1,2.61,9.1,7.96s-5.32,8.11-10.57,8.11c-6.31,0-10.64-3.45-11.19-9.28h4.59c.81,3.63,3.16,5.47,6.82,5.47,3.16,0,5.69-1.43,5.69-4,0-2.72-2.94-3.63-5.47-4.11l-3.23-.62c-4.18-.84-7.67-3.01-7.67-7.52Z"/>
<path class="w" d="M451.46,565.26v-3.89h21.39v3.89h-8.37v22.71h-4.66v-22.71h-8.37Z"/>
<path class="w" d="M521.02,574.65c0-8.18,4.88-13.76,12.69-13.76s12.69,5.58,12.69,13.76-4.88,13.8-12.69,13.8-12.69-5.62-12.69-13.8ZM541.61,574.65c0-6.46-3.48-9.94-7.89-9.94s-7.89,3.49-7.89,9.94,3.48,9.98,7.89,9.98,7.89-3.52,7.89-9.98Z"/>
<path class="w" d="M607.52,576.78h-4.51v11.19h-4.66v-26.6h8.48c7.85,0,11.85,1.76,11.85,7.67,0,3.41-1.69,5.72-4.99,6.86l6.09,12.07h-5.25l-5.61-11.23c-.44.04-.92.04-1.39.04ZM603.01,573.07h4.62c4,0,6.27-.81,6.27-4,0-3.48-2.75-3.96-6.42-3.96h-4.48v7.96Z"/>
<path class="w" d="M669.92,568.37c0-4.99,5.17-7.48,10.05-7.48,5.25,0,9.35,2.39,10.42,7.93h-4.51c-.77-3.19-3.56-4.11-6.17-4.11-2.05,0-5.1.92-5.1,3.52,0,2.06,1.69,3.08,3.96,3.52l3.26.62c4.66.92,9.1,2.61,9.1,7.96s-5.32,8.11-10.57,8.11c-6.31,0-10.64-3.45-11.19-9.28h4.59c.81,3.63,3.16,5.47,6.82,5.47,3.16,0,5.69-1.43,5.69-4,0-2.72-2.94-3.63-5.47-4.11l-3.23-.62c-4.18-.84-7.67-3.01-7.67-7.52Z"/>
<path class="w" d="M363.2,515.55h-47.87c-1.79,0-3.5-.71-4.77-1.97l-139.18-138.27c-1.61-1.6-2.51-3.77-2.51-6.04v-12.43c0-4.7,3.81-8.52,8.52-8.52h78.27c19.89,0,36.16-16.27,36.16-36.16v-40.82c0-19.95-16.17-36.12-36.12-36.12h-106.91v273.56c0,3.74-3.03,6.76-6.76,6.76h-34.67c-3.74,0-6.76-3.03-6.76-6.76V218.32c0-3.74,3.03-6.76,6.76-6.76h148.31c33.04,0,59.83,26.79,59.83,59.8v40.86c0,33.01-26.79,59.8-59.83,59.8h-20.53l132.85,131.98c4.28,4.25,1.27,11.56-4.77,11.56Z"/>
<path class="t" d="M628.01,513.08c-1.66,1.66-3.79,2.47-5.95,2.47s-4.33-.81-5.99-2.47l-42.95-42.99-23.27-23.27c-.2-.2-.41-.41-.57-.64.03.07.1.14.14.2l-76.88-76.88c-3.31-3.31-3.31-8.66,0-11.97,1.69-1.69,3.89-2.5,6.12-2.47h37.41c2.13.03,4.26.85,5.89,2.47l47.76,47.76c6.76-14.1,10.65-29.15,10.65-41.77,0-56.15-45.69-101.84-101.84-101.84s-101.87,45.69-101.87,101.84c0,63.79,59.36,100.15,102.21,101.87,4.67.2,8.29,4.13,8.08,8.79l.03,32.88c0,4.67-3.79,8.49-8.46,8.49-.3,0-.61-.03-.91-.07-63.55-2.84-151.08-57.06-151.08-151.96,0-83.78,68.19-151.96,152-151.96s151.96,68.19,151.96,151.96c0,15.22-3.45,32.3-9.98,49.41-4.67,12.18-10.65,23.88-17.89,34.84-3.69,5.58-7.68,10.96-11.97,16l37.37,37.37c3.31,3.28,3.31,8.62,0,11.94Z"/>
<rect class="w" x="645.99" y="211.56" width="53.44" height="304" rx="7.6" ry="7.6"/>
</g></svg>`;

interface Star { x: number; y: number; r: number; o: number; tw: number; ts: number; }
interface Dust { angle: number; r: number; spd: number; sz: number; o: number; color: string; tw: number; ts: number; }
interface Ring { r: number; w: number; color: string; a: number; spd: number; dash: number[]; angle: number; }
interface Planet { r: number; sz: number; color: string; spd: number; angle: number; }
interface DataNode { angle: number; orbitR: number; spd: number; label: string; o: number; color: string; sz: number; tw: number; ts: number; }

const PASSWORD = "RQI2026";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    if (value === PASSWORD) {
      setUnlocked(true);
      setTimeout(onUnlock, 700);
    } else {
      setError(true);
      setShaking(true);
      setValue("");
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
      inputRef.current?.focus();
    }
  };

  const onKey = (e: React.KeyboardEvent) => { if (e.key === "Enter") submit(); };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: unlocked ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1)',
      background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(15,154,255,0.04) 0%, transparent 70%)',
    }}>
      {/* Logo */}
      <div style={{ width: 140, marginBottom: 56, opacity: 0, animation: 'splashFadeIn 1s 0.2s cubic-bezier(.22,1,.36,1) forwards' }}
        dangerouslySetInnerHTML={{ __html: RQI_LOGO_SVG }} />

      {/* Label */}
      <div style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 9,
        letterSpacing: '0.6em', textTransform: 'uppercase',
        color: 'rgba(15,154,255,0.7)', textShadow: '0 0 12px rgba(15,154,255,0.5)',
        marginBottom: 32, opacity: 0, animation: 'splashFadeIn 1s 0.5s ease forwards',
      }}>RESTRICTED ACCESS</div>

      {/* Input */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, opacity: 0, animation: 'splashFadeIn 1s 0.7s ease forwards' }}>
        <div style={{ position: 'relative', width: 240, animation: shaking ? 'pwdShake 0.45s ease' : 'none' }}>
          <span style={{
            position: 'absolute', left: 0, top: -18,
            fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 8,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: error ? 'rgba(211,118,105,0.9)' : 'rgba(255,255,255,0.3)',
            transition: 'color 0.3s',
          }}>{error ? 'INCORRECT PASSWORD' : 'ENTER PASSWORD'}</span>
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={onKey}
            style={{
              width: '100%', padding: '10px 0', background: 'none',
              border: 'none', borderBottom: `1px solid ${error ? 'rgba(211,118,105,0.6)' : 'rgba(15,154,255,0.3)'}`,
              color: '#fff', fontFamily: "'Inter', monospace", fontSize: 14,
              letterSpacing: '0.5em', outline: 'none', caretColor: '#0f9aff',
              transition: 'border-color 0.3s',
            }}
          />
        </div>

        {/* Submit */}
        <button onClick={submit} style={{
          marginTop: 28, pointerEvents: 'auto',
          fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 10,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: '#0f9aff', background: 'none', border: '1px solid rgba(15,154,255,0.3)',
          padding: '8px 28px', cursor: 'pointer',
          transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,154,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(15,154,255,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(15,154,255,0.3)'; }}
        >UNLOCK →</button>
      </div>
    </div>
  );
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState(STATUS_MSGS[0]);
  const [msgFading, setMsgFading] = useState(false);
  const [done, setDone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const progressRef = useRef(0);
  const animRef = useRef<number>(0);

  const finish = useCallback(() => {
    setDone(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // Canvas animation
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d')!;

    let W = 0, H = 0, cx = 0, cy = 0;
    function resize() {
      W = cv!.width = window.innerWidth;
      H = cv!.height = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const STARS: Star[] = Array.from({ length: 260 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.2 + Math.random() * 0.9,
      o: 0.05 + Math.random() * 0.28, tw: Math.random() * Math.PI * 2, ts: 0.004 + Math.random() * 0.01,
    }));

    // Dust
    const cols = [C.blue, C.mint, C.moss, C.grass, C.orange];
    const DUST: Dust[] = Array.from({ length: 460 }, () => ({
      angle: Math.random() * Math.PI * 2,
      r: 42 + Math.random() * 255,
      spd: (0.00006 + Math.random() * 0.00017) * (Math.random() < 0.5 ? 1 : -1),
      sz: 0.3 + Math.random() * 1.5,
      o: 0.08 + Math.random() * 0.42,
      color: cols[Math.floor(Math.random() * cols.length)],
      tw: Math.random() * Math.PI * 2,
      ts: 0.012 + Math.random() * 0.025,
    }));

    // Rings
    const RINGS: Ring[] = [
      { r: 50, w: 1.6, color: C.orange, a: 0.9, spd: 0.0013, dash: [20, 7], angle: 0 },
      { r: 80, w: 1.8, color: C.blue, a: 0.85, spd: 0.0009, dash: [28, 10], angle: 0 },
      { r: 115, w: 1.1, color: C.blue, a: 0.5, spd: 0.00055, dash: [18, 16], angle: 0 },
      { r: 152, w: 0.9, color: C.mint, a: 0.4, spd: 0.00034, dash: [14, 22], angle: 0 },
      { r: 192, w: 0.7, color: C.moss, a: 0.28, spd: 0.00022, dash: [10, 28], angle: 0 },
      { r: 232, w: 0.5, color: C.moss, a: 0.18, spd: 0.00014, dash: [8, 38], angle: 0 },
      { r: 270, w: 0.35, color: C.grass, a: 0.14, spd: 0.00009, dash: [6, 50], angle: 0 },
    ].map(r => ({ ...r, angle: Math.random() * Math.PI * 2 }));

    // Planets
    const PLANETS: Planet[] = [
      { r: 50, sz: 3.5, color: C.orange, spd: 0.022, angle: 0.3 },
      { r: 80, sz: 5.0, color: C.blue, spd: 0.014, angle: 1.8 },
      { r: 80, sz: 2.2, color: C.mint, spd: 0.014, angle: 4.3 },
      { r: 115, sz: 4.2, color: C.mint, spd: 0.009, angle: 0.9 },
      { r: 115, sz: 2.0, color: C.blue, spd: 0.009, angle: 3.2 },
      { r: 152, sz: 6.5, color: C.grass, spd: 0.006, angle: 2.2 },
      { r: 152, sz: 2.2, color: C.orange, spd: 0.006, angle: 5.1 },
      { r: 192, sz: 3.2, color: C.moss, spd: 0.0044, angle: 1.5 },
      { r: 232, sz: 2.8, color: C.blue, spd: 0.003, angle: 4.8 },
      { r: 270, sz: 2.0, color: C.mint, spd: 0.002, angle: 2.6 },
    ];

    // Data nodes
    const QLABELS = ['0.847', 'SR 2.31', 'σ 1.96', 'β 0.31', 'μ 0.42', 'α 2.1', 'IR 1.84',
      '99.5%', '1.618', 'Δ 0.04', 'VaR', 'ρ 0.71', '1.414', '2.718', 'φ 1.61',
      'E[r]', 'κ 4.2', 'λ 0.5', 'χ² 3.8', 't 1.96', 'R² 0.9', 'θ 0.12', 'Ω 0.5', 'Σ 12'];
    const DATA: DataNode[] = Array.from({ length: 32 }, (_, i) => ({
      angle: Math.random() * Math.PI * 2,
      orbitR: 75 + Math.random() * 185,
      spd: (0.0003 + Math.random() * 0.0009) * (Math.random() < 0.5 ? 1 : -1),
      label: QLABELS[i % QLABELS.length],
      o: 0.55 + Math.random() * 0.45,
      color: cols[Math.floor(Math.random() * cols.length)],
      sz: 2.2 + Math.random() * 1.4,
      tw: Math.random() * Math.PI * 2,
      ts: 0.01 + Math.random() * 0.02,
    }));

    function glow(c: string, b: number) { ctx.shadowColor = c; ctx.shadowBlur = b; }
    function ng() { ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; }

    function drawStarfield() {
      STARS.forEach(s => {
        s.tw += s.ts;
        const tw = Math.sin(s.tw) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255,255,255,${s.o * tw})`;
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2); ctx.fill();
      });
    }

    function drawNebula() {
      ctx.save(); ctx.translate(cx, cy); ctx.scale(1, TILT * 2.8);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 290);
      g.addColorStop(0, hexA(C.orange, 0.06));
      g.addColorStop(0.25, hexA(C.orange, 0.04));
      g.addColorStop(0.5, hexA(C.blue, 0.05));
      g.addColorStop(0.8, hexA(C.moss, 0.03));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 290, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }

    function drawDust(dt: number) {
      DUST.forEach(d => {
        d.angle += d.spd * dt; d.tw += d.ts;
        const tw = Math.sin(d.tw) * 0.35 + 0.65;
        const pos = project(d.angle, d.r, cx, cy);
        const da = Math.sin(d.angle) > 0 ? 0.38 : 1.0;
        ctx.fillStyle = hexA(d.color, d.o * tw * da);
        ctx.beginPath(); ctx.arc(pos.x, pos.y, d.sz, 0, Math.PI * 2); ctx.fill();
      });
    }

    function drawRings(dt: number) {
      RINGS.forEach(ring => {
        ring.angle += ring.spd * dt;
        ctx.save(); ctx.translate(cx, cy);
        glow(ring.color, 10);
        ctx.strokeStyle = hexA(ring.color, ring.a); ctx.lineWidth = ring.w;
        ctx.setLineDash(ring.dash); ctx.lineDashOffset = -(ring.angle * ring.r * 0.4);
        ctx.beginPath(); ctx.ellipse(0, 0, ring.r, ring.r * TILT, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]); ng(); ctx.restore();
      });
    }

    function drawPlanets(dt: number) {
      PLANETS.forEach(p => {
        p.angle += p.spd * dt / 16;
        const pos = project(p.angle, p.r, cx, cy);
        const da = Math.sin(p.angle) > 0 ? 0.4 : 1.0;
        for (let i = 8; i >= 1; i--) {
          const ta = p.angle - (p.spd / 16) * i * 1.4;
          const tp = project(ta, p.r, cx, cy);
          ctx.fillStyle = hexA(p.color, 0.045 * (9 - i) / 8 * da);
          ctx.beginPath(); ctx.arc(tp.x, tp.y, p.sz * 0.65, 0, Math.PI * 2); ctx.fill();
        }
        glow(p.color, 14 * da);
        ctx.fillStyle = hexA(p.color, da);
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.sz, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = hexA(C.pollen, 0.55 * da);
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.sz * 0.35, 0, Math.PI * 2); ctx.fill();
        ng();
      });
    }

    function drawDataNodes() {
      DATA.forEach(dn => {
        dn.angle += dn.spd; dn.tw += dn.ts;
        const tw = Math.sin(dn.tw) * 0.3 + 0.7;
        const pos = project(dn.angle, dn.orbitR, cx, cy);
        const da = Math.sin(dn.angle) > 0 ? 0.32 : 1.0;
        glow(dn.color, 14 * da);
        ctx.fillStyle = hexA(dn.color, Math.min(1, dn.o * tw * da * 1.3));
        ctx.beginPath(); ctx.arc(pos.x, pos.y, dn.sz, 0, Math.PI * 2); ctx.fill(); ng();
        if (tw > 0.55 && da > 0.45) {
          ctx.font = 'bold 9px monospace';
          ctx.fillStyle = hexA(dn.color, Math.min(1, dn.o * tw * da * 1.4));
          ctx.shadowColor = dn.color; ctx.shadowBlur = 10;
          ctx.fillText(dn.label, pos.x + 5, pos.y - 4);
          ctx.shadowBlur = 0;
        }
      });
    }

    function drawAccretionDisk(t: number, half: 'far' | 'near') {
      const startA = half === 'far' ? 0 : Math.PI, endA = half === 'far' ? Math.PI : Math.PI * 2;
      ctx.save(); ctx.translate(cx, cy);
      const pulse = Math.sin(t * 0.0018) * 0.12 + 0.88;
      const layers = [
        { rx: 24, ry: 24 * TILT, color: C.pollen, a: 0.9, blur: 18 },
        { rx: 32, ry: 32 * TILT, color: C.orange, a: 0.85, blur: 24 },
        { rx: 40, ry: 40 * TILT, color: C.orange, a: 0.75, blur: 22 },
        { rx: 50, ry: 50 * TILT, color: C.orange, a: 0.55, blur: 18 },
        { rx: 62, ry: 62 * TILT, color: '#e07030', a: 0.4, blur: 16 },
        { rx: 76, ry: 76 * TILT, color: C.mint, a: 0.35, blur: 14 },
        { rx: 92, ry: 92 * TILT, color: C.blue, a: 0.42, blur: 18 },
        { rx: 110, ry: 110 * TILT, color: C.blue, a: 0.28, blur: 20 },
        { rx: 132, ry: 132 * TILT, color: C.blue, a: 0.15, blur: 22 },
      ];
      layers.forEach(l => {
        ctx.beginPath(); ctx.ellipse(0, 0, l.rx, l.ry, 0, startA, endA);
        glow(l.color, l.blur * pulse);
        ctx.strokeStyle = hexA(l.color, l.a * pulse * (half === 'far' ? 0.4 : 1.0));
        ctx.lineWidth = 2.4; ctx.stroke();
      });
      const sa = half === 'near' ? 0.7 : 0.18;
      const sg = ctx.createLinearGradient(-134, 0, 134, 0);
      sg.addColorStop(0, 'rgba(0,0,0,0)'); sg.addColorStop(0.15, hexA(C.blue, 0.15 * sa));
      sg.addColorStop(0.35, hexA(C.orange, 0.6 * sa * pulse)); sg.addColorStop(0.5, hexA(C.pollen, 0.9 * sa * pulse));
      sg.addColorStop(0.65, hexA(C.orange, 0.6 * sa * pulse)); sg.addColorStop(0.85, hexA(C.blue, 0.15 * sa));
      sg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sg; ctx.fillRect(-136, -3.5, 272, 7);
      ng(); ctx.restore();
    }

    function drawBlackHole(t: number) {
      const pulse = Math.sin(t * 0.002) * 0.15 + 0.85;
      glow(C.orange, 26 * pulse);
      ctx.strokeStyle = hexA(C.orange, 0.75 * pulse); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.ellipse(cx, cy, 22, 22 * TILT, 0, 0, Math.PI * 2); ctx.stroke();
      glow(C.blue, 16 * pulse);
      ctx.strokeStyle = hexA(C.blue, 0.4 * pulse); ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.ellipse(cx, cy, 27, 27 * TILT, 0, 0, Math.PI * 2); ctx.stroke(); ng();
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(cx, cy, 21, 0, Math.PI * 2); ctx.fill();
    }

    let last = 0;
    function frame(ts: number) {
      const dt = Math.min(ts - last, 50);
      last = ts;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      drawStarfield();
      drawNebula();
      drawDust(dt);
      drawRings(dt);
      drawDataNodes();
      drawPlanets(dt);
      drawAccretionDisk(ts, 'far');
      drawBlackHole(ts);
      drawAccretionDisk(ts, 'near');
      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Progress bar & status messages — only start after unlock
  useEffect(() => {
    if (!unlocked) return;

    const startTime = performance.now();
    let msgIdx = 0;
    let msgTimer = 0;
    let barTimer = 0;
    let lastT = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(now - lastT, 50);
      lastT = now;

      // Progress bar
      barTimer += dt;
      if (barTimer > 1800) {
        const rate = progressRef.current < 60 ? 0.015 : progressRef.current < 85 ? 0.009 : progressRef.current < 95 ? 0.0045 : 0.0015;
        progressRef.current = Math.min(100, progressRef.current + rate * dt);
        setProgress(Math.floor(progressRef.current));
      }

      // Status message rotation
      msgTimer += dt;
      if (msgTimer > 2600) {
        msgTimer = 0;
        setMsgFading(true);
        setTimeout(() => {
          msgIdx = (msgIdx + 1) % STATUS_MSGS.length;
          setStatusMsg(STATUS_MSGS[msgIdx]);
          setMsgFading(false);
        }, 300);
      }

      if (progressRef.current >= 100) {
        setTimeout(finish, 400);
        return;
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);

    const skipTimer = setTimeout(() => setShowSkip(true), 4000);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(skipTimer);
    };
  }, [finish, unlocked]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000', overflow: 'hidden',
        opacity: done ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: done ? 'none' : 'auto',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />

      {!unlocked && <PasswordGate onUnlock={finish} />}

      {/* Loading UI - only shown after password unlock */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 20, opacity: unlocked ? 1 : 0, transition: 'opacity 0.8s cubic-bezier(.4,0,.2,1)', pointerEvents: unlocked ? 'auto' : 'none' }}>
      {/* Top-left logo */}
      <div
        style={{
          position: 'absolute', top: 28, left: 32, width: 100, zIndex: 20,
          opacity: 1, animation: 'splashFadeIn 1.2s 0.4s cubic-bezier(.22,1,.36,1) forwards',
        }}
        dangerouslySetInnerHTML={{ __html: RQI_LOGO_SVG }}
      />

      {/* Centre UI */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 10, pointerEvents: 'none', marginTop: 110,
      }}>
        {/* Divider line */}
        <div style={{
          width: 1, height: 32,
          background: 'linear-gradient(to bottom, transparent, rgba(15,154,255,0.45), transparent)',
          marginBottom: 18,
          animation: 'splashFadeIn 1s 0.9s ease forwards',
          opacity: 0,
        }} />

        {/* LOADING label */}
        <div style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 11,
          letterSpacing: '0.72em', textTransform: 'uppercase',
          color: '#0f9aff',
          textShadow: '0 0 6px #0f9aff, 0 0 20px rgba(15,154,255,.8), 0 0 50px rgba(15,154,255,.4)',
          animation: 'splashFadeIn 1s 1.1s ease forwards, splashPulse 2.4s 2.1s ease-in-out infinite',
          opacity: 0, whiteSpace: 'nowrap',
        }}>
          LOADING
        </div>

        {/* Status message */}
        <div style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 8,
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(245,158,71,0.8)',
          textShadow: '0 0 10px rgba(245,158,71,.5)',
          marginTop: 12, height: 14, whiteSpace: 'nowrap',
          opacity: msgFading ? 0 : 1,
          transition: 'opacity 0.3s ease',
          animation: 'splashFadeIn 1s 1.4s ease forwards',
        }}>
          {statusMsg}
        </div>

        {/* Loading bar */}
        <div style={{
          width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 7, marginTop: 20,
          animation: 'splashFadeIn 1s 1.6s ease forwards',
          opacity: 0,
        }}>
          <div style={{
            width: '100%', height: 2, background: 'rgba(255,255,255,0.06)',
            borderRadius: 2, overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              height: '100%', width: `${progress}%`, borderRadius: 2,
              background: 'linear-gradient(to right, #56658B, #0F9AFF, #D37669, #F99C46, #FFCC00)',
              backgroundSize: '340px 100%',
              boxShadow: '0 0 8px rgba(15,154,255,0.6), 0 0 20px rgba(249,156,70,0.4)',
              transition: 'width 0.4s cubic-bezier(.4,0,.2,1)',
            }} />
          </div>
          <div style={{
            fontFamily: "'Inter', monospace", fontWeight: 500, fontSize: 10,
            letterSpacing: '0.25em',
            color: 'rgba(255,204,0,1)',
            textShadow: '0 0 8px rgba(255,204,0,0.9), 0 0 20px rgba(255,204,0,0.5)',
            alignSelf: 'flex-end',
          }}>
            {progress}%
          </div>
        </div>

        {/* Skip button */}
        {showSkip && (
          <button
            onClick={finish}
            style={{
              marginTop: 24, pointerEvents: 'auto',
              fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 10,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none',
              cursor: 'pointer', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            SKIP →
          </button>
        )}
      </div>
      </div>
    </div>
  );
}
