// NusaStat router — hash routing, chart mounting, and the controls that
// make the site work: the year picker, indicator search, province filter,
// and sortable tables. No network request is made anywhere.

import { ROUTES } from "./views.js";
import {
  KPIS,
  GDP_GROWTH,
  GDP_NOMINAL,
  GDP_PER_CAPITA,
  INFLATION_AVG,
  INFLATION_DEC,
  UNEMPLOYMENT,
  POVERTY,
  HDI,
  POPULATION,
  PROVINCES,
  seriesValue,
} from "./data.js";
import { drawBarChart, drawLineChart, drawHBarChart } from "./charts.js";

const app = document.getElementById("app");
const navLinks = [...document.querySelectorAll("[data-route]")];

function points(series) {
  return series.map((d) => ({ label: String(d.year), value: d.value }));
}

function mountCharts(route) {
  const byId = (id) => document.getElementById(id);
  if (route === "/") {
    const c = byId("chart-gdp-home");
    if (c) {
      drawBarChart(c, points(GDP_GROWTH), { highlight: "2024", unit: "% y-on-y" });
    }
    const form = byId("hero-search");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        runIndicatorSearch(form.q.value);
      });
    }
  }
  if (route === "/ekonomi") {
    const g = byId("chart-gdp");
    if (g) drawBarChart(g, points(GDP_GROWTH), { highlight: "2024", unit: "% y-on-y" });
    const n = byId("chart-gdp-nominal");
    if (n) {
      drawBarChart(n, GDP_NOMINAL.map((d) => ({ label: String(d.year), value: d.value })), {
        highlight: "2024",
        unit: "Rp triliun",
      });
    }
    const sel = byId("year-select");
    if (sel) {
      sel.addEventListener("change", () => {
        const year = Number(sel.value);
        const summary = byId("year-summary");
        if (summary) {
          summary.innerHTML = `Pada ${year}, ekonomi tumbuh <strong>${seriesValue(GDP_GROWTH, year).toFixed(2).replace(".", ",")}%</strong>, PDB <strong>Rp${seriesValue(GDP_NOMINAL, year).toLocaleString("id-ID")} triliun</strong>, PDB per kapita <strong>US$${seriesValue(GDP_PER_CAPITA, year).toLocaleString("id-ID")}</strong>.`;
        }
        const chart = byId("chart-gdp");
        if (chart) drawBarChart(chart, points(GDP_GROWTH), { highlight: String(year), unit: "% y-on-y" });
      });
    }
  }
  if (route === "/penduduk") {
    const c = byId("chart-pop");
    if (c) {
      drawLineChart(c, POPULATION.map((d) => ({ label: String(d.year), value: d.value })), {
        unit: "juta jiwa",
      });
    }
    const p = byId("chart-provinces");
    if (p) {
      drawHBarChart(p, PROVINCES.map((pr) => ({ label: pr.name, value: pr.pop, valueText: pr.pop.toFixed(2).replace(".", ",") + " jt" })), {
        highlight: "Jawa Barat",
      });
    }
  }
  if (route === "/tenaga-kerja") {
    const u = byId("chart-unemp");
    if (u) drawLineChart(u, points(UNEMPLOYMENT), { unit: "% angkatan kerja" });
    const pv = byId("chart-poverty");
    if (pv) drawLineChart(pv, points(POVERTY), { unit: "% penduduk" });
    const h = byId("chart-hdi");
    if (h) drawLineChart(h, points(HDI), { unit: "IPM" });
  }
  if (route === "/harga") {
    const a = byId("chart-inflation");
    if (a) drawLineChart(a, points(INFLATION_AVG), { unit: "% per tahun" });
    const d = byId("chart-inflation-dec");
    if (d) drawLineChart(d, points(INFLATION_DEC), { unit: "% y-on-y" });
  }
  if (route === "/daerah") {
    const r = byId("chart-regions");
    if (r) {
      drawHBarChart(r, PROVINCES.map((pr) => ({ label: pr.name, value: pr.pop, valueText: pr.pop.toFixed(2).replace(".", ",") + " jt" })), {
        highlight: "Jawa Barat",
      });
    }
    wireRegionFilter();
    wireSortableTable(byId("regions-table"));
  }
}

// Search across the headline indicators; results replace the KPI grid.
function runIndicatorSearch(query) {
  const q = query.trim().toLowerCase();
  const grid = document.querySelector(".kpi-grid");
  const title = document.getElementById("kpi-title");
  if (!grid) return;
  if (!q) {
    location.hash = "#/";
    return;
  }
  const hits = KPIS.filter(
    (k) => (k.label + " " + k.value + " " + k.sub).toLowerCase().includes(q),
  );
  if (title) title.innerHTML = `Hasil cari “${query}” <span>${hits.length} indikator</span>`;
  grid.innerHTML = hits.length
    ? hits
        .map(
          (k) => `<a class="kpi" href="${k.route}">
            <span class="kpi-label">${k.label}</span>
            <span class="kpi-value">${k.value}</span>
            <span class="kpi-sub">${k.sub}</span>
            <span class="kpi-source">Sumber: ${k.source}</span></a>`,
        )
        .join("")
    : `<p class="empty">Tidak ada indikator yang cocok dengan “${query}”.
       Coba kata kunci lain, misalnya <em>inflasi</em>, <em>PDB</em>, atau
       <em>kemiskinan</em>.</p>`;
  grid.scrollIntoView({ behavior: "smooth", block: "start" });
}

function wireRegionFilter() {
  const input = document.getElementById("region-filter");
  const table = document.getElementById("regions-table");
  const count = document.getElementById("region-count");
  if (!input || !table) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    for (const row of table.tBodies[0].rows) {
      const match = row.cells[0].textContent.toLowerCase().includes(q);
      row.style.display = match ? "" : "none";
      if (match) shown++;
    }
    if (count) count.textContent = `${shown} provinsi ditampilkan`;
  });
}

// Click a header to sort the table by that column; click again to reverse.
function wireSortableTable(table) {
  if (!table) return;
  let dir = 1;
  let lastKey = "";
  for (const th of table.tHead.rows[0].cells) {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (!key) return;
      dir = key === lastKey ? -dir : 1;
      lastKey = key;
      const col = [...th.parentNode.cells].indexOf(th);
      const rows = [...table.tBodies[0].rows];
      rows.sort((a, b) => {
        const av = a.cells[col].dataset.sort ?? a.cells[col].textContent.trim();
        const bv = b.cells[col].dataset.sort ?? b.cells[col].textContent.trim();
        const an = Number(av);
        const bn = Number(bv);
        if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * dir;
        return av.localeCompare(bv, "id") * dir;
      });
      for (const row of rows) table.tBodies[0].appendChild(row);
    });
  }
}

function render() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const route = ROUTES[hash] ? hash : "/";
  document.title = route === "/" ? "NusaStat — Portal Statistik Nasional Indonesia" : `NusaStat — ${document.querySelector(`[data-route="${route}"]`)?.textContent.trim() || "Statistik"}`;
  app.innerHTML = ROUTES[route]();
  for (const a of navLinks) {
    const on = a.dataset.route === route || (route === "/" && a.dataset.route === "/");
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
  mountCharts(route);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
