"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const analysisCards = [
  {
    number: "01",
    title: "Price Trends",
    description:
      "Track long-term movements in agricultural commodity prices and identify periods of growth, decline, and volatility.",
    tag: "TIME SERIES",
  },
  {
    number: "02",
    title: "Crop Comparison",
    description:
      "Compare price behavior across major crops to understand differences in market performance and movement.",
    tag: "CROP LEVEL",
  },
  {
    number: "03",
    title: "Seasonality",
    description:
      "Explore recurring monthly behavior and identify seasonal patterns that influence agricultural prices.",
    tag: "SEASONAL",
  },
  {
    number: "04",
    title: "Market Behavior",
    description:
      "Examine changing market conditions and understand how prices behave across historical periods.",
    tag: "MARKET DATA",
  },
];

const cropData = [{"crop":"Banana","country":"India","price":3300.0,"change":-17.5,"volatility":24.31,"latest":"2025-12","observations":894,"markets":435,"states":21},{"crop":"Cotton","country":"India","price":7000.0,"change":-1.06,"volatility":25.61,"latest":"2025-12","observations":371,"markets":185,"states":10},{"crop":"Groundnut","country":"India","price":5800.0,"change":0.0,"volatility":17.59,"latest":"2025-12","observations":335,"markets":170,"states":10},{"crop":"Jowar/Sorghum","country":"India","price":3100.0,"change":24.0,"volatility":25.87,"latest":"2025-12","observations":130,"markets":88,"states":9},{"crop":"Maize","country":"India","price":1635.0,"change":-26.68,"volatility":21.64,"latest":"2025-12","observations":899,"markets":399,"states":12},{"crop":"Onion","country":"India","price":1600.0,"change":-58.97,"volatility":52.47,"latest":"2025-12","observations":633,"markets":593,"states":22},{"crop":"Potato","country":"India","price":1200.0,"change":100.0,"volatility":37.73,"latest":"2020-02","observations":366,"markets":359,"states":18},{"crop":"Rice","country":"India","price":3500.0,"change":-2.78,"volatility":12.63,"latest":"2025-12","observations":281,"markets":143,"states":11},{"crop":"Wheat","country":"India","price":2480.0,"change":-9.37,"volatility":19.06,"latest":"2025-12","observations":1261,"markets":561,"states":11}];

const monthlyPriceData = [{"crop":"Banana","date":"2015-01","year":2015,"month":1,"price":2050.0,"mean":2225.47,"min":190.0,"max":5200.0,"observations":471,"markets":215,"states":20},{"crop":"Banana","date":"2015-02","year":2015,"month":2,"price":2000.0,"mean":1982.35,"min":575.0,"max":4000.0,"observations":125,"markets":75,"states":13},{"crop":"Banana","date":"2015-03","year":2015,"month":3,"price":1960.0,"mean":1901.77,"min":275.0,"max":3600.0,"observations":142,"markets":93,"states":15},{"crop":"Banana","date":"2015-04","year":2015,"month":4,"price":1910.0,"mean":1954.39,"min":85.0,"max":5000.0,"observations":433,"markets":230,"states":22},{"crop":"Banana","date":"2015-05","year":2015,"month":5,"price":1900.0,"mean":1932.35,"min":90.0,"max":6000.0,"observations":420,"markets":224,"states":21},{"crop":"Banana","date":"2015-06","year":2015,"month":6,"price":1900.0,"mean":2025.62,"min":95.0,"max":6300.0,"observations":515,"markets":229,"states":22},{"crop":"Banana","date":"2015-07","year":2015,"month":7,"price":1900.0,"mean":2076.22,"min":65.0,"max":5300.0,"observations":523,"markets":246,"states":21},{"crop":"Banana","date":"2015-08","year":2015,"month":8,"price":1800.0,"mean":1987.99,"min":90.0,"max":5100.0,"observations":489,"markets":235,"states":22},{"crop":"Banana","date":"2015-09","year":2015,"month":9,"price":1900.0,"mean":2031.23,"min":80.0,"max":6000.0,"observations":539,"markets":243,"states":21},{"crop":"Banana","date":"2015-10","year":2015,"month":10,"price":1800.0,"mean":2004.6,"min":85.0,"max":5200.0,"observations":531,"markets":236,"states":24},{"crop":"Banana","date":"2015-11","year":2015,"month":11,"price":1525.0,"mean":1529.11,"min":80.0,"max":4000.0,"observations":166,"markets":95,"states":16},{"crop":"Banana","date":"2015-12","year":2015,"month":12,"price":1800.0,"mean":1828.85,"min":90.0,"max":4500.0,"observations":511,"markets":239,"states":23},{"crop":"Banana","date":"2016-01","year":2016,"month":1,"price":1782.5,"mean":1860.13,"min":80.0,"max":4500.0,"observations":462,"markets":218,"states":22},{"crop":"Banana","date":"2016-02","year":2016,"month":2,"price":1700.0,"mean":1896.23,"min":80.0,"max":5000.0,"observations":463,"markets":228,"states":22},{"crop":"Banana","date":"2016-03","year":2016,"month":3,"price":1700.0,"mean":1906.06,"min":80.0,"max":5500.0,"observations":472,"markets":241,"states":23},{"crop":"Banana","date":"2016-04","year":2016,"month":4,"price":1800.0,"mean":2066.68,"min":80.0,"max":7000.0,"observations":407,"markets":209,"states":22},{"crop":"Banana","date":"2016-05","year":2016,"month":5,"price":1600.0,"mean":1689.01,"min":80.0,"max":6000.0,"observations":170,"markets":98,"states":15},{"crop":"Banana","date":"2016-06","year":2016,"month":6,"price":2120.0,"mean":2463.8,"min":85.0,"max":6200.0,"observations":553,"markets":237,"states":20},{"crop":"Banana","date":"2016-07","year":2016,"month":7,"price":2300.0,"mean":2762.59,"min":100.0,"max":7100.0,"observations":505,"markets":231,"states":23},{"crop":"Banana","date":"2016-08","year":2016,"month":8,"price":2500.0,"mean":2993.32,"min":110.0,"max":7700.0,"observations":545,"markets":235,"states":24},{"crop":"Banana","date":"2016-09","year":2016,"month":9,"price":2500.0,"mean":2934.03,"min":130.0,"max":7800.0,"observations":521,"markets":225,"states":23},{"crop":"Banana","date":"2016-10","year":2016,"month":10,"price":2000.0,"mean":2360.16,"min":100.0,"max":6400.0,"observations":431,"markets":212,"states":19},{"crop":"Banana","date":"2016-11","year":2016,"month":11,"price":2100.0,"mean":2568.52,"min":100.0,"max":9000.0,"observations":463,"markets":210,"states":21},{"crop":"Banana","date":"2016-12","year":2016,"month":12,"price":2000.0,"mean":2442.88,"min":150.0,"max":7700.0,"observations":457,"markets":209,"states":21},{"crop":"Banana","date":"2017-01","year":2017,"month":1,"price":1500.0,"mean":1823.04,"min":90.0,"max":6000.0,"observations":150,"markets":89,"states":16},{"crop":"Banana","date":"2017-02","year":2017,"month":2,"price":2100.0,"mean":2438.47,"min":100.0,"max":6500.0,"observations":465,"markets":208,"states":23},{"crop":"Banana","date":"2017-03","year":2017,"month":3,"price":2150.0,"mean":2497.08,"min":100.0,"max":11000.0,"observations":528,"markets":226,"states":22},{"crop":"Banana","date":"2017-04","year":2017,"month":4,"price":2200.0,"mean":2475.29,"min":120.0,"max":6500.0,"observations":431,"markets":203,"states":20},{"crop":"Banana","date":"2017-05","year":2017,"month":5,"price":2200.0,"mean":2369.86,"min":135.0,"max":6500.0,"observations":426,"markets":204,"states":23},{"crop":"Banana","date":"2017-06","year":2017,"month":6,"price":2340.0,"mean":2581.5,"min":135.0,"max":7700.0,"observations":466,"markets":207,"states":24},{"crop":"Banana","date":"2017-07","year":2017,"month":7,"price":2205.0,"mean":2490.16,"min":150.0,"max":7500.0,"observations":440,"markets":214,"states":20},{"crop":"Banana","date":"2017-08","year":2017,"month":8,"price":2260.0,"mean":2794.25,"min":200.0,"max":8500.0,"observations":577,"markets":263,"states":21},{"crop":"Banana","date":"2017-09","year":2017,"month":9,"price":2200.0,"mean":2823.16,"min":190.0,"max":9500.0,"observations":570,"markets":270,"states":23},{"crop":"Banana","date":"2017-10","year":2017,"month":10,"price":1850.0,"mean":1951.25,"min":180.0,"max":6000.0,"observations":259,"markets":139,"states":16},{"crop":"Banana","date":"2017-11","year":2017,"month":11,"price":2100.0,"mean":2474.48,"min":200.0,"max":7400.0,"observations":555,"markets":265,"states":23},{"crop":"Banana","date":"2017-12","year":2017,"month":12,"price":2200.0,"mean":2453.66,"min":100.0,"max":8500.0,"observations":546,"markets":245,"states":23},{"crop":"Banana","date":"2018-01","year":2018,"month":1,"price":2200.0,"mean":2432.64,"min":120.0,"max":9000.0,"observations":539,"markets":244,"states":21},{"crop":"Banana","date":"2018-02","year":2018,"month":2,"price":2200.0,"mean":2437.05,"min":150.0,"max":7624.0,"observations":555,"markets":241,"states":21},{"crop":"Banana","date":"2018-03","year":2018,"month":3,"price":2300.0,"mean":2500.58,"min":130.0,"max":7500.0,"observations":534,"markets":245,"states":22},{"crop":"Banana","date":"2018-04","year":2018,"month":4,"price":1960.0,"mean":1956.69,"min":287.5,"max":6300.0,"observations":187,"markets":110,"states":13},{"crop":"Banana","date":"2018-05","year":2018,"month":5,"price":2200.0,"mean":2296.88,"min":294.0,"max":5800.0,"observations":480,"markets":245,"states":20},{"crop":"Banana","date":"2018-06","year":2018,"month":6,"price":2200.0,"mean":2448.27,"min":295.0,"max":7800.0,"observations":512,"markets":254,"states":22},{"crop":"Banana","date":"2018-07","year":2018,"month":7,"price":2000.0,"mean":1947.17,"min":315.0,"max":5000.0,"observations":165,"markets":99,"states":15},{"crop":"Banana","date":"2018-08","year":2018,"month":8,"price":2100.0,"mean":2377.51,"min":290.0,"max":8000.0,"observations":584,"markets":275,"states":22},{"crop":"Banana","date":"2018-09","year":2018,"month":9,"price":2000.0,"mean":2240.43,"min":27.0,"max":7100.0,"observations":462,"markets":243,"states":20},{"crop":"Banana","date":"2018-10","year":2018,"month":10,"price":2100.0,"mean":2278.51,"min":160.0,"max":6600.0,"observations":564,"markets":274,"states":19},{"crop":"Banana","date":"2018-11","year":2018,"month":11,"price":2332.5,"mean":2566.61,"min":226.0,"max":7500.0,"observations":456,"markets":235,"states":24},{"crop":"Banana","date":"2018-12","year":2018,"month":12,"price":2100.0,"mean":2264.13,"min":215.0,"max":6500.0,"observations":510,"markets":245,"states":22},{"crop":"Banana","date":"2019-01","year":2019,"month":1,"price":2000.0,"mean":2155.88,"min":260.0,"max":5200.0,"observations":508,"markets":252,"states":20},{"crop":"Banana","date":"2019-02","year":2019,"month":2,"price":2200.0,"mean":2397.94,"min":180.0,"max":8200.0,"observations":607,"markets":260,"states":22},{"crop":"Banana","date":"2019-03","year":2019,"month":3,"price":2180.0,"mean":2426.87,"min":210.0,"max":6100.0,"observations":588,"markets":268,"states":21},{"crop":"Banana","date":"2019-04","year":2019,"month":4,"price":2200.0,"mean":2442.21,"min":175.0,"max":11000.0,"observations":654,"markets":279,"states":20},{"crop":"Banana","date":"2019-05","year":2019,"month":5,"price":2150.0,"mean":2285.28,"min":190.0,"max":6700.0,"observations":562,"markets":281,"states":23},{"crop":"Banana","date":"2019-06","year":2019,"month":6,"price":2310.0,"mean":2619.77,"min":245.0,"max":7800.0,"observations":502,"markets":259,"states":21},{"crop":"Banana","date":"2019-07","year":2019,"month":7,"price":2500.0,"mean":2885.97,"min":235.0,"max":8600.0,"observations":659,"markets":281,"states":19},{"crop":"Banana","date":"2019-08","year":2019,"month":8,"price":2535.0,"mean":2870.98,"min":200.0,"max":9500.0,"observations":596,"markets":260,"states":22},{"crop":"Banana","date":"2019-09","year":2019,"month":9,"price":2200.0,"mean":2554.78,"min":500.0,"max":8000.0,"observations":290,"markets":154,"states":16},{"crop":"Banana","date":"2019-10","year":2019,"month":10,"price":2400.0,"mean":2787.08,"min":200.0,"max":8200.0,"observations":520,"markets":253,"states":21},{"crop":"Banana","date":"2019-11","year":2019,"month":11,"price":2400.0,"mean":2728.81,"min":270.0,"max":8100.0,"observations":606,"markets":269,"states":23},{"crop":"Banana","date":"2019-12","year":2019,"month":12,"price":2200.0,"mean":2199.26,"min":500.0,"max":6800.0,"observations":253,"markets":137,"states":16},{"crop":"Banana","date":"2020-01","year":2020,"month":1,"price":2300.0,"mean":2487.39,"min":400.0,"max":7600.0,"observations":352,"markets":193,"states":15},{"crop":"Banana","date":"2020-02","year":2020,"month":2,"price":2300.0,"mean":2339.95,"min":352.0,"max":7200.0,"observations":385,"markets":202,"states":17},{"crop":"Banana","date":"2020-03","year":2020,"month":3,"price":2225.0,"mean":2322.71,"min":700.0,"max":7000.0,"observations":184,"markets":105,"states":12},{"crop":"Banana","date":"2020-04","year":2020,"month":4,"price":2400.0,"mean":2349.53,"min":150.0,"max":6000.0,"observations":328,"markets":184,"states":14},{"crop":"Banana","date":"2020-05","year":2020,"month":5,"price":2350.0,"mean":2416.21,"min":500.0,"max":7600.0,"observations":347,"markets":194,"states":15},{"crop":"Banana","date":"2020-06","year":2020,"month":6,"price":2240.0,"mean":2416.6,"min":375.0,"max":6800.0,"observations":457,"markets":216,"states":18},{"crop":"Banana","date":"2020-07","year":2020,"month":7,"price":2200.0,"mean":2429.35,"min":300.0,"max":9000.0,"observations":417,"markets":212,"states":17},{"crop":"Banana","date":"2020-08","year":2020,"month":8,"price":2062.5,"mean":2273.62,"min":400.0,"max":9000.0,"observations":242,"markets":158,"states":15},{"crop":"Banana","date":"2020-09","year":2020,"month":9,"price":2260.0,"mean":2610.83,"min":350.0,"max":7000.0,"observations":329,"markets":192,"states":16},{"crop":"Banana","date":"2020-10","year":2020,"month":10,"price":2330.0,"mean":2570.06,"min":275.0,"max":6100.0,"observations":406,"markets":203,"states":19},{"crop":"Banana","date":"2020-11","year":2020,"month":11,"price":2150.0,"mean":2344.41,"min":500.0,"max":7500.0,"observations":192,"markets":102,"states":13},{"crop":"Banana","date":"2020-12","year":2020,"month":12,"price":2200.0,"mean":2420.39,"min":280.0,"max":7800.0,"observations":376,"markets":196,"states":15},{"crop":"Banana","date":"2021-01","year":2021,"month":1,"price":2100.0,"mean":2281.53,"min":325.0,"max":6600.0,"observations":456,"markets":222,"states":15},{"crop":"Banana","date":"2021-02","year":2021,"month":2,"price":2100.0,"mean":2215.61,"min":275.0,"max":7600.0,"observations":447,"markets":223,"states":17},{"crop":"Banana","date":"2021-03","year":2021,"month":3,"price":2250.0,"mean":2364.61,"min":300.0,"max":7100.0,"observations":503,"markets":236,"states":17},{"crop":"Banana","date":"2021-04","year":2021,"month":4,"price":2300.0,"mean":2365.49,"min":400.0,"max":6300.0,"observations":409,"markets":213,"states":19},{"crop":"Banana","date":"2021-05","year":2021,"month":5,"price":2440.0,"mean":2617.68,"min":401.0,"max":6800.0,"observations":269,"markets":161,"states":13},{"crop":"Banana","date":"2021-06","year":2021,"month":6,"price":2400.0,"mean":2466.39,"min":476.0,"max":7500.0,"observations":445,"markets":212,"states":15},{"crop":"Banana","date":"2021-07","year":2021,"month":7,"price":2400.0,"mean":2576.5,"min":815.0,"max":8100.0,"observations":443,"markets":204,"states":15},{"crop":"Banana","date":"2021-08","year":2021,"month":8,"price":2400.0,"mean":2573.53,"min":936.0,"max":7000.0,"observations":135,"markets":79,"states":13},{"crop":"Banana","date":"2021-09","year":2021,"month":9,"price":2410.0,"mean":2593.59,"min":400.0,"max":6200.0,"observations":472,"markets":227,"states":16},{"crop":"Banana","date":"2021-10","year":2021,"month":10,"price":2400.0,"mean":2534.94,"min":450.0,"max":9200.0,"observations":510,"markets":237,"states":17},{"crop":"Banana","date":"2021-11","year":2021,"month":11,"price":2350.0,"mean":2468.86,"min":300.0,"max":6000.0,"observations":485,"markets":220,"states":16},{"crop":"Banana","date":"2021-12","year":2021,"month":12,"price":2300.0,"mean":2480.04,"min":250.0,"max":7000.0,"observations":475,"markets":213,"states":15},{"crop":"Banana","date":"2022-01","year":2022,"month":1,"price":2100.0,"mean":2432.81,"min":300.0,"max":6500.0,"observations":540,"markets":249,"states":20},{"crop":"Banana","date":"2022-02","year":2022,"month":2,"price":2200.0,"mean":3265.6,"min":300.0,"max":350000.0,"observations":680,"markets":288,"states":22},{"crop":"Banana","date":"2022-03","year":2022,"month":3,"price":2300.0,"mean":2728.2,"min":300.0,"max":8500.0,"observations":625,"markets":288,"states":22},{"crop":"Banana","date":"2022-04","year":2022,"month":4,"price":2500.0,"mean":3182.67,"min":400.0,"max":42000.0,"observations":628,"markets":289,"states":23},{"crop":"Banana","date":"2022-05","year":2022,"month":5,"price":2100.0,"mean":2595.0,"min":400.0,"max":7900.0,"observations":230,"markets":125,"states":14},{"crop":"Banana","date":"2022-06","year":2022,"month":6,"price":2635.0,"mean":3403.47,"min":525.0,"max":55000.0,"observations":603,"markets":269,"states":22},{"crop":"Banana","date":"2022-07","year":2022,"month":7,"price":2850.0,"mean":3852.48,"min":525.0,"max":55000.0,"observations":561,"markets":265,"states":20},{"crop":"Banana","date":"2022-08","year":2022,"month":8,"price":2892.5,"mean":3322.62,"min":480.0,"max":17875.0,"observations":650,"markets":278,"states":22},{"crop":"Banana","date":"2022-09","year":2022,"month":9,"price":2650.0,"mean":3070.29,"min":480.0,"max":14000.0,"observations":532,"markets":269,"states":23},{"crop":"Banana","date":"2022-10","year":2022,"month":10,"price":2535.0,"mean":3956.55,"min":480.0,"max":500000.0,"observations":556,"markets":262,"states":22},{"crop":"Banana","date":"2022-11","year":2022,"month":11,"price":2500.0,"mean":2954.49,"min":500.0,"max":7600.0,"observations":596,"markets":263,"states":24},{"crop":"Banana","date":"2022-12","year":2022,"month":12,"price":2400.0,"mean":3725.54,"min":350.0,"max":400000.0,"observations":654,"markets":268,"states":24},{"crop":"Banana","date":"2023-01","year":2023,"month":1,"price":2100.0,"mean":2397.23,"min":480.0,"max":6200.0,"observations":233,"markets":130,"states":15},{"crop":"Banana","date":"2023-02","year":2023,"month":2,"price":2560.0,"mean":3235.63,"min":480.0,"max":52000.0,"observations":697,"markets":288,"states":24},{"crop":"Banana","date":"2023-03","year":2023,"month":3,"price":2890.0,"mean":3555.23,"min":480.0,"max":52000.0,"observations":536,"markets":257,"states":24},{"crop":"Banana","date":"2023-04","year":2023,"month":4,"price":3000.0,"mean":3088.8,"min":480.0,"max":7800.0,"observations":542,"markets":264,"states":23},{"crop":"Banana","date":"2023-05","year":2023,"month":5,"price":2800.0,"mean":2992.97,"min":480.0,"max":15200.0,"observations":633,"markets":293,"states":22},{"crop":"Banana","date":"2023-06","year":2023,"month":6,"price":2630.0,"mean":3879.29,"min":480.0,"max":380000.0,"observations":727,"markets":309,"states":21},{"crop":"Banana","date":"2023-07","year":2023,"month":7,"price":2600.0,"mean":3027.9,"min":400.0,"max":9200.0,"observations":576,"markets":274,"states":19},{"crop":"Banana","date":"2023-08","year":2023,"month":8,"price":2777.5,"mean":3269.99,"min":525.0,"max":48000.0,"observations":740,"markets":319,"states":23},{"crop":"Banana","date":"2023-09","year":2023,"month":9,"price":2800.0,"mean":3322.28,"min":525.0,"max":10950.0,"observations":738,"markets":325,"states":24},{"crop":"Banana","date":"2023-10","year":2023,"month":10,"price":2490.0,"mean":2729.74,"min":500.0,"max":12300.0,"observations":291,"markets":138,"states":15},{"crop":"Banana","date":"2023-11","year":2023,"month":11,"price":2800.0,"mean":3117.94,"min":525.0,"max":11900.0,"observations":744,"markets":302,"states":24},{"crop":"Banana","date":"2023-12","year":2023,"month":12,"price":2800.0,"mean":3096.25,"min":587.0,"max":12500.0,"observations":707,"markets":298,"states":21},{"crop":"Banana","date":"2024-01","year":2024,"month":1,"price":2700.0,"mean":2918.42,"min":800.0,"max":9300.0,"observations":579,"markets":254,"states":17},{"crop":"Banana","date":"2024-02","year":2024,"month":2,"price":2800.0,"mean":3070.67,"min":900.0,"max":11000.0,"observations":653,"markets":259,"states":17},{"crop":"Banana","date":"2024-03","year":2024,"month":3,"price":2765.0,"mean":2962.31,"min":40.0,"max":9400.0,"observations":556,"markets":269,"states":19},{"crop":"Banana","date":"2024-04","year":2024,"month":4,"price":2900.0,"mean":3166.97,"min":600.0,"max":9100.0,"observations":671,"markets":296,"states":17},{"crop":"Banana","date":"2024-05","year":2024,"month":5,"price":2820.0,"mean":3055.51,"min":22.0,"max":10000.0,"observations":791,"markets":329,"states":17},{"crop":"Banana","date":"2024-06","year":2024,"month":6,"price":3000.0,"mean":3637.93,"min":580.0,"max":10500.0,"observations":763,"markets":311,"states":17},{"crop":"Banana","date":"2024-07","year":2024,"month":7,"price":3185.0,"mean":3513.66,"min":25.0,"max":12700.0,"observations":1174,"markets":452,"states":19},{"crop":"Banana","date":"2024-08","year":2024,"month":8,"price":4000.0,"mean":4196.53,"min":545.0,"max":16000.0,"observations":1237,"markets":524,"states":21},{"crop":"Banana","date":"2024-09","year":2024,"month":9,"price":4000.0,"mean":4328.77,"min":560.0,"max":12000.0,"observations":706,"markets":332,"states":15},{"crop":"Banana","date":"2024-10","year":2024,"month":10,"price":3700.0,"mean":4012.13,"min":230.0,"max":11000.0,"observations":1151,"markets":498,"states":24},{"crop":"Banana","date":"2024-11","year":2024,"month":11,"price":4000.0,"mean":4048.81,"min":400.0,"max":10000.0,"observations":1128,"markets":495,"states":23},{"crop":"Banana","date":"2024-12","year":2024,"month":12,"price":4000.0,"mean":4046.13,"min":560.0,"max":10000.0,"observations":560,"markets":328,"states":17},{"crop":"Banana","date":"2025-01","year":2025,"month":1,"price":4000.0,"mean":4257.92,"min":180.0,"max":12000.0,"observations":934,"markets":465,"states":19},{"crop":"Banana","date":"2025-02","year":2025,"month":2,"price":4000.0,"mean":4572.83,"min":8.0,"max":13000.0,"observations":1146,"markets":494,"states":21},{"crop":"Banana","date":"2025-03","year":2025,"month":3,"price":4000.0,"mean":4344.53,"min":55.0,"max":12000.0,"observations":1135,"markets":485,"states":20},{"crop":"Banana","date":"2025-04","year":2025,"month":4,"price":4000.0,"mean":4293.61,"min":60.0,"max":12000.0,"observations":1179,"markets":509,"states":21},{"crop":"Banana","date":"2025-05","year":2025,"month":5,"price":4000.0,"mean":4224.99,"min":68.0,"max":78000.0,"observations":1142,"markets":514,"states":23},{"crop":"Banana","date":"2025-06","year":2025,"month":6,"price":4000.0,"mean":4128.12,"min":340.0,"max":10000.0,"observations":875,"markets":390,"states":15},{"crop":"Banana","date":"2025-07","year":2025,"month":7,"price":4000.0,"mean":4126.23,"min":13.0,"max":10000.0,"observations":1344,"markets":572,"states":23},{"crop":"Banana","date":"2025-08","year":2025,"month":8,"price":3400.0,"mean":3746.51,"min":15.0,"max":10000.0,"observations":1272,"markets":522,"states":24},{"crop":"Banana","date":"2025-09","year":2025,"month":9,"price":3500.0,"mean":3778.01,"min":20.0,"max":11500.0,"observations":1238,"markets":518,"states":23},{"crop":"Banana","date":"2025-10","year":2025,"month":10,"price":2800.0,"mean":3198.57,"min":40.0,"max":11000.0,"observations":979,"markets":454,"states":23},{"crop":"Banana","date":"2025-11","year":2025,"month":11,"price":3000.0,"mean":3207.17,"min":40.0,"max":8500.0,"observations":725,"markets":427,"states":22},{"crop":"Banana","date":"2025-12","year":2025,"month":12,"price":3300.0,"mean":3283.09,"min":300.0,"max":9000.0,"observations":894,"markets":435,"states":21},{"crop":"Cotton","date":"2015-01","year":2015,"month":1,"price":4100.0,"mean":4163.71,"min":3183.0,"max":22150.0,"observations":441,"markets":253,"states":13},{"crop":"Cotton","date":"2015-02","year":2015,"month":2,"price":3950.0,"mean":3883.92,"min":1204.0,"max":4500.0,"observations":72,"markets":48,"states":10},{"crop":"Cotton","date":"2015-03","year":2015,"month":3,"price":3900.0,"mean":3810.45,"min":2600.0,"max":4400.0,"observations":58,"markets":37,"states":10},{"crop":"Cotton","date":"2015-04","year":2015,"month":4,"price":4100.0,"mean":4111.06,"min":2700.0,"max":5100.0,"observations":246,"markets":160,"states":11},{"crop":"Cotton","date":"2015-05","year":2015,"month":5,"price":4200.0,"mean":4208.61,"min":3445.0,"max":7600.0,"observations":167,"markets":113,"states":9},{"crop":"Cotton","date":"2015-06","year":2015,"month":6,"price":4200.0,"mean":4147.83,"min":800.0,"max":7588.0,"observations":145,"markets":84,"states":9},{"crop":"Cotton","date":"2015-07","year":2015,"month":7,"price":4072.0,"mean":4066.0,"min":959.0,"max":4675.0,"observations":100,"markets":63,"states":7},{"crop":"Cotton","date":"2015-08","year":2015,"month":8,"price":4048.0,"mean":4063.64,"min":2875.0,"max":4690.0,"observations":59,"markets":39,"states":5},{"crop":"Cotton","date":"2015-09","year":2015,"month":9,"price":4250.0,"mean":4173.1,"min":1320.0,"max":6000.0,"observations":110,"markets":66,"states":8},{"crop":"Cotton","date":"2015-10","year":2015,"month":10,"price":4200.0,"mean":4179.96,"min":2759.0,"max":5400.0,"observations":261,"markets":148,"states":10},{"crop":"Cotton","date":"2015-11","year":2015,"month":11,"price":4050.0,"mean":4093.63,"min":3330.0,"max":6100.0,"observations":105,"markets":68,"states":8},{"crop":"Cotton","date":"2015-12","year":2015,"month":12,"price":4185.0,"mean":4253.5,"min":1230.0,"max":40000.0,"observations":557,"markets":304,"states":12},{"crop":"Cotton","date":"2016-01","year":2016,"month":1,"price":4600.0,"mean":4552.62,"min":1075.0,"max":6160.0,"observations":521,"markets":297,"states":11},{"crop":"Cotton","date":"2016-02","year":2016,"month":2,"price":4480.0,"mean":4463.43,"min":3400.0,"max":6190.0,"observations":427,"markets":260,"states":12},{"crop":"Cotton","date":"2016-03","year":2016,"month":3,"price":4400.0,"mean":4373.79,"min":3450.0,"max":6100.0,"observations":352,"markets":220,"states":11},{"crop":"Cotton","date":"2016-04","year":2016,"month":4,"price":4352.5,"mean":4344.33,"min":3175.0,"max":6162.0,"observations":186,"markets":132,"states":10},{"crop":"Cotton","date":"2016-05","year":2016,"month":5,"price":4275.0,"mean":4321.33,"min":3800.0,"max":5108.0,"observations":54,"markets":36,"states":5},{"crop":"Cotton","date":"2016-06","year":2016,"month":6,"price":4785.0,"mean":4718.06,"min":2000.0,"max":5800.0,"observations":133,"markets":82,"states":9},{"crop":"Cotton","date":"2016-07","year":2016,"month":7,"price":5175.0,"mean":5184.46,"min":1050.0,"max":15700.0,"observations":79,"markets":51,"states":7},{"crop":"Cotton","date":"2016-08","year":2016,"month":8,"price":5500.0,"mean":5383.43,"min":4000.0,"max":6889.0,"observations":65,"markets":38,"states":6},{"crop":"Cotton","date":"2016-09","year":2016,"month":9,"price":5000.0,"mean":5012.62,"min":3909.0,"max":8000.0,"observations":76,"markets":50,"states":9},{"crop":"Cotton","date":"2016-10","year":2016,"month":10,"price":5060.0,"mean":4919.68,"min":3810.0,"max":6500.0,"observations":191,"markets":108,"states":9},{"crop":"Cotton","date":"2016-11","year":2016,"month":11,"price":4750.0,"mean":4701.89,"min":66.0,"max":6146.0,"observations":331,"markets":223,"states":11},{"crop":"Cotton","date":"2016-12","year":2016,"month":12,"price":4930.0,"mean":4867.23,"min":3500.0,"max":6649.0,"observations":570,"markets":290,"states":11},{"crop":"Cotton","date":"2017-01","year":2017,"month":1,"price":5100.0,"mean":5019.41,"min":3860.0,"max":6149.0,"observations":152,"markets":87,"states":8},{"crop":"Cotton","date":"2017-02","year":2017,"month":2,"price":5500.0,"mean":5388.59,"min":54.6,"max":7179.0,"observations":548,"markets":295,"states":12},{"crop":"Cotton","date":"2017-03","year":2017,"month":3,"price":5500.0,"mean":5435.11,"min":3350.0,"max":6450.0,"observations":480,"markets":262,"states":11},{"crop":"Cotton","date":"2017-04","year":2017,"month":4,"price":5400.0,"mean":5335.91,"min":3103.0,"max":7000.0,"observations":240,"markets":152,"states":9},{"crop":"Cotton","date":"2017-05","year":2017,"month":5,"price":5050.0,"mean":4960.64,"min":3300.0,"max":6011.0,"observations":178,"markets":122,"states":9},{"crop":"Cotton","date":"2017-06","year":2017,"month":6,"price":4900.0,"mean":4856.12,"min":3141.0,"max":6902.0,"observations":124,"markets":80,"states":8},{"crop":"Cotton","date":"2017-07","year":2017,"month":7,"price":5000.0,"mean":4942.33,"min":4000.0,"max":5600.0,"observations":45,"markets":26,"states":7},{"crop":"Cotton","date":"2017-08","year":2017,"month":8,"price":4857.5,"mean":4796.67,"min":3725.0,"max":5575.0,"observations":66,"markets":44,"states":9},{"crop":"Cotton","date":"2017-09","year":2017,"month":9,"price":4505.0,"mean":4563.12,"min":2500.0,"max":5621.0,"observations":113,"markets":72,"states":10},{"crop":"Cotton","date":"2017-10","year":2017,"month":10,"price":4300.0,"mean":4240.2,"min":3150.0,"max":4900.0,"observations":46,"markets":30,"states":7},{"crop":"Cotton","date":"2017-11","year":2017,"month":11,"price":4375.0,"mean":4437.69,"min":2529.0,"max":6000.0,"observations":439,"markets":258,"states":12},{"crop":"Cotton","date":"2017-12","year":2017,"month":12,"price":4560.0,"mean":4585.21,"min":1210.0,"max":7950.0,"observations":512,"markets":290,"states":12},{"crop":"Cotton","date":"2018-01","year":2018,"month":1,"price":5050.0,"mean":5056.99,"min":200.0,"max":6999.0,"observations":497,"markets":284,"states":12},{"crop":"Cotton","date":"2018-02","year":2018,"month":2,"price":4804.0,"mean":4824.01,"min":3785.0,"max":6360.0,"observations":472,"markets":276,"states":12},{"crop":"Cotton","date":"2018-03","year":2018,"month":3,"price":4665.0,"mean":4641.25,"min":2829.0,"max":6025.0,"observations":366,"markets":240,"states":11},{"crop":"Cotton","date":"2018-04","year":2018,"month":4,"price":4500.0,"mean":4524.13,"min":3150.0,"max":10650.0,"observations":71,"markets":45,"states":8},{"crop":"Cotton","date":"2018-05","year":2018,"month":5,"price":4575.0,"mean":4452.54,"min":1025.0,"max":5475.0,"observations":183,"markets":127,"states":8},{"crop":"Cotton","date":"2018-06","year":2018,"month":6,"price":4850.0,"mean":4775.6,"min":1151.0,"max":6600.0,"observations":120,"markets":81,"states":8},{"crop":"Cotton","date":"2018-07","year":2018,"month":7,"price":5000.0,"mean":4969.88,"min":3800.0,"max":6059.0,"observations":8,"markets":6,"states":4},{"crop":"Cotton","date":"2018-08","year":2018,"month":8,"price":5600.0,"mean":5470.0,"min":1100.0,"max":9350.0,"observations":44,"markets":33,"states":7},{"crop":"Cotton","date":"2018-09","year":2018,"month":9,"price":5470.0,"mean":5354.15,"min":3653.0,"max":6364.0,"observations":39,"markets":33,"states":8},{"crop":"Cotton","date":"2018-10","year":2018,"month":10,"price":5219.5,"mean":5220.25,"min":2000.0,"max":6702.0,"observations":272,"markets":161,"states":10},{"crop":"Cotton","date":"2018-11","year":2018,"month":11,"price":5482.0,"mean":5409.62,"min":800.0,"max":6607.0,"observations":178,"markets":130,"states":9},{"crop":"Cotton","date":"2018-12","year":2018,"month":12,"price":5400.0,"mean":5396.26,"min":1090.0,"max":7205.0,"observations":376,"markets":209,"states":11},{"crop":"Cotton","date":"2019-01","year":2019,"month":1,"price":5400.0,"mean":5370.68,"min":1075.0,"max":6725.0,"observations":440,"markets":244,"states":11},{"crop":"Cotton","date":"2019-02","year":2019,"month":2,"price":5350.0,"mean":5262.36,"min":110.0,"max":10000.0,"observations":420,"markets":237,"states":11},{"crop":"Cotton","date":"2019-03","year":2019,"month":3,"price":5300.0,"mean":5211.69,"min":1080.0,"max":10500.0,"observations":329,"markets":201,"states":11},{"crop":"Cotton","date":"2019-04","year":2019,"month":4,"price":5888.0,"mean":5779.27,"min":1250.0,"max":6450.0,"observations":293,"markets":178,"states":10},{"crop":"Cotton","date":"2019-05","year":2019,"month":5,"price":5899.5,"mean":5673.95,"min":1220.0,"max":6450.0,"observations":150,"markets":101,"states":9},{"crop":"Cotton","date":"2019-06","year":2019,"month":6,"price":5838.0,"mean":5683.12,"min":1240.0,"max":6660.0,"observations":91,"markets":60,"states":9},{"crop":"Cotton","date":"2019-07","year":2019,"month":7,"price":5700.0,"mean":5615.72,"min":4789.0,"max":6410.0,"observations":68,"markets":43,"states":8},{"crop":"Cotton","date":"2019-08","year":2019,"month":8,"price":5466.5,"mean":5404.38,"min":1160.0,"max":7000.0,"observations":58,"markets":38,"states":8},{"crop":"Cotton","date":"2019-09","year":2019,"month":9,"price":5350.0,"mean":5280.48,"min":4600.0,"max":5700.0,"observations":21,"markets":13,"states":6},{"crop":"Cotton","date":"2019-10","year":2019,"month":10,"price":5200.0,"mean":5009.81,"min":950.0,"max":6100.0,"observations":172,"markets":114,"states":11},{"crop":"Cotton","date":"2019-11","year":2019,"month":11,"price":5039.5,"mean":4928.98,"min":1051.0,"max":8700.0,"observations":262,"markets":166,"states":11},{"crop":"Cotton","date":"2019-12","year":2019,"month":12,"price":4950.0,"mean":4999.21,"min":3500.0,"max":6343.0,"observations":108,"markets":65,"states":10},{"crop":"Cotton","date":"2020-01","year":2020,"month":1,"price":5144.5,"mean":5093.55,"min":3719.0,"max":6240.0,"observations":282,"markets":185,"states":11},{"crop":"Cotton","date":"2020-02","year":2020,"month":2,"price":5050.0,"mean":5037.74,"min":4000.0,"max":6718.0,"observations":241,"markets":156,"states":9},{"crop":"Cotton","date":"2020-03","year":2020,"month":3,"price":4942.5,"mean":4889.75,"min":4099.0,"max":5400.0,"observations":40,"markets":27,"states":5},{"crop":"Cotton","date":"2020-04","year":2020,"month":4,"price":3939.0,"mean":4041.55,"min":3100.0,"max":5120.0,"observations":11,"markets":9,"states":1},{"crop":"Cotton","date":"2020-05","year":2020,"month":5,"price":4175.0,"mean":4213.41,"min":1320.0,"max":5405.0,"observations":78,"markets":69,"states":6},{"crop":"Cotton","date":"2020-06","year":2020,"month":6,"price":4300.0,"mean":4393.78,"min":2900.0,"max":5450.0,"observations":124,"markets":81,"states":6},{"crop":"Cotton","date":"2020-07","year":2020,"month":7,"price":4454.5,"mean":4450.07,"min":2400.0,"max":5363.0,"observations":74,"markets":51,"states":5},{"crop":"Cotton","date":"2020-08","year":2020,"month":8,"price":4305.0,"mean":4324.48,"min":3128.0,"max":5355.0,"observations":29,"markets":20,"states":4},{"crop":"Cotton","date":"2020-09","year":2020,"month":9,"price":4571.0,"mean":4554.21,"min":3150.0,"max":5930.0,"observations":52,"markets":34,"states":7},{"crop":"Cotton","date":"2020-10","year":2020,"month":10,"price":4502.5,"mean":4497.26,"min":857.0,"max":6250.0,"observations":118,"markets":81,"states":9},{"crop":"Cotton","date":"2020-11","year":2020,"month":11,"price":4645.0,"mean":4688.33,"min":3865.0,"max":5700.0,"observations":30,"markets":23,"states":6},{"crop":"Cotton","date":"2020-12","year":2020,"month":12,"price":5437.5,"mean":5366.5,"min":3460.0,"max":7100.0,"observations":141,"markets":112,"states":9},{"crop":"Cotton","date":"2021-01","year":2021,"month":1,"price":5417.5,"mean":5397.3,"min":2089.0,"max":7606.0,"observations":181,"markets":142,"states":9},{"crop":"Cotton","date":"2021-02","year":2021,"month":2,"price":5600.0,"mean":5572.75,"min":2698.0,"max":8150.0,"observations":217,"markets":155,"states":9},{"crop":"Cotton","date":"2021-03","year":2021,"month":3,"price":5813.0,"mean":5786.82,"min":3610.0,"max":7019.0,"observations":180,"markets":127,"states":9},{"crop":"Cotton","date":"2021-04","year":2021,"month":4,"price":5782.5,"mean":5714.7,"min":3770.0,"max":6974.0,"observations":88,"markets":62,"states":7},{"crop":"Cotton","date":"2021-05","year":2021,"month":5,"price":5229.5,"mean":5294.83,"min":4500.0,"max":6000.0,"observations":6,"markets":6,"states":4},{"crop":"Cotton","date":"2021-06","year":2021,"month":6,"price":6140.0,"mean":6105.81,"min":4330.0,"max":7350.0,"observations":31,"markets":24,"states":5},{"crop":"Cotton","date":"2021-07","year":2021,"month":7,"price":6326.5,"mean":6235.06,"min":4300.0,"max":7779.0,"observations":32,"markets":21,"states":4},{"crop":"Cotton","date":"2021-08","year":2021,"month":8,"price":6500.0,"mean":6593.29,"min":4440.0,"max":9913.0,"observations":7,"markets":6,"states":3},{"crop":"Cotton","date":"2021-09","year":2021,"month":9,"price":6511.0,"mean":6394.23,"min":4400.0,"max":7901.0,"observations":39,"markets":36,"states":6},{"crop":"Cotton","date":"2021-10","year":2021,"month":10,"price":6600.0,"mean":6415.85,"min":2300.0,"max":8601.0,"observations":105,"markets":83,"states":8},{"crop":"Cotton","date":"2021-11","year":2021,"month":11,"price":8100.0,"mean":7977.13,"min":4350.0,"max":14169.0,"observations":159,"markets":121,"states":9},{"crop":"Cotton","date":"2021-12","year":2021,"month":12,"price":7925.0,"mean":7878.45,"min":1925.0,"max":15609.0,"observations":259,"markets":180,"states":10},{"crop":"Cotton","date":"2022-01","year":2022,"month":1,"price":8900.0,"mean":8668.48,"min":5150.0,"max":12775.0,"observations":346,"markets":206,"states":11},{"crop":"Cotton","date":"2022-02","year":2022,"month":2,"price":9200.0,"mean":9056.3,"min":5150.0,"max":11135.0,"observations":391,"markets":219,"states":11},{"crop":"Cotton","date":"2022-03","year":2022,"month":3,"price":9200.0,"mean":8990.02,"min":5000.0,"max":12000.0,"observations":238,"markets":161,"states":11},{"crop":"Cotton","date":"2022-04","year":2022,"month":4,"price":10000.0,"mean":9949.58,"min":1900.0,"max":12500.0,"observations":174,"markets":124,"states":10},{"crop":"Cotton","date":"2022-05","year":2022,"month":5,"price":9540.0,"mean":9531.45,"min":6000.0,"max":12300.0,"observations":33,"markets":22,"states":5},{"crop":"Cotton","date":"2022-06","year":2022,"month":6,"price":10500.0,"mean":10304.46,"min":6000.0,"max":13001.0,"observations":71,"markets":49,"states":9},{"crop":"Cotton","date":"2022-07","year":2022,"month":7,"price":9109.5,"mean":8511.8,"min":5100.0,"max":11050.0,"observations":44,"markets":30,"states":6},{"crop":"Cotton","date":"2022-08","year":2022,"month":8,"price":9595.0,"mean":9014.37,"min":5000.0,"max":11720.0,"observations":59,"markets":36,"states":6},{"crop":"Cotton","date":"2022-09","year":2022,"month":9,"price":9400.0,"mean":9053.63,"min":5000.0,"max":11555.0,"observations":121,"markets":83,"states":10},{"crop":"Cotton","date":"2022-10","year":2022,"month":10,"price":8276.75,"mean":8164.42,"min":6025.0,"max":9900.0,"observations":178,"markets":107,"states":10},{"crop":"Cotton","date":"2022-11","year":2022,"month":11,"price":8250.0,"mean":8103.19,"min":5700.0,"max":9900.0,"observations":230,"markets":143,"states":10},{"crop":"Cotton","date":"2022-12","year":2022,"month":12,"price":8450.0,"mean":8314.79,"min":1962.0,"max":9795.0,"observations":333,"markets":201,"states":11},{"crop":"Cotton","date":"2023-01","year":2023,"month":1,"price":7900.0,"mean":7608.38,"min":4500.0,"max":8770.0,"observations":100,"markets":59,"states":6},{"crop":"Cotton","date":"2023-02","year":2023,"month":2,"price":7804.0,"mean":7776.17,"min":5500.0,"max":10205.0,"observations":388,"markets":213,"states":11},{"crop":"Cotton","date":"2023-03","year":2023,"month":3,"price":7631.0,"mean":7614.33,"min":6080.0,"max":10700.0,"observations":273,"markets":190,"states":11},{"crop":"Cotton","date":"2023-04","year":2023,"month":4,"price":7690.0,"mean":7606.61,"min":6080.0,"max":10290.0,"observations":201,"markets":128,"states":9},{"crop":"Cotton","date":"2023-05","year":2023,"month":5,"price":7550.0,"mean":7488.12,"min":5980.0,"max":8375.0,"observations":225,"markets":150,"states":9},{"crop":"Cotton","date":"2023-06","year":2023,"month":6,"price":7050.0,"mean":6903.57,"min":1766.0,"max":8117.0,"observations":238,"markets":143,"states":9},{"crop":"Cotton","date":"2023-07","year":2023,"month":7,"price":6850.0,"mean":6756.42,"min":5050.0,"max":9500.0,"observations":137,"markets":90,"states":9},{"crop":"Cotton","date":"2023-08","year":2023,"month":8,"price":7000.0,"mean":6865.87,"min":4101.0,"max":10000.0,"observations":127,"markets":83,"states":9},{"crop":"Cotton","date":"2023-09","year":2023,"month":9,"price":6950.0,"mean":6823.71,"min":4800.0,"max":7850.0,"observations":163,"markets":109,"states":11},{"crop":"Cotton","date":"2023-10","year":2023,"month":10,"price":6775.0,"mean":6516.85,"min":4000.0,"max":7600.0,"observations":48,"markets":30,"states":8},{"crop":"Cotton","date":"2023-11","year":2023,"month":11,"price":6950.0,"mean":6874.64,"min":4700.0,"max":8000.0,"observations":261,"markets":161,"states":9},{"crop":"Cotton","date":"2023-12","year":2023,"month":12,"price":6800.0,"mean":6707.2,"min":1300.0,"max":8400.0,"observations":321,"markets":186,"states":10},{"crop":"Cotton","date":"2024-01","year":2024,"month":1,"price":6650.0,"mean":6541.22,"min":4198.0,"max":9029.0,"observations":256,"markets":161,"states":10},{"crop":"Cotton","date":"2024-02","year":2024,"month":2,"price":6500.0,"mean":6418.49,"min":4200.0,"max":7200.0,"observations":283,"markets":168,"states":10},{"crop":"Cotton","date":"2024-03","year":2024,"month":3,"price":7000.0,"mean":6934.08,"min":3899.0,"max":7900.0,"observations":200,"markets":143,"states":10},{"crop":"Cotton","date":"2024-04","year":2024,"month":4,"price":7056.5,"mean":6979.39,"min":4388.0,"max":8075.0,"observations":138,"markets":95,"states":9},{"crop":"Cotton","date":"2024-05","year":2024,"month":5,"price":6910.0,"mean":6883.7,"min":5740.0,"max":7600.0,"observations":134,"markets":88,"states":8},{"crop":"Cotton","date":"2024-06","year":2024,"month":6,"price":6950.0,"mean":6847.02,"min":5375.0,"max":7599.0,"observations":104,"markets":66,"states":7},{"crop":"Cotton","date":"2024-07","year":2024,"month":7,"price":7100.0,"mean":6991.15,"min":5500.0,"max":7800.0,"observations":81,"markets":51,"states":8},{"crop":"Cotton","date":"2024-08","year":2024,"month":8,"price":7151.5,"mean":7069.73,"min":5600.0,"max":8000.0,"observations":66,"markets":38,"states":7},{"crop":"Cotton","date":"2024-09","year":2024,"month":9,"price":6937.5,"mean":6638.08,"min":4451.0,"max":7341.0,"observations":12,"markets":9,"states":3},{"crop":"Cotton","date":"2024-10","year":2024,"month":10,"price":7100.0,"mean":6941.3,"min":4300.0,"max":8404.0,"observations":179,"markets":113,"states":8},{"crop":"Cotton","date":"2024-11","year":2024,"month":11,"price":7150.0,"mean":7220.85,"min":6000.0,"max":10200.0,"observations":228,"markets":181,"states":8},{"crop":"Cotton","date":"2024-12","year":2024,"month":12,"price":7075.0,"mean":7210.41,"min":5850.0,"max":10400.0,"observations":74,"markets":56,"states":7},{"crop":"Cotton","date":"2025-01","year":2025,"month":1,"price":7165.0,"mean":7174.06,"min":5500.0,"max":10300.0,"observations":300,"markets":201,"states":9},{"crop":"Cotton","date":"2025-02","year":2025,"month":2,"price":7100.0,"mean":7095.01,"min":4880.0,"max":9850.0,"observations":329,"markets":181,"states":9},{"crop":"Cotton","date":"2025-03","year":2025,"month":3,"price":7000.0,"mean":6972.2,"min":5472.0,"max":8502.0,"observations":276,"markets":162,"states":10},{"crop":"Cotton","date":"2025-04","year":2025,"month":4,"price":7150.0,"mean":7082.78,"min":5500.0,"max":7850.0,"observations":194,"markets":115,"states":9},{"crop":"Cotton","date":"2025-05","year":2025,"month":5,"price":7223.5,"mean":7074.53,"min":5025.0,"max":8050.0,"observations":104,"markets":72,"states":9},{"crop":"Cotton","date":"2025-06","year":2025,"month":6,"price":7175.5,"mean":6765.79,"min":5200.0,"max":7521.0,"observations":24,"markets":13,"states":5},{"crop":"Cotton","date":"2025-07","year":2025,"month":7,"price":7410.5,"mean":7240.5,"min":5200.0,"max":8100.0,"observations":56,"markets":33,"states":7},{"crop":"Cotton","date":"2025-08","year":2025,"month":8,"price":7663.0,"mean":7387.41,"min":5500.0,"max":8235.0,"observations":46,"markets":28,"states":4},{"crop":"Cotton","date":"2025-09","year":2025,"month":9,"price":6975.0,"mean":6938.55,"min":3900.0,"max":7875.0,"observations":62,"markets":39,"states":6},{"crop":"Cotton","date":"2025-10","year":2025,"month":10,"price":6887.0,"mean":6767.53,"min":4350.0,"max":8000.0,"observations":218,"markets":128,"states":8},{"crop":"Cotton","date":"2025-11","year":2025,"month":11,"price":7000.0,"mean":6967.96,"min":5425.0,"max":8110.0,"observations":226,"markets":143,"states":8},{"crop":"Cotton","date":"2025-12","year":2025,"month":12,"price":7000.0,"mean":6961.37,"min":4900.0,"max":8269.0,"observations":371,"markets":185,"states":10},{"crop":"Groundnut","date":"2015-01","year":2015,"month":1,"price":3980.0,"mean":3945.21,"min":1410.0,"max":7600.0,"observations":192,"markets":116,"states":13},{"crop":"Groundnut","date":"2015-02","year":2015,"month":2,"price":4200.0,"mean":4300.65,"min":2200.0,"max":5350.0,"observations":34,"markets":22,"states":6},{"crop":"Groundnut","date":"2015-03","year":2015,"month":3,"price":4395.0,"mean":4322.83,"min":2200.0,"max":5450.0,"observations":24,"markets":14,"states":4},{"crop":"Groundnut","date":"2015-04","year":2015,"month":4,"price":4250.0,"mean":4552.7,"min":2689.0,"max":7450.0,"observations":137,"markets":95,"states":13},{"crop":"Groundnut","date":"2015-05","year":2015,"month":5,"price":4299.0,"mean":4522.28,"min":1610.0,"max":8000.0,"observations":116,"markets":81,"states":12},{"crop":"Groundnut","date":"2015-06","year":2015,"month":6,"price":4903.0,"mean":5000.15,"min":1650.0,"max":8650.0,"observations":197,"markets":103,"states":13},{"crop":"Groundnut","date":"2015-07","year":2015,"month":7,"price":4650.0,"mean":4968.74,"min":1702.0,"max":8750.0,"observations":159,"markets":95,"states":12},{"crop":"Groundnut","date":"2015-08","year":2015,"month":8,"price":4395.0,"mean":4435.93,"min":1800.0,"max":7500.0,"observations":83,"markets":50,"states":9},{"crop":"Groundnut","date":"2015-09","year":2015,"month":9,"price":4700.0,"mean":5077.37,"min":290.0,"max":9450.0,"observations":124,"markets":76,"states":11},{"crop":"Groundnut","date":"2015-10","year":2015,"month":10,"price":4500.0,"mean":4673.6,"min":288.5,"max":9550.0,"observations":209,"markets":124,"states":14},{"crop":"Groundnut","date":"2015-11","year":2015,"month":11,"price":4000.0,"mean":3885.04,"min":2000.0,"max":5875.0,"observations":28,"markets":18,"states":7},{"crop":"Groundnut","date":"2015-12","year":2015,"month":12,"price":4100.0,"mean":4270.31,"min":321.5,"max":8850.0,"observations":246,"markets":132,"states":14},{"crop":"Groundnut","date":"2016-01","year":2016,"month":1,"price":4216.5,"mean":4387.65,"min":2523.0,"max":8800.0,"observations":196,"markets":126,"states":13},{"crop":"Groundnut","date":"2016-02","year":2016,"month":2,"price":4075.0,"mean":4391.11,"min":1630.0,"max":8600.0,"observations":145,"markets":98,"states":14},{"crop":"Groundnut","date":"2016-03","year":2016,"month":3,"price":4450.0,"mean":4756.32,"min":2600.0,"max":8300.0,"observations":149,"markets":91,"states":11},{"crop":"Groundnut","date":"2016-04","year":2016,"month":4,"price":4876.5,"mean":5022.31,"min":2700.0,"max":8500.0,"observations":104,"markets":79,"states":13},{"crop":"Groundnut","date":"2016-05","year":2016,"month":5,"price":5250.0,"mean":5168.62,"min":2200.0,"max":8000.0,"observations":21,"markets":17,"states":8},{"crop":"Groundnut","date":"2016-06","year":2016,"month":6,"price":5346.5,"mean":5389.98,"min":1990.0,"max":9300.0,"observations":230,"markets":127,"states":12},{"crop":"Groundnut","date":"2016-07","year":2016,"month":7,"price":5330.0,"mean":5524.02,"min":2000.0,"max":9400.0,"observations":159,"markets":94,"states":13},{"crop":"Groundnut","date":"2016-08","year":2016,"month":8,"price":5538.0,"mean":5751.01,"min":2849.0,"max":10300.0,"observations":110,"markets":66,"states":12},{"crop":"Groundnut","date":"2016-09","year":2016,"month":9,"price":5000.0,"mean":5189.05,"min":1609.0,"max":10900.0,"observations":99,"markets":71,"states":11},{"crop":"Groundnut","date":"2016-10","year":2016,"month":10,"price":4250.0,"mean":4315.27,"min":2000.0,"max":9000.0,"observations":135,"markets":89,"states":12},{"crop":"Groundnut","date":"2016-11","year":2016,"month":11,"price":4050.0,"mean":4385.17,"min":800.0,"max":8500.0,"observations":153,"markets":117,"states":15},{"crop":"Groundnut","date":"2016-12","year":2016,"month":12,"price":4000.0,"mean":4145.47,"min":4.0,"max":8350.0,"observations":215,"markets":120,"states":12},{"crop":"Groundnut","date":"2017-01","year":2017,"month":1,"price":4140.0,"mean":4256.0,"min":3151.0,"max":6700.0,"observations":20,"markets":13,"states":6},{"crop":"Groundnut","date":"2017-02","year":2017,"month":2,"price":4145.0,"mean":4428.29,"min":900.0,"max":8820.0,"observations":233,"markets":128,"states":12},{"crop":"Groundnut","date":"2017-03","year":2017,"month":3,"price":4250.0,"mean":4709.73,"min":850.0,"max":10251.0,"observations":227,"markets":124,"states":15},{"crop":"Groundnut","date":"2017-04","year":2017,"month":4,"price":4560.0,"mean":4730.66,"min":2100.0,"max":8700.0,"observations":95,"markets":64,"states":9},{"crop":"Groundnut","date":"2017-05","year":2017,"month":5,"price":4382.0,"mean":4746.09,"min":2100.0,"max":9500.0,"observations":123,"markets":86,"states":11},{"crop":"Groundnut","date":"2017-06","year":2017,"month":6,"price":4400.0,"mean":4604.74,"min":2960.0,"max":8800.0,"observations":170,"markets":98,"states":10},{"crop":"Groundnut","date":"2017-07","year":2017,"month":7,"price":3850.0,"mean":3891.08,"min":1900.0,"max":8800.0,"observations":64,"markets":44,"states":9},{"crop":"Groundnut","date":"2017-08","year":2017,"month":8,"price":3750.0,"mean":4258.71,"min":2200.0,"max":8886.0,"observations":130,"markets":78,"states":9},{"crop":"Groundnut","date":"2017-09","year":2017,"month":9,"price":3474.0,"mean":3932.84,"min":1519.0,"max":8800.0,"observations":134,"markets":79,"states":10},{"crop":"Groundnut","date":"2017-10","year":2017,"month":10,"price":3157.5,"mean":3341.5,"min":2100.0,"max":4800.0,"observations":24,"markets":16,"states":7},{"crop":"Groundnut","date":"2017-11","year":2017,"month":11,"price":3567.5,"mean":3835.24,"min":1900.0,"max":8800.0,"observations":236,"markets":146,"states":12},{"crop":"Groundnut","date":"2017-12","year":2017,"month":12,"price":3674.0,"mean":3923.75,"min":2150.0,"max":8000.0,"observations":258,"markets":140,"states":13},{"crop":"Groundnut","date":"2018-01","year":2018,"month":1,"price":3700.0,"mean":3892.58,"min":2329.0,"max":8000.0,"observations":229,"markets":142,"states":12},{"crop":"Groundnut","date":"2018-02","year":2018,"month":2,"price":3597.5,"mean":3811.73,"min":1280.0,"max":7800.0,"observations":224,"markets":131,"states":12},{"crop":"Groundnut","date":"2018-03","year":2018,"month":3,"price":3711.0,"mean":3902.62,"min":2100.0,"max":6174.0,"observations":165,"markets":107,"states":12},{"crop":"Groundnut","date":"2018-04","year":2018,"month":4,"price":3763.0,"mean":3862.5,"min":1850.0,"max":5310.0,"observations":24,"markets":13,"states":3},{"crop":"Groundnut","date":"2018-05","year":2018,"month":5,"price":3409.0,"mean":3533.47,"min":1756.0,"max":5650.0,"observations":127,"markets":84,"states":9},{"crop":"Groundnut","date":"2018-06","year":2018,"month":6,"price":3550.0,"mean":3691.39,"min":1613.0,"max":6850.0,"observations":221,"markets":129,"states":10},{"crop":"Groundnut","date":"2018-07","year":2018,"month":7,"price":3250.0,"mean":3304.9,"min":2200.0,"max":4660.0,"observations":29,"markets":18,"states":6},{"crop":"Groundnut","date":"2018-08","year":2018,"month":8,"price":3750.0,"mean":3844.63,"min":2450.0,"max":6301.0,"observations":148,"markets":95,"states":12},{"crop":"Groundnut","date":"2018-09","year":2018,"month":9,"price":3713.0,"mean":3761.76,"min":2100.0,"max":5460.0,"observations":70,"markets":49,"states":12},{"crop":"Groundnut","date":"2018-10","year":2018,"month":10,"price":3900.0,"mean":4113.06,"min":2100.0,"max":7511.0,"observations":166,"markets":109,"states":12},{"crop":"Groundnut","date":"2018-11","year":2018,"month":11,"price":4250.0,"mean":4492.38,"min":3000.0,"max":6836.0,"observations":81,"markets":68,"states":12},{"crop":"Groundnut","date":"2018-12","year":2018,"month":12,"price":3927.5,"mean":4035.22,"min":2571.0,"max":6500.0,"observations":186,"markets":108,"states":11},{"crop":"Groundnut","date":"2019-01","year":2019,"month":1,"price":4002.5,"mean":4204.6,"min":1910.0,"max":7537.0,"observations":190,"markets":114,"states":12},{"crop":"Groundnut","date":"2019-02","year":2019,"month":2,"price":4097.0,"mean":4338.59,"min":3018.0,"max":7524.0,"observations":201,"markets":110,"states":13},{"crop":"Groundnut","date":"2019-03","year":2019,"month":3,"price":4250.0,"mean":4464.99,"min":2855.0,"max":7700.0,"observations":193,"markets":108,"states":12},{"crop":"Groundnut","date":"2019-04","year":2019,"month":4,"price":4325.0,"mean":4658.87,"min":1969.0,"max":8700.0,"observations":157,"markets":88,"states":13},{"crop":"Groundnut","date":"2019-05","year":2019,"month":5,"price":4625.0,"mean":4744.99,"min":2340.0,"max":7569.0,"observations":114,"markets":82,"states":12},{"crop":"Groundnut","date":"2019-06","year":2019,"month":6,"price":4800.0,"mean":4865.73,"min":3000.0,"max":8950.0,"observations":141,"markets":87,"states":12},{"crop":"Groundnut","date":"2019-07","year":2019,"month":7,"price":5200.0,"mean":5431.8,"min":3200.0,"max":9500.0,"observations":148,"markets":84,"states":11},{"crop":"Groundnut","date":"2019-08","year":2019,"month":8,"price":4980.0,"mean":5372.53,"min":2159.0,"max":10045.0,"observations":97,"markets":62,"states":11},{"crop":"Groundnut","date":"2019-09","year":2019,"month":9,"price":4975.0,"mean":4813.45,"min":3369.0,"max":6071.0,"observations":20,"markets":12,"states":5},{"crop":"Groundnut","date":"2019-10","year":2019,"month":10,"price":5100.0,"mean":5383.27,"min":2125.0,"max":11100.0,"observations":90,"markets":74,"states":13},{"crop":"Groundnut","date":"2019-11","year":2019,"month":11,"price":4392.0,"mean":4620.89,"min":2350.0,"max":8000.0,"observations":217,"markets":140,"states":13},{"crop":"Groundnut","date":"2019-12","year":2019,"month":12,"price":4095.0,"mean":4384.74,"min":3450.0,"max":7800.0,"observations":38,"markets":24,"states":9},{"crop":"Groundnut","date":"2020-01","year":2020,"month":1,"price":4555.0,"mean":4606.72,"min":2900.0,"max":8000.0,"observations":163,"markets":102,"states":11},{"crop":"Groundnut","date":"2020-02","year":2020,"month":2,"price":4642.5,"mean":4649.7,"min":3269.0,"max":7000.0,"observations":120,"markets":75,"states":11},{"crop":"Groundnut","date":"2020-03","year":2020,"month":3,"price":5351.0,"mean":5386.95,"min":4170.0,"max":7100.0,"observations":21,"markets":14,"states":6},{"crop":"Groundnut","date":"2020-04","year":2020,"month":4,"price":5494.5,"mean":5814.18,"min":4600.0,"max":8650.0,"observations":22,"markets":17,"states":3},{"crop":"Groundnut","date":"2020-05","year":2020,"month":5,"price":5249.0,"mean":5277.07,"min":2000.0,"max":8446.0,"observations":68,"markets":57,"states":7},{"crop":"Groundnut","date":"2020-06","year":2020,"month":6,"price":5072.5,"mean":5209.99,"min":2000.0,"max":8750.0,"observations":179,"markets":114,"states":10},{"crop":"Groundnut","date":"2020-07","year":2020,"month":7,"price":5225.0,"mean":5323.7,"min":2305.0,"max":12700.0,"observations":147,"markets":100,"states":10},{"crop":"Groundnut","date":"2020-08","year":2020,"month":8,"price":4719.0,"mean":4690.32,"min":2700.0,"max":6400.0,"observations":38,"markets":31,"states":8},{"crop":"Groundnut","date":"2020-09","year":2020,"month":9,"price":4581.5,"mean":4838.76,"min":2700.0,"max":9000.0,"observations":98,"markets":69,"states":10},{"crop":"Groundnut","date":"2020-10","year":2020,"month":10,"price":4330.0,"mean":4521.72,"min":2400.0,"max":8100.0,"observations":137,"markets":99,"states":11},{"crop":"Groundnut","date":"2020-11","year":2020,"month":11,"price":4043.5,"mean":4457.81,"min":2600.0,"max":6800.0,"observations":26,"markets":17,"states":8},{"crop":"Groundnut","date":"2020-12","year":2020,"month":12,"price":4865.0,"mean":5315.35,"min":3400.0,"max":8750.0,"observations":123,"markets":90,"states":10},{"crop":"Groundnut","date":"2021-01","year":2021,"month":1,"price":5000.0,"mean":5172.97,"min":3315.0,"max":8200.0,"observations":165,"markets":98,"states":9},{"crop":"Groundnut","date":"2021-02","year":2021,"month":2,"price":5275.0,"mean":5469.36,"min":4000.0,"max":9500.0,"observations":165,"markets":95,"states":10},{"crop":"Groundnut","date":"2021-03","year":2021,"month":3,"price":5650.0,"mean":6061.65,"min":4380.0,"max":10000.0,"observations":129,"markets":85,"states":10},{"crop":"Groundnut","date":"2021-04","year":2021,"month":4,"price":5475.0,"mean":5477.52,"min":2651.0,"max":10500.0,"observations":77,"markets":55,"states":8},{"crop":"Groundnut","date":"2021-05","year":2021,"month":5,"price":5090.0,"mean":5038.63,"min":3400.0,"max":6701.0,"observations":19,"markets":15,"states":6},{"crop":"Groundnut","date":"2021-06","year":2021,"month":6,"price":5100.0,"mean":5198.29,"min":2500.0,"max":9300.0,"observations":129,"markets":85,"states":10},{"crop":"Groundnut","date":"2021-07","year":2021,"month":7,"price":4872.0,"mean":4959.63,"min":2450.0,"max":9800.0,"observations":140,"markets":87,"states":7},{"crop":"Groundnut","date":"2021-08","year":2021,"month":8,"price":4990.0,"mean":4990.71,"min":4125.0,"max":5800.0,"observations":14,"markets":9,"states":3},{"crop":"Groundnut","date":"2021-09","year":2021,"month":9,"price":5600.0,"mean":5882.13,"min":3050.0,"max":9800.0,"observations":114,"markets":81,"states":10},{"crop":"Groundnut","date":"2021-10","year":2021,"month":10,"price":5464.0,"mean":5540.94,"min":1900.0,"max":9600.0,"observations":133,"markets":96,"states":11},{"crop":"Groundnut","date":"2021-11","year":2021,"month":11,"price":5302.0,"mean":5541.72,"min":3780.0,"max":10000.0,"observations":123,"markets":89,"states":9},{"crop":"Groundnut","date":"2021-12","year":2021,"month":12,"price":5365.0,"mean":5628.85,"min":3000.0,"max":10235.0,"observations":190,"markets":122,"states":10},{"crop":"Groundnut","date":"2022-01","year":2022,"month":1,"price":5185.0,"mean":5251.58,"min":1000.0,"max":8000.0,"observations":166,"markets":96,"states":9},{"crop":"Groundnut","date":"2022-02","year":2022,"month":2,"price":5200.0,"mean":5522.51,"min":4000.0,"max":11250.0,"observations":196,"markets":120,"states":11},{"crop":"Groundnut","date":"2022-03","year":2022,"month":3,"price":5600.0,"mean":5886.86,"min":2742.0,"max":10881.0,"observations":122,"markets":95,"states":12},{"crop":"Groundnut","date":"2022-04","year":2022,"month":4,"price":5629.0,"mean":6005.04,"min":3577.0,"max":10156.0,"observations":113,"markets":80,"states":10},{"crop":"Groundnut","date":"2022-05","year":2022,"month":5,"price":5175.0,"mean":5261.0,"min":3566.0,"max":7800.0,"observations":18,"markets":14,"states":6},{"crop":"Groundnut","date":"2022-06","year":2022,"month":6,"price":5700.0,"mean":5858.02,"min":3050.0,"max":10153.0,"observations":213,"markets":140,"states":11},{"crop":"Groundnut","date":"2022-07","year":2022,"month":7,"price":5664.5,"mean":5810.81,"min":3100.0,"max":9800.0,"observations":156,"markets":111,"states":11},{"crop":"Groundnut","date":"2022-08","year":2022,"month":8,"price":5950.0,"mean":6273.8,"min":4200.0,"max":10240.0,"observations":144,"markets":90,"states":11},{"crop":"Groundnut","date":"2022-09","year":2022,"month":9,"price":5691.0,"mean":6026.06,"min":2379.0,"max":10420.0,"observations":124,"markets":80,"states":11},{"crop":"Groundnut","date":"2022-10","year":2022,"month":10,"price":5708.0,"mean":5561.68,"min":1800.0,"max":8362.0,"observations":147,"markets":89,"states":9},{"crop":"Groundnut","date":"2022-11","year":2022,"month":11,"price":5850.0,"mean":6098.74,"min":2650.0,"max":14401.0,"observations":179,"markets":117,"states":11},{"crop":"Groundnut","date":"2022-12","year":2022,"month":12,"price":5800.0,"mean":6019.43,"min":4250.0,"max":10700.0,"observations":161,"markets":108,"states":13},{"crop":"Groundnut","date":"2023-01","year":2023,"month":1,"price":5950.0,"mean":6010.48,"min":4500.0,"max":7569.99,"observations":33,"markets":20,"states":4},{"crop":"Groundnut","date":"2023-02","year":2023,"month":2,"price":6636.5,"mean":6886.6,"min":1250.0,"max":12000.0,"observations":186,"markets":106,"states":10},{"crop":"Groundnut","date":"2023-03","year":2023,"month":3,"price":6854.5,"mean":7051.79,"min":2525.0,"max":11100.0,"observations":124,"markets":92,"states":10},{"crop":"Groundnut","date":"2023-04","year":2023,"month":4,"price":6209.0,"mean":6254.24,"min":4625.0,"max":8900.0,"observations":71,"markets":49,"states":10},{"crop":"Groundnut","date":"2023-05","year":2023,"month":5,"price":6425.0,"mean":6559.69,"min":2640.0,"max":13335.0,"observations":118,"markets":81,"states":12},{"crop":"Groundnut","date":"2023-06","year":2023,"month":6,"price":6395.0,"mean":6397.5,"min":2652.0,"max":10456.0,"observations":208,"markets":123,"states":12},{"crop":"Groundnut","date":"2023-07","year":2023,"month":7,"price":6789.5,"mean":6691.65,"min":2325.0,"max":12255.0,"observations":118,"markets":76,"states":10},{"crop":"Groundnut","date":"2023-08","year":2023,"month":8,"price":7125.0,"mean":7258.1,"min":2789.0,"max":11000.0,"observations":146,"markets":91,"states":10},{"crop":"Groundnut","date":"2023-09","year":2023,"month":9,"price":6468.0,"mean":6710.4,"min":2679.0,"max":12000.0,"observations":112,"markets":72,"states":11},{"crop":"Groundnut","date":"2023-10","year":2023,"month":10,"price":6400.0,"mean":6161.38,"min":3850.0,"max":10600.0,"observations":16,"markets":14,"states":9},{"crop":"Groundnut","date":"2023-11","year":2023,"month":11,"price":6215.25,"mean":6390.06,"min":1220.0,"max":11250.0,"observations":214,"markets":130,"states":11},{"crop":"Groundnut","date":"2023-12","year":2023,"month":12,"price":6405.0,"mean":6626.43,"min":1315.0,"max":11621.0,"observations":238,"markets":135,"states":12},{"crop":"Groundnut","date":"2024-01","year":2024,"month":1,"price":6375.0,"mean":6517.14,"min":4493.0,"max":11261.0,"observations":159,"markets":95,"states":12},{"crop":"Groundnut","date":"2024-02","year":2024,"month":2,"price":6062.0,"mean":6304.6,"min":3700.0,"max":11350.0,"observations":164,"markets":93,"states":10},{"crop":"Groundnut","date":"2024-03","year":2024,"month":3,"price":6107.5,"mean":6360.33,"min":4330.0,"max":11000.0,"observations":126,"markets":98,"states":11},{"crop":"Groundnut","date":"2024-04","year":2024,"month":4,"price":5855.0,"mean":6215.63,"min":4300.0,"max":10943.0,"observations":106,"markets":73,"states":9},{"crop":"Groundnut","date":"2024-05","year":2024,"month":5,"price":5945.0,"mean":6082.61,"min":3800.0,"max":9763.0,"observations":158,"markets":92,"states":7},{"crop":"Groundnut","date":"2024-06","year":2024,"month":6,"price":5750.0,"mean":5771.73,"min":3600.0,"max":11550.0,"observations":191,"markets":107,"states":10},{"crop":"Groundnut","date":"2024-07","year":2024,"month":7,"price":5745.0,"mean":5874.79,"min":3250.0,"max":11250.0,"observations":220,"markets":145,"states":11},{"crop":"Groundnut","date":"2024-08","year":2024,"month":8,"price":6000.0,"mean":6005.04,"min":3436.0,"max":11500.0,"observations":221,"markets":128,"states":12},{"crop":"Groundnut","date":"2024-09","year":2024,"month":9,"price":6000.0,"mean":6237.44,"min":3700.0,"max":11500.0,"observations":112,"markets":65,"states":7},{"crop":"Groundnut","date":"2024-10","year":2024,"month":10,"price":5400.0,"mean":5553.08,"min":3510.0,"max":11300.0,"observations":273,"markets":160,"states":12},{"crop":"Groundnut","date":"2024-11","year":2024,"month":11,"price":5380.0,"mean":5475.11,"min":3400.0,"max":11400.0,"observations":209,"markets":163,"states":11},{"crop":"Groundnut","date":"2024-12","year":2024,"month":12,"price":5800.0,"mean":5679.53,"min":3725.0,"max":8500.0,"observations":72,"markets":63,"states":8},{"crop":"Groundnut","date":"2025-01","year":2025,"month":1,"price":5350.0,"mean":5467.29,"min":3500.0,"max":9000.0,"observations":265,"markets":161,"states":10},{"crop":"Groundnut","date":"2025-02","year":2025,"month":2,"price":5183.0,"mean":5375.95,"min":3495.0,"max":8000.0,"observations":272,"markets":143,"states":9},{"crop":"Groundnut","date":"2025-03","year":2025,"month":3,"price":5330.0,"mean":5567.74,"min":3560.0,"max":8000.0,"observations":237,"markets":135,"states":10},{"crop":"Groundnut","date":"2025-04","year":2025,"month":4,"price":5500.0,"mean":5636.98,"min":3520.0,"max":8000.0,"observations":217,"markets":125,"states":9},{"crop":"Groundnut","date":"2025-05","year":2025,"month":5,"price":5461.0,"mean":5615.52,"min":3500.0,"max":8000.0,"observations":196,"markets":127,"states":10},{"crop":"Groundnut","date":"2025-06","year":2025,"month":6,"price":6000.0,"mean":6222.68,"min":3400.0,"max":12062.0,"observations":108,"markets":62,"states":6},{"crop":"Groundnut","date":"2025-07","year":2025,"month":7,"price":5455.0,"mean":5645.83,"min":3500.0,"max":8000.0,"observations":241,"markets":146,"states":9},{"crop":"Groundnut","date":"2025-08","year":2025,"month":8,"price":5250.0,"mean":5515.59,"min":3500.0,"max":12363.0,"observations":175,"markets":125,"states":9},{"crop":"Groundnut","date":"2025-09","year":2025,"month":9,"price":5500.0,"mean":5700.57,"min":3525.0,"max":12983.0,"observations":201,"markets":116,"states":10},{"crop":"Groundnut","date":"2025-10","year":2025,"month":10,"price":5000.0,"mean":5236.91,"min":3405.0,"max":10500.0,"observations":214,"markets":153,"states":11},{"crop":"Groundnut","date":"2025-11","year":2025,"month":11,"price":5260.0,"mean":5498.17,"min":3420.0,"max":9600.0,"observations":247,"markets":152,"states":8},{"crop":"Groundnut","date":"2025-12","year":2025,"month":12,"price":5800.0,"mean":5954.59,"min":3670.0,"max":13050.0,"observations":335,"markets":170,"states":10},{"crop":"Jowar/Sorghum","date":"2015-01","year":2015,"month":1,"price":2000.0,"mean":2147.06,"min":1040.0,"max":5300.0,"observations":161,"markets":99,"states":7},{"crop":"Jowar/Sorghum","date":"2015-02","year":2015,"month":2,"price":1700.0,"mean":1799.69,"min":1050.0,"max":4000.0,"observations":35,"markets":23,"states":8},{"crop":"Jowar/Sorghum","date":"2015-03","year":2015,"month":3,"price":1650.0,"mean":1623.46,"min":1030.0,"max":2450.0,"observations":28,"markets":18,"states":6},{"crop":"Jowar/Sorghum","date":"2015-04","year":2015,"month":4,"price":1927.5,"mean":1996.21,"min":850.0,"max":5504.0,"observations":100,"markets":72,"states":9},{"crop":"Jowar/Sorghum","date":"2015-05","year":2015,"month":5,"price":1875.0,"mean":1940.15,"min":1000.0,"max":5350.0,"observations":81,"markets":63,"states":7},{"crop":"Jowar/Sorghum","date":"2015-06","year":2015,"month":6,"price":2070.0,"mean":2161.57,"min":1000.0,"max":5741.0,"observations":179,"markets":106,"states":9},{"crop":"Jowar/Sorghum","date":"2015-07","year":2015,"month":7,"price":1950.0,"mean":2046.11,"min":500.0,"max":5097.0,"observations":144,"markets":89,"states":7},{"crop":"Jowar/Sorghum","date":"2015-08","year":2015,"month":8,"price":2000.0,"mean":2158.92,"min":900.0,"max":5600.0,"observations":87,"markets":61,"states":7},{"crop":"Jowar/Sorghum","date":"2015-09","year":2015,"month":9,"price":1700.0,"mean":1860.38,"min":850.0,"max":3940.0,"observations":136,"markets":89,"states":8},{"crop":"Jowar/Sorghum","date":"2015-10","year":2015,"month":10,"price":1800.0,"mean":1809.24,"min":1000.0,"max":3829.0,"observations":165,"markets":105,"states":8},{"crop":"Jowar/Sorghum","date":"2015-11","year":2015,"month":11,"price":1500.0,"mean":1499.04,"min":1100.0,"max":2200.0,"observations":25,"markets":19,"states":7},{"crop":"Jowar/Sorghum","date":"2015-12","year":2015,"month":12,"price":1875.0,"mean":1995.59,"min":600.0,"max":4575.0,"observations":197,"markets":124,"states":8},{"crop":"Jowar/Sorghum","date":"2016-01","year":2016,"month":1,"price":1951.0,"mean":2095.66,"min":1250.0,"max":5000.0,"observations":181,"markets":111,"states":8},{"crop":"Jowar/Sorghum","date":"2016-02","year":2016,"month":2,"price":1900.0,"mean":2100.85,"min":1200.0,"max":8340.0,"observations":133,"markets":101,"states":9},{"crop":"Jowar/Sorghum","date":"2016-03","year":2016,"month":3,"price":1967.5,"mean":2034.96,"min":1200.0,"max":4990.0,"observations":158,"markets":100,"states":8},{"crop":"Jowar/Sorghum","date":"2016-04","year":2016,"month":4,"price":1990.0,"mean":2082.65,"min":950.0,"max":4080.0,"observations":124,"markets":84,"states":8},{"crop":"Jowar/Sorghum","date":"2016-05","year":2016,"month":5,"price":2051.0,"mean":1985.76,"min":1400.0,"max":3150.0,"observations":17,"markets":17,"states":6},{"crop":"Jowar/Sorghum","date":"2016-06","year":2016,"month":6,"price":1955.5,"mean":2032.41,"min":600.0,"max":5212.0,"observations":214,"markets":129,"states":7},{"crop":"Jowar/Sorghum","date":"2016-07","year":2016,"month":7,"price":1900.0,"mean":2007.11,"min":1019.0,"max":5591.0,"observations":193,"markets":119,"states":5},{"crop":"Jowar/Sorghum","date":"2016-08","year":2016,"month":8,"price":1875.0,"mean":1938.93,"min":950.0,"max":3500.0,"observations":148,"markets":97,"states":7},{"crop":"Jowar/Sorghum","date":"2016-09","year":2016,"month":9,"price":1800.0,"mean":1871.96,"min":1330.0,"max":3300.0,"observations":114,"markets":88,"states":8},{"crop":"Jowar/Sorghum","date":"2016-10","year":2016,"month":10,"price":1750.0,"mean":1769.12,"min":1020.0,"max":3170.0,"observations":113,"markets":80,"states":6},{"crop":"Jowar/Sorghum","date":"2016-11","year":2016,"month":11,"price":1650.5,"mean":1687.56,"min":1000.0,"max":3450.0,"observations":158,"markets":130,"states":7},{"crop":"Jowar/Sorghum","date":"2016-12","year":2016,"month":12,"price":1800.0,"mean":1862.44,"min":1000.0,"max":3550.0,"observations":263,"markets":153,"states":7},{"crop":"Jowar/Sorghum","date":"2017-01","year":2017,"month":1,"price":1630.0,"mean":1777.29,"min":1050.0,"max":3200.0,"observations":35,"markets":22,"states":5},{"crop":"Jowar/Sorghum","date":"2017-02","year":2017,"month":2,"price":2000.0,"mean":1993.46,"min":1100.0,"max":4000.0,"observations":261,"markets":157,"states":9},{"crop":"Jowar/Sorghum","date":"2017-03","year":2017,"month":3,"price":1901.0,"mean":1898.43,"min":1100.0,"max":4300.0,"observations":265,"markets":163,"states":9},{"crop":"Jowar/Sorghum","date":"2017-04","year":2017,"month":4,"price":1838.0,"mean":1862.59,"min":1150.0,"max":3350.0,"observations":164,"markets":110,"states":7},{"crop":"Jowar/Sorghum","date":"2017-05","year":2017,"month":5,"price":1775.0,"mean":1842.78,"min":1175.0,"max":4469.0,"observations":119,"markets":97,"states":8},{"crop":"Jowar/Sorghum","date":"2017-06","year":2017,"month":6,"price":1790.0,"mean":1858.05,"min":1150.0,"max":4750.0,"observations":171,"markets":106,"states":7},{"crop":"Jowar/Sorghum","date":"2017-07","year":2017,"month":7,"price":1700.0,"mean":1785.43,"min":1125.0,"max":3050.0,"observations":145,"markets":86,"states":8},{"crop":"Jowar/Sorghum","date":"2017-08","year":2017,"month":8,"price":1751.0,"mean":1918.21,"min":950.0,"max":4500.0,"observations":163,"markets":111,"states":8},{"crop":"Jowar/Sorghum","date":"2017-09","year":2017,"month":9,"price":1750.0,"mean":1859.45,"min":1100.0,"max":3903.0,"observations":211,"markets":121,"states":8},{"crop":"Jowar/Sorghum","date":"2017-10","year":2017,"month":10,"price":1430.5,"mean":1534.0,"min":1050.0,"max":2600.0,"observations":26,"markets":20,"states":6},{"crop":"Jowar/Sorghum","date":"2017-11","year":2017,"month":11,"price":1590.0,"mean":1588.45,"min":600.0,"max":3650.0,"observations":246,"markets":146,"states":9},{"crop":"Jowar/Sorghum","date":"2017-12","year":2017,"month":12,"price":1650.0,"mean":1679.43,"min":900.0,"max":3200.0,"observations":212,"markets":141,"states":8},{"crop":"Jowar/Sorghum","date":"2018-01","year":2018,"month":1,"price":1600.0,"mean":1699.94,"min":873.0,"max":3735.0,"observations":234,"markets":137,"states":8},{"crop":"Jowar/Sorghum","date":"2018-02","year":2018,"month":2,"price":1600.0,"mean":1795.4,"min":925.0,"max":4305.0,"observations":217,"markets":139,"states":9},{"crop":"Jowar/Sorghum","date":"2018-03","year":2018,"month":3,"price":1650.0,"mean":1836.79,"min":914.0,"max":7100.0,"observations":159,"markets":107,"states":8},{"crop":"Jowar/Sorghum","date":"2018-04","year":2018,"month":4,"price":1850.0,"mean":1772.12,"min":950.0,"max":2650.0,"observations":25,"markets":18,"states":5},{"crop":"Jowar/Sorghum","date":"2018-05","year":2018,"month":5,"price":1700.0,"mean":1771.99,"min":800.0,"max":4253.0,"observations":113,"markets":89,"states":8},{"crop":"Jowar/Sorghum","date":"2018-06","year":2018,"month":6,"price":1647.0,"mean":1871.52,"min":900.0,"max":3602.0,"observations":183,"markets":120,"states":8},{"crop":"Jowar/Sorghum","date":"2018-07","year":2018,"month":7,"price":1650.0,"mean":1729.89,"min":900.0,"max":3100.0,"observations":19,"markets":13,"states":3},{"crop":"Jowar/Sorghum","date":"2018-08","year":2018,"month":8,"price":1800.0,"mean":1984.56,"min":950.0,"max":4000.0,"observations":164,"markets":106,"states":8},{"crop":"Jowar/Sorghum","date":"2018-09","year":2018,"month":9,"price":1716.5,"mean":2035.82,"min":1000.0,"max":9000.0,"observations":98,"markets":74,"states":8},{"crop":"Jowar/Sorghum","date":"2018-10","year":2018,"month":10,"price":1881.0,"mean":1988.14,"min":1000.0,"max":3500.0,"observations":150,"markets":105,"states":9},{"crop":"Jowar/Sorghum","date":"2018-11","year":2018,"month":11,"price":2200.0,"mean":2331.65,"min":1100.0,"max":4100.0,"observations":113,"markets":85,"states":7},{"crop":"Jowar/Sorghum","date":"2018-12","year":2018,"month":12,"price":2300.5,"mean":2445.95,"min":1000.0,"max":4600.0,"observations":202,"markets":123,"states":8},{"crop":"Jowar/Sorghum","date":"2019-01","year":2019,"month":1,"price":2175.0,"mean":2374.16,"min":1115.0,"max":4680.0,"observations":208,"markets":128,"states":8},{"crop":"Jowar/Sorghum","date":"2019-02","year":2019,"month":2,"price":2300.0,"mean":2401.1,"min":1000.0,"max":4502.0,"observations":211,"markets":130,"states":9},{"crop":"Jowar/Sorghum","date":"2019-03","year":2019,"month":3,"price":2400.0,"mean":2456.23,"min":588.0,"max":4665.0,"observations":195,"markets":117,"states":11},{"crop":"Jowar/Sorghum","date":"2019-04","year":2019,"month":4,"price":2474.0,"mean":2499.06,"min":1176.0,"max":4600.0,"observations":195,"markets":121,"states":9},{"crop":"Jowar/Sorghum","date":"2019-05","year":2019,"month":5,"price":2450.0,"mean":2468.05,"min":1000.0,"max":4487.0,"observations":125,"markets":102,"states":8},{"crop":"Jowar/Sorghum","date":"2019-06","year":2019,"month":6,"price":2501.0,"mean":2535.96,"min":596.0,"max":5105.0,"observations":165,"markets":107,"states":8},{"crop":"Jowar/Sorghum","date":"2019-07","year":2019,"month":7,"price":2727.5,"mean":2769.94,"min":1301.0,"max":5355.0,"observations":174,"markets":110,"states":8},{"crop":"Jowar/Sorghum","date":"2019-08","year":2019,"month":8,"price":2800.0,"mean":2898.98,"min":1650.0,"max":5852.0,"observations":121,"markets":85,"states":10},{"crop":"Jowar/Sorghum","date":"2019-09","year":2019,"month":9,"price":2300.0,"mean":2360.36,"min":1201.0,"max":4000.0,"observations":28,"markets":20,"states":6},{"crop":"Jowar/Sorghum","date":"2019-10","year":2019,"month":10,"price":2590.0,"mean":2574.64,"min":1109.0,"max":4600.0,"observations":120,"markets":90,"states":8},{"crop":"Jowar/Sorghum","date":"2019-11","year":2019,"month":11,"price":2022.5,"mean":2246.35,"min":800.0,"max":4600.0,"observations":190,"markets":124,"states":8},{"crop":"Jowar/Sorghum","date":"2019-12","year":2019,"month":12,"price":2200.0,"mean":2323.92,"min":1230.0,"max":5500.0,"observations":51,"markets":32,"states":7},{"crop":"Jowar/Sorghum","date":"2020-01","year":2020,"month":1,"price":2362.5,"mean":2572.24,"min":285.5,"max":5450.0,"observations":194,"markets":124,"states":7},{"crop":"Jowar/Sorghum","date":"2020-02","year":2020,"month":2,"price":2487.5,"mean":2590.85,"min":1230.0,"max":5460.0,"observations":160,"markets":100,"states":7},{"crop":"Jowar/Sorghum","date":"2020-03","year":2020,"month":3,"price":2300.0,"mean":2306.55,"min":1200.0,"max":3950.0,"observations":29,"markets":19,"states":6},{"crop":"Jowar/Sorghum","date":"2020-04","year":2020,"month":4,"price":2550.0,"mean":2714.04,"min":1150.0,"max":4800.0,"observations":27,"markets":24,"states":3},{"crop":"Jowar/Sorghum","date":"2020-05","year":2020,"month":5,"price":2512.5,"mean":2408.09,"min":830.0,"max":4755.0,"observations":96,"markets":83,"states":5},{"crop":"Jowar/Sorghum","date":"2020-06","year":2020,"month":6,"price":2439.5,"mean":2441.76,"min":850.0,"max":6125.0,"observations":184,"markets":114,"states":7},{"crop":"Jowar/Sorghum","date":"2020-07","year":2020,"month":7,"price":2500.0,"mean":2520.4,"min":950.0,"max":5237.0,"observations":139,"markets":103,"states":7},{"crop":"Jowar/Sorghum","date":"2020-08","year":2020,"month":8,"price":2258.0,"mean":2473.93,"min":900.0,"max":5130.0,"observations":56,"markets":46,"states":5},{"crop":"Jowar/Sorghum","date":"2020-09","year":2020,"month":9,"price":1850.0,"mean":1987.01,"min":800.0,"max":4550.0,"observations":101,"markets":79,"states":6},{"crop":"Jowar/Sorghum","date":"2020-10","year":2020,"month":10,"price":1741.0,"mean":1915.41,"min":800.0,"max":4750.0,"observations":157,"markets":98,"states":7},{"crop":"Jowar/Sorghum","date":"2020-11","year":2020,"month":11,"price":1900.0,"mean":1994.76,"min":1050.0,"max":3000.0,"observations":21,"markets":16,"states":7},{"crop":"Jowar/Sorghum","date":"2020-12","year":2020,"month":12,"price":1830.0,"mean":1972.4,"min":1000.0,"max":4850.0,"observations":115,"markets":101,"states":8},{"crop":"Jowar/Sorghum","date":"2021-01","year":2021,"month":1,"price":1969.5,"mean":2088.95,"min":751.0,"max":5000.0,"observations":146,"markets":108,"states":8},{"crop":"Jowar/Sorghum","date":"2021-02","year":2021,"month":2,"price":1750.0,"mean":1999.35,"min":800.0,"max":4975.0,"observations":176,"markets":118,"states":7},{"crop":"Jowar/Sorghum","date":"2021-03","year":2021,"month":3,"price":2000.0,"mean":2118.19,"min":850.0,"max":4900.0,"observations":183,"markets":124,"states":8},{"crop":"Jowar/Sorghum","date":"2021-04","year":2021,"month":4,"price":2114.0,"mean":2297.13,"min":900.0,"max":5001.0,"observations":119,"markets":82,"states":8},{"crop":"Jowar/Sorghum","date":"2021-05","year":2021,"month":5,"price":1750.0,"mean":1795.13,"min":1000.0,"max":3600.0,"observations":38,"markets":33,"states":5},{"crop":"Jowar/Sorghum","date":"2021-06","year":2021,"month":6,"price":1818.0,"mean":2010.87,"min":900.0,"max":4800.0,"observations":164,"markets":113,"states":7},{"crop":"Jowar/Sorghum","date":"2021-07","year":2021,"month":7,"price":1800.0,"mean":2043.6,"min":1075.0,"max":4650.0,"observations":143,"markets":103,"states":7},{"crop":"Jowar/Sorghum","date":"2021-08","year":2021,"month":8,"price":1530.0,"mean":1690.33,"min":1200.0,"max":2450.0,"observations":15,"markets":12,"states":5},{"crop":"Jowar/Sorghum","date":"2021-09","year":2021,"month":9,"price":1520.0,"mean":1755.37,"min":550.0,"max":4200.0,"observations":167,"markets":114,"states":8},{"crop":"Jowar/Sorghum","date":"2021-10","year":2021,"month":10,"price":1475.0,"mean":1667.65,"min":1000.0,"max":4050.0,"observations":161,"markets":104,"states":7},{"crop":"Jowar/Sorghum","date":"2021-11","year":2021,"month":11,"price":1425.0,"mean":1601.73,"min":900.0,"max":4300.0,"observations":145,"markets":100,"states":7},{"crop":"Jowar/Sorghum","date":"2021-12","year":2021,"month":12,"price":1620.0,"mean":1795.74,"min":160.5,"max":4500.0,"observations":189,"markets":131,"states":8},{"crop":"Jowar/Sorghum","date":"2022-01","year":2022,"month":1,"price":1725.0,"mean":1928.65,"min":1075.0,"max":6905.0,"observations":159,"markets":111,"states":7},{"crop":"Jowar/Sorghum","date":"2022-02","year":2022,"month":2,"price":1872.5,"mean":2050.41,"min":785.0,"max":4250.0,"observations":176,"markets":126,"states":9},{"crop":"Jowar/Sorghum","date":"2022-03","year":2022,"month":3,"price":2065.0,"mean":2196.63,"min":1200.0,"max":4400.0,"observations":108,"markets":93,"states":9},{"crop":"Jowar/Sorghum","date":"2022-04","year":2022,"month":4,"price":2200.0,"mean":2300.28,"min":1400.0,"max":4900.0,"observations":114,"markets":91,"states":10},{"crop":"Jowar/Sorghum","date":"2022-05","year":2022,"month":5,"price":1800.0,"mean":1829.21,"min":834.0,"max":2470.0,"observations":19,"markets":15,"states":5},{"crop":"Jowar/Sorghum","date":"2022-06","year":2022,"month":6,"price":2089.0,"mean":2312.68,"min":1200.0,"max":6001.0,"observations":174,"markets":116,"states":9},{"crop":"Jowar/Sorghum","date":"2022-07","year":2022,"month":7,"price":2261.0,"mean":2500.09,"min":1451.0,"max":4630.0,"observations":133,"markets":100,"states":9},{"crop":"Jowar/Sorghum","date":"2022-08","year":2022,"month":8,"price":2412.5,"mean":2496.43,"min":1220.0,"max":4300.0,"observations":152,"markets":107,"states":9},{"crop":"Jowar/Sorghum","date":"2022-09","year":2022,"month":9,"price":2400.0,"mean":2533.91,"min":1411.0,"max":4450.0,"observations":108,"markets":77,"states":10},{"crop":"Jowar/Sorghum","date":"2022-10","year":2022,"month":10,"price":2447.0,"mean":2507.58,"min":1450.0,"max":4500.0,"observations":102,"markets":74,"states":8},{"crop":"Jowar/Sorghum","date":"2022-11","year":2022,"month":11,"price":2800.0,"mean":2766.39,"min":1410.0,"max":6025.0,"observations":120,"markets":90,"states":8},{"crop":"Jowar/Sorghum","date":"2022-12","year":2022,"month":12,"price":3000.0,"mean":3113.32,"min":1739.0,"max":6041.0,"observations":123,"markets":86,"states":7},{"crop":"Jowar/Sorghum","date":"2023-01","year":2023,"month":1,"price":2860.0,"mean":3042.95,"min":1500.0,"max":5500.0,"observations":22,"markets":14,"states":7},{"crop":"Jowar/Sorghum","date":"2023-02","year":2023,"month":2,"price":3246.5,"mean":3446.91,"min":1250.0,"max":6891.0,"observations":152,"markets":98,"states":9},{"crop":"Jowar/Sorghum","date":"2023-03","year":2023,"month":3,"price":3488.5,"mean":3648.24,"min":1600.0,"max":9000.0,"observations":136,"markets":95,"states":8},{"crop":"Jowar/Sorghum","date":"2023-04","year":2023,"month":4,"price":3300.0,"mean":3445.16,"min":1300.0,"max":8000.0,"observations":115,"markets":77,"states":8},{"crop":"Jowar/Sorghum","date":"2023-05","year":2023,"month":5,"price":3200.0,"mean":3264.97,"min":1665.0,"max":5250.0,"observations":114,"markets":91,"states":8},{"crop":"Jowar/Sorghum","date":"2023-06","year":2023,"month":6,"price":3251.0,"mean":3247.67,"min":1375.0,"max":6000.0,"observations":215,"markets":134,"states":9},{"crop":"Jowar/Sorghum","date":"2023-07","year":2023,"month":7,"price":3600.0,"mean":3653.37,"min":1500.0,"max":5611.0,"observations":166,"markets":103,"states":9},{"crop":"Jowar/Sorghum","date":"2023-08","year":2023,"month":8,"price":3600.0,"mean":3630.19,"min":1681.0,"max":6062.0,"observations":153,"markets":94,"states":9},{"crop":"Jowar/Sorghum","date":"2023-09","year":2023,"month":9,"price":3669.5,"mean":3680.36,"min":2112.0,"max":5900.0,"observations":118,"markets":82,"states":7},{"crop":"Jowar/Sorghum","date":"2023-10","year":2023,"month":10,"price":3950.0,"mean":3593.07,"min":2400.0,"max":4500.0,"observations":14,"markets":9,"states":4},{"crop":"Jowar/Sorghum","date":"2023-11","year":2023,"month":11,"price":3350.0,"mean":3629.05,"min":1500.0,"max":6390.0,"observations":148,"markets":100,"states":9},{"crop":"Jowar/Sorghum","date":"2023-12","year":2023,"month":12,"price":4200.0,"mean":4089.43,"min":1700.0,"max":7000.0,"observations":153,"markets":104,"states":8},{"crop":"Jowar/Sorghum","date":"2024-01","year":2024,"month":1,"price":3566.5,"mean":3629.51,"min":1995.0,"max":6150.0,"observations":138,"markets":81,"states":7},{"crop":"Jowar/Sorghum","date":"2024-02","year":2024,"month":2,"price":3300.0,"mean":3343.4,"min":1800.0,"max":5700.0,"observations":130,"markets":89,"states":6},{"crop":"Jowar/Sorghum","date":"2024-03","year":2024,"month":3,"price":2875.0,"mean":3040.22,"min":1600.0,"max":5440.0,"observations":116,"markets":102,"states":8},{"crop":"Jowar/Sorghum","date":"2024-04","year":2024,"month":4,"price":2865.0,"mean":2964.38,"min":1810.0,"max":4515.0,"observations":106,"markets":83,"states":8},{"crop":"Jowar/Sorghum","date":"2024-05","year":2024,"month":5,"price":2700.0,"mean":2738.94,"min":1744.0,"max":5050.0,"observations":116,"markets":87,"states":9},{"crop":"Jowar/Sorghum","date":"2024-06","year":2024,"month":6,"price":2737.5,"mean":2928.69,"min":1750.0,"max":5200.0,"observations":202,"markets":129,"states":6},{"crop":"Jowar/Sorghum","date":"2024-07","year":2024,"month":7,"price":2540.0,"mean":2921.14,"min":1600.0,"max":5200.0,"observations":231,"markets":144,"states":7},{"crop":"Jowar/Sorghum","date":"2024-08","year":2024,"month":8,"price":2425.0,"mean":2782.51,"min":1600.0,"max":5300.0,"observations":206,"markets":129,"states":7},{"crop":"Jowar/Sorghum","date":"2024-09","year":2024,"month":9,"price":2305.5,"mean":2548.29,"min":1950.0,"max":3750.0,"observations":14,"markets":11,"states":3},{"crop":"Jowar/Sorghum","date":"2024-10","year":2024,"month":10,"price":2387.5,"mean":2742.7,"min":1762.0,"max":5400.0,"observations":142,"markets":111,"states":7},{"crop":"Jowar/Sorghum","date":"2024-11","year":2024,"month":11,"price":2300.5,"mean":2534.62,"min":1700.0,"max":4700.0,"observations":130,"markets":120,"states":7},{"crop":"Jowar/Sorghum","date":"2024-12","year":2024,"month":12,"price":2500.0,"mean":2700.0,"min":1800.0,"max":4500.0,"observations":19,"markets":16,"states":5},{"crop":"Jowar/Sorghum","date":"2025-01","year":2025,"month":1,"price":2300.0,"mean":2740.42,"min":1725.0,"max":6000.0,"observations":161,"markets":114,"states":7},{"crop":"Jowar/Sorghum","date":"2025-02","year":2025,"month":2,"price":2440.0,"mean":2953.16,"min":1750.0,"max":5800.0,"observations":153,"markets":104,"states":8},{"crop":"Jowar/Sorghum","date":"2025-03","year":2025,"month":3,"price":2400.0,"mean":2782.46,"min":1686.0,"max":5207.0,"observations":162,"markets":101,"states":9},{"crop":"Jowar/Sorghum","date":"2025-04","year":2025,"month":4,"price":2700.0,"mean":2872.84,"min":1711.0,"max":5955.0,"observations":159,"markets":105,"states":9},{"crop":"Jowar/Sorghum","date":"2025-05","year":2025,"month":5,"price":2525.0,"mean":2777.47,"min":1700.0,"max":5300.0,"observations":113,"markets":98,"states":9},{"crop":"Jowar/Sorghum","date":"2025-06","year":2025,"month":6,"price":3200.0,"mean":2963.5,"min":1991.0,"max":4200.0,"observations":16,"markets":14,"states":5},{"crop":"Jowar/Sorghum","date":"2025-07","year":2025,"month":7,"price":2500.0,"mean":2841.14,"min":1700.0,"max":6617.0,"observations":166,"markets":108,"states":8},{"crop":"Jowar/Sorghum","date":"2025-08","year":2025,"month":8,"price":2512.0,"mean":2837.13,"min":1700.0,"max":6047.0,"observations":162,"markets":107,"states":6},{"crop":"Jowar/Sorghum","date":"2025-09","year":2025,"month":9,"price":2500.0,"mean":2750.27,"min":1767.0,"max":5100.0,"observations":139,"markets":97,"states":9},{"crop":"Jowar/Sorghum","date":"2025-10","year":2025,"month":10,"price":2400.0,"mean":2647.36,"min":1700.0,"max":5000.0,"observations":133,"markets":93,"states":7},{"crop":"Jowar/Sorghum","date":"2025-11","year":2025,"month":11,"price":2790.5,"mean":2973.95,"min":1712.0,"max":5050.0,"observations":94,"markets":67,"states":6},{"crop":"Jowar/Sorghum","date":"2025-12","year":2025,"month":12,"price":3100.0,"mean":3317.08,"min":1850.0,"max":6001.0,"observations":130,"markets":88,"states":9},{"crop":"Maize","date":"2015-01","year":2015,"month":1,"price":1250.0,"mean":1238.26,"min":850.0,"max":3500.0,"observations":410,"markets":262,"states":15},{"crop":"Maize","date":"2015-02","year":2015,"month":2,"price":1300.0,"mean":1246.08,"min":700.0,"max":1600.0,"observations":125,"markets":81,"states":14},{"crop":"Maize","date":"2015-03","year":2015,"month":3,"price":1300.0,"mean":1261.83,"min":853.0,"max":3250.0,"observations":109,"markets":73,"states":10},{"crop":"Maize","date":"2015-04","year":2015,"month":4,"price":1300.0,"mean":1303.5,"min":825.0,"max":4200.0,"observations":329,"markets":242,"states":16},{"crop":"Maize","date":"2015-05","year":2015,"month":5,"price":1310.0,"mean":1280.26,"min":870.0,"max":1655.0,"observations":293,"markets":204,"states":14},{"crop":"Maize","date":"2015-06","year":2015,"month":6,"price":1272.0,"mean":1256.96,"min":850.0,"max":1800.0,"observations":399,"markets":257,"states":17},{"crop":"Maize","date":"2015-07","year":2015,"month":7,"price":1275.0,"mean":1252.68,"min":750.0,"max":5400.0,"observations":394,"markets":257,"states":18},{"crop":"Maize","date":"2015-08","year":2015,"month":8,"price":1300.0,"mean":1277.31,"min":550.0,"max":1600.0,"observations":287,"markets":185,"states":19},{"crop":"Maize","date":"2015-09","year":2015,"month":9,"price":1393.0,"mean":1378.67,"min":600.0,"max":2400.0,"observations":327,"markets":207,"states":17},{"crop":"Maize","date":"2015-10","year":2015,"month":10,"price":1359.0,"mean":1369.79,"min":800.0,"max":4100.0,"observations":442,"markets":288,"states":18},{"crop":"Maize","date":"2015-11","year":2015,"month":11,"price":1325.0,"mean":1329.68,"min":1000.0,"max":1550.0,"observations":174,"markets":110,"states":14},{"crop":"Maize","date":"2015-12","year":2015,"month":12,"price":1424.5,"mean":1426.25,"min":800.0,"max":1850.0,"observations":552,"markets":350,"states":17},{"crop":"Maize","date":"2016-01","year":2016,"month":1,"price":1440.0,"mean":1441.26,"min":950.0,"max":3700.0,"observations":472,"markets":306,"states":17},{"crop":"Maize","date":"2016-02","year":2016,"month":2,"price":1429.5,"mean":1437.57,"min":900.0,"max":2050.0,"observations":380,"markets":272,"states":15},{"crop":"Maize","date":"2016-03","year":2016,"month":3,"price":1400.0,"mean":1441.47,"min":950.0,"max":4009.0,"observations":351,"markets":243,"states":18},{"crop":"Maize","date":"2016-04","year":2016,"month":4,"price":1400.0,"mean":1418.76,"min":800.0,"max":1850.0,"observations":226,"markets":181,"states":15},{"crop":"Maize","date":"2016-05","year":2016,"month":5,"price":1375.0,"mean":1391.29,"min":1100.0,"max":1720.0,"observations":106,"markets":74,"states":12},{"crop":"Maize","date":"2016-06","year":2016,"month":6,"price":1461.0,"mean":1489.5,"min":800.0,"max":3800.0,"observations":389,"markets":253,"states":16},{"crop":"Maize","date":"2016-07","year":2016,"month":7,"price":1600.0,"mean":1583.29,"min":1000.0,"max":2588.0,"observations":326,"markets":227,"states":18},{"crop":"Maize","date":"2016-08","year":2016,"month":8,"price":1611.0,"mean":1616.08,"min":1000.0,"max":3600.0,"observations":291,"markets":199,"states":17},{"crop":"Maize","date":"2016-09","year":2016,"month":9,"price":1595.0,"mean":1581.33,"min":750.0,"max":3100.0,"observations":279,"markets":189,"states":18},{"crop":"Maize","date":"2016-10","year":2016,"month":10,"price":1450.0,"mean":1482.96,"min":800.0,"max":3350.0,"observations":252,"markets":190,"states":13},{"crop":"Maize","date":"2016-11","year":2016,"month":11,"price":1364.0,"mean":1347.65,"min":800.0,"max":3512.0,"observations":435,"markets":353,"states":16},{"crop":"Maize","date":"2016-12","year":2016,"month":12,"price":1365.0,"mean":1371.04,"min":1000.0,"max":4714.0,"observations":654,"markets":392,"states":16},{"crop":"Maize","date":"2017-01","year":2017,"month":1,"price":1365.5,"mean":1367.73,"min":1100.0,"max":2100.0,"observations":158,"markets":104,"states":15},{"crop":"Maize","date":"2017-02","year":2017,"month":2,"price":1395.0,"mean":1422.19,"min":1000.0,"max":3946.0,"observations":543,"markets":334,"states":17},{"crop":"Maize","date":"2017-03","year":2017,"month":3,"price":1385.0,"mean":1409.14,"min":550.0,"max":3800.0,"observations":528,"markets":330,"states":18},{"crop":"Maize","date":"2017-04","year":2017,"month":4,"price":1380.0,"mean":1394.32,"min":1103.0,"max":2300.0,"observations":302,"markets":221,"states":14},{"crop":"Maize","date":"2017-05","year":2017,"month":5,"price":1380.0,"mean":1416.02,"min":573.0,"max":2524.0,"observations":381,"markets":281,"states":16},{"crop":"Maize","date":"2017-06","year":2017,"month":6,"price":1369.5,"mean":1387.84,"min":125.5,"max":2900.0,"observations":390,"markets":258,"states":16},{"crop":"Maize","date":"2017-07","year":2017,"month":7,"price":1350.0,"mean":1324.49,"min":350.0,"max":2300.0,"observations":309,"markets":224,"states":16},{"crop":"Maize","date":"2017-08","year":2017,"month":8,"price":1391.0,"mean":1375.03,"min":126.0,"max":4300.0,"observations":367,"markets":248,"states":16},{"crop":"Maize","date":"2017-09","year":2017,"month":9,"price":1350.0,"mean":1361.6,"min":880.0,"max":4600.0,"observations":434,"markets":279,"states":19},{"crop":"Maize","date":"2017-10","year":2017,"month":10,"price":1206.0,"mean":1249.07,"min":867.0,"max":1625.0,"observations":146,"markets":97,"states":15},{"crop":"Maize","date":"2017-11","year":2017,"month":11,"price":1149.0,"mean":1188.81,"min":30.0,"max":3001.0,"observations":675,"markets":421,"states":16},{"crop":"Maize","date":"2017-12","year":2017,"month":12,"price":1160.0,"mean":1199.26,"min":870.0,"max":2852.0,"observations":641,"markets":410,"states":18},{"crop":"Maize","date":"2018-01","year":2018,"month":1,"price":1160.5,"mean":1210.79,"min":850.0,"max":2425.0,"observations":586,"markets":367,"states":16},{"crop":"Maize","date":"2018-02","year":2018,"month":2,"price":1160.0,"mean":1231.45,"min":120.0,"max":12092.0,"observations":576,"markets":365,"states":16},{"crop":"Maize","date":"2018-03","year":2018,"month":3,"price":1160.0,"mean":1214.39,"min":850.0,"max":2894.0,"observations":443,"markets":301,"states":16},{"crop":"Maize","date":"2018-04","year":2018,"month":4,"price":1195.0,"mean":1232.87,"min":750.0,"max":2932.0,"observations":113,"markets":78,"states":8},{"crop":"Maize","date":"2018-05","year":2018,"month":5,"price":1200.0,"mean":1242.38,"min":750.0,"max":2300.0,"observations":358,"markets":261,"states":13},{"crop":"Maize","date":"2018-06","year":2018,"month":6,"price":1270.0,"mean":1278.81,"min":800.0,"max":2500.0,"observations":413,"markets":278,"states":17},{"crop":"Maize","date":"2018-07","year":2018,"month":7,"price":1177.5,"mean":1222.64,"min":950.0,"max":1700.0,"observations":112,"markets":78,"states":12},{"crop":"Maize","date":"2018-08","year":2018,"month":8,"price":1300.0,"mean":1347.08,"min":700.0,"max":6300.0,"observations":368,"markets":244,"states":17},{"crop":"Maize","date":"2018-09","year":2018,"month":9,"price":1313.5,"mean":1324.22,"min":600.0,"max":3950.0,"observations":236,"markets":159,"states":13},{"crop":"Maize","date":"2018-10","year":2018,"month":10,"price":1357.0,"mean":1373.38,"min":850.0,"max":3308.0,"observations":413,"markets":287,"states":17},{"crop":"Maize","date":"2018-11","year":2018,"month":11,"price":1357.5,"mean":1377.71,"min":1010.0,"max":2950.0,"observations":274,"markets":232,"states":11},{"crop":"Maize","date":"2018-12","year":2018,"month":12,"price":1496.0,"mean":1498.2,"min":1000.0,"max":3250.0,"observations":467,"markets":326,"states":14},{"crop":"Maize","date":"2019-01","year":2019,"month":1,"price":1625.0,"mean":1623.05,"min":160.0,"max":3500.0,"observations":539,"markets":336,"states":16},{"crop":"Maize","date":"2019-02","year":2019,"month":2,"price":1850.0,"mean":1824.87,"min":195.0,"max":3500.0,"observations":481,"markets":311,"states":16},{"crop":"Maize","date":"2019-03","year":2019,"month":3,"price":1850.0,"mean":1829.4,"min":191.0,"max":2700.0,"observations":426,"markets":274,"states":15},{"crop":"Maize","date":"2019-04","year":2019,"month":4,"price":1950.0,"mean":1923.86,"min":205.0,"max":6750.0,"observations":371,"markets":258,"states":14},{"crop":"Maize","date":"2019-05","year":2019,"month":5,"price":1900.0,"mean":1894.98,"min":170.0,"max":3300.0,"observations":319,"markets":234,"states":14},{"crop":"Maize","date":"2019-06","year":2019,"month":6,"price":1900.0,"mean":1908.8,"min":185.0,"max":2700.0,"observations":297,"markets":205,"states":15},{"crop":"Maize","date":"2019-07","year":2019,"month":7,"price":1905.0,"mean":1935.06,"min":191.1,"max":4455.0,"observations":366,"markets":227,"states":18},{"crop":"Maize","date":"2019-08","year":2019,"month":8,"price":1980.0,"mean":2024.27,"min":400.0,"max":6000.0,"observations":284,"markets":186,"states":16},{"crop":"Maize","date":"2019-09","year":2019,"month":9,"price":1850.0,"mean":1814.26,"min":250.0,"max":3500.0,"observations":107,"markets":67,"states":11},{"crop":"Maize","date":"2019-10","year":2019,"month":10,"price":1925.0,"mean":1923.98,"min":230.0,"max":3450.0,"observations":259,"markets":191,"states":15},{"crop":"Maize","date":"2019-11","year":2019,"month":11,"price":1750.0,"mean":1729.05,"min":184.0,"max":3750.0,"observations":525,"markets":349,"states":15},{"crop":"Maize","date":"2019-12","year":2019,"month":12,"price":1785.0,"mean":1780.08,"min":1300.0,"max":3348.0,"observations":169,"markets":114,"states":12},{"crop":"Maize","date":"2020-01","year":2020,"month":1,"price":1871.0,"mean":1885.5,"min":850.0,"max":5140.0,"observations":445,"markets":296,"states":10},{"crop":"Maize","date":"2020-02","year":2020,"month":2,"price":1790.0,"mean":1784.73,"min":1200.0,"max":2600.0,"observations":273,"markets":187,"states":10},{"crop":"Maize","date":"2020-03","year":2020,"month":3,"price":1630.0,"mean":1671.82,"min":1300.0,"max":2200.0,"observations":73,"markets":52,"states":9},{"crop":"Maize","date":"2020-04","year":2020,"month":4,"price":1536.0,"mean":1589.02,"min":1000.0,"max":2500.0,"observations":114,"markets":87,"states":7},{"crop":"Maize","date":"2020-05","year":2020,"month":5,"price":1367.5,"mean":1460.98,"min":840.0,"max":3130.0,"observations":190,"markets":158,"states":9},{"crop":"Maize","date":"2020-06","year":2020,"month":6,"price":1250.0,"mean":1354.82,"min":850.0,"max":4150.0,"observations":362,"markets":236,"states":13},{"crop":"Maize","date":"2020-07","year":2020,"month":7,"price":1300.0,"mean":1337.29,"min":500.0,"max":2300.0,"observations":287,"markets":201,"states":13},{"crop":"Maize","date":"2020-08","year":2020,"month":8,"price":1249.0,"mean":1328.8,"min":950.0,"max":2010.0,"observations":71,"markets":55,"states":7},{"crop":"Maize","date":"2020-09","year":2020,"month":9,"price":1200.0,"mean":1254.8,"min":610.0,"max":3785.0,"observations":245,"markets":180,"states":11},{"crop":"Maize","date":"2020-10","year":2020,"month":10,"price":1201.0,"mean":1250.44,"min":800.0,"max":2100.0,"observations":283,"markets":195,"states":12},{"crop":"Maize","date":"2020-11","year":2020,"month":11,"price":1360.0,"mean":1374.23,"min":900.0,"max":1900.0,"observations":77,"markets":51,"states":9},{"crop":"Maize","date":"2020-12","year":2020,"month":12,"price":1351.0,"mean":1437.23,"min":971.0,"max":3900.0,"observations":289,"markets":223,"states":11},{"crop":"Maize","date":"2021-01","year":2021,"month":1,"price":1301.5,"mean":1422.83,"min":970.0,"max":4600.0,"observations":338,"markets":254,"states":11},{"crop":"Maize","date":"2021-02","year":2021,"month":2,"price":1289.0,"mean":1349.92,"min":950.0,"max":6000.0,"observations":381,"markets":267,"states":12},{"crop":"Maize","date":"2021-03","year":2021,"month":3,"price":1357.5,"mean":1420.67,"min":345.0,"max":6950.0,"observations":340,"markets":244,"states":11},{"crop":"Maize","date":"2021-04","year":2021,"month":4,"price":1385.0,"mean":1444.0,"min":900.0,"max":4500.0,"observations":231,"markets":178,"states":11},{"crop":"Maize","date":"2021-05","year":2021,"month":5,"price":1470.0,"mean":1491.12,"min":1150.0,"max":1900.0,"observations":59,"markets":51,"states":10},{"crop":"Maize","date":"2021-06","year":2021,"month":6,"price":1500.0,"mean":1508.86,"min":750.0,"max":2200.0,"observations":237,"markets":171,"states":12},{"crop":"Maize","date":"2021-07","year":2021,"month":7,"price":1625.0,"mean":1632.52,"min":500.0,"max":2100.0,"observations":254,"markets":183,"states":13},{"crop":"Maize","date":"2021-08","year":2021,"month":8,"price":1650.0,"mean":1653.28,"min":1310.0,"max":2100.0,"observations":46,"markets":32,"states":7},{"crop":"Maize","date":"2021-09","year":2021,"month":9,"price":1700.0,"mean":1714.36,"min":1001.0,"max":3700.0,"observations":243,"markets":179,"states":11},{"crop":"Maize","date":"2021-10","year":2021,"month":10,"price":1630.0,"mean":1597.34,"min":701.0,"max":3600.0,"observations":307,"markets":221,"states":12},{"crop":"Maize","date":"2021-11","year":2021,"month":11,"price":1500.0,"mean":1547.22,"min":1060.0,"max":3800.0,"observations":418,"markets":302,"states":12},{"crop":"Maize","date":"2021-12","year":2021,"month":12,"price":1585.0,"mean":1611.25,"min":900.0,"max":2453.0,"observations":473,"markets":320,"states":12},{"crop":"Maize","date":"2022-01","year":2022,"month":1,"price":1628.0,"mean":1645.85,"min":150.0,"max":2850.0,"observations":341,"markets":233,"states":11},{"crop":"Maize","date":"2022-02","year":2022,"month":2,"price":1820.0,"mean":1825.11,"min":150.0,"max":6200.0,"observations":410,"markets":266,"states":12},{"crop":"Maize","date":"2022-03","year":2022,"month":3,"price":1910.0,"mean":1934.75,"min":210.0,"max":3300.0,"observations":283,"markets":225,"states":14},{"crop":"Maize","date":"2022-04","year":2022,"month":4,"price":2000.0,"mean":2002.7,"min":220.0,"max":2800.0,"observations":317,"markets":236,"states":12},{"crop":"Maize","date":"2022-05","year":2022,"month":5,"price":1950.0,"mean":1948.69,"min":1401.0,"max":2410.0,"observations":80,"markets":57,"states":9},{"crop":"Maize","date":"2022-06","year":2022,"month":6,"price":2000.0,"mean":2000.89,"min":200.0,"max":4225.0,"observations":375,"markets":254,"states":14},{"crop":"Maize","date":"2022-07","year":2022,"month":7,"price":2022.5,"mean":2051.35,"min":210.0,"max":2588.0,"observations":268,"markets":195,"states":15},{"crop":"Maize","date":"2022-08","year":2022,"month":8,"price":2100.0,"mean":2138.33,"min":190.0,"max":7000.0,"observations":319,"markets":213,"states":14},{"crop":"Maize","date":"2022-09","year":2022,"month":9,"price":2200.0,"mean":2168.71,"min":220.0,"max":3425.0,"observations":288,"markets":181,"states":15},{"crop":"Maize","date":"2022-10","year":2022,"month":10,"price":2000.0,"mean":1989.33,"min":1300.0,"max":4500.0,"observations":269,"markets":182,"states":11},{"crop":"Maize","date":"2022-11","year":2022,"month":11,"price":1962.0,"mean":1940.1,"min":1400.0,"max":3400.0,"observations":458,"markets":320,"states":13},{"crop":"Maize","date":"2022-12","year":2022,"month":12,"price":2030.0,"mean":2068.42,"min":190.0,"max":3400.0,"observations":548,"markets":341,"states":12},{"crop":"Maize","date":"2023-01","year":2023,"month":1,"price":2025.0,"mean":2063.45,"min":1400.0,"max":2700.0,"observations":141,"markets":92,"states":11},{"crop":"Maize","date":"2023-02","year":2023,"month":2,"price":2091.5,"mean":2113.84,"min":213.0,"max":7502.0,"observations":458,"markets":289,"states":13},{"crop":"Maize","date":"2023-03","year":2023,"month":3,"price":2060.0,"mean":2095.72,"min":1400.0,"max":6050.0,"observations":295,"markets":232,"states":13},{"crop":"Maize","date":"2023-04","year":2023,"month":4,"price":2050.0,"mean":2082.12,"min":1350.0,"max":3200.0,"observations":283,"markets":195,"states":11},{"crop":"Maize","date":"2023-05","year":2023,"month":5,"price":1899.0,"mean":1908.93,"min":180.0,"max":3252.0,"observations":321,"markets":234,"states":11},{"crop":"Maize","date":"2023-06","year":2023,"month":6,"price":1800.0,"mean":1849.93,"min":168.6,"max":3500.0,"observations":442,"markets":277,"states":15},{"crop":"Maize","date":"2023-07","year":2023,"month":7,"price":1950.0,"mean":1934.31,"min":177.5,"max":6250.0,"observations":303,"markets":203,"states":14},{"crop":"Maize","date":"2023-08","year":2023,"month":8,"price":2000.0,"mean":2052.71,"min":190.0,"max":10400.0,"observations":376,"markets":242,"states":17},{"crop":"Maize","date":"2023-09","year":2023,"month":9,"price":2000.0,"mean":2057.58,"min":180.0,"max":9000.0,"observations":310,"markets":197,"states":15},{"crop":"Maize","date":"2023-10","year":2023,"month":10,"price":1955.0,"mean":1925.71,"min":1400.0,"max":2475.0,"observations":112,"markets":79,"states":8},{"crop":"Maize","date":"2023-11","year":2023,"month":11,"price":2050.0,"mean":2056.24,"min":195.0,"max":4600.0,"observations":568,"markets":372,"states":14},{"crop":"Maize","date":"2023-12","year":2023,"month":12,"price":2090.0,"mean":2094.99,"min":200.0,"max":5201.0,"observations":549,"markets":353,"states":12},{"crop":"Maize","date":"2024-01","year":2024,"month":1,"price":2100.0,"mean":2112.46,"min":1570.0,"max":3400.0,"observations":362,"markets":233,"states":12},{"crop":"Maize","date":"2024-02","year":2024,"month":2,"price":2150.0,"mean":2164.94,"min":1500.0,"max":3750.0,"observations":384,"markets":234,"states":13},{"crop":"Maize","date":"2024-03","year":2024,"month":3,"price":2176.0,"mean":2171.02,"min":1500.0,"max":3750.0,"observations":323,"markets":228,"states":13},{"crop":"Maize","date":"2024-04","year":2024,"month":4,"price":2130.0,"mean":2131.63,"min":1575.0,"max":3750.0,"observations":314,"markets":214,"states":12},{"crop":"Maize","date":"2024-05","year":2024,"month":5,"price":2125.0,"mean":2137.69,"min":1780.0,"max":2850.0,"observations":328,"markets":219,"states":13},{"crop":"Maize","date":"2024-06","year":2024,"month":6,"price":2160.0,"mean":2172.19,"min":1580.0,"max":2850.0,"observations":331,"markets":219,"states":13},{"crop":"Maize","date":"2024-07","year":2024,"month":7,"price":2200.0,"mean":2243.4,"min":1471.0,"max":4000.0,"observations":416,"markets":274,"states":15},{"crop":"Maize","date":"2024-08","year":2024,"month":8,"price":2351.0,"mean":2442.73,"min":1425.0,"max":4000.0,"observations":418,"markets":253,"states":16},{"crop":"Maize","date":"2024-09","year":2024,"month":9,"price":2450.0,"mean":2591.04,"min":1800.0,"max":4000.0,"observations":150,"markets":93,"states":9},{"crop":"Maize","date":"2024-10","year":2024,"month":10,"price":2271.0,"mean":2250.42,"min":1340.0,"max":4200.0,"observations":559,"markets":330,"states":12},{"crop":"Maize","date":"2024-11","year":2024,"month":11,"price":2201.0,"mean":2254.51,"min":1500.0,"max":4000.0,"observations":596,"markets":401,"states":13},{"crop":"Maize","date":"2024-12","year":2024,"month":12,"price":2230.0,"mean":2334.55,"min":1700.0,"max":4000.0,"observations":189,"markets":149,"states":10},{"crop":"Maize","date":"2025-01","year":2025,"month":1,"price":2300.0,"mean":2384.19,"min":1401.0,"max":4000.0,"observations":544,"markets":334,"states":12},{"crop":"Maize","date":"2025-02","year":2025,"month":2,"price":2289.0,"mean":2366.84,"min":1580.0,"max":4000.0,"observations":477,"markets":287,"states":11},{"crop":"Maize","date":"2025-03","year":2025,"month":3,"price":2263.0,"mean":2361.56,"min":1505.0,"max":4000.0,"observations":466,"markets":268,"states":12},{"crop":"Maize","date":"2025-04","year":2025,"month":4,"price":2200.0,"mean":2273.58,"min":1400.0,"max":4000.0,"observations":465,"markets":267,"states":12},{"crop":"Maize","date":"2025-05","year":2025,"month":5,"price":2120.0,"mean":2216.63,"min":1400.0,"max":4000.0,"observations":470,"markets":273,"states":13},{"crop":"Maize","date":"2025-06","year":2025,"month":6,"price":2100.0,"mean":2311.13,"min":1600.0,"max":4000.0,"observations":237,"markets":132,"states":10},{"crop":"Maize","date":"2025-07","year":2025,"month":7,"price":2150.0,"mean":2240.82,"min":1300.0,"max":4000.0,"observations":495,"markets":285,"states":14},{"crop":"Maize","date":"2025-08","year":2025,"month":8,"price":2195.0,"mean":2226.64,"min":1500.0,"max":4000.0,"observations":354,"markets":240,"states":12},{"crop":"Maize","date":"2025-09","year":2025,"month":9,"price":2201.0,"mean":2273.42,"min":1281.0,"max":4000.0,"observations":420,"markets":245,"states":15},{"crop":"Maize","date":"2025-10","year":2025,"month":10,"price":2000.0,"mean":1997.1,"min":1135.0,"max":4000.0,"observations":389,"markets":279,"states":11},{"crop":"Maize","date":"2025-11","year":2025,"month":11,"price":1750.0,"mean":1903.77,"min":1120.0,"max":4150.0,"observations":628,"markets":348,"states":9},{"crop":"Maize","date":"2025-12","year":2025,"month":12,"price":1635.0,"mean":1804.71,"min":1200.0,"max":4750.0,"observations":899,"markets":399,"states":12},{"crop":"Onion","date":"2015-01","year":2015,"month":1,"price":1730.0,"mean":1772.99,"min":200.0,"max":4825.0,"observations":975,"markets":540,"states":22},{"crop":"Onion","date":"2015-02","year":2015,"month":2,"price":1550.0,"mean":1591.2,"min":400.0,"max":4000.0,"observations":478,"markets":286,"states":20},{"crop":"Onion","date":"2015-03","year":2015,"month":3,"price":1662.5,"mean":1696.3,"min":400.0,"max":4000.0,"observations":460,"markets":287,"states":20},{"crop":"Onion","date":"2015-04","year":2015,"month":4,"price":1469.0,"mean":1462.56,"min":18.0,"max":3000.0,"observations":894,"markets":527,"states":23},{"crop":"Onion","date":"2015-05","year":2015,"month":5,"price":1400.0,"mean":1452.46,"min":20.0,"max":4800.0,"observations":836,"markets":517,"states":25},{"crop":"Onion","date":"2015-06","year":2015,"month":6,"price":1500.0,"mean":1669.02,"min":24.0,"max":5900.0,"observations":968,"markets":545,"states":25},{"crop":"Onion","date":"2015-07","year":2015,"month":7,"price":1750.0,"mean":1925.34,"min":24.0,"max":6725.0,"observations":955,"markets":550,"states":25},{"crop":"Onion","date":"2015-08","year":2015,"month":8,"price":2900.0,"mean":2930.08,"min":35.0,"max":6000.0,"observations":777,"markets":468,"states":25},{"crop":"Onion","date":"2015-09","year":2015,"month":9,"price":4440.0,"mean":4323.52,"min":30.0,"max":8000.0,"observations":877,"markets":492,"states":25},{"crop":"Onion","date":"2015-10","year":2015,"month":10,"price":3900.0,"mean":3784.44,"min":30.0,"max":7000.0,"observations":901,"markets":491,"states":25},{"crop":"Onion","date":"2015-11","year":2015,"month":11,"price":2900.0,"mean":2891.38,"min":24.0,"max":6000.0,"observations":408,"markets":260,"states":20},{"crop":"Onion","date":"2015-12","year":2015,"month":12,"price":1900.0,"mean":2110.35,"min":350.0,"max":8000.0,"observations":931,"markets":511,"states":25},{"crop":"Onion","date":"2016-01","year":2016,"month":1,"price":1420.0,"mean":1601.98,"min":350.0,"max":5800.0,"observations":878,"markets":507,"states":24},{"crop":"Onion","date":"2016-02","year":2016,"month":2,"price":1300.0,"mean":1368.8,"min":250.0,"max":3700.0,"observations":826,"markets":500,"states":21},{"crop":"Onion","date":"2016-03","year":2016,"month":3,"price":1100.0,"mean":1173.98,"min":275.0,"max":4000.0,"observations":861,"markets":509,"states":24},{"crop":"Onion","date":"2016-04","year":2016,"month":4,"price":1000.0,"mean":1090.92,"min":175.0,"max":6325.0,"observations":684,"markets":456,"states":23},{"crop":"Onion","date":"2016-05","year":2016,"month":5,"price":900.0,"mean":968.53,"min":150.0,"max":3800.0,"observations":460,"markets":299,"states":21},{"crop":"Onion","date":"2016-06","year":2016,"month":6,"price":815.0,"mean":1021.3,"min":150.0,"max":5000.0,"observations":987,"markets":552,"states":24},{"crop":"Onion","date":"2016-07","year":2016,"month":7,"price":900.0,"mean":1107.5,"min":170.0,"max":8000.0,"observations":877,"markets":510,"states":24},{"crop":"Onion","date":"2016-08","year":2016,"month":8,"price":1000.0,"mean":1165.79,"min":7.0,"max":4400.0,"observations":852,"markets":484,"states":23},{"crop":"Onion","date":"2016-09","year":2016,"month":9,"price":1000.0,"mean":1106.29,"min":190.0,"max":4000.0,"observations":801,"markets":484,"states":25},{"crop":"Onion","date":"2016-10","year":2016,"month":10,"price":817.5,"mean":960.3,"min":125.0,"max":3800.0,"observations":676,"markets":419,"states":23},{"crop":"Onion","date":"2016-11","year":2016,"month":11,"price":1000.0,"mean":1124.84,"min":150.0,"max":4500.0,"observations":755,"markets":463,"states":25},{"crop":"Onion","date":"2016-12","year":2016,"month":12,"price":1000.0,"mean":1152.81,"min":150.0,"max":6000.0,"observations":836,"markets":488,"states":24},{"crop":"Onion","date":"2017-01","year":2017,"month":1,"price":930.0,"mean":1012.24,"min":250.0,"max":3600.0,"observations":439,"markets":274,"states":23},{"crop":"Onion","date":"2017-02","year":2017,"month":2,"price":900.0,"mean":1018.64,"min":81.0,"max":4200.0,"observations":851,"markets":482,"states":24},{"crop":"Onion","date":"2017-03","year":2017,"month":3,"price":900.0,"mean":1055.14,"min":175.0,"max":5750.0,"observations":966,"markets":514,"states":24},{"crop":"Onion","date":"2017-04","year":2017,"month":4,"price":870.0,"mean":1053.13,"min":10.0,"max":8500.0,"observations":776,"markets":460,"states":23},{"crop":"Onion","date":"2017-05","year":2017,"month":5,"price":850.0,"mean":1013.64,"min":150.0,"max":9200.0,"observations":786,"markets":471,"states":23},{"crop":"Onion","date":"2017-06","year":2017,"month":6,"price":800.0,"mean":1211.45,"min":100.0,"max":11500.0,"observations":846,"markets":493,"states":26},{"crop":"Onion","date":"2017-07","year":2017,"month":7,"price":835.0,"mean":1186.76,"min":130.0,"max":12627.0,"observations":805,"markets":504,"states":23},{"crop":"Onion","date":"2017-08","year":2017,"month":8,"price":1600.0,"mean":1809.15,"min":250.0,"max":12000.0,"observations":1020,"markets":584,"states":25},{"crop":"Onion","date":"2017-09","year":2017,"month":9,"price":2000.0,"mean":2101.6,"min":140.0,"max":10100.0,"observations":1006,"markets":571,"states":25},{"crop":"Onion","date":"2017-10","year":2017,"month":10,"price":1800.0,"mean":1900.77,"min":250.0,"max":8500.0,"observations":531,"markets":332,"states":22},{"crop":"Onion","date":"2017-11","year":2017,"month":11,"price":2750.0,"mean":2785.79,"min":200.0,"max":12000.0,"observations":881,"markets":528,"states":26},{"crop":"Onion","date":"2017-12","year":2017,"month":12,"price":3400.0,"mean":3460.93,"min":170.0,"max":12000.0,"observations":786,"markets":475,"states":26},{"crop":"Onion","date":"2018-01","year":2018,"month":1,"price":3200.0,"mean":3378.22,"min":400.0,"max":10000.0,"observations":981,"markets":542,"states":24},{"crop":"Onion","date":"2018-02","year":2018,"month":2,"price":2600.0,"mean":2639.64,"min":270.0,"max":8000.0,"observations":1068,"markets":574,"states":26},{"crop":"Onion","date":"2018-03","year":2018,"month":3,"price":1800.0,"mean":1844.22,"min":240.0,"max":6500.0,"observations":973,"markets":560,"states":26},{"crop":"Onion","date":"2018-04","year":2018,"month":4,"price":1100.0,"mean":1206.39,"min":250.0,"max":3200.0,"observations":553,"markets":326,"states":21},{"crop":"Onion","date":"2018-05","year":2018,"month":5,"price":950.0,"mean":1051.14,"min":120.0,"max":4500.0,"observations":954,"markets":573,"states":24},{"crop":"Onion","date":"2018-06","year":2018,"month":6,"price":950.0,"mean":1095.06,"min":12.0,"max":4500.0,"observations":1019,"markets":586,"states":25},{"crop":"Onion","date":"2018-07","year":2018,"month":7,"price":1390.0,"mean":1408.32,"min":400.0,"max":6000.0,"observations":532,"markets":315,"states":21},{"crop":"Onion","date":"2018-08","year":2018,"month":8,"price":1500.0,"mean":1612.56,"min":250.0,"max":7820.0,"observations":1089,"markets":595,"states":26},{"crop":"Onion","date":"2018-09","year":2018,"month":9,"price":1350.0,"mean":1408.08,"min":19.0,"max":6200.0,"observations":929,"markets":535,"states":24},{"crop":"Onion","date":"2018-10","year":2018,"month":10,"price":1280.0,"mean":1373.26,"min":300.0,"max":6500.0,"observations":1013,"markets":598,"states":23},{"crop":"Onion","date":"2018-11","year":2018,"month":11,"price":1600.0,"mean":1695.64,"min":300.0,"max":5500.0,"observations":745,"markets":495,"states":22},{"crop":"Onion","date":"2018-12","year":2018,"month":12,"price":1160.0,"mean":1269.93,"min":200.0,"max":5200.0,"observations":980,"markets":569,"states":23},{"crop":"Onion","date":"2019-01","year":2019,"month":1,"price":950.0,"mean":1043.57,"min":110.0,"max":5275.0,"observations":1055,"markets":591,"states":24},{"crop":"Onion","date":"2019-02","year":2019,"month":2,"price":900.0,"mean":992.41,"min":100.0,"max":4825.0,"observations":1072,"markets":602,"states":26},{"crop":"Onion","date":"2019-03","year":2019,"month":3,"price":850.0,"mean":954.56,"min":175.0,"max":5300.0,"observations":1061,"markets":605,"states":26},{"crop":"Onion","date":"2019-04","year":2019,"month":4,"price":850.0,"mean":968.12,"min":150.0,"max":3800.0,"observations":1135,"markets":628,"states":22},{"crop":"Onion","date":"2019-05","year":2019,"month":5,"price":900.0,"mean":1039.6,"min":150.0,"max":5000.0,"observations":986,"markets":600,"states":25},{"crop":"Onion","date":"2019-06","year":2019,"month":6,"price":1000.0,"mean":1187.1,"min":300.0,"max":6000.0,"observations":956,"markets":576,"states":22},{"crop":"Onion","date":"2019-07","year":2019,"month":7,"price":1275.0,"mean":1491.08,"min":300.0,"max":7200.0,"observations":1100,"markets":612,"states":21},{"crop":"Onion","date":"2019-08","year":2019,"month":8,"price":1500.0,"mean":1644.28,"min":200.0,"max":6827.0,"observations":1038,"markets":603,"states":24},{"crop":"Onion","date":"2019-09","year":2019,"month":9,"price":2300.0,"mean":2356.79,"min":500.0,"max":6000.0,"observations":649,"markets":381,"states":20},{"crop":"Onion","date":"2019-10","year":2019,"month":10,"price":3600.0,"mean":3639.31,"min":700.0,"max":7900.0,"observations":854,"markets":537,"states":25},{"crop":"Onion","date":"2019-11","year":2019,"month":11,"price":3800.0,"mean":3894.46,"min":650.0,"max":8720.0,"observations":886,"markets":553,"states":24},{"crop":"Onion","date":"2019-12","year":2019,"month":12,"price":5000.0,"mean":5244.52,"min":800.0,"max":12800.0,"observations":142,"markets":103,"states":14},{"crop":"Onion","date":"2020-01","year":2020,"month":1,"price":5350.0,"mean":5567.76,"min":600.0,"max":15000.0,"observations":783,"markets":505,"states":18},{"crop":"Onion","date":"2020-02","year":2020,"month":2,"price":3138.5,"mean":3216.6,"min":700.0,"max":11100.0,"observations":764,"markets":484,"states":19},{"crop":"Onion","date":"2020-03","year":2020,"month":3,"price":2250.0,"mean":2281.62,"min":650.0,"max":8600.0,"observations":492,"markets":325,"states":15},{"crop":"Onion","date":"2020-04","year":2020,"month":4,"price":2000.0,"mean":2116.58,"min":525.0,"max":12000.0,"observations":700,"markets":461,"states":17},{"crop":"Onion","date":"2020-05","year":2020,"month":5,"price":1200.0,"mean":1335.14,"min":300.0,"max":6500.0,"observations":725,"markets":470,"states":18},{"crop":"Onion","date":"2020-06","year":2020,"month":6,"price":920.0,"mean":1154.61,"min":100.0,"max":5600.0,"observations":871,"markets":537,"states":20},{"crop":"Onion","date":"2020-07","year":2020,"month":7,"price":1200.0,"mean":1335.67,"min":300.0,"max":7900.0,"observations":813,"markets":507,"states":19},{"crop":"Onion","date":"2020-08","year":2020,"month":8,"price":1170.0,"mean":1314.0,"min":400.0,"max":7800.0,"observations":537,"markets":386,"states":18},{"crop":"Onion","date":"2020-09","year":2020,"month":9,"price":1555.0,"mean":1743.21,"min":600.0,"max":6800.0,"observations":782,"markets":515,"states":20},{"crop":"Onion","date":"2020-10","year":2020,"month":10,"price":3050.0,"mean":3205.02,"min":300.0,"max":40000.0,"observations":806,"markets":492,"states":20},{"crop":"Onion","date":"2020-11","year":2020,"month":11,"price":4000.0,"mean":4453.02,"min":1100.0,"max":11250.0,"observations":457,"markets":294,"states":18},{"crop":"Onion","date":"2020-12","year":2020,"month":12,"price":3400.0,"mean":3613.94,"min":850.0,"max":9600.0,"observations":717,"markets":469,"states":20},{"crop":"Onion","date":"2021-01","year":2021,"month":1,"price":2500.0,"mean":2683.27,"min":600.0,"max":8625.0,"observations":846,"markets":535,"states":20},{"crop":"Onion","date":"2021-02","year":2021,"month":2,"price":2950.0,"mean":3149.83,"min":750.0,"max":12000.0,"observations":896,"markets":564,"states":21},{"crop":"Onion","date":"2021-03","year":2021,"month":3,"price":2800.0,"mean":2902.49,"min":525.0,"max":11800.0,"observations":983,"markets":580,"states":21},{"crop":"Onion","date":"2021-04","year":2021,"month":4,"price":1450.0,"mean":1557.8,"min":400.0,"max":5800.0,"observations":860,"markets":559,"states":21},{"crop":"Onion","date":"2021-05","year":2021,"month":5,"price":1450.0,"mean":1609.41,"min":600.0,"max":7300.0,"observations":568,"markets":401,"states":21},{"crop":"Onion","date":"2021-06","year":2021,"month":6,"price":1650.0,"mean":1887.61,"min":350.0,"max":7800.0,"observations":892,"markets":545,"states":21},{"crop":"Onion","date":"2021-07","year":2021,"month":7,"price":2090.0,"mean":2203.03,"min":600.0,"max":7800.0,"observations":918,"markets":562,"states":21},{"crop":"Onion","date":"2021-08","year":2021,"month":8,"price":2050.0,"mean":2118.22,"min":645.0,"max":7800.0,"observations":419,"markets":276,"states":18},{"crop":"Onion","date":"2021-09","year":2021,"month":9,"price":1990.0,"mean":2016.0,"min":400.0,"max":7600.0,"observations":927,"markets":571,"states":21},{"crop":"Onion","date":"2021-10","year":2021,"month":10,"price":2350.0,"mean":2488.07,"min":700.0,"max":7600.0,"observations":891,"markets":552,"states":19},{"crop":"Onion","date":"2021-11","year":2021,"month":11,"price":2710.0,"mean":2830.62,"min":900.0,"max":6700.0,"observations":853,"markets":516,"states":20},{"crop":"Onion","date":"2021-12","year":2021,"month":12,"price":2100.0,"mean":2290.1,"min":600.0,"max":6000.0,"observations":925,"markets":554,"states":21},{"crop":"Onion","date":"2022-01","year":2022,"month":1,"price":2000.0,"mean":2293.04,"min":541.0,"max":7800.0,"observations":989,"markets":579,"states":21},{"crop":"Onion","date":"2022-02","year":2022,"month":2,"price":2200.0,"mean":2502.98,"min":500.0,"max":45000.0,"observations":1185,"markets":668,"states":25},{"crop":"Onion","date":"2022-03","year":2022,"month":3,"price":2350.0,"mean":2353.28,"min":500.0,"max":7000.0,"observations":1137,"markets":667,"states":23},{"crop":"Onion","date":"2022-04","year":2022,"month":4,"price":1500.0,"mean":1624.18,"min":355.0,"max":32000.0,"observations":1177,"markets":678,"states":23},{"crop":"Onion","date":"2022-05","year":2022,"month":5,"price":1200.0,"mean":1299.65,"min":300.0,"max":4700.0,"observations":561,"markets":373,"states":21},{"crop":"Onion","date":"2022-06","year":2022,"month":6,"price":1200.0,"mean":1384.49,"min":200.0,"max":45000.0,"observations":1142,"markets":661,"states":22},{"crop":"Onion","date":"2022-07","year":2022,"month":7,"price":1400.0,"mean":1649.66,"min":145.0,"max":35000.0,"observations":982,"markets":616,"states":21},{"crop":"Onion","date":"2022-08","year":2022,"month":8,"price":1500.0,"mean":1588.71,"min":165.0,"max":5200.0,"observations":1133,"markets":647,"states":21},{"crop":"Onion","date":"2022-09","year":2022,"month":9,"price":1470.0,"mean":1551.01,"min":209.0,"max":6800.0,"observations":1063,"markets":643,"states":23},{"crop":"Onion","date":"2022-10","year":2022,"month":10,"price":1450.0,"mean":1663.37,"min":200.0,"max":7800.0,"observations":993,"markets":600,"states":22},{"crop":"Onion","date":"2022-11","year":2022,"month":11,"price":2000.0,"mean":2230.53,"min":520.0,"max":9800.0,"observations":562,"markets":539,"states":22},{"crop":"Onion","date":"2022-12","year":2022,"month":12,"price":1620.0,"mean":2083.5,"min":400.0,"max":72000.0,"observations":527,"markets":496,"states":23},{"crop":"Onion","date":"2023-01","year":2023,"month":1,"price":1515.0,"mean":1812.41,"min":500.0,"max":11800.0,"observations":300,"markets":295,"states":20},{"crop":"Onion","date":"2023-02","year":2023,"month":2,"price":1600.0,"mean":1805.68,"min":200.0,"max":9140.0,"observations":590,"markets":558,"states":23},{"crop":"Onion","date":"2023-03","year":2023,"month":3,"price":1250.0,"mean":1361.08,"min":200.0,"max":9040.0,"observations":586,"markets":552,"states":23},{"crop":"Onion","date":"2023-04","year":2023,"month":4,"price":1230.0,"mean":1353.43,"min":300.0,"max":5800.0,"observations":461,"markets":435,"states":21},{"crop":"Onion","date":"2023-05","year":2023,"month":5,"price":1140.0,"mean":1244.07,"min":200.0,"max":5800.0,"observations":491,"markets":477,"states":20},{"crop":"Onion","date":"2023-06","year":2023,"month":6,"price":1140.0,"mean":1450.03,"min":140.0,"max":10600.0,"observations":590,"markets":560,"states":23},{"crop":"Onion","date":"2023-07","year":2023,"month":7,"price":1300.0,"mean":1673.18,"min":300.0,"max":12540.0,"observations":529,"markets":503,"states":20},{"crop":"Onion","date":"2023-08","year":2023,"month":8,"price":1550.0,"mean":1830.74,"min":350.0,"max":13000.0,"observations":601,"markets":578,"states":23},{"crop":"Onion","date":"2023-09","year":2023,"month":9,"price":2155.0,"mean":2352.33,"min":600.0,"max":11500.0,"observations":598,"markets":574,"states":24},{"crop":"Onion","date":"2023-10","year":2023,"month":10,"price":2060.0,"mean":2332.1,"min":300.0,"max":7400.0,"observations":246,"markets":238,"states":17},{"crop":"Onion","date":"2023-11","year":2023,"month":11,"price":4100.0,"mean":4421.55,"min":900.0,"max":37240.0,"observations":515,"markets":494,"states":22},{"crop":"Onion","date":"2023-12","year":2023,"month":12,"price":3800.0,"mean":4056.31,"min":900.0,"max":25540.0,"observations":508,"markets":483,"states":21},{"crop":"Onion","date":"2024-01","year":2024,"month":1,"price":2000.0,"mean":2256.15,"min":200.0,"max":19840.0,"observations":505,"markets":473,"states":19},{"crop":"Onion","date":"2024-02","year":2024,"month":2,"price":1800.0,"mean":1896.79,"min":100.0,"max":14340.0,"observations":574,"markets":542,"states":24},{"crop":"Onion","date":"2024-03","year":2024,"month":3,"price":1765.0,"mean":1994.21,"min":15.0,"max":21000.0,"observations":567,"markets":533,"states":25},{"crop":"Onion","date":"2024-04","year":2024,"month":4,"price":1800.0,"mean":1999.41,"min":500.0,"max":19540.0,"observations":403,"markets":381,"states":19},{"crop":"Onion","date":"2024-05","year":2024,"month":5,"price":1700.0,"mean":1829.8,"min":21.0,"max":14700.0,"observations":498,"markets":474,"states":22},{"crop":"Onion","date":"2024-06","year":2024,"month":6,"price":1688.5,"mean":2003.03,"min":320.0,"max":16940.0,"observations":532,"markets":497,"states":21},{"crop":"Onion","date":"2024-07","year":2024,"month":7,"price":2700.0,"mean":2657.8,"min":30.0,"max":26040.0,"observations":673,"markets":635,"states":24},{"crop":"Onion","date":"2024-08","year":2024,"month":8,"price":3200.0,"mean":3415.07,"min":350.0,"max":22840.0,"observations":769,"markets":735,"states":24},{"crop":"Onion","date":"2024-09","year":2024,"month":9,"price":4200.0,"mean":4391.02,"min":900.0,"max":7000.0,"observations":457,"markets":453,"states":21},{"crop":"Onion","date":"2024-10","year":2024,"month":10,"price":4500.0,"mean":4643.75,"min":250.0,"max":31040.0,"observations":717,"markets":687,"states":24},{"crop":"Onion","date":"2024-11","year":2024,"month":11,"price":4800.0,"mean":4944.56,"min":1200.0,"max":33040.0,"observations":544,"markets":524,"states":21},{"crop":"Onion","date":"2024-12","year":2024,"month":12,"price":3900.0,"mean":3992.07,"min":1445.0,"max":8000.0,"observations":240,"markets":236,"states":19},{"crop":"Onion","date":"2025-01","year":2025,"month":1,"price":2800.0,"mean":3272.12,"min":300.0,"max":8000.0,"observations":554,"markets":536,"states":18},{"crop":"Onion","date":"2025-02","year":2025,"month":2,"price":2500.0,"mean":3055.84,"min":300.0,"max":52040.0,"observations":724,"markets":672,"states":22},{"crop":"Onion","date":"2025-03","year":2025,"month":3,"price":2680.0,"mean":3078.9,"min":600.0,"max":52040.0,"observations":763,"markets":685,"states":23},{"crop":"Onion","date":"2025-04","year":2025,"month":4,"price":2100.0,"mean":2377.11,"min":600.0,"max":40040.0,"observations":705,"markets":647,"states":21},{"crop":"Onion","date":"2025-05","year":2025,"month":5,"price":1550.0,"mean":1860.63,"min":150.0,"max":6400.0,"observations":695,"markets":630,"states":21},{"crop":"Onion","date":"2025-06","year":2025,"month":6,"price":1500.0,"mean":1963.06,"min":150.0,"max":7800.0,"observations":499,"markets":467,"states":19},{"crop":"Onion","date":"2025-07","year":2025,"month":7,"price":1650.0,"mean":2065.04,"min":100.0,"max":9000.0,"observations":766,"markets":688,"states":23},{"crop":"Onion","date":"2025-08","year":2025,"month":8,"price":1700.0,"mean":1982.63,"min":300.0,"max":7000.0,"observations":767,"markets":710,"states":24},{"crop":"Onion","date":"2025-09","year":2025,"month":9,"price":1800.0,"mean":2029.17,"min":200.0,"max":7800.0,"observations":811,"markets":729,"states":23},{"crop":"Onion","date":"2025-10","year":2025,"month":10,"price":1500.0,"mean":1698.45,"min":271.0,"max":6000.0,"observations":400,"markets":366,"states":20},{"crop":"Onion","date":"2025-11","year":2025,"month":11,"price":1600.0,"mean":1967.41,"min":100.0,"max":7700.0,"observations":759,"markets":689,"states":21},{"crop":"Onion","date":"2025-12","year":2025,"month":12,"price":1600.0,"mean":1964.9,"min":200.0,"max":7600.0,"observations":633,"markets":593,"states":22},{"crop":"Potato","date":"2015-01","year":2015,"month":1,"price":800.0,"mean":1063.49,"min":65.0,"max":4000.0,"observations":474,"markets":461,"states":21},{"crop":"Potato","date":"2015-02","year":2015,"month":2,"price":625.0,"mean":749.64,"min":313.0,"max":3000.0,"observations":276,"markets":274,"states":21},{"crop":"Potato","date":"2015-03","year":2015,"month":3,"price":570.0,"mean":658.1,"min":200.0,"max":3000.0,"observations":257,"markets":256,"states":21},{"crop":"Potato","date":"2015-04","year":2015,"month":4,"price":550.0,"mean":674.19,"min":120.0,"max":3000.0,"observations":456,"markets":445,"states":24},{"crop":"Potato","date":"2015-05","year":2015,"month":5,"price":500.0,"mean":568.14,"min":16.0,"max":2950.0,"observations":367,"markets":364,"states":22},{"crop":"Potato","date":"2015-06","year":2015,"month":6,"price":600.0,"mean":724.08,"min":30.0,"max":3200.0,"observations":453,"markets":442,"states":24},{"crop":"Potato","date":"2015-07","year":2015,"month":7,"price":685.0,"mean":812.19,"min":13.0,"max":3000.0,"observations":476,"markets":470,"states":26},{"crop":"Potato","date":"2015-08","year":2015,"month":8,"price":722.5,"mean":882.34,"min":14.0,"max":3500.0,"observations":412,"markets":404,"states":23},{"crop":"Potato","date":"2015-09","year":2015,"month":9,"price":700.0,"mean":844.78,"min":14.0,"max":3000.0,"observations":445,"markets":438,"states":27},{"crop":"Potato","date":"2015-10","year":2015,"month":10,"price":700.0,"mean":875.81,"min":100.0,"max":3500.0,"observations":444,"markets":437,"states":26},{"crop":"Potato","date":"2015-11","year":2015,"month":11,"price":800.0,"mean":842.84,"min":16.0,"max":3000.0,"observations":257,"markets":257,"states":21},{"crop":"Potato","date":"2015-12","year":2015,"month":12,"price":860.0,"mean":995.52,"min":190.0,"max":4000.0,"observations":450,"markets":446,"states":26},{"crop":"Potato","date":"2016-01","year":2016,"month":1,"price":700.0,"mean":854.71,"min":250.0,"max":3728.0,"observations":448,"markets":441,"states":25},{"crop":"Potato","date":"2016-02","year":2016,"month":2,"price":600.0,"mean":747.81,"min":175.0,"max":3000.0,"observations":392,"markets":384,"states":21},{"crop":"Potato","date":"2016-03","year":2016,"month":3,"price":800.0,"mean":895.26,"min":250.0,"max":5850.0,"observations":380,"markets":366,"states":25},{"crop":"Potato","date":"2016-04","year":2016,"month":4,"price":925.0,"mean":1035.17,"min":225.0,"max":6500.0,"observations":378,"markets":370,"states":26},{"crop":"Potato","date":"2016-05","year":2016,"month":5,"price":1025.0,"mean":1128.21,"min":250.0,"max":2800.0,"observations":225,"markets":225,"states":21},{"crop":"Potato","date":"2016-06","year":2016,"month":6,"price":1285.0,"mean":1375.48,"min":120.0,"max":5750.0,"observations":469,"markets":461,"states":25},{"crop":"Potato","date":"2016-07","year":2016,"month":7,"price":1400.0,"mean":1471.96,"min":95.0,"max":6600.0,"observations":444,"markets":437,"states":26},{"crop":"Potato","date":"2016-08","year":2016,"month":8,"price":1600.0,"mean":1613.29,"min":22.0,"max":3800.0,"observations":400,"markets":395,"states":25},{"crop":"Potato","date":"2016-09","year":2016,"month":9,"price":1500.0,"mean":1529.02,"min":120.0,"max":4400.0,"observations":435,"markets":428,"states":23},{"crop":"Potato","date":"2016-10","year":2016,"month":10,"price":1350.0,"mean":1407.91,"min":300.0,"max":3500.0,"observations":393,"markets":382,"states":24},{"crop":"Potato","date":"2016-11","year":2016,"month":11,"price":1330.0,"mean":1434.05,"min":400.0,"max":4300.0,"observations":346,"markets":339,"states":24},{"crop":"Potato","date":"2016-12","year":2016,"month":12,"price":850.0,"mean":1108.81,"min":140.0,"max":5500.0,"observations":449,"markets":440,"states":24},{"crop":"Potato","date":"2017-01","year":2017,"month":1,"price":525.0,"mean":631.15,"min":200.0,"max":3000.0,"observations":239,"markets":238,"states":22},{"crop":"Potato","date":"2017-02","year":2017,"month":2,"price":500.0,"mean":698.89,"min":150.0,"max":3500.0,"observations":431,"markets":419,"states":24},{"crop":"Potato","date":"2017-03","year":2017,"month":3,"price":450.0,"mean":652.54,"min":120.0,"max":4300.0,"observations":471,"markets":460,"states":24},{"crop":"Potato","date":"2017-04","year":2017,"month":4,"price":460.0,"mean":649.87,"min":100.0,"max":4300.0,"observations":412,"markets":404,"states":24},{"crop":"Potato","date":"2017-05","year":2017,"month":5,"price":500.0,"mean":618.11,"min":110.0,"max":3400.0,"observations":372,"markets":368,"states":20},{"crop":"Potato","date":"2017-06","year":2017,"month":6,"price":590.0,"mean":784.68,"min":70.0,"max":4200.0,"observations":418,"markets":408,"states":26},{"crop":"Potato","date":"2017-07","year":2017,"month":7,"price":600.0,"mean":763.25,"min":210.0,"max":3000.0,"observations":424,"markets":415,"states":23},{"crop":"Potato","date":"2017-08","year":2017,"month":8,"price":600.0,"mean":740.84,"min":10.0,"max":3200.0,"observations":528,"markets":518,"states":24},{"crop":"Potato","date":"2017-09","year":2017,"month":9,"price":600.0,"mean":700.92,"min":90.0,"max":3000.0,"observations":525,"markets":516,"states":24},{"crop":"Potato","date":"2017-10","year":2017,"month":10,"price":520.0,"mean":607.49,"min":150.0,"max":3000.0,"observations":284,"markets":280,"states":19},{"crop":"Potato","date":"2017-11","year":2017,"month":11,"price":550.0,"mean":662.15,"min":100.0,"max":3500.0,"observations":460,"markets":448,"states":25},{"crop":"Potato","date":"2017-12","year":2017,"month":12,"price":600.0,"mean":776.43,"min":80.0,"max":4000.0,"observations":505,"markets":490,"states":27},{"crop":"Potato","date":"2018-01","year":2018,"month":1,"price":500.0,"mean":689.12,"min":100.0,"max":5000.0,"observations":518,"markets":506,"states":22},{"crop":"Potato","date":"2018-02","year":2018,"month":2,"price":500.0,"mean":686.16,"min":140.0,"max":4000.0,"observations":579,"markets":560,"states":26},{"crop":"Potato","date":"2018-03","year":2018,"month":3,"price":600.0,"mean":740.25,"min":5.0,"max":7000.0,"observations":475,"markets":460,"states":23},{"crop":"Potato","date":"2018-04","year":2018,"month":4,"price":800.0,"mean":827.03,"min":9.0,"max":2300.0,"observations":327,"markets":318,"states":20},{"crop":"Potato","date":"2018-05","year":2018,"month":5,"price":1000.0,"mean":1042.27,"min":300.0,"max":2900.0,"observations":450,"markets":443,"states":24},{"crop":"Potato","date":"2018-06","year":2018,"month":6,"price":1250.0,"mean":1308.61,"min":300.0,"max":3600.0,"observations":517,"markets":499,"states":24},{"crop":"Potato","date":"2018-07","year":2018,"month":7,"price":1350.0,"mean":1330.11,"min":423.0,"max":3200.0,"observations":265,"markets":257,"states":17},{"crop":"Potato","date":"2018-08","year":2018,"month":8,"price":1310.0,"mean":1394.29,"min":362.0,"max":5010.0,"observations":542,"markets":524,"states":24},{"crop":"Potato","date":"2018-09","year":2018,"month":9,"price":1300.0,"mean":1342.27,"min":17.5,"max":3500.0,"observations":521,"markets":502,"states":25},{"crop":"Potato","date":"2018-10","year":2018,"month":10,"price":1285.0,"mean":1385.08,"min":390.0,"max":3500.0,"observations":495,"markets":478,"states":22},{"crop":"Potato","date":"2018-11","year":2018,"month":11,"price":1325.0,"mean":1416.17,"min":450.0,"max":4200.0,"observations":430,"markets":419,"states":19},{"crop":"Potato","date":"2018-12","year":2018,"month":12,"price":1050.0,"mean":1168.01,"min":210.0,"max":4400.0,"observations":537,"markets":519,"states":24},{"crop":"Potato","date":"2019-01","year":2019,"month":1,"price":615.0,"mean":807.88,"min":200.0,"max":3250.0,"observations":567,"markets":552,"states":24},{"crop":"Potato","date":"2019-02","year":2019,"month":2,"price":600.0,"mean":752.77,"min":200.0,"max":3700.0,"observations":573,"markets":557,"states":26},{"crop":"Potato","date":"2019-03","year":2019,"month":3,"price":600.0,"mean":754.26,"min":150.0,"max":3500.0,"observations":528,"markets":512,"states":25},{"crop":"Potato","date":"2019-04","year":2019,"month":4,"price":650.0,"mean":802.9,"min":180.0,"max":5000.0,"observations":583,"markets":566,"states":23},{"crop":"Potato","date":"2019-05","year":2019,"month":5,"price":750.0,"mean":867.22,"min":290.0,"max":3000.0,"observations":464,"markets":458,"states":22},{"crop":"Potato","date":"2019-06","year":2019,"month":6,"price":870.0,"mean":1010.98,"min":300.0,"max":4400.0,"observations":495,"markets":483,"states":22},{"crop":"Potato","date":"2019-07","year":2019,"month":7,"price":920.0,"mean":1085.42,"min":295.0,"max":3326.0,"observations":526,"markets":508,"states":20},{"crop":"Potato","date":"2019-08","year":2019,"month":8,"price":930.0,"mean":1077.55,"min":300.0,"max":5000.0,"observations":525,"markets":507,"states":24},{"crop":"Potato","date":"2019-09","year":2019,"month":9,"price":900.0,"mean":973.75,"min":315.0,"max":3250.0,"observations":341,"markets":332,"states":19},{"crop":"Potato","date":"2019-10","year":2019,"month":10,"price":900.0,"mean":1090.38,"min":380.0,"max":3800.0,"observations":504,"markets":486,"states":26},{"crop":"Potato","date":"2019-11","year":2019,"month":11,"price":1082.5,"mean":1270.04,"min":250.0,"max":4300.0,"observations":498,"markets":483,"states":24},{"crop":"Potato","date":"2019-12","year":2019,"month":12,"price":1200.0,"mean":1282.84,"min":350.0,"max":4000.0,"observations":326,"markets":318,"states":20},{"crop":"Potato","date":"2020-01","year":2020,"month":1,"price":1500.0,"mean":1704.62,"min":480.0,"max":4600.0,"observations":369,"markets":360,"states":17},{"crop":"Potato","date":"2020-02","year":2020,"month":2,"price":1200.0,"mean":1443.23,"min":300.0,"max":4500.0,"observations":366,"markets":359,"states":18},{"crop":"Rice","date":"2015-01","year":2015,"month":1,"price":2400.0,"mean":2571.3,"min":1260.0,"max":9400.0,"observations":623,"markets":266,"states":15},{"crop":"Rice","date":"2015-02","year":2015,"month":2,"price":2222.5,"mean":2459.25,"min":1200.0,"max":8100.0,"observations":352,"markets":156,"states":13},{"crop":"Rice","date":"2015-03","year":2015,"month":3,"price":2350.0,"mean":2490.5,"min":1350.0,"max":7000.0,"observations":327,"markets":147,"states":12},{"crop":"Rice","date":"2015-04","year":2015,"month":4,"price":2217.5,"mean":2445.99,"min":990.0,"max":7000.0,"observations":506,"markets":241,"states":15},{"crop":"Rice","date":"2015-05","year":2015,"month":5,"price":2200.0,"mean":2435.43,"min":800.0,"max":7900.0,"observations":499,"markets":244,"states":14},{"crop":"Rice","date":"2015-06","year":2015,"month":6,"price":2240.0,"mean":2500.47,"min":550.0,"max":8900.0,"observations":573,"markets":246,"states":16},{"crop":"Rice","date":"2015-07","year":2015,"month":7,"price":2295.0,"mean":2529.64,"min":325.0,"max":8700.0,"observations":574,"markets":253,"states":18},{"crop":"Rice","date":"2015-08","year":2015,"month":8,"price":2275.0,"mean":2481.08,"min":410.0,"max":8700.0,"observations":454,"markets":221,"states":17},{"crop":"Rice","date":"2015-09","year":2015,"month":9,"price":2250.0,"mean":2534.53,"min":325.0,"max":8700.0,"observations":573,"markets":244,"states":16},{"crop":"Rice","date":"2015-10","year":2015,"month":10,"price":2277.5,"mean":2563.57,"min":1300.0,"max":8700.0,"observations":582,"markets":250,"states":16},{"crop":"Rice","date":"2015-11","year":2015,"month":11,"price":2250.0,"mean":2472.31,"min":325.0,"max":8700.0,"observations":279,"markets":135,"states":12},{"crop":"Rice","date":"2015-12","year":2015,"month":12,"price":2300.0,"mean":2537.24,"min":1200.0,"max":8700.0,"observations":562,"markets":251,"states":17},{"crop":"Rice","date":"2016-01","year":2016,"month":1,"price":2300.0,"mean":2532.98,"min":325.0,"max":8900.0,"observations":523,"markets":239,"states":17},{"crop":"Rice","date":"2016-02","year":2016,"month":2,"price":2290.0,"mean":2505.16,"min":325.0,"max":8900.0,"observations":515,"markets":235,"states":15},{"crop":"Rice","date":"2016-03","year":2016,"month":3,"price":2240.0,"mean":2486.87,"min":325.0,"max":8900.0,"observations":497,"markets":246,"states":16},{"crop":"Rice","date":"2016-04","year":2016,"month":4,"price":2250.0,"mean":2525.4,"min":1400.0,"max":8900.0,"observations":405,"markets":211,"states":15},{"crop":"Rice","date":"2016-05","year":2016,"month":5,"price":2210.0,"mean":2438.68,"min":1400.0,"max":8900.0,"observations":272,"markets":130,"states":11},{"crop":"Rice","date":"2016-06","year":2016,"month":6,"price":2300.0,"mean":2602.52,"min":1250.0,"max":8900.0,"observations":523,"markets":239,"states":14},{"crop":"Rice","date":"2016-07","year":2016,"month":7,"price":2400.0,"mean":2643.06,"min":1410.0,"max":8900.0,"observations":524,"markets":236,"states":14},{"crop":"Rice","date":"2016-08","year":2016,"month":8,"price":2450.0,"mean":3468.14,"min":1425.0,"max":210000.0,"observations":518,"markets":231,"states":16},{"crop":"Rice","date":"2016-09","year":2016,"month":9,"price":2420.0,"mean":2696.0,"min":1110.0,"max":8900.0,"observations":513,"markets":235,"states":14},{"crop":"Rice","date":"2016-10","year":2016,"month":10,"price":2500.0,"mean":2741.06,"min":1500.0,"max":8900.0,"observations":358,"markets":188,"states":13},{"crop":"Rice","date":"2016-11","year":2016,"month":11,"price":2480.0,"mean":2728.36,"min":1625.0,"max":12350.0,"observations":440,"markets":208,"states":14},{"crop":"Rice","date":"2016-12","year":2016,"month":12,"price":2500.0,"mean":2712.82,"min":1500.0,"max":8900.0,"observations":469,"markets":217,"states":14},{"crop":"Rice","date":"2017-01","year":2017,"month":1,"price":2400.0,"mean":2593.74,"min":1397.0,"max":8900.0,"observations":252,"markets":121,"states":12},{"crop":"Rice","date":"2017-02","year":2017,"month":2,"price":2400.0,"mean":2675.57,"min":1500.0,"max":8900.0,"observations":507,"markets":224,"states":14},{"crop":"Rice","date":"2017-03","year":2017,"month":3,"price":2400.0,"mean":2652.2,"min":1225.0,"max":8900.0,"observations":518,"markets":234,"states":14},{"crop":"Rice","date":"2017-04","year":2017,"month":4,"price":2380.0,"mean":2615.03,"min":1700.0,"max":8900.0,"observations":427,"markets":200,"states":13},{"crop":"Rice","date":"2017-05","year":2017,"month":5,"price":2450.0,"mean":2684.85,"min":1420.0,"max":8700.0,"observations":454,"markets":222,"states":14},{"crop":"Rice","date":"2017-06","year":2017,"month":6,"price":2480.0,"mean":2734.16,"min":1100.0,"max":8100.0,"observations":523,"markets":233,"states":14},{"crop":"Rice","date":"2017-07","year":2017,"month":7,"price":2500.0,"mean":2734.36,"min":1428.0,"max":8400.0,"observations":447,"markets":217,"states":13},{"crop":"Rice","date":"2017-08","year":2017,"month":8,"price":2517.5,"mean":2731.0,"min":1150.0,"max":8900.0,"observations":540,"markets":240,"states":14},{"crop":"Rice","date":"2017-09","year":2017,"month":9,"price":2500.0,"mean":2696.95,"min":1200.0,"max":6850.0,"observations":556,"markets":250,"states":14},{"crop":"Rice","date":"2017-10","year":2017,"month":10,"price":2575.0,"mean":2670.5,"min":1600.0,"max":4800.0,"observations":248,"markets":131,"states":11},{"crop":"Rice","date":"2017-11","year":2017,"month":11,"price":2600.0,"mean":2749.82,"min":1200.0,"max":7500.0,"observations":497,"markets":241,"states":15},{"crop":"Rice","date":"2017-12","year":2017,"month":12,"price":2600.0,"mean":2777.67,"min":1285.0,"max":9100.0,"observations":520,"markets":248,"states":14},{"crop":"Rice","date":"2018-01","year":2018,"month":1,"price":2575.0,"mean":2721.74,"min":1340.0,"max":5700.0,"observations":525,"markets":245,"states":13},{"crop":"Rice","date":"2018-02","year":2018,"month":2,"price":2600.0,"mean":2766.2,"min":1200.0,"max":9000.0,"observations":552,"markets":240,"states":14},{"crop":"Rice","date":"2018-03","year":2018,"month":3,"price":2625.0,"mean":2793.41,"min":1350.0,"max":8900.0,"observations":435,"markets":228,"states":14},{"crop":"Rice","date":"2018-04","year":2018,"month":4,"price":2610.0,"mean":2644.98,"min":2.0,"max":6000.0,"observations":254,"markets":131,"states":9},{"crop":"Rice","date":"2018-05","year":2018,"month":5,"price":2550.0,"mean":2681.41,"min":2.0,"max":5795.0,"observations":467,"markets":244,"states":13},{"crop":"Rice","date":"2018-06","year":2018,"month":6,"price":2600.0,"mean":2819.89,"min":1300.0,"max":16100.0,"observations":519,"markets":234,"states":14},{"crop":"Rice","date":"2018-07","year":2018,"month":7,"price":2672.5,"mean":2708.87,"min":220.0,"max":5300.0,"observations":244,"markets":124,"states":10},{"crop":"Rice","date":"2018-08","year":2018,"month":8,"price":2620.0,"mean":2813.86,"min":1600.0,"max":7350.0,"observations":539,"markets":241,"states":13},{"crop":"Rice","date":"2018-09","year":2018,"month":9,"price":2590.0,"mean":2761.52,"min":3.0,"max":9100.0,"observations":460,"markets":223,"states":12},{"crop":"Rice","date":"2018-10","year":2018,"month":10,"price":2600.0,"mean":2773.11,"min":1350.0,"max":6250.0,"observations":526,"markets":261,"states":14},{"crop":"Rice","date":"2018-11","year":2018,"month":11,"price":2605.0,"mean":2789.07,"min":1000.0,"max":6900.0,"observations":400,"markets":230,"states":14},{"crop":"Rice","date":"2018-12","year":2018,"month":12,"price":2550.0,"mean":2729.86,"min":390.0,"max":6500.0,"observations":498,"markets":246,"states":14},{"crop":"Rice","date":"2019-01","year":2019,"month":1,"price":2540.0,"mean":2735.65,"min":200.0,"max":7200.0,"observations":551,"markets":265,"states":15},{"crop":"Rice","date":"2019-02","year":2019,"month":2,"price":2600.0,"mean":2799.58,"min":410.0,"max":9500.0,"observations":580,"markets":264,"states":13},{"crop":"Rice","date":"2019-03","year":2019,"month":3,"price":2600.0,"mean":2814.51,"min":1350.0,"max":11500.0,"observations":570,"markets":271,"states":13},{"crop":"Rice","date":"2019-04","year":2019,"month":4,"price":2600.0,"mean":2788.73,"min":1300.0,"max":9300.0,"observations":577,"markets":262,"states":14},{"crop":"Rice","date":"2019-05","year":2019,"month":5,"price":2550.0,"mean":2775.22,"min":360.0,"max":7000.0,"observations":485,"markets":256,"states":15},{"crop":"Rice","date":"2019-06","year":2019,"month":6,"price":2590.0,"mean":2782.16,"min":1390.0,"max":6800.0,"observations":470,"markets":240,"states":13},{"crop":"Rice","date":"2019-07","year":2019,"month":7,"price":2600.0,"mean":2801.53,"min":1350.0,"max":9800.0,"observations":518,"markets":240,"states":15},{"crop":"Rice","date":"2019-08","year":2019,"month":8,"price":2600.0,"mean":2810.06,"min":1400.0,"max":7060.0,"observations":543,"markets":248,"states":14},{"crop":"Rice","date":"2019-09","year":2019,"month":9,"price":2600.0,"mean":2748.6,"min":1400.0,"max":4800.0,"observations":310,"markets":141,"states":13},{"crop":"Rice","date":"2019-10","year":2019,"month":10,"price":2650.0,"mean":2803.8,"min":1450.0,"max":6900.0,"observations":435,"markets":235,"states":13},{"crop":"Rice","date":"2019-11","year":2019,"month":11,"price":2600.0,"mean":2803.39,"min":1450.0,"max":10000.0,"observations":509,"markets":253,"states":13},{"crop":"Rice","date":"2019-12","year":2019,"month":12,"price":2620.0,"mean":2779.14,"min":1800.0,"max":5266.0,"observations":305,"markets":150,"states":11},{"crop":"Rice","date":"2020-01","year":2020,"month":1,"price":2580.0,"mean":2772.49,"min":230.0,"max":5800.0,"observations":432,"markets":224,"states":9},{"crop":"Rice","date":"2020-02","year":2020,"month":2,"price":2600.0,"mean":2802.37,"min":1613.0,"max":11200.0,"observations":413,"markets":224,"states":9},{"crop":"Rice","date":"2020-03","year":2020,"month":3,"price":2600.0,"mean":2748.23,"min":1500.0,"max":10300.0,"observations":239,"markets":129,"states":7},{"crop":"Rice","date":"2020-04","year":2020,"month":4,"price":2625.0,"mean":2862.49,"min":1460.0,"max":11000.0,"observations":347,"markets":185,"states":7},{"crop":"Rice","date":"2020-05","year":2020,"month":5,"price":2600.0,"mean":2856.72,"min":1430.0,"max":11200.0,"observations":409,"markets":215,"states":9},{"crop":"Rice","date":"2020-06","year":2020,"month":6,"price":2590.0,"mean":2863.26,"min":1490.0,"max":11200.0,"observations":425,"markets":224,"states":9},{"crop":"Rice","date":"2020-07","year":2020,"month":7,"price":2590.0,"mean":2836.3,"min":1500.0,"max":11200.0,"observations":426,"markets":210,"states":9},{"crop":"Rice","date":"2020-08","year":2020,"month":8,"price":2700.0,"mean":2948.58,"min":1231.0,"max":8700.0,"observations":149,"markets":90,"states":8},{"crop":"Rice","date":"2020-09","year":2020,"month":9,"price":2600.0,"mean":2730.13,"min":1000.0,"max":5950.0,"observations":370,"markets":206,"states":8},{"crop":"Rice","date":"2020-10","year":2020,"month":10,"price":2600.0,"mean":2791.3,"min":1200.0,"max":11200.0,"observations":383,"markets":193,"states":8},{"crop":"Rice","date":"2020-11","year":2020,"month":11,"price":2550.0,"mean":2698.51,"min":1608.0,"max":5900.0,"observations":203,"markets":106,"states":7},{"crop":"Rice","date":"2020-12","year":2020,"month":12,"price":2500.0,"mean":2643.95,"min":1230.0,"max":5900.0,"observations":332,"markets":181,"states":8},{"crop":"Rice","date":"2021-01","year":2021,"month":1,"price":2450.0,"mean":2611.45,"min":1300.0,"max":6000.0,"observations":385,"markets":205,"states":8},{"crop":"Rice","date":"2021-02","year":2021,"month":2,"price":2500.0,"mean":2655.23,"min":1200.0,"max":6050.0,"observations":407,"markets":202,"states":9},{"crop":"Rice","date":"2021-03","year":2021,"month":3,"price":2500.0,"mean":2688.43,"min":1300.0,"max":9700.0,"observations":424,"markets":209,"states":9},{"crop":"Rice","date":"2021-04","year":2021,"month":4,"price":2500.0,"mean":2709.0,"min":1400.0,"max":6090.0,"observations":347,"markets":187,"states":9},{"crop":"Rice","date":"2021-05","year":2021,"month":5,"price":2610.0,"mean":2844.85,"min":1950.0,"max":11300.0,"observations":233,"markets":145,"states":8},{"crop":"Rice","date":"2021-06","year":2021,"month":6,"price":2550.0,"mean":2776.73,"min":1510.0,"max":11200.0,"observations":395,"markets":194,"states":9},{"crop":"Rice","date":"2021-07","year":2021,"month":7,"price":2572.5,"mean":2733.47,"min":1000.0,"max":6130.0,"observations":376,"markets":202,"states":9},{"crop":"Rice","date":"2021-08","year":2021,"month":8,"price":2600.0,"mean":2741.7,"min":2000.0,"max":5000.0,"observations":171,"markets":85,"states":6},{"crop":"Rice","date":"2021-09","year":2021,"month":9,"price":2540.0,"mean":2736.4,"min":1525.0,"max":5250.0,"observations":393,"markets":203,"states":7},{"crop":"Rice","date":"2021-10","year":2021,"month":10,"price":2552.5,"mean":2745.94,"min":1450.0,"max":6150.0,"observations":404,"markets":205,"states":8},{"crop":"Rice","date":"2021-11","year":2021,"month":11,"price":2600.0,"mean":2770.79,"min":1350.0,"max":6200.0,"observations":398,"markets":203,"states":8},{"crop":"Rice","date":"2021-12","year":2021,"month":12,"price":2560.0,"mean":2776.19,"min":1465.0,"max":6300.0,"observations":404,"markets":200,"states":8},{"crop":"Rice","date":"2022-01","year":2022,"month":1,"price":2600.0,"mean":2824.02,"min":1806.0,"max":6170.0,"observations":370,"markets":190,"states":8},{"crop":"Rice","date":"2022-02","year":2022,"month":2,"price":2600.0,"mean":2875.23,"min":1500.0,"max":14000.0,"observations":461,"markets":211,"states":10},{"crop":"Rice","date":"2022-03","year":2022,"month":3,"price":2625.0,"mean":2871.29,"min":1200.0,"max":17000.0,"observations":414,"markets":207,"states":10},{"crop":"Rice","date":"2022-04","year":2022,"month":4,"price":2630.0,"mean":2863.07,"min":1500.0,"max":13000.0,"observations":448,"markets":214,"states":11},{"crop":"Rice","date":"2022-05","year":2022,"month":5,"price":2700.0,"mean":2844.83,"min":1810.0,"max":6450.0,"observations":213,"markets":113,"states":8},{"crop":"Rice","date":"2022-06","year":2022,"month":6,"price":2700.0,"mean":2948.87,"min":1000.0,"max":23000.0,"observations":437,"markets":213,"states":8},{"crop":"Rice","date":"2022-07","year":2022,"month":7,"price":2600.0,"mean":2913.6,"min":1600.0,"max":23000.0,"observations":392,"markets":202,"states":9},{"crop":"Rice","date":"2022-08","year":2022,"month":8,"price":2692.5,"mean":2970.1,"min":1400.0,"max":19000.0,"observations":466,"markets":220,"states":10},{"crop":"Rice","date":"2022-09","year":2022,"month":9,"price":2760.0,"mean":3021.04,"min":820.0,"max":27000.0,"observations":445,"markets":221,"states":10},{"crop":"Rice","date":"2022-10","year":2022,"month":10,"price":2677.5,"mean":3005.09,"min":1260.0,"max":28000.0,"observations":396,"markets":201,"states":10},{"crop":"Rice","date":"2022-11","year":2022,"month":11,"price":2850.0,"mean":3015.99,"min":1300.0,"max":7200.0,"observations":429,"markets":218,"states":11},{"crop":"Rice","date":"2022-12","year":2022,"month":12,"price":2800.0,"mean":2944.44,"min":1350.0,"max":7250.0,"observations":474,"markets":230,"states":12},{"crop":"Rice","date":"2023-01","year":2023,"month":1,"price":2800.0,"mean":2946.72,"min":1720.0,"max":7400.0,"observations":253,"markets":122,"states":9},{"crop":"Rice","date":"2023-02","year":2023,"month":2,"price":2900.0,"mean":3039.21,"min":1200.0,"max":7512.0,"observations":485,"markets":222,"states":10},{"crop":"Rice","date":"2023-03","year":2023,"month":3,"price":2950.0,"mean":3115.82,"min":1200.0,"max":5400.0,"observations":331,"markets":202,"states":10},{"crop":"Rice","date":"2023-04","year":2023,"month":4,"price":2780.0,"mean":2984.14,"min":1200.0,"max":9700.0,"observations":417,"markets":219,"states":10},{"crop":"Rice","date":"2023-05","year":2023,"month":5,"price":2900.0,"mean":3007.04,"min":1200.0,"max":8200.0,"observations":431,"markets":217,"states":9},{"crop":"Rice","date":"2023-06","year":2023,"month":6,"price":2900.0,"mean":3105.07,"min":1200.0,"max":16500.0,"observations":474,"markets":220,"states":9},{"crop":"Rice","date":"2023-07","year":2023,"month":7,"price":2860.0,"mean":3102.35,"min":1200.0,"max":10170.0,"observations":363,"markets":200,"states":11},{"crop":"Rice","date":"2023-08","year":2023,"month":8,"price":2977.5,"mean":3236.26,"min":1200.0,"max":8700.0,"observations":448,"markets":218,"states":11},{"crop":"Rice","date":"2023-09","year":2023,"month":9,"price":2977.5,"mean":3252.97,"min":1200.0,"max":7000.0,"observations":466,"markets":226,"states":12},{"crop":"Rice","date":"2023-10","year":2023,"month":10,"price":3000.0,"mean":3266.69,"min":1200.0,"max":8900.0,"observations":199,"markets":115,"states":6},{"crop":"Rice","date":"2023-11","year":2023,"month":11,"price":3100.0,"mean":3319.93,"min":1200.0,"max":7500.0,"observations":444,"markets":209,"states":12},{"crop":"Rice","date":"2023-12","year":2023,"month":12,"price":3000.0,"mean":3367.9,"min":1200.0,"max":11290.0,"observations":459,"markets":219,"states":13},{"crop":"Rice","date":"2024-01","year":2024,"month":1,"price":3010.0,"mean":3319.32,"min":1200.0,"max":8950.0,"observations":430,"markets":207,"states":10},{"crop":"Rice","date":"2024-02","year":2024,"month":2,"price":3002.5,"mean":3411.31,"min":1200.0,"max":8900.0,"observations":430,"markets":205,"states":10},{"crop":"Rice","date":"2024-03","year":2024,"month":3,"price":3050.0,"mean":3388.83,"min":1200.0,"max":12751.0,"observations":395,"markets":206,"states":10},{"crop":"Rice","date":"2024-04","year":2024,"month":4,"price":3110.0,"mean":3371.01,"min":1200.0,"max":6180.0,"observations":392,"markets":202,"states":10},{"crop":"Rice","date":"2024-05","year":2024,"month":5,"price":3140.0,"mean":3386.34,"min":1200.0,"max":8500.0,"observations":410,"markets":202,"states":10},{"crop":"Rice","date":"2024-06","year":2024,"month":6,"price":3165.0,"mean":3448.86,"min":1200.0,"max":12552.0,"observations":392,"markets":201,"states":8},{"crop":"Rice","date":"2024-07","year":2024,"month":7,"price":3200.0,"mean":3488.69,"min":1200.0,"max":8950.0,"observations":449,"markets":216,"states":10},{"crop":"Rice","date":"2024-08","year":2024,"month":8,"price":3300.0,"mean":3564.87,"min":1200.0,"max":8950.0,"observations":458,"markets":211,"states":10},{"crop":"Rice","date":"2024-09","year":2024,"month":9,"price":3400.0,"mean":3613.41,"min":2210.0,"max":8950.0,"observations":241,"markets":118,"states":6},{"crop":"Rice","date":"2024-10","year":2024,"month":10,"price":3290.0,"mean":3559.49,"min":1500.0,"max":7000.0,"observations":401,"markets":198,"states":11},{"crop":"Rice","date":"2024-11","year":2024,"month":11,"price":3340.0,"mean":3627.47,"min":2100.0,"max":8840.0,"observations":354,"markets":201,"states":11},{"crop":"Rice","date":"2024-12","year":2024,"month":12,"price":3600.0,"mean":3699.62,"min":2550.0,"max":8200.0,"observations":204,"markets":100,"states":8},{"crop":"Rice","date":"2025-01","year":2025,"month":1,"price":3300.0,"mean":3571.77,"min":2100.0,"max":6750.0,"observations":365,"markets":197,"states":11},{"crop":"Rice","date":"2025-02","year":2025,"month":2,"price":3300.0,"mean":3581.81,"min":2100.0,"max":8500.0,"observations":371,"markets":194,"states":10},{"crop":"Rice","date":"2025-03","year":2025,"month":3,"price":3299.0,"mean":3594.6,"min":1050.0,"max":6650.0,"observations":378,"markets":192,"states":11},{"crop":"Rice","date":"2025-04","year":2025,"month":4,"price":3340.0,"mean":3646.08,"min":2150.0,"max":6050.0,"observations":385,"markets":193,"states":11},{"crop":"Rice","date":"2025-05","year":2025,"month":5,"price":3360.0,"mean":3610.65,"min":2000.0,"max":6300.0,"observations":367,"markets":193,"states":12},{"crop":"Rice","date":"2025-06","year":2025,"month":6,"price":3500.0,"mean":3648.61,"min":2200.0,"max":5500.0,"observations":229,"markets":117,"states":7},{"crop":"Rice","date":"2025-07","year":2025,"month":7,"price":3400.0,"mean":3604.54,"min":1500.0,"max":6200.0,"observations":421,"markets":200,"states":11},{"crop":"Rice","date":"2025-08","year":2025,"month":8,"price":3420.0,"mean":3650.97,"min":2300.0,"max":8335.0,"observations":436,"markets":221,"states":11},{"crop":"Rice","date":"2025-09","year":2025,"month":9,"price":3410.0,"mean":3631.24,"min":1600.0,"max":7000.0,"observations":428,"markets":212,"states":12},{"crop":"Rice","date":"2025-10","year":2025,"month":10,"price":3447.5,"mean":3719.87,"min":1900.0,"max":8052.0,"observations":314,"markets":196,"states":11},{"crop":"Rice","date":"2025-11","year":2025,"month":11,"price":3400.0,"mean":3635.98,"min":1520.0,"max":8480.0,"observations":246,"markets":181,"states":9},{"crop":"Rice","date":"2025-12","year":2025,"month":12,"price":3500.0,"mean":3827.9,"min":2100.0,"max":9700.0,"observations":281,"markets":143,"states":11},{"crop":"Wheat","date":"2015-01","year":2015,"month":1,"price":1575.0,"mean":1622.48,"min":1300.0,"max":3100.0,"observations":358,"markets":337,"states":16},{"crop":"Wheat","date":"2015-02","year":2015,"month":2,"price":1550.0,"mean":1575.72,"min":1200.0,"max":2655.0,"observations":131,"markets":128,"states":11},{"crop":"Wheat","date":"2015-03","year":2015,"month":3,"price":1510.0,"mean":1557.67,"min":1103.0,"max":2700.0,"observations":103,"markets":101,"states":10},{"crop":"Wheat","date":"2015-04","year":2015,"month":4,"price":1461.0,"mean":1539.55,"min":1200.0,"max":3801.0,"observations":335,"markets":320,"states":16},{"crop":"Wheat","date":"2015-05","year":2015,"month":5,"price":1450.0,"mean":1492.64,"min":1215.0,"max":3850.0,"observations":524,"markets":506,"states":13},{"crop":"Wheat","date":"2015-06","year":2015,"month":6,"price":1455.0,"mean":1530.35,"min":1150.0,"max":3400.0,"observations":480,"markets":446,"states":16},{"crop":"Wheat","date":"2015-07","year":2015,"month":7,"price":1451.0,"mean":1512.48,"min":1150.0,"max":4075.0,"observations":461,"markets":435,"states":15},{"crop":"Wheat","date":"2015-08","year":2015,"month":8,"price":1454.0,"mean":1491.65,"min":145.0,"max":3200.0,"observations":441,"markets":416,"states":16},{"crop":"Wheat","date":"2015-09","year":2015,"month":9,"price":1461.0,"mean":1530.94,"min":1050.0,"max":3800.0,"observations":483,"markets":453,"states":16},{"crop":"Wheat","date":"2015-10","year":2015,"month":10,"price":1500.0,"mean":1578.57,"min":1150.0,"max":3500.0,"observations":492,"markets":463,"states":16},{"crop":"Wheat","date":"2015-11","year":2015,"month":11,"price":1525.0,"mean":1552.26,"min":1150.0,"max":2601.0,"observations":125,"markets":122,"states":11},{"crop":"Wheat","date":"2015-12","year":2015,"month":12,"price":1560.0,"mean":1641.43,"min":1150.0,"max":4000.0,"observations":464,"markets":434,"states":14},{"crop":"Wheat","date":"2016-01","year":2016,"month":1,"price":1600.0,"mean":1671.46,"min":162.5,"max":3301.0,"observations":449,"markets":420,"states":16},{"crop":"Wheat","date":"2016-02","year":2016,"month":2,"price":1625.0,"mean":1684.21,"min":1150.0,"max":3200.0,"observations":358,"markets":336,"states":11},{"crop":"Wheat","date":"2016-03","year":2016,"month":3,"price":1611.0,"mean":1668.89,"min":155.0,"max":3600.0,"observations":355,"markets":332,"states":14},{"crop":"Wheat","date":"2016-04","year":2016,"month":4,"price":1539.0,"mean":1635.31,"min":152.5,"max":4150.0,"observations":364,"markets":350,"states":14},{"crop":"Wheat","date":"2016-05","year":2016,"month":5,"price":1525.0,"mean":1550.3,"min":1330.0,"max":2500.0,"observations":198,"markets":196,"states":12},{"crop":"Wheat","date":"2016-06","year":2016,"month":6,"price":1621.0,"mean":1679.82,"min":1.0,"max":3600.0,"observations":557,"markets":522,"states":15},{"crop":"Wheat","date":"2016-07","year":2016,"month":7,"price":1690.0,"mean":1746.93,"min":160.0,"max":3600.0,"observations":471,"markets":441,"states":15},{"crop":"Wheat","date":"2016-08","year":2016,"month":8,"price":1691.0,"mean":1738.66,"min":1400.0,"max":3601.0,"observations":402,"markets":376,"states":14},{"crop":"Wheat","date":"2016-09","year":2016,"month":9,"price":1680.0,"mean":1720.73,"min":1458.0,"max":3500.0,"observations":341,"markets":327,"states":13},{"crop":"Wheat","date":"2016-10","year":2016,"month":10,"price":1675.0,"mean":1732.72,"min":1081.0,"max":3200.0,"observations":315,"markets":296,"states":12},{"crop":"Wheat","date":"2016-11","year":2016,"month":11,"price":1738.0,"mean":1787.9,"min":945.0,"max":4100.0,"observations":147,"markets":142,"states":10},{"crop":"Wheat","date":"2016-12","year":2016,"month":12,"price":1915.0,"mean":1943.17,"min":1300.0,"max":4100.0,"observations":443,"markets":417,"states":14},{"crop":"Wheat","date":"2017-01","year":2017,"month":1,"price":1795.0,"mean":1790.69,"min":1250.0,"max":2275.0,"observations":108,"markets":107,"states":8},{"crop":"Wheat","date":"2017-02","year":2017,"month":2,"price":1850.0,"mean":1873.1,"min":17.2,"max":3800.0,"observations":405,"markets":383,"states":13},{"crop":"Wheat","date":"2017-03","year":2017,"month":3,"price":1660.0,"mean":1719.6,"min":1300.0,"max":4530.0,"observations":500,"markets":471,"states":12},{"crop":"Wheat","date":"2017-04","year":2017,"month":4,"price":1625.0,"mean":1691.75,"min":1420.0,"max":3800.0,"observations":380,"markets":360,"states":16},{"crop":"Wheat","date":"2017-05","year":2017,"month":5,"price":1625.0,"mean":1631.13,"min":1400.0,"max":3200.0,"observations":514,"markets":487,"states":14},{"crop":"Wheat","date":"2017-06","year":2017,"month":6,"price":1623.5,"mean":1644.75,"min":1085.0,"max":3900.0,"observations":464,"markets":435,"states":17},{"crop":"Wheat","date":"2017-07","year":2017,"month":7,"price":1622.5,"mean":1646.54,"min":142.1,"max":4951.0,"observations":344,"markets":328,"states":17},{"crop":"Wheat","date":"2017-08","year":2017,"month":8,"price":1620.0,"mean":1632.58,"min":15.0,"max":4000.0,"observations":588,"markets":561,"states":16},{"crop":"Wheat","date":"2017-09","year":2017,"month":9,"price":1601.0,"mean":1635.26,"min":1085.0,"max":4000.0,"observations":613,"markets":589,"states":15},{"crop":"Wheat","date":"2017-10","year":2017,"month":10,"price":1570.0,"mean":1556.43,"min":144.0,"max":1750.0,"observations":151,"markets":151,"states":11},{"crop":"Wheat","date":"2017-11","year":2017,"month":11,"price":1600.0,"mean":1634.01,"min":1050.0,"max":3800.0,"observations":511,"markets":488,"states":12},{"crop":"Wheat","date":"2017-12","year":2017,"month":12,"price":1620.0,"mean":1654.91,"min":1300.0,"max":4250.0,"observations":463,"markets":439,"states":14},{"crop":"Wheat","date":"2018-01","year":2018,"month":1,"price":1630.0,"mean":1674.24,"min":950.0,"max":4780.0,"observations":500,"markets":469,"states":11},{"crop":"Wheat","date":"2018-02","year":2018,"month":2,"price":1615.0,"mean":1658.53,"min":164.0,"max":4100.0,"observations":566,"markets":535,"states":13},{"crop":"Wheat","date":"2018-03","year":2018,"month":3,"price":1650.0,"mean":1710.05,"min":164.0,"max":4250.0,"observations":397,"markets":373,"states":13},{"crop":"Wheat","date":"2018-04","year":2018,"month":4,"price":1696.0,"mean":1661.82,"min":164.0,"max":2400.0,"observations":144,"markets":144,"states":12},{"crop":"Wheat","date":"2018-05","year":2018,"month":5,"price":1735.0,"mean":1721.46,"min":1350.0,"max":3200.0,"observations":560,"markets":538,"states":14},{"crop":"Wheat","date":"2018-06","year":2018,"month":6,"price":1735.0,"mean":1758.19,"min":1300.0,"max":4000.0,"observations":543,"markets":514,"states":15},{"crop":"Wheat","date":"2018-07","year":2018,"month":7,"price":1674.0,"mean":1660.66,"min":1277.0,"max":2362.0,"observations":142,"markets":140,"states":8},{"crop":"Wheat","date":"2018-08","year":2018,"month":8,"price":1855.0,"mean":1892.26,"min":1250.0,"max":4025.0,"observations":543,"markets":516,"states":14},{"crop":"Wheat","date":"2018-09","year":2018,"month":9,"price":1812.5,"mean":1860.4,"min":172.0,"max":4150.0,"observations":384,"markets":366,"states":14},{"crop":"Wheat","date":"2018-10","year":2018,"month":10,"price":1850.0,"mean":1882.6,"min":1300.0,"max":4000.0,"observations":495,"markets":470,"states":12},{"crop":"Wheat","date":"2018-11","year":2018,"month":11,"price":1858.0,"mean":1906.67,"min":1250.0,"max":4200.0,"observations":419,"markets":404,"states":12},{"crop":"Wheat","date":"2018-12","year":2018,"month":12,"price":1911.0,"mean":1955.82,"min":1300.0,"max":3950.0,"observations":498,"markets":475,"states":14},{"crop":"Wheat","date":"2019-01","year":2019,"month":1,"price":1920.0,"mean":1971.92,"min":1300.0,"max":5050.0,"observations":460,"markets":438,"states":12},{"crop":"Wheat","date":"2019-02","year":2019,"month":2,"price":1970.0,"mean":2003.21,"min":1600.0,"max":3950.0,"observations":494,"markets":477,"states":15},{"crop":"Wheat","date":"2019-03","year":2019,"month":3,"price":1925.0,"mean":1949.48,"min":1495.0,"max":3200.0,"observations":462,"markets":439,"states":12},{"crop":"Wheat","date":"2019-04","year":2019,"month":4,"price":1845.0,"mean":1883.07,"min":184.0,"max":3415.0,"observations":481,"markets":459,"states":14},{"crop":"Wheat","date":"2019-05","year":2019,"month":5,"price":1840.0,"mean":1831.24,"min":379.0,"max":3000.0,"observations":627,"markets":603,"states":11},{"crop":"Wheat","date":"2019-06","year":2019,"month":6,"price":1840.0,"mean":1890.98,"min":391.0,"max":3200.0,"observations":598,"markets":571,"states":15},{"crop":"Wheat","date":"2019-07","year":2019,"month":7,"price":1845.0,"mean":1873.19,"min":1450.0,"max":3600.0,"observations":565,"markets":539,"states":15},{"crop":"Wheat","date":"2019-08","year":2019,"month":8,"price":1925.0,"mean":1957.06,"min":1660.0,"max":4200.0,"observations":469,"markets":457,"states":11},{"crop":"Wheat","date":"2019-09","year":2019,"month":9,"price":1900.0,"mean":1924.93,"min":1700.0,"max":3000.0,"observations":189,"markets":184,"states":11},{"crop":"Wheat","date":"2019-10","year":2019,"month":10,"price":1950.0,"mean":1985.16,"min":1675.0,"max":4050.0,"observations":777,"markets":567,"states":13},{"crop":"Wheat","date":"2019-11","year":2019,"month":11,"price":2000.0,"mean":2038.41,"min":1580.0,"max":3900.0,"observations":1024,"markets":600,"states":14},{"crop":"Wheat","date":"2019-12","year":2019,"month":12,"price":1960.0,"mean":1987.51,"min":1700.0,"max":3000.0,"observations":327,"markets":199,"states":12},{"crop":"Wheat","date":"2020-01","year":2020,"month":1,"price":2115.0,"mean":2149.48,"min":801.0,"max":4450.0,"observations":801,"markets":520,"states":10},{"crop":"Wheat","date":"2020-02","year":2020,"month":2,"price":2055.0,"mean":2092.4,"min":1500.0,"max":3950.0,"observations":693,"markets":440,"states":10},{"crop":"Wheat","date":"2020-03","year":2020,"month":3,"price":1970.0,"mean":1956.3,"min":1505.0,"max":2650.0,"observations":251,"markets":171,"states":7},{"crop":"Wheat","date":"2020-04","year":2020,"month":4,"price":2000.0,"mean":2019.21,"min":1600.0,"max":3300.0,"observations":268,"markets":176,"states":8},{"crop":"Wheat","date":"2020-05","year":2020,"month":5,"price":1925.0,"mean":1908.27,"min":1250.0,"max":4800.0,"observations":862,"markets":573,"states":11},{"crop":"Wheat","date":"2020-06","year":2020,"month":6,"price":1866.0,"mean":1874.35,"min":660.0,"max":4500.0,"observations":968,"markets":593,"states":11},{"crop":"Wheat","date":"2020-07","year":2020,"month":7,"price":1833.5,"mean":1874.37,"min":1250.0,"max":4500.0,"observations":724,"markets":474,"states":9},{"crop":"Wheat","date":"2020-08","year":2020,"month":8,"price":1709.0,"mean":1788.33,"min":1416.0,"max":4300.0,"observations":258,"markets":212,"states":9},{"crop":"Wheat","date":"2020-09","year":2020,"month":9,"price":1661.0,"mean":1722.99,"min":1330.0,"max":4800.0,"observations":648,"markets":447,"states":8},{"crop":"Wheat","date":"2020-10","year":2020,"month":10,"price":1610.0,"mean":1701.82,"min":1070.0,"max":5900.0,"observations":621,"markets":399,"states":9},{"crop":"Wheat","date":"2020-11","year":2020,"month":11,"price":1660.0,"mean":1689.55,"min":1300.0,"max":2401.0,"observations":205,"markets":129,"states":9},{"crop":"Wheat","date":"2020-12","year":2020,"month":12,"price":1650.0,"mean":1688.13,"min":1300.0,"max":6100.0,"observations":468,"markets":338,"states":9},{"crop":"Wheat","date":"2021-01","year":2021,"month":1,"price":1700.0,"mean":1719.98,"min":1095.0,"max":4800.0,"observations":701,"markets":457,"states":9},{"crop":"Wheat","date":"2021-02","year":2021,"month":2,"price":1700.0,"mean":1736.16,"min":1290.0,"max":5587.0,"observations":830,"markets":526,"states":10},{"crop":"Wheat","date":"2021-03","year":2021,"month":3,"price":1700.0,"mean":1743.62,"min":1200.0,"max":5207.0,"observations":937,"markets":564,"states":9},{"crop":"Wheat","date":"2021-04","year":2021,"month":4,"price":1760.0,"mean":1832.25,"min":1425.0,"max":4600.0,"observations":755,"markets":538,"states":10},{"crop":"Wheat","date":"2021-05","year":2021,"month":5,"price":1975.0,"mean":1952.32,"min":910.0,"max":7562.0,"observations":418,"markets":326,"states":10},{"crop":"Wheat","date":"2021-06","year":2021,"month":6,"price":1840.0,"mean":1869.34,"min":1375.0,"max":5300.0,"observations":826,"markets":524,"states":10},{"crop":"Wheat","date":"2021-07","year":2021,"month":7,"price":1700.0,"mean":1764.8,"min":1350.0,"max":8250.0,"observations":854,"markets":528,"states":9},{"crop":"Wheat","date":"2021-08","year":2021,"month":8,"price":1709.0,"mean":1733.6,"min":1464.0,"max":2300.0,"observations":172,"markets":125,"states":8},{"crop":"Wheat","date":"2021-09","year":2021,"month":9,"price":1830.0,"mean":1860.88,"min":1269.0,"max":4730.0,"observations":877,"markets":561,"states":10},{"crop":"Wheat","date":"2021-10","year":2021,"month":10,"price":1850.0,"mean":1886.09,"min":967.0,"max":4620.0,"observations":882,"markets":551,"states":9},{"crop":"Wheat","date":"2021-11","year":2021,"month":11,"price":1910.0,"mean":1938.41,"min":1150.0,"max":5350.0,"observations":771,"markets":508,"states":10},{"crop":"Wheat","date":"2021-12","year":2021,"month":12,"price":1927.0,"mean":1968.28,"min":1400.0,"max":4900.0,"observations":865,"markets":535,"states":9},{"crop":"Wheat","date":"2022-01","year":2022,"month":1,"price":1920.0,"mean":1953.4,"min":1500.0,"max":4500.0,"observations":806,"markets":490,"states":10},{"crop":"Wheat","date":"2022-02","year":2022,"month":2,"price":1951.0,"mean":2002.82,"min":1396.0,"max":8700.0,"observations":996,"markets":571,"states":11},{"crop":"Wheat","date":"2022-03","year":2022,"month":3,"price":2050.5,"mean":2088.98,"min":1179.0,"max":4400.0,"observations":788,"markets":560,"states":13},{"crop":"Wheat","date":"2022-04","year":2022,"month":4,"price":2025.0,"mean":2094.31,"min":1600.0,"max":7001.0,"observations":1061,"markets":687,"states":15},{"crop":"Wheat","date":"2022-05","year":2022,"month":5,"price":2025.0,"mean":2068.74,"min":1750.0,"max":3650.0,"observations":445,"markets":300,"states":12},{"crop":"Wheat","date":"2022-06","year":2022,"month":6,"price":2030.0,"mean":2086.23,"min":1410.0,"max":6980.0,"observations":1166,"markets":652,"states":12},{"crop":"Wheat","date":"2022-07","year":2022,"month":7,"price":2035.0,"mean":2078.15,"min":1500.0,"max":5000.0,"observations":801,"markets":539,"states":14},{"crop":"Wheat","date":"2022-08","year":2022,"month":8,"price":2225.0,"mean":2242.3,"min":1600.0,"max":4900.0,"observations":1018,"markets":590,"states":13},{"crop":"Wheat","date":"2022-09","year":2022,"month":9,"price":2250.0,"mean":2265.75,"min":1700.0,"max":4800.0,"observations":983,"markets":591,"states":11},{"crop":"Wheat","date":"2022-10","year":2022,"month":10,"price":2260.0,"mean":2282.43,"min":1851.0,"max":4900.0,"observations":787,"markets":498,"states":12},{"crop":"Wheat","date":"2022-11","year":2022,"month":11,"price":2390.0,"mean":2422.68,"min":1700.0,"max":5980.0,"observations":810,"markets":519,"states":11},{"crop":"Wheat","date":"2022-12","year":2022,"month":12,"price":2510.0,"mean":2528.1,"min":1600.0,"max":5755.0,"observations":869,"markets":524,"states":11},{"crop":"Wheat","date":"2023-01","year":2023,"month":1,"price":2575.0,"mean":2545.08,"min":660.0,"max":3540.0,"observations":244,"markets":153,"states":8},{"crop":"Wheat","date":"2023-02","year":2023,"month":2,"price":2650.0,"mean":2654.08,"min":1700.0,"max":4950.0,"observations":877,"markets":492,"states":10},{"crop":"Wheat","date":"2023-03","year":2023,"month":3,"price":2200.0,"mean":2268.64,"min":341.0,"max":4750.0,"observations":691,"markets":500,"states":11},{"crop":"Wheat","date":"2023-04","year":2023,"month":4,"price":2150.0,"mean":2228.2,"min":235.0,"max":4300.0,"observations":807,"markets":517,"states":12},{"crop":"Wheat","date":"2023-05","year":2023,"month":5,"price":2129.0,"mean":2197.43,"min":1500.0,"max":5690.0,"observations":1191,"markets":724,"states":15},{"crop":"Wheat","date":"2023-06","year":2023,"month":6,"price":2240.0,"mean":2290.61,"min":1800.0,"max":4726.0,"observations":1181,"markets":644,"states":14},{"crop":"Wheat","date":"2023-07","year":2023,"month":7,"price":2223.5,"mean":2271.0,"min":1600.0,"max":5070.0,"observations":892,"markets":550,"states":10},{"crop":"Wheat","date":"2023-08","year":2023,"month":8,"price":2325.0,"mean":2380.43,"min":1800.0,"max":4900.0,"observations":1105,"markets":615,"states":12},{"crop":"Wheat","date":"2023-09","year":2023,"month":9,"price":2340.0,"mean":2384.11,"min":1211.0,"max":4900.0,"observations":927,"markets":594,"states":13},{"crop":"Wheat","date":"2023-10","year":2023,"month":10,"price":2325.0,"mean":2352.01,"min":2030.0,"max":2950.0,"observations":264,"markets":177,"states":10},{"crop":"Wheat","date":"2023-11","year":2023,"month":11,"price":2500.0,"mean":2567.09,"min":1900.0,"max":7040.0,"observations":917,"markets":527,"states":11},{"crop":"Wheat","date":"2023-12","year":2023,"month":12,"price":2516.0,"mean":2567.37,"min":1700.0,"max":4050.0,"observations":921,"markets":524,"states":13},{"crop":"Wheat","date":"2024-01","year":2024,"month":1,"price":2500.0,"mean":2527.12,"min":1245.0,"max":4100.0,"observations":721,"markets":419,"states":11},{"crop":"Wheat","date":"2024-02","year":2024,"month":2,"price":2500.0,"mean":2515.77,"min":1500.0,"max":4150.0,"observations":799,"markets":440,"states":11},{"crop":"Wheat","date":"2024-03","year":2024,"month":3,"price":2400.0,"mean":2431.66,"min":1890.0,"max":4030.0,"observations":773,"markets":513,"states":10},{"crop":"Wheat","date":"2024-04","year":2024,"month":4,"price":2350.0,"mean":2398.31,"min":1900.0,"max":4450.0,"observations":1100,"markets":588,"states":13},{"crop":"Wheat","date":"2024-05","year":2024,"month":5,"price":2325.0,"mean":2387.06,"min":2000.0,"max":4100.0,"observations":1482,"markets":785,"states":12},{"crop":"Wheat","date":"2024-06","year":2024,"month":6,"price":2405.0,"mean":2452.82,"min":1750.0,"max":3950.0,"observations":1192,"markets":646,"states":13},{"crop":"Wheat","date":"2024-07","year":2024,"month":7,"price":2460.0,"mean":2510.82,"min":1850.0,"max":4550.0,"observations":1064,"markets":600,"states":14},{"crop":"Wheat","date":"2024-08","year":2024,"month":8,"price":2500.0,"mean":2565.64,"min":1805.0,"max":4400.0,"observations":1130,"markets":609,"states":13},{"crop":"Wheat","date":"2024-09","year":2024,"month":9,"price":2530.0,"mean":2537.52,"min":2122.0,"max":3250.0,"observations":346,"markets":195,"states":9},{"crop":"Wheat","date":"2024-10","year":2024,"month":10,"price":2690.0,"mean":2701.11,"min":1950.0,"max":4235.0,"observations":1207,"markets":619,"states":11},{"crop":"Wheat","date":"2024-11","year":2024,"month":11,"price":2792.5,"mean":2806.34,"min":1800.0,"max":4400.0,"observations":770,"markets":571,"states":11},{"crop":"Wheat","date":"2024-12","year":2024,"month":12,"price":2736.5,"mean":2733.15,"min":2240.0,"max":3751.0,"observations":218,"markets":155,"states":9},{"crop":"Wheat","date":"2025-01","year":2025,"month":1,"price":2910.5,"mean":2926.0,"min":2000.0,"max":4500.0,"observations":984,"markets":530,"states":11},{"crop":"Wheat","date":"2025-02","year":2025,"month":2,"price":2855.0,"mean":2847.84,"min":2000.0,"max":4500.0,"observations":979,"markets":528,"states":12},{"crop":"Wheat","date":"2025-03","year":2025,"month":3,"price":2750.0,"mean":2752.27,"min":1950.0,"max":4500.0,"observations":1098,"markets":556,"states":11},{"crop":"Wheat","date":"2025-04","year":2025,"month":4,"price":2450.0,"mean":2501.49,"min":1386.0,"max":4700.0,"observations":1691,"markets":742,"states":13},{"crop":"Wheat","date":"2025-05","year":2025,"month":5,"price":2450.0,"mean":2492.95,"min":1700.0,"max":4500.0,"observations":1698,"markets":825,"states":14},{"crop":"Wheat","date":"2025-06","year":2025,"month":6,"price":2480.0,"mean":2499.37,"min":1809.0,"max":3400.0,"observations":468,"markets":254,"states":10},{"crop":"Wheat","date":"2025-07","year":2025,"month":7,"price":2490.0,"mean":2505.25,"min":1800.0,"max":4200.0,"observations":1369,"markets":633,"states":11},{"crop":"Wheat","date":"2025-08","year":2025,"month":8,"price":2583.5,"mean":2601.42,"min":1570.0,"max":4750.0,"observations":1374,"markets":675,"states":13},{"crop":"Wheat","date":"2025-09","year":2025,"month":9,"price":2580.0,"mean":2600.62,"min":1500.0,"max":4700.0,"observations":1364,"markets":640,"states":13},{"crop":"Wheat","date":"2025-10","year":2025,"month":10,"price":2525.0,"mean":2560.0,"min":2000.0,"max":4800.0,"observations":1095,"markets":636,"states":10},{"crop":"Wheat","date":"2025-11","year":2025,"month":11,"price":2500.0,"mean":2521.58,"min":1700.0,"max":4850.0,"observations":889,"markets":532,"states":9},{"crop":"Wheat","date":"2025-12","year":2025,"month":12,"price":2480.0,"mean":2511.9,"min":1546.0,"max":4836.0,"observations":1261,"markets":561,"states":11}];

const visualMonthlyData = [{"month":1,"label":"Jan","index":106.32,"price":2820.74,"observations":407.0,"markets":257.0},{"month":2,"label":"Feb","index":104.88,"price":2814.59,"observations":447.8,"markets":275.4},{"month":3,"label":"Mar","index":103.7,"price":2841.96,"observations":399.3,"markets":254.6},{"month":4,"label":"Apr","index":102.01,"price":2817.18,"observations":382.2,"markets":242.3},{"month":5,"label":"May","index":99.57,"price":2755.07,"observations":364.7,"markets":240.0},{"month":6,"label":"Jun","index":102.8,"price":2834.09,"observations":434.5,"markets":269.2},{"month":7,"label":"Jul","index":105.49,"price":2862.49,"observations":406.5,"markets":253.2},{"month":8,"label":"Aug","index":109.38,"price":2941.22,"observations":400.4,"markets":249.7},{"month":9,"label":"Sep","index":110.91,"price":2943.65,"observations":384.5,"markets":242.3},{"month":10,"label":"Oct","index":109.85,"price":2892.24,"observations":384.1,"markets":243.4},{"month":11,"label":"Nov","index":114.08,"price":2966.16,"observations":394.0,"markets":257.4},{"month":12,"label":"Dec","index":114.09,"price":2998.13,"observations":424.8,"markets":264.0}];

const volatilityBands = [{"label":"Low","value":12.63,"count":1,"width":"35.7%"},{"label":"Moderate","value":20.65,"count":4,"width":"58.3%"},{"label":"High","value":35.42,"count":4,"width":"100.0%"}];

const insightMetrics = [
  {
    label: "Latest price spread",
    value: "₹5,800",
    detail: "highest vs lowest latest available crop price",
    icon: "↔",
  },
  {
    label: "Highest long-term growth",
    value: "Cotton",
    detail: "Historical insight across the 2015–2025 period",
    icon: "↗",
  },
  {
    label: "Highest volatility",
    value: "Onion",
    detail: "Highest historical coefficient of variation",
    icon: "≈",
  },
  {
    label: "Seasonality signal",
    value: "Recurring",
    detail: "Monthly patterns are evaluated across the historical series",
    icon: "⌁",
  },
];
const insights = [
  {
    number: "01",
    title: "Long-term movement",
    description:
      "Historical observations can reveal sustained changes in agricultural price levels over time.",
  },
  {
    number: "02",
    title: "Seasonal behavior",
    description:
      "Monthly patterns can expose recurring periods of stronger or weaker market activity.",
  },
  {
    number: "03",
    title: "Crop differences",
    description:
      "Individual commodities can exhibit substantially different price dynamics and volatility.",
  },
];


const cropNames = cropData.map((item) => item.crop);
const cropPriceMin = Math.min(...cropData.map((item) => item.price));
const cropPriceMax = Math.max(...cropData.map((item) => item.price));
const cropGrowthMin = Math.min(...cropData.map((item) => item.change));
const cropGrowthMax = Math.max(...cropData.map((item) => item.change));
const cropGrowthMagnitude = Math.max(
  Math.abs(cropGrowthMin),
  Math.abs(cropGrowthMax),
);
const cropVolatilityMax = Math.max(
  ...cropData.map((item) => item.volatility),
);

const formatPrice = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;

function InteractiveTrendChart({
  rows,
  height = 300,
}: {
  rows: typeof monthlyPriceData;
  height?: number;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const width = 760;
  const paddingLeft = 58;
  const paddingRight = 18;
  const paddingTop = 18;
  const paddingBottom = height >= 320 ? 44 : 30;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  if (!rows.length) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-slate-600">
        No monthly observations available for this crop.
      </div>
    );
  }

  const values = rows.flatMap((item) => [item.price, item.mean]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(maxValue - minValue, 1);
  const paddedMin = Math.max(0, minValue - range * 0.08);
  const paddedMax = maxValue + range * 0.08;
  const paddedRange = Math.max(paddedMax - paddedMin, 1);

  const xFor = (index: number) =>
    rows.length <= 1
      ? paddingLeft + chartWidth / 2
      : paddingLeft + (index * chartWidth) / (rows.length - 1);

  const yFor = (value: number) =>
    paddingTop + (1 - (value - paddedMin) / paddedRange) * chartHeight;

  const medianPoints = rows
    .map((item, index) => `${xFor(index)},${yFor(item.price)}`)
    .join(" ");

  const meanPoints = rows
    .map((item, index) => `${xFor(index)},${yFor(item.mean)}`)
    .join(" ");

  const areaPoints =
    rows.length > 1
      ? `${xFor(0)},${paddingTop + chartHeight} ${medianPoints} ${xFor(rows.length - 1)},${paddingTop + chartHeight}`
      : "";

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    value: paddedMax - ratio * paddedRange,
    y: paddingTop + ratio * chartHeight,
  }));

  const hovered = hoveredIndex !== null ? rows[hoveredIndex] : null;
  const hoveredX = hoveredIndex !== null ? xFor(hoveredIndex) : null;
  const tooltipLeft =
    hoveredX === null
      ? 50
      : Math.min(Math.max((hoveredX / width) * 100, 14), 86);

  return (
    <div
      className="relative h-full w-full"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * width;
          const rawIndex =
            ((x - paddingLeft) / chartWidth) * (rows.length - 1);
          setHoveredIndex(
            Math.min(rows.length - 1, Math.max(0, Math.round(rawIndex))),
          );
        }}
      >
        <defs>
          <linearGradient id="realTrendArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="realTrendLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="55%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>

        {gridLines.map((line) => (
          <g key={line.y}>
            <line
              x1={paddingLeft}
              x2={width - paddingRight}
              y1={line.y}
              y2={line.y}
              stroke="rgba(255,255,255,0.07)"
            />
            <text
              x={paddingLeft - 8}
              y={line.y + 3}
              textAnchor="end"
              fill="rgba(148,163,184,0.48)"
              fontSize="9"
            >
              {Math.round(line.value).toLocaleString("en-IN")}
            </text>
          </g>
        ))}

        {areaPoints && <polygon points={areaPoints} fill="url(#realTrendArea)" />}

        <polyline
          points={meanPoints}
          fill="none"
          stroke="rgba(103,232,249,0.38)"
          strokeWidth="2"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />

        <polyline
          points={medianPoints}
          fill="none"
          stroke="url(#realTrendLine)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {rows.map((item, index) => {
          const showPoint =
            rows.length <= 18 ||
            index % Math.max(1, Math.floor(rows.length / 12)) === 0;
          return showPoint ? (
            <circle
              key={`${item.date}-${index}`}
              cx={xFor(index)}
              cy={yFor(item.price)}
              r={hoveredIndex === index ? 5.5 : 3}
              fill="#07120e"
              stroke="#6ee7b7"
              strokeWidth={hoveredIndex === index ? 3 : 2}
            />
          ) : null;
        })}

        {hoveredIndex !== null && hoveredX !== null && (
          <>
            <line
              x1={hoveredX}
              x2={hoveredX}
              y1={paddingTop}
              y2={paddingTop + chartHeight}
              stroke="rgba(110,231,183,0.35)"
              strokeDasharray="4 5"
            />
            <circle
              cx={hoveredX}
              cy={yFor(rows[hoveredIndex].price)}
              r="7"
              fill="#07120e"
              stroke="#6ee7b7"
              strokeWidth="3"
            />
          </>
        )}

        <rect
          x={paddingLeft}
          y={paddingTop}
          width={chartWidth}
          height={chartHeight}
          fill="transparent"
          pointerEvents="all"
        />
      </svg>

      <div className="absolute bottom-1 left-[58px] right-[18px] flex justify-between text-[8px] uppercase tracking-wider text-slate-700">
        {[rows[0], rows[Math.floor(rows.length / 3)], rows[Math.floor((rows.length * 2) / 3)], rows[rows.length - 1]].map(
          (item, index) => (
            <span key={`${item.date}-${index}`}>{item.date}</span>
          ),
        )}
      </div>

      <div className="absolute left-[68px] top-3 flex flex-wrap gap-4 text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        <span>
          <i className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300" />
          Median modal price
        </span>
        <span>
          <i className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-300" />
          Mean modal price
        </span>
      </div>

      {hovered && hoveredIndex !== null && (
        <div
          className="pointer-events-none absolute top-3 z-20 w-[190px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#07120e]/95 p-3 shadow-2xl backdrop-blur-xl"
          style={{ left: `${tooltipLeft}%` }}
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-300">
            {hovered.date}
          </p>
          <div className="mt-2 space-y-1.5 text-[10px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Median</span>
              <span className="font-bold text-white">{formatPrice(hovered.price)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Mean</span>
              <span className="font-bold text-cyan-200">{formatPrice(hovered.mean)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Observations</span>
              <span className="font-bold text-slate-300">{hovered.observations.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Markets</span>
              <span className="font-bold text-slate-300">{hovered.markets.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/* Interactive Analytics Observatory                                          */
/* -------------------------------------------------------------------------- */

function AnalyticsLab() {
  const [labCrop, setLabCrop] = useState("Rice");
  const [labMetric, setLabMetric] = useState<"price" | "mean" | "observations" | "markets">("price");
  const [labYear, setLabYear] = useState("2025");
  const [sortMode, setSortMode] = useState<"price" | "change" | "volatility" | "coverage">("price");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [telemetryMetric, setTelemetryMetric] = useState<"price" | "mean" | "observations" | "markets">("price");

  const labRows = useMemo(
    () =>
      labCrop === "All"
        ? monthlyPriceData
        : monthlyPriceData.filter((row) => row.crop === labCrop),
    [labCrop],
  );

  const availableYears = useMemo(
    () => Array.from(new Set(labRows.map((row) => row.year))).sort((a, b) => a - b),
    [labRows],
  );

  const effectiveYear = availableYears.includes(Number(labYear))
    ? Number(labYear)
    : availableYears[availableYears.length - 1];

  const annualRows = useMemo(() => {
    const grouped = new Map<number, { prices: number[]; observations: number; markets: number }>();
    labRows.forEach((row) => {
      const current = grouped.get(row.year) ?? { prices: [], observations: 0, markets: 0 };
      current.prices.push(row.price);
      current.observations += row.observations;
      current.markets += row.markets;
      grouped.set(row.year, current);
    });
    return Array.from(grouped.entries())
      .map(([year, value]) => ({
        year,
        price: value.prices.reduce((a, b) => a + b, 0) / Math.max(value.prices.length, 1),
        observations: value.observations,
        markets: value.markets,
      }))
      .sort((a, b) => a.year - b.year);
  }, [labRows]);

  const latestYearRows = useMemo(() => {
    const grouped = new Map<string, { prices: number[]; observations: number; markets: number }>();
    monthlyPriceData
      .filter((row) => row.year === effectiveYear)
      .forEach((row) => {
        const current = grouped.get(row.crop) ?? { prices: [], observations: 0, markets: 0 };
        current.prices.push(row.price);
        current.observations += row.observations;
        current.markets += row.markets;
        grouped.set(row.crop, current);
      });

    return Array.from(grouped.entries())
      .map(([crop, value]) => ({
        crop,
        price: value.prices[value.prices.length - 1] ?? 0,
        change: value.prices.length > 1
          ? ((value.prices[value.prices.length - 1] / Math.max(value.prices[0], 1)) - 1) * 100
          : 0,
        volatility: value.prices.length > 1
          ? (Math.sqrt(value.prices.reduce((sum, price) => sum + Math.pow(price - (value.prices.reduce((a, b) => a + b, 0) / value.prices.length), 2), 0) / value.prices.length) / Math.max(value.prices.reduce((a, b) => a + b, 0) / value.prices.length, 1)) * 100
          : 0,
        observations: value.observations,
        markets: value.markets,
      }))
      .sort((a, b) => {
        if (sortMode === "change") return b.change - a.change;
        if (sortMode === "volatility") return b.volatility - a.volatility;
        if (sortMode === "coverage") return b.markets - a.markets;
        return b.price - a.price;
      });
  }, [effectiveYear, sortMode]);

  const seasonalRows = useMemo(() => {
    const grouped = new Map<number, { prices: number[]; observations: number; markets: number }>();
    labRows.forEach((row) => {
      const current = grouped.get(row.month) ?? { prices: [], observations: 0, markets: 0 };
      current.prices.push(row.price);
      current.observations += row.observations;
      current.markets += row.markets;
      grouped.set(row.month, current);
    });
    return Array.from(grouped.entries())
      .map(([month, value]) => ({
        month,
        label: new Date(2025, month - 1, 1).toLocaleString("en-US", { month: "short" }),
        price: value.prices.reduce((a, b) => a + b, 0) / Math.max(value.prices.length, 1),
        observations: value.observations,
        markets: value.markets,
      }))
      .sort((a, b) => a.month - b.month);
  }, [labRows]);

  const selectedYearRows = useMemo(
    () => labRows.filter((row) => row.year === effectiveYear).sort((a, b) => a.month - b.month),
    [labRows, effectiveYear],
  );

  const monthlyRangeRows = useMemo(
    () => labRows.slice(-12),
    [labRows],
  );

  const marketFootprint = useMemo(
    () => [...cropData].sort((a, b) => b.markets - a.markets),
    [],
  );

  const intensityRows = useMemo(
    () =>
      [...cropData]
        .map((row) => ({ ...row, intensity: row.observations / Math.max(row.markets, 1) }))
        .sort((a, b) => b.intensity - a.intensity),
    [],
  );

  const selectedTelemetry = useMemo(() => {
    const row = cropData.find((item) => item.crop === labCrop) ?? cropData[0];
    const latestRow = monthlyPriceData
      .filter((item) => item.crop === row.crop)
      .sort((a, b) => a.date.localeCompare(b.date))
      .at(-1);
    return { ...row, latestRow };
  }, [labCrop]);

  const telemetryRows = useMemo(
    () =>
      (labCrop === "All"
        ? monthlyPriceData.slice(-18)
        : monthlyPriceData.filter((row) => row.crop === labCrop).slice(-18)),
    [labCrop],
  );

  const metricValue = (row: (typeof monthlyPriceData)[number]) => {
    if (labMetric === "mean") return row.mean;
    if (labMetric === "observations") return row.observations;
    if (labMetric === "markets") return row.markets;
    return row.price;
  };

  const metricLabel =
    labMetric === "price"
      ? "Modal price"
      : labMetric === "mean"
        ? "Mean price"
        : labMetric === "observations"
          ? "Observations"
          : "Markets";

  const maxAnnual = Math.max(...annualRows.map((row) => row.price), 1);
  const maxSeasonal = Math.max(...seasonalRows.map((row) => row.price), 1);
  const maxActivity = Math.max(...seasonalRows.map((row) => row.observations), 1);
  const maxMarkets = Math.max(...marketFootprint.map((row) => row.markets), 1);
  const maxIntensity = Math.max(...intensityRows.map((row) => row.intensity), 1);
  const maxRange = Math.max(...monthlyRangeRows.map((row) => row.max), 1);
  const minRange = Math.min(...monthlyRangeRows.map((row) => row.min), 0);
  const telemetryMax = Math.max(...telemetryRows.map(metricValue), 1);
  const telemetryMin = Math.min(...telemetryRows.map(metricValue), 0);

  const pathPoints = (rows: typeof annualRows, valueKey: "price" | "observations" | "markets") =>
    rows
      .map((row, index) => {
        const x = 24 + (index / Math.max(rows.length - 1, 1)) * 452;
        const value = row[valueKey];
        const max = Math.max(...rows.map((item) => item[valueKey]), 1);
        const y = 196 - (value / max) * 156;
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <section className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
              Interactive Analytics Observatory
            </p>
            <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.8rem)] font-black leading-[0.94] tracking-[-0.05em]">
              More ways to interrogate
              <span className="block text-slate-600">the processed dataset.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Every visual below is calculated from the processed monthly crop-price observations and crop-level summaries already used by this analysis page. Change the controls to explore the dataset rather than looking at static decorative charts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-2 backdrop-blur-xl">
            <select
              value={labCrop}
              onChange={(event) => setLabCrop(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#07120e] px-3 py-2 text-[10px] font-semibold text-slate-200 outline-none focus:border-emerald-300/40"
              aria-label="Analytics Observatory crop"
            >
              <option value="All">All crops</option>
              {cropData.map((row) => <option key={row.crop} value={row.crop}>{row.crop}</option>)}
            </select>
            <select
              value={labYear}
              onChange={(event) => setLabYear(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#07120e] px-3 py-2 text-[10px] font-semibold text-slate-200 outline-none focus:border-emerald-300/40"
              aria-label="Analytics Observatory year"
            >
              {availableYears.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {/* 01 Annual trajectory */}
          <article className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/20 hover:bg-white/[0.04] sm:p-7">
            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-emerald-300/[0.05] blur-3xl animate-pulseGlow" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">01 / Annual trajectory</p>
                <h3 className="mt-2 text-xl font-black text-white">Year-by-year price path</h3>
                <p className="mt-1 text-xs text-slate-600">{labCrop === "All" ? "All crops" : labCrop} · annual mean of monthly modal prices</p>
              </div>
              <span className="rounded-full border border-emerald-300/10 bg-emerald-300/[0.05] px-3 py-1 text-[9px] font-bold text-emerald-200">{annualRows.length} YEARS</span>
            </div>
            <div className="relative mt-6 h-[245px] overflow-hidden rounded-2xl border border-white/[0.05] bg-black/10 p-3">
              <div className="absolute inset-0 bg-chart-grid opacity-20" />
              <svg viewBox="0 0 500 220" className="relative h-full w-full overflow-visible" role="img" aria-label="Annual price trajectory">
                <polyline points={pathPoints(annualRows, "price")} fill="none" stroke="rgb(110 231 183)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-drawLine" />
                {annualRows.map((row, index) => {
                  const x = 24 + (index / Math.max(annualRows.length - 1, 1)) * 452;
                  const y = 196 - (row.price / maxAnnual) * 156;
                  return <g key={row.year} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)} className="cursor-crosshair"><circle cx={x} cy={y} r={hoverIndex === index ? 6 : 4} fill="rgb(103 232 249)" className="transition-all duration-300" /><text x={x} y="214" textAnchor="middle" className="fill-slate-600 text-[8px]">{String(row.year).slice(2)}</text>{hoverIndex === index && <g><rect x={Math.min(Math.max(x - 48, 4), 396)} y={Math.max(y - 48, 4)} width="96" height="34" rx="8" fill="#07120e" stroke="rgba(110,231,183,.2)" /><text x={Math.min(Math.max(x, 52), 444)} y={Math.max(y - 29, 23)} textAnchor="middle" className="fill-white text-[9px]">₹{row.price.toFixed(0)}</text><text x={Math.min(Math.max(x, 52), 444)} y={Math.max(y - 17, 35)} textAnchor="middle" className="fill-slate-500 text-[7px]">{row.observations.toLocaleString()} obs</text></g>}</g>;
                })}
              </svg>
            </div>
          </article>

          {/* 02 Crop ladder */}
          <article className="group overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/20 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">02 / Crop ladder</p>
                <h3 className="mt-2 text-xl font-black text-white">Latest price landscape</h3>
              </div>
              <select value={sortMode} onChange={(event) => setSortMode(event.target.value as typeof sortMode)} className="rounded-xl border border-white/10 bg-[#07120e] px-3 py-2 text-[10px] font-semibold text-slate-300 outline-none">
                <option value="price">Sort: Price</option><option value="change">Sort: YoY change</option><option value="volatility">Sort: Volatility</option><option value="coverage">Sort: Markets</option>
              </select>
            </div>
            <div className="mt-5 space-y-2.5">
              {latestYearRows.map((row, index) => (
                <div key={row.crop} className="group/row grid grid-cols-[minmax(92px,1fr)_2fr_auto] items-center gap-3 rounded-xl border border-white/[0.04] bg-black/10 px-3 py-2.5 transition-all duration-300 hover:border-cyan-300/15 hover:bg-cyan-300/[0.025]" style={{ animationDelay: `${index * 45}ms` }}>
                  <span className="truncate text-[10px] font-bold text-slate-300">{row.crop}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]"><div className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300 transition-all duration-700 group-hover/row:brightness-125" style={{ width: `${Math.min((row.price / Math.max(...latestYearRows.map((item) => item.price), 1)) * 100, 100)}%` }} /></div>
                  <span className="w-16 text-right text-[10px] font-black text-white">₹{row.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </article>

          {/* 03 YoY movement */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">03 / Growth radar</p>
            <h3 className="mt-2 text-xl font-black text-white">Year-over-year movement</h3>
            <div className="mt-6 space-y-3">
              {[...cropData].sort((a, b) => b.change - a.change).map((row, index) => {
                const width = Math.min(Math.abs(row.change) / 100 * 100, 100);
                return <div key={row.crop} className="grid grid-cols-[105px_1fr_58px] items-center gap-3"><span className="truncate text-[10px] text-slate-500">{row.crop}</span><div className="relative h-2 rounded-full bg-white/[0.05]"><div className={`absolute top-0 h-2 rounded-full transition-all duration-700 ${row.change >= 0 ? "left-1/2 bg-emerald-300" : "right-1/2 bg-cyan-400"}`} style={{ width: `${width / 2}%` }} /></div><span className={`text-right text-[10px] font-bold ${row.change >= 0 ? "text-emerald-200" : "text-cyan-200"}`}>{row.change > 0 ? "+" : ""}{row.change.toFixed(1)}%</span></div>;
              })}
            </div>
          </article>

          {/* 04 Volatility spectrum */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">04 / Volatility spectrum</p>
            <h3 className="mt-2 text-xl font-black text-white">Coefficient of variation</h3>
            <div className="mt-6 grid grid-cols-3 items-end gap-3">
              {[...cropData].sort((a, b) => a.volatility - b.volatility).map((row, index) => <div key={row.crop} className="flex min-w-0 flex-col items-center gap-2"><div className="relative flex h-40 w-full items-end justify-center overflow-hidden rounded-xl bg-white/[0.025]"><div className="w-[68%] origin-bottom rounded-t-lg bg-gradient-to-t from-emerald-500/30 to-cyan-300 transition-all duration-1000" style={{ height: `${Math.max((row.volatility / Math.max(...cropData.map((item) => item.volatility), 1)) * 100, 8)}%`, animationDelay: `${index * 70}ms` }} /></div><span className="w-full truncate text-center text-[8px] text-slate-600">{row.crop}</span><span className="text-[9px] font-bold text-slate-300">{row.volatility.toFixed(1)}%</span></div>)}
            </div>
          </article>

          {/* 05 Footprint scatter */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">05 / Market footprint</p>
            <h3 className="mt-2 text-xl font-black text-white">Markets versus observations</h3>
            <div className="relative mt-5 h-[260px] rounded-2xl border border-white/[0.05] bg-black/10 p-4">
              <div className="absolute inset-4 border-b border-l border-white/[0.06]" />
              {cropData.map((row, index) => { const x = 18 + (row.markets / maxMarkets) * 72; const y = 88 - (row.observations / Math.max(...cropData.map((item) => item.observations), 1)) * 72; return <button key={row.crop} onMouseEnter={() => setHoverIndex(index + 100)} onMouseLeave={() => setHoverIndex(null)} className="absolute transition-transform duration-300 hover:scale-150" style={{ left: `${x}%`, top: `${y}%` }} title={`${row.crop}: ${row.markets} markets · ${row.observations} observations`}><span className={`block h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,.35)] ${hoverIndex === index + 100 ? "scale-150" : ""}`} /></button>; })}
              <span className="absolute bottom-1 left-2 text-[8px] uppercase tracking-wider text-slate-700">fewer markets</span><span className="absolute bottom-1 right-2 text-[8px] uppercase tracking-wider text-slate-700">more markets</span><span className="absolute left-2 top-2 text-[8px] uppercase tracking-wider text-slate-700">more observations</span>
            </div>
          </article>

          {/* 06 Seasonal profile */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3"><div><p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">06 / Seasonal profile</p><h3 className="mt-2 text-xl font-black text-white">Monthly price rhythm</h3></div><span className="text-[9px] font-bold text-emerald-200">{labCrop === "All" ? "ALL CROPS" : labCrop.toUpperCase()}</span></div>
            <div className="mt-7 grid grid-cols-12 items-end gap-1.5 sm:gap-2">
              {seasonalRows.map((row, index) => <button key={row.month} onMouseEnter={() => setHoverIndex(index + 200)} onMouseLeave={() => setHoverIndex(null)} className="group/month flex min-w-0 flex-col items-center gap-2"><div className="relative flex h-40 w-full items-end rounded-lg bg-white/[0.02]"><div className="w-full rounded-t-md bg-gradient-to-t from-teal-500/40 to-emerald-200 transition-all duration-700 group-hover/month:brightness-125" style={{ height: `${Math.max((row.price / maxSeasonal) * 100, 8)}%` }} />{hoverIndex === index + 200 && <span className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#07120e] px-2 py-1 text-[8px] text-white">₹{row.price.toFixed(0)}</span>}</div><span className="text-[8px] text-slate-600">{row.label}</span></button>)}
            </div>
          </article>

          {/* 07 Monthly range */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">07 / Distribution envelope</p>
            <h3 className="mt-2 text-xl font-black text-white">Observed monthly price range</h3>
            <div className="mt-6 space-y-2.5">
              {monthlyRangeRows.map((row, index) => { const left = ((row.min - minRange) / Math.max(maxRange - minRange, 1)) * 100; const width = ((row.max - row.min) / Math.max(maxRange - minRange, 1)) * 100; return <div key={row.date} className="grid grid-cols-[48px_1fr_60px] items-center gap-3"><span className="text-[8px] text-slate-600">{row.date.slice(2)}</span><div className="relative h-2 rounded-full bg-white/[0.04]"><div className="absolute h-2 rounded-full bg-gradient-to-r from-cyan-400/40 to-emerald-300" style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }} /><span className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#07120e] bg-white" style={{ left: `${((row.price - minRange) / Math.max(maxRange - minRange, 1)) * 100}%` }} /></div><span className="text-right text-[8px] text-slate-500">₹{row.price.toLocaleString()}</span></div>; })}
            </div>
          </article>

          {/* 08 Activity by month */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <div className="flex items-start justify-between"><div><p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">08 / Observation activity</p><h3 className="mt-2 text-xl font-black text-white">Where the dataset is busiest</h3></div><span className="rounded-full border border-white/10 px-2 py-1 text-[8px] text-slate-600">MONTHLY</span></div>
            <div className="mt-7 grid grid-cols-12 items-end gap-1.5">
              {seasonalRows.map((row, index) => <div key={row.month} className="group/activity flex min-w-0 flex-col items-center gap-2"><div className="relative h-40 w-full overflow-hidden rounded-md bg-white/[0.02]"><div className="absolute bottom-0 w-full origin-bottom rounded-t-md bg-gradient-to-t from-cyan-500/40 to-cyan-200 transition-all duration-700 group-hover/activity:brightness-125" style={{ height: `${Math.max((row.observations / maxActivity) * 100, 6)}%` }} /><span className="absolute inset-x-0 top-1 text-center text-[7px] text-slate-600 opacity-0 transition group-hover/activity:opacity-100">{row.observations}</span></div><span className="text-[8px] text-slate-600">{row.label}</span></div>)}
            </div>
          </article>

          {/* 09 Market reach */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">09 / Geographic footprint</p>
            <h3 className="mt-2 text-xl font-black text-white">Market reach by crop</h3>
            <div className="mt-6 space-y-3">
              {marketFootprint.map((row, index) => <div key={row.crop} className="grid grid-cols-[110px_1fr_42px] items-center gap-3"><span className="truncate text-[10px] text-slate-500">{row.crop}</span><div className="h-2 overflow-hidden rounded-full bg-white/[0.04]"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-700" style={{ width: `${(row.markets / maxMarkets) * 100}%`, animationDelay: `${index * 50}ms` }} /></div><span className="text-right text-[9px] font-bold text-slate-300">{row.markets}</span></div>)}
            </div>
          </article>

          {/* 10 Observation intensity */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">10 / Observation intensity</p>
            <h3 className="mt-2 text-xl font-black text-white">Observations captured per market</h3>
            <div className="mt-6 space-y-3">
              {intensityRows.map((row, index) => <div key={row.crop} className="grid grid-cols-[110px_1fr_48px] items-center gap-3"><span className="truncate text-[10px] text-slate-500">{row.crop}</span><div className="h-2 overflow-hidden rounded-full bg-white/[0.04]"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-200 transition-all duration-700" style={{ width: `${(row.intensity / maxIntensity) * 100}%` }} /></div><span className="text-right text-[9px] font-bold text-emerald-200">{row.intensity.toFixed(1)}×</span></div>)}
            </div>
          </article>

          {/* 11 Metric switcher */}
          <article className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">11 / Metric switcher</p><h3 className="mt-2 text-xl font-black text-white">Change the signal, keep the data</h3></div><div className="flex flex-wrap gap-1 rounded-xl border border-white/[0.06] bg-black/10 p-1">{(["price", "mean", "observations", "markets"] as const).map((metric) => <button key={metric} onClick={() => setLabMetric(metric)} className={`rounded-lg px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-wider transition-all ${labMetric === metric ? "bg-emerald-300/15 text-emerald-200" : "text-slate-600 hover:text-slate-300"}`}>{metric}</button>)}</div></div>
            <p className="mt-5 text-xs text-slate-600">{metricLabel} · {labCrop === "All" ? "all crops" : labCrop}</p>
            <div className="mt-5 grid grid-cols-12 items-end gap-1.5">
              {selectedYearRows.map((row, index) => { const value = metricValue(row); const max = Math.max(...selectedYearRows.map(metricValue), 1); return <div key={row.date} className="group/metric flex min-w-0 flex-col items-center gap-2"><div className="relative h-36 w-full rounded-md bg-white/[0.02]"><div className="absolute bottom-0 w-full origin-bottom rounded-t-md bg-gradient-to-t from-emerald-500/30 to-cyan-300 transition-all duration-700 group-hover/metric:brightness-125" style={{ height: `${Math.max((value / max) * 100, 5)}%` }} /><span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] text-slate-500 opacity-0 transition group-hover/metric:opacity-100">{labMetric === "price" || labMetric === "mean" ? `₹${value.toFixed(0)}` : value.toLocaleString()}</span></div><span className="text-[7px] text-slate-700">{row.month}</span></div>; })}
            </div>
          </article>

          {/* 12 Telemetry */}
          <article className="group overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/20 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">12 / Crop telemetry</p><h3 className="mt-2 text-xl font-black text-white">Selected crop at a glance</h3></div><div className="flex gap-1 rounded-xl border border-white/[0.06] bg-black/10 p-1">{(["price", "mean", "observations", "markets"] as const).map((metric) => <button key={metric} onClick={() => setTelemetryMetric(metric)} className={`rounded-lg px-2 py-1.5 text-[8px] font-bold uppercase transition ${telemetryMetric === metric ? "bg-cyan-300/10 text-cyan-200" : "text-slate-700 hover:text-slate-300"}`}>{metric === "observations" ? "obs" : metric}</button>)}</div></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
              <div className="rounded-2xl border border-white/[0.05] bg-black/10 p-5"><p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">{selectedTelemetry.crop}</p><p className="mt-2 text-3xl font-black text-white">{telemetryMetric === "price" ? `₹${(selectedTelemetry.latestRow?.price ?? selectedTelemetry.price).toLocaleString()}` : telemetryMetric === "mean" ? `₹${(selectedTelemetry.latestRow?.mean ?? selectedTelemetry.price).toLocaleString()}` : telemetryMetric === "observations" ? (selectedTelemetry.latestRow?.observations ?? selectedTelemetry.observations).toLocaleString() : (selectedTelemetry.latestRow?.markets ?? selectedTelemetry.markets).toLocaleString()}</p><p className="mt-2 text-[9px] text-slate-600">Latest available: {selectedTelemetry.latest} · {selectedTelemetry.states} states</p></div>
              <div className="relative h-36 rounded-2xl border border-white/[0.05] bg-black/10 p-3"><svg viewBox="0 0 480 150" className="h-full w-full"><polyline points={telemetryRows.map((row, index) => { const value = telemetryMetric === "price" ? row.price : telemetryMetric === "mean" ? row.mean : telemetryMetric === "observations" ? row.observations : row.markets; const x = 8 + (index / Math.max(telemetryRows.length - 1, 1)) * 464; const y = 136 - ((value - telemetryMin) / Math.max(telemetryMax - telemetryMin, 1)) * 116; return `${x},${y}`; }).join(" ")} fill="none" stroke="rgb(103 232 249)" strokeWidth="2.5" strokeLinecap="round" className="animate-drawLine" /></svg><div className="absolute bottom-2 left-3 text-[7px] uppercase tracking-wider text-slate-700">18-month telemetry window</div></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function AnalysisPage() {
  const [visible] = useState(true);
  const [sortBy, setSortBy] = useState("price");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [trendCrop, setTrendCrop] = useState("Rice");

  const selectedTrendRows = useMemo(
    () => monthlyPriceData.filter((item) => item.crop === trendCrop),
    [trendCrop],
  );

  const peak = useMemo(
    () =>
      visualMonthlyData.reduce(
        (highest, item) => (item.index > highest.index ? item : highest),
        visualMonthlyData[0],
      ),
    [],
  );

  const vol_max = useMemo(
    () =>
      cropData.reduce(
        (highest, item) =>
          item.volatility > highest.volatility ? item : highest,
        cropData[0],
      ),
    [],
  );

  const filteredCropData = useMemo(() => {
    const filtered = cropData.filter((item) => {
      const cropMatch = selectedCrop === "All" || item.crop === selectedCrop;
      const countryMatch =
        selectedCountry === "All" || item.country === selectedCountry;

      return cropMatch && countryMatch;
    });

    return [...filtered].sort((a, b) => {
      const first = a[sortBy as keyof typeof a];
      const second = b[sortBy as keyof typeof b];

      if (typeof first === "string" && typeof second === "string") {
        return sortDirection === "asc"
          ? first.localeCompare(second)
          : second.localeCompare(first);
      }

      return sortDirection === "asc"
        ? Number(first) - Number(second)
        : Number(second) - Number(first);
    });
  }, [selectedCrop, selectedCountry, sortBy, sortDirection]);

  const toggleSort = (
    field: "crop" | "country" | "price" | "change" | "volatility",
  ) => {
    if (sortBy === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection(
        field === "crop" || field === "country" ? "asc" : "desc",
      );
    }
  };

  const sortIcon = (field: string) => {
    if (sortBy !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#040b08] text-white selection:bg-emerald-300 selection:text-[#04100b]">
      {" "}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {" "}
        <div className="absolute left-[-12%] top-[-10%] h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px] animate-floatSlow" />
        <div className="absolute right-[-12%] top-[18%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[140px] animate-floatReverse" />
        <div className="absolute bottom-[-12%] left-[28%] h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[130px] animate-float" />
        <div className="absolute inset-0 opacity-[0.055] bg-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,11,8,0.72)_80%)]" />
      </div>
      {/* =========================================================
          SHARED NAVBAR
          Uses the same navbar dimensions and responsive layout as
          the homepage via app/components/navbar.tsx.
      ========================================================= */}
      <Navbar />
      <section
        id="analysis"
        className={`relative z-10 flex min-h-screen items-center px-5 pb-16 pt-40 transition-all duration-1000 sm:px-6 sm:pb-20 sm:pt-48 lg:px-8 lg:pt-32 ${
          visible ? "opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-4 py-2 backdrop-blur-xl animate-fadeIn">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Analytical Overview
              </span>
            </div>

            <h1 className="max-w-full break-words text-[clamp(2.45rem,11vw,6.7rem)] font-black leading-[0.91] tracking-[-0.055em]">
              Understanding
              <span className="block bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-gradientShift">
                Food Prices
              </span>
              Through Data.
            </h1>

            <p className="mt-8 max-w-2xl text-[clamp(1rem,1.6vw,1.18rem)] leading-8 text-slate-400">
              Explore historical agricultural price movements, crop-level
              behavior, seasonal patterns, and market trends uncovered through
              systematic data analysis.
            </p>

            <div className="mt-10 flex w-full max-w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#trends"
                className="group relative inline-flex w-full min-w-0 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-emerald-300 px-5 py-4 text-sm font-bold text-[#03100a] shadow-[0_0_40px_rgba(110,231,183,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_55px_rgba(110,231,183,0.25)] sm:w-auto sm:px-6"
              >
                <span className="relative z-10">Explore Analysis</span>

                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7L10 12L15 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
              </a>

              <a
                href="#dashboard"
                className="inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm font-semibold text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/20 hover:bg-white/[0.06] sm:w-auto sm:px-6"
              >
                Dashboard Preview
                <span className="text-emerald-300">→</span>
              </a>
            </div>

            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a href="#dashboard" className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-cyan-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.1] hover:shadow-[0_12px_40px_rgba(34,211,238,0.12)] sm:w-auto">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)] transition-transform duration-300 group-hover:scale-125" />
                Go to Dashboards
                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
              <a href="#tableau-dashboard" className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.05] hover:text-white sm:w-auto">
                Tableau
                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
              <a href="#powerbi-dashboard" className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[0.05] hover:text-white sm:w-auto">
                Power BI
                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-3 gap-3 sm:gap-5">
              {[
                ["484,504", "Raw Price Observations"],
                ["9", "Complete Forecasting Crops"],
                ["2015–2025", "Historical Coverage"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300/15 hover:bg-emerald-300/[0.035]"
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                >
                  <div className="text-xl font-black tracking-tight text-white sm:text-2xl">
                    {value}
                  </div>

                  <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500 sm:text-[11px]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto min-w-0 w-full max-w-[650px]">
            <div className="absolute -inset-8 rounded-[40px] bg-emerald-300/[0.04] blur-3xl animate-pulseGlow" />

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#07120e]/80 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-7 animate-floatSlow">
              <div className="absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative flex items-center justify-between border-b border-white/[0.07] pb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/70">
                    Market Analytics
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    Historical Price Movement
                  </h2>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[0.05] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-[10px] font-medium text-emerald-200">
                    ANALYTICS
                  </span>
                </div>
              </div>

              <div className="relative mt-7 h-[300px] overflow-hidden rounded-2xl border border-white/[0.06] bg-black/10 p-2">
                <div className="absolute right-4 top-4 z-10">
                  <select
                    value={trendCrop}
                    onChange={(event) => setTrendCrop(event.target.value)}
                    className="rounded-lg border border-white/10 bg-[#07120e]/90 px-2.5 py-1.5 text-[9px] font-semibold text-slate-200 outline-none backdrop-blur-xl focus:border-emerald-300/40"
                    aria-label="Select crop for historical price chart"
                  >
                    {cropNames.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="absolute inset-0 bg-chart-grid opacity-30" />
                <InteractiveTrendChart rows={selectedTrendRows} height={300} />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ["Trend", selectedTrendRows.length ? `${selectedTrendRows[0].date} → ${selectedTrendRows[selectedTrendRows.length - 1].date}` : "Unavailable"],
                  ["Seasonality", `${peak.label} peak`],
                  ["Volatility", `${vol_max["volatility"].toFixed(1)}% CV`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"
                  >
                    <div className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                      {label}
                    </div>

                    <div className="mt-1 text-xs font-semibold text-slate-200">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">
              Analytical Framework
            </p>

            <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.045em]">
              Four ways to read
              <span className="block text-slate-500">
                the agricultural market.
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {analysisCards.map((card, index) => (
              <article
                key={card.number}
                className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-3 hover:border-emerald-300/20 hover:bg-white/[0.045] hover:shadow-[0_25px_80px_rgba(0,0,0,0.25)] animate-fadeUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute right-[-30px] top-[-30px] h-32 w-32 rounded-full bg-emerald-300/[0.04] blur-2xl transition-all duration-500 group-hover:bg-emerald-300/[0.09]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-emerald-300/20 transition-colors duration-500 group-hover:text-emerald-300/50">
                      {card.number}
                    </span>

                    <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] text-slate-500">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="mt-10 text-xl font-bold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500 transition-colors duration-500 group-hover:text-slate-400">
                    {card.description}
                  </p>

                  <div className="mt-7 h-px w-10 bg-emerald-300/30 transition-all duration-500 group-hover:w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="trends"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
              01 / Time Series
            </p>

            <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em]">
              Price trends
              <span className="block text-slate-600">over time.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Time-series analysis helps reveal the broader direction of food
              prices and highlights periods where market conditions changed
              significantly.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 animate-fadeUp">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  Trend direction
                </p>

                <p className="mt-2 text-2xl font-black text-emerald-200">
                  Rising
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 animate-fadeUp">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                  Pattern
                </p>

                <p className="mt-2 text-2xl font-black text-cyan-200">
                  Seasonal
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#07120e]/75 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/[0.025] via-transparent to-cyan-300/[0.025]" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                  Historical series
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {trendCrop} monthly price movement
                </p>
              </div>

              <select
                value={trendCrop}
                onChange={(event) => setTrendCrop(event.target.value)}
                className="rounded-xl border border-white/10 bg-[#07120e] px-3 py-2 text-[10px] font-semibold text-slate-200 outline-none focus:border-emerald-300/40"
                aria-label="Select crop for trend analysis"
              >
                {cropNames.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative mt-8 h-[300px] rounded-2xl border border-white/[0.05] bg-[#06100c] p-2">
              <div className="absolute inset-0 bg-chart-grid opacity-30" />
              <InteractiveTrendChart rows={selectedTrendRows} height={300} />
            </div>

            <p className="relative mt-12 text-[10px] leading-5 text-slate-600">
              Real monthly median and mean modal prices from the processed
              AGMARKNET dataset. Hover over the chart to inspect observations
              and market coverage for each month.
            </p>
          </div>
        </div>
      </section>
      <section
        id="crops"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">
              02 / Crop Comparison
            </p>
            <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em]">
              Every crop
              <span className="block text-slate-600">
                tells a different story.
              </span>
            </h2>
            <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Compare commodities using interactive sorting and filtering
              controls. The visual ranking updates instantly so the same
              analytical surface can be inspected by price, growth, volatility,
              crop, or country.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.025] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-7">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-300/[0.06] blur-3xl animate-pulseGlow" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-cyan-300/[0.04] blur-3xl animate-floatSlow" />

            <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                  Interactive data explorer
                </p>
                <h3 className="mt-1 text-xl font-bold text-white">
                  Sort, filter & inspect
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:flex-wrap">
                <label className="min-w-[150px]">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">
                    Crop
                  </span>
                  <select
                    value={selectedCrop}
                    onChange={(event) => setSelectedCrop(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#07120e] px-3 py-2.5 text-xs font-semibold text-slate-200 outline-none transition-all duration-300 focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10"
                  >
                    <option value="All">All crops</option>
                    {cropData.map((item) => (
                      <option key={item.crop} value={item.crop}>
                        {item.crop}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="min-w-[150px]">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">
                    Country
                  </span>
                  <select
                    value={selectedCountry}
                    onChange={(event) => setSelectedCountry(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#07120e] px-3 py-2.5 text-xs font-semibold text-slate-200 outline-none transition-all duration-300 focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10"
                  >
                    <option value="All">All countries</option>
                    {[...new Set(cropData.map((item) => item.country))].map(
                      (country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ),
                    )}
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-7 overflow-x-auto rounded-2xl border border-white/[0.06]">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.025]">
                    {[
                      ["crop", "Crop"],
                      ["country", "Country"],
                      ["price", "Price"],
                      ["change", "Growth"],
                      ["volatility", "Volatility"],
                    ].map(([field, label]) => (
                      <th key={field} className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            toggleSort(
                              field as
                                | "crop"
                                | "country"
                                | "price"
                                | "change"
                                | "volatility",
                            )
                          }
                          className="group inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 transition-colors duration-300 hover:text-emerald-200"
                        >
                          {label}
                          <span className="text-emerald-300/60 transition-transform duration-300 group-hover:scale-125">
                            {sortIcon(field)}
                          </span>
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredCropData.map((item, index) => (
                    <tr
                      key={item.crop}
                      className="group border-b border-white/[0.05] last:border-0 transition-all duration-300 hover:bg-emerald-300/[0.035]"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/10 bg-emerald-300/[0.05] text-[10px] font-black text-emerald-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {item.crop}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-xs text-slate-500">
                        {item.country}
                      </td>
                      <td className="px-4 py-5 text-sm font-black text-white">
                        ₹{item.price.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-5">
                        <span className="rounded-full bg-emerald-300/10 px-2.5 py-1 text-[10px] font-bold text-emerald-200">
                          +{item.change.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex min-w-[150px] items-center gap-3">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 transition-all duration-700 group-hover:brightness-125"
                              style={{
                                width: `${Math.min((item.volatility / Math.max(cropVolatilityMax, 1)) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <span className="w-12 text-right text-xs font-bold text-slate-300">
                            {item.volatility.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col gap-3 text-[10px] leading-5 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {filteredCropData.length} of {cropData.length} crops.
                Latest available monthly values are shown for the 9 complete forecasting crop series. Lentil is retained in historical coverage but excluded from forecasting because its history is incomplete.
              </span>
              <span className="text-emerald-300/60">
                Click any column heading to reverse the sort.
              </span>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                      Visual ranking
                    </p>
                    <p className="mt-1 text-base font-bold text-white">
                      Price comparison
                    </p>
                  </div>
                  <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-[9px] font-semibold text-cyan-200">
                    DYNAMIC
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {filteredCropData.map((item, index) => (
                    <div key={`${item.crop}-bar`} className="group">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">
                          {item.crop}
                        </span>
                        <span className="font-black text-white">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-400/60 via-teal-300/80 to-cyan-200 animate-barRise transition-all duration-700 group-hover:brightness-125"
                          style={{
                            width: `${Math.min((item.price / Math.max(cropPriceMax, 1)) * 100, 100)}%`,
                            animationDelay: `${index * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-5">
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                  Analytical note
                </p>
                <p className="mt-3 text-lg font-bold leading-7 text-white">
                  Rankings expose differences that averages can hide.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sorting by price, growth, or volatility changes the lens
                  without changing the underlying observations. This makes the
                  analysis easier to audit and easier to connect with later
                  forecasting features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="evidence"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
              Evidence Lab / Visual Proof
            </p>
            <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em]">
              Patterns you can
              <span className="block bg-gradient-to-r from-cyan-200 via-teal-300 to-emerald-200 bg-clip-text text-transparent animate-gradientShift">
                actually see.
              </span>
            </h2>
            <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              A visual evidence layer makes analytical claims inspectable.
              These views are driven by the processed monthly crop-price dataset,
              with price, growth, volatility, seasonality, and market-coverage
              measures calculated from recorded observations.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <div className="group relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/[0.06] blur-3xl transition-all duration-700 group-hover:scale-125" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                    Distribution view
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Price vs. growth
                  </h3>
                </div>
                <span className="rounded-full border border-cyan-300/10 bg-cyan-300/[0.05] px-3 py-1.5 text-[9px] font-semibold text-cyan-200">
                  SCATTER
                </span>
              </div>

              <div className="relative mt-7 h-[330px] overflow-hidden rounded-2xl border border-white/[0.05] bg-[#06100c]">
                <div className="absolute inset-0 bg-chart-grid opacity-30" />
                <div className="absolute inset-x-8 bottom-8 top-7 border-l border-b border-white/[0.08]" />

                {filteredCropData.map((item) => (
                  <div
                    key={`${item.crop}-point`}
                    className="group/point absolute"
                    style={{
                      left: `${8 + ((item.price - cropPriceMin) / Math.max(cropPriceMax - cropPriceMin, 1)) * 84}%`,
                      bottom: `${10 + ((item.change - cropGrowthMin) / Math.max(cropGrowthMax - cropGrowthMin, 1)) * 80}%`,
                    }}
                  >
                    <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-md animate-pulse" />
                    <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-emerald-200 bg-emerald-400 shadow-[0_0_20px_rgba(110,231,183,0.45)] transition-transform duration-300 group-hover/point:scale-150" />
                    <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#07120e]/95 px-2 py-1 text-[9px] font-semibold text-white opacity-0 shadow-xl transition-all duration-300 group-hover/point:opacity-100">
                      {item.crop} · ₹{item.price.toLocaleString("en-IN")} · +
                      {item.change.toFixed(1)}%
                    </span>
                  </div>
                ))}

                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.18em] text-slate-700">
                  Price
                </span>
                <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] uppercase tracking-[0.18em] text-slate-700">
                  Growth
                </span>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-emerald-300/[0.06] blur-3xl transition-all duration-700 group-hover:scale-125" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                    Comparative signal
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Growth profile by crop
                  </h3>
                </div>
                <span className="rounded-full border border-emerald-300/10 bg-emerald-300/[0.05] px-3 py-1.5 text-[9px] font-semibold text-emerald-200">
                  BAR VIEW
                </span>
              </div>

              <div className="mt-7 space-y-5">
                {filteredCropData.map((item, index) => (
                  <div key={`${item.crop}-growth`} className="group/bar">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">
                        {item.crop}
                      </span>
                      <span className="text-xs font-black text-emerald-200">
                        +{item.change.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 animate-barRise transition-all duration-700 group-hover/bar:brightness-125"
                        style={{
                          width: `${Math.min((Math.abs(item.change) / Math.max(cropGrowthMagnitude, 1)) * 100, 100)}%`,
                          animationDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.05] bg-black/10 p-4">
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                  Read the chart
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Growth is year-over-year change for each crop&apos;s latest
                  available month versus the same month in the prior year.
                  Potato has a shorter historical coverage window.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="visual-observatory"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                Visual Observatory / Multiple Views
              </p>
              <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em]">
                One dataset.
                <span className="block bg-gradient-to-r from-emerald-200 via-cyan-300 to-teal-200 bg-clip-text text-transparent animate-gradientShift">
                  many ways to read it.
                </span>
              </h2>
              <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                Multiple visual encodings make it easier to inspect trends,
                compare magnitude, spot volatility, and understand relationships.
                Every panel below is calculated from the processed monthly crop
                price records.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.035] px-4 py-3 text-xs text-emerald-200/80 backdrop-blur-xl">
              06 data-driven visual panels
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <article className="group relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-300/[0.06] blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                    Trend matrix
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Monthly price movement
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-300/10 px-3 py-1.5 text-[9px] font-bold text-emerald-200">
                  LINE + AREA
                </span>
              </div>

              <div className="relative mt-7 h-[280px] overflow-hidden rounded-2xl border border-white/[0.05] bg-[#06100c] p-4">
                <div className="absolute inset-0 bg-chart-grid opacity-30" />
                <div className="absolute inset-x-5 bottom-8 top-5 flex items-end gap-1.5 sm:gap-2">
                  {visualMonthlyData.map((item, index) => (
                    <div
                      key={item.month}
                      className="group/month relative flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-emerald-500/20 via-teal-300/50 to-cyan-200/70 animate-barRise transition-all duration-500 group-hover/month:brightness-125"
                        style={{
                          height: `${item.price}%`,
                          animationDelay: `${index * 60}ms`,
                        }}
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-slate-700">
                        {item.month}
                      </span>
                      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-[#07120e] px-1.5 py-1 text-[8px] font-bold text-emerald-200 opacity-0 transition-opacity group-hover/month:opacity-100">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-8 text-[10px] leading-5 text-slate-600">
                Normalized seasonal price index across the nine crop series;
                100 represents each crop&apos;s historical median price.
              </p>
            </article>

            <article className="group relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-300/[0.06] blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                    Relationship view
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Price, observations & market coverage
                  </h3>
                </div>
                <span className="rounded-full bg-cyan-300/10 px-3 py-1.5 text-[9px] font-bold text-cyan-200">
                  MULTI-SERIES
                </span>
              </div>

              <div className="relative mt-7 h-[280px] overflow-hidden rounded-2xl border border-white/[0.05] bg-[#06100c] p-5">
                <div className="absolute inset-0 bg-chart-grid opacity-25" />
                <div className="relative flex h-full items-end gap-2 sm:gap-3">
                  {visualMonthlyData.map((item, index) => (
                    <div
                      key={item.month}
                      className="group/series flex h-full flex-1 items-end justify-center gap-0.5"
                    >
                      <div
                        className="w-1/3 rounded-t-sm bg-emerald-300/70 transition-all duration-500 group-hover/series:brightness-125"
                        style={{
                          height: `${Math.min(
                            (item.price / Math.max(...visualMonthlyData.map((row) => row.price))) * 100,
                            100,
                          )}%`,
                          animationDelay: `${index * 50}ms`,
                        }}
                      />
                      <div
                        className="w-1/3 rounded-t-sm bg-cyan-300/60 transition-all duration-500 group-hover/series:brightness-125"
                        style={{
                          height: `${Math.min(
                            (item.observations /
                              Math.max(...visualMonthlyData.map((row) => row.observations))) *
                              100,
                            100,
                          )}%`,
                        }}
                      />
                      <div
                        className="w-1/3 rounded-t-sm bg-teal-200/45 transition-all duration-500 group-hover/series:brightness-125"
                        style={{
                          height: `${Math.min(
                            (item.markets /
                              Math.max(...visualMonthlyData.map((row) => row.markets))) *
                              100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                <span>
                  <i className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300" />
                  Price
                </span>
                <span>
                  <i className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-300" />
                  Observations
                </span>
                <span>
                  <i className="mr-2 inline-block h-2 w-2 rounded-full bg-teal-200" />
                  Markets
                </span>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-teal-300/[0.06] blur-3xl animate-pulseGlow" />
              <p className="relative text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Distribution lens
              </p>
              <h3 className="relative mt-1 text-lg font-bold text-white">
                Volatility bands
              </h3>
              <div className="relative mt-8 space-y-6">
                {volatilityBands.map((band, index) => (
                  <div key={band.label} className="group">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">
                        {band.label}
                      </span>
                      <span className="text-xs font-black text-teal-200">
                        {band.value}%
                      </span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-400/60 via-emerald-300/80 to-cyan-200/80 animate-barRise transition-all duration-700 group-hover:brightness-125"
                        style={{
                          width: band.width,
                          animationDelay: `${index * 130}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-white/[0.05] bg-black/10 p-4 text-xs leading-6 text-slate-500">
                Bands are based on each crop&apos;s historical coefficient of
                variation: Low &lt; 15%, Moderate 15–25%, High ≥ 25%.
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Analytical pulse
              </p>
              <h3 className="mt-1 text-lg font-bold text-white">
                Current comparison signals
              </h3>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {insightMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/10 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/15 animate-fadeUp"
                  >
                    <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-emerald-300/[0.05] blur-xl" />
                    <div className="relative flex items-center justify-between">
                      <span className="text-lg text-emerald-300/70">
                        {metric.icon}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.14em] text-slate-700">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="relative mt-5 text-[9px] uppercase tracking-[0.15em] text-slate-600">
                      {metric.label}
                    </p>
                    <p className="relative mt-1 text-xl font-black text-white">
                      {metric.value}
                    </p>
                    <p className="relative mt-1 text-[9px] text-slate-600">
                      {metric.detail}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/[0.025] to-cyan-300/[0.025]" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                    Seasonality map
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Monthly intensity heatmap
                  </h3>
                </div>
                <span className="rounded-full bg-teal-300/10 px-3 py-1.5 text-[9px] font-bold text-teal-200">
                  12 MONTHS
                </span>
              </div>
              <div className="relative mt-7 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {visualMonthlyData.map((item, index) => (
                  <div
                    key={item.month}
                    className="group/cell relative aspect-square overflow-hidden rounded-xl border border-white/[0.05] bg-emerald-300/[0.04] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:border-emerald-300/20"
                    style={{ opacity: 0.35 + item.index / 140 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-cyan-300/5" />
                    <div className="relative flex h-full flex-col items-center justify-center">
                      <span className="text-[9px] font-bold uppercase text-slate-500">
                        {item.month}
                      </span>
                      <span className="mt-1 text-sm font-black text-emerald-200">
                        {item.index}
                      </span>
                    </div>
                    <span className="pointer-events-none absolute inset-x-1 bottom-1 rounded bg-[#07120e]/90 px-1 py-0.5 text-center text-[7px] text-slate-500 opacity-0 transition-opacity group-hover/cell:opacity-100">
                      index {item.index}
                    </span>
                  </div>
                ))}
              </div>
              <p className="relative mt-6 text-[10px] leading-5 text-slate-600">
                Higher values indicate months whose normalized median-price level
                is above the crop-specific historical median.
              </p>
            </article>

            <article className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-7">
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Crop fingerprint
              </p>
              <h3 className="mt-1 text-lg font-bold text-white">
                Price × volatility profile
              </h3>
              <div className="relative mt-7 h-[260px] rounded-2xl border border-white/[0.05] bg-[#06100c]">
                <div className="absolute inset-0 bg-chart-grid opacity-25" />
                <div className="absolute inset-x-7 bottom-7 top-5 border-b border-l border-white/[0.08]" />
                {filteredCropData.map((item) => (
                  <div
                    key={`${item.crop}-fingerprint`}
                    className="group/fingerprint absolute"
                    style={{
                      left: `${10 + ((item.price - cropPriceMin) / Math.max(cropPriceMax - cropPriceMin, 1)) * 78}%`,
                      bottom: `${10 + (item.volatility / Math.max(cropVolatilityMax, 1)) * 78}%`,
                    }}
                  >
                    <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-lg animate-pulse" />
                    <span className="relative block h-5 w-5 rounded-full border-2 border-cyan-200 bg-cyan-300/70 shadow-[0_0_24px_rgba(103,232,249,0.28)] transition-transform duration-300 group-hover/fingerprint:scale-150" />
                    <span className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#07120e]/95 px-2 py-1 text-[8px] font-bold text-white opacity-0 transition-opacity group-hover/fingerprint:opacity-100">
                      {item.crop} · {item.volatility.toFixed(1)}%
                    </span>
                  </div>
                ))}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.18em] text-slate-700">
                  Price
                </span>
                <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] uppercase tracking-[0.18em] text-slate-700">
                  Volatility
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section
        id="seasonality"
        className="relative z-10 scroll-mt-28 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-300">
              03 / Seasonality
            </p>

            <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em]">
              Markets move in
              <span className="block text-slate-600">patterns.</span>
            </h2>

            <p className="mt-7 text-sm leading-7 text-slate-500 sm:text-base">
              Seasonal analysis examines recurring behavior across months and
              helps identify periods where price activity may consistently
              differ.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Peak month",
                value: "Dec · 114.1",
                text: "Highest normalized monthly price index across the crop histories.",
                icon: "↗",
              },
              {
                title: "Low month",
                value: "May · 99.6",
                text: "Lowest normalized monthly price index across the crop histories.",
                icon: "↘",
              },
              {
                title: "Seasonal gap",
                value: "14.5 pts",
                text: "Difference between the strongest and weakest normalized months.",
                icon: "◌",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-teal-300/20 hover:bg-white/[0.04]"
                style={{
                  animationDelay: `${index * 130}ms`,
                }}
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-teal-300/[0.04] blur-3xl transition-all duration-500 group-hover:bg-teal-300/[0.09]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-300/10 bg-teal-300/[0.06] text-xl text-teal-200">
                      {item.icon}
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.18em] text-slate-700">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-9 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                    {item.title}
                  </p>

                  <p className="mt-2 text-3xl font-black text-white">
                    {item.value}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10 px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-[36px] border border-white/[0.07] bg-gradient-to-br from-emerald-300/[0.055] via-white/[0.02] to-cyan-300/[0.045] p-7 sm:p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Key Analytical Takeaways
                </p>

                <h2 className="mt-5 text-[clamp(2.2rem,4vw,4rem)] font-black leading-[0.95] tracking-[-0.05em]">
                  Turning raw
                  <span className="block text-slate-500">
                    observations into insight.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500">
                  The analysis layer transforms cleaned historical records into
                  patterns that can later support forecasting and
                  decision-making.
                </p>
              </div>

              <div className="space-y-3">
                {insights.map((item, index) => (
                  <div
                    key={item.number}
                    className="group flex gap-5 rounded-2xl border border-white/[0.06] bg-black/10 p-5 transition-all duration-500 hover:border-emerald-300/15 hover:bg-white/[0.025]"
                  >
                    <div className="shrink-0 text-sm font-black text-emerald-300/40 transition-colors duration-300 group-hover:text-emerald-300">
                      {item.number}
                    </div>

                    <div>
                      <h3 className="font-bold text-white">{item.title}</h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <div className="ml-auto hidden self-center text-xl text-emerald-300/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-300 sm:block">
                      →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnalyticsLab />

      <section
        id="dashboard"
        className="relative z-10 scroll-mt-28 px-5 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                04 / Interactive Dashboard
              </p>

              <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em]">
                The data,
                <span className="block text-slate-600">made interactive.</span>
              </h2>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="https://public.tableau.com/views/FoodPriceForecasting/PriceAnalysis?:showVizHome=no"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-cyan-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.1] hover:shadow-[0_12px_40px_rgba(34,211,238,0.12)] sm:w-auto"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)] transition-transform duration-300 group-hover:scale-125" />
                Open Tableau
                <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </a>

              <a
                href="https://app.powerbi.com/view?r=eyJrIjoiM2NlMDcwNGYtMjc4MS00NzMzLTljYjYtYzg1Njg0N2UwMGRmIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-emerald-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-300/[0.1] hover:shadow-[0_12px_40px_rgba(110,231,183,0.12)] sm:w-auto"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)] transition-transform duration-300 group-hover:scale-125" />
                Open Power BI
                <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </a>
            </div>
          </div>

          <p className="-mt-5 mb-10 max-w-3xl text-sm leading-7 text-slate-500">
            Explore the interactive Tableau and Power BI reports below, or open
            either full report in a new tab for the complete dashboard experience.
          </p>

          <div className="relative overflow-hidden rounded-[36px] border border-emerald-300/10 bg-[#06100c] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:p-5">
            <div className="absolute inset-0 bg-grid opacity-[0.035]" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#08130f]">
              <div className="flex h-14 items-center justify-between border-b border-white/[0.06] px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/60" />
                </div>

                <div className="hidden rounded-full border border-white/[0.06] px-4 py-1.5 text-[9px] uppercase tracking-[0.18em] text-slate-600 sm:block">
                  Food Price Analytics Dashboard
                </div>

                <div className="h-7 w-7 rounded-full border border-white/[0.06] bg-white/[0.025]" />
              </div>

              <div className="grid min-h-[440px] gap-4 p-4 sm:p-6 lg:grid-cols-[0.7fr_1.3fr]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                      Monthly Rows
                    </p>

                    <p className="mt-3 text-3xl font-black text-white">
                      1,210
                    </p>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div className="h-full w-[73%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                        Crops
                      </p>
                      <p className="mt-2 text-2xl font-black text-emerald-200">
                        9
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                        Records
                      </p>
                      <p className="mt-2 text-2xl font-black text-cyan-200">
                        484,504
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                      Data Pipeline
                    </p>

                    <div className="mt-5 space-y-3">
                      {[
                        ["Collection", true],
                        ["Cleaning", true],
                        ["EDA", true],
                        ["Forecasting", true],
                      ].map(([label, completed]) => (
                        <div
                          key={label as string}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] ${
                              completed
                                ? "bg-emerald-300/15 text-emerald-300"
                                : "bg-white/[0.04] text-slate-700"
                            }`}
                          >
                            {completed ? "✓" : "•"}
                          </span>

                          <span className="text-xs text-slate-500">
                            {label as string}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.018] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                        Price Trend
                      </p>

                      <p className="mt-1 text-base font-bold text-white">
                        Multi-year movement
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-[9px] text-emerald-200">
                      LIVE VIEW
                    </span>
                  </div>

                  <div className="relative mt-8 h-[300px] rounded-2xl">
                    <div className="absolute inset-0 bg-chart-grid opacity-30" />
                    <InteractiveTrendChart rows={selectedTrendRows} height={300} />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/[0.05] bg-black/10 p-3">
                      <p className="text-[8px] uppercase tracking-[0.15em] text-slate-700">
                        Trend
                      </p>
                      <p className="mt-1 text-xs font-semibold text-emerald-200">
                        {selectedTrendRows.length
                          ? `${(
                              ((selectedTrendRows[selectedTrendRows.length - 1].price /
                                selectedTrendRows[0].price) -
                                1) *
                              100
                            ).toFixed(1)}%`
                          : "—"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.05] bg-black/10 p-3">
                      <p className="text-[8px] uppercase tracking-[0.15em] text-slate-700">
                        Seasonality
                      </p>
                      <p className="mt-1 text-xs font-semibold text-cyan-200">
                        {peak.label} peak
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.05] bg-black/10 p-3">
                      <p className="text-[8px] uppercase tracking-[0.15em] text-slate-700">
                        Forecast
                      </p>
                      <p className="mt-1 text-xs font-semibold text-teal-200">
                        Ready
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-between gap-4 px-3 pb-2 pt-5 sm:flex-row sm:px-5">
              <p className="text-center text-[10px] leading-5 text-slate-600 sm:text-left">
                Tableau and Power BI are connected to the published project dashboards.
                Use the buttons above to open either report in a new tab.
              </p>

              <div className="flex shrink-0 gap-2">
                <span className="rounded-full border border-white/[0.06] px-3 py-1.5 text-[9px] text-slate-600">
                  TABLEAU · LIVE
                </span>

                <span className="rounded-full border border-white/[0.06] px-3 py-1.5 text-[9px] text-slate-600">
                  POWER BI · LIVE
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-7">
            <article id="tableau-dashboard" className="group scroll-mt-28 relative overflow-hidden rounded-[36px] border border-cyan-300/10 bg-[#06100c] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.35)] transition-all duration-700 hover:-translate-y-1 hover:border-cyan-300/20 hover:shadow-[0_45px_130px_rgba(0,0,0,0.48)] sm:p-5">
              <div className="pointer-events-none absolute -inset-20 bg-cyan-300/[0.035] blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative flex flex-col gap-4 border-b border-white/[0.06] px-2 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300/70">
                    Tableau Public · Price Analysis
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                    Interactive Tableau Dashboard
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a href="https://public.tableau.com/views/FoodPriceForecasting/PriceAnalysis?:showVizHome=no" target="_blank" rel="noopener noreferrer" className="group/open inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.1] hover:shadow-[0_10px_30px_rgba(34,211,238,0.12)]">
                    Open Tableau <span className="transition-transform duration-300 group-hover/open:translate-x-0.5">↗</span>
                  </a>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-300/[0.05] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                  Live Report
                </span>
              </div>
              </div>

              <div className="relative mt-4 overflow-hidden rounded-[28px] border border-white/[0.06] bg-black/20">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[28px] ring-1 ring-inset ring-white/[0.03]" />
                <iframe
                  title="Food Price Forecasting - Tableau Price Analysis"
                  src="https://public.tableau.com/views/FoodPriceForecasting/PriceAnalysis?:showVizHome=no&:embed=yes&:tabs=yes&:toolbar=yes"
                  className="block h-[620px] w-full border-0 sm:h-[760px] lg:h-[820px]"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </article>

            <article id="powerbi-dashboard" className="group scroll-mt-28 relative overflow-hidden rounded-[36px] border border-emerald-300/10 bg-[#06100c] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.35)] transition-all duration-700 hover:-translate-y-1 hover:border-emerald-300/20 hover:shadow-[0_45px_130px_rgba(0,0,0,0.48)] sm:p-5">
              <div className="pointer-events-none absolute -inset-20 bg-emerald-300/[0.035] blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative flex flex-col gap-4 border-b border-white/[0.06] px-2 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-300/70">
                    Power BI · Food Price Forecasting
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                    Interactive Power BI Report
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a href="https://app.powerbi.com/view?r=eyJrIjoiM2NlMDcwNGYtMjc4MS00NzMzLTljYjYtYzg1Njg0N2UwMGRmIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9" target="_blank" rel="noopener noreferrer" className="group/open inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-300/[0.1] hover:shadow-[0_10px_30px_rgba(110,231,183,0.12)]">
                    Open Power BI <span className="transition-transform duration-300 group-hover/open:translate-x-0.5">↗</span>
                  </a>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[0.05] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                  Live Report
                </span>
              </div>
              </div>

              <div className="relative mt-4 overflow-hidden rounded-[28px] border border-white/[0.06] bg-black/20">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[28px] ring-1 ring-inset ring-white/[0.03]" />
                <iframe
                  title="Food Price Forecasting - Power BI Report"
                  src="https://app.powerbi.com/view?r=eyJrIjoiM2NlMDcwNGYtMjc4MS00NzMzLTljYjYtYzg1Njg0N2UwMGRmIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9"
                  className="block h-[620px] w-full border-0 sm:h-[760px] lg:h-[820px]"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="relative z-10 px-5 pb-24 pt-16 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

          <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">
            From analysis to prediction
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-black leading-[0.94] tracking-[-0.055em]">
            Historical patterns become the foundation for
            <span className="bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              forecasting.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            The next stage of the project uses engineered historical features
            and machine learning techniques to transform these analytical
            observations into future food price forecasts.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/forecasting"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-300 px-7 py-4 text-sm font-bold text-[#03100a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(110,231,183,0.18)]"
            >
              Continue to Forecasting
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="/methodology"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] px-7 py-4 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/15 hover:text-white"
            >
              View Methodology
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
          font-family: Arial, Helvetica, sans-serif;
        }

        p,
        nav a,
        footer,
        button,
        span {
          font-family: Arial, Helvetica, sans-serif;
        }

        h1,
        h2,
        h3,
        h4 {
          font-family: Arial, Helvetica, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        img,
        svg,
        video,
        canvas {
          max-width: 100%;
        }

        button,
        a {
          max-width: 100%;
        }

        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .bg-grid {
          background-image:
            linear-gradient(rgba(110, 231, 183, 0.08) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(110, 231, 183, 0.08) 1px,
              transparent 1px
            );
          background-size: 45px 45px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 90%);
        }

        .bg-chart-grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px
            );
          background-size: 55px 55px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -12px, 0);
          }
        }

        @keyframes floatReverse {
          0%,
          100% {
            transform: translate3d(0, -8px, 0);
          }

          50% {
            transform: translate3d(0, 16px, 0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.98);
          }

          50% {
            opacity: 0.75;
            transform: scale(1.04);
          }
        }

        @keyframes gradientShift {
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

        @keyframes drawLine {
          from {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
          }

          to {
            stroke-dasharray: 1600;
            stroke-dashoffset: 0;
          }
        }

        @keyframes chartPulse {
          0%,
          100% {
            opacity: 0.55;
          }

          50% {
            opacity: 0.9;
          }
        }

        @keyframes barRise {
          from {
            transform: scaleY(0);
            opacity: 0;
          }

          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translateX(-10px);
          }

          50% {
            transform: translateX(10px);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }

        .animate-fadeUp {
          animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }

        .animate-floatReverse {
          animation: floatReverse 9s ease-in-out infinite;
        }

        .animate-pulseGlow {
          animation: pulseGlow 5s ease-in-out infinite;
        }

        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        .animate-drawLine {
          animation: drawLine 2.4s cubic-bezier(0.65, 0, 0.35, 1) both;
        }

        .animate-chartPulse {
          animation: chartPulse 4s ease-in-out infinite;
        }

        .animate-barRise {
          animation: barRise 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .animate-drift {
          animation: drift 6s ease-in-out infinite;
        }

        .animate-spinSlow {
          animation: spinSlow 18s linear infinite;
        }

        @media (max-width: 768px) {
          .bg-grid {
            background-size: 32px 32px;
          }

          .bg-chart-grid {
            background-size: 42px 42px;
          }
        }

        @media (max-width: 480px) {
          nav {
            width: 100%;
          }

          .bg-chart-grid {
            background-size: 36px 36px;
          }
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
