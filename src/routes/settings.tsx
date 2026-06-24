import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun, WifiOff, Bell, Globe, Wallet, Heart, LogOut } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — TravelMind AI" }] }),
  component: Settings,
});

const categories = ["Beach", "Mountain", "City", "Heritage", "Nature", "Food", "Adventure", "Wellness"];

function Settings() {
  const { theme, setTheme } = useTheme();
  const [budget, setBudget] = useState([45000]);
  const [picks, setPicks] = useState<string[]>(["Beach", "Nature", "Heritage"]);

  return (
    <AppShell title="Settings">
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <header className="rounded-3xl border border-border bg-card p-6 shadow-card flex items-center gap-5 flex-wrap">
          <Avatar className="h-16 w-16 ring-2 ring-border">
            <AvatarFallback className="bg-hero-gradient text-white text-lg">AR</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-semibold">Aanya Rao</h1>
            <p className="text-sm text-muted-foreground">aanya@travelmind.ai · Explorer segment</p>
          </div>
          <Button variant="outline">Edit profile</Button>
        </header>

        <Section title="Traveler preferences" icon={<Heart className="h-4 w-4 text-accent" />}>
          <div className="space-y-5">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Favorite categories</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((c) => {
                  const on = picks.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() =>
                        setPicks((p) => (on ? p.filter((x) => x !== c) : [...p, c]))
                      }
                      className={`text-xs px-3 py-1.5 rounded-full border transition ${
                        on
                          ? "bg-hero-gradient text-white border-transparent shadow-glow"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            <Field label="Travel style">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Backpacker", "Comfort", "Luxury", "Mix"].map((s, i) => (
                  <button
                    key={s}
                    className={`rounded-xl border p-3 text-sm transition ${
                      i === 1 ? "border-primary/50 bg-primary/5 text-foreground" : "border-border hover:border-foreground/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </Section>

        <Section title="Budget range" icon={<Wallet className="h-4 w-4 text-primary" />}>
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-muted-foreground">Per trip target</span>
            <span className="font-display text-2xl font-semibold">₹{budget[0].toLocaleString()}</span>
          </div>
          <Slider value={budget} onValueChange={setBudget} max={150000} step={2500} min={5000} />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>₹5k</span><span>₹1.5L</span>
          </div>
        </Section>

        <Section title="Appearance & language" icon={<Globe className="h-4 w-4 text-primary" />}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Theme</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`rounded-xl border p-3 text-sm flex items-center gap-2 ${theme === "light" ? "border-primary/50 bg-primary/5" : "border-border"}`}
                >
                  <Sun className="h-4 w-4" /> Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`rounded-xl border p-3 text-sm flex items-center gap-2 ${theme === "dark" ? "border-primary/50 bg-primary/5" : "border-border"}`}
                >
                  <Moon className="h-4 w-4" /> Dark
                </button>
              </div>
            </div>
            <Field label="Language">
              <Input defaultValue="English (India)" />
            </Field>
          </div>
        </Section>

        <Section title="App behavior" icon={<Bell className="h-4 w-4 text-primary" />}>
          <div className="space-y-3">
            <Toggle
              icon={<WifiOff className="h-4 w-4" />}
              title="Offline mode"
              hint="Save trips, maps and essentials for low-signal travel"
              defaultChecked
            />
            <Toggle
              icon={<Bell className="h-4 w-4" />}
              title="Safety alerts"
              hint="Get notified about live advisories at your destination"
              defaultChecked
            />
            <Toggle
              icon={<Wallet className="h-4 w-4" />}
              title="Price drop alerts"
              hint="When predicted cost falls more than 8%"
            />
          </div>
        </Section>

        <div className="flex justify-between items-center pt-2">
          <Button variant="outline" className="text-destructive border-destructive/40 hover:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
          <Button
            className="bg-hero-gradient text-white border-0 shadow-glow"
            onClick={() => toast.success("Preferences saved")}
          >
            Save changes
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-display text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Toggle({
  icon, title, hint, defaultChecked,
}: { icon: React.ReactNode; title: string; hint: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border p-4">
      <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center text-primary">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
