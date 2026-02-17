import ReportNav from "@/components/report/ReportNav";
import HeroSection from "@/components/report/HeroSection";
import GlobalFocus from "@/components/report/GlobalFocus";
import PerformanceResults from "@/components/report/PerformanceResults";
import SearchVisibility from "@/components/report/SearchVisibility";
import { CampaignSection, NorthAmericaChart, DACHCharts, UKNordicsChart } from "@/components/report/CampaignSection";
import AlwaysOnSection from "@/components/report/AlwaysOnSection";
import PodcastSection from "@/components/report/PodcastSection";
import EventsSection from "@/components/report/EventsSection";
import { reportData } from "@/data/igneo-report";

const Index = () => {
  const d = reportData;
  return (
    <div className="min-h-screen bg-background">
      <ReportNav />
      <HeroSection />
      <GlobalFocus />
      <PerformanceResults />
      <SearchVisibility />

      <CampaignSection
        id="north-america"
        title={d.campaigns.northAmerica.title}
        stage={d.campaigns.northAmerica.stage}
        subtitle={d.campaigns.northAmerica.subtitle}
        description={d.campaigns.northAmerica.description}
        goals={d.campaigns.northAmerica.goals}
        formats={d.campaigns.northAmerica.formats}
        keyResults={d.campaigns.northAmerica.keyResults}
        variant="dark"
        chart={<NorthAmericaChart />}
        extra={
          <div className="metric-card grid grid-cols-3 gap-3">
            {[d.campaigns.northAmerica.searchAppearances, ...d.campaigns.northAmerica.pageRankKPIs].map((kpi) => (
              <div key={kpi.label} className="text-center">
                <span className="text-2xl font-extrabold text-foreground">{kpi.value}</span>
                <span className="kpi-pill-good text-xs px-2 py-0.5 rounded-full block mt-1 mx-auto w-fit">{kpi.label}</span>
                <span className="stat-positive block mt-1 text-xs">{kpi.comparison}</span>
              </div>
            ))}
          </div>
        }
      />

      <CampaignSection
        id="dach"
        title={d.campaigns.dach.title}
        stage={d.campaigns.dach.stage}
        subtitle={d.campaigns.dach.subtitle}
        description={d.campaigns.dach.description}
        goals={d.campaigns.dach.goals}
        formats={d.campaigns.dach.formats}
        keyResults={d.campaigns.dach.keyResults}
        variant="cream"
        chart={<DACHCharts />}
      />

      <CampaignSection
        id="uk-nordics"
        title={d.campaigns.ukNordics.title}
        stage={d.campaigns.ukNordics.stage}
        subtitle={d.campaigns.ukNordics.subtitle}
        description={d.campaigns.ukNordics.description}
        goals={d.campaigns.ukNordics.goals}
        formats={d.campaigns.ukNordics.formats}
        keyResults={d.campaigns.ukNordics.keyResults}
        variant="dark"
        chart={<UKNordicsChart />}
        extra={
          <div className="metric-card">
            <h4 className="text-sm font-semibold text-foreground mb-3">Key Learnings</h4>
            <ul className="space-y-2">
              {d.campaigns.ukNordics.keyLearnings.map((l) => (
                <li key={l} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary mt-0.5">→</span>{l}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <AlwaysOnSection
        id="website"
        title={d.website.title}
        stage={d.website.stage}
        subtitle={d.website.subtitle}
        description={d.website.description}
        kpis={d.website.kpis}
        focusQ4={d.website.focusQ4}
        focusQ1={d.website.focusQ1}
        variant="cream"
      />

      <AlwaysOnSection
        id="linkedin"
        title={d.linkedin.title}
        stage={d.linkedin.stage}
        subtitle={d.linkedin.subtitle}
        description={d.linkedin.description}
        kpis={d.linkedin.kpis}
        focusQ4={d.linkedin.focusQ4}
        focusQ1={d.linkedin.focusQ1}
        variant="dark"
        activities={d.linkedin.activities}
      />

      <PodcastSection />
      <EventsSection />

      <footer className="section-dark py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          <p>{d.brandFull} · {d.quarter} Marketing Impact Report · Internal Use</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
