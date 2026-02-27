import { useState } from "react";
import type { EventItem } from "@/data/igneo-report";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Users, Calendar, Tag, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";

interface EventDetailModalProps {
  event: EventItem;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasImages = event.images && event.images.length > 0;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[1001] w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-secondary rounded-2xl shadow-2xl border border-secondary-foreground/10">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-4 bg-secondary rounded-t-2xl border-b border-secondary-foreground/5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                event.status === "committed"
                  ? "bg-primary/15 text-primary"
                  : event.status === "proposed"
                  ? "bg-amber-500/15 text-amber-600"
                  : event.status === "proprietary"
                  ? "bg-violet-500/15 text-violet-600"
                  : "bg-success/15 text-success"
              }`}>
                {event.status.replace("-", " ")}
              </span>
              {event.assetClass && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary-foreground/8 text-secondary-foreground/60">{event.assetClass}</span>}
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary-foreground/8 text-secondary-foreground/60">
                {event.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-secondary-foreground">{event.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm text-secondary-foreground/70">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {event.city}, {event.region}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {event.quarter}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-primary" />
              {event.audience}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" />
              {event.format}
            </span>
          </div>

          {/* Description */}
          {event.description && (
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Photo gallery / carousel */}
          {hasImages ? (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-3">Gallery</h4>
              <div className="grid grid-cols-3 gap-2">
                {event.images!.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="aspect-[4/3] rounded-lg overflow-hidden border border-secondary-foreground/10 hover:border-primary/40 transition-colors"
                  >
                    <img src={src} alt={`${event.name} photo ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-secondary-foreground/10 rounded-xl p-8 text-center">
              <p className="text-sm text-secondary-foreground/40">📸 Event photos will be added here</p>
              <p className="text-xs text-secondary-foreground/30 mt-1">Upload images to populate this gallery</p>
            </div>
          )}

          {/* Team section */}
          {event.team && event.team.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-3">
                Team attending / speaking
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.team.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 p-3 rounded-xl border border-secondary-foreground/8 bg-secondary-foreground/3"
                  >
                    <Avatar className="w-10 h-10 shrink-0">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-primary/15 text-primary font-bold text-sm">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-secondary-foreground">{member.name}</p>
                      <p className="text-xs text-secondary-foreground/60">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External link */}
          {event.eventUrl && (
            <a
              href={event.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View event page
            </a>
          )}
        </div>

        {/* Lightbox overlay */}
        {lightboxIndex !== null && hasImages && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90" onClick={() => setLightboxIndex(null)}>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.max(0, lightboxIndex - 1)); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
              disabled={lightboxIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <img
              src={event.images![lightboxIndex]}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.min(event.images!.length - 1, lightboxIndex + 1)); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
              disabled={lightboxIndex === event.images!.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {event.images!.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
