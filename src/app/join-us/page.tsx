import type { Metadata } from "next";
import { JoinForm } from "@/components/join/JoinForm";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Join Us" };

// TODO: placeholder steps. Confirm the real process with the client.
const steps = [
  "Choose your membership type.",
  "Fill in your details.",
  "We review your request and get in touch.",
];

export default function JoinUsPage() {
  return (
    <>
      <PageHeader
        title="Join Us"
        description="Become part of a community of business graduates and leaders across Pakistan."
      />
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold md:text-3xl">How it works</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-display text-2xl font-semibold text-accent-600">{i + 1}</span>
                  <span className="pt-1 text-lg text-muted">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <Card className="p-6 md:p-8 lg:col-span-7">
            <JoinForm />
          </Card>
        </div>
      </Section>
    </>
  );
}