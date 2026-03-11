# Marketing Impact Report — Design & Feature Specification

> Brand-agnostic reference document describing the design system, page structure, features, and interactive elements.

---

## 1. Overview

A single-page, responsive web application presenting a quarterly marketing impact report. Built with React + Vite + TypeScript + Tailwind CSS. All content is data-driven via centralised TypeScript data files — no CMS required.

---

## 2. Design System

### 2.1 Colour Architecture

Colours are defined as HSL CSS variables in `index.css` and mapped through `tailwind.config.ts`. Every component uses semantic tokens — never raw colour values.

| Token | Purpose | Example (Igneo) |
|-------|---------|-----------------|
| `--background` | Primary dark background | Obsidian `#052332` |
| `--foreground` | Text on dark backgrounds | Pumice `#F2EBE6` |
| `--primary` | Accent colour (CTAs, highlights) | Magma `#FF5424` |
| `--secondary` | Light/cream background | Pumice `#F2EBE6` |
| `--muted` | Subdued elements | Sodalite `#214E6F` |
| `--cream` | Alternate light sections | Pumice |
| `--chart-*` | 6-stop chart palette | Obsidian → Lava spectrum |

### 2.2 Typography

- **Font**: Plus Jakarta Sans (Google Fonts), weights 400–800
- **Scale**: text-xs through text-6xl, responsive via Tailwind
- **Hierarchy**: Single H1 on hero; H2 per section; H3 for subsections

### 2.3 Section Variants

Two alternating visual treatments:
- **`section-dark`**: Dark background with topographic SVG pattern overlay
- **`section-cream`**: Light/cream background with hexagonal pattern overlay

### 2.4 Glass Cards

Frosted-glass card styles with backdrop blur:
- `glass-card` — dark variant
- `glass-card-cream` — light variant
- `flow-corner-br` — accent corner decoration

### 2.5 Animations

- CSS keyframe animations: `slide-up`, `fade-in`, `scale-in`
- Hero background: infinite horizontal scroll loop
- Splash screen: SVG path draw + scale entrance

---

## 3. Page Structure

### 3.1 Splash Screen
Full-screen animated brand reveal with SVG logo draw animation. Auto-dismisses after ~3s.

### 3.2 Navigation Bar
Fixed top nav with:
- Brand logo (left)
- Section links with smooth-scroll anchoring
- Active section highlighting via Intersection Observer
- Mobile: hamburger menu with slide-out drawer

### 3.3 Hero Section
- Full-viewport hero with parallax-scrolling background image
- Quarter badge, title, subtitle, tagline
- Gradient overlay for text readability

### 3.4 Global Focus
3-column grid of strategic priorities. Each card has a large number, title, and description.

### 3.5 Performance Results
Marketing funnel visualisation:
- Stages: Awareness → Consideration → Conversion → Service & Loyalty
- Each channel shows metrics, comparison vs benchmark, and RAG status indicator (good/below/inactive)

### 3.6 Search Visibility
- Description + goal statement
- KPI row with comparison badges
- Interactive multi-line chart (Recharts) showing keyword rankings vs competitors over 12 months
- Toggleable competitor visibility
- Focus areas and next-quarter goals

### 3.7 Campaign Sections (×N, repeatable)
Each campaign has two pages:

**Page 1 — Info:**
- Title, stage badge, subtitle, description
- Goals list, formats list
- Key results KPI row
- Device mockup showcase (phone/tablet renders of creative)

**Page 2 — Charts & Data:**
- Background image or pattern
- Recharts visualisations (bar, area, stacked)
- Audience breakdowns (country %, top companies)
- Learnings/insights cards

### 3.8 Device Mockups
Three mockup components:
- `DeviceMockup` — iPad + phone composite with scrolling content
- `DACHPhoneShowcase` — dual iPhone mockup with floating UI
- `UKNordicsAdShowcase` — rotating carousel of ad creatives

### 3.9 Website / Always-On Section
- KPI row (users, sessions, dwell time, etc.)
- Monthly GA data chart
- Top pages table
- Traffic sources breakdown
- Quarter focus areas (Q current + Q next)

### 3.10 LinkedIn Section
Tabbed analytics dashboard:
- **Timeline**: 24-month stacked area chart (organic vs sponsored impressions)
- **Heatmap**: Daily engagement heat grid
- **Org vs Spn**: Quarterly comparison bars
- **Sparklines**: Metric trend mini-charts

### 3.11 Podcast Section
Tabbed view:
- **Leaderboard**: Top episodes ranked by streams with bar visualisation
- **Streams**: Monthly streams line/bar chart
- **Episodes**: Scrollable episode list with metadata

### 3.12 Events Section
Interactive events explorer:
- KPI summary row
- Multi-axis filter bar (category, region, quarter, status)
- Leaflet.js interactive map with clustered markers
- Event detail modal with full metadata

### 3.13 Sentiment & Social Listening
Tabbed analytics:
- **Timeline**: Monthly mentions stacked area
- **Sentiment**: Pie/donut breakdown (positive/neutral/negative)
- **Channels**: Channel comparison bars
- **Geography**: Country breakdown bars
- Filterable mentions table with detail modal
- External links to source articles

### 3.14 Footer
Centred brand logo + quarter label.

---

## 4. Data Architecture

All data lives in `src/data/`:

| File | Contents |
|------|----------|
| `igneo-report.ts` | Core report data: brand info, global focus, performance, search, campaigns, website, events |
| `linkedin-data.ts` | LinkedIn monthly/quarterly/daily analytics |
| `podcast-data.ts` | Podcast episodes and monthly streams |
| `sentiment-data.ts` | Brandwatch mentions, sentiment breakdown, highlights |

### Data contract: To create a new brand report, replace the contents of these 4 files. No component code changes required.

---

## 5. Asset Requirements

| Asset | Format | Dimensions | Notes |
|-------|--------|-----------|-------|
| Hero background | PNG/JPG | 1920×1080+ | Landscape, will be cropped and scrolled |
| Brand logo (footer/splash) | SVG | Any | Single-colour preferred |
| Campaign phone mockups | PNG | 375×812 | iPhone-proportioned, transparent BG |
| Campaign iPad mockup | PNG | 820×1180 | iPad-proportioned content |
| Campaign ad creatives | JPG | 1200×628 | LinkedIn ad dimensions |
| Background images | JPG | 1920×1080 | For campaign chart pages |

---

## 6. Responsive Breakpoints

| Breakpoint | Behaviour |
|-----------|-----------|
| < 640px (sm) | Single column, stacked layouts, mobile nav drawer |
| 640–1024px (md) | 2-column grids, condensed charts |
| > 1024px (lg) | Full 3-column grids, side-by-side layouts |
| Max container | 1400px centred |

---

## 7. Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). CSS backdrop-filter required for glass effects.

---

## 8. Performance

- Vite code-splitting and tree-shaking
- Lazy-loaded images where appropriate
- SVG patterns inlined or loaded from `/public/patterns/`
- Recharts renders only visible chart tabs
