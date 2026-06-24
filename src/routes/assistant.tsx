import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MapPin, Wallet, Shield } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { destinations } from "@/lib/mock-data";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — TravelMind AI" }] }),
  component: Assistant,
});

type Msg = { id: string; role: "user" | "assistant"; text: string; rich?: "trip" };

const suggested = [
  "I have ₹8000, 3 days, and I like beaches and photography",
  "Suggest a safe and budget-friendly destination",
  "Plan a family trip near Chennai",
  "Find hidden gems with low crowd",
];

function Assistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "1",
      role: "assistant",
      text: "Hey Aanya 👋 I'm TravelMind. Tell me your budget, days, and what you're craving — I'll handle the rest.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, thinking]);

  function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: value };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            "Based on your vibe, I'd send you to Varkala Cliffs — a quieter, photogenic coastal pick within your budget. Here's a 3-day shape:",
          rich: "trip",
        },
      ]);
      setThinking(false);
    }, 1100);
  }

  return (
    <AppShell title="AI Assistant">
      <div className="h-[calc(100vh-4rem)] flex flex-col max-w-4xl mx-auto w-full">
        {/* Conversation */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
          {msgs.length === 1 && (
            <div className="text-center pt-6 pb-2">
              <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-hero-gradient shadow-glow mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-semibold">How can I help you travel smarter?</h2>
              <p className="text-sm text-muted-foreground mt-1">Try one of these to begin</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {suggested.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-2 rounded-full border border-border bg-card hover:border-primary/40 hover:shadow-elegant transition text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" ? (
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="h-8 w-8 rounded-lg bg-hero-gradient grid place-items-center shrink-0 shadow-glow">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="space-y-3 min-w-0">
                      <p className="text-sm leading-relaxed">{m.text}</p>
                      {m.rich === "trip" && <RichTripCard />}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm shadow-elegant">
                    {m.text}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {thinking && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-hero-gradient grid place-items-center shrink-0 animate-pulse-glow">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <div className="border-t border-border bg-background/80 backdrop-blur-xl p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-2 max-w-3xl mx-auto rounded-2xl border border-border bg-card p-2 shadow-card focus-within:border-primary/40 focus-within:shadow-glow transition"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Ask anything — budget, days, vibe…"
              className="flex-1 resize-none bg-transparent outline-none text-sm px-2 py-2 max-h-32 min-w-0"
            />
            <Button type="submit" size="icon" className="bg-hero-gradient text-white border-0 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            TravelMind can make mistakes. Verify bookings before paying.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function RichTripCard() {
  const d = destinations[0];
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="grid sm:grid-cols-[140px_1fr]">
        <img src={d.image} alt="" className="h-full w-full object-cover aspect-square sm:aspect-auto" />
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {d.location}
          </div>
          <h4 className="font-display text-lg font-semibold">{d.name}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{d.description}</p>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
            <Bit icon={<Wallet className="h-3 w-3" />} label="Budget" v="₹12.4k" />
            <Bit icon={<Shield className="h-3 w-3 text-success" />} label="Safety" v="88" />
            <Bit label="Match" v="96%" tone />
          </div>
          <div className="flex gap-2 pt-2">
            <Badge className="bg-hero-gradient text-white border-0">Save trip</Badge>
            <Badge variant="outline">Plan itinerary</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bit({ icon, label, v, tone }: { icon?: React.ReactNode; label: string; v: string; tone?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-sm font-semibold flex items-center gap-1 ${tone ? "text-primary" : ""}`}>
        {icon}{v}
      </div>
    </div>
  );
}
