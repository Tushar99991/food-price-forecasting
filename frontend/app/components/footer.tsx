import Link from "next/link";

const developerLinks = [
  { label: "Email", href: "mailto:tushar2003oct30@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tusharpandey30/",
  },
  {
    label: "GitHub",
    href: "https://github.com/Tushar99991",
  },
  {
    label: "Portfolio",
    href: "https://tp-portfolio-inky.vercel.app/",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="absolute left-1/2 top-0 h-40 w-[500px] -translate-x-1/2 rounded-full bg-emerald-300/[0.035] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06]">
                <span className="text-emerald-300">↗</span>
              </div>

              <div>
                <div className="text-sm font-semibold tracking-[0.12em] text-white">
                  FOOD PRICE
                </div>

                <div className="text-[9px] tracking-[0.3em] text-emerald-300/60">
                  FORECASTING
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
              Data analytics, machine learning, and agricultural market
              intelligence brought together in one analytical project.
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-[9px] uppercase tracking-[0.2em] text-slate-700">
              Portfolio project
            </div>

            <div className="mt-2 text-sm text-slate-500">
              © 2026 Food Price Forecasting
            </div>

            <div className="mt-2 text-[10px] text-slate-700">
              Data Analytics • Machine Learning • Agricultural Markets
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:mt-12" />

        <div className="flex flex-col gap-7 py-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              Developer
            </div>

            <div className="mt-2 text-sm font-semibold text-white">
              TUSHAR PANDEY
            </div>

            <div className="mt-1 text-[10px] text-slate-700"></div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-[9px] uppercase tracking-[0.14em]">
            {developerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                className="text-slate-500 transition-colors duration-300 hover:text-emerald-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="mt-7 flex flex-col gap-3 text-[8px] uppercase tracking-[0.15em] text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:text-[9px] sm:tracking-[0.18em]">
          <span>Built with Python • Pandas • Machine Learning</span>

          <span>Turning historical data into future insight.</span>
        </div>
      </div>
    </footer>
  );
}
