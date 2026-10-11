import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { institutes } from "@/data/institutes";

export const metadata: Metadata = { title: "Institute Members" };

export default function InstituteMembersPage() {
  return (
    <>
      <PageHeader
        title="Institute Members"
        description="Institutes that are part of Business Gap."
      />
      <Section tone="white">
        <p className="mb-6 text-sm text-muted">{institutes.length} institutes</p>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {institutes.map((inst) => (
            <li key={inst.id} className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="flex h-32 items-center justify-center bg-paper px-6">
                {inst.logo ? (
                  <Image
                    src={inst.logo}
                    alt=""
                    width={160}
                    height={80}
                    className="h-20 w-auto max-w-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-muted/60">Logo</span>
                )}
              </div>
              <p className="border-t border-line p-4 font-medium">{inst.name}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}