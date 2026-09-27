"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";

import Footer from "./components/footer";

const stats = [
  { value: "484,504", label: "Market observations" },
  { value: "2015–2025", label: "Historical coverage" },
  { value: "9", label: "Forecasting crops" },
  { value: "1.99%", label: "Forecast MAPE" },
];

const features = [
  {
    number: "01",
    title: "Market Intelligence",
    description:
      "Analyze long-term food price movements across crops, markets, states, seasons, and historical periods.",
    tag: "DATA ANALYSIS",
  },
  {
    number: "02",
    title: "Seasonal Patterns",
    description:
      "Explore recurring monthly behavior, price volatility, crop-level trends, and changing agricultural market conditions.",
    tag: "PATTERN DISCOVERY",
  },
  {
    number: "03",
    title: "Price Forecasting",
    description:
      "Use engineered time-series features and machine learning to forecast the following month's crop prices.",
    tag: "MACHINE LEARNING",
  },
];

const methodology = [
  {
    number: "01",
    title: "Data ingestion",
    description: "Market price records",
  },
  {
    number: "02",
    title: "Data cleaning",
    description: "Validation & anomaly handling",
  },
  {
    number: "03",
    title: "Feature engineering",
    description: "Temporal & statistical features",
  },
  {
    number: "04",
    title: "Model evaluation",
    description: "Chronological validation",
  },
];

// Replace these placeholder values with your actual developer details.
const developerLinks = [
  { label: "Email", href: "mailto:YOUR_EMAIL@example.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME" },
  { label: "GitHub", href: "https://github.com/YOUR_GITHUB_USERNAME" },
  { label: "Portfolio", href: "https://YOUR_PORTFOLIO_URL" },
];

const projectSnapshot = [
  { value: "484,504", label: "Raw market observations" },
  { value: "1,210", label: "Monthly price observations" },
  { value: "58", label: "Forecasting features" },
  { value: "243", label: "Test observations" },
];

export default function Home() {
  const [tableauZoom, setTableauZoom] = useState(1);
  const tableauEmbedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = tableauEmbedRef.current;
    if (!container) return;

    let cancelled = false;
    let viz: HTMLElement | null = null;

    const mountTableau = () => {
      if (cancelled || !container) return;

      container.innerHTML = "";

      viz = document.createElement("tableau-viz");
      viz.setAttribute(
        "src",
        "https://public.tableau.com/views/FoodPriceForecasting/Homepage",
      );
      viz.setAttribute("toolbar", "bottom");
      viz.setAttribute("device", "desktop");
      viz.setAttribute("width", "1200px");
      viz.setAttribute("height", "1200px");
      viz.style.display = "block";
      viz.style.width = "1200px";
      viz.style.height = "1200px";

      container.appendChild(viz);
    };

    const existingScript = document.querySelector(
      'script[data-tableau-embedding-api="v3"]',
    );

    if (customElements.get("tableau-viz")) {
      mountTableau();
    } else if (existingScript) {
      customElements.whenDefined("tableau-viz").then(() => {
        if (!cancelled) mountTableau();
      });
    } else {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
      script.dataset.tableauEmbeddingApi = "v3";
      script.onload = () => {
        customElements.whenDefined("tableau-viz").then(() => {
          if (!cancelled) mountTableau();
        });
      };
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (viz && viz.parentNode === container) {
        container.removeChild(viz);
      }
    };
  }, []);

  useEffect(() => {
    const updateResponsiveZoom = () => {
      const viewportWidth = window.innerWidth;
      const availableWidth = Math.max(320, viewportWidth - 24);
      const responsiveZoom =
        viewportWidth <= 1024
          ? Math.min(1, Math.max(0.4, availableWidth / 900))
          : 1;

      setTableauZoom(Number(responsiveZoom.toFixed(2)));
    };

    updateResponsiveZoom();
    window.addEventListener("resize", updateResponsiveZoom);

    return () => {
      window.removeEventListener("resize", updateResponsiveZoom);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#040b08] text-white selection:bg-emerald-300 selection:text-[#04100b]">
      {/* =========================================================
          GLOBAL BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.13),transparent_30%),radial-gradient(circle_at_85%_25%,rgba(132,204,22,0.08),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(20,184,166,0.08),transparent_30%)]" />

        <div className="absolute left-[-20%] top-[-10%] h-[450px] w-[450px] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-emerald-500/10 blur-[120px] sm:h-[600px] sm:w-[600px] sm:blur-[150px]" />

        <div className="absolute right-[-25%] top-[15%] h-[400px] w-[400px] animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-lime-400/[0.06] blur-[120px] sm:h-[550px] sm:w-[550px] sm:blur-[150px]" />

        <div className="absolute bottom-[-20%] left-[25%] h-[450px] w-[450px] animate-[pulse_12s_ease-in-out_infinite] rounded-full bg-teal-400/[0.05] blur-[130px] sm:h-[600px] sm:w-[600px] sm:blur-[170px]" />

        <div
          className="absolute inset-0 opacity-[0.025] sm:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,11,8,0.5)_100%)]" />
      </div>

      {/* =========================================================
          SHARED NAVBAR
      ========================================================= */}

      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative flex min-h-screen w-full items-center px-5 pb-16 pt-40 sm:px-6 sm:pb-20 sm:pt-48 lg:px-8 lg:pt-32">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="relative z-10 min-w-0">
            {/* Badge */}

            <div className="mb-7 inline-flex max-w-full animate-[fadeIn_0.8s_ease-out] items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-300 sm:px-4 sm:text-[10px] sm:tracking-[0.2em]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
              </span>
              Data Analytics & Machine Learning
            </div>

            {/* Heading */}

            <h1 className="max-w-5xl animate-[fadeInUp_0.9s_ease-out] text-[clamp(2.75rem,11vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              Understanding
              <span className="relative block">
                <span className="absolute -inset-x-2 bottom-0 h-8 bg-emerald-400/10 blur-2xl sm:-inset-x-4" />

                <span className="relative bg-gradient-to-r from-emerald-200 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                  food prices
                </span>
              </span>
              through data.
            </h1>

            {/* Description */}

            <p className="mt-7 max-w-2xl animate-[fadeInUp_1.1s_ease-out] text-sm leading-7 text-slate-400 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
              A data-driven exploration of agricultural market prices, seasonal
              behavior, crop-level trends, and machine learning forecasts across
              more than a decade of historical observations.
            </p>

            {/* Buttons */}

            <div className="mt-9 flex w-full max-w-xl animate-[fadeInUp_1.3s_ease-out] flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <a
                href="/analysis"
                className="group relative inline-flex min-h-[50px] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-emerald-300 to-lime-300 px-6 py-3.5 text-center text-sm font-bold text-[#04100b] shadow-[0_0_35px_rgba(110,231,183,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(110,231,183,0.2)] sm:w-auto sm:min-w-[190px] sm:px-7"
              >
                <span className="relative z-10">Explore the analysis</span>

                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>

              <a
                href="/forecasting"
                className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-center text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/20 hover:bg-white/[0.06] sm:w-auto sm:min-w-[180px] sm:px-7"
              >
                View forecasting
                <span className="text-emerald-300 transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>

            {/* Dashboard navigation */}
            <div className="mt-4 flex w-full max-w-xl flex-col gap-3 animate-[fadeInUp_1.45s_ease-out] sm:flex-row sm:gap-4">
              <a
                href="#tableau-dashboard"
                className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full border border-emerald-300/15 bg-emerald-300/[0.045] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-emerald-300/[0.08] sm:w-auto"
              >
                Go to Tableau
              </a>

              <a
                href="#powerbi-dashboard"
                className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/20 hover:bg-white/[0.06] sm:w-auto"
              >
                Go to Power BI
              </a>
            </div>

            {/* Tech Strip */}

            <div className="mt-11 flex max-w-full flex-wrap items-center gap-x-3 gap-y-2 text-[8px] uppercase tracking-[0.13em] text-slate-600 sm:mt-14 sm:gap-4 sm:text-[10px] sm:tracking-[0.18em]">
              <div className="hidden h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/40 sm:block" />

              <span>AGMARKNET</span>

              <span className="text-emerald-400/30">•</span>

              <span>Python</span>

              <span className="text-emerald-400/30">•</span>

              <span>Pandas</span>

              <span className="text-emerald-400/30">•</span>

              <span>Machine Learning</span>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-[540px]">
              <div className="absolute inset-4 animate-[spin_35s_linear_infinite] rounded-full border border-emerald-300/[0.08] border-dashed" />

              <div className="absolute inset-12 rounded-full border border-emerald-300/[0.08]" />

              <div className="absolute inset-24 animate-[spin_25s_linear_infinite_reverse] rounded-full border border-lime-300/[0.08] border-dashed" />

              <div className="absolute inset-36 rounded-full border border-emerald-300/[0.08]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-64 w-64 animate-pulse rounded-full bg-emerald-400/[0.035] blur-3xl" />

                <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border border-emerald-300/20 bg-[#07130e]/80 shadow-[0_0_100px_rgba(52,211,153,0.08)] backdrop-blur-xl">
                  <div className="absolute inset-2 rounded-full border border-white/5" />

                  <span className="relative bg-gradient-to-b from-emerald-200 to-emerald-400 bg-clip-text text-5xl font-semibold text-transparent">
                    11
                  </span>

                  <span className="relative mt-1 text-[9px] uppercase tracking-[0.35em] text-slate-500">
                    Years
                  </span>
                </div>
              </div>

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 540 540"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="70"
                    y1="400"
                    x2="470"
                    y2="140"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#34d399" stopOpacity="0.05" />

                    <stop offset="0.5" stopColor="#6ee7b7" stopOpacity="0.55" />

                    <stop offset="1" stopColor="#bef264" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                <path
                  d="M65 390 C115 350, 125 370, 165 330 S225 295, 260 315 S325 245, 360 270 S420 215, 475 145"
                  stroke="url(#chartGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="700"
                  strokeDashoffset="700"
                  className="animate-[drawLine_3s_ease-out_forwards]"
                />

                <path
                  d="M65 420 C120 390, 145 405, 190 380 S270 340, 315 355 S390 320, 475 285"
                  stroke="rgba(110,231,183,0.1)"
                  strokeWidth="1"
                  strokeDasharray="6 9"
                />

                <circle
                  cx="475"
                  cy="145"
                  r="5"
                  fill="#a7f3d0"
                  className="animate-pulse"
                />

                <circle cx="360" cy="270" r="3" fill="#6ee7b7" opacity="0.7" />

                <circle cx="260" cy="315" r="3" fill="#6ee7b7" opacity="0.5" />
              </svg>

              <div className="absolute left-[2%] top-[22%] animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-[#0a1712]/75 px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
                  Observations
                </div>

                <div className="mt-1 text-2xl font-semibold text-white">
                  484,504
                </div>
              </div>

              <div className="absolute bottom-[13%] right-[-2%] animate-[float_7s_ease-in-out_infinite_reverse] rounded-2xl border border-emerald-300/10 bg-[#0a1712]/80 px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
                  Forecast MAPE
                </div>

                <div className="mt-1 text-2xl font-semibold text-emerald-300">
                  1.99%
                </div>
              </div>

              <div className="absolute right-[8%] top-[11%] rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[8px] uppercase tracking-wider text-slate-500 backdrop-blur-md">
                Price trend
              </div>

              <div className="absolute bottom-[20%] left-[8%] rounded-full border border-emerald-300/10 bg-emerald-300/[0.03] px-3 py-1.5 text-[8px] uppercase tracking-wider text-emerald-300/60 backdrop-blur-md">
                + Forecast
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-slate-600 sm:flex">
          <span>Scroll to explore</span>

          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-emerald-300/50 to-transparent" />
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="relative border-y border-white/[0.06] bg-white/[0.012]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/[0.025] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/[0.06] lg:grid-cols-4 lg:divide-y-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden px-5 py-9 sm:px-6 sm:py-12 lg:px-10"
            >
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              <div className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-200 sm:text-3xl lg:text-4xl">
                {stat.value}
              </div>

              <div className="mt-2 text-[8px] uppercase tracking-[0.14em] text-slate-600 transition-colors duration-300 group-hover:text-slate-400 sm:text-[9px] sm:tracking-[0.18em]">
                {stat.label}
              </div>

              <div className="mt-4 h-px w-7 bg-emerald-300/20 transition-all duration-500 group-hover:w-14 group-hover:bg-emerald-300/60" />

              <span className="absolute right-4 top-4 text-[8px] text-slate-800">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================= */}

      <section
        id="overview"
        className="relative px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-300/60" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300 sm:text-[10px] sm:tracking-[0.28em]">
                  The project
                </p>
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                From raw market records
                <span className="block bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                  to meaningful insights.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:justify-self-end">
              This project follows agricultural market prices from raw
              observations through cleaning, exploratory analysis, feature
              engineering, and time-aware machine learning evaluation to
              understand historical behavior and forecast future prices.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-7 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300/20 hover:shadow-[0_25px_70px_rgba(0,0,0,0.3)] sm:p-8 lg:p-10"
                style={{ animationDelay: `${Number(feature.number) * 120}ms` }}
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-300/[0.06] blur-3xl transition-all duration-500 group-hover:bg-emerald-300/[0.12]" />

                <div className="relative flex items-center justify-between gap-3">
                  <span className="text-[9px] font-semibold tracking-[0.25em] text-emerald-300/60 sm:text-[10px]">
                    {feature.number}
                  </span>

                  <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[7px] tracking-[0.12em] text-slate-600 transition-colors group-hover:border-emerald-300/10 group-hover:text-emerald-300/60 sm:text-[8px]">
                    {feature.tag}
                  </span>
                </div>

                <div className="relative mt-12 sm:mt-16">
                  <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-emerald-200 sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>

                <div className="relative mt-9 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <span className="text-[8px] uppercase tracking-[0.18em] text-slate-700">
                    Explore
                  </span>

                  <span className="text-emerald-300/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-300">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
            {projectSnapshot.map((item, index) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-5 opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/15 hover:bg-emerald-300/[0.025]"
                style={{ animationDelay: `${(index + 1) * 90}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    0{index + 1}
                  </span>
                  <span className="text-emerald-300/40 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <div className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {item.value}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-slate-600">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ANALYSIS
      ========================================================= */}

      <section
        id="analysis"
        className="relative overflow-hidden border-y border-white/[0.05] bg-[#06100b] px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="absolute left-1/2 top-0 h-[400px] w-[550px] -translate-x-1/2 rounded-full bg-emerald-400/[0.035] blur-[110px] sm:h-[500px] sm:w-[700px] sm:blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-300/60" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300 sm:text-[10px] sm:tracking-[0.28em]">
                  Data analysis
                </p>
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                What does the
                <span className="block text-emerald-300">
                  market data reveal?
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:justify-self-end">
              The analysis examines crop-level price distributions, long-term
              movements, volatility, seasonality, market coverage, and unusual
              price observations across the available historical period.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl border border-emerald-300/10 bg-gradient-to-br from-emerald-300/[0.08] via-emerald-300/[0.02] to-transparent p-7 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300/25 hover:shadow-[0_25px_80px_rgba(16,185,129,0.08)] sm:p-8 lg:p-10"
              style={{ animationDelay: "120ms" }}>
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-300/20" />

              <div className="relative flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 sm:text-[9px] sm:tracking-[0.22em]">
                  Highest median price
                </span>

                <span className="text-xs font-semibold text-emerald-300/60">
                  01
                </span>
              </div>

              <div className="relative mt-14 sm:mt-20">
                <div className="text-4xl font-semibold tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl">
                  Lentil
                </div>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                  Among the analyzed crops, cotton records the highest median
                  monthly market price in the project&apos;s crop-level analysis.
                </p>
              </div>

              <div className="relative mt-8 h-1 overflow-hidden rounded-full bg-white/[0.05] sm:mt-10">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-400/40 to-emerald-300 transition-all duration-700 group-hover:w-[88%]" />
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-7 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] transition-all duration-500 hover:-translate-y-2 hover:border-lime-300/15 hover:shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:p-8 lg:p-10"
              style={{ animationDelay: "240ms" }}>
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-lime-300/[0.05] blur-3xl transition-all duration-500 group-hover:bg-lime-300/[0.12]" />

              <div className="relative flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 sm:text-[9px] sm:tracking-[0.22em]">
                  Highest volatility
                </span>

                <span className="text-xs font-semibold text-emerald-300/60">
                  02
                </span>
              </div>

              <div className="relative mt-14 sm:mt-20">
                <div className="text-4xl font-semibold tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl">
                  Onion
                </div>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                  Onion shows the highest measured price volatility in the
                  project&apos;s crop-level analysis.
                </p>
              </div>

              <div className="relative mt-8 h-1 overflow-hidden rounded-full bg-white/[0.05] sm:mt-10">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-lime-400/30 to-emerald-300 transition-all duration-700 group-hover:w-[94%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FORECASTING
      ========================================================= */}

      <section
        id="forecasting"
        className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(16,185,129,0.07),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-300/60" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300 sm:text-[10px] sm:tracking-[0.28em]">
                  Machine learning
                </p>
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Forecasting
                <span className="block bg-gradient-to-r from-emerald-200 to-lime-300 bg-clip-text text-transparent">
                  the next month.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                Multiple forecasting approaches were evaluated using a
                chronological train-test split. The selected model was evaluated
                using MAE, RMSE, MAPE, SMAPE, and R².
              </p>

              <a
                href="/methodology"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
              >
                Understand the methodology
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-emerald-300/10 bg-gradient-to-br from-emerald-300/[0.07] via-white/[0.025] to-transparent p-1 shadow-[0_30px_100px_rgba(0,0,0,0.25)] animate-[float_9s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(110,231,183,0.12),transparent_30%)]" />

              <div className="relative rounded-[1.7rem] border border-white/[0.04] bg-[#07130e]/80 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
                <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-slate-600">
                      Forecast engine
                    </div>

                    <div className="mt-2 text-lg font-semibold text-white">
                      Extra Trees
                    </div>
                  </div>

                  <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[0.05] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />

                    <span className="text-[8px] uppercase tracking-wider text-emerald-300">
                      Evaluated
                    </span>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
                  {[
                    ["RMSE", "₹134.46"],
                    ["MAE", "₹78.74"],
                    ["MAPE", "1.99%"],
                    ["R²", "0.9941"],
                    ["Test", "243"],
                    ["Features", "58"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="group/stat rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 opacity-0 animate-[fadeInUp_0.65s_ease-out_forwards] transition-all duration-300 hover:border-emerald-300/15 hover:bg-emerald-300/[0.035] sm:p-5"
                      style={{ animationDelay: `${(label === "RMSE" ? 1 : label === "MAE" ? 2 : label === "MAPE" ? 3 : label === "R²" ? 4 : label === "Test" ? 5 : 6) * 80}ms` }}
                    >
                      <div className="text-[7px] uppercase tracking-[0.18em] text-slate-600 sm:text-[8px] sm:tracking-[0.2em]">
                        {label}
                      </div>

                      <div className="mt-2 text-lg font-semibold text-white transition-colors group-hover/stat:text-emerald-200 sm:mt-3 sm:text-xl">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.025] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <span className="text-[8px] uppercase tracking-[0.18em] text-slate-600">
                    Selection basis
                  </span>
                  <span className="text-[9px] font-semibold text-emerald-300/80">
                    Lowest test RMSE among evaluated models
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-white/[0.05] bg-black/10 p-4 sm:mt-8 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[7px] uppercase tracking-[0.18em] text-slate-600 sm:text-[8px] sm:tracking-[0.2em]">
                      Model performance
                    </span>

                    <span className="text-[8px] text-emerald-300/70">
                      R² 0.9941
                    </span>
                  </div>

                  <div className="relative h-16 overflow-hidden sm:h-20">
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 600 100"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M0 78 C60 65, 80 70, 130 60 S200 65, 250 50 S330 52, 375 42 S460 35, 520 25 S565 20, 600 12"
                        stroke="#6ee7b7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-[drawLine_2.5s_ease-out]"
                      />

                      <path
                        d="M0 90 C70 78, 120 82, 170 72 S270 76, 320 60 S420 54, 480 45 S540 35, 600 30"
                        stroke="rgba(110,231,183,0.12)"
                        strokeWidth="1"
                        strokeDasharray="5 8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          METHODOLOGY
      ========================================================= */}

      <section
        id="methodology"
        className="relative px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.045] via-white/[0.02] to-transparent p-7 animate-[float_11s_ease-in-out_infinite] sm:p-8 lg:p-14">
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-300/[0.06] blur-[100px]" />

            <div className="relative grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-emerald-300/60" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300 sm:text-[10px] sm:tracking-[0.28em]">
                    Methodology
                  </p>
                </div>

                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                  A complete
                  <span className="block text-emerald-300">
                    analytical pipeline.
                  </span>
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-slate-500">
                  From raw records to validated forecasts, every stage of the
                  analytical workflow contributes to the final model.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {methodology.map((item) => (
                  <div
                    key={item.number}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/10 p-5 opacity-0 animate-[fadeInUp_0.75s_ease-out_forwards] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/15 hover:bg-emerald-300/[0.025] sm:p-6"
                    style={{ animationDelay: `${Number(item.number) * 110}ms` }}
                  >
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-emerald-300 to-lime-300 transition-all duration-500 group-hover:w-full" />

                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold tracking-[0.2em] text-emerald-300/50">
                        {item.number}
                      </span>

                      <span className="text-slate-700 transition-colors group-hover:text-emerald-300/50">
                        ↗
                      </span>
                    </div>

                    <h3 className="mt-7 font-semibold text-white transition-colors group-hover:text-emerald-200 sm:mt-8">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE DASHBOARDS
      ========================================================= */}

      <section
        id="dashboards"
        className="relative overflow-hidden border-y border-white/[0.05] bg-[#06100b] px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-emerald-400/[0.035] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-300/60" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300 sm:text-[10px] sm:tracking-[0.28em]">
                  Interactive dashboards
                </p>
              </div>

              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Explore the
                <span className="block text-emerald-300">
                  project visually.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:justify-self-end">
              Explore the published Tableau and Power BI dashboards used to
              present the project&apos;s historical price analysis, seasonal
              patterns, and forecasting results.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:mt-16">
            {/* Tableau dashboard */}
            <div
              id="tableau-dashboard"
              className="group relative overflow-hidden rounded-[2rem] border border-emerald-300/10 bg-gradient-to-br from-emerald-300/[0.07] via-white/[0.025] to-transparent p-1 shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
            >
              <div className="relative rounded-[1.8rem] border border-white/[0.04] bg-[#07130e]/90 p-5 backdrop-blur-xl sm:p-7 lg:p-8">
                <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-slate-600 sm:text-[9px]">
                      Tableau dashboard
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      Homepage Visual Analytics
                    </h3>
                  </div>

                  <a
                    href="https://public.tableau.com/views/FoodPriceForecasting/Homepage?:showVizHome=no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] w-full items-center justify-center rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-5 py-2.5 text-xs font-semibold text-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-emerald-300/[0.09] sm:w-auto"
                  >
                    Open Tableau
                  </a>
                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-black/10 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                    <span className="text-[8px] uppercase tracking-[0.18em] text-emerald-300/80 sm:text-[9px]">
                      Live Tableau report
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setTableauZoom((value) =>
                          Number(Math.max(0.35, value - 0.05).toFixed(2)),
                        )
                      }
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold text-slate-300 transition hover:border-emerald-300/20 hover:text-emerald-200"
                    >
                      Zoom −
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setTableauZoom((value) =>
                          Number(Math.min(1.25, value + 0.05).toFixed(2)),
                        )
                      }
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold text-slate-300 transition hover:border-emerald-300/20 hover:text-emerald-200"
                    >
                      Zoom +
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const viewportWidth = window.innerWidth;
                        const availableWidth = Math.max(320, viewportWidth - 24);
                        const responsiveZoom =
                          viewportWidth <= 1024
                            ? Math.min(1, Math.max(0.4, availableWidth / 900))
                            : 1;

                        setTableauZoom(
                          Number(responsiveZoom.toFixed(2)),
                        );
                      }}
                      className="rounded-full border border-emerald-300/10 bg-emerald-300/[0.04] px-3 py-1.5 text-[9px] font-semibold text-emerald-300 transition hover:border-emerald-300/25 hover:bg-emerald-300/[0.08]"
                    >
                      Reset
                    </button>

                    <span className="ml-1 text-[9px] font-medium text-slate-600">
                      {Math.round(tableauZoom * 100)}%
                    </span>
                  </div>
                </div>

                <div className="mt-5 overflow-auto overscroll-contain rounded-2xl border border-white/[0.06] bg-black/20 touch-pan-x touch-pan-y">
                  <div className="flex min-h-[420px] w-full justify-start sm:min-h-[560px] lg:min-h-[820px]">
                    <div
                      ref={tableauEmbedRef}
                      className="shrink-0 origin-top-left"
                      style={{ zoom: tableauZoom }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-1 text-[8px] uppercase tracking-[0.12em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
                  <span>Scroll and touch-pan enabled</span>
                  <span>Responsive default zoom on mobile · 100% on desktop</span>
                </div>
              </div>
            </div>

            {/* Power BI dashboard */}
            <div
              id="powerbi-dashboard"
              className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.045] via-white/[0.02] to-transparent p-1 shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
            >
              <div className="relative rounded-[1.8rem] border border-white/[0.04] bg-[#07130e]/90 p-5 backdrop-blur-xl sm:p-7 lg:p-8">
                <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-slate-600 sm:text-[9px]">
                      Power BI dashboard
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      Homepage Visual Analytics
                    </h3>
                  </div>

                  <a
                    href="https://app.powerbi.com/view?r=eyJrIjoiM2NlMDcwNGYtMjc4MS00NzMzLTljYjYtYzg1Njg0N2UwMGRmIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] w-full items-center justify-center rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-5 py-2.5 text-xs font-semibold text-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-emerald-300/[0.09] sm:w-auto"
                  >
                    Open Power BI
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/[0.05] bg-black/10 px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                  <span className="text-[8px] uppercase tracking-[0.18em] text-emerald-300/80 sm:text-[9px]">
                    Live Power BI report
                  </span>
                </div>

                <div className="mt-5 overflow-auto overscroll-contain rounded-2xl border border-white/[0.06] bg-black/20 touch-pan-x touch-pan-y">
                  <div className="min-h-[420px] w-full sm:min-h-[560px] lg:min-h-[820px]">
                    <iframe
                      title="Food Price Forecasting - Power BI Homepage Report"
                      src="https://app.powerbi.com/view?r=eyJrIjoiM2NlMDcwNGYtMjc4MS00NzMzLTljYjYtYzg1Njg0N2UwMGRmIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9"
                      className="block h-[820px] w-full min-w-[900px] border-0 sm:min-w-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-1 text-[8px] uppercase tracking-[0.12em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
                  <span>Scroll and touch-pan enabled</span>
                  <span>Responsive report container</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <Footer />

      {/* =========================================================
          CUSTOM ANIMATIONS
      ========================================================= */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }

        /* Refined font for supporting / small content text */
        p,
        nav a,
        footer {
          font-family: Arial, Helvetica, sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes drawLine {
          from {
            stroke-dashoffset: 700;
          }

          to {
            stroke-dashoffset: 0;
          }
        }

        ::selection {
          background: rgba(110, 231, 183, 0.35);
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #040b08;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(110, 231, 183, 0.18);
          border-radius: 999px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(110, 231, 183, 0.35);
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
