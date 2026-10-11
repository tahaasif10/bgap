"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import type { IndividualMember } from "@/data/individual-members";

const PAGE_SIZE = 20;

export function MemberDirectory({ members }: { members: IndividualMember[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q) || m.number.toLowerCase().includes(q));
  }, [members, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="max-w-3xl">
      <Input
        label="Search members"
        type="search"
        placeholder="Search by name or number"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {filtered.length === 0
          ? "No members found."
          : `Showing ${start + 1}-${start + visible.length} of ${filtered.length} members`}
      </p>

      {filtered.length > 0 && (
        <div className="mt-3 overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left">
            <caption className="sr-only">Individual members</caption>
            <thead className="bg-paper text-sm text-muted">
              <tr>
                <th scope="col" className="w-36 px-5 py-3 font-medium">Number</th>
                <th scope="col" className="px-5 py-3 font-medium">Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {visible.map((m) => (
                <tr key={m.id}>
                  <td className="px-5 py-3.5 font-medium tabular-nums text-brand-700">{m.number}</td>
                  <td className="px-5 py-3.5">{m.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={current === 1} onClick={() => setPage(current - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted">
            Page {current} of {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={current === totalPages} onClick={() => setPage(current + 1)}>
            Next
          </Button>
        </nav>
      )}
    </div>
  );
}