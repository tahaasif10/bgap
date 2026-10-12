"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

type Member = { number: string; name: string };
type State = { status: "loading" } | { status: "error" } | { status: "ready"; members: Member[] };

const PAGE_SIZE = 20;
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_URL;

function downloadCsv(members: Member[]) {
  // quote values, and neutralise anything a spreadsheet could read as a formula
  const esc = (v: string) => `"${(/^[=+\-@]/.test(v) ? "'" + v : v).replace(/"/g, '""')}"`;
  const lines = ["Number,Name", ...members.map((m) => `${esc(m.number)},${esc(m.name)}`)];
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "business-gap-members.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

export function MemberDirectory() {
  const [state, setState] = useState<State>(ENDPOINT ? { status: "loading" } : { status: "error" });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!ENDPOINT) return;
    let cancelled = false;
    fetch(`${ENDPOINT}?action=members`)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setState(json.ok ? { status: "ready", members: json.members } : { status: "error" });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const members = state.status === "ready" ? state.members : [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q) || m.number.toLowerCase().includes(q));
  }, [members, query]);

  if (state.status === "loading") {
    return <p role="status" className="text-muted">Loading members...</p>;
  }
  if (state.status === "error") {
    return (
      <p role="alert" className="max-w-xl rounded-md bg-accent-50 px-4 py-3 text-accent-700">
        The member list could not be loaded right now. Please try again later.
      </p>
    );
  }

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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted">
          {members.length === 0
            ? "No members listed yet."
            : filtered.length === 0
              ? "No members found."
              : `Showing ${start + 1}-${start + visible.length} of ${filtered.length} members`}
        </p>
        <Button variant="outline" size="sm" disabled={members.length === 0} onClick={() => downloadCsv(members)}>
          Download list (CSV)
        </Button>
      </div>

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
              {visible.map((m, i) => (
                <tr key={`${m.number}-${i}`}>
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