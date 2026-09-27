"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";


// Final validated model metrics from the forecasting/evaluation pipeline.
// The embedded row-level prediction snapshot is preserved until the final
// test_predictions.csv export is connected directly to this page.
const modelResults = [
  {
    model: "Extra Trees",
    rmse: 134.46,
    mae: 78.74,
    mape: 1.99,
    smape: 1.97,
    r2: 0.9941,
    status: "Selected",
  },
  {
    model: "Hist Gradient Boosting",
    rmse: 211.62,
    mae: 99.87,
    mape: 1.96,
    smape: 1.92,
    r2: 0.9855,
    status: "Comparison",
  },
  {
    model: "Random Forest",
    rmse: 346.30,
    mae: 231.80,
    mape: 7.22,
    smape: 7.08,
    r2: 0.9611,
    status: "Comparison",
  },
  {
    model: "Naive Last Month",
    rmse: 458.69,
    mae: 271.22,
    mape: 10.07,
    smape: null,
    r2: 0.9317,
    status: "Baseline",
  },
];

const forecastRows = [
  {
    crop: "Banana",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 2490.0,
    predicted: 2509.4,
    error: 19.4,
    percentageError: 0.7791,
  },
  {
    crop: "Banana",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 2800.0,
    predicted: 2796.03,
    error: 3.97,
    percentageError: 0.1416,
  },
  {
    crop: "Banana",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 2800.0,
    predicted: 2795.18,
    error: 4.82,
    percentageError: 0.1722,
  },
  {
    crop: "Banana",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 2700.0,
    predicted: 2700.22,
    error: 0.22,
    percentageError: 0.008,
  },
  {
    crop: "Banana",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 2800.0,
    predicted: 2801.79,
    error: 1.79,
    percentageError: 0.0639,
  },
  {
    crop: "Banana",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 2765.0,
    predicted: 2771.86,
    error: 6.86,
    percentageError: 0.2481,
  },
  {
    crop: "Banana",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 2900.0,
    predicted: 2894.61,
    error: 5.39,
    percentageError: 0.186,
  },
  {
    crop: "Banana",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 2820.0,
    predicted: 2819.79,
    error: 0.21,
    percentageError: 0.0074,
  },
  {
    crop: "Banana",
    period: "May 2024",
    month: "2024-05-01",
    actual: 3000.0,
    predicted: 2978.75,
    error: 21.25,
    percentageError: 0.7083,
  },
  {
    crop: "Banana",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 3185.0,
    predicted: 3146.92,
    error: 38.08,
    percentageError: 1.1956,
  },
  {
    crop: "Banana",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 4000.0,
    predicted: 3771.61,
    error: 228.39,
    percentageError: 5.7098,
  },
  {
    crop: "Banana",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 4000.0,
    predicted: 3775.5,
    error: 224.5,
    percentageError: 5.6124,
  },
  {
    crop: "Banana",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 3700.0,
    predicted: 3559.47,
    error: 140.53,
    percentageError: 3.798,
  },
  {
    crop: "Banana",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 4000.0,
    predicted: 3807.73,
    error: 192.27,
    percentageError: 4.8067,
  },
  {
    crop: "Banana",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 4000.0,
    predicted: 3782.02,
    error: 217.98,
    percentageError: 5.4495,
  },
  {
    crop: "Banana",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 4000.0,
    predicted: 3802.88,
    error: 197.12,
    percentageError: 4.928,
  },
  {
    crop: "Banana",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 4000.0,
    predicted: 3836.71,
    error: 163.29,
    percentageError: 4.0822,
  },
  {
    crop: "Banana",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 4000.0,
    predicted: 3844.33,
    error: 155.67,
    percentageError: 3.8916,
  },
  {
    crop: "Banana",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 4000.0,
    predicted: 3857.37,
    error: 142.63,
    percentageError: 3.5658,
  },
  {
    crop: "Banana",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 4000.0,
    predicted: 3842.84,
    error: 157.16,
    percentageError: 3.929,
  },
  {
    crop: "Banana",
    period: "May 2025",
    month: "2025-05-01",
    actual: 4000.0,
    predicted: 3837.74,
    error: 162.26,
    percentageError: 4.0566,
  },
  {
    crop: "Banana",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 4000.0,
    predicted: 3852.25,
    error: 147.75,
    percentageError: 3.6937,
  },
  {
    crop: "Banana",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 3400.0,
    predicted: 3467.07,
    error: 67.07,
    percentageError: 1.9727,
  },
  {
    crop: "Banana",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 3500.0,
    predicted: 3539.16,
    error: 39.16,
    percentageError: 1.1188,
  },
  {
    crop: "Banana",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 2800.0,
    predicted: 3004.94,
    error: 204.94,
    percentageError: 7.3192,
  },
  {
    crop: "Banana",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 3000.0,
    predicted: 3102.92,
    error: 102.92,
    percentageError: 3.4307,
  },
  {
    crop: "Banana",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 3300.0,
    predicted: 3262.9,
    error: 37.1,
    percentageError: 1.1244,
  },
  {
    crop: "Cotton",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 6775.0,
    predicted: 6924.95,
    error: 149.95,
    percentageError: 2.2133,
  },
  {
    crop: "Cotton",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 6950.0,
    predicted: 7098.78,
    error: 148.78,
    percentageError: 2.1407,
  },
  {
    crop: "Cotton",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 6800.0,
    predicted: 7060.44,
    error: 260.44,
    percentageError: 3.8301,
  },
  {
    crop: "Cotton",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 6650.0,
    predicted: 6913.62,
    error: 263.62,
    percentageError: 3.9642,
  },
  {
    crop: "Cotton",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 6500.0,
    predicted: 6808.42,
    error: 308.42,
    percentageError: 4.7449,
  },
  {
    crop: "Cotton",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 7000.0,
    predicted: 7044.37,
    error: 44.37,
    percentageError: 0.6339,
  },
  {
    crop: "Cotton",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 7056.5,
    predicted: 7057.97,
    error: 1.47,
    percentageError: 0.0209,
  },
  {
    crop: "Cotton",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 6910.0,
    predicted: 6916.83,
    error: 6.83,
    percentageError: 0.0988,
  },
  {
    crop: "Cotton",
    period: "May 2024",
    month: "2024-05-01",
    actual: 6950.0,
    predicted: 6920.69,
    error: 29.31,
    percentageError: 0.4217,
  },
  {
    crop: "Cotton",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 7100.0,
    predicted: 7008.94,
    error: 91.06,
    percentageError: 1.2826,
  },
  {
    crop: "Cotton",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 7151.5,
    predicted: 7051.91,
    error: 99.59,
    percentageError: 1.3926,
  },
  {
    crop: "Cotton",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 6937.5,
    predicted: 6934.73,
    error: 2.77,
    percentageError: 0.0399,
  },
  {
    crop: "Cotton",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 7100.0,
    predicted: 7010.32,
    error: 89.68,
    percentageError: 1.2631,
  },
  {
    crop: "Cotton",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 7150.0,
    predicted: 7195.6,
    error: 45.6,
    percentageError: 0.6378,
  },
  {
    crop: "Cotton",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 7075.0,
    predicted: 7151.72,
    error: 76.72,
    percentageError: 1.0843,
  },
  {
    crop: "Cotton",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 7165.0,
    predicted: 7144.78,
    error: 20.22,
    percentageError: 0.2822,
  },
  {
    crop: "Cotton",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 7100.0,
    predicted: 7112.23,
    error: 12.23,
    percentageError: 0.1723,
  },
  {
    crop: "Cotton",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 7000.0,
    predicted: 7047.22,
    error: 47.22,
    percentageError: 0.6746,
  },
  {
    crop: "Cotton",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 7150.0,
    predicted: 7096.11,
    error: 53.89,
    percentageError: 0.7537,
  },
  {
    crop: "Cotton",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 7223.5,
    predicted: 7113.54,
    error: 109.96,
    percentageError: 1.5222,
  },
  {
    crop: "Cotton",
    period: "May 2025",
    month: "2025-05-01",
    actual: 7175.5,
    predicted: 7067.11,
    error: 108.39,
    percentageError: 1.5105,
  },
  {
    crop: "Cotton",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 7410.5,
    predicted: 7139.99,
    error: 270.51,
    percentageError: 3.6504,
  },
  {
    crop: "Cotton",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 7663.0,
    predicted: 7314.86,
    error: 348.14,
    percentageError: 4.5431,
  },
  {
    crop: "Cotton",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 6975.0,
    predicted: 6956.8,
    error: 18.2,
    percentageError: 0.2609,
  },
  {
    crop: "Cotton",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 6887.0,
    predicted: 6915.45,
    error: 28.45,
    percentageError: 0.4131,
  },
  {
    crop: "Cotton",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 7000.0,
    predicted: 7107.34,
    error: 107.34,
    percentageError: 1.5335,
  },
  {
    crop: "Cotton",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 7000.0,
    predicted: 7123.16,
    error: 123.16,
    percentageError: 1.7594,
  },
  {
    crop: "Groundnut",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 6400.0,
    predicted: 6597.11,
    error: 197.11,
    percentageError: 3.0798,
  },
  {
    crop: "Groundnut",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 6215.25,
    predicted: 6658.0,
    error: 442.75,
    percentageError: 7.1236,
  },
  {
    crop: "Groundnut",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 6405.0,
    predicted: 6790.77,
    error: 385.77,
    percentageError: 6.023,
  },
  {
    crop: "Groundnut",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 6375.0,
    predicted: 6701.62,
    error: 326.62,
    percentageError: 5.1234,
  },
  {
    crop: "Groundnut",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 6062.0,
    predicted: 6585.17,
    error: 523.17,
    percentageError: 8.6303,
  },
  {
    crop: "Groundnut",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 6107.5,
    predicted: 6539.83,
    error: 432.33,
    percentageError: 7.0787,
  },
  {
    crop: "Groundnut",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 5855.0,
    predicted: 6393.11,
    error: 538.11,
    percentageError: 9.1907,
  },
  {
    crop: "Groundnut",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 5945.0,
    predicted: 6339.96,
    error: 394.96,
    percentageError: 6.6436,
  },
  {
    crop: "Groundnut",
    period: "May 2024",
    month: "2024-05-01",
    actual: 5750.0,
    predicted: 6131.85,
    error: 381.85,
    percentageError: 6.6408,
  },
  {
    crop: "Groundnut",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 5745.0,
    predicted: 6107.51,
    error: 362.51,
    percentageError: 6.31,
  },
  {
    crop: "Groundnut",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 6000.0,
    predicted: 6215.64,
    error: 215.64,
    percentageError: 3.5941,
  },
  {
    crop: "Groundnut",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 6000.0,
    predicted: 6160.69,
    error: 160.69,
    percentageError: 2.6781,
  },
  {
    crop: "Groundnut",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 5400.0,
    predicted: 5805.57,
    error: 405.57,
    percentageError: 7.5106,
  },
  {
    crop: "Groundnut",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 5380.0,
    predicted: 5810.98,
    error: 430.98,
    percentageError: 8.0107,
  },
  {
    crop: "Groundnut",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 5800.0,
    predicted: 6038.63,
    error: 238.63,
    percentageError: 4.1142,
  },
  {
    crop: "Groundnut",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 5350.0,
    predicted: 5619.17,
    error: 269.17,
    percentageError: 5.0312,
  },
  {
    crop: "Groundnut",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 5183.0,
    predicted: 5471.18,
    error: 288.18,
    percentageError: 5.5601,
  },
  {
    crop: "Groundnut",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 5330.0,
    predicted: 5551.48,
    error: 221.48,
    percentageError: 4.1553,
  },
  {
    crop: "Groundnut",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 5500.0,
    predicted: 5672.65,
    error: 172.65,
    percentageError: 3.1391,
  },
  {
    crop: "Groundnut",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 5461.0,
    predicted: 5617.69,
    error: 156.69,
    percentageError: 2.8693,
  },
  {
    crop: "Groundnut",
    period: "May 2025",
    month: "2025-05-01",
    actual: 6000.0,
    predicted: 6014.88,
    error: 14.88,
    percentageError: 0.248,
  },
  {
    crop: "Groundnut",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 5455.0,
    predicted: 5593.53,
    error: 138.53,
    percentageError: 2.5394,
  },
  {
    crop: "Groundnut",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 5250.0,
    predicted: 5423.94,
    error: 173.94,
    percentageError: 3.3132,
  },
  {
    crop: "Groundnut",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 5500.0,
    predicted: 5653.05,
    error: 153.05,
    percentageError: 2.7827,
  },
  {
    crop: "Groundnut",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 5000.0,
    predicted: 5252.71,
    error: 252.71,
    percentageError: 5.0543,
  },
  {
    crop: "Groundnut",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 5260.0,
    predicted: 5425.95,
    error: 165.95,
    percentageError: 3.1549,
  },
  {
    crop: "Groundnut",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 5800.0,
    predicted: 5867.7,
    error: 67.7,
    percentageError: 1.1673,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 3950.0,
    predicted: 3825.06,
    error: 124.94,
    percentageError: 3.1631,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 3350.0,
    predicted: 3393.89,
    error: 43.89,
    percentageError: 1.3101,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 4200.0,
    predicted: 3996.28,
    error: 203.72,
    percentageError: 4.8505,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 3566.5,
    predicted: 3593.14,
    error: 26.64,
    percentageError: 0.7471,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 3300.0,
    predicted: 3380.37,
    error: 80.37,
    percentageError: 2.4355,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 2875.0,
    predicted: 3084.95,
    error: 209.95,
    percentageError: 7.3027,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 2865.0,
    predicted: 3046.62,
    error: 181.62,
    percentageError: 6.3393,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 2700.0,
    predicted: 2852.31,
    error: 152.31,
    percentageError: 5.641,
  },
  {
    crop: "Jowar/Sorghum",
    period: "May 2024",
    month: "2024-05-01",
    actual: 2737.5,
    predicted: 2871.04,
    error: 133.54,
    percentageError: 4.8783,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 2540.0,
    predicted: 2666.99,
    error: 126.99,
    percentageError: 4.9996,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 2425.0,
    predicted: 2552.15,
    error: 127.15,
    percentageError: 5.2434,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 2305.5,
    predicted: 2445.87,
    error: 140.37,
    percentageError: 6.0885,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 2387.5,
    predicted: 2459.88,
    error: 72.38,
    percentageError: 3.0318,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 2300.5,
    predicted: 2368.75,
    error: 68.25,
    percentageError: 2.967,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 2500.0,
    predicted: 2520.26,
    error: 20.26,
    percentageError: 0.8105,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 2300.0,
    predicted: 2343.35,
    error: 43.35,
    percentageError: 1.8848,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 2440.0,
    predicted: 2471.52,
    error: 31.52,
    percentageError: 1.2916,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 2400.0,
    predicted: 2442.07,
    error: 42.07,
    percentageError: 1.7528,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 2700.0,
    predicted: 2719.13,
    error: 19.13,
    percentageError: 0.7085,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 2525.0,
    predicted: 2536.72,
    error: 11.72,
    percentageError: 0.4642,
  },
  {
    crop: "Jowar/Sorghum",
    period: "May 2025",
    month: "2025-05-01",
    actual: 3200.0,
    predicted: 3159.62,
    error: 40.38,
    percentageError: 1.2619,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 2500.0,
    predicted: 2533.73,
    error: 33.73,
    percentageError: 1.3492,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 2512.0,
    predicted: 2572.72,
    error: 60.72,
    percentageError: 2.4171,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 2500.0,
    predicted: 2538.6,
    error: 38.6,
    percentageError: 1.5441,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 2400.0,
    predicted: 2442.08,
    error: 42.08,
    percentageError: 1.7534,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 2790.5,
    predicted: 2790.79,
    error: 0.29,
    percentageError: 0.0102,
  },
  {
    crop: "Jowar/Sorghum",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 3100.0,
    predicted: 3120.43,
    error: 20.43,
    percentageError: 0.6589,
  },
  {
    crop: "Maize",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 1955.0,
    predicted: 1956.07,
    error: 1.07,
    percentageError: 0.0547,
  },
  {
    crop: "Maize",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 2050.0,
    predicted: 2048.56,
    error: 1.44,
    percentageError: 0.0701,
  },
  {
    crop: "Maize",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 2090.0,
    predicted: 2092.3,
    error: 2.3,
    percentageError: 0.1103,
  },
  {
    crop: "Maize",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 2100.0,
    predicted: 2095.34,
    error: 4.66,
    percentageError: 0.2219,
  },
  {
    crop: "Maize",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 2150.0,
    predicted: 2140.35,
    error: 9.65,
    percentageError: 0.449,
  },
  {
    crop: "Maize",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 2176.0,
    predicted: 2167.71,
    error: 8.29,
    percentageError: 0.3811,
  },
  {
    crop: "Maize",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 2130.0,
    predicted: 2118.89,
    error: 11.11,
    percentageError: 0.5216,
  },
  {
    crop: "Maize",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 2125.0,
    predicted: 2113.63,
    error: 11.37,
    percentageError: 0.5351,
  },
  {
    crop: "Maize",
    period: "May 2024",
    month: "2024-05-01",
    actual: 2160.0,
    predicted: 2151.32,
    error: 8.69,
    percentageError: 0.4021,
  },
  {
    crop: "Maize",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 2200.0,
    predicted: 2192.74,
    error: 7.26,
    percentageError: 0.33,
  },
  {
    crop: "Maize",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 2351.0,
    predicted: 2337.5,
    error: 13.5,
    percentageError: 0.5742,
  },
  {
    crop: "Maize",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 2450.0,
    predicted: 2456.01,
    error: 6.01,
    percentageError: 0.2454,
  },
  {
    crop: "Maize",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 2271.0,
    predicted: 2266.88,
    error: 4.12,
    percentageError: 0.1816,
  },
  {
    crop: "Maize",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 2201.0,
    predicted: 2201.19,
    error: 0.19,
    percentageError: 0.0086,
  },
  {
    crop: "Maize",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 2230.0,
    predicted: 2224.13,
    error: 5.87,
    percentageError: 0.2632,
  },
  {
    crop: "Maize",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 2300.0,
    predicted: 2300.1,
    error: 0.1,
    percentageError: 0.0042,
  },
  {
    crop: "Maize",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 2289.0,
    predicted: 2287.86,
    error: 1.14,
    percentageError: 0.0499,
  },
  {
    crop: "Maize",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 2263.0,
    predicted: 2259.35,
    error: 3.65,
    percentageError: 0.1613,
  },
  {
    crop: "Maize",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 2200.0,
    predicted: 2195.22,
    error: 4.78,
    percentageError: 0.2174,
  },
  {
    crop: "Maize",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 2120.0,
    predicted: 2113.47,
    error: 6.53,
    percentageError: 0.3078,
  },
  {
    crop: "Maize",
    period: "May 2025",
    month: "2025-05-01",
    actual: 2100.0,
    predicted: 2100.78,
    error: 0.78,
    percentageError: 0.0369,
  },
  {
    crop: "Maize",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 2150.0,
    predicted: 2144.7,
    error: 5.3,
    percentageError: 0.2467,
  },
  {
    crop: "Maize",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 2195.0,
    predicted: 2196.22,
    error: 1.22,
    percentageError: 0.0556,
  },
  {
    crop: "Maize",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 2201.0,
    predicted: 2204.31,
    error: 3.31,
    percentageError: 0.1504,
  },
  {
    crop: "Maize",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 2000.0,
    predicted: 2006.18,
    error: 6.18,
    percentageError: 0.3092,
  },
  {
    crop: "Maize",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 1750.0,
    predicted: 1752.65,
    error: 2.65,
    percentageError: 0.1516,
  },
  {
    crop: "Maize",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 1635.0,
    predicted: 1642.69,
    error: 7.69,
    percentageError: 0.4701,
  },
  {
    crop: "Onion",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 2060.0,
    predicted: 2135.59,
    error: 75.59,
    percentageError: 3.6694,
  },
  {
    crop: "Onion",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 4100.0,
    predicted: 3663.06,
    error: 436.94,
    percentageError: 10.6572,
  },
  {
    crop: "Onion",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 3800.0,
    predicted: 3736.73,
    error: 63.27,
    percentageError: 1.6649,
  },
  {
    crop: "Onion",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 2000.0,
    predicted: 2268.41,
    error: 268.41,
    percentageError: 13.4206,
  },
  {
    crop: "Onion",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 1800.0,
    predicted: 1914.61,
    error: 114.61,
    percentageError: 6.3671,
  },
  {
    crop: "Onion",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 1765.0,
    predicted: 1768.72,
    error: 3.72,
    percentageError: 0.2108,
  },
  {
    crop: "Onion",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 1800.0,
    predicted: 1773.21,
    error: 26.79,
    percentageError: 1.4883,
  },
  {
    crop: "Onion",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 1700.0,
    predicted: 1695.73,
    error: 4.27,
    percentageError: 0.2514,
  },
  {
    crop: "Onion",
    period: "May 2024",
    month: "2024-05-01",
    actual: 1688.5,
    predicted: 1672.33,
    error: 16.17,
    percentageError: 0.9577,
  },
  {
    crop: "Onion",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 2700.0,
    predicted: 2661.76,
    error: 38.24,
    percentageError: 1.4164,
  },
  {
    crop: "Onion",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 3200.0,
    predicted: 3231.9,
    error: 31.9,
    percentageError: 0.997,
  },
  {
    crop: "Onion",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 4200.0,
    predicted: 3935.53,
    error: 264.47,
    percentageError: 6.2969,
  },
  {
    crop: "Onion",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 4500.0,
    predicted: 4226.16,
    error: 273.84,
    percentageError: 6.0853,
  },
  {
    crop: "Onion",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 4800.0,
    predicted: 4468.53,
    error: 331.47,
    percentageError: 6.9057,
  },
  {
    crop: "Onion",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 3900.0,
    predicted: 3811.39,
    error: 88.61,
    percentageError: 2.2721,
  },
  {
    crop: "Onion",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 2800.0,
    predicted: 2921.42,
    error: 121.42,
    percentageError: 4.3366,
  },
  {
    crop: "Onion",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 2500.0,
    predicted: 2599.98,
    error: 99.98,
    percentageError: 3.9992,
  },
  {
    crop: "Onion",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 2680.0,
    predicted: 2722.86,
    error: 42.86,
    percentageError: 1.5991,
  },
  {
    crop: "Onion",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 2100.0,
    predicted: 2154.1,
    error: 54.1,
    percentageError: 2.5762,
  },
  {
    crop: "Onion",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 1550.0,
    predicted: 1616.68,
    error: 66.68,
    percentageError: 4.3017,
  },
  {
    crop: "Onion",
    period: "May 2025",
    month: "2025-05-01",
    actual: 1500.0,
    predicted: 1539.18,
    error: 39.18,
    percentageError: 2.6121,
  },
  {
    crop: "Onion",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 1650.0,
    predicted: 1679.03,
    error: 29.03,
    percentageError: 1.7594,
  },
  {
    crop: "Onion",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 1700.0,
    predicted: 1718.56,
    error: 18.56,
    percentageError: 1.0915,
  },
  {
    crop: "Onion",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 1800.0,
    predicted: 1824.97,
    error: 24.97,
    percentageError: 1.3871,
  },
  {
    crop: "Onion",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 1500.0,
    predicted: 1512.09,
    error: 12.09,
    percentageError: 0.8061,
  },
  {
    crop: "Onion",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 1600.0,
    predicted: 1604.34,
    error: 4.34,
    percentageError: 0.2715,
  },
  {
    crop: "Onion",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 1600.0,
    predicted: 1605.44,
    error: 5.44,
    percentageError: 0.3398,
  },
  {
    crop: "Potato",
    period: "Jan 2019",
    month: "2019-01-01",
    actual: 600.0,
    predicted: 608.72,
    error: 8.72,
    percentageError: 1.4536,
  },
  {
    crop: "Potato",
    period: "Feb 2019",
    month: "2019-02-01",
    actual: 600.0,
    predicted: 589.05,
    error: 10.95,
    percentageError: 1.8257,
  },
  {
    crop: "Potato",
    period: "Mar 2019",
    month: "2019-03-01",
    actual: 650.0,
    predicted: 626.71,
    error: 23.29,
    percentageError: 3.5827,
  },
  {
    crop: "Potato",
    period: "Apr 2019",
    month: "2019-04-01",
    actual: 750.0,
    predicted: 724.02,
    error: 25.98,
    percentageError: 3.4633,
  },
  {
    crop: "Potato",
    period: "May 2019",
    month: "2019-05-01",
    actual: 870.0,
    predicted: 848.13,
    error: 21.87,
    percentageError: 2.514,
  },
  {
    crop: "Potato",
    period: "Jun 2019",
    month: "2019-06-01",
    actual: 920.0,
    predicted: 906.85,
    error: 13.15,
    percentageError: 1.4294,
  },
  {
    crop: "Potato",
    period: "Jul 2019",
    month: "2019-07-01",
    actual: 930.0,
    predicted: 899.79,
    error: 30.21,
    percentageError: 3.2487,
  },
  {
    crop: "Potato",
    period: "Aug 2019",
    month: "2019-08-01",
    actual: 900.0,
    predicted: 871.88,
    error: 28.12,
    percentageError: 3.1241,
  },
  {
    crop: "Potato",
    period: "Sep 2019",
    month: "2019-09-01",
    actual: 900.0,
    predicted: 878.69,
    error: 21.31,
    percentageError: 2.3676,
  },
  {
    crop: "Potato",
    period: "Oct 2019",
    month: "2019-10-01",
    actual: 1082.5,
    predicted: 1028.5,
    error: 54.0,
    percentageError: 4.9882,
  },
  {
    crop: "Potato",
    period: "Nov 2019",
    month: "2019-11-01",
    actual: 1200.0,
    predicted: 1130.91,
    error: 69.09,
    percentageError: 5.7578,
  },
  {
    crop: "Potato",
    period: "Dec 2019",
    month: "2019-12-01",
    actual: 1500.0,
    predicted: 1424.72,
    error: 75.28,
    percentageError: 5.0189,
  },
  {
    crop: "Potato",
    period: "Jan 2020",
    month: "2020-01-01",
    actual: 1200.0,
    predicted: 1229.73,
    error: 29.73,
    percentageError: 2.4778,
  },
  {
    crop: "Rice",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 3000.0,
    predicted: 3000.73,
    error: 0.73,
    percentageError: 0.0242,
  },
  {
    crop: "Rice",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 3100.0,
    predicted: 3126.28,
    error: 26.28,
    percentageError: 0.8476,
  },
  {
    crop: "Rice",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 3000.0,
    predicted: 3013.98,
    error: 13.98,
    percentageError: 0.4659,
  },
  {
    crop: "Rice",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 3010.0,
    predicted: 3024.07,
    error: 14.07,
    percentageError: 0.4676,
  },
  {
    crop: "Rice",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 3002.5,
    predicted: 3008.9,
    error: 6.4,
    percentageError: 0.213,
  },
  {
    crop: "Rice",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 3050.0,
    predicted: 3076.14,
    error: 26.14,
    percentageError: 0.857,
  },
  {
    crop: "Rice",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 3110.0,
    predicted: 3121.85,
    error: 11.85,
    percentageError: 0.3809,
  },
  {
    crop: "Rice",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 3140.0,
    predicted: 3141.1,
    error: 1.1,
    percentageError: 0.0349,
  },
  {
    crop: "Rice",
    period: "May 2024",
    month: "2024-05-01",
    actual: 3165.0,
    predicted: 3153.73,
    error: 11.27,
    percentageError: 0.356,
  },
  {
    crop: "Rice",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 3200.0,
    predicted: 3178.38,
    error: 21.62,
    percentageError: 0.6757,
  },
  {
    crop: "Rice",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 3300.0,
    predicted: 3290.38,
    error: 9.62,
    percentageError: 0.2915,
  },
  {
    crop: "Rice",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 3400.0,
    predicted: 3382.51,
    error: 17.49,
    percentageError: 0.5144,
  },
  {
    crop: "Rice",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 3290.0,
    predicted: 3340.88,
    error: 50.88,
    percentageError: 1.5464,
  },
  {
    crop: "Rice",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 3340.0,
    predicted: 3355.99,
    error: 15.99,
    percentageError: 0.4788,
  },
  {
    crop: "Rice",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 3600.0,
    predicted: 3559.94,
    error: 40.06,
    percentageError: 1.1127,
  },
  {
    crop: "Rice",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 3300.0,
    predicted: 3335.92,
    error: 35.92,
    percentageError: 1.0883,
  },
  {
    crop: "Rice",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 3300.0,
    predicted: 3333.28,
    error: 33.28,
    percentageError: 1.0086,
  },
  {
    crop: "Rice",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 3299.0,
    predicted: 3325.73,
    error: 26.73,
    percentageError: 0.8102,
  },
  {
    crop: "Rice",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 3340.0,
    predicted: 3350.54,
    error: 10.54,
    percentageError: 0.3154,
  },
  {
    crop: "Rice",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 3360.0,
    predicted: 3377.18,
    error: 17.18,
    percentageError: 0.5113,
  },
  {
    crop: "Rice",
    period: "May 2025",
    month: "2025-05-01",
    actual: 3500.0,
    predicted: 3500.61,
    error: 0.61,
    percentageError: 0.0175,
  },
  {
    crop: "Rice",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 3400.0,
    predicted: 3415.72,
    error: 15.72,
    percentageError: 0.4623,
  },
  {
    crop: "Rice",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 3420.0,
    predicted: 3435.8,
    error: 15.8,
    percentageError: 0.4621,
  },
  {
    crop: "Rice",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 3410.0,
    predicted: 3421.04,
    error: 11.04,
    percentageError: 0.3237,
  },
  {
    crop: "Rice",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 3447.5,
    predicted: 3446.64,
    error: 0.86,
    percentageError: 0.025,
  },
  {
    crop: "Rice",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 3400.0,
    predicted: 3425.11,
    error: 25.11,
    percentageError: 0.7384,
  },
  {
    crop: "Rice",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 3500.0,
    predicted: 3514.02,
    error: 14.02,
    percentageError: 0.4005,
  },
  {
    crop: "Wheat",
    period: "Sep 2023",
    month: "2023-09-01",
    actual: 2325.0,
    predicted: 2330.25,
    error: 5.25,
    percentageError: 0.2259,
  },
  {
    crop: "Wheat",
    period: "Oct 2023",
    month: "2023-10-01",
    actual: 2500.0,
    predicted: 2498.66,
    error: 1.34,
    percentageError: 0.0536,
  },
  {
    crop: "Wheat",
    period: "Nov 2023",
    month: "2023-11-01",
    actual: 2516.0,
    predicted: 2518.04,
    error: 2.04,
    percentageError: 0.0809,
  },
  {
    crop: "Wheat",
    period: "Dec 2023",
    month: "2023-12-01",
    actual: 2500.0,
    predicted: 2501.14,
    error: 1.14,
    percentageError: 0.0456,
  },
  {
    crop: "Wheat",
    period: "Jan 2024",
    month: "2024-01-01",
    actual: 2500.0,
    predicted: 2497.78,
    error: 2.22,
    percentageError: 0.0889,
  },
  {
    crop: "Wheat",
    period: "Feb 2024",
    month: "2024-02-01",
    actual: 2400.0,
    predicted: 2391.43,
    error: 8.57,
    percentageError: 0.3571,
  },
  {
    crop: "Wheat",
    period: "Mar 2024",
    month: "2024-03-01",
    actual: 2350.0,
    predicted: 2349.39,
    error: 0.61,
    percentageError: 0.0259,
  },
  {
    crop: "Wheat",
    period: "Apr 2024",
    month: "2024-04-01",
    actual: 2325.0,
    predicted: 2324.43,
    error: 0.57,
    percentageError: 0.0245,
  },
  {
    crop: "Wheat",
    period: "May 2024",
    month: "2024-05-01",
    actual: 2405.0,
    predicted: 2394.64,
    error: 10.36,
    percentageError: 0.4307,
  },
  {
    crop: "Wheat",
    period: "Jun 2024",
    month: "2024-06-01",
    actual: 2460.0,
    predicted: 2462.68,
    error: 2.68,
    percentageError: 0.109,
  },
  {
    crop: "Wheat",
    period: "Jul 2024",
    month: "2024-07-01",
    actual: 2500.0,
    predicted: 2497.37,
    error: 2.63,
    percentageError: 0.1053,
  },
  {
    crop: "Wheat",
    period: "Aug 2024",
    month: "2024-08-01",
    actual: 2530.0,
    predicted: 2521.25,
    error: 8.75,
    percentageError: 0.3459,
  },
  {
    crop: "Wheat",
    period: "Sep 2024",
    month: "2024-09-01",
    actual: 2690.0,
    predicted: 2689.19,
    error: 0.81,
    percentageError: 0.0302,
  },
  {
    crop: "Wheat",
    period: "Oct 2024",
    month: "2024-10-01",
    actual: 2792.5,
    predicted: 2781.91,
    error: 10.59,
    percentageError: 0.3793,
  },
  {
    crop: "Wheat",
    period: "Nov 2024",
    month: "2024-11-01",
    actual: 2736.5,
    predicted: 2739.6,
    error: 3.1,
    percentageError: 0.1134,
  },
  {
    crop: "Wheat",
    period: "Dec 2024",
    month: "2024-12-01",
    actual: 2910.5,
    predicted: 2911.78,
    error: 1.28,
    percentageError: 0.0441,
  },
  {
    crop: "Wheat",
    period: "Jan 2025",
    month: "2025-01-01",
    actual: 2855.0,
    predicted: 2863.06,
    error: 8.06,
    percentageError: 0.2824,
  },
  {
    crop: "Wheat",
    period: "Feb 2025",
    month: "2025-02-01",
    actual: 2750.0,
    predicted: 2763.79,
    error: 13.79,
    percentageError: 0.5013,
  },
  {
    crop: "Wheat",
    period: "Mar 2025",
    month: "2025-03-01",
    actual: 2450.0,
    predicted: 2452.41,
    error: 2.41,
    percentageError: 0.0983,
  },
  {
    crop: "Wheat",
    period: "Apr 2025",
    month: "2025-04-01",
    actual: 2450.0,
    predicted: 2473.71,
    error: 23.71,
    percentageError: 0.9679,
  },
  {
    crop: "Wheat",
    period: "May 2025",
    month: "2025-05-01",
    actual: 2480.0,
    predicted: 2499.66,
    error: 19.66,
    percentageError: 0.7926,
  },
  {
    crop: "Wheat",
    period: "Jun 2025",
    month: "2025-06-01",
    actual: 2490.0,
    predicted: 2513.9,
    error: 23.9,
    percentageError: 0.9598,
  },
  {
    crop: "Wheat",
    period: "Jul 2025",
    month: "2025-07-01",
    actual: 2583.5,
    predicted: 2594.07,
    error: 10.57,
    percentageError: 0.4092,
  },
  {
    crop: "Wheat",
    period: "Aug 2025",
    month: "2025-08-01",
    actual: 2580.0,
    predicted: 2583.55,
    error: 3.55,
    percentageError: 0.1376,
  },
  {
    crop: "Wheat",
    period: "Sep 2025",
    month: "2025-09-01",
    actual: 2525.0,
    predicted: 2534.82,
    error: 9.82,
    percentageError: 0.389,
  },
  {
    crop: "Wheat",
    period: "Oct 2025",
    month: "2025-10-01",
    actual: 2500.0,
    predicted: 2507.4,
    error: 7.4,
    percentageError: 0.2958,
  },
  {
    crop: "Wheat",
    period: "Nov 2025",
    month: "2025-11-01",
    actual: 2480.0,
    predicted: 2495.79,
    error: 15.79,
    percentageError: 0.6366,
  },
];

const cropPerformance = [
  {
    crop: "Maize",
    observations: 27,
    mae: 5.14,
    rmse: 6.29,
    mape: 0.24,
    smape: 0.24,
    r2: 0.9985,
  },
  {
    crop: "Wheat",
    observations: 27,
    mae: 7.43,
    rmse: 10.08,
    mape: 0.29,
    smape: 0.29,
    r2: 0.9956,
  },
  {
    crop: "Rice",
    observations: 27,
    mae: 17.57,
    rmse: 21.39,
    mape: 0.53,
    smape: 0.53,
    r2: 0.9842,
  },
  {
    crop: "Potato",
    observations: 13,
    mae: 31.67,
    rmse: 37.69,
    mape: 3.17,
    smape: 3.23,
    r2: 0.9777,
  },
  {
    crop: "Jowar/Sorghum",
    observations: 27,
    mae: 77.64,
    rmse: 98.49,
    mape: 2.77,
    smape: 2.73,
    r2: 0.9609,
  },
  {
    crop: "Banana",
    observations: 27,
    mae: 99.36,
    rmse: 129.41,
    mape: 2.67,
    smape: 2.7,
    r2: 0.9447,
  },
  {
    crop: "Cotton",
    observations: 27,
    mae: 106.16,
    rmse: 144.77,
    mape: 1.51,
    smape: 1.51,
    r2: 0.5611,
  },
  {
    crop: "Onion",
    observations: 27,
    mae: 94.7,
    rmse: 147.76,
    mape: 3.25,
    smape: 3.24,
    r2: 0.9796,
  },
  {
    crop: "Groundnut",
    observations: 27,
    mae: 278.21,
    rmse: 309.2,
    mape: 4.84,
    smape: 4.7,
    r2: 0.3812,
  },
];

const formatPrice = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;

function MiniLineChart({
  rows,
  height = 250,
}: {
  rows: typeof forecastRows;
  height?: number;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const width = 760;
  const paddingLeft = 54;
  const paddingRight = 18;
  const paddingTop = 18;
  const paddingBottom = height >= 320 ? 42 : 26;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const detailed = height >= 320;

  const values = rows.flatMap((item) => [item.actual, item.predicted]);
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values);
  const range = Math.max(maxValue - minValue, 1);
  const paddedMin = Math.max(0, minValue - range * 0.08);
  const paddedMax = maxValue + range * 0.08;
  const paddedRange = Math.max(paddedMax - paddedMin, 1);

  const yFor = (value: number) =>
    paddingTop + (1 - (value - paddedMin) / paddedRange) * chartHeight;

  const xFor = (index: number) =>
    rows.length <= 1
      ? paddingLeft + chartWidth / 2
      : paddingLeft + (index * chartWidth) / (rows.length - 1);

  const actualPoints = rows
    .map((item, index) => `${xFor(index)},${yFor(item.actual)}`)
    .join(" ");
  const predictedPoints = rows
    .map((item, index) => `${xFor(index)},${yFor(item.predicted)}`)
    .join(" ");

  const predictedArea =
    rows.length > 1
      ? `M ${xFor(0)} ${yFor(rows[0].predicted)} ${rows
          .slice(1)
          .map((item, index) => `L ${xFor(index + 1)} ${yFor(item.predicted)}`)
          .join(
            " ",
          )} L ${xFor(rows.length - 1)} ${paddingTop + chartHeight} L ${xFor(0)} ${paddingTop + chartHeight} Z`
      : "";

  const hoveredRow = hoveredIndex === null ? null : rows[hoveredIndex];
  const hoveredX = hoveredIndex === null ? 0 : xFor(hoveredIndex);
  const tooltipLeft =
    hoveredIndex === null
      ? 50
      : Math.min(Math.max((hoveredX / width) * 100, 10), 82);

  const tickCount = detailed ? 5 : 3;
  const yTicks = Array.from({ length: tickCount }, (_, index) => {
    const ratio = index / (tickCount - 1);
    return {
      value: paddedMax - ratio * paddedRange,
      y: paddingTop + ratio * chartHeight,
    };
  });

  const labelIndexes = Array.from(
    new Set(
      [0, Math.floor((rows.length - 1) / 2), rows.length - 1].filter(
        (index) => index >= 0,
      ),
    ),
  );

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
        role="img"
        aria-label="Interactive actual versus predicted food price trajectory"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <defs>
          <linearGradient id="forecastStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <linearGradient id="forecastArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity=".18" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
          </linearGradient>
          <filter
            id="forecastPointGlow"
            x="-200%"
            y="-200%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {yTicks.map((tick, index) => (
          <g key={`y-${index}`}>
            <line
              x1={paddingLeft}
              y1={tick.y}
              x2={width - paddingRight}
              y2={tick.y}
              stroke="#94a3b8"
              strokeOpacity={index === tickCount - 1 ? ".11" : ".07"}
              strokeWidth="1"
            />
            <text
              x={paddingLeft - 9}
              y={tick.y + 3}
              textAnchor="end"
              fill="#64748b"
              fontSize={detailed ? "9" : "7"}
              fontWeight="600"
            >
              {`₹${Math.round(tick.value).toLocaleString("en-IN")}`}
            </text>
          </g>
        ))}

        <line
          x1={paddingLeft}
          y1={paddingTop + chartHeight}
          x2={width - paddingRight}
          y2={paddingTop + chartHeight}
          stroke="#94a3b8"
          strokeOpacity=".14"
        />

        {detailed &&
          labelIndexes.map((index) => (
            <text
              key={`x-${index}`}
              x={xFor(index)}
              y={height - 12}
              textAnchor={
                index === 0
                  ? "start"
                  : index === rows.length - 1
                    ? "end"
                    : "middle"
              }
              fill="#64748b"
              fontSize="9"
              fontWeight="600"
            >
              {rows[index]?.period}
            </text>
          ))}

        {predictedArea && (
          <path
            d={predictedArea}
            fill="url(#forecastArea)"
            opacity=".9"
            className="transition-opacity duration-300"
          />
        )}

        <polyline
          points={actualPoints}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={detailed ? "2.4" : "2"}
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".68"
        />

        <polyline
          points={predictedPoints}
          fill="none"
          stroke="url(#forecastStroke)"
          strokeWidth={detailed ? "3.2" : "3"}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="forecast-draw"
        />

        {detailed &&
          rows.map((item, index) => (
            <g key={`${item.crop}-${item.month}-points`}>
              <circle
                cx={xFor(index)}
                cy={yFor(item.actual)}
                r={hoveredIndex === index ? "4.2" : "2.2"}
                fill="#cbd5e1"
                opacity={hoveredIndex === index ? ".95" : ".55"}
                className="transition-all duration-150"
              />
              <circle
                cx={xFor(index)}
                cy={yFor(item.predicted)}
                r={hoveredIndex === index ? "5.5" : "2.8"}
                fill="#07130e"
                stroke="#6ee7b7"
                strokeWidth={hoveredIndex === index ? "2.5" : "1.7"}
                filter={
                  hoveredIndex === index ? "url(#forecastPointGlow)" : undefined
                }
                className="transition-all duration-150"
              />
            </g>
          ))}

        {hoveredIndex !== null && (
          <line
            x1={hoveredX}
            y1={paddingTop}
            x2={hoveredX}
            y2={paddingTop + chartHeight}
            stroke="#6ee7b7"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity=".55"
            pointerEvents="none"
          />
        )}

        <rect
          x={paddingLeft}
          y={paddingTop}
          width={chartWidth}
          height={chartHeight}
          fill="transparent"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const relativeX = Math.min(
              Math.max(event.clientX - rect.left, 0),
              rect.width,
            );
            const ratio = rect.width > 0 ? relativeX / rect.width : 0;
            const index = Math.round(ratio * Math.max(rows.length - 1, 0));
            setHoveredIndex(index);
          }}
        />
      </svg>

      {hoveredRow && (
        <div
          className="pointer-events-none absolute top-3 z-20 w-[190px] -translate-x-1/2 rounded-xl border border-emerald-300/20 bg-[#06100c]/95 p-3 shadow-[0_18px_45px_rgba(0,0,0,.4)] backdrop-blur-xl transition-[left] duration-100"
          style={{ left: `${tooltipLeft}%` }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/[.07] pb-2">
            <span className="text-[9px] font-bold uppercase tracking-[.16em] text-emerald-200">
              {hoveredRow.period}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-slate-600">
              Test point
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
            <div>
              <p className="text-slate-600">Observed</p>
              <p className="mt-0.5 font-bold text-slate-200">
                {formatPrice(hoveredRow.actual)}
              </p>
            </div>
            <div>
              <p className="text-slate-600">Predicted</p>
              <p className="mt-0.5 font-bold text-emerald-200">
                {formatPrice(hoveredRow.predicted)}
              </p>
            </div>
            <div>
              <p className="text-slate-600">Error</p>
              <p className="mt-0.5 font-bold text-cyan-200">
                {formatPrice(
                  Math.abs(hoveredRow.actual - hoveredRow.predicted),
                )}
              </p>
            </div>
            <div>
              <p className="text-slate-600">Error %</p>
              <p className="mt-0.5 font-bold text-white">
                {hoveredRow.percentageError.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function ErrorChart({ rows }: { rows: typeof forecastRows }) {
  const maxAbs = Math.max(
    ...rows.map((item) => Math.abs(item.actual - item.predicted)),
    1,
  );

  return (
    <svg
      viewBox="0 0 620 220"
      className="h-full w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Forecast residuals"
    >
      <line
        x1="20"
        y1="110"
        x2="600"
        y2="110"
        stroke="#334155"
        strokeWidth="1"
      />
      {rows.map((item, index) => {
        const residual = item.actual - item.predicted;
        const x = 38 + (index * 550) / Math.max(rows.length - 1, 1);
        const height = (Math.abs(residual) / maxAbs) * 82;
        const y = residual >= 0 ? 110 - height : 110;

        return (
          <rect
            key={`${item.crop}-${item.month}`}
            x={x - 7}
            y={y}
            width="14"
            height={Math.max(height, 2)}
            rx="4"
            fill={residual >= 0 ? "#67e8f9" : "#6ee7b7"}
            opacity=".7"
            className="bar-rise"
            style={{ animationDelay: `${index * 15}ms` }}
          />
        );
      })}
    </svg>
  );
}


function ForecastAnalyticsLab() {
  const [labCrop, setLabCrop] = useState("Rice");
  const [labMetric, setLabMetric] = useState<"mae" | "rmse" | "mape" | "r2">("rmse");
  const [labModelMetric, setLabModelMetric] = useState<"rmse" | "mae" | "mape" | "r2">("rmse");

  const labRows = useMemo(
    () => forecastRows.filter((row) => row.crop === labCrop),
    [labCrop],
  );

  const selectedCrop =
    cropPerformance.find((item) => item.crop === labCrop) ?? cropPerformance[0];

  const errorBuckets = useMemo(() => {
    const buckets = [
      { label: "<1%", min: 0, max: 1 },
      { label: "1–2%", min: 1, max: 2 },
      { label: "2–4%", min: 2, max: 4 },
      { label: "4–6%", min: 4, max: 6 },
      { label: "6–8%", min: 6, max: 8 },
      { label: "8%+", min: 8, max: Infinity },
    ];
    return buckets.map((bucket) => ({
      ...bucket,
      count: labRows.filter(
        (row) =>
          row.percentageError >= bucket.min &&
          row.percentageError < bucket.max,
      ).length,
    }));
  }, [labRows]);

  const maxBucket = Math.max(...errorBuckets.map((bucket) => bucket.count), 1);
  const maxLabError = Math.max(...labRows.map((row) => row.percentageError), 1);
  const maxModelMetric = Math.max(
    ...modelResults.map((model) => model[labModelMetric]),
    1,
  );
  const metricValue = selectedCrop?.[labMetric] ?? 0;
  const cropMetricMax = Math.max(
    ...cropPerformance.map((item) => item[labMetric]),
    1,
  );

  return (
    <section className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-cyan-300">
              03.5 / Forecast analytics lab
            </p>
            <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.4rem)] font-black leading-[.94] tracking-[-.05em]">
              Interrogate the forecast.
              <span className="text-slate-600"> Not just view it.</span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
              Additional interactive views calculated directly from the exported
              chronological test predictions and verified model evaluation metrics.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <select
              value={labCrop}
              onChange={(e) => setLabCrop(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#08130f] px-4 py-3 text-xs text-slate-300 outline-none transition hover:border-cyan-300/20"
            >
              {cropPerformance.map((item) => (
                <option key={item.crop}>{item.crop}</option>
              ))}
            </select>
            <select
              value={labMetric}
              onChange={(e) => setLabMetric(e.target.value as typeof labMetric)}
              className="rounded-xl border border-white/10 bg-[#08130f] px-4 py-3 text-xs text-slate-300 outline-none transition hover:border-cyan-300/20"
            >
              <option value="rmse">Crop metric: RMSE</option>
              <option value="mae">Crop metric: MAE</option>
              <option value="mape">Crop metric: MAPE</option>
              <option value="r2">Crop metric: R²</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[.08] bg-white/[.025] p-5 sm:p-7">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-300/[.06] blur-3xl forecast-glow" />
            <div className="relative flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                  Error trajectory
                </p>
                <h3 className="mt-2 text-xl font-black text-white">
                  {labCrop} · absolute percentage error
                </h3>
              </div>
              <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[.06] px-3 py-1.5 text-[9px] font-bold text-cyan-200">
                {labRows.length} observations
              </span>
            </div>

            <div className="mt-7 h-[280px] overflow-hidden rounded-2xl border border-white/[.06] bg-[#06100c] p-3 sm:h-[330px] sm:p-5">
              <svg viewBox="0 0 760 300" className="h-full w-full">
                {[0, 1, 2, 3, 4].map((tick) => {
                  const y = 250 - tick * 50;
                  return (
                    <g key={tick}>
                      <line
                        x1="45"
                        y1={y}
                        x2="735"
                        y2={y}
                        stroke="rgba(255,255,255,.06)"
                        strokeDasharray="4 8"
                      />
                      <text x="8" y={y + 4} fill="rgba(148,163,184,.45)" fontSize="9">
                        {Math.round((maxLabError * tick) / 4)}%
                      </text>
                    </g>
                  );
                })}

                <polyline
                  points={labRows
                    .map((row, index) => {
                      const x = 45 + (index / Math.max(labRows.length - 1, 1)) * 690;
                      const y = 250 - (row.percentageError / maxLabError) * 210;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="#67e8f9"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="forecast-draw"
                />

                {labRows.map((row, index) => {
                  const x = 45 + (index / Math.max(labRows.length - 1, 1)) * 690;
                  const y = 250 - (row.percentageError / maxLabError) * 210;
                  return (
                    <circle
                      key={`${row.crop}-${row.month}`}
                      cx={x}
                      cy={y}
                      r="3.5"
                      fill="#67e8f9"
                      opacity=".9"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[.15em] text-slate-600">
              <span>{labRows[0]?.period ?? "No data"}</span>
              <span>chronological test window</span>
              <span>{labRows[labRows.length - 1]?.period ?? "No data"}</span>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[32px] border border-emerald-300/10 bg-emerald-300/[.035] p-7">
              <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                Selected crop signal
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-black text-white">{labCrop}</p>
                  <p className="mt-2 text-xs text-slate-600">
                    {labMetric.toUpperCase()} on chronological holdout
                  </p>
                </div>
                <p className="text-4xl font-black text-emerald-200">
                  {labMetric === "r2"
                    ? metricValue.toFixed(4)
                    : labMetric === "mape"
                      ? `${metricValue.toFixed(2)}%`
                      : formatPrice(metricValue)}
                </p>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/[.05]">
                <div
                  className="h-full rounded-full bg-emerald-300 transition-all duration-700"
                  style={{
                    width: `${
                      labMetric === "r2"
                        ? Math.max(metricValue * 100, 2)
                        : Math.max((metricValue / cropMetricMax) * 100, 2)
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/[.07] bg-white/[.025] p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                    Error distribution
                  </p>
                  <h3 className="mt-2 text-lg font-black text-white">
                    {labCrop} percentage-error buckets
                  </h3>
                </div>
                <span className="text-[9px] text-cyan-200">
                  max {maxLabError.toFixed(2)}%
                </span>
              </div>

              <div className="mt-7 grid grid-cols-6 items-end gap-2">
                {errorBuckets.map((bucket, index) => (
                  <div key={bucket.label} className="flex min-w-0 flex-col items-center gap-2">
                    <div className="flex h-28 w-full items-end justify-center rounded-xl bg-white/[.025] p-1">
                      <div
                        className="bar-rise w-full rounded-lg bg-cyan-300/60 transition-all duration-700"
                        style={{
                          height: `${Math.max(
                            (bucket.count / maxBucket) * 100,
                            bucket.count ? 8 : 2,
                          )}%`,
                          animationDelay: `${index * 90}ms`,
                        }}
                      />
                    </div>
                    <span className="text-center text-[8px] leading-3 text-slate-600">
                      {bucket.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300">
                      {bucket.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[32px] border border-white/[.07] bg-white/[.025] p-6 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                  Model benchmark
                </p>
                <h3 className="mt-2 text-xl font-black text-white">
                  Compare evaluation metrics
                </h3>
                <p className="mt-2 max-w-xl text-[10px] leading-5 text-slate-600">
                  Final evaluation: 243 chronological test observations across 9 complete forecasting crops. Extra Trees was selected by lowest test RMSE.
                </p>
              </div>
              <select
                value={labModelMetric}
                onChange={(e) =>
                  setLabModelMetric(e.target.value as typeof labModelMetric)
                }
                className="rounded-lg border border-white/10 bg-[#08130f] px-3 py-2 text-[9px] text-slate-400 outline-none"
              >
                <option value="rmse">RMSE</option>
                <option value="mae">MAE</option>
                <option value="mape">MAPE</option>
                <option value="r2">R²</option>
              </select>
            </div>

            <div className="mt-7 space-y-4">
              {modelResults.map((model, index) => {
                const value = model[labModelMetric];
                const width =
                  labModelMetric === "r2"
                    ? value * 100
                    : (value / maxModelMetric) * 100;

                return (
                  <div key={model.model} className="group">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-xs font-bold text-slate-300">
                        {model.model}
                      </span>
                      <span className="text-[10px] font-bold text-cyan-200">
                        {labModelMetric === "r2"
                          ? value.toFixed(4)
                          : labModelMetric === "mape"
                            ? `${value.toFixed(2)}%`
                            : `₹${value.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[.05]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 transition-all duration-700"
                        style={{
                          width: `${Math.max(width, 3)}%`,
                          animationDelay: `${index * 120}ms`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[32px] border border-cyan-300/10 bg-cyan-300/[.025] p-6 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                  Prediction telemetry
                </p>
                <h3 className="mt-2 text-xl font-black text-white">
                  Observed vs predicted snapshot
                </h3>
              </div>
              <span className="rounded-full border border-white/[.07] px-3 py-1.5 text-[9px] text-slate-500">
                Extra Trees
              </span>
            </div>

            <div className="mt-7 grid gap-2">
              {labRows.slice(-6).map((row, index) => {
                const maxPrice = Math.max(
                  ...labRows.slice(-6).flatMap((item) => [item.actual, item.predicted]),
                  1,
                );
                return (
                  <div
                    key={`${row.crop}-${row.month}`}
                    className="grid grid-cols-[70px_1fr_70px] items-center gap-3 rounded-xl border border-white/[.04] bg-black/10 p-2.5"
                  >
                    <span className="text-[9px] text-slate-600">{row.period}</span>
                    <div className="space-y-1.5">
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[.05]">
                        <div
                          className="h-full rounded-full bg-slate-400/70 transition-all duration-700"
                          style={{ width: `${(row.actual / maxPrice) * 100}%` }}
                        />
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[.05]">
                        <div
                          className="h-full rounded-full bg-cyan-300/70 transition-all duration-700"
                          style={{ width: `${(row.predicted / maxPrice) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-cyan-200">
                        {formatPrice(row.predicted)}
                      </p>
                      <p className="mt-0.5 text-[8px] text-slate-600">
                        err {row.percentageError.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-[9px] uppercase tracking-[.14em] text-slate-600">
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-slate-400/70" />
                observed
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-cyan-300/70" />
                predicted
              </span>
              <span className="ml-auto text-emerald-200">
                latest {formatPrice(labRows[labRows.length - 1]?.predicted ?? 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ForecastingPage() {
  const [sortBy, setSortBy] = useState<"mae" | "rmse" | "mape" | "r2">("mae");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [modelFilter, setModelFilter] = useState("All");
  const [cropFilter, setCropFilter] = useState("All");
  const [forecastCrop, setForecastCrop] = useState("Rice");

  const sortedCrops = useMemo(() => {
    const filtered = cropPerformance.filter(
      (item) => cropFilter === "All" || item.crop === cropFilter,
    );

    return [...filtered].sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      return direction === "asc" ? av - bv : bv - av;
    });
  }, [cropFilter, direction, sortBy]);

  const visibleModels = useMemo(() => {
    if (modelFilter === "All") return modelResults;
    return modelResults.filter((item) => item.status === modelFilter);
  }, [modelFilter]);

  const selectedForecastRows = useMemo(
    () => forecastRows.filter((item) => item.crop === forecastCrop),
    [forecastCrop],
  );

  const selectedResidualRows = selectedForecastRows;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030a07] text-white selection:bg-emerald-300 selection:text-[#03100a]">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: "Trebuchet MS", "Segoe UI", sans-serif;
          background: #030a07;
        }
        button,
        a,
        input,
        select {
          font-family: inherit;
        }
        img,
        svg,
        canvas {
          max-width: 100%;
        }
        @keyframes floatForecast {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes pulseGlowForecast {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.04);
          }
        }
        @keyframes drawForecast {
          from {
            stroke-dasharray: 0 1200;
          }
          to {
            stroke-dasharray: 1200 0;
          }
        }
        @keyframes barRise {
          from {
            transform: scaleY(0);
            transform-origin: bottom;
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            transform-origin: bottom;
            opacity: 1;
          }
        }
        @keyframes shimmerForecast {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120%);
          }
        }
        .forecast-float {
          animation: floatForecast 6s ease-in-out infinite;
        }
        .forecast-glow {
          animation: pulseGlowForecast 5s ease-in-out infinite;
        }
        .forecast-draw {
          animation: drawForecast 2.4s ease-out both;
        }
        .bar-rise {
          animation: barRise 0.7s ease-out both;
        }
        .forecast-shimmer {
          animation: shimmerForecast 2.8s ease-in-out infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.045) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.045) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
        }
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.65rem !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[430px] w-[430px] rounded-full bg-emerald-500/10 blur-[130px] forecast-glow" />
        <div className="absolute -right-32 top-[20%] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[150px] forecast-glow" />
        <div className="absolute bottom-[-180px] left-[25%] h-[450px] w-[450px] rounded-full bg-lime-400/[.06] blur-[140px]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      {/* =========================================================
          SHARED NAVBAR
          Uses the same navbar dimensions and responsive layout as
          the homepage and Analysis page via app/components/navbar.tsx.
      ========================================================= */}

      <Navbar />

      <section
        id="forecasting"
        className="relative z-10 flex min-h-screen items-center px-5 pb-16 pt-40 sm:px-6 sm:pb-20 sm:pt-48 lg:px-8 lg:pt-32"
      >
        <div className="mx-auto grid w-full max-w-7xl min-w-0 items-center gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <div className="min-w-0">
            <div className="mb-7 inline-flex max-w-full items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/[.06] px-4 py-2 backdrop-blur-xl">
              <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-emerald-300" />
              <span className="truncate text-[10px] font-bold uppercase tracking-[.2em] text-emerald-200 sm:text-[11px]">
                Machine Learning Forecast Lab
              </span>
            </div>
            <h1 className="hero-title max-w-4xl break-words text-[clamp(3rem,7vw,6.6rem)] font-black leading-[.9] tracking-[-.06em]">
              Predicting
              <br />
              <span className="bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Food Prices
              </span>
              <br />
              Ahead.
            </h1>
            <p className="mt-8 max-w-2xl text-[clamp(1rem,1.5vw,1.18rem)] leading-8 text-slate-400">
              Move from historical analysis to forward-looking estimates. This
              page presents model evaluation, forecast behavior, uncertainty,
              and crop-level signals in one interactive forecasting workspace.
            </p>
            <div className="mt-9 flex w-full max-w-full flex-col gap-3 sm:flex-row">
              <a
                href="#forecast-chart"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-300 px-6 py-4 text-sm font-black text-[#03100a] shadow-[0_0_45px_rgba(110,231,183,.15)] transition hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(110,231,183,.25)] sm:w-auto"
              >
                Explore Forecasts ↓
              </a>
              <a
                href="#models"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[.035] px-6 py-4 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-300/20 sm:w-auto"
              >
                Evaluate Models →
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["₹78.74", "MAE"],
                ["₹134.46", "RMSE"],
                ["1.99%", "MAPE"],
                ["0.9941", "R²"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[.07] bg-white/[.025] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-300/20"
                >
                  <div className="text-lg font-black text-white sm:text-xl">
                    {value}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[.16em] text-slate-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-[720px]">
            <div className="absolute -inset-8 rounded-[50px] bg-emerald-300/[.04] blur-3xl forecast-glow" />
            <div className="forecast-float relative overflow-hidden rounded-[34px] border border-emerald-300/10 bg-[#07130e]/80 p-4 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-6">
              <div className="absolute right-[-50px] top-[-60px] h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4 border-b border-white/[.06] pb-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[.22em] text-emerald-300/70">
                    Forecast engine
                  </p>
                  <h2 className="mt-1 text-xl font-black text-white">
                    Extra Trees
                  </h2>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-300/15 bg-emerald-300/[.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-200">
                  Evaluated
                </span>
              </div>
              <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                    className="rounded-2xl border border-white/[.06] bg-white/[.025] p-4 transition hover:border-emerald-300/20 hover:bg-emerald-300/[.035]"
                  >
                    <p className="text-[8px] uppercase tracking-[.18em] text-slate-600">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-black text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative mt-5 h-[235px] overflow-hidden rounded-2xl border border-white/[.06] bg-black/10 p-2 sm:h-[275px] sm:p-4">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <MiniLineChart rows={selectedForecastRows} />
                <div className="absolute bottom-2 left-3 flex gap-4 text-[8px] uppercase tracking-wider text-slate-600 sm:left-5">
                  <span>Actual</span>
                  <span className="text-emerald-300">Forecast</span>
                </div>
              </div>
              <p className="relative mt-4 text-[9px] leading-5 text-slate-600">
                Historical test-set predictions from the exported Extra Trees
                evaluation output.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="forecast-chart"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-cyan-300">
                01 / Forecast trajectory
              </p>
              <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[.94] tracking-[-.05em]">
                Actuals meet{" "}
                <span className="text-slate-600">the forecast.</span>
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
                Actual and predicted prices from the 243-observation
                chronological holdout used to evaluate the Extra Trees model.
                Select a crop to inspect its month-by-month test predictions.
              </p>
            </div>
            <select
              value={forecastCrop}
              onChange={(e) => setForecastCrop(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#08130f] px-4 py-3 text-xs text-slate-300 outline-none sm:w-auto"
              aria-label="Select crop for forecast trajectory"
            >
              {cropPerformance.map((item) => (
                <option key={item.crop}>{item.crop}</option>
              ))}
            </select>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-white/[.08] bg-white/[.025] p-4 backdrop-blur-xl sm:p-7">
            <div className="mb-6 flex flex-col gap-4 border-b border-white/[.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[.2em] text-slate-600">
                  {selectedForecastRows.length}-observation test view
                </p>
                <h3 className="mt-1 text-xl font-black text-white">
                  {forecastCrop} — actual vs predicted
                </h3>
              </div>
              <span className="w-fit rounded-full border border-emerald-300/10 bg-emerald-300/[.025] px-3 py-1.5 text-[9px] uppercase tracking-wider text-emerald-200">
                Extra Trees
              </span>
            </div>

            <div className="relative h-[330px] overflow-hidden rounded-2xl border border-white/[.05] bg-[#06100c] p-2 sm:h-[430px] sm:p-5">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative h-full w-full">
                <MiniLineChart rows={selectedForecastRows} height={390} />
                <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2 text-[8px] uppercase tracking-wider text-slate-700 sm:px-3">
                  <span>{selectedForecastRows[0]?.period}</span>
                  <span>{selectedForecastRows.at(-1)?.period}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[.06] bg-white/[.02] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="text-[9px] uppercase tracking-wider text-slate-500">
                      Observed price
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-600">
                    Latest test point
                  </span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <span className="text-xl font-black text-slate-200">
                    {selectedForecastRows.length > 0
                      ? formatPrice(
                          selectedForecastRows[selectedForecastRows.length - 1]
                            .actual,
                        )
                      : "—"}
                  </span>
                  <span className="text-[9px] text-slate-600">
                    {selectedForecastRows.at(-1)?.period ?? "No test data"}
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-300/10 bg-emerald-300/[.025] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
                    <span className="text-[9px] uppercase tracking-wider text-slate-500">
                      Model prediction
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-300/60">
                    Extra Trees
                  </span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <span className="text-xl font-black text-emerald-200">
                    {selectedForecastRows.length > 0
                      ? formatPrice(
                          selectedForecastRows[selectedForecastRows.length - 1]
                            .predicted,
                        )
                      : "—"}
                  </span>
                  <span className="text-[9px] text-slate-600">
                    {selectedForecastRows.at(-1)?.period ?? "No test data"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="models"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-emerald-300">
                02 / Model evaluation
              </p>
              <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[.94] tracking-[-.05em]">
                Measure the model,{" "}
                <span className="text-slate-600">not just the prediction.</span>
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
                Model quality is evaluated using regression metrics rather than
                a generic “accuracy” percentage. Lower MAE/RMSE and lower MAPE
                indicate smaller errors; higher R² indicates stronger explained
                variance.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["MAE", "₹78.74", "Average absolute error"],
                  ["RMSE", "₹134.46", "Penalizes larger errors"],
                  ["MAPE", "1.99%", "Relative error"],
                  ["R²", "0.9941", "Explained variance"],
                ].map(([a, b, c]) => (
                  <div
                    key={a}
                    className="rounded-2xl border border-white/[.07] bg-white/[.025] p-4"
                  >
                    <p className="text-[9px] uppercase tracking-[.16em] text-slate-600">
                      {a}
                    </p>
                    <p className="mt-2 text-2xl font-black text-white">{b}</p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-600">
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-white/[.08] bg-white/[.025] p-4 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-3 border-b border-white/[.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[.2em] text-slate-600">
                    Benchmark table
                  </p>
                  <h3 className="mt-1 text-lg font-black text-white">
                    Compare forecasting approaches
                  </h3>
                </div>
                <select
                  value={modelFilter}
                  onChange={(e) => setModelFilter(e.target.value)}
                  className="rounded-xl border border-white/10 bg-[#08130f] px-3 py-2 text-xs text-slate-300 outline-none focus:border-emerald-300/30"
                >
                  <option>All</option>
                  <option>Selected</option>
                  <option>Comparison</option>
                  <option>Baseline</option>
                </select>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[620px] text-left">
                  <thead>
                    <tr className="border-b border-white/[.06] text-[9px] uppercase tracking-[.16em] text-slate-600">
                      <th className="px-3 py-3">Model</th>
                      <th className="px-3 py-3">RMSE</th>
                      <th className="px-3 py-3">MAE</th>
                      <th className="px-3 py-3">MAPE</th>
                      <th className="px-3 py-3">SMAPE</th>
                      <th className="px-3 py-3">R²</th>
                      <th className="px-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleModels.map((row) => (
                      <tr
                        key={row.model}
                        className="border-b border-white/[.04] transition hover:bg-emerald-300/[.025]"
                      >
                        <td className="px-3 py-4 text-sm font-bold text-white">
                          {row.model}
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-400">
                          ₹{row.rmse.toFixed(2)}
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-400">
                          ₹{row.mae.toFixed(2)}
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-400">
                          {row.mape.toFixed(2)}%
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-400">
                          {row.smape == null ? "—" : `${row.smape.toFixed(2)}%`}
                        </td>
                        <td className="px-3 py-4 text-sm text-slate-400">
                          {row.r2.toFixed(4)}
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] uppercase tracking-wider ${row.status === "Selected" ? "bg-emerald-300/10 text-emerald-200" : "bg-white/[.04] text-slate-500"}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="crops"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-teal-300">
                03 / Crop performance explorer
              </p>
              <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[.94] tracking-[-.05em]">
                Compare the signals.{" "}
                <span className="text-slate-600">See where errors differ.</span>
              </h2>
              <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
                These metrics are calculated from the same chronological test
                predictions used in the overall evaluation.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#08130f] px-4 py-3 text-xs text-slate-300 outline-none"
              >
                <option>All</option>
                {cropPerformance.map((item) => (
                  <option key={item.crop}>{item.crop}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="rounded-xl border border-white/10 bg-[#08130f] px-4 py-3 text-xs text-slate-300 outline-none"
              >
                <option value="mae">Sort: MAE</option>
                <option value="rmse">Sort: RMSE</option>
                <option value="mape">Sort: MAPE</option>
                <option value="r2">Sort: R²</option>
              </select>

              <button
                onClick={() =>
                  setDirection((v) => (v === "asc" ? "desc" : "asc"))
                }
                className="rounded-xl border border-emerald-300/15 bg-emerald-300/[.06] px-4 py-3 text-xs font-bold text-emerald-200 transition hover:bg-emerald-300/10"
              >
                {direction === "asc" ? "Low → High" : "High → Low"}
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedCrops.map((item, index) => (
              <article
                key={item.crop}
                className="group relative overflow-hidden rounded-[28px] border border-white/[.07] bg-white/[.025] p-6 transition duration-500 hover:-translate-y-2 hover:border-emerald-300/20 hover:bg-white/[.04]"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-300/[.04] blur-3xl transition group-hover:bg-emerald-300/[.09]" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                      {String(index + 1).padStart(2, "0")} / commodity
                    </span>
                    <h3 className="mt-3 text-2xl font-black text-white">
                      {item.crop}
                    </h3>
                  </div>
                  <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-[9px] font-bold text-cyan-200">
                    {item.observations} test
                  </span>
                </div>

                <div className="relative mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[.16em] text-slate-600">
                      MAE
                    </p>
                    <p className="mt-2 text-xl font-black text-slate-200">
                      {formatPrice(item.mae)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[.16em] text-slate-600">
                      RMSE
                    </p>
                    <p className="mt-2 text-xl font-black text-emerald-200">
                      {formatPrice(item.rmse)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[.16em] text-slate-600">
                      MAPE
                    </p>
                    <p className="mt-2 text-lg font-black text-slate-300">
                      {item.mape.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[.16em] text-slate-600">
                      R²
                    </p>
                    <p className="mt-2 text-lg font-black text-cyan-200">
                      {item.r2.toFixed(4)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ForecastAnalyticsLab />\n\n      <section
        id="errors"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-[32px] border border-white/[.08] bg-white/[.025] p-5 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-cyan-300">
              04 / Residual behavior
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">
              Where does the model miss?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              Residuals help reveal whether errors are centered around zero or
              whether the model repeatedly under- or over-estimates particular
              periods.
            </p>
            <div className="mt-8 h-[280px] overflow-hidden rounded-2xl border border-white/[.06] bg-[#06100c] p-3 sm:h-[340px] sm:p-5">
              <ErrorChart rows={selectedResidualRows} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border border-emerald-300/10 bg-emerald-300/[.035] p-7">
              <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                Test observations
              </p>
              <p className="mt-3 text-5xl font-black text-white">243</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Chronological holdout observations used for evaluation.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/[.07] bg-white/[.025] p-7">
              <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                Predictor columns
              </p>
              <p className="mt-3 text-5xl font-black text-cyan-200">58</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Model features used by the forecasting pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="dashboard"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-emerald-300">
              05 / Forecast dashboard
            </p>
            <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[.94] tracking-[-.05em]">
              One place for{" "}
              <span className="text-slate-600">the forecast story.</span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
              This dashboard frame is prepared for the final Tableau and Power
              BI integration. The page already exposes the model metrics, crop
              filters, sorting, forecast curve, and error diagnostics needed for
              the interactive layer.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[36px] border border-emerald-300/10 bg-gradient-to-br from-emerald-300/[.045] via-white/[.02] to-cyan-300/[.04] p-4 shadow-[0_40px_120px_rgba(0,0,0,.4)] sm:p-7">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/[.06] bg-[#06100c]/80 p-5 backdrop-blur-xl md:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                      Forecast monitor
                    </p>
                    <p className="mt-1 font-bold text-white">
                      Observed vs predicted
                    </p>
                  </div>
                  <span className="text-[9px] text-emerald-300">R² 0.9941</span>
                </div>
                <div className="mt-6 h-[230px]">
                  <MiniLineChart rows={selectedForecastRows} />
                </div>
              </div>
              <div className="rounded-2xl border border-white/[.06] bg-[#06100c]/80 p-5 backdrop-blur-xl">
                <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                  Model metrics
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    ["MAE", "₹78.74"],
                    ["RMSE", "₹134.46"],
                    ["MAPE", "1.99%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/[.05] bg-white/[.02] p-3"
                    >
                      <p className="text-[8px] uppercase tracking-wider text-slate-600">
                        {label}
                      </p>
                      <p className="mt-2 text-sm font-black text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/[.06] bg-[#06100c]/80 p-5 backdrop-blur-xl">
                <p className="text-[9px] uppercase tracking-[.18em] text-slate-600">
                  Pipeline
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    "Processed data",
                    "Feature engineering",
                    "Chronological split",
                    "Model evaluation",
                    "Forecast evaluation",
                  ].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] ${index < 5 ? "bg-emerald-300/10 text-emerald-300" : "bg-white/[.04] text-slate-600"}`}
                      >
                        {index < 5 ? "✓" : "•"}
                      </span>
                      <span className="text-xs text-slate-500">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/[.06] bg-[#06100c]/80 p-5 backdrop-blur-xl md:col-span-2">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/[.05] bg-white/[.02] p-4">
                    <p className="text-[8px] uppercase tracking-wider text-slate-600">
                      Next layer
                    </p>
                    <p className="mt-2 font-bold text-white">Tableau</p>
                  </div>
                  <div className="rounded-xl border border-white/[.05] bg-white/[.02] p-4">
                    <p className="text-[8px] uppercase tracking-wider text-slate-600">
                      Next layer
                    </p>
                    <p className="mt-2 font-bold text-white">Power BI</p>
                  </div>
                  <div className="rounded-xl border border-white/[.05] bg-white/[.02] p-4">
                    <p className="text-[8px] uppercase tracking-wider text-slate-600">
                      Data source
                    </p>
                    <p className="mt-2 font-bold text-emerald-200">
                      Processed CSV
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-white/[.07] bg-gradient-to-br from-emerald-300/[.05] via-white/[.02] to-cyan-300/[.04] p-7 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-emerald-300">
                Forecasting workflow
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-.05em] text-white sm:text-5xl">
                From cleaned records to future estimates.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500">
                The forecasting layer sits after ingestion, cleaning, EDA, and
                feature engineering. The next step is to connect the final
                exported predictions so every visual on this page is driven
                directly by the project artifacts.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["01", "Prepare", "Temporal features and lag variables"],
                ["02", "Train", "Chronological train-test split"],
                ["03", "Evaluate", "MAE · RMSE · MAPE · R²"],
                ["04", "Forecast", "Generate future price estimates"],
              ].map(([n, t, d]) => (
                <div
                  key={n}
                  className="group rounded-2xl border border-white/[.06] bg-black/10 p-5 transition hover:-translate-y-1 hover:border-emerald-300/15"
                >
                  <span className="text-[9px] font-bold tracking-[.2em] text-emerald-300/50">
                    {n}
                  </span>
                  <h3 className="mt-4 font-bold text-white">{t}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
