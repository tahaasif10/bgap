import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  tone?: "paper" | "white" | "dark";
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

const tones = {
  paper: "bg-paper",
  white: "bg-white",
  dark: "bg-brand-950 text-white",
};

export function Section({ id, tone = "paper", title, description, className, children }: Props) {
  return (
    <section id={id} className={cn("py-16 md:py-24", tones[tone], className)}>
      <Container>
        {(title || description) && (
          <header className="mb-10 max-w-2xl">
            {title && <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>}
            {description && (
              <p className={cn("mt-3 text-lg", tone === "dark" ? "text-brand-100" : "text-muted")}>
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}