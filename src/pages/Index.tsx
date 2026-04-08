import { useState } from "react";
import ReportNav from "@/components/report/ReportNav";
import HeroSection from "@/components/report/HeroSection";
import GlobalFocus from "@/components/report/GlobalFocus";
import PerformanceResults from "@/components/report/PerformanceResults";
import SearchVisibility from "@/components/report/SearchVisibility";
import { CampaignSection } from "@/components/report/CampaignSection";
import AlwaysOnSection from "@/components/report/AlwaysOnSection";
import LinkedInSection from "@/components/report/LinkedInSection";
import EventsSection from "@/components/report/EventsSection";
import SentimentSection from "@/components/report/SentimentSection";
import SalesforceSection from "@/components/report/SalesforceSection";
import SplashScreen from "@/components/report/SplashScreen";
import VideoCarousel from "@/components/report/VideoCarousel";
import SneakPeekSection from "@/components/report/SneakPeekSection";
import { reportData } from "@/data/igneo-report";
import rqiLogoWhite from "@/assets/RQI_Positive_White.svg";

const Index = () => {
  const [showSplash, setShowSplash] = useState(false); // temporarily disabled for testing
  const d = reportData;
  return (
    <div className="min-h-screen bg-background">
      {/* {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />} */}
      <ReportNav />
      <HeroSection />
      <GlobalFocus />
      <PerformanceResults />
      <SalesforceSection />
      <SearchVisibility />

      {/* Highlight 1: RQI Asia Campaign Phase II */}
      <CampaignSection
        id="asia-campaign"
        title={d.highlights.asiaCampaign.title}
        stage={d.highlights.asiaCampaign.stage}
        subtitle={d.highlights.asiaCampaign.subtitle}
        description={d.highlights.asiaCampaign.description}
        goals={d.highlights.asiaCampaign.goals}
        formats={d.highlights.asiaCampaign.formats}
        keyResults={d.highlights.asiaCampaign.keyResults}
        variant="dark"
      />

      {/* Highlight 2: Fund Manager of the Year */}
      <CampaignSection
        id="fmoty"
        title={d.highlights.fundManagerOfYear.title}
        stage={d.highlights.fundManagerOfYear.stage}
        subtitle={d.highlights.fundManagerOfYear.subtitle}
        description={d.highlights.fundManagerOfYear.description}
        goals={d.highlights.fundManagerOfYear.goals}
        formats={d.highlights.fundManagerOfYear.formats}
        keyResults={d.highlights.fundManagerOfYear.keyResults}
        variant="cream"
      />

      {/* Highlight 3: RQI Demystified */}
      <CampaignSection
        id="demystified"
        title={d.highlights.demystified.title}
        stage={d.highlights.demystified.stage}
        subtitle={d.highlights.demystified.subtitle}
        description={d.highlights.demystified.description}
        goals={d.highlights.demystified.goals}
        formats={d.highlights.demystified.formats}
        keyResults={d.highlights.demystified.keyResults}
        variant="dark"
        phoneImage={<VideoCarousel />}
      />

      {/* Highlight 4: RQI Asia Campaign Phase III */}
      <CampaignSection
        id="asia-campaign-iii"
        title={d.highlights.asiaCampaignPhaseIII.title}
        stage={d.highlights.asiaCampaignPhaseIII.stage}
        subtitle={d.highlights.asiaCampaignPhaseIII.subtitle}
        description={d.highlights.asiaCampaignPhaseIII.description}
        goals={d.highlights.asiaCampaignPhaseIII.goals}
        formats={d.highlights.asiaCampaignPhaseIII.formats}
        keyResults={d.highlights.asiaCampaignPhaseIII.keyResults}
        variant="cream"
      />

      <SneakPeekSection />

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
        gaMonthly={d.website.gaMonthly}
        topPages={d.website.topPages}
        trafficSources={d.website.trafficSources}
      />

      <LinkedInSection />
      <EventsSection />
      <SentimentSection />

      <footer className="section-dark py-10 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
          <img src={rqiLogoWhite} alt="RQI Investors" className="h-12 w-auto" />
          <p className="text-xs text-muted-foreground">{d.quarter} Marketing Impact Report · Internal Use</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
