import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = false,
  delay = 0,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative overflow-hidden rounded-2xl border border-border p-5 shadow-card ${
        accent ? "bg-hero-gradient text-white" : "bg-card"
      }`}
    >
      {accent && (
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
      )}
      <div className="flex items-start justify-between gap-2 relative">
        <div className="text-xs uppercase tracking-wider opacity-80">{label}</div>
        {icon && (
          <div className={`grid h-8 w-8 place-items-center rounded-lg ${accent ? "bg-white/15" : "bg-muted"}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 font-display text-3xl font-semibold tracking-tight relative">{value}</div>
      {hint && <div className="text-xs mt-1 opacity-80 relative">{hint}</div>}
    </motion.div>
  );
}
