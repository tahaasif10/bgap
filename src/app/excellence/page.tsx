import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Excellence" };

// TODO: the final name and content for this page will come from the client.
export default function ExcellencePage() {
  return (
    <>
      <PageHeader title="Excellence" description="Details coming soon." />
      <Section tone="white">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold md:text-3xl">Coming soon</h2>
          <p className="mt-3 text-lg text-muted">
            We are preparing this page. Please check back shortly.
          </p>
          <Button href="/" variant="outline" className="mt-6">
            Back to home
          </Button>
        </div>
      </Section>
    </>
  );
}