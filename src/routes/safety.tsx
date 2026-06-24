import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, CloudRain, Users, Moon, Phone, Hospital, Siren, Heart } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { safetyAlerts, emergencyContacts } from "@/lib/mock-data";

export const Route = createFileRoute("/safety")({
  head: () => ({ meta: [{ title: "Safety Intelligence — TravelMind AI" }] }),
  component: Safety,
});

function Safety() {
  return (
    <AppShell title="Safety Intelligence">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">Stay safe, stay informed</h1>
            <p className="text-muted-foreground mt-2">Live intelligence for your upcoming trip — Varkala, Kerala</p>
          </div>
          <Badge className="bg-success/15 text-success border-0">
            Overall risk · Low
          </Badge>
        </header>

        {/* Score hero */}
        <section className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-[280px_1fr]">
            <div className="p-8 bg-hero-gradient text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
              <ShieldCheck className="h-7 w-7 mb-3" />
              <div className="text-xs uppercase tracking-wider opacity-80">Safety score</div>
              <div className="font-display text-6xl font-semibold mt-2">88</div>
              <div className="mt-1 text-sm opacity-90">High confidence · updated 2h ago</div>
            </div>
            <div className="p-6 grid sm:grid-cols-3 gap-4">
              <RiskTile icon={<CloudRain className="h-4 w-4" />} label="Weather risk" v={28} tone="low" sub="Light rain expected" />
              <RiskTile icon={<Users className="h-4 w-4" />} label="Crowd risk" v={52} tone="med" sub="High footfall evenings" />
              <RiskTile icon={<Moon className="h-4 w-4" />} label="Night safety" v={84} tone="high" sub="Well-lit promenades" />
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-lg font-semibold mb-3">Active advisories</h3>
            <div className="space-y-3">
              {safetyAlerts.map((a, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-border p-4 bg-muted/20">
                  <div className={`h-9 w-9 rounded-lg grid place-items-center ${
                    a.level === "low" ? "bg-success/15 text-success" :
                    a.level === "medium" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
                  }`}>
                    {a.kind === "weather" ? <CloudRain className="h-4 w-4" /> :
                     a.kind === "crowd" ? <Users className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium capitalize">{a.kind} · {a.level}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 shadow-card">
            <Siren className="h-6 w-6 text-destructive mb-2" />
            <h3 className="font-display text-lg font-semibold">Emergency assistance</h3>
            <p className="text-xs text-muted-foreground mt-1">One tap to local services.</p>
            <Button variant="destructive" className="w-full mt-4 h-11">
              <Phone className="mr-2 h-4 w-4" /> SOS · Call now
            </Button>
            <div className="text-[11px] text-muted-foreground text-center mt-2">
              Shares your live location with trusted contacts
            </div>
          </div>
        </section>

        {/* Contacts & nearby */}
        <section className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-lg font-semibold mb-3">Emergency contacts</h3>
            <div className="space-y-2">
              {emergencyContacts.map((c) => (
                <div key={c.label} className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/40 transition">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center">
                      {c.type === "police" ? <Siren className="h-4 w-4 text-primary" /> :
                       c.type === "medical" ? <Hospital className="h-4 w-4 text-success" /> :
                       <Heart className="h-4 w-4 text-accent" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{c.label}</div>
                      <div className="text-xs text-muted-foreground">{c.number}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="mr-1 h-3 w-3" /> Call
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-lg font-semibold mb-3">Nearby essentials</h3>
            <div className="space-y-2">
              {[
                { l: "Govt Medical College", d: "1.2 km · 24/7 emergency", icon: Hospital, tone: "text-success" },
                { l: "Varkala Police Station", d: "0.8 km · English speaking", icon: Siren, tone: "text-primary" },
                { l: "Tourist Help Desk", d: "0.4 km · multilingual", icon: Heart, tone: "text-accent" },
                { l: "ATM · State Bank", d: "0.3 km · Open 24/7", icon: Hospital, tone: "text-foreground" },
              ].map((x) => (
                <div key={x.l} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center">
                    <x.icon className={`h-4 w-4 ${x.tone}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{x.l}</div>
                    <div className="text-xs text-muted-foreground">{x.d}</div>
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

function RiskTile({
  icon, label, v, tone, sub,
}: { icon: React.ReactNode; label: string; v: number; tone: "low" | "med" | "high"; sub: string }) {
  const toneClass = tone === "low" ? "text-success" : tone === "med" ? "text-warning" : "text-success";
  const toneBadge = tone === "low" ? "Low" : tone === "med" ? "Medium" : "High";
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">{icon} {label}</div>
        <span className={`text-xs font-semibold ${toneClass}`}>{toneBadge}</span>
      </div>
      <div className="font-display text-3xl font-semibold mt-2">{v}</div>
      <Progress value={v} className="mt-2" />
      <p className="text-xs text-muted-foreground mt-2">{sub}</p>
    </div>
  );
}
