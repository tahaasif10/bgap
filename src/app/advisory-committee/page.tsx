import type { Metadata } from "next";
import { CommitteeCard } from "@/components/committee/CommitteeCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { committee } from "@/data/committee";

export const metadata: Metadata = { title: "Advisory Committee" };

export default function AdvisoryCommitteePage() {
  return (
    <>
      <PageHeader
        title="Advisory Committee"
        description="The people guiding Business Gap."
      />
      <Section tone="white">
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {committee.map((m) => (
            <CommitteeCard key={m.id} member={m} />
          ))}
        </ul>
      </Section>
    </>
  );
}