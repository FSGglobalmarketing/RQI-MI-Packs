

## Sentiment Monitoring Section — Integration Plan

### Data Summary

The uploaded Excel contains ~930 social listening mentions of "Igneo Infrastructure Partners" spanning Sep 2025 to Mar 2026. Each row includes: Channel (Web, LinkedIn, Twitter), Category (News, Websites, LinkedIn Posts, Tweets), Sentiment (positive/neutral/negative), Country, Date, engagement metrics (Likes, Comments, Shares, Views), and source profile/link.

### New Files

**`src/data/sentiment-data.ts`**
- Export a typed array of all ~930 mention records (parsed from the Excel)
- Export pre-aggregated summary objects:
  - `sentimentBreakdown`: counts of positive / neutral / negative
  - `mentionsByMonth`: monthly mention counts for time-series chart
  - `channelBreakdown`: Web vs LinkedIn vs Twitter totals
  - `countryBreakdown`: top 10 countries by mention volume
  - `recentHighlights`: curated list of notable positive/negative mentions with title, source, date, link

**`src/components/report/SentimentSection.tsx`**
- New section placed between EventsSection and the footer
- Uses `section-dark` theme (to alternate with the cream Events section above it)
- Layout mirrors LinkedInSection: two-column grid on large screens

**Left column — Overview & KPIs:**
- Section title "Sentiment Monitoring" with stage badge
- Subtitle and brief description
- KPI row (using existing `KpiRow` component):
  - Total Mentions (e.g. "930+")
  - Positive Sentiment Rate (e.g. "28%")
  - Countries Reached (e.g. "18")
  - Top Channel (e.g. "Web — 85%")
- A "Recent Highlights" card showing the 5 most notable mentions (title, source, sentiment dot, date) with external links

**Right column — Charts (tabbed, matching LinkedIn pattern):**
- Tab bar with 4 views:
  1. **Timeline** — Area chart of mentions per month, colored by sentiment (stacked: positive/neutral/negative)
  2. **Sentiment** — Donut chart showing positive/neutral/negative split with center label
  3. **Channels** — Horizontal bar chart (Web, LinkedIn, Twitter) with sentiment coloring per bar
  4. **Geography** — Horizontal bar chart of top 10 countries by mention count

### Integration into Index.tsx

- Import `SentimentSection`
- Place it after `<EventsSection />` and before the `<footer>`
- Add "Sentiment" to the `ReportNav` navigation links

### Design Details

- Sentiment color coding: green for positive, neutral gray, coral/red for negative — consistent with existing success/warning palette
- Charts use Recharts (already installed), matching the tooltip and axis styling from LinkedInSection
- Glass card styling (`glass-card-dark`, `flow-corner-*`) consistent with existing sections
- The Recent Highlights feed uses a scrollable card list with sentiment indicator dots and truncated titles

### No Backend Required

All data is statically embedded in the data file — consistent with the existing architecture where data updates happen through file modification.

