import { useState, useMemo } from "react";
import { reportData, type EventItem } from "@/data/igneo-report";
import EventsLeafletMap from "./EventsLeafletMap";
import EventsFilterBar from "./EventsFilterBar";
import EventsKPIs from "./EventsKPIs";

type FilterState = {
  category: string[];
  region: string[];
  quarter: string[];
  status: string[];
};

export default function EventsSection() {
  const e = reportData.events;
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    region: [],
    quarter: [],
    status: [],
  });

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[type];
      return {
        ...prev,
        [type]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const clearAll = () => setFilters({ category: [], region: [], quarter: [], status: [] });

  const filteredEvents = useMemo(() => {
    return e.list.filter((ev) => {
      if (filters.category.length && !filters.category.includes(ev.category)) return false;
      if (filters.region.length && !filters.region.includes(ev.region)) return false;
      if (filters.quarter.length && !filters.quarter.includes(ev.quarter)) return false;
      if (filters.status.length && !filters.status.includes(ev.status)) return false;
      return true;
    });
  }, [e.list, filters]);

  const committedCount = filteredEvents.filter((ev) => ev.status === "committed").length;
  const proposedCount = filteredEvents.filter((ev) => ev.status === "proposed").length;

  return (
    <section id="events" className="section-cream py-24 flow-section-cream relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground">{e.title}</h2>
          <span className="stage-badge text-xs">{e.stage}</span>
        </div>

        <p className="text-sm text-secondary-foreground/60 mb-6">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} — {committedCount} committed, {proposedCount} proposed
        </p>

        <EventsFilterBar
          events={e.list}
          activeFilters={filters}
          onToggleFilter={toggleFilter}
          onClearAll={clearAll}
        />

        <EventsKPIs events={filteredEvents} />

        <EventsLeafletMap filteredEvents={filteredEvents} />

        {/* Events table */}
        <div className="glass-card-cream flow-corner-br overflow-x-auto mt-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-secondary-foreground/10">
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Event</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Team</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Format</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Audience</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Region</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((ev) => (
                <tr key={`${ev.name}-${ev.city}`} className="border-b border-secondary-foreground/5 hover:bg-secondary-foreground/5 transition-colors">
                  <td className="py-3 px-4 font-medium text-secondary-foreground">
                    <div>{ev.name}</div>
                    <div className="text-[10px] text-secondary-foreground/40">{ev.city} · {ev.quarter}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex -space-x-2">
                      {(() => {
                        const people: string[] = [];
                        if (ev.speaker) ev.speaker.split(",").map(s => s.trim()).forEach(s => people.push(s));
                        if (ev.marketingLead && !people.includes(ev.marketingLead)) people.push(ev.marketingLead);
                        if (ev.distributionLead) ev.distributionLead.split("/").map(s => s.trim()).forEach(s => { if (!people.includes(s)) people.push(s); });
                        if (people.length === 0) return <span className="text-secondary-foreground/30 text-xs">—</span>;
                        const colors = ["#FF5424", "#214E6F", "#29628A", "#3A8AC3", "#506570"];
                        return people.slice(0, 3).map((name, i) => {
                          const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                          return (
                            <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-white/80" style={{ backgroundColor: colors[i % colors.length] }} title={name}>
                              {initials}
                            </div>
                          );
                        });
                      })()}
                      {(() => {
                        const people: string[] = [];
                        if (ev.speaker) ev.speaker.split(",").map(s => s.trim()).forEach(s => people.push(s));
                        if (ev.marketingLead) people.push(ev.marketingLead);
                        if (ev.distributionLead) ev.distributionLead.split("/").map(s => s.trim()).forEach(s => people.push(s));
                        return people.length > 3 ? <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-secondary-foreground bg-secondary-foreground/10 border-2 border-white/80">+{people.length - 3}</div> : null;
                      })()}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-secondary-foreground/70">{ev.format}</td>
                  <td className="py-3 px-4 text-secondary-foreground/70">{ev.audience}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{ev.region}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                      ev.status === "committed"
                        ? "bg-primary/10 text-primary"
                        : ev.status === "proposed"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-violet-500/10 text-violet-600"
                    }`}>
                      {ev.status.replace("-", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
