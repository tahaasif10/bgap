"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { submitForm } from "@/lib/submitForm";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // keep a reference, it is cleared after an await
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    setStatus("sending");
    const result = await submitForm({ ...data, form: "contact" });

    if (result.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" name="name" autoComplete="name" required />
        <Input label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Textarea label="Message" name="message" rows={6} required />

      {/* Spam trap: real visitors never see or fill this */}
      <div aria-hidden className="absolute -left-[9999px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>

      {status === "success" && (
        <p role="status" className="rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-800">
          Thank you. Your message has been sent.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="rounded-md bg-accent-50 px-4 py-3 text-sm text-accent-700">
          Something went wrong and your message was not sent. Please try again later.
        </p>
      )}
    </form>
  );
}