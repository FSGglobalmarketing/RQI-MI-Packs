export const reportData = {
  brand: "Igneo",
  brandFull: "Igneo Infrastructure Partners",
  quarter: "Q4 2025",
  title: "Global marketing impact report",
  subtitle: "A quarterly review of global marketing activities and performance.",
  tagline: "Middle market. Maximum impact.",
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
    goal: "Place the Igneo website at the top of Google search results for Infrastructure Investing terms.",
    kpis: [
      { value: "142", label: "Ranking keywords", comparison: "+21% more than competitors" },
      { value: "10th", label: "Av brand ranking", comparison: "+5 higher than competitors" },
    ],
    chartData: [
      { month: "Mar 24", IFM: 80, CIP: 55, Antin: 40, Igneo: 30, Infravia: 25, Ardian: 20, Blackstone: 15, Stonepeak: 10, Vauban: 8 },
      { month: "Jun 24", IFM: 110, CIP: 70, Antin: 55, Igneo: 40, Infravia: 35, Ardian: 30, Blackstone: 20, Stonepeak: 15, Vauban: 10 },
      { month: "Sep 24", IFM: 160, CIP: 90, Antin: 70, Igneo: 55, Infravia: 45, Ardian: 40, Blackstone: 30, Stonepeak: 18, Vauban: 12 },
      { month: "Dec 24", IFM: 190, CIP: 120, Antin: 85, Igneo: 70, Infravia: 55, Ardian: 50, Blackstone: 35, Stonepeak: 20, Vauban: 15 },
      { month: "Mar 25", IFM: 250, CIP: 150, Antin: 110, Igneo: 90, Infravia: 70, Ardian: 60, Blackstone: 40, Stonepeak: 22, Vauban: 18 },
      { month: "Jun 25", IFM: 320, CIP: 180, Antin: 140, Igneo: 120, Infravia: 90, Ardian: 75, Blackstone: 55, Stonepeak: 30, Vauban: 20 },
      { month: "Sep 25", IFM: 450, CIP: 230, Antin: 200, Igneo: 170, Infravia: 140, Ardian: 110, Blackstone: 70, Stonepeak: 40, Vauban: 25 },
      { month: "Dec 25", IFM: 550, CIP: 310, Antin: 280, Igneo: 230, Infravia: 195, Ardian: 170, Blackstone: 95, Stonepeak: 55, Vauban: 30 },
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
    title: "Events",
    stage: "Conversion",
    list: [
      { name: "PEI Singapore", format: "Conference", audience: "Institutional", region: "Asia", quarter: "Q4" },
      { name: "CPERI", format: "Site tour", audience: "Clients", region: "ANZ", quarter: "Q4" },
      { name: "Titan Investors", format: "Roundtable / Dinner", audience: "Institutional", region: "EMEA", quarter: "Q4" },
      { name: "European roundtable (Syd)", format: "Luncheon", audience: "Institutional", region: "ANZ", quarter: "Q4" },
      { name: "European roundtable (Mel)", format: "Luncheon", audience: "Institutional", region: "ANZ", quarter: "Q4" },
    ],
  },
};
