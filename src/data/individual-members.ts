export type IndividualMember = {
  id: string;
  name: string;
  /** Assigned membership number. */
  number: string;
};

// TODO: placeholder data. Replace with the client's real member list
// (and confirm the membership number format with them).
export const individualMembers: IndividualMember[] = Array.from({ length: 120 }, (_, i) => ({
  id: String(i + 1),
  name: `Member Name ${i + 1}`,
  number: `BG-${String(i + 1).padStart(4, "0")}`,
}));