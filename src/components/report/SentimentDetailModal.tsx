import type { SentimentMention } from "@/data/sentiment-data";
import { X, ExternalLink, Globe, Calendar, Hash } from "lucide-react";

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

interface Props {
  mention: SentimentMention;
  onClose: () => void;
}

export default function SentimentDetailModal({ mention, onClose }: Props) {
  const sentimentColor = SENTIMENT_COLORS[mention.sentiment];
  const hasLink = mention.link && mention.link.length > 0;

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
          </div>

          {/* Snippet */}
          {mention.snippet && (
            <div>
              <p className="text-[10px] text-secondary-foreground/50 uppercase tracking-wider font-semibold mb-2">Summary</p>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                {mention.snippet}
              </p>
            </div>
          )}

          {/* External link */}
          {hasLink && (
            <a
              href={mention.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View original {mention.channel === "Twitter" ? "post" : "article"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
