import { type EventItem } from "@/data/igneo-report";

interface EventsFilterBarProps {
  events: EventItem[];
  activeFilters: {
    category: string[];
    region: string[];
    quarter: string[];
    status: string[];
  };
  onToggleFilter: (type: "category" | "region" | "quarter" | "status", value: string) => void;
  onClearAll: () => void;
}

function getUniqueValues(events: EventItem[], key: keyof EventItem): string[] {
  return [...new Set(events.map((e) => String(e[key])))].sort();
}

export default function EventsFilterBar({ events, activeFilters, onToggleFilter, onClearAll }: EventsFilterBarProps) {
  const categories = getUniqueValues(events, "category");
  const regions = getUniqueValues(events, "region");
  const quarters = getUniqueValues(events, "quarter");
  const statuses = ["committed", "proposed", "proprietary", "distribution-owned"];

  const hasActiveFilters = Object.values(activeFilters).some((arr) => arr.length > 0);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Status pills */}
      <FilterGroup label="Status" values={statuses} active={activeFilters.status} onToggle={(v) => onToggleFilter("status", v)} />

      <div className="w-px h-6 bg-secondary-foreground/10" />

      {/* Category pills */}
      <FilterGroup label="Type" values={categories} active={activeFilters.category} onToggle={(v) => onToggleFilter("category", v)} />

      <div className="w-px h-6 bg-secondary-foreground/10" />

      {/* Region pills */}
      <FilterGroup label="Region" values={regions} active={activeFilters.region} onToggle={(v) => onToggleFilter("region", v)} />

      <div className="w-px h-6 bg-secondary-foreground/10" />

      {/* Quarter pills */}
      <FilterGroup label="Quarter" values={quarters} active={activeFilters.quarter} onToggle={(v) => onToggleFilter("quarter", v)} />

      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  values,
  active,
  onToggle,
}: {
  label: string;
  values: string[];
  active: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-wider font-bold text-secondary-foreground/40 mr-1">{label}</span>
      {values.map((v) => {
        const isActive = active.includes(v);
        return (
          <button
            key={v}
            onClick={() => onToggle(v)}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-all capitalize ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary-foreground/5 text-secondary-foreground/60 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
            }`}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}
