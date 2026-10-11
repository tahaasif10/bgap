"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import type { HeroSlide } from "@/data/hero-slides";
import { cn } from "@/lib/utils";

const INTERVAL = 6000;

const placeholders = [
  "from-brand-950 to-brand-700",
  "from-brand-900 to-brand-500",
  "from-brand-800 to-accent-700",
  "from-brand-950 to-brand-600",
];

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-5",
} as const;

const controlBtn =
  "inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-brand-900 transition-colors hover:bg-white";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const go = (i: number) => setIndex((i + count) % count);
  const playing = count > 1 && !hovered && !focused && !userPaused && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(t);
  }, [playing, index, count]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Event photos"
      className="relative h-[70svh] max-h-[760px] min-h-[420px] w-full touch-pan-y overflow-hidden bg-brand-950"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      {slides.map((s, i) => {
        const caption = s.caption && (
          <p className="max-w-xl font-display text-2xl text-white md:text-3xl">{s.caption}</p>
        );
        return (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            inert={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            {s.image ? (
              <Image src={s.image} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center bg-linear-to-br",
                  placeholders[i % placeholders.length],
                )}
              >
                <span className="font-display text-2xl text-white/50">Event photo {i + 1}</span>
              </div>
            )}

            {caption && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent pb-24 pt-24">
                <Container>
                  {s.href ? (
                    <Link href={s.href} className="inline-block hover:underline">
                      {caption}
                    </Link>
                  ) : (
                    caption
                  )}
                </Container>
              </div>
            )}
          </div>
        );
      })}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 pb-5">
          <Container className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                onClick={() => setUserPaused((v) => !v)}
                className={controlBtn}
              >
                {userPaused ? (
                  <svg {...iconProps}><path d="M7 5v14l12-7z" fill="currentColor" stroke="none" /></svg>
                ) : (
                  <svg {...iconProps}><path d="M8 5v14M16 5v14" /></svg>
                )}
              </button>
              <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={controlBtn}>
                <svg {...iconProps}><path d="m15 6-6 6 6 6" /></svg>
              </button>
              <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={controlBtn}>
                <svg {...iconProps}><path d="m9 6 6 6-6 6" /></svg>
              </button>
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}