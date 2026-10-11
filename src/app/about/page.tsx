import type { Metadata } from "next";
import { CtaBanner } from "@/components/home/CtaBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "About" };

// TODO: all copy below is placeholder. Rewrite from the client's slides.
const offers = [
  {
    title: "Connect with peers",
    text: "Meet business graduates and business leaders from across Pakistan.",
  },
  {
    title: "Learn from experience",
    text: "Hear from people who have built, run, and grown real businesses.",
  },
  {
    title: "Find opportunities",
    text: "Discover partnerships, mentors, and openings through the network.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        description="A community of business graduates and business leaders from across Pakistan."
      />

      <Section tone="white" title="Who we are">
        <div className="max-w-3xl space-y-4 text-lg text-muted">
          <p>
            Business Gap brings together business graduates, professionals, and institutes from
            every part of Pakistan. We believe that the right network can close the gap between
            education and real business.
          </p>
          <p>
            Our members come from different cities, industries, and stages of their careers, but
            share one goal: to learn from each other and grow together.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border-l-4 border-brand-700 pl-6">
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p className="mt-3 text-lg text-muted">
              To connect Pakistan&apos;s business graduates and leaders and help them grow through
              shared knowledge and opportunity.
            </p>
          </div>
          <div className="border-l-4 border-accent-600 pl-6">
            <h2 className="text-2xl font-semibold">Our vision</h2>
            <p className="mt-3 text-lg text-muted">
              A strong, connected business community across the whole country.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" title="What members get">
        <dl className="divide-y divide-line border-y border-line">
          {offers.map((o) => (
            <div key={o.title} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
              <dt className="font-display text-xl font-semibold md:col-span-4">{o.title}</dt>
              <dd className="text-lg text-muted md:col-span-8">{o.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBanner />
    </>
  );
}