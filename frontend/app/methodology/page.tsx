"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Database,
  Filter,
  GitBranch,
  Layers3,
  LineChart,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Table2,
  Target,
  Workflow,
  X,
} from "lucide-react";

const workflowSteps = [
  {
    id: "ingestion",
    number: "01",
    title: "Data Ingestion",
    short: "Collect",
    description:
      "Bring raw agricultural and food-price records into a structured analysis pipeline while preserving the original observations.",
    icon: Database,
    color: "cyan",
    outputs: ["Raw dataset", "Source inventory", "Schema review"],
  },
  {
    id: "cleaning",
    number: "02",
    title: "Data Cleaning",
    short: "Prepare",
    description:
      "Inspect missing values, duplicates, inconsistent labels, data types, and anomalous records before downstream analysis.",
    icon: RefreshCw,
    color: "blue",
    outputs: ["Clean records", "Validated fields", "Quality checks"],
  },
  {
    id: "eda",
    number: "03",
    title: "Exploratory Analysis",
    short: "Understand",
    description:
      "Explore price movements, crop-level behavior, seasonality, distributions, relationships, and long-term patterns.",
    icon: BarChart3,
    color: "violet",
    outputs: ["Trend analysis", "Seasonality", "Correlation insights"],
  },
  {
    id: "features",
    number: "04",
    title: "Feature Engineering",
    short: "Transform",
    description:
      "Create model-ready temporal and agricultural features from the cleaned historical data.",
    icon: Layers3,
    color: "fuchsia",
    outputs: ["Lag features", "Rolling features", "Time features"],
  },
  {
    id: "modeling",
    number: "05",
    title: "Model Training",
    short: "Learn",
    description:
      "Train forecasting models using chronological data splits so future observations do not leak into the training process.",
    icon: BrainCircuit,
    color: "amber",
    outputs: ["Trained models", "Predictions", "Residuals"],
  },
  {
    id: "evaluation",
    number: "06",
    title: "Model Evaluation",
    short: "Validate",
    description:
      "Compare forecasts against held-out observations using error metrics and diagnostic visualizations.",
    icon: Target,
    color: "emerald",
    outputs: ["MAE", "RMSE", "MAPE", "R²"],
  },
  {
    id: "insights",
    number: "07",
    title: "Forecasting Insights",
    short: "Explain",
    description:
      "Translate model results and historical patterns into clear analytical findings suitable for dashboards and reporting.",
    icon: LineChart,
    color: "rose",
    outputs: ["Forecast insights", "Business findings", "Dashboard outputs"],
  },
];

const qualityChecks = [
  {
    title: "Missing-value audit",
    description:
      "Identify incomplete observations before analysis and modeling.",
    icon: Search,
  },
  {
    title: "Duplicate detection",
    description: "Check repeated records that could distort aggregate results.",
    icon: Table2,
  },
  {
    title: "Schema validation",
    description:
      "Confirm expected columns, data types, units, and categorical fields.",
    icon: Settings2,
  },
  {
    title: "Temporal validation",
    description:
      "Preserve chronological ordering for time-dependent forecasting tasks.",
    icon: GitBranch,
  },
  {
    title: "Outlier review",
    description:
      "Investigate unusual observations before deciding how they should be handled.",
    icon: ShieldCheck,
  },
  {
    title: "Model leakage checks",
    description:
      "Keep future information out of training features and evaluation.",
    icon: CheckCircle2,
  },
];

// Final validated pipeline metrics. Reference documentation and methodology sections below are preserved.
const methodologyMetrics = [
  { label: "Core stages", value: "07", detail: "end-to-end pipeline" },
  { label: "Analysis layer", value: "EDA", detail: "trend + seasonality" },
  { label: "Model layer", value: "ML", detail: "forecasting workflow" },
  { label: "Validation", value: "Time-aware", detail: "chronological split" },
];

const tools = [
  { name: "Python", href: "https://docs.python.org/3/" },
  { name: "Pandas", href: "https://pandas.pydata.org/docs/" },
  { name: "NumPy", href: "https://numpy.org/doc/" },
  { name: "Matplotlib", href: "https://matplotlib.org/stable/" },
  { name: "Seaborn", href: "https://seaborn.pydata.org/" },
  { name: "Scikit-learn", href: "https://scikit-learn.org/stable/" },
  { name: "Jupyter", href: "https://docs.jupyter.org/en/stable/" },
  { name: "Next.js", href: "https://nextjs.org/docs" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
  {
    name: "Tableau",
    href: "https://help.tableau.com/current/tableau/en-us/tableauhelp.htm",
  },
  { name: "Power BI", href: "https://learn.microsoft.com/en-us/power-bi/" },
];

const samplePipeline = [
  {
    label: "Raw observations",
    value: 484504,
    detail: "AGMARKNET cleaned source",
  },
  {
    label: "Monthly observations",
    value: 1210,
    detail: "9 crops · monthly aggregation",
  },
  { label: "Feature rows", value: 1179, detail: "Model-ready feature table" },
  { label: "Test observations", value: 243, detail: "Chronological holdout" },
];

const methodologyLabStages = [
  {
    id: "data",
    label: "Data foundation",
    eyebrow: "01 · Dataset",
    title: "Start with the observed market record",
    description:
      "The project begins from cleaned agricultural price observations and creates a consistent monthly analytical layer for trend analysis and forecasting.",
    metrics: [
      ["484,504", "cleaned observations"],
      ["1,210", "monthly observations"],
      ["9", "crops"],
      ["2015–2025", "coverage window"],
    ],
  },
  {
    id: "temporal",
    label: "Time structure",
    eyebrow: "02 · Temporal",
    title: "Respect the chronology of the problem",
    description:
      "Forecasting evaluation uses a chronological holdout so the test period represents information that would have been unavailable during model training.",
    metrics: [
      ["243", "test observations"],
      ["2015–2025", "historical window"],
      ["Dec 2025", "latest monthly endpoint"],
      ["Time-aware", "validation design"],
    ],
  },
  {
    id: "features",
    label: "Feature layer",
    eyebrow: "03 · Features",
    title: "Transform history into predictive signals",
    description:
      "The feature table contains engineered temporal and agricultural signals that turn the historical record into inputs suitable for machine-learning models.",
    metrics: [
      ["1,179", "feature rows"],
      ["58", "forecasting features"],
      ["Lag + rolling", "temporal signals"],
      ["Calendar", "time features"],
    ],
  },
  {
    id: "evaluation",
    label: "Evaluation",
    eyebrow: "04 · Validation",
    title: "Evaluate forecasts against held-out observations",
    description:
      "Model quality is assessed with MAE, RMSE, MAPE, SMAPE, and R² rather than relying on a single generic accuracy percentage.",
    metrics: [
      ["78.74", "Extra Trees MAE"],
      ["134.46", "Extra Trees RMSE"],
      ["1.99%", "Extra Trees MAPE"],
      ["0.9941", "Extra Trees R²"],
    ],
  },
  {
    id: "coverage",
    label: "Market coverage",
    eyebrow: "05 · Scope",
    title: "Keep geographic and commodity scope visible",
    description:
      "The methodology preserves crop, state, market, variety, and time dimensions so downstream analysis can compare price behavior without hiding coverage differences.",
    metrics: [
      ["32", "states"],
      ["3,245", "markets"],
      ["290", "varieties"],
      ["9", "crops"],
    ],
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
    eyebrow: "06 · Diagnostics",
    title: "Inspect errors, not only headline metrics",
    description:
      "Residual analysis, observed-versus-predicted trajectories, crop-level metrics, and largest-error records are used to understand where forecasting performance changes.",
    metrics: [
      ["MAE", "absolute error"],
      ["RMSE", "large-error sensitivity"],
      ["MAPE", "relative error"],
      ["R²", "fit perspective"],
    ],
  },
];

const evaluationModels = [
  {
    name: "Extra Trees",
    rmse: 134.46,
    mae: 78.74,
    mape: 1.99,
    smape: 1.97,
    r2: 0.9941,
    role: "Selected by test RMSE",
  },
  {
    name: "Hist. Gradient Boosting",
    rmse: 211.62,
    mae: 99.87,
    mape: 1.96,
    smape: 1.92,
    r2: 0.9855,
    role: "Comparison model",
  },
  {
    name: "Random Forest",
    rmse: 346.30,
    mae: 231.80,
    mape: 7.22,
    smape: 7.08,
    r2: 0.9611,
    role: "Comparison model",
  },
  {
    name: "Naive Last Month",
    rmse: 458.69,
    mae: 271.22,
    mape: 10.07,
    smape: null,
    r2: 0.9317,
    role: "Baseline",
  },
];

const cropCoverage = [
  ["Maize", "2015–2025", "0.24%", "0.9985"],
  ["Wheat", "2015–2025", "0.29%", "0.9956"],
  ["Rice", "2015–2025", "0.53%", "0.9842"],
  ["Potato", "2015–Feb 2020", "3.17%", "0.9777"],
  ["Jowar / Sorghum", "2015–2025", "2.77%", "0.9609"],
  ["Banana", "2015–2025", "2.67%", "0.9447"],
  ["Cotton", "2015–2025", "1.51%", "0.5611"],
  ["Onion", "2015–2025", "3.25%", "0.9796"],
  ["Groundnut", "2015–2025", "4.84%", "0.3812"],
];

const methodologyNotes = [
  {
    title: "Why chronological splitting?",
    body: "Forecasting is time-dependent. The methodology is designed around chronological train-test separation rather than randomly mixing historical and future observations.",
  },
  {
    title: "Why multiple metrics?",
    body: "No single metric captures every aspect of forecast quality. MAE, RMSE, MAPE and R² provide complementary views of prediction error and explanatory performance.",
  },
  {
    title: "Why visual diagnostics?",
    body: "Charts make it easier to identify trend changes, seasonal behavior, unusual observations, model residual patterns, and differences between crops.",
  },
];

export default function MethodologyPage() {
  const [activeStep, setActiveStep] = useState("ingestion");
  const [search, setSearch] = useState("");
  const [showChecks, setShowChecks] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [labStage, setLabStage] = useState("data");
  const [selectedModel, setSelectedModel] = useState("Extra Trees");
  const [coverageSort, setCoverageSort] = useState<"crop" | "mape">("crop");
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
        "https://public.tableau.com/views/FoodPriceForecasting/ModelPerformance",
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

  const filteredSteps = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return workflowSteps;

    return workflowSteps.filter((step) => {
      return (
        step.title.toLowerCase().includes(query) ||
        step.short.toLowerCase().includes(query) ||
        step.description.toLowerCase().includes(query) ||
        step.outputs.some((output) => output.toLowerCase().includes(query))
      );
    });
  }, [search]);

  const selectedStep =
    workflowSteps.find((step) => step.id === activeStep) ?? workflowSteps[0];

  const selectedLabStage =
    methodologyLabStages.find((stage) => stage.id === labStage) ??
    methodologyLabStages[0];

  const selectedModelResult =
    evaluationModels.find((model) => model.name === selectedModel) ??
    evaluationModels[0];

  const sortedCoverage = useMemo(() => {
    return [...cropCoverage].sort((a, b) =>
      coverageSort === "mape"
        ? Number.parseFloat(a[2]) - Number.parseFloat(b[2])
        : a[0].localeCompare(b[0]),
    );
  }, [coverageSort]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #050816;
          font-family: "Trebuchet MS", "Segoe UI", Arial, Helvetica, sans-serif;
        }

        a,
        button {
          -webkit-tap-highlight-color: transparent;
        }

        button,
        a {
          max-width: 100%;
        }

        img,
        svg,
        video,
        canvas {
          max-width: 100%;
        }

        ::selection {
          background: rgba(34, 211, 238, 0.25);
          color: white;
        }

        @keyframes methodologyFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -14px, 0);
          }
        }

        @keyframes methodologyPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.6;
            transform: scale(1);
          }
        }

        @keyframes methodologyScan {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes methodologyGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .methodology-float {
          animation: methodologyFloat 7s ease-in-out infinite;
        }

        .methodology-pulse {
          animation: methodologyPulse 4s ease-in-out infinite;
        }

        .methodology-gradient {
          background-size: 220% 220%;
          animation: methodologyGradient 12s ease infinite;
        }

        .methodology-scan {
          animation: methodologyScan 5s linear infinite;
        }

        @keyframes methodologyShimmer {
          0% {
            transform: translateX(-140%);
          }
          100% {
            transform: translateX(140%);
          }
        }

        @keyframes methodologyBorderPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 0 rgba(34, 211, 238, 0),
              0 0 0 rgba(34, 211, 238, 0);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(34, 211, 238, 0.12),
              0 0 35px rgba(34, 211, 238, 0.08);
          }
        }

        @keyframes methodologyDrift {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-7px) rotate(0.6deg);
          }
        }

        @keyframes methodologyGlow {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.85;
          }
        }

        .methodology-shimmer {
          position: relative;
          overflow: hidden;
        }

        .methodology-shimmer::after {
          content: "";
          position: absolute;
          inset: 0 auto 0 -45%;
          width: 35%;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.07),
            transparent
          );
          transform: translateX(-140%);
        }

        .methodology-shimmer:hover::after {
          animation: methodologyShimmer 1.1s ease-out forwards;
        }

        .methodology-border-pulse {
          animation: methodologyBorderPulse 4.5s ease-in-out infinite;
        }

        .methodology-drift {
          animation: methodologyDrift 5.5s ease-in-out infinite;
        }

        .methodology-glow {
          animation: methodologyGlow 3.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }

        @media (max-width: 480px) {
          .methodology-tight-mobile {
            letter-spacing: -0.045em;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-8%] h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute bottom-[-12%] left-[28%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/8 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <Navbar />

      <section className="relative z-10 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid min-h-screen w-full max-w-7xl min-w-0 items-center gap-12 px-5 pb-16 pt-40 sm:px-6 sm:pb-20 sm:pt-48 lg:px-8 lg:pt-32 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10 min-w-0">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/7 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200 sm:text-xs">
              <Workflow className="h-3.5 w-3.5 shrink-0" />
              End-to-End Data Science Pipeline
            </div>

            <h1 className="methodology-tight-mobile max-w-4xl break-words text-[clamp(2.65rem,9vw,6.8rem)] font-black leading-[0.9] tracking-[-0.06em] text-white">
              From raw data
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                to forecast.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              A structured methodology for transforming historical agricultural
              data into reliable analytical findings, machine-learning
              forecasts, and dashboard-ready insights.
            </p>

            <div className="mt-8 flex w-full max-w-full flex-col gap-3 sm:flex-row">
              <a
                href="#workflow"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,211,238,0.28)] sm:w-auto"
              >
                Explore the pipeline
                <ArrowDown className="h-4 w-4" />
              </a>
              <Link
                href="/forecasting"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/8 sm:w-auto"
              >
                View forecasting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-3 flex w-full max-w-full flex-col gap-3 sm:flex-row">
              <a
                href="#tableau-dashboard"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/10 sm:w-auto"
              >
                Go to Tableau
                <BarChart3 className="h-4 w-4" />
              </a>
              <a
                href="#powerbi-dashboard"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-300/15 bg-blue-300/5 px-5 py-3 text-sm font-bold text-blue-100 transition hover:-translate-y-0.5 hover:border-blue-300/25 hover:bg-blue-300/10 sm:w-auto"
              >
                Go to Power BI
                <BarChart3 className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {methodologyMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="methodology-shimmer rounded-2xl border border-white/8 bg-white/[0.035] p-4 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/15 hover:bg-white/[0.055]"
                >
                  <div className="text-xl font-black text-white">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {metric.label}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-600">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="methodology-float relative mx-auto w-full max-w-[580px]">
              <div className="absolute -inset-10 rounded-[3rem] bg-cyan-400/8 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-4 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

                <div className="flex items-center justify-between gap-3 border-b border-white/7 pb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                      Pipeline monitor
                    </div>
                    <div className="mt-1 text-lg font-black text-white">
                      Data → Model → Insight
                    </div>
                  </div>
                  <div className="methodology-glow flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/7 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                    Structured
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {workflowSteps.slice(0, 5).map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div key={step.id} className="relative">
                        <div className="flex items-center gap-3 rounded-2xl border border-white/7 bg-white/[0.035] p-3 transition hover:border-cyan-300/20 hover:bg-white/[0.055]">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/8 text-cyan-200">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="truncate text-sm font-bold text-white">
                                {step.title}
                              </span>
                              <span className="text-[10px] font-black tracking-[0.18em] text-slate-600">
                                {step.number}
                              </span>
                            </div>
                            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 to-violet-400/70"
                                style={{ width: `${88 - index * 9}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        {index < 4 && (
                          <div className="mx-auto h-3 w-px bg-gradient-to-b from-cyan-300/20 to-transparent" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {["Clean", "Model", "Validate"].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/6 bg-white/[0.025] p-3 text-center"
                    >
                      <div className="text-xs font-bold text-slate-300">
                        {item}
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                        0{index + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="methodology-scan pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-300/5 to-transparent blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="border-y border-white/6 bg-white/[0.015]"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                Methodology map
              </div>
              <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Seven stages.
                <span className="block text-slate-500">
                  One analytical pipeline.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Each stage has a specific purpose, output, and validation role.
                The structure keeps exploratory analysis separate from model
                development while maintaining a clear path from raw records to
                final insights.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search pipeline stages..."
                    className="h-11 w-full rounded-xl border border-white/8 bg-white/[0.035] pl-10 pr-10 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/30"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowChecks((value) => !value)}
                  className={`inline-flex h-11 items-center justify-between rounded-xl border px-4 text-left text-sm font-semibold transition ${
                    showChecks
                      ? "border-cyan-300/20 bg-cyan-300/7 text-cyan-100"
                      : "border-white/8 bg-white/[0.03] text-slate-400"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Show quality controls
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      showChecks ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["Input", "Historical records"],
                  ["Transform", "Features + labels"],
                  ["Learn", "Forecasting models"],
                  ["Output", "Insights + dashboards"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/7 bg-white/[0.03] p-4"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                      {label}
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-200">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <div className="grid gap-3">
                {filteredSteps.map((step) => {
                  const Icon = step.icon;
                  const selected = activeStep === step.id;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className={`methodology-shimmer group w-full rounded-2xl border p-4 text-left transition duration-500 hover:-translate-y-1 sm:p-5 ${
                        selected
                          ? "border-cyan-300/25 bg-cyan-300/[0.055] shadow-[0_0_35px_rgba(34,211,238,0.06)]"
                          : "border-white/7 bg-white/[0.025] hover:border-white/12 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                            selected
                              ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"
                              : "border-white/8 bg-white/[0.035] text-slate-500"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black tracking-[0.18em] text-slate-600">
                              {step.number}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300/70">
                              {step.short}
                            </span>
                          </div>

                          <div className="mt-1 text-base font-black text-white sm:text-lg">
                            {step.title}
                          </div>

                          {selected && (
                            <div className="mt-3">
                              <p className="max-w-2xl text-sm leading-6 text-slate-400">
                                {step.description}
                              </p>

                              <div className="mt-4 flex flex-wrap gap-2">
                                {step.outputs.map((output) => (
                                  <span
                                    key={output}
                                    className="rounded-full border border-white/7 bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/15 hover:bg-cyan-300/5"
                                  >
                                    {output}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <ChevronDown
                          className={`mt-1 h-4 w-4 shrink-0 text-slate-600 transition ${
                            selected ? "rotate-180 text-cyan-300" : ""
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredSteps.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
                  <Search className="mx-auto h-7 w-7 text-slate-700" />
                  <div className="mt-3 font-bold text-slate-300">
                    No methodology stage found
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-2 text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
              Data quality layer
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Quality controls before the model.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              Data quality is treated as part of the methodology rather than
              something added after modeling. These controls are designed to
              make the downstream analysis more trustworthy.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qualityChecks.map((check, index) => {
              const Icon = check.icon;

              return (
                <div
                  key={check.title}
                  className="methodology-shimmer group relative overflow-hidden rounded-2xl border border-white/7 bg-white/[0.025] p-5 transition duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-300/20 hover:bg-white/[0.04] hover:shadow-[0_20px_55px_rgba(34,211,238,0.07)]"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-300/5 blur-2xl transition group-hover:bg-cyan-300/10" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/[0.035] text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.18em] text-slate-700">
                        QC-{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-base font-black text-white">
                      {check.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {check.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="methodology-border-pulse methodology-shimmer mt-10 overflow-hidden rounded-[2rem] border border-white/8 bg-slate-950/70 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/15 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Pipeline integrity
                </div>
                <h3 className="mt-2 text-2xl font-black text-white">
                  Data transformation monitor
                </h3>
              </div>
              <div className="rounded-full border border-emerald-300/15 bg-emerald-300/7 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                Project outputs
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="space-y-4">
                {samplePipeline.map((item, index) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-bold text-slate-300">
                        {item.label}
                      </span>
                      <span className="text-xs font-black text-slate-500">
                        {item.value.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="mb-2 text-[10px] text-slate-600">
                      {item.detail}
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="relative h-full rounded-full bg-gradient-to-r from-cyan-300/80 via-blue-400/80 to-violet-400/80"
                        style={{
                          width: `${Math.max(
                            Math.min(
                              (Math.log10(item.value) /
                                Math.log10(samplePipeline[0].value)) *
                                100,
                              100,
                            ),
                            18,
                          )}%`,
                        }}
                      >
                        <div className="methodology-scan absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-sm" />
                      </div>
                    </div>
                    {index < samplePipeline.length - 1 && (
                      <div className="mt-2 flex justify-center">
                        <ArrowDown className="h-3 w-3 text-slate-700" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex h-40 w-40 shrink-0 flex-col items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-300/5 shadow-[inset_0_0_45px_rgba(34,211,238,0.05),0_0_45px_rgba(34,211,238,0.05)]">
                <div className="text-3xl font-black text-white">58</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Forecast features
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/6 bg-[#040713]">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                Interactive methodology lab
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Follow the evidence through the pipeline.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                Explore measured dataset scale, temporal validation, feature
                preparation, model evaluation, project scope, and diagnostics.
                These values are tied to the project outputs rather than
                decorative percentages.
              </p>
            </div>
            <div className="rounded-full border border-emerald-300/15 bg-emerald-300/7 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              Data-backed telemetry
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {methodologyLabStages.map((stage, index) => {
              const selected = labStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setLabStage(stage.id)}
                  className={`methodology-shimmer group rounded-2xl border p-5 text-left transition duration-500 hover:-translate-y-1 ${
                    selected
                      ? "border-cyan-300/25 bg-cyan-300/[0.055] shadow-[0_20px_60px_rgba(34,211,238,0.07)]"
                      : "border-white/7 bg-white/[0.025] hover:border-white/12 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-black tracking-[0.18em] text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300/70">
                      {stage.eyebrow}
                    </span>
                  </div>
                  <div className="mt-4 text-base font-black text-white">
                    {stage.label}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-500">
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="methodology-border-pulse methodology-shimmer rounded-[2rem] border border-white/8 bg-slate-950/75 p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                {selectedLabStage.eyebrow}
              </div>
              <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                {selectedLabStage.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                {selectedLabStage.description}
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {selectedLabStage.metrics.map(([value, label]) => (
                  <div
                    key={`${value}-${label}`}
                    className="rounded-2xl border border-white/7 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:border-cyan-300/15"
                  >
                    <div className="text-xl font-black text-white">{value}</div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-white/[0.025] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                    Crop coverage explorer
                  </div>
                  <div className="mt-2 text-xl font-black text-white">
                    Scope stays visible
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCoverageSort((value) =>
                      value === "crop" ? "mape" : "crop",
                    )
                  }
                  className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:border-cyan-300/15 hover:text-white"
                >
                  Sort: {coverageSort === "crop" ? "crop" : "MAPE"}
                </button>
              </div>

              <div className="mt-6 space-y-2">
                {sortedCoverage.map(([crop, period, mape, r2]) => (
                  <div
                    key={crop}
                    className="grid grid-cols-[1.1fr_1fr_auto_auto] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3 text-xs transition hover:border-cyan-300/12 hover:bg-white/[0.035]"
                  >
                    <span className="font-bold text-slate-200">{crop}</span>
                    <span className="text-[10px] text-slate-600">{period}</span>
                    <span className="font-bold text-cyan-200">{mape}</span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {r2}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-slate-700">
                <span>MAPE</span>
                <span>R²</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/6 bg-white/[0.015]">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                Forecasting methodology
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Model development is treated as a time-aware experiment.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                Historical observations are transformed into model-ready
                features, followed by chronological training and evaluation. The
                final forecasting page can then surface model metrics, residual
                diagnostics, forecast trajectories, and crop-level comparisons.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Historical window", "Learn from prior observations"],
                  ["02", "Chronological split", "Keep future data isolated"],
                  ["03", "Evaluation", "Compare predictions with actuals"],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-white/7 bg-white/[0.03] p-5"
                  >
                    <div className="text-xs font-black tracking-[0.18em] text-cyan-300">
                      {number}
                    </div>
                    <div className="mt-4 text-base font-black text-white">
                      {title}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-500">
                      {description}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowNotes((value) => !value)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/15 hover:text-white"
              >
                {showNotes
                  ? "Hide methodology notes"
                  : "Show methodology notes"}
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    showNotes ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showNotes && (
                <div className="mt-5 grid gap-3">
                  {methodologyNotes.map((note) => (
                    <div
                      key={note.title}
                      className="rounded-2xl border border-white/7 bg-white/[0.025] p-5"
                    >
                      <h3 className="font-black text-white">{note.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {note.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="methodology-shimmer methodology-border-pulse relative overflow-hidden rounded-[2rem] border border-white/8 bg-slate-950/75 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-amber-300/15 sm:p-7">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-300/8 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                      Evaluation layer
                    </div>
                    <div className="mt-2 text-xl font-black text-white">
                      Forecast quality
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300/70">
                      {selectedModelResult.role}
                    </div>
                  </div>
                  <Target className="h-6 w-6 text-amber-300" />
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {evaluationModels.map((model) => (
                    <button
                      key={model.name}
                      type="button"
                      onClick={() => setSelectedModel(model.name)}
                      className={`rounded-full border px-3 py-2 text-[10px] font-bold transition ${
                        selectedModel === model.name
                          ? "border-amber-300/25 bg-amber-300/10 text-amber-100"
                          : "border-white/7 bg-white/[0.025] text-slate-500 hover:text-slate-200"
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    [
                      "MAE",
                      "Mean absolute error",
                      selectedModelResult.mae,
                      78.74,
                    ],
                    [
                      "RMSE",
                      "Root mean squared error",
                      selectedModelResult.rmse,
                      134.46,
                    ],
                    [
                      "MAPE",
                      "Percentage error",
                      selectedModelResult.mape,
                      9.12,
                    ],
                    [
                      "R²",
                      "Explained variance",
                      selectedModelResult.r2,
                      0.9941,
                    ],
                  ].map(([metric, label, value, scale]) => (
                    <div key={metric}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-black text-white">
                            {metric}
                          </div>
                          <div className="text-[10px] text-slate-600">
                            {label}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-300">
                          {metric === "R²"
                            ? Number(value).toFixed(4)
                            : metric === "MAPE"
                              ? `${Number(value).toFixed(2)}%`
                              : Number(value).toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-300/80 to-orange-400/80"
                          style={{
                            width: `${Math.max(
                              Math.min(
                                metric === "R²"
                                  ? Number(value) * 100
                                  : (Number(value) / Number(scale)) * 100,
                                100,
                              ),
                              8,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-amber-300/10 bg-amber-300/[0.035] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
                    Important
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Extra Trees is selected by test RMSE. Hist. Gradient
                    Boosting has a slightly lower MAPE, so the selection
                    criterion is stated explicitly rather than calling one
                    metric a generic accuracy score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          METHODOLOGY DASHBOARDS
      ========================================================= */}
      <section className="border-y border-white/6 bg-[#040713]">
        <div
          id="dashboards"
          className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                Methodology dashboards
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Validate the methodology with the model evidence.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                These dashboard views focus on the methodological side of the
                project: model evaluation, forecast diagnostics, crop-level
                performance, and the evidence used to validate the forecasting
                workflow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href="#tableau-dashboard"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/10"
              >
                Go to Tableau
                <BarChart3 className="h-4 w-4" />
              </a>
              <a
                href="#powerbi-dashboard"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-300/15 bg-blue-300/5 px-5 py-3 text-sm font-bold text-blue-100 transition hover:-translate-y-0.5 hover:border-blue-300/25 hover:bg-blue-300/10"
              >
                Go to Power BI
                <BarChart3 className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-8">
            <div
              id="tableau-dashboard"
              className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-white/8 bg-slate-950/75 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-white/7 pb-5 sm:flex-row sm:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                    Tableau · Model Performance
                  </div>
                  <div className="mt-2 text-xl font-black text-white">
                    Methodology validation dashboard
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    Model metrics and forecasting diagnostics from the published Tableau workbook.
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/7 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                    Live report
                  </span>
                  <a
                    href="https://public.tableau.com/views/FoodPriceForecasting/ModelPerformance?:showVizHome=no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-4 py-2 text-xs font-bold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/10"
                  >
                    Open Tableau
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                  Tableau zoom
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setTableauZoom((value) =>
                      Number(Math.max(0.35, value - 0.1).toFixed(2)),
                    )
                  }
                  className="h-9 min-w-9 rounded-lg border border-white/8 bg-white/[0.035] px-3 text-sm font-black text-slate-300 transition hover:border-cyan-300/20 hover:text-white"
                  aria-label="Zoom out Tableau dashboard"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTableauZoom((value) =>
                      Number(Math.min(1.25, value + 0.1).toFixed(2)),
                    )
                  }
                  className="h-9 min-w-9 rounded-lg border border-white/8 bg-white/[0.035] px-3 text-sm font-black text-slate-300 transition hover:border-cyan-300/20 hover:text-white"
                  aria-label="Zoom in Tableau dashboard"
                >
                  +
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
                    setTableauZoom(Number(responsiveZoom.toFixed(2)));
                  }}
                  className="h-9 rounded-lg border border-white/8 bg-white/[0.035] px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition hover:border-cyan-300/20 hover:text-white"
                >
                  Reset
                </button>
                <span className="rounded-lg border border-white/6 bg-white/[0.025] px-3 py-2 text-[10px] font-bold text-slate-500">
                  {Math.round(tableauZoom * 100)}%
                </span>
                <span className="text-[10px] text-slate-700">
                  Responsive default on mobile · 100% on desktop
                </span>
              </div>

              <div className="mt-5 overflow-auto overscroll-contain rounded-2xl border border-white/6 bg-black/20 [touch-action:pan-x_pan-y]">
                <div
                  className="min-h-[620px] w-full min-w-[900px] origin-top-left"
                  style={{
                    height: `${820 * tableauZoom}px`,
                  }}
                >
                  <div
                    ref={tableauEmbedRef}
                    className="origin-top-left"
                    style={{
                      width: "1200px",
                      height: "1200px",
                      zoom: tableauZoom,
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              id="powerbi-dashboard"
              className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-white/8 bg-slate-950/75 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-white/7 pb-5 sm:flex-row sm:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                    Power BI · Model Performance
                  </div>
                  <div className="mt-2 text-xl font-black text-white">
                    Methodology validation report
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    Use the report navigation to inspect model metrics, crop-level performance, and forecasting validation.
                  </div>
                </div>

                <a
                  href="https://app.powerbi.com/view?r=eyJrIjoiM2NlMDcwNGYtMjc4MS00NzMzLTljYjYtYzg1Njg0N2UwMGRmIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-blue-300/15 bg-blue-300/5 px-4 py-2 text-xs font-bold text-blue-100 transition hover:-translate-y-0.5 hover:border-blue-300/25 hover:bg-blue-300/10"
                >
                  Open Power BI
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="mt-5 overflow-auto overscroll-contain rounded-2xl border border-white/6 bg-black/20 [touch-action:pan-x_pan-y]">
                <div className="h-[620px] min-w-[900px] sm:h-[760px] lg:h-[820px] sm:min-w-0">
                  <iframe
                    title="Food Price Forecasting - Power BI Model Performance Report"
                    src="https://app.powerbi.com/view?r=eyJrIjoiM2NlMDcwNGYtMjc4MS00NzMzLTljYjYtYzg1Njg0N2UwMGRmIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9"
                    className="block h-full w-full min-w-[900px] border-0 sm:min-w-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-fuchsia-300">
              Technology stack
            </div>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Built across analysis, machine learning, and visualization.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              The final project combines a Python-based analytical workflow with
              a modern interactive frontend and dashboard layer.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
            {tools.map((tool, index) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${tool.name} official documentation`}
                className="methodology-shimmer group rounded-full border border-white/8 bg-white/[0.035] px-4 py-2.5 text-sm font-bold text-slate-300 transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-cyan-300/20 hover:bg-cyan-300/7 hover:text-white hover:shadow-[0_10px_30px_rgba(34,211,238,0.08)]"
              >
                <span className="mr-2 text-[9px] text-slate-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {tool.name}
                <ArrowRight className="ml-1.5 inline-block h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
              </a>
            ))}
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: "Data layer",
                text: "Raw and processed datasets, validation, transformation, and feature preparation.",
              },
              {
                icon: BrainCircuit,
                title: "Machine learning",
                text: "Feature engineering, model training, chronological evaluation, and forecasting.",
              },
              {
                icon: BarChart3,
                title: "Insight layer",
                text: "EDA visuals, model diagnostics, dashboards, and portfolio-ready findings.",
              },
            ].map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="methodology-shimmer methodology-drift rounded-[1.75rem] border border-white/8 bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-6 transition duration-500 hover:-translate-y-2 hover:border-cyan-300/15 hover:shadow-[0_25px_70px_rgba(34,211,238,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/7 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/6 bg-gradient-to-b from-cyan-400/[0.035] to-transparent">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="methodology-shimmer relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-slate-950/70 p-7 shadow-[0_30px_100px_rgba(34,211,238,0.05)] transition duration-500 hover:border-cyan-300/20 sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/7 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Methodology complete
                </div>
                <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                  A reproducible path from agricultural records to forecasting
                  insights.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  This page is designed as the methodological backbone of the
                  project. Real dataset-derived visuals, measured quality
                  checks, and final model outputs can be connected as the
                  analytical pipeline is finalized.
                </p>
              </div>

              <Link
                href="/forecasting"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 sm:w-auto"
              >
                Continue to forecasting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <Footer />  
    </main>
  );
}
