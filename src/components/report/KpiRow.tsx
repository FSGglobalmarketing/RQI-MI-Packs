import { useState, useRef, useEffect } from "react";

const PILL_DESCRIPTIONS: Record<string, string> = {
  "Ranking keywords": "The total number of keywords for which Igneo ranks in search engine results, indicating overall search presence.",
  "Av brand ranking": "Igneo's average position across all tracked brand-related search queries compared to competitors.",
  "Website views": "Total page views driven to the Igneo website during the campaign period.",
  "Search rankings": "The percentage improvement in search engine ranking positions for targeted keywords.",
  "Search appearances per month": "How often Igneo appears in search results each month for infrastructure-related queries.",
  "Page 1 ranks": "Number of keywords where Igneo appears on the first page of Google search results.",
  "Page 1-3 ranks": "Number of keywords where Igneo appears within the first three pages of search results.",
  "Website visits": "Total unique visits driven to the Igneo website from campaign activities.",
  "Engagement rate": "The percentage of audience interactions (likes, comments, shares, clicks) relative to total impressions.",
  "Av CTR": "Average click-through rate — the percentage of people who clicked after seeing the ad or content.",
  "Clicks to website": "Total number of clicks that directed users from ads or social posts to the Igneo website.",
  "Active users": "The number of unique users actively engaging with the Igneo website during the reporting period.",
  "Dwell time": "Average time a visitor spends on a page before navigating away — a key indicator of content quality.",
  "Total posts": "The total number of social media posts published across Igneo's channels during the quarter.",
  "Streams": "Total number of times podcast episodes were played or streamed across all platforms.",
  "Episodes released": "The number of new podcast episodes published during the reporting quarter.",
  "CTOR": "Click-to-open rate — the percentage of email recipients who clicked a link after opening the email.",
  "Open rates": "The percentage of delivered emails that were opened by recipients.",
};

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
  const [showTooltip, setShowTooltip] = useState(false);
  const pillRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const description = PILL_DESCRIPTIONS[label];

  useEffect(() => {
    if (!showTooltip) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pillRef.current && !pillRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTooltip]);

  return (
    <div className="flex items-center gap-4">
      <span className="text-primary shrink-0 text-sm">+</span>
      <span className={`text-lg font-extrabold min-w-[70px] ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{value}</span>
      <span className="relative">
        <button
          ref={pillRef}
          onClick={() => description && setShowTooltip((v) => !v)}
          className={`kpi-pill-orange ${description ? "cursor-pointer hover:opacity-90" : "cursor-default"}`}
        >
          {label}
        </button>
        {showTooltip && description && (
          <div
            ref={tooltipRef}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-xl p-3 text-xs leading-relaxed shadow-lg border animate-in fade-in-0 zoom-in-95"
            style={{
              backgroundColor: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 100%)",
              color: isDark ? "hsl(0 0% 60%)" : "hsl(0 0% 20%)",
              borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
            }}
          >
            <p className="font-bold mb-1" style={{ color: "#0F9AFF" }}>{label}</p>
            <p>{description}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent"
              style={{ borderTopColor: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 100%)" }}
            />
          </div>
        )}
      </span>
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
