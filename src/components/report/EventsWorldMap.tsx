import { useState } from "react";
import { reportData } from "@/data/igneo-report";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Simplified world-map SVG with pulsing pins for event locations.
 * Coordinates are approximate positions on an 800×400 natural-earth-ish projection.
 */

interface EventItem {
  name: string;
  format: string;
  audience: string;
  region: string;
  quarter: string;
}

interface PinLocation {
  label: string;
  x: number;
  y: number;
  events: EventItem[];
}

function getPinLocations(): PinLocation[] {
  const events = reportData.events.list;

  const regionCoords: Record<string, { x: number; y: number }> = {
    Asia: { x: 620, y: 175 },
    ANZ: { x: 700, y: 310 },
    EMEA: { x: 400, y: 145 },
  };

  const grouped: Record<string, EventItem[]> = {};
  events.forEach((ev) => {
    if (!grouped[ev.region]) grouped[ev.region] = [];
    grouped[ev.region].push(ev);
  });

  return Object.entries(grouped).map(([region, items]) => ({
    label: region,
    x: regionCoords[region]?.x ?? 400,
    y: regionCoords[region]?.y ?? 200,
    events: items,
  }));
}

export default function EventsWorldMap() {
  const pins = getPinLocations();
  const [selectedRegion, setSelectedRegion] = useState<PinLocation | null>(null);

  return (
    <div className="mb-10">
      <Dialog open={!!selectedRegion} onOpenChange={(open) => !open && setSelectedRegion(null)}>
        <DialogContent className="sm:max-w-md bg-secondary border-secondary-foreground/10">
          <DialogHeader>
            <DialogTitle className="text-secondary-foreground">
              {selectedRegion?.label} — {selectedRegion?.events.length} Event{(selectedRegion?.events.length ?? 0) > 1 ? "s" : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {selectedRegion?.events.map((ev) => (
              <div key={ev.name} className="glass-card-cream p-4 rounded-lg">
                <p className="font-semibold text-secondary-foreground">{ev.name}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-secondary-foreground/70">
                  <span>📋 {ev.format}</span>
                  <span>👥 {ev.audience}</span>
                  <span>📅 {ev.quarter}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified continent shapes */}
        <g fill="hsl(var(--secondary-foreground) / 0.07)" stroke="hsl(var(--secondary-foreground) / 0.12)" strokeWidth="0.5">
          {/* North America */}
          <path d="M80,60 Q120,40 170,50 L200,70 Q220,60 240,70 L250,100 Q240,120 230,140 L220,160 Q200,170 190,180 L170,175 Q150,160 140,150 L120,130 Q100,110 90,90 Z" />
          {/* Central America */}
          <path d="M170,175 Q180,185 175,195 L165,210 Q160,215 155,210 L150,195 Q155,185 165,180 Z" />
          {/* South America */}
          <path d="M175,220 Q195,210 210,225 L220,260 Q225,290 220,320 L210,340 Q200,355 190,350 L180,330 Q170,300 168,280 L165,250 Q165,235 170,225 Z" />
          {/* Europe */}
          <path d="M350,60 Q370,50 400,55 L430,65 Q445,70 440,85 L435,105 Q430,115 420,120 L400,125 Q385,130 375,120 L360,105 Q350,90 345,75 Z" />
          {/* Africa */}
          <path d="M370,145 Q390,135 415,140 L435,155 Q445,175 450,200 L448,240 Q440,280 430,300 L415,315 Q400,320 390,310 L380,290 Q370,260 365,230 L360,195 Q360,165 365,150 Z" />
          {/* Middle East */}
          <path d="M440,120 Q460,110 480,120 L490,140 Q485,155 475,160 L455,155 Q445,145 440,130 Z" />
          {/* Russia / Northern Asia */}
          <path d="M440,40 Q500,25 560,30 L630,40 Q670,45 700,55 L710,70 Q700,85 680,80 L640,75 Q600,70 560,65 L500,60 Q470,55 450,55 Z" />
          {/* India */}
          <path d="M520,140 Q540,130 555,145 L560,175 Q555,200 545,215 L530,220 Q520,210 515,195 L510,170 Q510,155 515,145 Z" />
          {/* Southeast Asia */}
          <path d="M590,150 Q610,140 635,150 L645,170 Q640,185 630,190 L610,188 Q600,180 595,165 Z" />
          {/* China / East Asia */}
          <path d="M570,70 Q600,60 640,75 L660,95 Q665,115 655,130 L635,140 Q610,138 590,130 L575,115 Q565,95 565,80 Z" />
          {/* Japan */}
          <path d="M680,90 Q690,85 695,95 L698,115 Q695,125 688,125 L682,115 Q678,100 680,90 Z" />
          {/* Australia */}
          <path d="M640,270 Q670,255 710,260 L740,275 Q755,290 750,310 L740,330 Q720,345 700,340 L670,330 Q650,315 645,295 Z" />
          {/* Indonesia */}
          <path d="M610,210 Q630,205 650,210 L665,215 Q670,220 660,225 L635,225 Q620,222 612,218 Z" />
          {/* UK / Ireland */}
          <path d="M345,65 Q350,58 355,62 L358,75 Q356,82 350,80 L346,72 Z" />
          {/* Scandinavia */}
          <path d="M380,30 Q390,20 395,30 L400,50 Q398,58 392,55 L385,45 Q380,38 380,30 Z" />
          {/* Greenland */}
          <path d="M240,15 Q265,8 280,18 L285,35 Q278,45 265,42 L250,35 Q240,28 238,20 Z" />
          {/* New Zealand */}
          <path d="M755,330 Q760,325 765,330 L768,345 Q765,352 760,350 Z" />
        </g>

        {/* Pulsing pins */}
        {pins.map((pin, i) => (
          <g
            key={pin.label}
            className="cursor-pointer"
            onClick={() => setSelectedRegion(pin)}
          >
            {/* Pulse ring */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="16"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.6"
              className="events-pulse-ring"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            {/* Outer glow */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="10"
              fill="hsl(var(--primary) / 0.15)"
            />
            {/* Pin dot */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="5"
              fill="hsl(var(--primary))"
            />
            {/* Label */}
            <text
              x={pin.x}
              y={pin.y - 22}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="hsl(var(--secondary-foreground))"
            >
              {pin.label}
            </text>
            {/* Event count */}
            <text
              x={pin.x}
              y={pin.y - 11}
              textAnchor="middle"
              fontSize="9"
              fill="hsl(var(--secondary-foreground) / 0.5)"
            >
              {pin.events.length} event{pin.events.length > 1 ? "s" : ""}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
