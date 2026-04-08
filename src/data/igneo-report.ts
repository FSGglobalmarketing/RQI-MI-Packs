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
      // ⚠ FLAG: Still waiting for Search and SEM data from Agency. No Q4 baseline available.
      { channel: "Search engine marketing", metrics: ["⚠ Awaiting data"], comparison: "⚠ Awaiting agency data", status: "inactive" as const },
      // ⚠ FLAG: Still waiting for Search and SEM data from Agency. No Q4 baseline available.
      { channel: "Search engine optimisation", metrics: ["⚠ Awaiting data"], comparison: "⚠ Awaiting agency data", status: "inactive" as const },
      // ⚠ FLAG: No display impression benchmark available in doc. "Phase II" is a status label, not a comparison.
      { channel: "Display ads (HK)", metrics: ["2M+ Impressions"], comparison: "Phase II", status: "good" as const },
      // FS Paid CTR benchmark: 0.74%. RQI: 0.48% → -35%. FS Paid Engagement benchmark: 1–2%. RQI: 0.46% → below.
      { channel: "LinkedIn Paid", metrics: ["0.46% Engagement", "0.48% CTR"], comparison: "CTR -35% vs FS (0.74%)", status: "below" as const },
    ],
    consideration: [
      // No impression/click benchmark in doc. Compared vs Q4 2025: Impressions 22,517 vs 14,910 = +51%. Clicks 1,594 vs 1,805 = -12%. CTR = 1,594/22,517 = 7.08%. FS Organic CTR benchmark: 2.58%. → +174%.
      { channel: "LinkedIn Organic", metrics: ["22.5k Impressions", "7.08% CTR"], comparison: "+174% CTR vs FS (2.58%)", status: "good" as const },
      { channel: "Website", metrics: ["29.3k Active users", "39.3k Views"], comparison: "+9% views vs Q4", status: "good" as const },
    ],
    conversion: [
      // No webinars run in Q1 or Q4
      { channel: "Webinars", metrics: ["No webinars in Q1 or Q4"], comparison: "Not activated", status: "inactive" as const },
      { channel: "Events", metrics: ["Distribution feedback"], comparison: "", status: "inactive" as const },
      // FS CTOR benchmark: 13.4%. RQI: 22% → +64%. FS Open Rate benchmark: 27.4%. RQI: 44% → +60%.
      { channel: "Email", metrics: ["22% CTOR", "44% Open rates"], comparison: "+64% CTOR vs FS (13.4%)", status: "good" as const },
    ],
    serviceLoyalty: [
      // Q4 2025: 0 form submissions. Q1: 87. No QoQ % calc (division by zero). Absolute change: +87.
      { channel: "Data capture", metrics: ["87 Form completions"], comparison: "+87 vs Q4 (0)", status: "good" as const },
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
    focusQ1: [
      "Concentrate on visibility in Hong Kong",
      "Capture more search terms around value investing",
    ],
    focusQ2: [
      "Gather and analyse search data in Germany",
      "Fine-tune our always-on search engine advertising programme in Australia",
    ],
  },

  highlights: {
    asiaCampaign: {
      title: "RQI Asia Campaign Phase II",
      stage: "Awareness",
      subtitle: "Delivering over 2 million impressions across outdoor and digital channels, attracting more than 14,000 website visitors",
      description: "Phase II focused on driving awareness of the RQI brand and the Value Strategy, specifically targeting gatekeepers in the Asian wholesale market. Campaign messaging focused on systematic approach, how data-driven alpha model and AI capabilities enhance the risk-return profiles.",
      goals: [
        "Continue building brand awareness and increasing brand recall",
        "Educate the market on quantitative equities, as well as RQI Investors' proposition and investment philosophy",
        "Target gatekeepers with key strategy messages",
      ],
      formats: [
        "Full tram wraps (Hong Kong)",
        "Sponsored advertorials (Chinese only) in HKET and iMoney",
        "Location-targeted programmatic ads (DBS & Hang Seng branches)",
        "Banner ads on financial websites",
        "Always-on SEM",
      ],
      keyResults: [
        { value: "2M+", label: "Ad impressions", comparison: "Outdoor + Digital" },
        { value: "14k+", label: "Website visitors", comparison: "From campaign" },
      ],
      regions: ["Hong Kong", "Singapore"],
      mediaTabs: ["Out of Home", "Advertorial", "Native", "LinkedIn"],
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
    asiaCampaignPhaseIII: {
      title: "RQI Asia Campaign Phase III",
      stage: "Awareness",
      subtitle: "Sustaining momentum and strengthening RQI's brand visibility across Asia through an integrated multi-channel approach",
      description: "Building on the foundation established in Phases I and II, we have incorporated bus-wrap advertising to reinforce brand recall and core messaging in Hong Kong. This phase is complemented by advertorial content, targeted social media advertising, and continued digital engagement to ensure consistent messaging across touchpoints.",
      goals: [
        "Continue building brand awareness and increasing brand recall",
        "Maintain mindshare with the intermediaries",
        "Drive consideration and conversion",
      ],
      formats: [
        "Sponsored event (APB DPM Leaders Conversation)",
        "Sponsored advertorials in HKEJ",
        "Targeted LinkedIn ads",
        "Bus advertising (30 buses) + bus shelters in HK",
        "Always-on SEM",
      ],
      keyResults: [
        { value: "117+", label: "Gatekeepers reached", comparison: "APB DPM event" },
        { value: "61", label: "Companies represented", comparison: "At sponsored event" },
        { value: "30", label: "Bus wraps", comparison: "Hong Kong outdoor" },
      ],
      regions: ["Hong Kong", "Singapore"],
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
      // Q4: 136,729. Q1: 150,354 → +10.0%
      { value: "150k", label: "Total events", comparison: "+10.0% vs Q4" },
      // Q4: 75. Q1: 29 → -61.3%. Significant drop.
      { value: "29", label: "Key events", comparison: "-61.3% vs Q4 (75)", status: "below" },
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
      { page: "HK Retail (Chinese)", views: 13980, q4Views: 1759, change: "+695%" },
      { page: "AU Adviser", views: 8696, q4Views: 8733, change: "~0%" },
      { page: "HK Retail (English)", views: 7715, q4Views: 1042, change: "+640%" },
      { page: "AU Institutional", views: 664, q4Views: 369, change: "+80%" },
      { page: "AU Individual", views: 603, q4Views: 522, change: "+16%" },
      { page: "AU Team Members", views: 573, q4Views: 470, change: "+22%" },
      { page: "SG Retail", views: 468, q4Views: 17552, change: "-97%" },
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
      { title: "Welcome new team members", date: "Jan 20", impressions: 3362, clicks: 349, engagement: 12.8, category: "Insights" as const },
      { title: "Hong Kong tram campaign", date: "Jan 15", impressions: 3875, clicks: 305, engagement: 11.4, category: "Events" as const },
      { title: "Morningstar Fund Manager of the Year", date: "Mar 05", impressions: 2668, clicks: 198, engagement: 11.5, category: "Strategy" as const },
      { title: "International Women's Day – Joanna Nash", date: "Mar 11", impressions: 3000, clicks: 191, engagement: 9.1, category: "Insights" as const },
      { title: "Is a new quant winter coming?", date: "Mar 19", impressions: 1505, clicks: 58, engagement: 7.7, category: "Strategy" as const },
      { title: "Andrew Francis – Financial Standard", date: "Mar 26", impressions: 1859, clicks: 85, engagement: 7.7, category: "Insights" as const },
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
      { name: "APB DPM HK", format: "Conference", audience: "Wholesale", region: "ASIA", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Hong Kong", lat: 22.3193, lng: 114.1694, startDate: "2026-03-24", brand: "RQI", host: "APB", assetClass: "Global Value", marketingLead: "Judi Chung", distributionLead: "Nelson Ng" },
      { name: "IPP/RQI client event", format: "Client event", audience: "Wholesale", region: "ASIA", quarter: "Q1", status: "distribution-owned" as const, category: "Client event", city: "Hong Kong", lat: 22.3193, lng: 114.1694, startDate: "2026-03-26", brand: "RQI", host: "IPP", assetClass: "Global Value", marketingLead: "Judi Chung", distributionLead: "Nelson Ng" },

      // ─── Q2 2026 ───
      { name: "Hang Seng Bank", format: "Client event", audience: "Wholesale", region: "ASIA", quarter: "Q2", status: "distribution-owned" as const, category: "Client event", city: "Hong Kong", lat: 22.3193, lng: 114.1694, startDate: "2026-05-04", brand: "RQI", host: "Hang Seng", assetClass: "Global Value", marketingLead: "Judi Chung", distributionLead: "Nelson Ng" },
      { name: "Citywire Bangkok Retreat", format: "Conference", audience: "Wholesale", region: "ASIA", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Thailand", lat: 13.7563, lng: 100.5018, startDate: "2026-05-14", endDate: "2026-05-15", brand: "RQI", marketingLead: "Edward Tang", distributionLead: "Danielle Chua" },
      { name: "Taiwan launch event", format: "Roundtable Lunch", audience: "Wholesale", region: "ASIA", quarter: "Q2", status: "proposed" as const, category: "Roundtable", city: "Taiwan", lat: 25.033, lng: 121.5654, startDate: "2026-05-15", brand: "RQI", marketingLead: "Edward Tang", distributionLead: "Nelson Ng" },
      { name: "London Value Investor Conference", format: "Conference", audience: "Wholesale", region: "UKW", quarter: "Q2", status: "proposed" as const, category: "Conference", city: "London", lat: 51.5074, lng: -0.1278, startDate: "2026-06-24", brand: "RQI", host: "LVIC", speaker: "David Walsh", hasSpeakingSlot: true, marketingLead: "Ally Dow", distributionLead: "John Bennett", assetClass: "Value", sponsorshipCost: 24000, currency: "GBP" },

      // ─── Q3 2026 ───
      { name: "HSBC MY launch event", format: "Roundtable", audience: "Wholesale", region: "ASIA", quarter: "Q3", status: "proposed" as const, category: "Roundtable", city: "Malaysia", lat: 3.139, lng: 101.6869, startDate: "2026-07-01", brand: "RQI", marketingLead: "Edward Tang", distributionLead: "Lisa Lim" },
      { name: "RQI Roadshow – WS Sydney", format: "Roadshow Luncheon", audience: "Wholesale", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Roadshow", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-08-05", brand: "RQI", host: "RQI", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", assetClass: "Value" },
      { name: "RQI Roadshow – Insto Sydney", format: "Roadshow Luncheon", audience: "Institutional", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Roadshow", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-08-06", brand: "RQI", host: "RQI", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", assetClass: "Value" },
      { name: "RQI Roadshow – Insto Melbourne", format: "Roadshow Luncheon", audience: "Institutional", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Roadshow", city: "Melbourne", lat: -37.8136, lng: 144.9631, startDate: "2026-08-12", brand: "RQI", host: "RQI", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", assetClass: "Value" },
      { name: "RQI Roadshow – WS Melbourne", format: "Roadshow Luncheon", audience: "Wholesale", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Roadshow", city: "Melbourne", lat: -37.8136, lng: 144.9631, startDate: "2026-08-13", brand: "RQI", host: "RQI", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", assetClass: "Value" },
      { name: "RQI Roadshow – WS Brisbane", format: "Roadshow Luncheon", audience: "Wholesale", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Roadshow", city: "Brisbane", lat: -27.4698, lng: 153.0251, startDate: "2026-08-19", brand: "RQI", host: "RQI", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", assetClass: "Value" },
      { name: "RQI Roadshow – WS Adelaide", format: "Roadshow Luncheon", audience: "Wholesale", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Roadshow", city: "Adelaide", lat: -34.9285, lng: 138.6007, startDate: "2026-08-25", brand: "RQI", host: "RQI", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", assetClass: "Value" },
      { name: "RQI Roadshow – WS Perth", format: "Roadshow Luncheon", audience: "Wholesale", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Roadshow", city: "Perth", lat: -31.9505, lng: 115.8605, startDate: "2026-08-27", brand: "RQI", host: "RQI", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", assetClass: "Value" },

      // ─── Q4 2026 ───
      { name: "Client forum HK", format: "Forum", audience: "Wholesale", region: "ASIA", quarter: "Q4", status: "proprietary" as const, category: "Forum", city: "Hong Kong", lat: 22.3193, lng: 114.1694, startDate: "2026-10-01", brand: "RQI", marketingLead: "Edward Tang", distributionLead: "Christy Goh" },
      { name: "Client forum SG", format: "Forum", audience: "Wholesale", region: "ASIA", quarter: "Q4", status: "proprietary" as const, category: "Forum", city: "Singapore", lat: 1.3521, lng: 103.8198, startDate: "2026-10-01", brand: "RQI", marketingLead: "Edward Tang", distributionLead: "Christy Goh" },
      { name: "CFA Conference", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q4", status: "committed" as const, category: "Conference", city: "Melbourne", lat: -37.8136, lng: 144.9631, startDate: "2026-10-29", brand: "RQI", host: "RQI", marketingLead: "Phoebe Reardon" },
    ] as EventItem[],
  },
};
