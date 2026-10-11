import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const details = [
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { label: "Address", value: siteConfig.address },
  ];

  return (
    <>
      <PageHeader title="Contact" description="Reach out to the Business Gap team." />
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold md:text-3xl">Get in touch</h2>
            <dl className="mt-6 space-y-5">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="text-sm text-muted">{d.label}</dt>
                  <dd className="mt-1 text-lg">
                    {d.href ? (
                      <a href={d.href} className="text-brand-700 underline underline-offset-4 hover:text-brand-800">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Card className="p-6 md:p-8 lg:col-span-7">
            <ContactForm />
          </Card>
        </div>
      </Section>
    </>
  );
}