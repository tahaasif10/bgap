import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-brand-50 text-brand-800",
  red: "bg-accent-50 text-accent-700",
  neutral: "bg-line/60 text-ink",
};

export function Badge({
  tone = "blue",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}