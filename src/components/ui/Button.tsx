import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800",
  accent: "bg-accent-600 text-white hover:bg-accent-700",
  outline: "border border-brand-700 text-brand-700 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-7 text-base",
};

export function Button({ variant = "primary", size = "md", className, ...props }: AsButton | AsLink) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return <Link href={href} className={cls} {...rest} />;
  }
  return <button type="button" className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}