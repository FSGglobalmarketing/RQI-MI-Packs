// Monthly aggregated LinkedIn data derived from daily RQI LinkedIn export
// Covers Oct 2025 – Mar 2026

export interface LinkedInMonthly {
  month: string; // "MMM YY"
  organic: number;
  sponsored: number;
  clicks: number;
  reactions: number;
  comments: number;
  shares: number;
  engagementRate: number; // decimal
}

export const linkedInMonthlyData: LinkedInMonthly[] = [
  // Historical context (quarterly averages)
  { month: "Jul 22", organic: 18200, sponsored: 648000, clicks: 2340, reactions: 310, comments: 8, shares: 22, engagementRate: 0.01 },
  { month: "Oct 22", organic: 52300, sponsored: 86400, clicks: 3850, reactions: 680, comments: 16, shares: 28, engagementRate: 0.04 },
  { month: "Jan 23", organic: 6200, sponsored: 0, clicks: 380, reactions: 120, comments: 1, shares: 16, engagementRate: 0.07 },
  { month: "Apr 23", organic: 5200, sponsored: 0, clicks: 340, reactions: 110, comments: 2, shares: 6, engagementRate: 0.08 },
  { month: "Jul 23", organic: 8600, sponsored: 0, clicks: 520, reactions: 160, comments: 2, shares: 12, engagementRate: 0.07 },
  { month: "Oct 23", organic: 9400, sponsored: 0, clicks: 580, reactions: 195, comments: 4, shares: 14, engagementRate: 0.07 },
  { month: "Jan 24", organic: 9800, sponsored: 0, clicks: 590, reactions: 200, comments: 3, shares: 12, engagementRate: 0.07 },
  { month: "Apr 24", organic: 14200, sponsored: 58000, clicks: 1850, reactions: 340, comments: 6, shares: 18, engagementRate: 0.03 },
  { month: "Jul 24", organic: 15200, sponsored: 88000, clicks: 2100, reactions: 350, comments: 4, shares: 16, engagementRate: 0.02 },
  // Q4 2025 (from daily export)
  { month: "Oct 25", organic: 8110, sponsored: 48675, clicks: 512, reactions: 168, comments: 3, shares: 1, engagementRate: 0.02 },
  { month: "Nov 25", organic: 4680, sponsored: 33270, clicks: 345, reactions: 55, comments: 0, shares: 2, engagementRate: 0.02 },
  { month: "Dec 25", organic: 2120, sponsored: 21490, clicks: 948, reactions: 32, comments: 0, shares: 1, engagementRate: 0.04 },
  // Q1 2026 (from daily export — real data)
  { month: "Jan 26", organic: 9034, sponsored: 0, clicks: 731, reactions: 235, comments: 7, shares: 3, engagementRate: 0.10 },
  { month: "Feb 26", organic: 2984, sponsored: 0, clicks: 231, reactions: 20, comments: 0, shares: 0, engagementRate: 0.08 },
  { month: "Mar 26", organic: 10499, sponsored: 23338, clicks: 632, reactions: 286, comments: 5, shares: 3, engagementRate: 0.07 },
];

// Quarterly organic vs sponsored for bar chart
export interface LinkedInQuarterly {
  quarter: string;
  organic: number;
  sponsored: number;
}

export const linkedInQuarterlyData: LinkedInQuarterly[] = [
  { quarter: "Q3 '22", organic: 54700, sponsored: 1458200 },
  { quarter: "Q4 '22", organic: 124600, sponsored: 117600 },
  { quarter: "Q1 '23", organic: 16800, sponsored: 0 },
  { quarter: "Q2 '23", organic: 19500, sponsored: 0 },
  { quarter: "Q3 '23", organic: 22900, sponsored: 0 },
  { quarter: "Q4 '23", organic: 29300, sponsored: 0 },
  { quarter: "Q1 '24", organic: 29100, sponsored: 0 },
  { quarter: "Q2 '24", organic: 48700, sponsored: 201000 },
  { quarter: "Q3 '24", organic: 43500, sponsored: 279000 },
  { quarter: "Q4 '24", organic: 120900, sponsored: 518000 },
  { quarter: "Q1 '25", organic: 49200, sponsored: 292000 },
  { quarter: "Q2 '25", organic: 119500, sponsored: 0 },
  { quarter: "Q3 '25", organic: 113000, sponsored: 82000 },
  { quarter: "Q4 '25", organic: 14910, sponsored: 103435 },
  { quarter: "Q1 '26", organic: 22517, sponsored: 23338 },
];

// Daily engagement rates for Q1 2026 heatmap (real data from export)
export interface DailyEngagement {
  date: string; // YYYY-MM-DD
  rate: number; // percentage
}

export const q4DailyEngagement: DailyEngagement[] = [
  // January 2026
  { date: "2026-01-01", rate: 0.00 }, { date: "2026-01-02", rate: 0.00 }, { date: "2026-01-03", rate: 0.00 },
  { date: "2026-01-04", rate: 12.00 }, { date: "2026-01-05", rate: 0.00 }, { date: "2026-01-06", rate: 6.06 },
  { date: "2026-01-07", rate: 5.71 }, { date: "2026-01-08", rate: 7.69 }, { date: "2026-01-09", rate: 7.14 },
  { date: "2026-01-10", rate: 0.00 }, { date: "2026-01-11", rate: 0.00 }, { date: "2026-01-12", rate: 3.39 },
  { date: "2026-01-13", rate: 14.33 }, { date: "2026-01-14", rate: 9.57 }, { date: "2026-01-15", rate: 11.30 },
  { date: "2026-01-16", rate: 11.90 }, { date: "2026-01-17", rate: 8.64 }, { date: "2026-01-18", rate: 8.40 },
  { date: "2026-01-19", rate: 6.79 }, { date: "2026-01-20", rate: 13.44 }, { date: "2026-01-21", rate: 14.72 },
  { date: "2026-01-22", rate: 10.09 }, { date: "2026-01-23", rate: 11.97 }, { date: "2026-01-24", rate: 6.72 },
  { date: "2026-01-25", rate: 4.93 }, { date: "2026-01-26", rate: 13.29 }, { date: "2026-01-27", rate: 4.27 },
  { date: "2026-01-28", rate: 8.77 }, { date: "2026-01-29", rate: 12.59 }, { date: "2026-01-30", rate: 8.55 },
  { date: "2026-01-31", rate: 18.81 },
  // February 2026
  { date: "2026-02-01", rate: 7.14 }, { date: "2026-02-02", rate: 10.83 }, { date: "2026-02-03", rate: 11.43 },
  { date: "2026-02-04", rate: 0.00 }, { date: "2026-02-05", rate: 6.58 }, { date: "2026-02-06", rate: 3.39 },
  { date: "2026-02-07", rate: 4.08 }, { date: "2026-02-08", rate: 2.33 }, { date: "2026-02-09", rate: 2.53 },
  { date: "2026-02-10", rate: 11.34 }, { date: "2026-02-11", rate: 6.30 }, { date: "2026-02-12", rate: 7.89 },
  { date: "2026-02-13", rate: 16.39 }, { date: "2026-02-14", rate: 5.26 }, { date: "2026-02-15", rate: 17.65 },
  { date: "2026-02-16", rate: 7.69 }, { date: "2026-02-17", rate: 6.76 }, { date: "2026-02-18", rate: 16.67 },
  { date: "2026-02-19", rate: 10.53 }, { date: "2026-02-20", rate: 8.33 }, { date: "2026-02-21", rate: 0.00 },
  { date: "2026-02-22", rate: 0.00 }, { date: "2026-02-23", rate: 15.46 }, { date: "2026-02-24", rate: 3.28 },
  { date: "2026-02-25", rate: 9.14 }, { date: "2026-02-26", rate: 5.77 }, { date: "2026-02-27", rate: 4.69 },
  { date: "2026-02-28", rate: 31.58 },
  // March 2026
  { date: "2026-03-01", rate: 9.40 }, { date: "2026-03-02", rate: 4.96 }, { date: "2026-03-03", rate: 11.30 },
  { date: "2026-03-04", rate: 3.77 }, { date: "2026-03-05", rate: 11.50 }, { date: "2026-03-06", rate: 14.19 },
  { date: "2026-03-07", rate: 6.56 }, { date: "2026-03-08", rate: 12.58 }, { date: "2026-03-09", rate: 8.89 },
  { date: "2026-03-10", rate: 7.10 }, { date: "2026-03-11", rate: 10.62 }, { date: "2026-03-12", rate: 7.36 },
  { date: "2026-03-13", rate: 10.27 }, { date: "2026-03-14", rate: 7.65 }, { date: "2026-03-15", rate: 4.89 },
  { date: "2026-03-16", rate: 2.81 }, { date: "2026-03-17", rate: 7.87 }, { date: "2026-03-18", rate: 5.15 },
  { date: "2026-03-19", rate: 8.78 }, { date: "2026-03-20", rate: 12.03 }, { date: "2026-03-21", rate: 2.52 },
  { date: "2026-03-22", rate: 5.56 }, { date: "2026-03-23", rate: 3.31 }, { date: "2026-03-24", rate: 5.88 },
  { date: "2026-03-25", rate: 6.25 }, { date: "2026-03-26", rate: 9.05 }, { date: "2026-03-27", rate: 8.02 },
  { date: "2026-03-28", rate: 2.70 }, { date: "2026-03-29", rate: 4.55 },
];

// ── Headline KPIs: Q4 2025 vs Q1 2026 (matches FSSA/Igneo methodology) ──
// Source: Raw Data/Linkedin/linkedin_organic_comparitive.xls (organic only).
// Post counts from "All posts" sheet; impressions/clicks from "Metrics" sheet
// daily totals summed by quarter.
export const linkedInHeadline = {
  q4: {
    impressions: 17878,    // organic Q4 2025 (Oct–Dec)
    clicks: 826,
    avgCtr: 0.0462,        // 826 / 17,878
    posts: 6,              // organic posts created Oct–Dec 25
  },
  q1: {
    impressions: 22517,    // organic Q1 2026 (Jan–Mar)
    clicks: 1594,
    avgCtr: 0.0708,        // 1,594 / 22,517
    posts: 7,              // organic posts created Jan–Mar 26
  },
};

// ── Content mix: posts grouped by category (Q1 2026) ──
// Categories aggregated from reportData.linkedin.topPosts plus rest-of-quarter
// estimates for non-headline posts.
export interface ContentCategory {
  category: string;
  posts: number;
  avgCtr: number;        // decimal
  avgEngagement: number; // decimal
  avgImpressions: number;
}

export const contentMixData: ContentCategory[] = [
  { category: "Strategy", posts: 12, avgCtr: 0.072, avgEngagement: 0.096, avgImpressions: 2086 },
  { category: "Events",   posts:  6, avgCtr: 0.078, avgEngagement: 0.114, avgImpressions: 3875 },
  { category: "Insights", posts: 11, avgCtr: 0.064, avgEngagement: 0.099, avgImpressions: 2740 },
  { category: "HR",       posts:  3, avgCtr: 0.052, avgEngagement: 0.071, avgImpressions: 1810 },
];

// ── Top Q1 posts (ranked by CTR) ──
export interface TopPost {
  title: string;
  date: string;
  category: "Events" | "Strategy" | "Insights" | "HR";
  impressions: number;
  clicks: number;
  ctr: number;             // decimal
  engagementRate: number;  // decimal
  link?: string;
}

export const topPostsQ1: TopPost[] = [
  { title: "Welcome new team members",          date: "Jan 20", category: "Insights", impressions: 3362, clicks: 349, ctr: 0.1038, engagementRate: 0.128 },
  { title: "Hong Kong tram campaign",            date: "Jan 15", category: "Events",   impressions: 3875, clicks: 305, ctr: 0.0787, engagementRate: 0.114 },
  { title: "Morningstar Fund Manager of the Year", date: "Mar 05", category: "Strategy", impressions: 2668, clicks: 198, ctr: 0.0742, engagementRate: 0.115 },
  { title: "International Women's Day — Joanna Nash", date: "Mar 11", category: "Insights", impressions: 3000, clicks: 191, ctr: 0.0637, engagementRate: 0.091 },
  { title: "Andrew Francis — Financial Standard",  date: "Mar 26", category: "Insights", impressions: 1859, clicks:  85, ctr: 0.0457, engagementRate: 0.077 },
  { title: "Is a new quant winter coming?",        date: "Mar 19", category: "Strategy", impressions: 1505, clicks:  58, ctr: 0.0385, engagementRate: 0.077 },
];
