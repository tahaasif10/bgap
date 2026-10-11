export type HeroSlide = {
  id: string;
  /** Path under /public, e.g. "/images/hero/event-1.jpg". Leave empty to show a placeholder. */
  image?: string;
  alt: string;
  /** Optional text over the photo. Leave empty for a photo-only slide. */
  caption?: string;
  /** Optional link; only used when there is a caption. */
  href?: string;
};

// Placeholder data. Replace with real event photos once the client sends them.
export const heroSlides: HeroSlide[] = [
  { id: "1", alt: "Business Gap event, photo 1" },
  { id: "2", alt: "Business Gap event, photo 2" },
  { id: "3", alt: "Business Gap event, photo 3" },
  { id: "4", alt: "Business Gap event, photo 4" },
];