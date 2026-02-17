interface KpiRowProps {
  value: string;
  label: string;
  comparison: string;
}

export default function KpiRow({ value, label, comparison }: KpiRowProps) {
  const isNegative = comparison.startsWith("-");
  const isNeutral = comparison.startsWith("0%");

  return (
    <div className="flex items-center gap-4">
      <span className="text-primary shrink-0 text-sm">+</span>
      <span className="text-lg font-extrabold min-w-[70px] text-foreground">{value}</span>
      <span className="kpi-pill-orange">{label}</span>
      <span
        className={`text-xs ml-auto whitespace-nowrap font-semibold ${
          isNegative ? "stat-negative" : isNeutral ? "text-muted-foreground" : "stat-positive"
        }`}
      >
        {comparison}
      </span>
    </div>
  );
}
