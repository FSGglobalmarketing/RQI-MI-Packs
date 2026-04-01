export interface EventTeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface EventItem {
  name: string;
  format: string;
  audience: string;
  region: string;
  quarter: string;
  status: "committed" | "proposed" | "proprietary" | "distribution-owned";
  category: string;
  city: string;
  lat: number;
  lng: number;
  startDate?: string;
  endDate?: string;
  brand?: string;
  host?: string;
  speaker?: string;
  hasSpeakingSlot?: boolean;
  assetClass?: string;
  marketingLead?: string;
  distributionLead?: string;
  sponsorshipCost?: number;
  currency?: string;
  description?: string;
  eventUrl?: string;
  images?: string[];
  team?: EventTeamMember[];
  comments?: string;
}

export const reportData = {
  brand: "RQI",
  brandFull: "RQI Investors",
  quarter: "Q1 2026",
  title: "Global marketing impact report",
  subtitle: "A quarterly review of global marketing activities and performance.",
  tagline: "Systematic. Scientific. Sustained.",
  dataPeriod: "1st Jan – 31st Mar 2026",
  dataSources: ["Google Analytics", "LinkedIn", "Brightcove", "Mentionlytics", "BrightEdge"],

  globalFocus: [
    {
      number: "01",
      title: "Highlight capabilities and track record",
      description: "Restart and deliver the Morningstar Fund Manager of the Year Award. Global, multi-channel communications to clients & prospects to promote the win.",
    },
    {
      number: "02",
      title: "Build brand presence in Asia and capture market share of voice",
      description: "Asia campaign to support fund launches with major banks. The RQI Asia campaign phase II continued to support fund launches with Hang Seng Bank and DBS Bank in HK.",
    },
    {
      number: "03",
      title: "Crystallise the investment approach and strategies",
      description: "Launched global \"RQI Investors Demystified\" webpages and created short, jargon-free videos to simplify how we explain RQI's strategies and investment approach.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // BENCHMARK SOURCE: Financial_Sector_Marketing_Benchmarks_2026.xlsx
  // KPIs WITH a benchmark → compared vs FS benchmark
  // KPIs WITHOUT a benchmark → compared vs Q4 2025
  // ⚠ FLAG = missing data — do NOT infer or use dummy values
  // ═══════════════════════════════════════════════════════════════════════════
  performanceResults: {
    awareness: [
      // ⚠ FLAG: SEM CTR 3.97% is below FS Search Paid benchmark (5–8%). If this includes display ads, benchmark may differ. No Q4 SEM data available for QoQ comparison.
      { channel: "Search engine marketing", metrics: ["13k Impressions", "3.97% CTR"], comparison: "Below FS benchmark (5–8%)", status: "below" as const },
      // ⚠ FLAG: No SEO keyword/ranking benchmark in benchmark doc. Previous "+21% vs peers" was from BrightEdge competitor data — source unverified against benchmark doc.
      { channel: "Search engine optimisation", metrics: ["142 Keywords ranked", "10th Av ranking"], comparison: "⚠ No industry benchmark", status: "good" as const },
      // ⚠ FLAG: No display impression benchmark available in doc. "Phase II" is a status label, not a comparison.
      { channel: "Display ads (HK)", metrics: ["2M+ Impressions"], comparison: "Phase II", status: "good" as const },
      // FS Paid CTR benchmark: 0.74%. RQI: 0.48% → -35%. FS Paid Engagement benchmark: 1–2%. RQI: 0.46% → below.
      { channel: "LinkedIn Paid", metrics: ["0.46% Engagement", "0.48% CTR"], comparison: "CTR -35% vs FS (0.74%)", status: "below" as const },
    ],
    consideration: [
      // No impression/click benchmark in doc. Compared vs Q4 2025: Impressions 22,517 vs 14,910 = +51%. Clicks 1,594 vs 1,805 = -12%.
      { channel: "LinkedIn Organic", metrics: ["22.5k Impressions", "1,594 Clicks"], comparison: "+51% impressions vs Q4", status: "good" as const },
      { channel: "Website", metrics: ["29.3k Active users", "39.3k Views"], comparison: "+9% views vs Q4", status: "good" as const },
    ],
    conversion: [
      // ⚠ FLAG: FS Webinar benchmark is 33–57% attendance rate, but no RQI webinar attendance data provided.
      { channel: "Webinars", metrics: ["Total views"], comparison: "⚠ No data", status: "inactive" as const },
      { channel: "Events", metrics: ["Distribution feedback"], comparison: "", status: "inactive" as const },
      // FS CTOR benchmark: 13.4%. RQI: 22% → +64%. FS Open Rate benchmark: 27.4%. RQI: 44% → +60%.
      { channel: "Email", metrics: ["22% CTOR", "44% Open rates"], comparison: "+64% CTOR vs FS (13.4%)", status: "good" as const },
    ],
    serviceLoyalty: [
      // ⚠ FLAG: No form completion benchmark in doc. No Q4 2025 data available. Previous comparison was vs Q3 — Q4 data missing.
      { channel: "Data capture", metrics: ["87 Form completions"], comparison: "⚠ No Q4 data", status: "good" as const },
    ],
  },

  searchVisibility: {
    description: "Our global brand visibility is increasing significantly. We are seeing a noticeable improvement to page rankings in Hong Kong and are increasing our share of voice in the UK and Nordics.",
    goal: "See a noticeable improvement to page rankings in Hong Kong, increase our share of voice in the UK and Nordics, and gather benchmark data for Germany.",
    marketingActivities: [
      "Display Ads (HK Brand Campaign)",
      "Sponsored press (HK Brand Campaign)",
      "Organic LinkedIn (HK Brand, FMOTY, Demystified campaigns)",
      "Paid LinkedIn (HK Brand Campaign)",
      "SEM always-on (branded and non-branded)",
    ],
    competitors: [
      "AB Funds (AllianceBernstein HK)",
      "Allianz Global Investors",
      "Arcadian",
      "AQR",
      "BlackRock",
      "Dimensional",
      "FSMOne",
      "Fidelity (HK/SG)",
      "JPMorgan",
      "Plato",
      "Macquarie",
      "Pimco",
      "Schroders",
      "Platinum",
      "Vinva",
    ],
    kpis: [
      // ⚠ FLAG: No keyword count benchmark in doc. Previous "+21% vs competitors" was from BrightEdge — unverified.
      { value: "142", label: "Ranking keywords", comparison: "⚠ No industry benchmark" },
      // ⚠ FLAG: No ranking position benchmark in doc. Previous "+5 higher" was from BrightEdge — unverified.
      { value: "10th", label: "Av brand ranking", comparison: "⚠ No industry benchmark" },
    ],
    chartData: [
      { month: "Mar 24", CIP: 112, Antin: 124, RQI: 23, Stonepeak: 9, Macquarie: 0, Blackstone: 39, Infravia: 91, Vauban: 19, IFM: 176, Ardian: 0, "Global Infra": 445, CVC: 0, DIF: 101, KKR: 12, JPM: 0 },
      { month: "Apr 24", CIP: 143, Antin: 132, RQI: 22, Stonepeak: 9, Macquarie: 0, Blackstone: 37, Infravia: 99, Vauban: 20, IFM: 148, Ardian: 0, "Global Infra": 508, CVC: 0, DIF: 114, KKR: 20, JPM: 0 },
      { month: "May 24", CIP: 153, Antin: 147, RQI: 30, Stonepeak: 9, Macquarie: 0, Blackstone: 40, Infravia: 109, Vauban: 33, IFM: 202, Ardian: 0, "Global Infra": 577, CVC: 0, DIF: 114, KKR: 25, JPM: 0 },
      { month: "Jun 24", CIP: 203, Antin: 163, RQI: 33, Stonepeak: 9, Macquarie: 0, Blackstone: 39, Infravia: 131, Vauban: 27, IFM: 231, Ardian: 0, "Global Infra": 858, CVC: 0, DIF: 111, KKR: 40, JPM: 0 },
      { month: "Jul 24", CIP: 204, Antin: 153, RQI: 38, Stonepeak: 11, Macquarie: 0, Blackstone: 46, Infravia: 131, Vauban: 24, IFM: 233, Ardian: 0, "Global Infra": 1130, CVC: 0, DIF: 125, KKR: 43, JPM: 0 },
      { month: "Aug 24", CIP: 298, Antin: 161, RQI: 42, Stonepeak: 9, Macquarie: 0, Blackstone: 59, Infravia: 127, Vauban: 23, IFM: 266, Ardian: 0, "Global Infra": 905, CVC: 0, DIF: 135, KKR: 50, JPM: 0 },
      { month: "Sep 24", CIP: 345, Antin: 176, RQI: 49, Stonepeak: 8, Macquarie: 0, Blackstone: 47, Infravia: 138, Vauban: 15, IFM: 259, Ardian: 0, "Global Infra": 1065, CVC: 68, DIF: 136, KKR: 52, JPM: 0 },
      { month: "Oct 24", CIP: 333, Antin: 195, RQI: 65, Stonepeak: 11, Macquarie: 0, Blackstone: 57, Infravia: 148, Vauban: 39, IFM: 258, Ardian: 0, "Global Infra": 1048, CVC: 152, DIF: 148, KKR: 57, JPM: 0 },
      { month: "Nov 24", CIP: 301, Antin: 199, RQI: 70, Stonepeak: 11, Macquarie: 0, Blackstone: 51, Infravia: 160, Vauban: 19, IFM: 292, Ardian: 0, "Global Infra": 992, CVC: 169, DIF: 124, KKR: 62, JPM: 0 },
      { month: "Dec 24", CIP: 218, Antin: 199, RQI: 78, Stonepeak: 6, Macquarie: 0, Blackstone: 54, Infravia: 168, Vauban: 34, IFM: 302, Ardian: 0, "Global Infra": 903, CVC: 184, DIF: 108, KKR: 62, JPM: 0 },
      { month: "Jan 25", CIP: 259, Antin: 210, RQI: 90, Stonepeak: 6, Macquarie: 0, Blackstone: 55, Infravia: 166, Vauban: 21, IFM: 268, Ardian: 0, "Global Infra": 1315, CVC: 160, DIF: 102, KKR: 69, JPM: 0 },
      { month: "Feb 25", CIP: 215, Antin: 195, RQI: 99, Stonepeak: 7, Macquarie: 0, Blackstone: 51, Infravia: 161, Vauban: 29, IFM: 277, Ardian: 0, "Global Infra": 1859, CVC: 148, DIF: 100, KKR: 59, JPM: 0 },
      { month: "Mar 25", CIP: 286, Antin: 227, RQI: 142, Stonepeak: 7, Macquarie: 0, Blackstone: 75, Infravia: 160, Vauban: 39, IFM: 376, Ardian: 25, "Global Infra": 2244, CVC: 161, DIF: 109, KKR: 63, JPM: 0 },
    ],
    focusAreas: [
      "Concentrate on visibility in Hong Kong",
      "Capture more search terms around Value Investing",
      "Website architecture and page builds",
      "SEM always-on (branded and non-branded)",
    ],
    nextQuarter: [
      "Capture more share of voice in Hong Kong",
      "Increase share of voice in UK and Nordics",
      "Gather benchmark data for Germany",
    ],
  },

  highlights: {
    asiaCampaign: {
      title: "RQI Asia Campaign Phase II",
      stage: "Awareness",
      subtitle: "More than 2 million impressions across outdoor and digital channels, attracting more than 14,000 website visitors",
      description: "Specifically targeting gatekeepers in the Asian wholesale market, building awareness of the Value Strategy. Messaging focused on systematic approach, turning data into decision making and building resilient portfolios.",
      goals: [
        "Increase brand re-call",
        "Target gatekeepers with key strategy messages",
        "Support and help secure client meetings",
      ],
      formats: ["Tram wraps", "Crossword puzzle game", "Billboard ads", "Sponsored advertorials in HKEJ", "Organic and paid LinkedIn"],
      keyResults: [
        { value: "2M+", label: "Ad impressions", comparison: "Outdoor + Digital" },
        { value: "14k+", label: "Website visitors", comparison: "From campaign" },
      ],
      regions: ["Hong Kong", "Singapore"],
    },
    fundManagerOfYear: {
      title: "Fund Manager of the Year Campaign",
      stage: "Awareness",
      subtitle: "Global, multi-channel communications to clients & prospects to promote the Morningstar win",
      description: "Global, multi-channel communications to clients & prospects to promote the Morningstar Fund Manager of the Year Award win. Focused on strengthening positioning in the Aus and NZ market and demonstrating team experience and capabilities.",
      goals: [
        "Strengthen positioning in Aus and NZ market",
        "Demonstrate team's experience and capabilities through Insights and Research",
      ],
      formats: [
        "Client emails, website updates and email signatures",
        "\"Far from normal\" insight piece & AI-generated \"listen now\" version",
        "Quarterly Global Value fund flyer (Asia only)",
        "Andrew Francis Profile in Australian Financial Standard",
        "Corporate Culture paper in Journal of Portfolio Management",
        "Always on SEM",
      ],
      keyResults: [
        { value: "3k+", label: "LinkedIn impressions", comparison: "Morningstar post" },
        { value: "115", label: "Post engagement", comparison: "Highest Q1 post" },
      ],
      keyAssets: [
        { title: "Why quantitative investing is this year's black", url: "https://ausbiz.com.au/media/why-quantitative-investing-is-this-years-black?videoId=47070" },
        { title: "Is a new quant winter coming?", url: "" },
        { title: "Insights from top female investors in Australia", url: "" },
      ],
      regions: ["Global ex-Germany"],
    },
    demystified: {
      title: "RQI Demystified Campaign",
      stage: "Awareness",
      subtitle: "Short, jargon-free videos explaining strategies, investment approach and why clients choose to invest with RQI",
      description: "This series of short, jargon-free videos explain: the strategies, investment approach, their use in portfolios and why clients choose to invest with RQI Investors. We will report on full data in Q2.",
      goals: [
        "Simplify terminology on RQI's products, processes and investment style",
        "Support client conversations",
        "Track and share usage data",
      ],
      formats: ["2 x bespoke landing pages", "5 x new videos", "Organic LinkedIn posts", "Paid LinkedIn posts"],
      keyResults: [
        { value: "5", label: "Videos released", comparison: "New content" },
        { value: "2", label: "Landing pages", comparison: "Bespoke" },
      ],
      regions: ["Global English speaking audiences"],
    },
  },

  website: {
    title: "Always on: Website",
    stage: "Consideration",
    subtitle: "New website starts to take shape",
    description: "We are well into the development phase of the new website, working closely with the IR team to bring their vision to life. 1 x new thought leadership published this quarter.",
    kpis: [
      { value: "29.3k", label: "Active users", comparison: "+3.7% vs Q4 2025" },
      { value: "39.3k", label: "Page views", comparison: "+9.0% vs Q4 2025" },
      // ⚠ FLAG: No Q4 2025 baseline available for total events
      { value: "150k", label: "Total events", comparison: "⚠ No Q4 data" },
      // ⚠ FLAG: No Q4 2025 baseline available for key events
      { value: "29", label: "Key events", comparison: "⚠ No Q4 data" },
    ],
    goals: [
      "Create a platform for RQI content to stand alone with its own identity",
      "Gather more accurate marketing data on user behaviour and campaign performance",
    ],
    gaMonthly: [
      { month: "Oct 25", users: 18839, sessions: 23568, pageViews: 23568, bounceRate: 0, avgDuration: 0 },
      { month: "Nov 25", users: 4951, sessions: 6656, pageViews: 6656, bounceRate: 0, avgDuration: 0 },
      { month: "Dec 25", users: 4482, sessions: 5794, pageViews: 5794, bounceRate: 0, avgDuration: 0 },
      { month: "Jan 26", users: 19137, sessions: 25529, pageViews: 25529, bounceRate: 0, avgDuration: 0 },
      { month: "Feb 26", users: 5013, sessions: 6552, pageViews: 6552, bounceRate: 0, avgDuration: 0 },
      { month: "Mar 26", users: 5165, sessions: 7172, pageViews: 7172, bounceRate: 0, avgDuration: 0 },
    ],
    topPages: [
      { page: "/hk/zh/.../rqi-investors", views: 13980, change: "+695%" },
      { page: "/au/.../rqi-investors", views: 8697, change: "~0%" },
      { page: "/hk/en/.../rqi-investors", views: 7716, change: "+640%" },
      { page: "/au/.../institutional", views: 664, change: "+80%" },
      { page: "/au/.../individual", views: 603, change: "+16%" },
      { page: "/au/.../team-members", views: 574, change: "+22%" },
      { page: "/sg/.../rqi-investors", views: 468, change: "-97%" },
    ],
    trafficSources: [
      { source: "Paid / Display", percentage: 57 },
      { source: "Direct", percentage: 23 },
      { source: "Organic Search", percentage: 12 },
      { source: "Referral", percentage: 5 },
      { source: "Social", percentage: 1 },
      { source: "Other", percentage: 2 },
    ],
    focusQ4: [
      "Start the build and development of a dedicated website",
    ],
    focusQ1: [
      "Approve and finalise all English content by April",
      "Deliver end of June for English sites",
      "Reactivate the RQI pages for German web traffic",
    ],
  },

  linkedin: {
    title: "Always on: LinkedIn",
    stage: "Consideration",
    subtitle: "Paid activity will be focused in H2 to support of the new website and David Walsh's visit",
    description: "Q1 saw a strong start to the year for organic LinkedIn. The Fund Manager of the Year announcement and Asia Campaign drove significant engagement. Paid activity was deliberately minimal in Q1 and will ramp up in H2.",
    goals: ["BAU – deliberate"],
    activities: [
      "Fund Manager of the Year posts",
      "Asia Campaign content",
      "Team announcements",
      "Insight pieces & podcast",
      "RQI Demystified launch",
    ],
    kpis: [
      // No impression benchmark in doc. Q4 organic: 14,910. Q1: 22,517 → +51%.
      { value: "22.5k", label: "Organic impressions", comparison: "+51% vs Q4" },
      // Q4 clicks: 1,805. Q1: 1,594 → -12%.
      { value: "1,594", label: "Clicks", comparison: "-12% vs Q4" },
      // Q4 reactions: 255. Q1: 541 → +112%.
      { value: "541", label: "Reactions", comparison: "+112% vs Q4" },
    ],
    focusQ4: [
      "Morningstar FMOTY global comms",
      "Asia Campaign Phase II support",
      "RQI Demystified launch content",
    ],
    focusQ1: [
      "Plan H2 paid activity around new website launch",
      "Support David Walsh's visit with targeted content",
    ],
    topPosts: [
      { title: "Welcome new team members", date: "Jan 20", impressions: 3362, clicks: 349, engagement: 12.8 },
      { title: "Hong Kong tram campaign", date: "Jan 15", impressions: 3875, clicks: 305, engagement: 11.4 },
      { title: "Morningstar Fund Manager of the Year", date: "Mar 05", impressions: 2668, clicks: 198, engagement: 11.5 },
      { title: "International Women's Day – Joanna Nash", date: "Mar 11", impressions: 3000, clicks: 191, engagement: 9.1 },
      { title: "Is a new quant winter coming?", date: "Mar 19", impressions: 1505, clicks: 58, engagement: 7.7 },
      { title: "Andrew Francis – Financial Standard", date: "Mar 26", impressions: 1859, clicks: 85, engagement: 7.7 },
    ],
  },

  email: {
    kpis: [
      // FS CTOR benchmark: 13.4%. RQI: 22% → +64%.
      { value: "22%", label: "CTOR", comparison: "+64% vs FS benchmark (13.4%)" },
      // FS Open Rate benchmark: 27.4%. RQI: 44% → +60%.
      { value: "44%", label: "Open rates", comparison: "+60% vs FS benchmark (27.4%)" },
    ],
  },

  events: {
    title: "Events & Sponsorships 2026",
    stage: "Conversion",
    list: [
      // ─── Q1 2026 ───
      { name: "Client & Partner Networking Event", format: "Drinks", audience: "Institutional", region: "ASIA", quarter: "Q1", status: "committed" as const, category: "Networking", city: "Tokyo", lat: 35.6762, lng: 139.6503, startDate: "2026-01-21", brand: "RQI" },
      { name: "APIF Partnership Launch Roundtables", format: "Luncheon", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "proposed" as const, category: "Luncheon", city: "TBC", lat: -33.8688, lng: 151.2093, startDate: "2026-02-01", brand: "RQI", hasSpeakingSlot: true, assetClass: "APIF", marketingLead: "Phoebe Reardon", distributionLead: "Nick", sponsorshipCost: 2500, currency: "AUD" },
      { name: "Infralogic Investor Forum", format: "Conference", audience: "Institutional", region: "ANZ", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-03-03", brand: "RQI", host: "ION Analytics", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", sponsorshipCost: 32000, currency: "AUD" },
      { name: "Private Wealth Investment Leaders Forum", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-03-13", brand: "RQI", host: "GII", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", sponsorshipCost: 40000, currency: "AUD" },
      { name: "Entireti Alliances Conference", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "distribution-owned" as const, category: "Conference", city: "Queenstown", lat: -45.0312, lng: 168.6626, startDate: "2026-03-15", endDate: "2026-03-17", brand: "RQI", host: "Entireti", hasSpeakingSlot: true, speaker: "Marc B", assetClass: "AEQ, RQI, SMIDS", marketingLead: "Josie Haynes", distributionLead: "Emerson", sponsorshipCost: 1500, currency: "AUD" },
      { name: "Centrepoint Alliances Conference", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "distribution-owned" as const, category: "Conference", city: "Christchurch", lat: -43.5321, lng: 172.6362, startDate: "2026-03-18", brand: "RQI", host: "Centerpoint", hasSpeakingSlot: true, distributionLead: "Quin", sponsorshipCost: 1500, currency: "AUD" },
      { name: "Infrastructure Investor Global Summit", format: "Conference", audience: "Institutional", region: "CE", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Berlin", lat: 52.52, lng: 13.405, startDate: "2026-03-24", endDate: "2026-03-27", brand: "RQI", host: "Infrastructure Investor", hasSpeakingSlot: true, speaker: "Carolyn, Hamish, Gregor", marketingLead: "Mandy Ashmore", distributionLead: "Pete Swan / Sasha Beisheim" },
      { name: "Asian Private Banker DPM Leaders Conversation", format: "Roundtable", audience: "Wholesale", region: "ASIA", quarter: "Q1", status: "committed" as const, category: "Roundtable", city: "Hong Kong", lat: 22.3193, lng: 114.1694, startDate: "2026-02-15", brand: "RQI", speaker: "Joanna Nash" },

      // ─── Q2 2026 ───
      { name: "P&I Private Markets", format: "Conference", audience: "Institutional", region: "NA", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Chicago", lat: 41.8781, lng: -87.6298, startDate: "2026-04-21", endDate: "2026-04-22", brand: "RQI", host: "Pensions & Investments", hasSpeakingSlot: true, speaker: "Michael Ryder (tbc)", marketingLead: "Sophie Haynes", distributionLead: "Elizabeth Altman", sponsorshipCost: 30000, currency: "USD" },
      { name: "Morningstar Investment Conference", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-05-19", endDate: "2026-05-20", brand: "RQI", host: "Morningstar", hasSpeakingSlot: true, assetClass: "RQI", marketingLead: "Karyn Arthur", distributionLead: "Brodie Paape", sponsorshipCost: 20500, currency: "AUD" },

      // ─── Q3 2026 ───
      { name: "Inside Network Alternatives Symposium", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Conference", city: "Brisbane", lat: -27.4698, lng: 153.0251, startDate: "2026-07-23", endDate: "2026-07-24", brand: "RQI", host: "Inside Network", hasSpeakingSlot: true, assetClass: "APIF", marketingLead: "Phoebe Reardon", sponsorshipCost: 30000, currency: "AUD" },
    ] as EventItem[],
  },
};
