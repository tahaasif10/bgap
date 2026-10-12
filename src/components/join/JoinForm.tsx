"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { submitForm } from "@/lib/submitForm";
import { cn } from "@/lib/utils";

type Kind = "individual" | "institute";
type Status = "idle" | "sending" | "success" | "error";

const options: { value: Kind; label: string }[] = [
  { value: "individual", label: "Individual" },
  { value: "institute", label: "Institute" },
];

// TODO: fields are minimal until the client confirms what to collect.
export function JoinForm() {
  const [kind, setKind] = useState<Kind>("individual");
  const [status, setStatus] = useState<Status>("idle");

  function choose(k: Kind) {
    setKind(k);
    setStatus("idle");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // keep a reference, it is cleared after an await
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    setStatus("sending");
    const result = await submitForm({
      ...data,
      form: "join",
      type: kind,
      // institutes fill "contact person"; the sheet also stores it as the name
      name: kind === "institute" ? data.contact ?? "" : data.name ?? "",
      consent: data.consent ? "Yes" : "No",
    });

    if (result.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
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
      <form key={kind} className="mt-6 space-y-5" onSubmit={onSubmit}>
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

        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" name="consent" required className="mt-0.5 size-4 accent-brand-700" />
          <span>
            I agree to my name and membership number being listed publicly on this website if my
            request is approved.
          </span>
        </label>

        {/* Spam trap: real visitors never see or fill this */}
        <div aria-hidden className="absolute -left-[9999px]">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" variant="accent" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Submit request"}
        </Button>

        {status === "success" && (
          <p role="status" className="rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-800">
            Thank you. We have received your request and will be in touch.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="rounded-md bg-accent-50 px-4 py-3 text-sm text-accent-700">
            Something went wrong and your request was not sent. Please try again, or contact us directly.
          </p>
        )}
      </form>
    </div>
  );
}