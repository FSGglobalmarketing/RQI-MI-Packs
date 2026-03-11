import { reportData } from "@/data/igneo-report";
import { useState } from "react";

type Status = "good" | "below" | "inactive";

const statusFill: Record<Status, string> = {
  good: "hsl(var(--success))",
  below: "hsl(var(--primary))",
  inactive: "hsl(var(--muted-foreground))",
};

const statusBg: Record<Status, string> = {
  good: "hsl(var(--success) / 0.15)",
  below: "hsl(var(--primary) / 0.15)",
  inactive: "hsl(var(--muted-foreground) / 0.08)",
};

// Funnel circle sizes: biggest at top, smallest at bottom
const stageCircleR: Record<string, number> = {
  "Awareness": 42,
  "Consideration": 34,
  "Conversion": 26,
  "Service & Loyalty": 20,
};

// More spacing for top-of-funnel stages
const stageBottomGap: Record<string, number> = {
  "Awareness": 44,
  "Consideration": 34,
  "Conversion": 24,
  "Service & Loyalty": 12,
};

interface Row {
  channel: string;
  metrics: string[];
  comparison: string;
  status: Status;
  stage: string;
  id: string;
}

function buildRows(): { stages: string[]; rows: Row[] } {
  const p = reportData.performanceResults;
  const stages = [
    { label: "Awareness", data: p.awareness },
    { label: "Consideration", data: p.consideration },
    { label: "Conversion", data: p.conversion },
    { label: "Service & Loyalty", data: p.serviceLoyalty },
  ];
  const rows: Row[] = [];
  stages.forEach((s) =>
    s.data.forEach((item, i) =>
      rows.push({ ...item, stage: s.label, id: `${s.label}-${i}` })
    )
  );
  return { stages: stages.map((s) => s.label), rows };
}

export default function PerformanceResults() {
  const { stages, rows } = buildRows();
  const [hovered, setHovered] = useState<string | null>(null);

  // Layout — expanded to use more space
  const metricPillH = 28;
  const metricGap = 6;
  const rowPadding = 10;
  const rowGap = 18;
  const spineX = 180;
  const branchStartX = spineX + 2;
  const channelX = spineX + 80;
  const channelPillW = 175;
  const metricX = channelX + channelPillW + 14;
  const metricPillW = 175;
  const compX = metricX + metricPillW + 14;
  const totalW = compX + 160;

  // Helper: row height based on metric count
  const getRowH = (row: Row) => {
    const metricsH = row.metrics.length * metricPillH + (row.metrics.length - 1) * metricGap;
    return Math.max(44, metricsH + rowPadding * 2);
  };

  // Compute Y positions
  let currentY = 20;
  const stageBlocks: { label: string; y: number; centerY: number; circleR: number; rows: { row: Row; y: number; h: number }[] }[] = [];

  stages.forEach((stage) => {
    const stageRows = rows.filter((r) => r.stage === stage);
    const startY = currentY;
    const rowPositions = stageRows.map((row) => {
      const h = getRowH(row);
      const y = currentY;
      currentY += h + rowGap;
      return { row, y, h };
    });
    currentY += stageBottomGap[stage] ?? 20;
    const firstMidY = rowPositions[0] ? rowPositions[0].y + rowPositions[0].h / 2 : startY;
    const lastMidY = rowPositions[rowPositions.length - 1]
      ? rowPositions[rowPositions.length - 1].y + rowPositions[rowPositions.length - 1].h / 2
      : startY;
    const centerY = (firstMidY + lastMidY) / 2;
    const r = stageCircleR[stage] ?? 24;
    stageBlocks.push({ label: stage, y: startY, centerY, circleR: r, rows: rowPositions });
  });

  const totalH = currentY + 20;

  const dimmed = hovered !== null;

  return (
    <section id="performance" className="section-dark py-24 flow-section-dark relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-0">
          {/* Left text block */}
          <div className="lg:w-[280px] shrink-0">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Performance<br />& Results
            </h2>
            <h3 className="text-lg font-bold text-foreground mb-3">What does good look like?</h3>
            <p className="text-sm text-muted-foreground mb-8">
              A birds-eye view of performance across channel and where we exceeded our targets.
            </p>
            <div className="space-y-3">
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-block w-4 h-4 rounded-full bg-success" /> Good
              </span>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-block w-4 h-4 rounded-full bg-primary" /> Below target
              </span>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-block w-4 h-4 rounded-full bg-muted-foreground/40" /> Not activated / finished
              </span>
            </div>
          </div>

          {/* Right diagram */}
          <div className="flex-1 overflow-x-auto">
            <svg
              viewBox={`0 0 ${totalW} ${totalH}`}
              width="100%"
              height={totalH}
              className="block min-w-[650px]"
              onMouseLeave={() => setHovered(null)}
            >
              {/* Vertical spine */}
              <line
                x1={spineX}
                y1={stageBlocks[0]?.centerY ?? 0}
                x2={spineX}
                y2={stageBlocks[stageBlocks.length - 1]?.centerY ?? 0}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                opacity={dimmed ? 0.1 : 0.35}
              />

              {stageBlocks.map((block) => {
                const anyHoveredInStage = block.rows.some((r) => r.row.id === hovered);

                return (
                  <g key={block.label}>
                    {/* Stage label */}
                    <text
                      x={spineX - block.circleR - 16}
                      y={block.centerY}
                      textAnchor="end"
                      dominantBaseline="central"
                      fontSize={16}
                      fontWeight={700}
                      fill="hsl(var(--primary))"
                      opacity={dimmed && !anyHoveredInStage ? 0.2 : 1}
                      className="transition-opacity duration-200"
                    >
                      {block.label}
                    </text>

                    {/* Stage circle — all orange (primary), sized by funnel position */}
                    <circle
                      cx={spineX}
                      cy={block.centerY}
                      r={block.circleR}
                      fill="hsl(var(--primary))"
                      opacity={dimmed && !anyHoveredInStage ? 0.2 : 0.9}
                      className="transition-opacity duration-200"
                    />

                    {/* Rows */}
                    {block.rows.map(({ row, y, h }) => {
                      const isActive = hovered === row.id;
                      const rowOpacity = dimmed ? (isActive ? 1 : 0.15) : 1;
                      const rowMidY = y + h / 2;

                      return (
                        <g
                          key={row.id}
                          onMouseEnter={() => setHovered(row.id)}
                          className="cursor-pointer"
                          style={{ transition: "opacity 0.2s" }}
                          opacity={rowOpacity}
                        >
                          {/* Vertical connector from spine center to branch */}
                          <line
                            x1={spineX}
                            y1={block.centerY}
                            x2={spineX}
                            y2={rowMidY}
                           stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            opacity={0.7}
                          />
                          {/* Horizontal branch line */}
                          <line
                            x1={branchStartX}
                            y1={rowMidY}
                            x2={channelX}
                            y2={rowMidY}
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                          />

                          {/* Channel pill */}
                          <rect
                            x={channelX}
                            y={rowMidY - 16}
                            width={channelPillW}
                            height={32}
                            rx={16}
                            fill="rgba(255,255,255,0.06)"
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth={1}
                          />
                          <text
                            x={channelX + channelPillW / 2}
                            y={rowMidY}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={13}
                            fontWeight={600}
                            className="fill-foreground"
                          >
                            {row.channel}
                          </text>

                          {/* Metric pills with curved connecting lines */}
                          {row.metrics.map((m, mi) => {
                            const pillY = y + rowPadding + mi * (metricPillH + metricGap);
                            const pillMidY = pillY + metricPillH / 2;
                            const startX = channelX + channelPillW;
                            const endX = metricX;
                            const midX = startX + (endX - startX) / 2;
                            const r = 10;

                            // Curved path from channel pill to metric pill
                            let pathD: string;
                            if (pillMidY === rowMidY) {
                              // Straight horizontal
                              pathD = `M ${startX} ${rowMidY} L ${endX} ${rowMidY}`;
                            } else {
                              // Elbow with rounded corner
                              const dir = pillMidY > rowMidY ? 1 : -1;
                              const cornerX = startX + 12;
                              const clampedR = Math.min(r, Math.abs(pillMidY - rowMidY));
                              pathD = `M ${startX} ${rowMidY} L ${cornerX - clampedR} ${rowMidY} Q ${cornerX} ${rowMidY} ${cornerX} ${rowMidY + dir * clampedR} L ${cornerX} ${pillMidY} L ${endX} ${pillMidY}`;
                            }

                            return (
                              <g key={mi}>
                                <path
                                  d={pathD}
                                  stroke={statusFill[row.status]}
                                  strokeWidth={2}
                                  fill="none"
                                  opacity={0.5}
                                />
                                <rect
                                  x={metricX}
                                  y={pillY}
                                  width={metricPillW}
                                  height={metricPillH}
                                  rx={14}
                                  fill={statusBg[row.status]}
                                  stroke={statusFill[row.status]}
                                  strokeWidth={1}
                                />
                                <text
                                  x={metricX + metricPillW / 2}
                                  y={pillMidY}
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  fontSize={12}
                                  fontWeight={600}
                                  fill={statusFill[row.status]}
                                >
                                  {m}
                                </text>
                              </g>
                            );
                          })}

                          {/* Comparison text */}
                          {row.comparison && (
                            <text
                              x={compX}
                              y={rowMidY}
                              dominantBaseline="central"
                              fontSize={13}
                              fontWeight={600}
                              fill={row.status === "good" ? "hsl(var(--success))" : row.status === "below" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                            >
                              {row.comparison}
                            </text>
                          )}

                          {/* Invisible hover target */}
                          <rect
                            x={branchStartX}
                            y={y}
                            width={compX + 120 - branchStartX}
                            height={h}
                            fill="transparent"
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="lg:hidden mt-8 space-y-4">
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
