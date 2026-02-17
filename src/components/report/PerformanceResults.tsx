import { reportData } from "@/data/igneo-report";
import { useEffect, useRef, useState } from "react";

type Status = "good" | "below" | "inactive";

const statusColors: Record<Status, { bg: string; border: string; text: string }> = {
  good: { bg: "hsl(var(--success) / 0.15)", border: "hsl(var(--success))", text: "hsl(var(--success))" },
  below: { bg: "hsl(var(--primary) / 0.15)", border: "hsl(var(--primary))", text: "hsl(var(--primary))" },
  inactive: { bg: "hsl(var(--muted-foreground) / 0.1)", border: "hsl(var(--muted-foreground) / 0.4)", text: "hsl(var(--muted-foreground))" },
};

interface ChannelNode {
  channel: string;
  metrics: string[];
  comparison: string;
  status: Status;
  stage: string;
}

function buildTree() {
  const p = reportData.performanceResults;
  const stages = [
    { label: "Awareness", data: p.awareness },
    { label: "Consideration", data: p.consideration },
    { label: "Conversion", data: p.conversion },
    { label: "Service & Loyalty", data: p.serviceLoyalty },
  ];

  const allChannels: ChannelNode[] = [];
  stages.forEach((s) =>
    s.data.forEach((item) =>
      allChannels.push({ ...item, stage: s.label })
    )
  );

  return { stages: stages.map((s) => s.label), channels: allChannels };
}

export default function PerformanceResults() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(900);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setWidth(containerRef.current.clientWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { stages, channels } = buildTree();

  // Layout constants
  const stageX = 20;
  const stagePillW = 160;
  const stagePillH = 44;
  const channelPillW = Math.min(360, width - stagePillW - 80);
  const channelPillH = 56;
  const channelX = stageX + stagePillW + 80;
  const channelGap = 12;
  const stageGap = 10;

  // Compute channel Y positions
  const channelPositions: { node: ChannelNode; y: number }[] = [];
  let cy = 20;
  channels.forEach((ch) => {
    channelPositions.push({ node: ch, y: cy });
    cy += channelPillH + channelGap;
  });
  const totalHeight = cy + 10;

  // Compute stage Y positions (centered on their channels)
  const stagePositions: { label: string; y: number; h: number }[] = [];
  stages.forEach((stage) => {
    const stageChannels = channelPositions.filter((c) => c.node.stage === stage);
    if (stageChannels.length === 0) return;
    const firstY = stageChannels[0].y;
    const lastY = stageChannels[stageChannels.length - 1].y + channelPillH;
    const centerY = (firstY + lastY) / 2 - stagePillH / 2;
    stagePositions.push({ label: stage, y: centerY, h: stagePillH });
  });

  return (
    <section id="performance" className="section-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">KPI Framework</h2>
        <p className="text-muted-foreground mb-4">A birds-eye view of performance across channel and where we exceeded our targets.</p>
        <div className="flex gap-4 mb-8">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-success" /> Good
          </span>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" /> Below target
          </span>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-muted-foreground" /> Not activated
          </span>
        </div>

        {/* Desktop SVG diagram */}
        <div ref={containerRef} className="hidden sm:block metric-card overflow-x-auto">
          <div className="flex justify-between mb-4 text-xs font-bold text-muted-foreground uppercase tracking-wider" style={{ paddingLeft: stageX, paddingRight: 20 }}>
            <span style={{ width: stagePillW, textAlign: "center" }}>Funnel Stage</span>
            <span style={{ flex: 1, textAlign: "center" }}>Channel & Metrics</span>
          </div>
          <svg width={Math.max(channelX + channelPillW + 20, width - 48)} height={totalHeight} className="block">
            {/* Connector lines */}
            {channelPositions.map(({ node, y }) => {
              const sp = stagePositions.find((s) => s.label === node.stage);
              if (!sp) return null;
              const x1 = stageX + stagePillW;
              const y1 = sp.y + stagePillH / 2;
              const x2 = channelX;
              const y2 = y + channelPillH / 2;
              const midX = (x1 + x2) / 2;
              const colors = statusColors[node.status];
              return (
                <path
                  key={node.channel}
                  d={`M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`}
                  fill="none"
                  stroke={colors.border}
                  strokeWidth={2}
                  strokeOpacity={0.5}
                  className="transition-opacity duration-300"
                />
              );
            })}

            {/* Stage pills */}
            {stagePositions.map(({ label, y }) => (
              <g key={label}>
                <rect
                  x={stageX}
                  y={y}
                  width={stagePillW}
                  height={stagePillH}
                  rx={stagePillH / 2}
                  fill="hsl(var(--primary) / 0.15)"
                  stroke="hsl(var(--primary))"
                  strokeWidth={1.5}
                />
                <text
                  x={stageX + stagePillW / 2}
                  y={y + stagePillH / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-foreground"
                  fontSize={13}
                  fontWeight={700}
                >
                  {label}
                </text>
              </g>
            ))}

            {/* Channel pills with metrics inside */}
            {channelPositions.map(({ node, y }) => {
              const colors = statusColors[node.status];
              return (
                <g key={node.channel} className="group">
                  <rect
                    x={channelX}
                    y={y}
                    width={channelPillW}
                    height={channelPillH}
                    rx={channelPillH / 2}
                    fill={colors.bg}
                    stroke={colors.border}
                    strokeWidth={1.5}
                    className="transition-all duration-200"
                  />
                  {/* Channel name */}
                  <text
                    x={channelX + 20}
                    y={y + 20}
                    dominantBaseline="central"
                    className="fill-foreground"
                    fontSize={12}
                    fontWeight={600}
                  >
                    {node.channel}
                  </text>
                  {/* Metrics row */}
                  <text
                    x={channelX + 20}
                    y={y + 40}
                    dominantBaseline="central"
                    fontSize={10}
                    fill={colors.text}
                    fontWeight={500}
                  >
                    {node.metrics.join("  ·  ")}
                    {node.comparison && `  ▸  ${node.comparison}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile fallback */}
        <div className="sm:hidden mt-6 space-y-4">
          {["awareness", "consideration", "conversion", "serviceLoyalty"].map((key) => {
            const stageLabel = key === "serviceLoyalty" ? "Service & Loyalty" : key.charAt(0).toUpperCase() + key.slice(1);
            const items = reportData.performanceResults[key as keyof typeof reportData.performanceResults];
            return (
              <div key={key}>
                <h3 className="text-sm font-bold text-primary mb-2">{stageLabel}</h3>
                {items.map((item) => (
                  <div key={item.channel} className="metric-card mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${item.status === "good" ? "bg-success" : item.status === "below" ? "bg-primary" : "bg-muted-foreground"}`} />
                      <span className="text-xs font-semibold text-foreground">{item.channel}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.metrics.join(" · ")}{item.comparison && ` · ${item.comparison}`}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
