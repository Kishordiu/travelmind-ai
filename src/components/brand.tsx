import { Link } from "@tanstack/react-router";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <span className="relative inline-grid h-8 w-8 place-items-center rounded-lg bg-hero-gradient shadow-glow">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2l3.5 7L22 10l-5.5 4.5L18 22l-6-3.5L6 22l1.5-7.5L2 10l6.5-1L12 2z" strokeLinejoin="round" />
        </svg>
        <span className="absolute inset-0 rounded-lg blur-md bg-hero-gradient opacity-50 -z-10 group-hover:opacity-80 transition" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        TravelMind <span className="text-gradient">AI</span>
      </span>
    </Link>
  );
}
