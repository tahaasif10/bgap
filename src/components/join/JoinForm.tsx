"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

type Kind = "individual" | "institute";

const options: { value: Kind; label: string }[] = [
  { value: "individual", label: "Individual" },
  { value: "institute", label: "Institute" },
];

// TODO: fields are minimal until the client confirms what to collect.
// TODO (Phase 5): validation, saving to the database, and email notifications.
export function JoinForm() {
  const [kind, setKind] = useState<Kind>("individual");
  const [sent, setSent] = useState(false);

  function choose(k: Kind) {
    setKind(k);
    setSent(false);
  }

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Membership type"
        className="inline-flex rounded-md border border-line bg-paper p-1"
      >
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={kind === o.value}
            onClick={() => choose(o.value)}
            className={cn(
              "rounded px-4 py-2 text-sm font-medium transition-colors",
              kind === o.value ? "bg-brand-700 text-white" : "text-ink hover:bg-white",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* key resets the fields when switching type */}
      <form
        key={kind}
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        {kind === "individual" ? (
          <>
            <Input label="Full name" name="name" autoComplete="name" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Email" name="email" type="email" autoComplete="email" required />
              <Input label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" required />
            </div>
            <Input label="City" name="city" autoComplete="address-level2" required />
          </>
        ) : (
          <>
            <Input label="Institute name" name="institute" required />
            <Input label="Contact person" name="contact" autoComplete="name" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Email" name="email" type="email" autoComplete="email" required />
              <Input label="Phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
            <Input label="City" name="city" autoComplete="address-level2" required />
          </>
        )}
        <Textarea label="Anything you would like us to know (optional)" name="message" />

        <Button type="submit" variant="accent" size="lg">
          Submit request
        </Button>

        {sent && (
          <p role="status" className="rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-800">
            This form is not connected yet, so nothing was sent. Submissions will be enabled soon.
          </p>
        )}
      </form>
    </div>
  );
}