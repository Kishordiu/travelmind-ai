import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Sparkles,
  Shield,
  Gem,
  BarChart3,
  CalendarRange,
  MapPin,
  Star,
  Plane,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { destinations } from "@/lib/mock-data";
import { DestinationCard } from "@/components/destination-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TravelMind AI — Discover smarter travel with AI" },
      {
        name: "description",
        content:
          "TravelMind AI plans personalized trips, predicts cost and safety, and uncovers hidden gems. The intelligent travel companion for smarter trips.",
      },
      { property: "og:title", content: "TravelMind AI" },
      { property: "og:description", content: "The intelligent travel companion for smarter trips." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <DestinationsSection />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        <Brand />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#destinations" className="hover:text-foreground transition">Destinations</a>
          <Link to="/insights" className="hover:text-foreground transition">Insights</Link>
          <Link to="/assistant" className="hover:text-foreground transition">AI Assistant</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" className="bg-hero-gradient text-white border-0 shadow-glow">
              Launch app <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge variant="outline" className="gap-1.5 py-1 pl-1.5 pr-3 border-border/60">
            <span className="grid place-items-center h-5 w-5 rounded-full bg-hero-gradient">
              <Sparkles className="h-3 w-3 text-white" />
            </span>
            Powered by intelligent travel models
          </Badge>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            Discover smarter <br />
            travel with <span className="text-gradient">AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Personalized destinations, predicted costs, safety intelligence and hidden gems —
            all woven into one calm, premium travel companion.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/explore">
              <Button size="lg" className="bg-hero-gradient text-white border-0 shadow-glow h-12 px-6">
                Explore Destinations <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/planner">
              <Button size="lg" variant="outline" className="h-12 px-6">
                Plan My Trip
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["A", "M", "R", "S"].map((c, i) => (
                <div
                  key={c}
                  className="h-7 w-7 rounded-full ring-2 ring-background grid place-items-center text-[10px] font-semibold text-white"
                  style={{ background: `oklch(0.6 0.18 ${200 + i * 30})` }}
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
              <span className="ml-1">4.9 from 12,400+ travelers</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-glow">
            <img
              src={heroImg}
              alt="World map with glowing flight paths"
              width={1536}
              height={1024}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <FloatingCard className="top-6 left-6" delay={0.3}>
              <div className="flex items-center gap-2 text-xs">
                <Plane className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">BLR → CMB</span>
                <span className="font-semibold text-success">82% match</span>
              </div>
            </FloatingCard>
            <FloatingCard className="bottom-6 right-6" delay={0.5}>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Predicted cost</div>
              <div className="font-display text-xl font-semibold">₹38,400</div>
              <div className="text-xs text-success">▼ 12% vs avg</div>
            </FloatingCard>
            <FloatingCard className="top-1/2 right-10 -translate-y-1/2 hidden md:block" delay={0.7}>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Safety</div>
                  <div className="text-sm font-semibold">High · 92</div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute glass rounded-xl px-3 py-2 shadow-card animate-float ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Stats() {
  const items = [
    { v: "120k+", l: "Trips planned" },
    { v: "94%", l: "Recommendation accuracy" },
    { v: "180", l: "Countries covered" },
    { v: "4.9★", l: "Average rating" },
  ];
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <div className="font-display text-3xl font-semibold text-gradient">{s.v}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: Compass, t: "Smart recommendations", d: "Models trained on traveler patterns surface destinations that actually fit you." },
    { icon: BarChart3, t: "Cost & booking prediction", d: "Know what a trip will cost and the best window to book before you commit." },
    { icon: Shield, t: "Safety intelligence", d: "Live safety scoring, crowd levels and emergency contacts wherever you go." },
    { icon: Gem, t: "Hidden gems", d: "Discover quiet places loved by locals — not the front page of every blog." },
    { icon: Sparkles, t: "AI itinerary planner", d: "Tell us your budget and vibe. Get a day-by-day plan in seconds." },
    { icon: CalendarRange, t: "Offline-ready", d: "Save trips, maps and essentials for when the signal disappears." },
  ];
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="max-w-2xl mb-12">
        <Badge variant="outline" className="mb-3">Features</Badge>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold">Everything a modern traveler needs, distilled.</h2>
        <p className="text-muted-foreground mt-3">
          One refined surface for discovery, planning, safety and intelligence — no clutter.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {feats.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group rounded-2xl p-6 border border-border bg-card shadow-card hover:shadow-glow transition-all"
          >
            <div className="h-10 w-10 rounded-xl bg-hero-gradient grid place-items-center shadow-glow mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display font-semibold text-lg">{f.t}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
        <div>
          <Badge variant="outline" className="mb-3">Trending</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">Curated for you</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">A glimpse of what travelers like you are loving this season.</p>
        </div>
        <Link to="/explore">
          <Button variant="ghost">View all <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.slice(0, 3).map((d, i) => (
          <DestinationCard key={d.id} d={d} index={i} />
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const tests = [
    { n: "Aanya R.", r: "Product Designer", t: "It nailed the vibe I wanted and saved me three hours of research. The cost prediction was within ₹400." },
    { n: "Marco D.", r: "Photographer", t: "The hidden gems section is the entire reason I'll keep using this. Found a fishing village I'd never have." },
    { n: "Priya S.", r: "Solo traveler", t: "Safety intelligence feels like having a local friend. The night-safety score made me trust new places faster." },
  ];
  return (
    <section className="bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-center">Loved by curious travelers</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {tests.map((t, i) => (
            <motion.figure
              key={t.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 border border-border bg-card shadow-card"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />)}
              </div>
              <blockquote className="text-sm leading-relaxed">"{t.t}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-hero-gradient text-white grid place-items-center text-xs font-semibold">
                  {t.n[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl p-10 lg:p-16 bg-hero-gradient text-white shadow-glow">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative max-w-2xl">
          <MapPin className="h-8 w-8 mb-4 opacity-90" />
          <h2 className="font-display text-3xl lg:text-5xl font-semibold leading-tight">
            Your next trip starts with one smart conversation.
          </h2>
          <p className="mt-4 opacity-90">
            Tell TravelMind your budget, the days you have, and the kind of trip you want. We'll handle the rest.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/assistant">
              <Button size="lg" variant="secondary" className="h-12 px-6">
                Try the AI assistant
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="h-12 px-6 bg-transparent text-white border-white/30 hover:bg-white/10">
                Open dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Brand />
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            The intelligent travel companion for smarter trips.
          </p>
        </div>
        {[
          { t: "Product", l: ["Explore", "Planner", "Assistant", "Insights"] },
          { t: "Resources", l: ["Safety guide", "Hidden gems", "Cost tracker", "API"] },
          { t: "Company", l: ["About", "Careers", "Press", "Contact"] },
        ].map((g) => (
          <div key={g.t}>
            <div className="text-sm font-semibold mb-3">{g.t}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {g.l.map((x) => <li key={x}><a className="hover:text-foreground" href="#">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TravelMind AI · Crafted with intent.
      </div>
    </footer>
  );
}
