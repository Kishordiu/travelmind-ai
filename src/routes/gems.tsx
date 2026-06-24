import { createFileRoute } from "@tanstack/react-router";
import { Gem, MapPin, Sparkles, Navigation } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DestinationCard } from "@/components/destination-card";
import { hiddenGems, destinations } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gems")({
  head: () => ({ meta: [{ title: "Hidden Gems — TravelMind AI" }] }),
  component: Gems,
});

function Gems() {
  return (
    <AppShell title="Hidden Gems">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
        <header className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card">
          <div
            aria-hidden
            className="absolute inset-0 -z-0 opacity-60"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="relative">
            <Badge className="bg-accent-gradient text-accent-foreground border-0 mb-4">
              <Gem className="h-3 w-3 mr-1" /> Less crowded · loved by locals
            </Badge>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold max-w-2xl">
              The places guidebooks <span className="text-gradient">forgot</span>.
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Surfaced by our crowd-density model and verified by traveler reviews. Soft footprint, real soul.
            </p>
          </div>
        </header>

        {/* Map preview */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
          <div className="relative aspect-[21/9] bg-hero-gradient">
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, transparent 0, rgba(0,0,0,0.4) 100%)" }} />
            {/* Pin overlays */}
            {[
              { x: "22%", y: "60%" }, { x: "55%", y: "30%" }, { x: "70%", y: "70%" },
              { x: "40%", y: "45%" }, { x: "85%", y: "40%" },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: p.x, top: p.y, transform: "translate(-50%, -100%)" }}
              >
                <div className="relative">
                  <div className="h-4 w-4 rounded-full bg-accent shadow-glow animate-pulse-glow" />
                  <div className="absolute inset-0 h-4 w-4 rounded-full bg-accent/40 blur-md" />
                </div>
              </div>
            ))}
            {/* Route arc */}
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path
                d="M 20 40 Q 50 5 80 30"
                stroke="white"
                strokeWidth="0.3"
                strokeDasharray="1.5 1.5"
                fill="none"
                opacity="0.7"
              />
            </svg>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <div className="text-xs opacity-80">Discovery radius</div>
                <div className="font-display text-2xl font-semibold">South India · 5 gems found</div>
              </div>
              <Button variant="secondary" size="sm">
                <Navigation className="mr-1 h-3.5 w-3.5" /> Near me
              </Button>
            </div>
          </div>
        </section>

        {/* Gem cards */}
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4">Picks for the curious</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hiddenGems.map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}
          </div>
        </section>

        {/* Why special */}
        <section className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <Sparkles className="h-5 w-5 text-accent mb-2" />
            <h3 className="font-display text-xl font-semibold">Why these are special</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>· Crowd density under 20% of comparable mainstream spots</li>
              <li>· At least 4 verified local-source reviews</li>
              <li>· Cultural and ecological footprint scored under "soft"</li>
              <li>· Accessible by public transport within 2 transfers</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <MapPin className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-display text-xl font-semibold">Nearby suggestions</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {destinations.slice(0, 4).map((d) => (
                <div key={d.id} className="rounded-xl overflow-hidden border border-border group">
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <img src={d.image} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium truncate">{d.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
