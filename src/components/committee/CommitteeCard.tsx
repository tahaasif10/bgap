import Image from "next/image";
import type { CommitteeMember } from "@/data/committee";

export function CommitteeCard({ member }: { member: CommitteeMember }) {
  return (
    <li>
      <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-linear-to-br from-brand-100 to-brand-50">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <svg aria-hidden viewBox="0 0 100 125" className="absolute inset-0 size-full fill-brand-300">
            <circle cx="50" cy="48" r="18" />
            <path d="M12 125c0-24 17-40 38-40s38 16 38 40z" />
          </svg>
        )}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{member.name}</h3>
      <p className="mt-1 text-sm text-muted">{member.designation}</p>
      <p className="text-sm text-muted">{member.organisation}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-medium text-brand-700 underline underline-offset-4 hover:text-brand-800"
        >
          LinkedIn
        </a>
      )}
    </li>
  );
}