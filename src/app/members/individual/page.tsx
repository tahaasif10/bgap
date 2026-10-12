import type { Metadata } from "next";
import { MemberDirectory } from "@/components/members/MemberDirectory";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Individual Members" };

export default function IndividualMembersPage() {
  return (
    <>
      <PageHeader
        title="Individual Members"
        description="Members of Business Gap from across Pakistan."
      />
      <Section tone="white">
        <MemberDirectory />
      </Section>
    </>
  );
}