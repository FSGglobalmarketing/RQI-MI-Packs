import { useState, useEffect } from "react";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "KPI Framework" },
  { id: "search-visibility", label: "Search" },
  { id: "north-america", label: "N. America" },
  { id: "dach", label: "DACH" },
  { id: "uk-nordics", label: "UK & Nordics" },
  { id: "website", label: "Website" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "podcast", label: "Podcast" },
  { id: "events", label: "Events" },
];

export default function ReportNav() {
  const [active, setActive] = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((n) => document.getElementById(n.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="text-lg font-bold tracking-tight text-foreground">
            igneo <span className="text-xs font-normal text-muted-foreground ml-1">Infrastructure Partners</span>
          </span>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link px-3 py-1.5 rounded-md text-xs transition-all ${
                  active === item.id
                    ? "!text-primary bg-primary/10 font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={`nav-link px-3 py-2 rounded-md text-sm ${
                  active === item.id ? "!text-primary bg-primary/10" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
