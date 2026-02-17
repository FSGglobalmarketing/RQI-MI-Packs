import { reportData } from "@/data/igneo-report";

type Status = "good" | "below" | "inactive";

function StatusDot({ status }: { status: Status }) {
  const cls = status === "good" ? "bg-success" : status === "below" ? "bg-primary" : "bg-muted";
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${cls}`} />;
}

function MetricRow({ channel, metrics, comparison, status }: {
  channel: string; metrics: string[]; comparison: string; status: Status;
}) {
  return (
    <div className="metric-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <StatusDot status={status} />
        <span className="font-semibold text-foreground text-sm">{channel}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {metrics.map((m) => (
          <span key={m} className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 text-foreground font-medium">{m}</span>
        ))}
        {comparison && (
          <span className={status === "good" ? "stat-positive" : status === "below" ? "stat-negative" : "text-muted-foreground text-sm"}>
            {comparison}
          </span>
        )}
      </div>
    </div>
  );
}

export default function PerformanceResults() {
  const p = reportData.performanceResults;
  const stages: { label: string; data: { channel: string; metrics: string[]; comparison: string; status: Status }[] }[] = [
    { label: "Awareness", data: p.awareness },
    { label: "Consideration", data: p.consideration },
    { label: "Conversion", data: p.conversion },
    { label: "Service & Loyalty", data: p.serviceLoyalty },
  ];

  return (
    <section id="performance" className="section-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">Performance & Results</h2>
        <p className="text-muted-foreground mb-4">A birds-eye view of performance across channel and where we exceeded our targets.</p>
        <div className="flex gap-4 mb-10">
          <span className="flex items-center gap-2 text-xs text-muted-foreground"><StatusDot status="good" /> Good</span>
          <span className="flex items-center gap-2 text-xs text-muted-foreground"><StatusDot status="below" /> Below target</span>
          <span className="flex items-center gap-2 text-xs text-muted-foreground"><StatusDot status="inactive" /> Not activated</span>
        </div>

        <div className="space-y-10">
          {stages.map((stage) => (
            <div key={stage.label}>
              <h3 className="text-lg font-bold text-primary mb-4">{stage.label}</h3>
              <div className="space-y-3">
                {stage.data.map((item) => (
                  <MetricRow key={item.channel} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
