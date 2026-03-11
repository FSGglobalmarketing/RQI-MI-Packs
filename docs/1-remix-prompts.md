# Remix Prompts — Marketing Impact Report

Use these prompts **in order** when creating a new brand version from a remix of the Igneo template project.

---

## Prompt 1 — Brand Setup & Theme

> I'm building a Q1 2026 Marketing Impact Report for **[BRAND NAME]** (full name: **[BRAND FULL NAME]**). Please update:
>
> 1. `src/data/igneo-report.ts` — change `brand`, `brandFull`, `quarter`, `title`, `subtitle`, `tagline`, and `dataPeriod` to match [BRAND NAME].
> 2. `src/index.css` — replace the colour palette (Obsidian, Magma, Pumice, Sodalite) with the new brand colours. I'll provide hex codes: **Primary dark BG**: `#______`, **Accent**: `#______`, **Cream/light BG**: `#______`, **Muted/secondary**: `#______`.
> 3. `tailwind.config.ts` — update any hard-coded colour references to match.
> 4. Replace `src/assets/hero-bg.png` with the new hero image I'll upload.
> 5. Replace `src/assets/igneo-footer-logo.svg` with the new brand logo I'll upload.
> 6. Update the font in `index.css` if [BRAND NAME] uses a different typeface (provide the Google Fonts URL).

---

## Prompt 2 — Global Focus & Performance Results

> Now update the **Global Focus** and **Performance Results** sections with the Q1 2026 data for [BRAND NAME]. Here is the content:
>
> **Global Focus** (3 strategic priorities):
> 1. Title: "..." / Description: "..."
> 2. Title: "..." / Description: "..."
> 3. Title: "..." / Description: "..."
>
> **Performance Results** — replace each channel row:
> - Awareness: [channel, metrics, comparison, status] × N
> - Consideration: [channel, metrics, comparison, status] × N
> - Conversion: [channel, metrics, comparison, status] × N
> - Service & Loyalty: [channel, metrics, comparison, status] × N

---

## Prompt 3 — Search Visibility

> Update the **Search Visibility** section with this data:
>
> - Description paragraph: "..."
> - Goal statement: "..."
> - Marketing activities: ["...", "...", ...]
> - KPIs: [{ value, label, comparison }, ...]
> - Chart data (monthly keyword rankings by competitor): [paste CSV or JSON]
> - Focus areas: ["...", ...]
> - Next quarter goals: ["...", ...]

---

## Prompt 4 — Campaign Sections (repeat per campaign)

> Add/update the **[CAMPAIGN NAME]** campaign section with this data:
>
> - title, stage, subtitle, description
> - goals: ["...", ...]
> - formats: ["...", ...]
> - keyResults: [{ value, label, comparison }, ...]
> - Chart data: [paste CSV or JSON]
> - Audience data (if applicable): countries, top companies
>
> I'm uploading the following creative assets for this campaign:
> - Phone mockup images (1-2 PNGs)
> - Ad creative images (up to 6 JPGs)
> - Background image for chart page (1 JPG)

---

## Prompt 5 — Website / Always-On Section

> Update the **Website (Always-On)** section:
>
> - title, stage, subtitle, description
> - KPIs: [{ value, label, comparison }, ...]
> - Q4 focus items: ["...", ...]
> - Q1 focus items: ["...", ...]
> - GA monthly data: [{ month, users, sessions, pageviews, avgDuration }, ...]
> - Top pages: [{ page, views, change }, ...]
> - Traffic sources: [{ source, sessions, percentage }, ...]

---

## Prompt 6 — LinkedIn Section

> Update the **LinkedIn** section. Here is the data:
>
> - Quarterly KPIs: impressions, engagementRate, followers, topPost
> - Monthly data (24 months): [{ month, organic, sponsored }, ...]
> - Quarterly comparison: [{ quarter, impressions, engagement, followers }, ...]
> - Q4 daily engagement heatmap: [{ day, hour, value }, ...]
>
> Paste or upload your LinkedIn analytics export.

---

## Prompt 7 — Podcast Section

> Update the **Podcast** section:
>
> - KPIs: totalStreams, avgPerEpisode, topEpisode, platforms
> - Episodes: [{ title, streams, date, duration, guests }, ...]
> - Monthly streams: [{ month, streams }, ...]

---

## Prompt 8 — Events Section

> Update the **Events** section with this data:
>
> - KPIs: totalEvents, totalAttendees, regionsReached, topEvent
> - Events list: [{ name, format, audience, region, quarter, status, category, city, lat, lng, startDate, endDate, ... }, ...]
>
> Ensure each event has lat/lng coordinates for the map.

---

## Prompt 9 — Sentiment & Social Listening

> Update the **Sentiment** section:
>
> - KPIs: totalMentions, positiveRate, countriesReached, topChannel
> - Sentiment breakdown: { positive, neutral, negative }
> - Monthly timeline: [{ month, positive, neutral, negative, total }, ...]
> - Channel breakdown: [{ channel, mentions, positive, neutral, negative }, ...]
> - Country breakdown: [{ country, mentions }, ...]
> - Recent highlights (notable mentions): [{ title, source, channel, category, sentiment, country, date, link, ... }, ...]

---

## Prompt 10 — Final Review

> Please review the full page end-to-end. Check that:
> 1. All brand colours are consistent throughout
> 2. No Igneo-specific text remains
> 3. All data visualisations render correctly
> 4. The splash screen logo and footer logo are correct
> 5. Navigation links match the sections present
> 6. Mobile responsiveness is intact
