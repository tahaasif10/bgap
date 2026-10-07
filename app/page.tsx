"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Set target date to exactly 1 month from today
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#f5eedf] flex flex-col justify-between overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Ambient Luxury Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18)_0%,rgba(180,135,35,0.06)_45%,transparent_75%)] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/2 -left-48 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(245,215,127,0.08)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-48 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09)_0%,transparent_70%)] blur-3xl" />

      {/* Subtle Luxury Grid Lines Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#d4af37_1px,transparent_1px),linear-gradient(to_bottom,#d4af37_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
      />

      {/* TOP NAVIGATION / HEADER */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        {/* Brand Emblem & Logo */}
        <div className="flex items-center gap-3.5 group cursor-default">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#2a2415] via-[#15130f] to-[#0a0907] p-[1px] shadow-lg shadow-black/60">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#d4af37] via-transparent to-[#fef3c7] opacity-40 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-full h-full rounded-[11px] bg-[#0c0b09] flex items-center justify-center">
              {/* Crest Monogram */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-[#f5d77f] drop-shadow-[0_0_8px_rgba(245,215,127,0.5)]"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Cinzel',serif] text-xl font-bold tracking-[0.25em] text-[#f7e7be] drop-shadow-sm">
                BGAP
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] px-1.5 py-0.5 rounded border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f5d77f] font-mono">
                Official
              </span>
            </div>
            <p className="text-[10px] tracking-[0.2em] text-[#a19a8a] uppercase font-light">
              Excellence Redefined
            </p>
          </div>
        </div>

        {/* Status Pill Badge & Share */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#d4af37]/25 bg-black/40 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5c378] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
            </span>
            <span className="text-xs tracking-wider uppercase text-[#e8dcbf] font-medium">
              Launch Sequence Active
            </span>
          </div>

          {/* Share / Copy Access Link */}
          <button
            onClick={handleCopyLink}
            aria-label="Share Link"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-white/[0.02] hover:bg-[#d4af37]/5 text-xs text-[#c2b9a7] hover:text-[#f3db98] transition-all cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>{copied ? "Link Copied!" : "Share"}</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto text-center w-full">
        {/* Luxury Teaser Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-gradient-to-r from-[#d4af37]/15 via-black/60 to-[#d4af37]/15 backdrop-blur-md mb-8 shadow-[0_0_20px_-3px_rgba(212,175,55,0.25)]">
          <svg
            className="w-3.5 h-3.5 text-[#f5d77f] animate-spin"
            style={{ animationDuration: "12s" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
          </svg>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#f7e7be]">
            Exclusive Worldwide Reveal
          </span>
          <span className="text-[#f5d77f] text-xs">✦</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-[1.15] max-w-4xl mb-6">
          <span className="block text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Something Extraordinary
          </span>
          <span className="text-gold-gradient block mt-2 drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]">
            Is Underway
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#b8b09f] font-light leading-relaxed mb-14">
          BGAP is curating a distinctive new digital benchmark built upon prestige, 
          precision, and visionary excellence. The countdown to our official unveiling has begun.
        </p>

        {/* COUNTDOWN TIMER CARDS (1 Month Countdown) */}
        <div className="w-full max-w-3xl mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINUTES", value: timeLeft.minutes },
              { label: "SECONDS", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group overflow-hidden rounded-2xl p-[1px] bg-gradient-to-b from-[#d4af37]/45 via-white/5 to-[#d4af37]/15 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
              >
                <div className="relative rounded-2xl bg-[#0b0a0d]/90 backdrop-blur-xl px-5 py-7 sm:py-9 flex flex-col items-center justify-center border border-[#d4af37]/15">
                  {/* Subtle inner top glow */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f5d77f]/40 to-transparent" />
                  
                  {/* Number */}
                  <span className="font-['Cinzel',serif] text-4xl sm:text-6xl font-bold text-gold-gradient tracking-tight drop-shadow-[0_2px_20px_rgba(212,175,55,0.35)]">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  
                  {/* Label */}
                  <span className="mt-3 text-[11px] sm:text-xs font-mono font-medium tracking-[0.28em] text-[#a69c8a] uppercase">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Concierge Contact Pill */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-xs sm:text-sm text-[#b5ad9e]">
          <span>For private inquiries:</span>
          <a
            href="mailto:contact@bgap.com"
            className="text-[#f5d77f] hover:underline font-medium transition-colors"
          >
            contact@bgap.com
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-xs text-[#787163]">
        <div className="flex items-center gap-2">
          <span className="font-['Cinzel',serif] tracking-wider text-[#b8b09f] font-semibold">
            BGAP
          </span>
          <span>© {new Date().getFullYear()} All Rights Reserved.</span>
        </div>

        {/* Inquiries & Legal Links */}
        <div className="flex items-center gap-6">
          <a
            href="mailto:contact@bgap.com"
            className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Concierge & Inquiries</span>
          </a>
          <a
            href="#"
            className="hover:text-[#f5d77f] transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Privacy Charter
          </a>
        </div>
      </footer>
    </div>
  );
}
