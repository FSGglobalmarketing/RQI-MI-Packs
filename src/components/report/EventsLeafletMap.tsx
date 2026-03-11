import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { reportData, type EventItem } from "@/data/igneo-report";
import EventDetailModal from "./EventDetailModal";


interface MarkerGroup {
  city: string;
  lat: number;
  lng: number;
  events: EventItem[];
}

function groupEventsByCity(events: EventItem[]): MarkerGroup[] {
  const grouped: Record<string, MarkerGroup> = {};
  events.forEach((ev) => {
    const key = `${ev.lat},${ev.lng}`;
    if (!grouped[key]) {
      grouped[key] = { city: ev.city, lat: ev.lat, lng: ev.lng, events: [] };
    }
    grouped[key].events.push(ev);
  });
  return Object.values(grouped);
}

// Custom pulsing marker icon using brand colors
function createPulsingIcon(count: number, isUpcoming: boolean) {
  const color = isUpcoming
    ? "#0F9AFF"  // primary / accent
    : "#0F9AFF"; // same primary color for all pins

  return L.divIcon({
    className: "leaflet-pulsing-marker",
    html: `
      <div class="leaflet-pulse-container">
        <div class="leaflet-pulse-ring" style="border-color: ${color}"></div>
        <div class="leaflet-pulse-dot" style="background: ${color}">
          <span class="leaflet-pulse-count">${count}</span>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

interface EventsLeafletMapProps {
  filteredEvents: EventItem[];
}

export default function EventsLeafletMap({ filteredEvents }: EventsLeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<MarkerGroup | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20, 40],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    });

    // Grayscale CartoDB tiles — branded overlay style
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19 }
    ).addTo(map);

    // Labels layer on top (subtle)
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19, opacity: 0.4 }
    ).addTo(map);

    mapInstanceRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when filtered events change
  useEffect(() => {
    if (!markersRef.current || !mapInstanceRef.current) return;

    markersRef.current.clearLayers();
    const groups = groupEventsByCity(filteredEvents);

    groups.forEach((group) => {
      const hasCommitted = group.events.some((e) => e.status === "committed");
      const icon = createPulsingIcon(group.events.length, hasCommitted);

      const marker = L.marker([group.lat, group.lng], { icon })
        .on("click", () => {
          if (group.events.length === 1) {
            setSelectedEvent(group.events[0]);
          } else {
            setSelectedGroup(group);
          }
        });

      // Tooltip on hover
      marker.bindTooltip(
        `<strong>${group.city}</strong><br/>${group.events.length} event${group.events.length > 1 ? "s" : ""}`,
        { direction: "top", offset: [0, -20], className: "leaflet-branded-tooltip" }
      );

      markersRef.current!.addLayer(marker);
    });

    // Fit bounds if there are events
    if (groups.length > 0) {
      const bounds = L.latLngBounds(groups.map((g) => [g.lat, g.lng] as [number, number]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 5 });
    }
  }, [filteredEvents]);

  return (
    <>
      <div
        ref={mapRef}
        className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-secondary-foreground/10"
        style={{ background: "hsl(var(--cream))" }}
      />

      {/* City group picker modal */}
      {selectedGroup && !selectedEvent && (
        <EventGroupPicker
          group={selectedGroup}
          onSelect={(ev) => {
            setSelectedEvent(ev);
            setSelectedGroup(null);
          }}
          onClose={() => setSelectedGroup(null)}
        />
      )}

      {/* Event detail modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => {
            setSelectedEvent(null);
            setSelectedGroup(null);
          }}
        />
      )}
    </>
  );
}

// When a city has multiple events, show a picker first
function EventGroupPicker({
  group,
  onSelect,
  onClose,
}: {
  group: MarkerGroup;
  onSelect: (ev: EventItem) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-modal relative z-[1001] w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-secondary-foreground">
            {group.city} — {group.events.length} Events
          </h3>
          <button onClick={onClose} className="text-secondary-foreground/50 hover:text-secondary-foreground text-xl leading-none">
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {group.events.map((ev) => (
            <button
              key={ev.name}
              onClick={() => onSelect(ev)}
              className="w-full text-left p-4 rounded-xl border border-secondary-foreground/10 hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${ev.status === "committed" ? "bg-primary" : ev.status === "proposed" ? "bg-amber-500" : "bg-success"}`} />
                <div>
                  <p className="font-semibold text-secondary-foreground text-sm">{ev.name}</p>
                  <p className="text-xs text-secondary-foreground/60">{ev.format} · {ev.quarter}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
