// NusaStat views — each page is a function returning HTML. Charts are
// drawn after mounting (see main.js), so the markup stays plain and the
// figures stay readable even before JavaScript runs.

import {
  KPIS,
  GDP_GROWTH,
  GDP_NOMINAL,
  GDP_PER_CAPITA,
  GDP_SECTORS,
  INFLATION_AVG,
  INFLATION_DEC,
  UNEMPLOYMENT,
  POVERTY,
  HDI,
  POPULATION,
  AGE_GROUPS,
  PROVINCES,
  EMPLOYMENT_SECTORS,
  TRADE,
  RELEASES,
  DATASETS,
  seriesValue,
} from "./data.js";

function fmt(n, decimals = 2) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function kpiCard(k) {
  const arrow = k.dir === "up" ? "▲" : "▼";
  return `<a class="kpi" href="${k.route}">
    <span class="kpi-label">${k.label}</span>
    <span class="kpi-value">${k.value}</span>
    <span class="kpi-sub">${k.sub}</span>
    <span class="kpi-change ${k.dir}">${arrow} ${k.change}</span>
    <span class="kpi-source">Sumber: ${k.source}</span>
  </a>`;
}

function chartCard(id, title, subtitle, source, width = 640, height = 300) {
  return `<figure class="chart-card">
    <figcaption><strong>${title}</strong><span>${subtitle}</span></figcaption>
    <canvas id="${id}" width="${width}" height="${height}" role="img" aria-label="${title}"></canvas>
    <p class="source">Sumber: ${source}</p>
  </figure>`;
}

function releaseItem(r) {
  return `<li class="release"><span class="release-date">${r.date}</span>
    <div><strong>${r.title}</strong><p>${r.detail}</p></div></li>`;
}

export function viewHome() {
  return `
  <section class="hero">
    <p class="eyebrow">Portal resmi data Indonesia</p>
    <h1>Angka Indonesia,<br>terbuka untuk semua.</h1>
    <p class="lede">NusaStat menyajikan statistik resmi Indonesia — penduduk, ekonomi,
    ketenagakerjaan, dan harga — lengkap dengan sumber dan tahunnya, agar
    siapa pun bisa memeriksa, membandingkan, dan mengunduh datanya.</p>
    <form class="hero-search" id="hero-search" role="search">
      <label class="visually-hidden" for="q">Cari indikator</label>
      <input id="q" name="q" type="search" placeholder="Cari indikator: mis. inflasi, kemiskinan, PDB…" autocomplete="off">
      <button type="submit">Cari</button>
    </form>
    <p class="hero-note">Data terakhir diperbarui 15 Januari 2025 · 38 provinsi · 10 tahun deret waktu</p>
  </section>

  <section aria-labelledby="kpi-title">
    <h2 id="kpi-title" class="section-title">Indikator utama <span>Key indicators, 2024</span></h2>
    <div class="kpi-grid">${KPIS.map(kpiCard).join("")}</div>
  </section>

  <section class="two-col" aria-label="Grafik utama">
    ${chartCard("chart-gdp-home", "Pertumbuhan ekonomi 2015–2024", "PDB harga konstan, % y-on-y — klik untuk melihat Ekonomi", "BPS, 2024")}
    <div class="panel">
      <h3>Yang perlu diperhatikan</h3>
      <ul class="takeaways">
        <li><strong>Pertumbuhan bertahan di 5%.</strong> Ekonomi tumbuh 5,03% pada 2024,
          nyaris sama dengan 5,05% pada 2023 — dekade kedua berturut-turut di kisaran 5%.</li>
        <li><strong>Inflasi mereda.</strong> Inflasi Desember 1,57% (y-on-y), terendah sejak 2020,
          setelah 5,51% pada Desember 2022.</li>
        <li><strong>Pengangguran terendah dalam satu dekade.</strong> 4,91% pada Agustus 2024,
          turun dari puncak pandemi 7,07% (2020).</li>
        <li><strong>Kemiskinan 8,57%.</strong> Terendah sepanjang sejarah pencatatan BPS,
          turun 0,79 poin dari September 2023.</li>
      </ul>
      <p><a class="btn" href="#/ekonomi">Jelajahi data ekonomi →</a></p>
    </div>
  </section>

  <section aria-labelledby="releases-title">
    <h2 id="releases-title" class="section-title">Rilis terbaru <span>Latest releases</span></h2>
    <ul class="releases">${RELEASES.slice(0, 4).map(releaseItem).join("")}</ul>
  </section>

  <section aria-labelledby="topics-title">
    <h2 id="topics-title" class="section-title">Jelajahi menurut topik <span>Browse by topic</span></h2>
    <div class="topic-grid">
      <a class="topic" href="#/ekonomi"><strong>Ekonomi</strong><span>PDB, pertumbuhan, perdagangan — 2024: Rp22.139 triliun</span></a>
      <a class="topic" href="#/penduduk"><strong>Penduduk</strong><span>281,6 juta jiwa, struktur usia, dan 38 provinsi</span></a>
      <a class="topic" href="#/tenaga-kerja"><strong>Tenaga kerja</strong><span>Pengangguran 4,91% · kemiskinan 8,57% · IPM 75,02</span></a>
      <a class="topic" href="#/harga"><strong>Harga &amp; inflasi</strong><span>Inflasi rata-rata 2,30% pada 2024, terendah sejak 2021</span></a>
      <a class="topic" href="#/daerah"><strong>Daerah</strong><span>Bandingkan 10 provinsi terbesar menurut penduduk</span></a>
      <a class="topic" href="#/data"><strong>Katalog data</strong><span>Unduh deret waktu sebagai CSV, gratis tanpa daftar</span></a>
    </div>
  </section>`;
}

export function viewEconomy(year = 2024) {
  const growth = seriesValue(GDP_GROWTH, year);
  const nominal = seriesValue(GDP_NOMINAL, year);
  const perCapita = seriesValue(GDP_PER_CAPITA, year);
  const options = GDP_GROWTH.map(
    (d) => `<option value="${d.year}"${d.year === year ? " selected" : ""}>${d.year}</option>`,
  ).join("");
  const sectorRows = GDP_SECTORS.map(
    (s) => `<tr><td>${s.sector}</td><td class="num">${fmt(s.value, 1)}%</td></tr>`,
  ).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Ekonomi</p>
    <h1>Ekonomi Indonesia</h1>
    <p class="lede">PDB, pertumbuhan, dan perdagangan luar negeri — deret waktu 2015–2024
    dari Badan Pusat Statistik.</p>
  </section>

  <div class="year-picker">
    <label for="year-select">Pilih tahun:</label>
    <select id="year-select">${options}</select>
    <span id="year-summary">Pada ${year}, ekonomi tumbuh <strong>${fmt(growth)}%</strong>, PDB
    <strong>Rp${fmt(nominal, 0)} triliun</strong>, PDB per kapita
    <strong>US$${fmt(perCapita, 0)}</strong>.</span>
  </div>

  <section class="two-col" aria-label="Grafik ekonomi">
    ${chartCard("chart-gdp", "Pertumbuhan PDB 2015–2024", "Harga konstan, % y-on-y", "BPS, 2024")}
    ${chartCard("chart-gdp-nominal", "PDB nominal 2015–2024", "Harga berlaku, Rp triliun", "BPS, 2024")}
  </section>

  <section class="two-col" aria-label="Struktur dan perdagangan">
    <div class="panel">
      <h3>PDB menurut lapangan usaha, 2024</h3>
      <table class="data-table"><thead><tr><th>Lapangan usaha</th><th class="num">Pangsa PDB</th></tr></thead>
      <tbody>${sectorRows}</tbody></table>
      <p class="source">Sumber: BPS, 2024. Industri pengolahan tetap menjadi penopang
      terbesar, diikuti perdagangan dan pertanian.</p>
    </div>
    <div class="panel">
      <h3>Perdagangan luar negeri, 2024</h3>
      <dl class="stat-list">
        <div><dt>Ekspor</dt><dd>US$${fmt(TRADE.exports, 2)} miliar</dd></div>
        <div><dt>Impor</dt><dd>US$${fmt(TRADE.imports, 2)} miliar</dd></div>
        <div><dt>Neraca dagang</dt><dd>Surplus US$${fmt(TRADE.surplus, 2)} miliar</dd></div>
        <div><dt>PDB per kapita</dt><dd>US$${fmt(perCapita, 0)} (2024)</dd></div>
      </dl>
      <p class="source">Sumber: ${TRADE.source}. Surplus dagang 2024 adalah yang
      kelima berturut-turut sejak 2020.</p>
      <p><a class="btn" href="#/data">Unduh data PDB (CSV) →</a></p>
    </div>
  </section>`;
}

export function viewPopulation() {
  const ageRows = AGE_GROUPS.map(
    (a) => `<tr><td>${a.group}</td><td class="num">${fmt(a.value, 1)}%</td><td>${a.note}</td></tr>`,
  ).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Penduduk</p>
    <h1>Penduduk Indonesia</h1>
    <p class="lede">281,6 juta jiwa pada 2024 — negara keempat terpadat di dunia, dengan
    68% penduduk berusia produktif (15–64 tahun).</p>
  </section>
  <section class="two-col" aria-label="Grafik penduduk">
    ${chartCard("chart-pop", "Jumlah penduduk 2015–2024", "Juta jiwa — 2020 adalah hasil Sensus Penduduk", "BPS, 2024")}
    <div class="panel">
      <h3>Struktur usia, 2024</h3>
      <table class="data-table"><thead><tr><th>Kelompok usia</th><th class="num">Pangsa</th><th>Keterangan</th></tr></thead>
      <tbody>${ageRows}</tbody></table>
      <p class="source">Sumber: World Bank WDI, 2024. Rasio ketergantungan sekitar 47 per
      100 penduduk usia kerja — jendela bonus demografi masih terbuka.</p>
    </div>
  </section>
  <section aria-label="Provinsi terbesar">
    <h2 class="section-title">Provinsi terpadat <span>10 terbesar, 2024</span></h2>
    <p>Enam dari sepuluh provinsi terpadat berada di Pulau Jawa, yang menampung
    sekitar 56% penduduk Indonesia di 7% luas daratan.
    <a href="#/daerah">Lihat tabel lengkap daerah →</a></p>
    <div class="panel"><canvas id="chart-provinces" width="640" height="240" role="img" aria-label="Penduduk 10 provinsi terbesar"></canvas>
    <p class="source">Sumber: BPS, 2024.</p></div>
  </section>`;
}

export function viewLabour() {
  const sectorRows = EMPLOYMENT_SECTORS.map(
    (s) => `<tr><td>${s.sector}</td><td class="num">${fmt(s.value, 1)}%</td></tr>`,
  ).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Tenaga kerja</p>
    <h1>Tenaga Kerja &amp; Kesejahteraan</h1>
    <p class="lede">Angkatan kerja 147,49 juta orang (Agustus 2024). Pengangguran 4,91% —
    terendah dalam satu dekade — dan kemiskinan 8,57%, terendah sepanjang
    pencatatan BPS.</p>
  </section>
  <section class="two-col" aria-label="Grafik ketenagakerjaan">
    ${chartCard("chart-unemp", "Pengangguran terbuka 2015–2024", "% angkatan kerja, Agustus setiap tahun", "BPS Sakernas, 2024")}
    ${chartCard("chart-poverty", "Penduduk miskin 2015–2024", "% penduduk, September setiap tahun", "BPS, 2024")}
  </section>
  <section class="two-col" aria-label="Sektor dan pembangunan manusia">
    <div class="panel">
      <h3>Pekerja menurut lapangan usaha, Agu 2024</h3>
      <table class="data-table"><thead><tr><th>Sektor</th><th class="num">Pangsa pekerja</th></tr></thead>
      <tbody>${sectorRows}</tbody></table>
      <p class="source">Sumber: BPS Sakernas, Agustus 2024. Pertanian masih menyerap
      pekerja terbanyak, diikuti perdagangan dan industri pengolahan.</p>
    </div>
    <div class="panel">
      <h3>Pembangunan manusia</h3>
      <dl class="stat-list">
        <div><dt>IPM 2024</dt><dd>75,02 — status tinggi</dd></div>
        <div><dt>Harapan hidup</dt><dd>73,9 tahun (2024)</dd></div>
        <div><dt>Pengangguran pemuda</dt><dd>13,1% (2024, ILO)</dd></div>
        <div><dt>Partisipasi angkatan kerja</dt><dd>70,8% (2024)</dd></div>
      </dl>
      <p class="source">Sumber: BPS, 2024; ILO, 2024. IPM naik 0,63 poin dari 2023 —
      kenaikan tahunan terbesar sejak 2021.</p>
      <div class="mini-chart">${chartCard("chart-hdi", "IPM 2015–2024", "Indeks Pembangunan Manusia", "BPS, 2024", 640, 220)}</div>
    </div>
  </section>`;
}

export function viewPrices() {
  const rows = INFLATION_AVG.map((d, i) => {
    const dec = INFLATION_DEC[i];
    return `<tr><td>${d.year}</td><td class="num">${fmt(d.value)}%</td><td class="num">${fmt(dec.value)}%</td></tr>`;
  }).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Harga</p>
    <h1>Harga &amp; Inflasi</h1>
    <p class="lede">Inflasi Indonesia mereda ke 1,57% (Desember 2024, y-on-y) dari puncak
    5,51% pada Desember 2022 — kembali ke dalam sasaran Bank Indonesia
    2,5% ± 1%.</p>
  </section>
  <section class="two-col" aria-label="Grafik inflasi">
    ${chartCard("chart-inflation", "Inflasi rata-rata tahunan 2015–2024", "IHK, % per tahun", "BPS, 2024")}
    ${chartCard("chart-inflation-dec", "Inflasi Desember (y-on-y) 2015–2024", "IHK, % — titik akhir setiap tahun", "BPS, 2024")}
  </section>
  <section class="two-col" aria-label="Tabel inflasi">
    <div class="panel">
      <h3>Inflasi menurut tahun</h3>
      <table class="data-table" id="inflation-table"><thead><tr>
        <th>Tahun</th><th class="num">Rata-rata tahunan</th><th class="num">Desember (y-on-y)</th>
      </tr></thead><tbody>${rows}</tbody></table>
      <p class="source">Sumber: BPS, 2024. Tahun 2022 mencatat inflasi tertinggi
      dalam satu dekade setelah penyesuaian harga BBM bersubsidi.</p>
    </div>
    <div class="panel">
      <h3>Membaca angka inflasi</h3>
      <ul class="takeaways">
        <li><strong>Rata-rata tahunan</strong> membandingkan IHK rata-rata setahun
          dengan tahun sebelumnya — ukuran yang dipakai untuk target inflasi.</li>
        <li><strong>Desember y-on-y</strong> membandingkan IHK Desember dengan
          Desember tahun sebelumnya — titik akhir tahun kalender.</li>
        <li><strong>2024: 2,30% rata-rata, 1,57% Desember.</strong> Tekanan harga
          pangan mereda sepanjang semester kedua 2024.</li>
      </ul>
      <p><a class="btn" href="#/data">Unduh deret inflasi (CSV) →</a></p>
    </div>
  </section>`;
}

export function viewRegions() {
  const rows = PROVINCES.map(
    (p) => `<tr><td>${p.name}</td><td>${p.capital}</td>
      <td class="num" data-sort="${p.pop}">${fmt(p.pop, 2)}</td>
      <td class="num" data-sort="${p.share}">${fmt(p.share, 1)}%</td>
      <td class="num" data-sort="${p.density}">${fmt(p.density, 0)}</td></tr>`,
  ).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Daerah</p>
    <h1>Statistik Daerah</h1>
    <p class="lede">Bandingkan provinsi-provinsi Indonesia. Klik judul kolom untuk
    mengurutkan; ketik di kotak cari untuk menyaring.</p>
  </section>
  <div class="toolbar">
    <label for="region-filter">Cari provinsi:</label>
    <input id="region-filter" type="search" placeholder="mis. Jawa, Sumatera…" autocomplete="off">
    <span id="region-count">${PROVINCES.length} provinsi ditampilkan</span>
  </div>
  <div class="panel">
    <table class="data-table sortable" id="regions-table"><thead><tr>
      <th data-key="name">Provinsi ↕</th><th data-key="capital">Ibu kota ↕</th>
      <th class="num" data-key="pop">Penduduk (juta) ↕</th>
      <th class="num" data-key="share">Pangsa ↕</th>
      <th class="num" data-key="density">Kepadatan (/km²) ↕</th>
    </tr></thead><tbody>${rows}</tbody></table>
    <p class="source">Sumber: BPS, 2024. Tabel ini menampilkan 10 provinsi terbesar;
    Indonesia memiliki 38 provinsi. Kepadatan DKI Jakarta 15.367 jiwa/km² —
    lebih dari 100 kali rata-rata nasional 148 jiwa/km².</p>
  </div>
  <section aria-label="Grafik daerah">
    <h2 class="section-title">Penduduk menurut provinsi <span>10 terbesar, 2024</span></h2>
    <div class="panel"><canvas id="chart-regions" width="640" height="300" role="img" aria-label="Penduduk 10 provinsi terbesar"></canvas>
    <p class="source">Sumber: BPS, 2024.</p></div>
  </section>`;
}

export function viewData() {
  const rows = DATASETS.map(
    (d) => `<tr><td><a href="${d.file}" download>${d.name}</a></td>
      <td class="num">${d.rows} baris</td><td>${d.updated}</td><td>${d.size}</td></tr>`,
  ).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Katalog</p>
    <h1>Katalog Data</h1>
    <p class="lede">Semua deret waktu di situs ini bisa diunduh sebagai CSV — gratis,
    tanpa perlu mendaftar. Setiap berkas mencantumkan sumber dan tanggal
    pembaruan.</p>
  </section>
  <div class="panel">
    <table class="data-table"><thead><tr><th>Dataset</th><th class="num">Baris</th><th>Terakhir diperbarui</th><th>Ukuran</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <p class="source">Lisensi: data dapat digunakan ulang dengan menyebut sumber
    (BPS / World Bank). Berkas CSV memakai koma desimal Indonesia pada
    tampilan situs, tetapi titik desimal di dalam berkas agar mudah dibaca
    spreadsheet.</p>
  </div>
  <section aria-labelledby="releases-all">
    <h2 id="releases-all" class="section-title">Kalender rilis <span>Release calendar</span></h2>
    <ul class="releases">${RELEASES.map(releaseItem).join("")}</ul>
  </section>`;
}

export function viewAbout() {
  return `
  <section class="page-head">
    <p class="eyebrow">Tentang</p>
    <h1>Tentang NusaStat</h1>
    <p class="lede">NusaStat adalah portal percontohan statistik nasional Indonesia:
    satu tempat untuk menemukan angka resmi, memahami cara angka itu
    dihitung, dan mengunduh datanya.</p>
  </section>
  <section class="two-col">
    <div class="panel">
      <h3>Dari mana datanya?</h3>
      <ul class="takeaways">
        <li><strong>Badan Pusat Statistik (BPS)</strong> — PDB, inflasi, pengangguran,
          kemiskinan, IPM, dan penduduk. Survei Angkatan Kerja Nasional (Sakernas)
          untuk ketenagakerjaan; Survei Sosial Ekonomi Nasional (Susenas) untuk
          kemiskinan.</li>
        <li><strong>Bank Dunia (WDI)</strong> — PDB per kapita, struktur usia, dan
          indikator pembanding antarnegara.</li>
        <li><strong>ILO</strong> — pengangguran pemuda.</li>
      </ul>
      <p>Setiap angka di situs ini menampilkan sumber dan tahun rujukannya.
      Angka yang direvisi BPS akan diperbarui pada rilis berikutnya.</p>
    </div>
    <div class="panel">
      <h3>Metodologi singkat</h3>
      <ul class="takeaways">
        <li><strong>Pertumbuhan ekonomi</strong> dihitung dari PDB harga konstan
          (tahun dasar 2010) dibandingkan tahun sebelumnya.</li>
        <li><strong>Inflasi</strong> dihitung dari Indeks Harga Konsumen (IHK)
          90 kota; rata-rata tahunan membandingkan rata-rata IHK setahun.</li>
        <li><strong>Pengangguran terbuka</strong> adalah persentase angkatan kerja
          yang tidak bekerja dan sedang mencari pekerjaan (Sakernas, Agustus).</li>
        <li><strong>Kemiskinan</strong> memakai garis kemiskinan BPS berdasarkan
          kebutuhan minimum makanan dan non-makanan (Susenas, September).</li>
        <li><strong>IPM</strong> menggabungkan harapan hidup, harapan lama sekolah,
          rata-rata lama sekolah, dan pengeluaran per kapita.</li>
      </ul>
    </div>
  </section>
  <section class="panel">
    <h3>Kontak &amp; koreksi</h3>
    <p>Menemukan angka yang keliru atau ketinggalan zaman? Kirimkan koreksi
    beserta sumbernya — setiap perbaikan dicatat di halaman ini. NusaStat
    bukan situs resmi BPS; ini adalah portal percontohan yang menyajikan
    ulang data publik BPS dan Bank Dunia dengan atribusi yang jelas.</p>
  </section>`;
}

export const ROUTES = {
  "/": viewHome,
  "/ekonomi": viewEconomy,
  "/penduduk": viewPopulation,
  "/tenaga-kerja": viewLabour,
  "/harga": viewPrices,
  "/daerah": viewRegions,
  "/data": viewData,
  "/tentang": viewAbout,
};
