import { Sankey, Tooltip, Rectangle, Layer } from "recharts";
import { reportData } from "@/data/igneo-report";
import { useEffect, useState } from "react";

type Status = "good" | "below" | "inactive";

// Build Sankey data from the performance results
function buildSankeyData() {
  const p = reportData.performanceResults;
  const stages = [
    { label: "Awareness", data: p.awareness },
    { label: "Consideration", data: p.consideration },
    { label: "Conversion", data: p.conversion },
    { label: "Service & Loyalty", data: p.serviceLoyalty },
  ];

  const nodeMap = new Map<string, number>();
  const nodes: { name: string; status?: Status; column?: string }[] = [];
  const links: { source: number; target: number; value: number; status: Status; comparison: string }[] = [];

  const getOrCreate = (name: string, extra?: { status?: Status; column?: string }) => {
    if (!nodeMap.has(name)) {
      nodeMap.set(name, nodes.length);
      nodes.push({ name, ...extra });
    }
    return nodeMap.get(name)!;
  };

  stages.forEach((stage) => {
    const stageIdx = getOrCreate(stage.label, { column: "stage" });

    stage.data.forEach((item) => {
      const channelIdx = getOrCreate(item.channel, { status: item.status, column: "channel" });
      // Link stage → channel
      links.push({
        source: stageIdx,
        target: channelIdx,
        value: item.status === "inactive" ? 5 : item.status === "good" ? 20 : 12,
        status: item.status,
        comparison: item.comparison,
      });

      // Create result nodes from metrics
      item.metrics.forEach((metric) => {
        const resultLabel = `${metric}`;
        const resultIdx = getOrCreate(resultLabel, { status: item.status, column: "result" });
        links.push({
          source: channelIdx,
          target: resultIdx,
          value: item.status === "inactive" ? 5 : item.status === "good" ? 20 : 12,
          status: item.status,
          comparison: item.comparison,
        });
      });
    });
  });

  return { nodes, links };
}

const statusColors: Record<Status, string> = {
  good: "hsl(var(--success))",
  below: "hsl(var(--primary))",
  inactive: "hsl(var(--muted-foreground))",
};

function CustomNode({ x, y, width, height, index, payload }: any) {
  const node = payload;
  const isStage = node.column === "stage";
  const isResult = node.column === "result";
  const fill = isStage
    ? "hsl(var(--primary))"
    : node.status
      ? statusColors[node.status as Status]
      : "hsl(var(--muted-foreground))";

  return (
    <Layer key={`node-${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.9}
        rx={4}
        ry={4}
      />
      <text
        x={isResult ? x + width + 8 : x - 8}
        y={y + height / 2}
        textAnchor={isResult ? "start" : "end"}
        dominantBaseline="middle"
        className="fill-foreground"
        fontSize={11}
        fontWeight={isStage ? 700 : 500}
      >
        {node.name}
      </text>
    </Layer>
  );
}

function CustomLink({ sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth, payload }: any) {
  const color = statusColors[payload.status as Status] || "hsl(var(--muted-foreground))";
  return (
    <Layer>
      <path
        d={`M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
        fill="none"
        stroke={color}
        strokeWidth={linkWidth}
        strokeOpacity={0.3}
        className="transition-all duration-300 hover:stroke-opacity-60"
      />
    </Layer>
  );
}

function SankeyTooltipContent({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  if (!data) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-foreground">{data.source?.name} → {data.target?.name}</p>
      {data.comparison && (
        <p className={data.status === "good" ? "text-success mt-1" : data.status === "below" ? "text-primary mt-1" : "text-muted-foreground mt-1"}>
          {data.comparison}
        </p>
      )}
    </div>
  );
}

export default function PerformanceResults() {
  const sankeyData = buildSankeyData();
  const [containerWidth, setContainerWidth] = useState(1100);

  useEffect(() => {
    const handleResize = () => {
      const el = document.getElementById("sankey-container");
      if (el) setContainerWidth(el.clientWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartHeight = Math.max(500, sankeyData.nodes.length * 28);

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

        <div id="sankey-container" className="metric-card overflow-x-auto">
          <div className="hidden sm:flex justify-between mb-4 px-16 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Funnel Stage</span>
            <span>Channel</span>
            <span>Result</span>
          </div>
          <Sankey
            width={Math.max(containerWidth - 48, 600)}
            height={chartHeight}
            data={sankeyData}
            node={<CustomNode />}
            link={<CustomLink />}
            nodePadding={14}
            nodeWidth={10}
            margin={{ left: 180, right: 200, top: 10, bottom: 10 }}
            iterations={64}
          >
            <Tooltip content={<SankeyTooltipContent />} />
          </Sankey>
        </div>

        {/* Mobile fallback table */}
        <div className="sm:hidden mt-6 space-y-4">
          {["awareness", "consideration", "conversion", "serviceLoyalty"].map((key) => {
            const stageLabel = key === "serviceLoyalty" ? "Service & Loyalty" : key.charAt(0).toUpperCase() + key.slice(1);
            const items = reportData.performanceResults[key as keyof typeof reportData.performanceResults];
            return (
              <div key={key}>
                <h3 className="text-sm font-bold text-primary mb-2">{stageLabel}</h3>
                {items.map((item) => (
                  <div key={item.channel} className="metric-card mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${item.status === "good" ? "bg-success" : item.status === "below" ? "bg-primary" : "bg-muted-foreground"}`} />
                      <span className="text-xs font-medium text-foreground">{item.channel}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.metrics.join(" · ")}</span>
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
