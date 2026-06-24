import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, RadialBarChart, RadialBar,
} from "recharts";
import { costTrend, segmentation, bookingProbabilityData, popularity } from "@/lib/mock-data";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Insights — TravelMind AI" }] }),
  component: Insights,
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontSize: 12,
};

function Insights() {
  return (
    <AppShell title="Insights">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
        <header>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">Travel intelligence</h1>
          <p className="text-muted-foreground mt-2">Patterns from our model and your last 12 months of behavior.</p>
        </header>

        <section className="grid lg:grid-cols-3 gap-4">
          <ChartCard title="Cost trend" hint="Domestic vs international" className="lg:col-span-2">
            <ResponsiveContainer>
              <AreaChart data={costTrend}>
                <defs>
                  <linearGradient id="d1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="d2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={tooltipStyle}/>
                <Area dataKey="domestic" stroke="var(--chart-1)" strokeWidth={2} fill="url(#d1)" />
                <Area dataKey="intl" stroke="var(--chart-3)" strokeWidth={2} fill="url(#d2)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Traveler segmentation" hint="You match Explorer">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={segmentation} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {segmentation.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle}/>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        <section className="grid lg:grid-cols-3 gap-4">
          <ChartCard title="Booking probability" hint="Best to book on Saturday">
            <ResponsiveContainer>
              <LineChart data={bookingProbabilityData}>
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 1]}/>
                <Tooltip contentStyle={tooltipStyle}/>
                <Line type="monotone" dataKey="prob" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4, fill: "var(--chart-1)" }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Destination popularity" hint="Views across the past 30 days">
            <ResponsiveContainer>
              <BarChart data={popularity}>
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }}/>
                <Bar dataKey="views" radius={[8, 8, 0, 0]} fill="var(--chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Recommendation confidence" hint="Average model confidence">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="55%" outerRadius="100%" data={[{ name: "conf", value: 87, fill: "var(--chart-1)" }]} startAngle={90} endAngle={-270}>
                <RadialBar background dataKey="value" cornerRadius={20} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground" style={{ fontSize: 28, fontWeight: 600 }}>
                  87%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">Insight</Badge>
            <h3 className="font-display text-lg font-semibold">What this means for you</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { t: "You over-pay 12% by booking Tuesdays. Friday flights save ~₹1,400 on average.", l: "Booking" },
              { t: "You consistently pick low-crowd destinations — you'll love the Hidden Gems feed.", l: "Preference" },
              { t: "Your cost prediction error is within ±₹600 — trust the planner's estimates.", l: "Model" },
            ].map((x) => (
              <div key={x.l} className="rounded-xl p-4 border border-border bg-muted/30">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{x.l}</div>
                <p className="text-sm mt-1">{x.t}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ChartCard({
  title, hint, className = "", children,
}: { title: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 shadow-card ${className}`}>
      <div className="mb-3">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}
