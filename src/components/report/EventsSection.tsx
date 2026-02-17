import { reportData } from "@/data/igneo-report";

export default function EventsSection() {
  const e = reportData.events;
  return (
    <section id="events" className="section-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground">{e.title}</h2>
          <span className="stage-badge text-xs">{e.stage}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-secondary-foreground/10">
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Event</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Format</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Audience</th>
                <th className="text-left py-3 px-4 text-secondary-foreground font-semibold">Region</th>
              </tr>
            </thead>
            <tbody>
              {e.list.map((ev) => (
                <tr key={ev.name} className="border-b border-secondary-foreground/5 hover:bg-secondary-foreground/5 transition-colors">
                  <td className="py-3 px-4 font-medium text-secondary-foreground">{ev.name}</td>
                  <td className="py-3 px-4 text-secondary-foreground/70">{ev.format}</td>
                  <td className="py-3 px-4 text-secondary-foreground/70">{ev.audience}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{ev.region}</span>
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
