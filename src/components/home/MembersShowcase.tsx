import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { institutes, type Institute } from "@/data/institutes";

function LogoTile({ inst }: { inst: Institute }) {
  return (
    <li className="mr-6 flex h-24 w-52 shrink-0 items-center justify-center rounded-lg bg-white px-5">
      {inst.logo ? (
        <Image src={inst.logo} alt={inst.name} width={160} height={64} className="h-16 w-auto max-w-full object-contain" />
      ) : (
        <span className="text-center text-sm font-medium text-muted">{inst.name}</span>
      )}
    </li>
  );
}

const linkCls = "font-medium text-white underline underline-offset-4 hover:text-brand-100";

export function MembersShowcase() {
  return (
    <section id="members" className="bg-brand-950 py-16 text-white md:py-24">
      <Container className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold md:text-4xl">Our Valued Members</h2>
          <p className="mt-3 text-lg text-brand-100">
            Institutes and individuals from across Pakistan who are part of the community.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/members/institutes" className={linkCls}>View institute members</Link>
          <Link href="/members/individual" className={linkCls}>View individual members</Link>
        </div>
      </Container>

      {/* Edge-to-edge marquee. Second list is a hidden copy that makes the loop seamless. */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <ul className="flex">
            {institutes.map((inst) => (
              <LogoTile key={inst.id} inst={inst} />
            ))}
          </ul>
          <ul className="flex" aria-hidden inert>
            {institutes.map((inst) => (
              <LogoTile key={inst.id} inst={inst} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}