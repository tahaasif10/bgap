import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

// Placeholder mark: two bars with a gap between them. Swap for the real logo later.
export function Logo({ variant = "dark", onClick }: { variant?: "dark" | "light"; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="inline-flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        <rect x="2" y="2" width="12" height="28" rx="2" className={variant === "dark" ? "fill-brand-700" : "fill-white"} />
        <rect x="18" y="12" width="12" height="18" rx="2" className="fill-accent-600" />
      </svg>
      <span className={cn("font-display text-xl font-semibold tracking-tight", variant === "dark" ? "text-brand-900" : "text-white")}>
        {siteConfig.name}
      </span>
    </Link>
  );
}