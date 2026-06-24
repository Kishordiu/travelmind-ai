import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DestinationCard } from "@/components/destination-card";
import { destinations } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore destinations — TravelMind AI" },
      { name: "description", content: "Search and filter destinations by budget, safety, crowd level and activity." },
    ],
  }),
  component: Explore,
});

const chips = [
  "All", "Beach", "Mountain", "City", "Nature", "Heritage", "Desert", "Family", "Solo", "Romantic", "Adventure",
];

const sortOptions = [
  { v: "match", l: "Best match" },
  { v: "cost", l: "Cheapest" },
  { v: "safety", l: "Safest" },
  { v: "crowd", l: "Least crowded" },
  { v: "trending", l: "Trending" },
];

function Explore() {
  const [q, setQ] = useState("");
  const [chip, setChip] = useState("All");
  const [sort, setSort] = useState("match");
  const [budget, setBudget] = useState([80000]);

  const filtered = useMemo(() => {
    let list = destinations.filter((d) => d.cost <= budget[0]);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(s) ||
          d.location.toLowerCase().includes(s) ||
          d.tags.some((t) => t.toLowerCase().includes(s)),
      );
    }
    if (chip !== "All") {
      list = list.filter(
        (d) =>
          d.category.toLowerCase() === chip.toLowerCase() ||
          d.tags.map((t) => t.toLowerCase()).includes(chip.toLowerCase()),
      );
    }
    switch (sort) {
      case "cost": list = [...list].sort((a, b) => a.cost - b.cost); break;
      case "safety": list = [...list].sort((a, b) => b.safety - a.safety); break;
      case "crowd": list = [...list].sort((a, b) => a.crowd - b.crowd); break;
      case "trending": list = [...list].sort((a, b) => b.bookingProb - a.bookingProb); break;
      default: list = [...list].sort((a, b) => b.match - a.match);
    }
    return list;
  }, [q, chip, sort, budget]);

  return (
    <AppShell title="Explore">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
        <header>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">Where will the model send you?</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Filter by budget, safety, and crowd level. Cards are scored against your preferences.
          </p>
        </header>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-card space-y-4">
          <div className="grid lg:grid-cols-[1fr_auto_auto] gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations, regions, vibes…"
                className="pl-9 h-11"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-11 lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setChip(c)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  chip === c
                    ? "bg-hero-gradient text-white border-transparent shadow-glow"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">Max budget</span>
                <span className="font-semibold">₹{budget[0].toLocaleString()}</span>
              </div>
              <Slider value={budget} onValueChange={setBudget} max={100000} step={2000} min={5000} />
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <Badge variant="outline">Safe nights</Badge>
              <Badge variant="outline">Low crowd</Badge>
              <Badge variant="outline">Family friendly</Badge>
              <Badge variant="outline">Visa free</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filtered.length} destinations match your filters</span>
          <span className="text-xs">Updated just now</span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <h3 className="font-display text-lg font-semibold">No matches — yet.</h3>
            <p className="text-sm text-muted-foreground mt-1">Try loosening your budget or clearing filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}
          </div>
        )}
      </div>
    </AppShell>
  );
}
