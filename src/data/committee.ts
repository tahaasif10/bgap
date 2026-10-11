export type CommitteeMember = {
  id: string;
  name: string;
  designation: string;
  organisation: string;
  /** Path under /public, e.g. "/images/committee/name.jpg". Leave empty to show a placeholder. */
  photo?: string;
  linkedin?: string;
};

// TODO: placeholder data. Replace with the client's real committee details.
export const committee: CommitteeMember[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  name: `Member Name ${i + 1}`,
  designation: "Designation",
  organisation: "Organisation",
}));