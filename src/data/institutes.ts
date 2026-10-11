export type Institute = {
  id: string;
  name: string;
  /** Path under /public, e.g. "/images/institutes/abc.png". Leave empty to show the name instead. */
  logo?: string;
};

// TODO: placeholder data. Replace with the client's real institutes and logos.
export const institutes: Institute[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: `Institute ${i + 1}`,
}));