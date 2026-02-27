import { useState } from "react";
import ReportNav from "@/components/report/ReportNav";
import HeroSection from "@/components/report/HeroSection";
import GlobalFocus from "@/components/report/GlobalFocus";
import PerformanceResults from "@/components/report/PerformanceResults";
import SearchVisibility from "@/components/report/SearchVisibility";
import { CampaignSection, CampaignChartPage, NorthAmericaChart, NorthAmericaExtra, DACHCharts, UKNordicsChart, UKNordicsLearnings } from "@/components/report/CampaignSection";
import DACHPhoneShowcase from "@/components/report/DACHPhoneShowcase";
import AlwaysOnSection from "@/components/report/AlwaysOnSection";
import LinkedInSection from "@/components/report/LinkedInSection";
import PodcastSection from "@/components/report/PodcastSection";
import EventsSection from "@/components/report/EventsSection";
import IPhoneMockup from "@/components/report/IPhoneMockup";
import SplashScreen from "@/components/report/SplashScreen";
import { reportData } from "@/data/igneo-report";
import railImage from "@/assets/rail-to-runway-us-backbone.jpg";
import naScrollImage from "@/assets/na-campaign-scroll.webp";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const d = reportData;
  return (
    <div className="min-h-screen bg-background">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <ReportNav />
      <HeroSection />
      <GlobalFocus />
      <PerformanceResults />
      <SearchVisibility />

      {/* North America — Page 1: Info */}
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
        phoneImage={<IPhoneMockup scrollImageSrc={naScrollImage} alt="North America campaign preview" />}
      />
      {/* North America — Page 2: Charts & Data */}
      <CampaignChartPage id="north-america" title={d.campaigns.northAmerica.title} variant="dark" backgroundImage={railImage}>
        <NorthAmericaChart />
        <NorthAmericaExtra />
      </CampaignChartPage>

      {/* DACH — Page 1: Info */}
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
        phoneImage={<DACHPhoneShowcase />}
      />
      {/* DACH — Page 2: Charts & Data */}
      <CampaignChartPage id="dach" title={d.campaigns.dach.title} variant="cream">
        <DACHCharts />
      </CampaignChartPage>

      {/* UK & Nordics — Page 1: Info */}
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
      />
      {/* UK & Nordics — Page 2: Charts & Data */}
      <CampaignChartPage id="uk-nordics" title={d.campaigns.ukNordics.title} variant="dark">
        <UKNordicsChart />
        <UKNordicsLearnings />
      </CampaignChartPage>

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

      <LinkedInSection />

      <PodcastSection />
      <EventsSection />

      <footer className="section-dark py-8 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          <p>{d.brandFull} · {d.quarter} Marketing Impact Report · Internal Use</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
