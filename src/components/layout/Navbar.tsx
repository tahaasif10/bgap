"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { contactLink, navLinks, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn("size-4 transition-transform", open && "rotate-180")}>
      <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const itemActive = (item: NavItem) =>
    "children" in item ? item.children.some((c) => isActive(c.href)) : isActive(item.href);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo onClick={closeAll} />

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const active = itemActive(item);
            const linkCls = "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink hover:text-brand-700";
            const underline = active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent-600" />;

            if ("children" in item) {
              const open = openMenu === item.label;
              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    className={linkCls}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : item.label)}
                  >
                    {item.label}
                    <Chevron open={open} />
                    {underline}
                  </button>
                  {open && (
                    <ul className="absolute left-0 top-full mt-3 w-56 rounded-md border border-line bg-white p-1 shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeAll}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            className={cn("block rounded px-3 py-2 text-sm hover:bg-brand-50", isActive(child.href) && "font-semibold text-brand-700")}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link href={item.href} onClick={closeAll} aria-current={active ? "page" : undefined} className={linkCls}>
                  {item.label}
                  {underline}
                </Link>
              </li>
            );
          })}
          <li className="ml-3">
            <Button href={contactLink.href} variant="accent" size="sm" onClick={closeAll}>
              {contactLink.label}
            </Button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-brand-900 hover:bg-brand-50 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" strokeLinecap="round">
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-4 py-6 lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((item) =>
              "children" in item ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-lg font-medium hover:bg-brand-50"
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <Chevron open={openMenu === item.label} />
                  </button>
                  {openMenu === item.label && (
                    <ul className="ml-3 border-l border-line pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={closeAll} className="block rounded-md px-3 py-2.5 text-base text-muted hover:bg-brand-50 hover:text-ink">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn("block rounded-md px-3 py-3 text-lg font-medium hover:bg-brand-50", isActive(item.href) && "text-brand-700")}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Button href={contactLink.href} variant="accent" size="lg" className="mt-6 w-full" onClick={closeAll}>
            {contactLink.label}
          </Button>
        </div>
      )}
    </header>
  );
}