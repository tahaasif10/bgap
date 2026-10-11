"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";

// TODO (Phase 5): validation, saving to the database, and email notifications.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" name="name" autoComplete="name" required />
        <Input label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Textarea label="Message" name="message" rows={6} required />

      <Button type="submit" variant="accent" size="lg">
        Send message
      </Button>

      {sent && (
        <p role="status" className="rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-800">
          This form is not connected yet, so nothing was sent. Messages will be enabled soon.
        </p>
      )}
    </form>
  );
}