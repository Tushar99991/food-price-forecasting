"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navigation = [
  { href: "/", label: "Overview" },
  { href: "/analysis", label: "Analysis" },
  { href: "/forecasting", label: "Forecasting" },
  { href: "/methodology", label: "Methodology" },
];

const developerPortfolioUrl = "https://your-portfolio-url.com";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-3 transition-all duration-500 sm:px-5 ${
        scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-5"
      }`}
    >
      <nav
        className={`mx-auto w-full max-w-7xl transition-all duration-500 ${
          scrolled
            ? "rounded-2xl border border-white/10 bg-[#07130e]/90 shadow-[0_15px_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            : ""
        }`}
      >
        <div className="flex min-h-[72px] items-center justify-between gap-3 px-3 py-2 sm:min-h-[80px] sm:px-5 lg:px-7">
          <Link
            href="/"
            className="group relative flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="absolute -inset-3 rounded-2xl bg-emerald-400/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-300/20 bg-gradient-to-br from-emerald-300/20 via-emerald-400/10 to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] sm:h-12 sm:w-12">
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,rgba(110,231,183,0.25),transparent)]" />

              <span className="relative text-lg text-emerald-300 sm:text-xl">
                ↗
              </span>
            </div>

            <div className="relative min-w-0">
              <div className="truncate text-[13px] font-bold tracking-[0.1em] text-white sm:text-sm sm:tracking-[0.12em]">
                FOOD PRICE
              </div>

              <div className="mt-0.5 truncate bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text text-[8px] font-semibold tracking-[0.25em] text-transparent sm:text-[10px] sm:tracking-[0.34em]">
                FORECASTING
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.025] p-1.5 md:flex">
            {navigation.map(({ href, label }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-emerald-200"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-emerald-300/10 shadow-[0_0_25px_rgba(110,231,183,0.08)]" />
                  )}

                  {label}

                  {active && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                  )}
                </Link>
              );
            })}

            <a
              href={"https://tp-portfolio-inky.vercel.app/"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-full px-5 py-2.5 text-sm font-medium text-slate-400 transition-all duration-300 hover:text-white"
            >
              About Developer
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/forecasting"
              className="group relative hidden shrink-0 overflow-hidden rounded-full border border-emerald-300/25 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition-all duration-300 hover:border-emerald-300/50 hover:bg-emerald-300/15 hover:shadow-[0_0_30px_rgba(110,231,183,0.12)] lg:block"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Project{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            <Link
              href="/forecasting"
              className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-[10px] font-semibold text-emerald-200 transition-all duration-300 hover:bg-emerald-300/15 sm:px-4 sm:py-2.5 sm:text-xs md:hidden"
            >
              Explore
            </Link>

            <button
              type="button"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-300 transition-all duration-300 hover:border-emerald-300/25 hover:bg-emerald-300/10 hover:text-emerald-200 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
            mobileOpen
              ? "max-h-[560px] translate-y-0 border-t border-emerald-300/15 bg-[#06130d]/98 opacity-100 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
              : "max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <div className="px-3 pb-4 pt-3">
            <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2">
              {navigation.map(({ href, label }) => {
                const active = isActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`relative flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "bg-emerald-300/10 text-emerald-200"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-1.5 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                    )}

                    <span className={active ? "pl-2" : ""}>{label}</span>
                  </Link>
                );
              })}

              <a
                href={"https://tp-portfolio-inky.vercel.app/"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
              >
                About Developer
              </a>

              <Link
                href="/forecasting"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition-all duration-300 hover:border-emerald-300/35 hover:bg-emerald-300/15"
              >
                Explore Project →
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
