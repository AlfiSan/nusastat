[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/AlfiSan/nusastat/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/AlfiSan/nusastat/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaStat — Portal Statistik Nasional Indonesia

NusaStat is a national statistics site for Indonesia: population, economy,
labour, prices, regions, and a data catalogue — built as plain static files
under `app/` with no build step and no network request. Every figure carries
its source and reference year (BPS, World Bank, ILO).

Entry for the make.fun bounty
[Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What is inside

- **Home** — hero, six headline indicators for 2024 (population 281.6m,
  GDP Rp22,139 trillion, growth 5.03%, inflation 1.57%, unemployment 4.91%,
  poverty 8.57%), GDP growth chart, latest releases, topic browser.
- **Economy** — GDP growth and nominal GDP charts 2015–2024, a year picker
  that updates the summary and highlights the chosen year, GDP by industry,
  and foreign trade (exports US$264.7bn, imports US$233.7bn, 2024).
- **Population** — population trend, age structure, and the ten largest
  provinces.
- **Labour** — unemployment and poverty trends, employment by sector,
  Human Development Index (75.02 in 2024).
- **Prices** — annual-average and December inflation, 2015–2024, with a
  guide to reading the two measures.
- **Regions** — a sortable, searchable table of the ten largest provinces
  plus a population chart.
- **Data catalogue** — every time series as a downloadable CSV, plus the
  release calendar.
- **About & methodology** — sources, survey names, and how each headline
  figure is computed.

All controls work: hash routing, the year picker, indicator search, the
province filter, sortable tables, and real CSV downloads. Charts are drawn
on canvas by `app/charts.js` with no library, so the first load is small.

## Run it locally

```sh
node serve.ts            # serves app/ at http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the kit's vendored library.

## Sources

Badan Pusat Statistik (BPS) — PDB, inflasi, pengangguran (Sakernas),
kemiskinan (Susenas), IPM, penduduk. World Bank WDI — GDP per capita and
age structure. ILO — youth unemployment. Figures are the published headline
values for 2015–2024; each page names its source and year.
