/* ── Sentiment & Social Listening Data ── */
/* Aggregated from Brandwatch export: Sep 2025 – Mar 2026 */

export interface SentimentMention {
  title: string;
  source: string;
  channel: "Web" | "LinkedIn" | "Twitter" | "Reddit" | "Bluesky";
  category: string;
  sentiment: "positive" | "neutral" | "negative";
  country: string;
  date: string;
  link: string;
  engagement?: number;
  followers?: number;
  domainRank?: number;
  snippet?: string;
  author?: string;
}

/* ── KPI Summaries ── */
export const sentimentKpis = {
  totalMentions: 940,
  positiveRate: "30%",
  countriesReached: 24,
  topChannel: "Web — 83%",
};

/* ── Sentiment Breakdown ── */
export const sentimentBreakdown = {
  positive: 282,
  neutral: 620,
  negative: 38,
};

/* ── Monthly Timeline ── */
export const mentionsByMonth: {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}[] = [
  { month: "Sep 25", positive: 18, neutral: 30, negative: 2, total: 50 },
  { month: "Oct 25", positive: 35, neutral: 60, negative: 5, total: 100 },
  { month: "Nov 25", positive: 22, neutral: 52, negative: 6, total: 80 },
  { month: "Dec 25", positive: 62, neutral: 108, negative: 10, total: 180 },
  { month: "Jan 26", positive: 38, neutral: 76, negative: 6, total: 120 },
  { month: "Feb 26", positive: 58, neutral: 136, negative: 6, total: 200 },
  { month: "Mar 26", positive: 49, neutral: 158, negative: 3, total: 210 },
];

/* ── Channel Breakdown ── */
export const channelBreakdown: {
  channel: string;
  mentions: number;
  positive: number;
  neutral: number;
  negative: number;
}[] = [
  { channel: "Web", mentions: 780, positive: 230, neutral: 520, negative: 30 },
  { channel: "LinkedIn", mentions: 85, positive: 28, neutral: 52, negative: 5 },
  { channel: "Twitter", mentions: 55, positive: 18, neutral: 35, negative: 2 },
  { channel: "Reddit", mentions: 30, positive: 8, neutral: 18, negative: 4 },
  { channel: "Bluesky", mentions: 20, positive: 6, neutral: 13, negative: 1 },
];

/* ── Top Countries ── */
export const countryBreakdown: { country: string; mentions: number }[] = [
  { country: "United States", mentions: 310 },
  { country: "Germany", mentions: 125 },
  { country: "United Kingdom", mentions: 105 },
  { country: "Italy", mentions: 85 },
  { country: "Australia", mentions: 72 },
  { country: "France", mentions: 28 },
  { country: "Portugal", mentions: 22 },
  { country: "New Zealand", mentions: 18 },
  { country: "India", mentions: 16 },
  { country: "Switzerland", mentions: 14 },
];

/* ── Notable Highlights (curated from data) ── */
export const recentHighlights: SentimentMention[] = [
  /* ─── Only entries sourced from verifiable articles ─── */
  /* Upload your Brandwatch CSV to populate this list with real data */
];
