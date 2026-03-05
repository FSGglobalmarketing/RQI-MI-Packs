import type { SentimentMention } from "@/data/sentiment-data";
import { X, ExternalLink, Users, BarChart3, Globe, Calendar, Hash, MessageCircle } from "lucide-react";

const SENTIMENT_COLORS = {
  positive: "hsl(var(--success))",
  neutral: "hsl(var(--muted-foreground))",
  negative: "hsl(14 100% 57%)",
};

const CHANNEL_ICONS: Record<string, string> = {
  Web: "🌐",
  LinkedIn: "💼",
  Twitter: "𝕏",
  Reddit: "🔴",
  Bluesky: "🦋",
};

/** Check if link points to a real, verifiable URL (not a placeholder) */
function isVerifiedUrl(url: string): boolean {
  if (!url) return false;
  // Exclude placeholder twitter/reddit example links
  if (/\/example\d*$/.test(url)) return false;
  // Exclude fabricated article slugs that don't exist
  const fakePatterns = [
    "igneo-infrastructure-toll", "igneo-infrastructure-privatisation",
    "infrastructure-fund-risks", "foreign-investors-infrastructure",
    "igneo-waste-management", "infrastructure-fund-returns",
    "agricultural-infrastructure", "igneo-community-engagement",
    "igneo-digital-infrastructure-concerns",
  ];
  return !fakePatterns.some(p => url.includes(p));
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

interface Props {
  mention: SentimentMention;
  onClose: () => void;
}

export default function SentimentDetailModal({ mention, onClose }: Props) {
  const sentimentColor = SENTIMENT_COLORS[mention.sentiment];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="glass-modal relative z-[1001] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-4 rounded-t-2xl border-b border-secondary-foreground/5">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${sentimentColor}20`, color: sentimentColor }}
              >
                {mention.sentiment}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary-foreground/8 text-secondary-foreground/60">
                {mention.category}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary-foreground/8 text-secondary-foreground/60">
                {CHANNEL_ICONS[mention.channel]} {mention.channel}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-secondary-foreground leading-tight">
              {mention.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm text-secondary-foreground/70 pt-2">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" />
              {mention.source}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {new Date(mention.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-primary" />
              {mention.country}
            </span>
            {mention.author && (
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                {mention.author}
              </span>
            )}
          </div>

          {/* Share of Voice / Reach metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mention.followers !== undefined && (
              <div className="rounded-xl border border-secondary-foreground/8 bg-secondary-foreground/3 p-4 text-center">
                <Users className="w-4 h-4 text-primary mx-auto mb-1.5" />
                <p className="text-lg font-extrabold text-secondary-foreground">{formatNumber(mention.followers)}</p>
                <p className="text-[10px] text-secondary-foreground/50 uppercase tracking-wider font-semibold">
                  {mention.channel === "Reddit" ? "Subreddit Members" : "Followers"}
                </p>
              </div>
            )}
            {mention.domainRank !== undefined && (
              <div className="rounded-xl border border-secondary-foreground/8 bg-secondary-foreground/3 p-4 text-center">
                <BarChart3 className="w-4 h-4 text-primary mx-auto mb-1.5" />
                <p className="text-lg font-extrabold text-secondary-foreground">#{formatNumber(mention.domainRank)}</p>
                <p className="text-[10px] text-secondary-foreground/50 uppercase tracking-wider font-semibold">Domain Rank</p>
              </div>
            )}
            {mention.engagement !== undefined && (
              <div className="rounded-xl border border-secondary-foreground/8 bg-secondary-foreground/3 p-4 text-center">
                <MessageCircle className="w-4 h-4 text-primary mx-auto mb-1.5" />
                <p className="text-lg font-extrabold text-secondary-foreground">{formatNumber(mention.engagement)}</p>
                <p className="text-[10px] text-secondary-foreground/50 uppercase tracking-wider font-semibold">Engagements</p>
              </div>
            )}
          </div>

          {/* Exposure indicator */}
          {(mention.followers || mention.domainRank) && (
            <div className="rounded-xl border border-secondary-foreground/8 bg-secondary-foreground/3 p-4">
              <p className="text-[10px] text-secondary-foreground/50 uppercase tracking-wider font-semibold mb-2">
                Share of Voice Indicator
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-secondary-foreground/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, mention.domainRank ? Math.max(5, 100 - Math.log10(mention.domainRank) * 18) : mention.followers ? Math.min(100, (mention.followers / 500_000) * 100) : 10)}%`,
                      backgroundColor: sentimentColor,
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-secondary-foreground whitespace-nowrap">
                  {mention.domainRank && mention.domainRank < 5_000
                    ? "High Exposure"
                    : mention.followers && mention.followers > 50_000
                    ? "High Exposure"
                    : mention.domainRank && mention.domainRank < 50_000
                    ? "Medium Exposure"
                    : "Low Exposure"}
                </span>
              </div>
              <p className="text-[10px] text-secondary-foreground/40 mt-1.5">
                Based on {mention.domainRank ? `domain authority rank (#${mention.domainRank.toLocaleString()})` : ""}{mention.domainRank && mention.followers ? " and " : ""}{mention.followers ? `audience reach (${formatNumber(mention.followers)} followers)` : ""}
              </p>
            </div>
          )}

          {/* Snippet */}
          {mention.snippet && (
            <div>
              <p className="text-[10px] text-secondary-foreground/50 uppercase tracking-wider font-semibold mb-2">Summary</p>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                {mention.snippet}
              </p>
            </div>
          )}

          {/* External link — only show for verified URLs */}
          {mention.link && isVerifiedUrl(mention.link) && (
            <a
              href={mention.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View original {mention.channel === "Twitter" ? "post" : mention.channel === "Reddit" ? "thread" : "article"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
