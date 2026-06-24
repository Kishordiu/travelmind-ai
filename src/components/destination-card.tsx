import { motion } from "framer-motion";
import { MapPin, TrendingUp, Shield, Users } from "lucide-react";
import type { Destination } from "@/lib/mock-data";
import { Badge } from "./ui/badge";

export function DestinationCard({ d, index = 0 }: { d: Destination; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-glow"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={d.image}
          alt={d.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {d.hidden && (
            <Badge className="bg-accent-gradient text-accent-foreground border-0 backdrop-blur">
              Hidden gem
            </Badge>
          )}
          <Badge className="glass text-foreground border-0">
            <TrendingUp className="h-3 w-3 mr-1" /> {d.match}% match
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs opacity-90">
            <MapPin className="h-3 w-3" />
            {d.location}, {d.country}
          </div>
          <h3 className="font-display text-xl font-semibold mt-0.5">{d.name}</h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{d.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {d.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <Stat label="From" value={`₹${(d.cost / 1000).toFixed(1)}k`} />
          <Stat label="Safety" value={`${d.safety}`} icon={<Shield className="h-3 w-3" />} tone="success" />
          <Stat label="Crowd" value={`${d.crowd}`} icon={<Users className="h-3 w-3" />} tone={d.crowd > 60 ? "warn" : "default"} />
        </div>
      </div>
    </motion.article>
  );
}

function Stat({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tone?: "default" | "success" | "warn";
}) {
  const toneClass =
    tone === "success" ? "text-success" : tone === "warn" ? "text-warning" : "text-foreground";
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-sm font-semibold flex items-center gap-1 ${toneClass}`}>
        {icon}
        {value}
      </div>
    </div>
  );
}
