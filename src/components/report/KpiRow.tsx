import { useState, useRef, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PILL_DESCRIPTIONS: Record<string, string> = {
  "Ranking keywords": "The total number of keywords for which RQI ranks in search engine results, indicating overall search presence.",
  "Av brand ranking": "RQI's average position across all tracked brand-related search queries compared to competitors.",
  "Website views": "Total page views driven to the RQI website during the campaign period.",
  "Search rankings": "The percentage improvement in search engine ranking positions for targeted keywords.",
  "Search appearances per month": "How often RQI appears in search results each month for infrastructure-related queries.",
  "Page 1 ranks": "Number of keywords where RQI appears on the first page of Google search results.",
  "Page 1-3 ranks": "Number of keywords where RQI appears within the first three pages of search results.",
  "Website visits": "Total unique visits driven to the RQI website from campaign activities.",
  "Engagement rate": "The percentage of audience interactions (likes, comments, shares, clicks) relative to total impressions.",
  "Av CTR": "Average click-through rate — the percentage of people who clicked after seeing the ad or content.",
  "Clicks to website": "Total number of clicks that directed users from ads or social posts to the RQI website.",
  "Active users": "The number of unique users actively engaging with the RQI website during the reporting period.",
  "Dwell time": "Average time a visitor spends on a page before navigating away — a key indicator of content quality.",
  "Total posts": "The total number of social media posts published across RQI's channels during the quarter.",
  "Streams": "Total number of times podcast episodes were played or streamed across all platforms.",
  "Episodes released": "The number of new podcast episodes published during the reporting quarter.",
  "CTOR": "Click-to-open rate — the percentage of email recipients who clicked a link after opening the email.",
  "Open rates": "The percentage of delivered emails that were opened by recipients.",
  "Ad impressions": "The total number of times campaign ads were displayed to users across all placements.",
  "Website visitors": "Total unique visitors driven to the website from campaign activities.",
  "LinkedIn impressions": "The total number of times LinkedIn posts appeared in users' feeds.",
  "Post engagement": "The total number of interactions (likes, comments, shares) on a single post.",
  "Videos released": "The number of new video assets published during the quarter.",
  "Landing pages": "Bespoke web pages created to support campaign messaging and track conversions.",
  "Total mentions": "The total number of times the brand was mentioned across monitored channels.",
  "Positive sentiment": "The percentage of brand mentions classified as positive in tone.",
  "Countries reached": "The number of distinct countries where brand mentions were detected.",
  "Web coverage share": "The proportion of mentions originating from web-based sources vs social.",
  "Organic impressions": "Total impressions from non-paid LinkedIn posts.",
  "Clicks": "Total clicks on LinkedIn content driving to external pages.",
  "Reactions": "Total reactions (likes, celebrates, etc.) on LinkedIn posts.",
  "Page views": "Total number of individual page views recorded on the website.",
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

  const description = PILL_DESCRIPTIONS[label];

  // Only show comparison text if it's a benchmark comparison (contains "vs FS" or "vs Q4" or "vs Q" or "vs benchmark")
  const isBenchmark = /vs\s+(FS|Q\d|benchmark|industry)/i.test(comparison) || comparison.startsWith("⚠");
  const showComparison = isBenchmark && comparison.length > 0;

  // Choose pill class based on variant
  const pillClass = isDark ? "kpi-pill-orange" : "kpi-pill-cream";

  const pill = (
    <span className={`${pillClass} ${description ? "cursor-help" : "cursor-default"}`}>
      {label}
    </span>
  );

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-primary shrink-0 text-sm">+</span>
      <span className={`text-lg font-extrabold shrink-0 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{value}</span>
      <span className="relative shrink-0">
        {description ? (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                {pill}
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[280px] text-xs leading-relaxed"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 100%)",
                  color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 30%)",
                  borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
                }}
              >
                <p className="font-bold mb-1" style={{ color: "hsl(181 41% 53%)" }}>{label}</p>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : pill}
      </span>
      {showComparison && (
        <span
          className={`text-xs whitespace-nowrap font-semibold shrink-0 ${
            isNegative ? "stat-negative" : isNeutral ? "text-white" : "stat-positive"
          }`}
        >
          {comparison}
        </span>
      )}
    </div>
  );
}
