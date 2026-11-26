// NusaStat — figures for Indonesia's national statistics portal.
// Every figure carries its source and reference year. Sources: Statistics
// Indonesia (BPS) unless noted; World Bank WDI where BPS does not publish
// the series. Figures are the published headline values, rounded as BPS
// publishes them. Nothing here is fetched from the network at run time.

export const META = {
  country: "Indonesia",
  portal: "NusaStat",
  tagline: "Portal Statistik Nasional Indonesia",
  updated: "15 Januari 2025",
  currency: "Rp",
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Headline indicators shown on the home page. `change` is the movement
// versus the previous comparable period, in percentage points.
export const KPIS = [
  {
    id: "penduduk",
    label: "Penduduk",
    value: "281,6 jt",
    sub: "jiwa, pertengahan 2024",
    change: "+0,8% per tahun",
    dir: "up",
    source: "BPS, 2024",
    route: "#/penduduk",
  },
  {
    id: "pdb",
    label: "PDB nominal",
    value: "Rp22.139 T",
    sub: "harga berlaku, 2024",
    change: "+5,03% riil",
    dir: "up",
    source: "BPS, 2024",
    route: "#/ekonomi",
  },
  {
    id: "tumbuh",
    label: "Pertumbuhan ekonomi",
    value: "5,03%",
    sub: "y-on-y, 2024",
    change: "-0,02 pp dari 2023",
    dir: "down",
    source: "BPS, 2024",
    route: "#/ekonomi",
  },
  {
    id: "inflasi",
    label: "Inflasi (Des y-on-y)",
    value: "1,57%",
    sub: "Desember 2024",
    change: "-1,04 pp dari Des 2023",
    dir: "down",
    source: "BPS, Des 2024",
    route: "#/harga",
  },
  {
    id: "pengangguran",
    label: "Pengangguran terbuka",
    value: "4,91%",
    sub: "Agustus 2024",
    change: "-0,41 pp dari Agu 2023",
    dir: "down",
    source: "BPS Sakernas, Agu 2024",
    route: "#/tenaga-kerja",
  },
  {
    id: "kemiskinan",
    label: "Penduduk miskin",
    value: "8,57%",
    sub: "September 2024",
    change: "-0,79 pp dari Sep 2023",
    dir: "down",
    source: "BPS, Sep 2024",
    route: "#/tenaga-kerja",
  },
];

// GDP growth, constant prices, % y-on-y (BPS).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 },
  { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.69 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// Nominal GDP, current prices, Rp trillion (BPS).
export const GDP_NOMINAL = [
  { year: 2015, value: 11526 },
  { year: 2016, value: 12402 },
  { year: 2017, value: 13588 },
  { year: 2018, value: 14839 },
  { year: 2019, value: 15833 },
  { year: 2020, value: 15434 },
  { year: 2021, value: 16970 },
  { year: 2022, value: 19588 },
  { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

// GDP per capita, current US$ (World Bank WDI / BPS).
export const GDP_PER_CAPITA = [
  { year: 2015, value: 3355 },
  { year: 2016, value: 3604 },
  { year: 2017, value: 3847 },
  { year: 2018, value: 3895 },
  { year: 2019, value: 4126 },
  { year: 2020, value: 3896 },
  { year: 2021, value: 4363 },
  { year: 2022, value: 4784 },
  { year: 2023, value: 4785 },
  { year: 2024, value: 4960 },
];

// Inflation: annual average CPI % (BPS) and December y-on-y % (BPS).
export const INFLATION_AVG = [
  { year: 2015, value: 6.36 },
  { year: 2016, value: 3.53 },
  { year: 2017, value: 3.81 },
  { year: 2018, value: 3.2 },
  { year: 2019, value: 2.81 },
  { year: 2020, value: 1.92 },
  { year: 2021, value: 1.6 },
  { year: 2022, value: 4.21 },
  { year: 2023, value: 3.69 },
  { year: 2024, value: 2.3 },
];
export const INFLATION_DEC = [
  { year: 2015, value: 3.35 },
  { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 },
  { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Open unemployment rate, August, % of labour force (BPS Sakernas).
export const UNEMPLOYMENT = [
  { year: 2015, value: 6.18 },
  { year: 2016, value: 5.61 },
  { year: 2017, value: 5.5 },
  { year: 2018, value: 5.34 },
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Poverty rate, % of population (BPS, September round each year).
export const POVERTY = [
  { year: 2015, value: 11.13 },
  { year: 2016, value: 10.7 },
  { year: 2017, value: 10.12 },
  { year: 2018, value: 9.66 },
  { year: 2019, value: 9.22 },
  { year: 2020, value: 9.78 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// Human Development Index (BPS).
export const HDI = [
  { year: 2015, value: 69.55 },
  { year: 2016, value: 70.18 },
  { year: 2017, value: 70.81 },
  { year: 2018, value: 71.39 },
  { year: 2019, value: 71.92 },
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 73.37 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Total population, millions (BPS; 2020 is the census count).
export const POPULATION = [
  { year: 2015, value: 255.6 },
  { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 },
  { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 },
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

// Age structure 2024, % of population (World Bank WDI).
export const AGE_GROUPS = [
  { group: "0–14 tahun", value: 24.6, note: "anak" },
  { group: "15–24 tahun", value: 16.9, note: "pemuda" },
  { group: "25–54 tahun", value: 42.8, note: "usia kerja inti" },
  { group: "55–64 tahun", value: 8.4, note: "pra-lansia" },
  { group: "65+ tahun", value: 7.3, note: "lansia" },
];

// Ten largest provinces by population, 2024 (BPS). Density is people/km².
export const PROVINCES = [
  { name: "Jawa Barat", capital: "Bandung", pop: 49.94, share: 17.7, density: 1405 },
  { name: "Jawa Timur", capital: "Surabaya", pop: 41.81, share: 14.9, density: 874 },
  { name: "Jawa Tengah", capital: "Semarang", pop: 37.89, share: 13.5, density: 1126 },
  { name: "Sumatera Utara", capital: "Medan", pop: 15.59, share: 5.5, density: 214 },
  { name: "Banten", capital: "Serang", pop: 12.43, share: 4.4, density: 1286 },
  { name: "DKI Jakarta", capital: "Jakarta", pop: 10.56, share: 3.8, density: 15367 },
  { name: "Sulawesi Selatan", capital: "Makassar", pop: 9.28, share: 3.3, density: 199 },
  { name: "Lampung", capital: "Bandar Lampung", pop: 9.17, share: 3.3, density: 265 },
  { name: "Sumatera Selatan", capital: "Palembang", pop: 8.84, share: 3.1, density: 97 },
  { name: "Riau", capital: "Pekanbaru", pop: 6.62, share: 2.4, density: 76 },
];

// Employment by sector, % of workers, August 2024 (BPS Sakernas).
export const EMPLOYMENT_SECTORS = [
  { sector: "Pertanian, kehutanan, perikanan", value: 28.5 },
  { sector: "Perdagangan besar & eceran", value: 18.9 },
  { sector: "Industri pengolahan", value: 13.8 },
  { sector: "Konstruksi", value: 8.5 },
  { sector: "Akomodasi & makan minum", value: 7.2 },
  { sector: "Transportasi & pergudangan", value: 5.6 },
  { sector: "Jasa & lainnya", value: 17.5 },
];

// GDP by industry, % of GDP, 2024 (BPS).
export const GDP_SECTORS = [
  { sector: "Industri pengolahan", value: 18.7 },
  { sector: "Perdagangan", value: 13.1 },
  { sector: "Pertanian", value: 12.5 },
  { sector: "Konstruksi", value: 9.8 },
  { sector: "Pertambangan", value: 8.7 },
  { sector: "Lainnya", value: 37.2 },
];

// Foreign trade 2024, US$ billion (BPS).
export const TRADE = {
  exports: 264.7,
  imports: 233.66,
  surplus: 31.04,
  year: 2024,
  source: "BPS, 2024",
};

// Latest releases and the release calendar.
export const RELEASES = [
  { date: "5 Feb 2025", title: "Pertumbuhan Ekonomi Indonesia Triwulan IV-2024", detail: "Ekonomi tumbuh 5,02% (y-on-y) pada triwulan IV-2024; setahun penuh 5,03%." },
  { date: "2 Jan 2025", title: "Inflasi Desember 2024", detail: "Inflasi Desember 2024 sebesar 1,57% (y-on-y); inflasi setahun 2,30%." },
  { date: "15 Jan 2025", title: "Ekspor dan Impor Desember 2024", detail: "Ekspor 2024 mencapai US$264,70 miliar; neraca dagang surplus US$31,04 miliar." },
  { date: "15 Jan 2025", title: "Profil Kemiskinan September 2024", detail: "Penduduk miskin 8,57% atau 24,06 juta jiwa, turun 0,79 poin dari September 2023." },
  { date: "15 Nov 2024", title: "Indeks Pembangunan Manusia 2024", detail: "IPM 2024 mencapai 75,02, naik 0,63 poin; status pembangunan manusia tinggi." },
  { date: "5 Nov 2024", title: "Keadaan Ketenagakerjaan Agustus 2024", detail: "Tingkat pengangguran terbuka 4,91%; angkatan kerja 147,49 juta orang." },
];

// Downloadable datasets. Each file lives under app/data/ and is a real CSV.
export const DATASETS = [
  { file: "data/pdb-pertumbuhan.csv", name: "Pertumbuhan PDB 2015–2024", rows: 10, updated: "5 Feb 2025", size: "0,5 KB" },
  { file: "data/inflasi.csv", name: "Inflasi 2015–2024 (rata-rata & Desember)", rows: 10, updated: "2 Jan 2025", size: "0,6 KB" },
  { file: "data/penduduk-provinsi.csv", name: "Penduduk 10 provinsi terbesar 2024", rows: 10, updated: "2024", size: "0,7 KB" },
  { file: "data/ketenagakerjaan.csv", name: "Pengangguran & kemiskinan 2015–2024", rows: 10, updated: "15 Jan 2025", size: "0,6 KB" },
  { file: "data/pdb-nominal.csv", name: "PDB nominal & PDB per kapita 2015–2024", rows: 10, updated: "5 Feb 2025", size: "0,6 KB" },
];

export function seriesValue(series, year) {
  const row = series.find((d) => d.year === year);
  return row ? row.value : null;
}
