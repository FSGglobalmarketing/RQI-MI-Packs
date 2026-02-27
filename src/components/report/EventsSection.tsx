import { useState, useMemo } from "react";
import { reportData, type EventItem } from "@/data/igneo-report";
import EventsLeafletMap from "./EventsLeafletMap";
import EventsFilterBar from "./EventsFilterBar";

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

  const pastCount = filteredEvents.filter((ev) => ev.status === "past").length;
  const upcomingCount = filteredEvents.filter((ev) => ev.status === "upcoming").length;

  return (
    <section id="events" className="section-cream py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground">{e.title}</h2>
          <span className="stage-badge text-xs">{e.stage}</span>
        </div>

        <p className="text-sm text-secondary-foreground/60 mb-6">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} — {pastCount} completed, {upcomingCount} upcoming
        </p>

        <EventsFilterBar
          events={e.list}
          activeFilters={filters}
          onToggleFilter={toggleFilter}
          onClearAll={clearAll}
        />

        <EventsLeafletMap filteredEvents={filteredEvents} />

        {/* Events table */}
        <div className="glass-card-cream overflow-x-auto mt-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-secondary-foreground/10">
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Event</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Format</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Audience</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Region</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((ev) => (
                <tr key={ev.name} className="border-b border-secondary-foreground/5 hover:bg-secondary-foreground/5 transition-colors">
                  <td className="py-3 px-4 font-medium text-secondary-foreground">{ev.name}</td>
                  <td className="py-3 px-4 text-secondary-foreground/70">{ev.format}</td>
                  <td className="py-3 px-4 text-secondary-foreground/70">{ev.audience}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{ev.region}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      ev.status === "upcoming"
                        ? "bg-primary/10 text-primary"
                        : "bg-success/15 text-success"
                    }`}>
                      {ev.status === "upcoming" ? "Upcoming" : "Completed"}
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
