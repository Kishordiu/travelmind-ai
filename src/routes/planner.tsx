import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plane, Hotel, Utensils, Camera, Wallet, Plus, Save, Sparkles, Clock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { itineraryDays } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Trip Planner — TravelMind AI" }] }),
  component: Planner,
});

const kindIcon: Record<string, any> = {
  transport: Plane,
  hotel: Hotel,
  food: Utensils,
  activity: Camera,
};
const kindTint: Record<string, string> = {
  transport: "text-chart-1 bg-chart-1/10",
  hotel: "text-chart-2 bg-chart-2/10",
  food: "text-chart-3 bg-chart-3/10",
  activity: "text-chart-4 bg-chart-4/10",
};

function Planner() {
  const [step, setStep] = useState(2);
  const totalCost = itineraryDays.reduce(
    (a, d) => a + d.items.reduce((b, i) => b + i.cost, 0),
    0,
  );

  return (
    <AppShell title="Trip Planner">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
        <header className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">Plan your Varkala escape</h1>
            <p className="text-muted-foreground mt-2">3 days · Coastal · Solo</p>
          </div>
          <Button
            className="bg-hero-gradient text-white border-0 shadow-glow"
            onClick={() => toast.success("Trip saved to your trips")}
          >
            <Save className="mr-2 h-4 w-4" /> Save trip
          </Button>
        </header>

        {/* Stepper */}
        <div className="grid grid-cols-4 gap-2">
          {["Vibe", "Dates", "Itinerary", "Review"].map((s, i) => {
            const active = i + 1 <= step;
            return (
              <button
                key={s}
                onClick={() => setStep(i + 1)}
                className={`rounded-xl p-3 text-left border transition ${
                  active ? "bg-card border-primary/40 shadow-card" : "bg-muted/30 border-border"
                }`}
              >
                <div className={`text-[10px] uppercase tracking-wider ${active ? "text-primary" : "text-muted-foreground"}`}>
                  Step {i + 1}
                </div>
                <div className="text-sm font-semibold">{s}</div>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Timeline */}
          <section className="space-y-4">
            {itineraryDays.map((day, di) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: di * 0.06 }}
                className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
              >
                <div className="flex items-center justify-between p-5 border-b border-border bg-gradient-to-r from-muted/30 to-transparent">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Day {day.day}</div>
                    <h3 className="font-display text-xl font-semibold">{day.title}</h3>
                  </div>
                  <Badge variant="outline">
                    ₹{day.items.reduce((a, b) => a + b.cost, 0).toLocaleString()}
                  </Badge>
                </div>
                <ol className="p-5 space-y-3">
                  {day.items.map((it, i) => {
                    const Icon = kindIcon[it.kind] ?? Camera;
                    return (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="flex flex-col items-center">
                          <div className={`h-9 w-9 rounded-xl grid place-items-center ${kindTint[it.kind]}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {i !== day.items.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                        </div>
                        <div className="flex-1 min-w-0 pb-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {it.time}
                          </div>
                          <div className="flex items-center justify-between gap-3 mt-0.5">
                            <div className="font-medium truncate">{it.title}</div>
                            <div className="text-sm font-semibold shrink-0">
                              {it.cost === 0 ? "Free" : `₹${it.cost.toLocaleString()}`}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  <li>
                    <Button variant="outline" size="sm" className="border-dashed">
                      <Plus className="mr-1 h-3.5 w-3.5" /> Add item
                    </Button>
                  </li>
                </ol>
              </motion.div>
            ))}
          </section>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4 text-primary" /> Budget breakdown
              </div>
              <div className="mt-2 font-display text-3xl font-semibold">₹{totalCost.toLocaleString()}</div>
              <div className="text-xs text-success">▼ 9% under predicted</div>
              <div className="mt-4 space-y-2">
                {[
                  { l: "Transport", v: 8400, c: "var(--chart-1)" },
                  { l: "Stay", v: 3800, c: "var(--chart-2)" },
                  { l: "Activities", v: 3600, c: "var(--chart-4)" },
                  { l: "Food", v: 1250, c: "var(--chart-3)" },
                ].map((r) => (
                  <div key={r.l}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{r.l}</span>
                      <span className="font-medium">₹{r.v.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(r.v / totalCost) * 100}%`, background: r.c }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-hero-gradient text-white p-5 shadow-glow relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
              <Sparkles className="h-5 w-5 mb-2" />
              <h4 className="font-display font-semibold">Smart suggestions</h4>
              <ul className="mt-2 space-y-2 text-sm opacity-90">
                <li>· Swap Day 2 lunch for Cafe Italiano (₹450, better reviews)</li>
                <li>· Add Kappil viewpoint between 4–5pm</li>
                <li>· Book Friday flight — 12% cheaper</li>
              </ul>
              <Button variant="secondary" size="sm" className="mt-4">Apply all</Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-sm font-medium mb-2">Invite a co-traveler</div>
              <div className="flex gap-2">
                <Input placeholder="friend@email.com" className="h-9" />
                <Button size="sm">Invite</Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
