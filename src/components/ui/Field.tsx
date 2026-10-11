import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Meta = { label: string; error?: string; hint?: string };

const control =
  "block w-full rounded-md border bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 disabled:opacity-60";

function Wrapper({ id, label, error, hint, children }: Meta & { id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-desc`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-desc`} className="mt-1.5 text-sm text-accent-700">
          {error}
        </p>
      )}
    </div>
  );
}

function aria(id: string, error?: string, hint?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? `${id}-desc` : undefined,
  };
}

export function Input({ label, error, hint, className, ...props }: ComponentProps<"input"> & Meta) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <input id={id} className={cn(control, error ? "border-accent-600" : "border-line", className)} {...aria(id, error, hint)} {...props} />
    </Wrapper>
  );
}

export function Textarea({ label, error, hint, className, ...props }: ComponentProps<"textarea"> & Meta) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <textarea id={id} rows={5} className={cn(control, error ? "border-accent-600" : "border-line", className)} {...aria(id, error, hint)} {...props} />
    </Wrapper>
  );
}

export function Select({ label, error, hint, className, children, ...props }: ComponentProps<"select"> & Meta) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <select id={id} className={cn(control, error ? "border-accent-600" : "border-line", className)} {...aria(id, error, hint)} {...props}>
        {children}
      </select>
    </Wrapper>
  );
}