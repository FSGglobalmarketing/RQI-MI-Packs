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
  dataPeriod: "1st Oct – 31st Dec 2025",
  dataSources: ["Salesforce", "Google Analytics", "LinkedIn", "Apple Music", "Spotify", "Brightedge"],

  globalFocus: [
    {
      number: "01",
      title: "Complete phase I & prep for phase II of the North American Campaign",
      description: "As we wrapped up the Brand Awareness Campaign in Q4, we are focused on collecting the data, making recommendations and building them into phase II of the campaign starting in 2026.",
    },
    {
      number: "02",
      title: "Complete our test-and-learn activities in UK, Nordics and DACH",
      description: "Our UK and Nordic campaign wrapped up, as did our first ever DACH-specific ad campaign. We tested new innovations and are pleased with the results.",
    },
    {
      number: "03",
      title: "Capture more \"share of voice\" globally",
      description: "A large focus of these campaigns was to increase the number of searches our brand and content appear on. This will be vital for us as technology continues to shift towards AI.",
    },
  ],

  performanceResults: {
    awareness: [
      { channel: "Search engine marketing", metrics: ["13k Impressions", "3.97% CTR"], comparison: "+166% vs industry", status: "good" as const },
      { channel: "Search engine optimisation", metrics: ["142 Keywords ranked", "10th Av ranking"], comparison: "+21% vs peers", status: "good" as const },
      { channel: "Display ads", metrics: ["0.04% CTR"], comparison: "-5% vs industry", status: "below" as const },
      { channel: "Podcast", metrics: ["305 Streams"], comparison: "-13% vs Q3", status: "below" as const },
      { channel: "LinkedIn Paid", metrics: ["0.46% Engagement", "0.48% CTR"], comparison: "+15% vs industry", status: "good" as const },
    ],
    consideration: [
      { channel: "LinkedIn Organic", metrics: ["0.7% Engagement rate", "180k Impressions"], comparison: "+36% vs peers", status: "good" as const },
      { channel: "Website", metrics: ["20k Active users", "1.3min Dwell time"], comparison: "+23% vs Q3", status: "good" as const },
    ],
    conversion: [
      { channel: "Webinars", metrics: ["Total views"], comparison: "", status: "inactive" as const },
      { channel: "Events", metrics: ["Distribution feedback"], comparison: "", status: "inactive" as const },
      { channel: "Email", metrics: ["22% CTOR", "44% Open rates"], comparison: "+80% vs industry", status: "good" as const },
    ],
    serviceLoyalty: [
      { channel: "Data capture", metrics: ["87 Form completions"], comparison: "+14% vs Q3", status: "good" as const },
    ],
  },

  searchVisibility: {
    description: "Our global brand visibility is increasing significantly. In the US we increased our visibility by 30% and now appear for 7 new search terms including \"mid market infrastructure\", \"Patriot Rail Ownership\", \"mid-market infrastructure investment opportunities\" and more.",
    goal: "Place the Igneo website at the top of Google search results for Infrastructure Investing terms e.g. \"top infrastructure asset managers\".",
    marketingActivities: [
      "North American campaign",
      "Nordics and UK paid social campaign",
      "DACH paid social campaign",
      "Website enhancements planning",
    ],
    kpis: [
      { value: "142", label: "Ranking keywords", comparison: "+21% more than competitors" },
      { value: "10th", label: "Av brand ranking", comparison: "+5 higher than competitors" },
    ],
    chartData: [
      { month: "Mar 24", CIP: 112, Antin: 124, Igneo: 23, Stonepeak: 9, Macquarie: 0, Blackstone: 39, Infravia: 91, Vauban: 19, IFM: 176, Ardian: 0, "Global Infra": 445, CVC: 0, DIF: 101, KKR: 12, JPM: 0 },
      { month: "Apr 24", CIP: 143, Antin: 132, Igneo: 22, Stonepeak: 9, Macquarie: 0, Blackstone: 37, Infravia: 99, Vauban: 20, IFM: 148, Ardian: 0, "Global Infra": 508, CVC: 0, DIF: 114, KKR: 20, JPM: 0 },
      { month: "May 24", CIP: 153, Antin: 147, Igneo: 30, Stonepeak: 9, Macquarie: 0, Blackstone: 40, Infravia: 109, Vauban: 33, IFM: 202, Ardian: 0, "Global Infra": 577, CVC: 0, DIF: 114, KKR: 25, JPM: 0 },
      { month: "Jun 24", CIP: 203, Antin: 163, Igneo: 33, Stonepeak: 9, Macquarie: 0, Blackstone: 39, Infravia: 131, Vauban: 27, IFM: 231, Ardian: 0, "Global Infra": 858, CVC: 0, DIF: 111, KKR: 40, JPM: 0 },
      { month: "Jul 24", CIP: 204, Antin: 153, Igneo: 38, Stonepeak: 11, Macquarie: 0, Blackstone: 46, Infravia: 131, Vauban: 24, IFM: 233, Ardian: 0, "Global Infra": 1130, CVC: 0, DIF: 125, KKR: 43, JPM: 0 },
      { month: "Aug 24", CIP: 298, Antin: 161, Igneo: 42, Stonepeak: 9, Macquarie: 0, Blackstone: 59, Infravia: 127, Vauban: 23, IFM: 266, Ardian: 0, "Global Infra": 905, CVC: 0, DIF: 135, KKR: 50, JPM: 0 },
      { month: "Sep 24", CIP: 345, Antin: 176, Igneo: 49, Stonepeak: 8, Macquarie: 0, Blackstone: 47, Infravia: 138, Vauban: 15, IFM: 259, Ardian: 0, "Global Infra": 1065, CVC: 68, DIF: 136, KKR: 52, JPM: 0 },
      { month: "Oct 24", CIP: 333, Antin: 195, Igneo: 65, Stonepeak: 11, Macquarie: 0, Blackstone: 57, Infravia: 148, Vauban: 39, IFM: 258, Ardian: 0, "Global Infra": 1048, CVC: 152, DIF: 148, KKR: 57, JPM: 0 },
      { month: "Nov 24", CIP: 301, Antin: 199, Igneo: 70, Stonepeak: 11, Macquarie: 0, Blackstone: 51, Infravia: 160, Vauban: 19, IFM: 292, Ardian: 0, "Global Infra": 992, CVC: 169, DIF: 124, KKR: 62, JPM: 0 },
      { month: "Dec 24", CIP: 218, Antin: 199, Igneo: 78, Stonepeak: 6, Macquarie: 0, Blackstone: 54, Infravia: 168, Vauban: 34, IFM: 302, Ardian: 0, "Global Infra": 903, CVC: 184, DIF: 108, KKR: 62, JPM: 0 },
      { month: "Jan 25", CIP: 259, Antin: 210, Igneo: 90, Stonepeak: 6, Macquarie: 0, Blackstone: 55, Infravia: 166, Vauban: 21, IFM: 268, Ardian: 0, "Global Infra": 1315, CVC: 160, DIF: 102, KKR: 69, JPM: 0 },
      { month: "Feb 25", CIP: 215, Antin: 195, Igneo: 99, Stonepeak: 7, Macquarie: 0, Blackstone: 51, Infravia: 161, Vauban: 29, IFM: 277, Ardian: 0, "Global Infra": 1859, CVC: 148, DIF: 100, KKR: 59, JPM: 0 },
      { month: "Mar 25", CIP: 286, Antin: 227, Igneo: 142, Stonepeak: 7, Macquarie: 0, Blackstone: 75, Infravia: 160, Vauban: 39, IFM: 376, Ardian: 25, "Global Infra": 2244, CVC: 161, DIF: 109, KKR: 63, JPM: 0 },
    ],
    focusAreas: [
      "Concentrate on visibility in the US",
      "Capture more search terms around \"Mid-Market\"",
      "Website architecture and page builds",
      "Launch the Nordic/DACH campaign on LinkedIn",
    ],
    nextQuarter: [
      "Capture more share of voice in North America",
      "Capture more share of voice in DACH & Nordics",
    ],
  },

  campaigns: {
    northAmerica: {
      title: "North America Campaign",
      stage: "Awareness",
      subtitle: "Strong performance across sponsored and programmatic activities",
      description: "This campaign successfully built on the momentum from last year, incorporating key learnings from 2024 to optimise performance. We introduced new assets, including video and written content, alongside fresh ad channels, creatives, and messaging.",
      goals: [
        "Promote the Igneo brand to a wide institutional audience through key media titles and partners.",
        "Position Igneo as thought leaders through content partnerships and adverts.",
        "Drive engagement from a much more targeted audience in search and social advertising.",
      ],
      formats: ["Sponsored content and solus emails", "LinkedIn ads", "2 x search engine ads", "1.2mil Ad impressions"],
      keyResults: [
        { value: "16,219", label: "Website views", comparison: "+36% vs pre-campaign" },
        { value: "8.37%", label: "Search rankings", comparison: "+85% vs 2024" },
      ],
      searchAppearances: { value: "389", label: "Search appearances per month", comparison: "+28% vs pre-campaign" },
      pageRankKPIs: [
        { value: "6", label: "Page 1 ranks", comparison: "+500% vs pre-campaign" },
        { value: "134", label: "Page 1-3 ranks", comparison: "+36% vs pre-campaign" },
      ],
      chartData: [
        { month: "Jan", page1: 30, page2: 40, page3: 35, page4: 50 },
        { month: "Feb", page1: 35, page2: 45, page3: 38, page4: 55 },
        { month: "Mar", page1: 40, page2: 50, page3: 40, page4: 60 },
        { month: "Apr", page1: 45, page2: 55, page3: 42, page4: 80 },
        { month: "May", page1: 50, page2: 58, page3: 40, page4: 100 },
        { month: "Jun", page1: 55, page2: 60, page3: 38, page4: 160 },
        { month: "Jul", page1: 70, page2: 55, page3: 40, page4: 180 },
        { month: "Aug", page1: 80, page2: 50, page3: 42, page4: 170 },
        { month: "Sep", page1: 90, page2: 48, page3: 40, page4: 150 },
        { month: "Oct", page1: 100, page2: 45, page3: 38, page4: 140 },
        { month: "Nov", page1: 110, page2: 42, page3: 36, page4: 130 },
        { month: "Dec", page1: 135, page2: 40, page3: 35, page4: 120 },
      ],
    },
    dach: {
      title: "DACH Targeted Social Campaign",
      stage: "Awareness",
      subtitle: "Targeted and localised messaging helped increase visits to Igneo's German website by a third",
      description: "Our first dedicated German LinkedIn campaign has surpassed our expectations for audience engagement. Despite a much more targeted approach, and the time-of-year, we are optimistic about activating more campaigns in 2026.",
      goals: ["Promote brand positioning in Germany", "Drive traffic to German website"],
      formats: ["4 x LinkedIn Ads", "287,683 Ad impressions"],
      keyResults: [
        { value: "3,718", label: "Website visits", comparison: "+33% vs pre-campaign" },
        { value: "1.34%", label: "Engagement rate", comparison: "+15% vs industry" },
        { value: "1.29%", label: "Av CTR", comparison: "+29% vs industry" },
      ],
      audienceData: {
        countries: [
          { name: "Germany", percentage: 66 },
          { name: "Switzerland", percentage: 29 },
          { name: "France", percentage: 3 },
          { name: "Other", percentage: 2 },
        ],
        topCompanies: [
          { company: "Mercedes-Benz AG", sector: "Manufacturing", views: 4143 },
          { company: "Volkswagen", sector: "Manufacturing", views: 2110 },
          { company: "Allianz", sector: "Finance", views: 1556 },
          { company: "Porsche AG", sector: "Manufacturing", views: 1376 },
          { company: "Sparkasse", sector: "Finance", views: 955 },
        ],
      },
    },
    ukNordics: {
      title: "UK & Nordics Campaign",
      stage: "Awareness",
      subtitle: "Encouraging performance with clear signal that users are more engaged with video capabilities",
      description: "We were very pleased with the results. The data shows that with the same spend, users interacted with our video content 23% more than static ads. In both formats users were 16% more likely to click if the copy contained \"European Infrastructure\".",
      goals: ["Promote brand positioning in UK, Nordics", "Drive traffic to European assets on the website"],
      formats: ["4 x LinkedIn Ads", "215,229 Ad impressions"],
      keyResults: [
        { value: "9,274", label: "Clicks to website", comparison: "+15% vs pre-campaign" },
        { value: "4.31%", label: "Av CTR", comparison: "+85% vs industry" },
      ],
      keyLearnings: [
        "Video ads were more than 20% more clicked than static ads.",
        "CTR was 16% higher when \"European Infrastructure\" was included in the ad.",
        "Recommend carousel format in Q1 to gather learnings.",
      ],
      adPerformance: [
        { name: "Explore Igneo's European capabilities", type: "Static", impressions: 55000, clicks: 2100, ctr: 3.8 },
        { name: "Middle-market. Maximum impact.", type: "Static", impressions: 50000, clicks: 1800, ctr: 3.6 },
        { name: "Investing in European Infrastructure", type: "Video", impressions: 60000, clicks: 3200, ctr: 5.3 },
        { name: "Middle-market. Maximum impact. (Video)", type: "Video", impressions: 50229, clicks: 2174, ctr: 4.3 },
      ],
    },
  },

  website: {
    title: "Always on: Website",
    stage: "Consideration",
    subtitle: "Website users and time spent increased compared to last quarter",
    description: "It's been another strong quarter for the performance of the website. We now need to focus on increasing the visibility of dynamic content, such as the news and insights, by changing page architecture.",
    kpis: [
      { value: "20.0k", label: "Active users", comparison: "+23% vs Q3" },
      { value: "1.3mins", label: "Dwell time", comparison: "+16% vs Q3" },
    ],
    gaMonthly: [
      { month: "Jan 25", users: 5200, sessions: 7800, pageViews: 18200, bounceRate: 42, avgDuration: 68 },
      { month: "Feb 25", users: 5800, sessions: 8400, pageViews: 19600, bounceRate: 40, avgDuration: 72 },
      { month: "Mar 25", users: 6100, sessions: 9200, pageViews: 21400, bounceRate: 38, avgDuration: 74 },
      { month: "Apr 25", users: 5900, sessions: 8600, pageViews: 20100, bounceRate: 41, avgDuration: 70 },
      { month: "May 25", users: 6400, sessions: 9800, pageViews: 22800, bounceRate: 37, avgDuration: 76 },
      { month: "Jun 25", users: 6800, sessions: 10200, pageViews: 24100, bounceRate: 36, avgDuration: 78 },
      { month: "Jul 25", users: 6200, sessions: 9400, pageViews: 21800, bounceRate: 39, avgDuration: 73 },
      { month: "Aug 25", users: 5600, sessions: 8100, pageViews: 19200, bounceRate: 43, avgDuration: 69 },
      { month: "Sep 25", users: 6500, sessions: 9600, pageViews: 22400, bounceRate: 37, avgDuration: 75 },
      { month: "Oct 25", users: 7100, sessions: 10800, pageViews: 25200, bounceRate: 35, avgDuration: 80 },
      { month: "Nov 25", users: 6900, sessions: 10400, pageViews: 24600, bounceRate: 34, avgDuration: 82 },
      { month: "Dec 25", users: 6000, sessions: 8800, pageViews: 20800, bounceRate: 38, avgDuration: 76 },
    ],
    topPages: [
      { page: "/about/our-team", views: 4200, change: "+18%" },
      { page: "/strategies/infrastructure", views: 3800, change: "+32%" },
      { page: "/insights/news", views: 3100, change: "+45%" },
      { page: "/about/igneo", views: 2900, change: "+12%" },
      { page: "/contact", views: 2100, change: "+8%" },
    ],
    trafficSources: [
      { source: "Organic Search", percentage: 42 },
      { source: "Direct", percentage: 28 },
      { source: "LinkedIn", percentage: 18 },
      { source: "Email", percentage: 8 },
      { source: "Other", percentage: 4 },
    ],
    focusQ4: [
      "Updated data on team and assets",
      "Increased visibility of video content",
      "Highlighted key event attendance",
      "Brand building in North America",
    ],
    focusQ1: [
      "Refresh home page to provide quicker and simpler access to content.",
      "Roll out new brand messaging across the website.",
    ],
  },

  linkedin: {
    title: "Always on: LinkedIn",
    stage: "Consideration",
    subtitle: "Quality beats quantity – our organic activities are hitting the right mark",
    description: "It has been an exceptionally strong quarter and one of the highest-performing periods for the brand to date. The volume of acquisition announcements, combined with increased press activity and notable portfolio developments, significantly accelerated user engagement.",
    goals: ["Increase our share of voice and support Sales in-region"],
    activities: ["23 x posts globally", "5 x fund / strategy focused", "3 x events focused", "8 x portfolio asset focused", "7 x insights"],
    kpis: [
      { value: "0.7%", label: "Engagement rate", comparison: "+36% against competitors" },
      { value: "23", label: "Total posts", comparison: "-52% against competitors" },
    ],
    focusQ4: [
      "Production of multiple posts in native German.",
      "Supported the paid social live campaigns.",
      "Increased brand awareness with different target audiences.",
    ],
    focusQ1: [
      "Maintain momentum from paid LinkedIn campaigns with targeted posts for key audiences.",
      "Develop an annual LinkedIn strategy pipeline to support major events, acquisitions, and announcements.",
    ],
  },

  podcast: {
    title: "Podcasts",
    stage: "Awareness",
    subtitle: "Reduced output as we prepare to shift to a modern format",
    description: "We published one episode of the Keeping the Real Asset podcast in Q4. For 2026 we are focused on working with the Investment team to develop a content strategy. Marketing data suggests video content performs well.",
    kpis: [
      { value: "305", label: "Streams", comparison: "-13% vs Q3" },
      { value: "1", label: "Episodes released", comparison: "0% vs Q3" },
    ],
  },

  email: {
    kpis: [
      { value: "22%", label: "CTOR", comparison: "+80% vs industry" },
      { value: "44%", label: "Open rates", comparison: "+84% vs industry" },
    ],
  },

  events: {
    title: "Events & Sponsorships 2026",
    stage: "Conversion",
    list: [
      // ─── Q1 2026 ───
      { name: "Client & Partner Networking Event", format: "Drinks", audience: "Institutional", region: "ASIA", quarter: "Q1", status: "committed" as const, category: "Networking", city: "Tokyo", lat: 35.6762, lng: 139.6503, startDate: "2026-01-21", brand: "Igneo", comments: "Being organised by Niall's EA Lucy - no marketing involvement to date" },
      { name: "APIF Partnership Launch Roundtables", format: "Luncheon", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "proposed" as const, category: "Luncheon", city: "TBC", lat: -33.8688, lng: 151.2093, startDate: "2026-02-01", brand: "Igneo", hasSpeakingSlot: true, assetClass: "APIF", marketingLead: "Phoebe Reardon", distributionLead: "Nick", sponsorshipCost: 2500, currency: "AUD", comments: "Date TBC" },
      { name: "CFA Quebec Winter Event", format: "Conference", audience: "Institutional", region: "NA", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Quebec", lat: 46.8139, lng: -71.2080, startDate: "2026-02-04", endDate: "2026-02-05", brand: "Igneo", host: "CFA", marketingLead: "Sophie Haynes", distributionLead: "Elizabeth Altman" },
      { name: "Infralogic Investor Forum", format: "Conference", audience: "Institutional", region: "ANZ", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-03-03", brand: "Igneo", host: "ION Analytics", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", sponsorshipCost: 32000, currency: "AUD" },
      { name: "Private Wealth Investment Leaders Forum", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-03-13", brand: "Igneo", host: "GII", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", sponsorshipCost: 40000, currency: "AUD", comments: "Note: would only sponsor this event OR Private Wealth Forum by Markets Group (NOT BOTH)" },
      { name: "Entireti Alliances Conference", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "distribution-owned" as const, category: "Conference", city: "Queenstown", lat: -45.0312, lng: 168.6626, startDate: "2026-03-15", endDate: "2026-03-17", brand: "Igneo", host: "Entireti", hasSpeakingSlot: true, speaker: "Marc B", assetClass: "AEQ, RQI, SMIDS, Igneo", marketingLead: "Josie Haynes", distributionLead: "Emerson", sponsorshipCost: 1500, currency: "AUD" },
      { name: "Centrepoint Alliances Conference", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q1", status: "distribution-owned" as const, category: "Conference", city: "Christchurch", lat: -43.5321, lng: 172.6362, startDate: "2026-03-18", brand: "Igneo", host: "Centerpoint", hasSpeakingSlot: true, distributionLead: "Quin", sponsorshipCost: 1500, currency: "AUD", comments: "Marketing only contributes to the stand build - distribution have already paid for sponsorship" },
      { name: "Infrastructure Investor Global Summit", format: "Conference", audience: "Institutional", region: "CE", quarter: "Q1", status: "committed" as const, category: "Conference", city: "Berlin", lat: 52.52, lng: 13.405, startDate: "2026-03-24", endDate: "2026-03-27", brand: "Igneo", host: "Infrastructure Investor", hasSpeakingSlot: true, speaker: "Carolyn, Hamish, Gregor", marketingLead: "Mandy Ashmore", distributionLead: "Pete Swan / Sasha Beisheim" },

      // ─── Q2 2026 ───
      { name: "P&I Private Markets", format: "Conference", audience: "Institutional", region: "NA", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Chicago", lat: 41.8781, lng: -87.6298, startDate: "2026-04-21", endDate: "2026-04-22", brand: "Igneo", host: "Pensions & Investments", hasSpeakingSlot: true, speaker: "Michael Ryder (tbc)", marketingLead: "Sophie Haynes", distributionLead: "Elizabeth Altman", sponsorshipCost: 30000, currency: "USD" },
      { name: "BAI Alternative Investment Conference", format: "Conference", audience: "Institutional", region: "CE", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Frankfurt", lat: 50.1109, lng: 8.6821, startDate: "2026-04-28", endDate: "2026-04-29", brand: "Igneo", host: "BAI", hasSpeakingSlot: true, marketingLead: "Mandy Ashmore", distributionLead: "Sasha Beisheim", sponsorshipCost: 13000, currency: "EUR" },
      { name: "Global Igneo AIM", format: "Conference", audience: "Institutional", region: "CE", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Hamburg", lat: 53.5511, lng: 9.9937, startDate: "2026-05-01", brand: "Igneo" },
      { name: "APIF Wholesale Launch Event", format: "Cocktail", audience: "Wholesale", region: "ANZ", quarter: "Q2", status: "proposed" as const, category: "Networking", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-05-01", brand: "Igneo", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", distributionLead: "Nick", sponsorshipCost: 20000, currency: "AUD", comments: "May or June - wholesale launch event for Igneo" },
      { name: "Igneo Roundtable", format: "Roundtable Lunch", audience: "Institutional", region: "ASIA", quarter: "Q2", status: "proprietary" as const, category: "Luncheon", city: "Singapore", lat: 1.3521, lng: 103.8198, startDate: "2026-05-01", brand: "Igneo", marketingLead: "Edward Tang", distributionLead: "Marcus Ong" },
      { name: "Igneo Roundtable", format: "Roundtable Lunch", audience: "Institutional", region: "ASIA", quarter: "Q2", status: "proprietary" as const, category: "Luncheon", city: "Hong Kong", lat: 22.3193, lng: 114.1694, startDate: "2026-05-01", brand: "Igneo", marketingLead: "Edward Tang", distributionLead: "Marcus Ong" },
      { name: "AsianInvestors Investment Summit", format: "Conference", audience: "Institutional", region: "ASIA", quarter: "Q2", status: "proposed" as const, category: "Conference", city: "Hong Kong", lat: 22.3193, lng: 114.1694, startDate: "2026-05-01", brand: "Igneo", marketingLead: "Edward Tang", distributionLead: "Marcus Ong" },
      { name: "Infra Investors Japan Forum", format: "Conference", audience: "Institutional", region: "ASIA", quarter: "Q2", status: "proposed" as const, category: "Conference", city: "Tokyo", lat: 35.6762, lng: 139.6503, startDate: "2026-05-01", brand: "Igneo", marketingLead: "Edward Tang", distributionLead: "Marcus Ong" },
      { name: "Morningstar Investment Conference", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-05-19", endDate: "2026-05-20", brand: "Igneo", host: "Morningstar", hasSpeakingSlot: true, assetClass: "Igneo", marketingLead: "Karyn Arthur", distributionLead: "Brodie Paape", sponsorshipCost: 20500, currency: "AUD", comments: "$4.5k contribution to FSG sponsorship + $16k for networking drinks sponsorship" },
      { name: "ASK Conference", format: "Conference", audience: "Institutional", region: "ASIA", quarter: "Q2", status: "proposed" as const, category: "Conference", city: "Seoul", lat: 37.5665, lng: 126.978, startDate: "2026-05-27", endDate: "2026-05-28", brand: "Igneo", hasSpeakingSlot: true, marketingLead: "Edward Tang", distributionLead: "Marcus Ong" },
      { name: "PEI Tokyo Forum", format: "Conference", audience: "Institutional", region: "ASIA", quarter: "Q2", status: "proposed" as const, category: "Conference", city: "Tokyo", lat: 35.6762, lng: 139.6503, startDate: "2026-06-04", endDate: "2026-06-05", brand: "Igneo", hasSpeakingSlot: true, speaker: "Danny", marketingLead: "Phoebe Reardon", sponsorshipCost: 20000, currency: "AUD", comments: "Sponsorship may be more than this" },
      { name: "Institutional Connect West Forum", format: "Conference", audience: "Institutional", region: "NA", quarter: "Q2", status: "committed" as const, category: "Conference", city: "Banff", lat: 51.1784, lng: -115.5708, startDate: "2026-06-10", endDate: "2026-06-12", brand: "Igneo", host: "Institutional Connect", hasSpeakingSlot: true, speaker: "John Ma (tbc)", assetClass: "NADIF/GDIF", marketingLead: "Sophie Haynes", distributionLead: "Tina Pham", sponsorshipCost: 29000, currency: "CAD" },

      // ─── Q3 2026 ───
      { name: "TIDE Spark", format: "Conference", audience: "Institutional", region: "NA", quarter: "Q3", status: "committed" as const, category: "Conference", city: "Los Angeles", lat: 34.0522, lng: -118.2437, startDate: "2026-07-07", endDate: "2026-07-08", brand: "Igneo", host: "TIDE", hasSpeakingSlot: true, marketingLead: "Sophie Haynes", distributionLead: "Tina Pham" },
      { name: "Inside Network Alternatives Symposium", format: "Conference", audience: "Wholesale", region: "ANZ", quarter: "Q3", status: "committed" as const, category: "Conference", city: "Brisbane", lat: -27.4698, lng: 153.0251, startDate: "2026-07-23", endDate: "2026-07-24", brand: "Igneo", host: "Inside Network", hasSpeakingSlot: true, assetClass: "APIF", marketingLead: "Phoebe Reardon", sponsorshipCost: 30000, currency: "AUD", comments: "Could be slightly less depending on what we book for other brands" },
      { name: "Igneo Institutional Roundtables", format: "Dinner/Lunch", audience: "Institutional", region: "ANZ", quarter: "Q3", status: "proposed" as const, category: "Luncheon", city: "Sydney", lat: -33.8688, lng: 151.2093, startDate: "2026-09-01", brand: "Igneo", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", sponsorshipCost: 5000, currency: "AUD" },
      { name: "Igneo Institutional Roundtables", format: "Dinner/Lunch", audience: "Institutional", region: "ANZ", quarter: "Q3", status: "proposed" as const, category: "Luncheon", city: "Melbourne", lat: -37.8136, lng: 144.9631, startDate: "2026-09-01", brand: "Igneo", hasSpeakingSlot: true, marketingLead: "Phoebe Reardon", sponsorshipCost: 5000, currency: "AUD" },
      { name: "SuperReturns", format: "Conference", audience: "Institutional", region: "ASIA", quarter: "Q3", status: "proposed" as const, category: "Conference", city: "Singapore", lat: 1.3521, lng: 103.8198, startDate: "2026-09-01", brand: "Igneo", host: "Informa", marketingLead: "Edward Tang", distributionLead: "Marcus Ong" },
      { name: "IPEM Global Conference", format: "Conference", audience: "Institutional", region: "CE", quarter: "Q3", status: "proposed" as const, category: "Conference", city: "Paris", lat: 48.8566, lng: 2.3522, startDate: "2026-09-08", endDate: "2026-09-10", brand: "Igneo", host: "IPEM", hasSpeakingSlot: true },

      // ─── Q4 2026 ───
      { name: "SuperReturn Global Infrastructure", format: "Conference", audience: "Institutional", region: "UKI", quarter: "Q4", status: "proposed" as const, category: "Conference", city: "London", lat: 51.5074, lng: -0.1278, startDate: "2026-10-13", endDate: "2026-10-15", brand: "Igneo", host: "Informa", hasSpeakingSlot: true, sponsorshipCost: 20000, currency: "GBP", comments: "No contract yet" },
      { name: "Institutional Connect Infrastructure Forum", format: "Forum", audience: "Institutional", region: "NA", quarter: "Q4", status: "committed" as const, category: "Conference", city: "Toronto", lat: 43.6532, lng: -79.3832, startDate: "2026-10-01", brand: "Igneo", host: "Institutional Connect", hasSpeakingSlot: true, marketingLead: "Sophie Haynes", distributionLead: "Elizabeth Altman" },
      { name: "UK Proprietary Event", format: "Roundtable", audience: "Institutional", region: "UKI", quarter: "Q4", status: "proposed" as const, category: "Roundtable", city: "London", lat: 51.5074, lng: -0.1278, brand: "Igneo", marketingLead: "Aida Dominguez", comments: "Igneo roadshow (Carolyn to confirm)" },
      { name: "Nordics Proprietary Event", format: "Roundtable", audience: "Institutional", region: "UKI", quarter: "Q4", status: "proposed" as const, category: "Roundtable", city: "London", lat: 51.5074, lng: -0.1278, brand: "Igneo", marketingLead: "Aida Dominguez", comments: "Igneo roadshow (Carolyn to confirm)" },
    ] as EventItem[],
  },
};
