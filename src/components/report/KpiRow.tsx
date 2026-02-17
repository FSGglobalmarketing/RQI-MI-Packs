interface KpiRowProps {
  value: string;
  label: string;
  comparison: string;
  variant?: "dark" | "cream";
}

export default function KpiRow({ value, label, comparison, variant = "dark" }: KpiRowProps) {
  const isNegative = comparison.startsWith("-");
  const isNeutral = comparison.startsWith("0%");
  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-4">
      <span className="text-primary shrink-0 text-sm">+</span>
      <span className={`text-lg font-extrabold min-w-[70px] ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{value}</span>
      <span className="kpi-pill-orange">{label}</span>
      <span
        className={`text-xs whitespace-nowrap font-semibold ${
          isNegative ? "stat-negative" : isNeutral ? "text-muted-foreground" : "stat-positive"
        }`}
      >
        {comparison}
      </span>
    </div>
  );
}
