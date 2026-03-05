import { reportData } from "@/data/igneo-report";

export default function GlobalFocus() {
  return (
    <section className="section-cream topo-pattern hex-pattern-cream py-24 flow-section-cream relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground mb-2">Our global focus</h2>
        <p className="text-secondary-foreground/70 mb-12">What were we trying to achieve globally last quarter?</p>

        <div className="grid md:grid-cols-3 gap-8">
          {reportData.globalFocus.map((item, i) => (
            <div
              key={item.number}
              className="glass-card-cream flow-corner-br animate-slide-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="text-5xl font-extrabold text-primary/30 block mb-4">{item.number}</span>
              <h3 className="text-lg font-bold text-secondary-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-secondary-foreground/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
