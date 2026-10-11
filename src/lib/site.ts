export const siteConfig = {
  name: "Business Gap",
  // TODO: replace once the client decides on a tagline
  tagline: "Pakistan's business graduates, in one place.",
  description:
    "Business Gap is a community of business graduates and businessmen from across Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: replace with real details from the client
  email: "info@example.com",
  phone: "+92 000 0000000",
  address: "City, Pakistan",
};

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string } | { label: string; children: NavChild[] };

export const navLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Excellence", href: "/excellence" }, // TODO: final name from client
  { label: "Advisory Committee", href: "/advisory-committee" },
  {
    label: "Members Corner",
    children: [
      { label: "Individual Members", href: "/members/individual" },
      { label: "Institute Members", href: "/members/institutes" },
      { label: "Join Us", href: "/join-us" },
    ],
  },
];

export const contactLink = { label: "Contact", href: "/contact" };