import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/site";

const explore = navLinks.filter((i): i is { label: string; href: string } => "href" in i);
const members = navLinks.flatMap((i) => ("children" in i ? i.children : []));

const linkCls = "text-brand-100 hover:text-white";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-brand-100">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Explore">
          <h2 className="font-sans text-sm font-semibold">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((l) => (
              <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
            ))}
            <li><Link href="/contact" className={linkCls}>Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Members Corner">
          <h2 className="font-sans text-sm font-semibold">Members Corner</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {members.map((l) => (
              <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold">Get in touch</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-100">
            <li><a href={`mailto:${siteConfig.email}`} className={linkCls}>{siteConfig.email}</a></li>
            <li><a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={linkCls}>{siteConfig.phone}</a></li>
            <li>{siteConfig.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 text-sm text-brand-300">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}