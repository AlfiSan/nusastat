// NusaStat chart kit — small canvas charts drawn with no library, so the
// first load stays light and every figure is rendered from app/data.js.
// Each function draws into a <canvas> and returns nothing; callers set the
// canvas size in CSS and pass matching pixel dimensions here.

const INK = "#1c2b29";
const MUTED = "#5c6f6c";
const GRID = "#dde5e2";
const TEAL = "#0e4f4a";
const TEAL_SOFT = "#7fb3ac";
const AMBER = "#e8a33d";
const RED = "#b3402e";
const GREEN = "#2e7d52";

function setupCanvas(canvas, width, height) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = "12px system-ui, -apple-system, 'Segoe UI', sans-serif";
  return ctx;
}

// Axis tick labels: large values are shortened to thousands ("rb") so
// they fit the left margin, e.g. 23910 becomes "23,9 rb".
function formatTick(v) {
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(1).replace(".", ",") + " rb";
  return v.toFixed(1).replace(".", ",");
}

// Vertical bar chart. `data` is [{label, value}]. `highlight` is a label
// whose bar gets the amber accent; negative bars are drawn in red.
export function drawBarChart(canvas, data, opts = {}) {
  const width = opts.width || 640;
  const height = opts.height || 300;
  const ctx = setupCanvas(canvas, width, height);
  const padL = 44;
  const padR = 10;
  const padT = 26;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = data.map((d) => d.value);
  let min = Math.min(0, ...values);
  let max = Math.max(0, ...values);
  if (max === min) max = min + 1;
  const pad = (max - min) * 0.08;
  min -= pad;
  max += pad;
  const y = (v) => padT + ((max - v) / (max - min)) * plotH;
  const zeroY = y(0);

  // Gridlines and y labels.
  const ticks = 4;
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 0; i <= ticks; i++) {
    const v = min + ((max - min) * i) / ticks;
    const yy = y(v);
    ctx.beginPath();
    ctx.moveTo(padL, yy);
    ctx.lineTo(width - padR, yy);
    ctx.stroke();
    ctx.fillText(formatTick(v), padL - 6, yy);
  }
  ctx.beginPath();
  ctx.moveTo(padL, zeroY);
  ctx.lineTo(width - padR, zeroY);
  ctx.strokeStyle = INK;
  ctx.stroke();

  // Bars.
  const slot = plotW / data.length;
  const barW = Math.min(34, slot * 0.62);
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  data.forEach((d, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(d.value, 0));
    const bottom = y(Math.min(d.value, 0));
    ctx.fillStyle = d.value < 0 ? RED : d.label === opts.highlight ? AMBER : TEAL;
    ctx.fillRect(cx - barW / 2, top, barW, Math.max(1, bottom - top));
    ctx.fillStyle = INK;
    ctx.font = "bold 12px system-ui, -apple-system, 'Segoe UI', sans-serif";
    ctx.fillText(String(d.value).replace(".", ",").replace("-", "−"), cx, top - 5);
    ctx.font = "12px system-ui, -apple-system, 'Segoe UI', sans-serif";
    ctx.fillStyle = MUTED;
    ctx.textBaseline = "top";
    ctx.fillText(d.label, cx, height - padB + 6);
    ctx.textBaseline = "bottom";
  });
  if (opts.unit) {
    ctx.fillStyle = MUTED;
    ctx.textAlign = "right";
    ctx.fillText(opts.unit, width - padR, 14);
  }
}

// Line chart with dots and value labels on the first/last points.
export function drawLineChart(canvas, data, opts = {}) {
  const width = opts.width || 640;
  const height = opts.height || 300;
  const ctx = setupCanvas(canvas, width, height);
  const padL = 44;
  const padR = 16;
  const padT = 26;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = data.map((d) => d.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;
  const x = (i) => padL + (plotW * i) / (data.length - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * plotH;

  const ticks = 4;
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 0; i <= ticks; i++) {
    const v = min + ((max - min) * i) / ticks;
    const yy = y(v);
    ctx.beginPath();
    ctx.moveTo(padL, yy);
    ctx.lineTo(width - padR, yy);
    ctx.stroke();
    ctx.fillText(formatTick(v), padL - 6, yy);
  }

  ctx.strokeStyle = TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  data.forEach((d, i) => {
    if (i === 0) ctx.moveTo(x(i), y(d.value));
    else ctx.lineTo(x(i), y(d.value));
  });
  ctx.stroke();

  data.forEach((d, i) => {
    ctx.fillStyle = i === data.length - 1 ? AMBER : TEAL;
    ctx.beginPath();
    ctx.arc(x(i), y(d.value), i === data.length - 1 ? 5 : 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = INK;
  ctx.font = "bold 12px system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(String(data[0].value).replace(".", ","), x(0), y(data[0].value) - 8);
  ctx.fillText(String(data[data.length - 1].value).replace(".", ","), x(data.length - 1), y(data[data.length - 1].value) - 8);
  ctx.font = "12px system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.fillStyle = MUTED;
  ctx.textBaseline = "top";
  data.forEach((d, i) => ctx.fillText(d.label, x(i), height - padB + 6));
  if (opts.unit) {
    ctx.fillStyle = MUTED;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText(opts.unit, width - padR, 14);
  }
}

// Donut chart with a legend drawn as HTML by the caller; the canvas draws
// the ring and the centre label only.
export function drawDonut(canvas, data, opts = {}) {
  const size = opts.size || 240;
  const ctx = setupCanvas(canvas, size, size);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = data.reduce((s, d) => s + d.value, 0);
  const palette = [TEAL, AMBER, "#2e7d52", "#7fb3ac", "#c96f3b", "#8a9ba8", "#5b7a94"];
  let start = -Math.PI / 2;
  data.forEach((d, i) => {
    const frac = d.value / total;
    const end = start + frac * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = palette[i % palette.length];
    ctx.fill();
    start = end;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "bold 22px system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(opts.centre || "", cx, cy - 8);
  ctx.fillStyle = MUTED;
  ctx.font = "12px system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.fillText(opts.centreSub || "", cx, cy + 14);
}

// Horizontal bars, one row per item, with the value at the end of the bar.
export function drawHBarChart(canvas, data, opts = {}) {
  const width = opts.width || 640;
  const rowH = opts.rowHeight || 34;
  const height = data.length * rowH + 16;
  const ctx = setupCanvas(canvas, width, height);
  const labelW = opts.labelWidth || 150;
  const padR = 56;
  const max = Math.max(...data.map((d) => d.value));
  ctx.font = "13px system-ui, -apple-system, 'Segoe UI', sans-serif";
  data.forEach((d, i) => {
    const y = 8 + i * rowH;
    const barH = 20;
    ctx.fillStyle = INK;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(d.label, labelW - 10, y + barH / 2);
    const w = ((width - labelW - padR) * d.value) / max;
    ctx.fillStyle = d.label === opts.highlight ? AMBER : TEAL;
    ctx.fillRect(labelW, y, Math.max(2, w), barH);
    ctx.fillStyle = INK;
    ctx.textAlign = "left";
    ctx.fillText(d.valueText || String(d.value).replace(".", ","), labelW + w + 8, y + barH / 2);
  });
}

export const CHART_COLORS = { teal: TEAL, amber: AMBER, muted: MUTED, ink: INK };
