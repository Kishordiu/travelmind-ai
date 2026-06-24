import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Compass, Sparkles, Wallet, ShieldCheck, Gem, Plane, ArrowRight, TrendingUp, MapPin,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { DestinationCard } from "@/components/destination-card";
import { destinations, costTrend, segmentation } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — TravelMind AI" },
      { name: "description", content: "Your personalized travel intelligence dashboard." },
    ],
  }),
  component: Dashboard,
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-hero-gradient p-6 sm:p-8 lg:p-10 text-white shadow-glow"
        >
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
            <div className="min-w-0">
              <Badge className="bg-white/15 text-white border-0 mb-4">Good morning, Aanya</Badge>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Your travel score is <span className="opacity-90">87</span> this month.
              </h1>
              <p className="mt-2 opacity-80 max-w-xl">
                Based on your preferences, 6 new destinations match your vibe — including 2 hidden gems near you.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/assistant">
                  <Button variant="secondary" className="h-10">
                    <Sparkles className="mr-2 h-4 w-4" /> Ask the AI
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button variant="outline" className="h-10 bg-transparent text-white border-white/30 hover:bg-white/10">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative shrink-0 grid grid-cols-3 gap-3 text-center">
              {[
                { l: "Trips", v: "12" },
                { l: "Saved", v: "34" },
                { l: "Countries", v: "8" },
              ].map((x) => (
                <div key={x.l} className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur min-w-[88px]">
                  <div className="font-display text-2xl font-semibold">{x.v}</div>
                  <div className="text-xs opacity-80">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stat cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Estimated budget"
            value="₹42.8k"
            hint={<><span className="text-success">▼ 8%</span> vs last month</>}
            icon={<Wallet className="h-4 w-4 text-primary" />}
            delay={0}
          />
          <StatCard
            label="Booking probability"
            value="82%"
            hint="Best to book by Friday"
            icon={<TrendingUp className="h-4 w-4 text-primary" />}
            delay={0.05}
          />
          <StatCard
            label="Safety score"
            value="92"
            hint="High — for upcoming trip"
            icon={<ShieldCheck className="h-4 w-4 text-success" />}
            delay={0.1}
          />
          <StatCard
            label="Hidden gems"
            value="6"
            hint="New near you"
            icon={<Gem className="h-4 w-4 text-accent" />}
            delay={0.15}
          />
        </section>

        {/* Middle grid */}
        <section className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="font-display text-lg font-semibold">Cost trend</h3>
                <p className="text-xs text-muted-foreground">Predicted travel cost over the year</p>
              </div>
              <Badge variant="outline">2025</Badge>
            </div>
            <div className="h-64 mt-3">
              <ResponsiveContainer>
                <AreaChart data={costTrend}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="domestic" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-lg font-semibold">Traveler type</h3>
            <p className="text-xs text-muted-foreground">You match the Explorer segment</p>
            <div className="h-44 mt-2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={segmentation} dataKey="value" innerRadius={42} outerRadius={70} paddingAngle={3}>
                    {segmentation.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {segmentation.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                    <span>{s.name}</span>
                  </div>
                  <span className="text-muted-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming trip */}
        <section className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="relative grid sm:grid-cols-[200px_1fr]">
              <img src={destinations[0].image} alt="" className="h-full w-full object-cover aspect-[4/3] sm:aspect-auto" />
              <div className="p-5 space-y-3">
                <Badge className="bg-success/15 text-success border-0 w-fit">Upcoming · in 12 days</Badge>
                <h3 className="font-display text-2xl font-semibold flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" /> Trip to Varkala
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> Kerala, India · 3 days
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <Mini label="Budget" v="₹12.4k" />
                  <Mini label="Safety" v="88" tone="success" />
                  <Mini label="Match" v="96%" tone="primary" />
                </div>
                <div className="pt-1">
                  <div className="text-xs text-muted-foreground mb-1">Planning progress</div>
                  <Progress value={72} />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card flex flex-col">
            <h3 className="font-display text-lg font-semibold">Quick actions</h3>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[
                { to: "/planner", label: "Plan trip", icon: Compass },
                { to: "/assistant", label: "Ask AI", icon: Sparkles },
                { to: "/gems", label: "Find gems", icon: Gem },
                { to: "/safety", label: "Safety", icon: ShieldCheck },
              ].map((a) => (
                <Link key={a.to} to={a.to}>
                  <div className="rounded-xl p-3 border border-border hover:border-primary/40 hover:bg-muted/40 transition group">
                    <a.icon className="h-4 w-4 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-medium">{a.label}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-4 text-xs text-muted-foreground">
              Tip: enable offline mode in Settings for trips with patchy signal.
            </div>
          </div>
        </section>

        {/* Recommended */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">Recommended for you</h2>
              <p className="text-sm text-muted-foreground">Hand-picked by your travel model</p>
            </div>
            <Link to="/explore"><Button variant="ghost" size="sm">See all <ArrowRight className="ml-1 h-3.5 w-3.5"/></Button></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.slice(0, 3).map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Mini({ label, v, tone = "default" }: { label: string; v: string; tone?: "default" | "primary" | "success" }) {
  const c = tone === "primary" ? "text-primary" : tone === "success" ? "text-success" : "text-foreground";
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-sm font-semibold ${c}`}>{v}</div>
    </div>
  );
}
