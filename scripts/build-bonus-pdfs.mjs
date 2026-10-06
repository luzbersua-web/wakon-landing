// Genera los PDFs de los bonos desde src/workbooksContent.*.js (HTML -> Chrome headless).
// Cada página de día se ajusta sola (JS) para llenar exactamente una hoja A4.
// Uso: node scripts/build-bonus-pdfs.mjs   -> ../bonos-pdf/*.pdf
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(root, "..", "bonos-pdf");
fs.mkdirSync(out, { recursive: true });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const T = {
  es: { day: "DÍA", goal: "OBJETIVO", win: "VICTORIA DEL DÍA", start: "EMPIEZA AQUÍ", after: "Haz este bono después del Bono #1 y antes de (o junto con) tu plan de 30 días.",
        startNote: "Haz este reto primero. No necesitas esperar a terminarlo para abrir tu app de 30 días: puedes usarla desde hoy.", timer: "Temporizador", lang: "es", free: "GRATIS",
        intro: "ANTES DE EMPEZAR", daily: "Tu progreso", page: "Página", file: (n) => `bono-${n}-es.pdf` },
  en: { day: "DAY", goal: "GOAL", win: "WIN OF THE DAY", start: "START HERE", after: "Do this bonus after Bonus #1 and before (or alongside) your 30-day plan.",
        startNote: "Do this challenge first. You don't have to finish it before opening your 30-day app: you can use it from today.", timer: "Timer", lang: "en", free: "FREE",
        intro: "BEFORE YOU START", daily: "Your progress", page: "Page", file: (n) => `bonus-${n}-en.pdf` },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const lines = (n) => Array.from({ length: n }, () => `<div class="line"></div>`).join("");
const fmtTime = (s) => (s >= 60 ? `${s / 60} min` : `${s} s`);

function block(b, t) {
  switch (b.t) {
    case "h": return `<h4>${esc(b.text)}</h4>`;
    case "p": return `<p>${esc(b.text)}</p>`;
    case "list": return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    case "quote": return `<div class="quote">${esc(b.text)}</div>`;
    case "challenge": return `<div class="challenge"><b>${esc(b.title)}</b><br>${esc(b.text)}</div>`;
    case "timer": return `<div class="timer">⏱ ${t.timer}: ${fmtTime(b.seconds)}</div>`;
    case "field": return `<div class="field"><label>${esc(b.label)}</label>${lines(Math.max(1, b.rows || 2))}</div>`;
    case "check": return `<div class="check"><span class="box"></span>${esc(b.label)}</div>`;
    default: return "";
  }
}

function footer(w, t, n) {
  return `<div class="foot"><span>Start<b>Now</b> · ${esc(w.title)}</span><span>${t.page} ${n}</span></div>`;
}

function html(w, t, accent, extra) {
  const pages = [];
  let n = 1;
  const imgData = w.img ? "data:image/jpeg;base64," + fs.readFileSync(path.join(root, "public", w.img)).toString("base64") : null;
  const valueHtml = `<div class="value">${esc(w.valueLabel)} <s>${esc(w.valueAmount)}</s> <b>${t.free}</b></div>`;
  pages.push(imgData ? `<section class="page cover withimg">
    <img class="hero" src="${imgData}">
    ${valueHtml}
    <div class="note">${esc(extra)}</div>
  </section>` : `<section class="page cover">
    <div class="brand">Start<span>Now</span></div>
    <div class="coverbody">
      <div class="badge">${esc(w.badge.replace("🎁 ", ""))}</div>
      <h1>${esc(w.title)}</h1>
      <p class="tag">${esc(w.tagline)}</p>
      ${valueHtml}
      <div class="note">${esc(extra)}</div>
    </div>
  </section>`);
  n++;
  pages.push(`<section class="page fit" data-max="17"><div class="inner"><div class="kicker">${t.intro}</div><h2>${esc(w.title)}</h2>
    ${w.intro.map((p) => `<p class="lead">${esc(p)}</p>`).join("")}
    ${w.features ? `<ul class="feat">${w.features.map((f) => `<li>✓ ${esc(f)}</li>`).join("")}</ul>` : ""}
    <div class="tracker"><b>${t.daily}</b><div class="dots">${w.days.map((d) => `<span><i></i>${t.day} ${d.n}</span>`).join("")}</div></div></div>${footer(w, t, n)}</section>`);
  n++;
  for (const d of w.days) {
    pages.push(`<section class="page fit day" data-max="13"><div class="inner"><div class="kicker">${t.day} ${d.n}</div><h2>${d.icon} ${esc(d.title)}</h2>
      <div class="goal"><b>${t.goal}:</b> ${esc(d.objective)}</div>
      ${d.blocks.map((b) => block(b, t)).join("")}
      <div class="win"><b>✅ ${t.win}</b><br>${esc(d.win)}</div></div>${footer(w, t, n)}</section>`);
    n++;
  }
  const c = w.closing;
  pages.push(`<section class="page cover end"><div class="brand">Start<span>Now</span></div>
    <div class="coverbody"><h1>${esc(c.title)}</h1>${c.paragraphs.map((p) => `<p class="lead">${esc(p)}</p>`).join("")}
    ${w.bridge ? `<div class="quote big">${esc(w.bridge)}</div>` : ""}<div class="sig">${esc(c.signature)}</div></div></section>`);
  return `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8"><style>
  @page{size:210mm 297mm;margin:0}
  *{box-sizing:border-box}
  :root{--a:${accent}}
  html,body{margin:0;padding:0}
  body{font-family:"Segoe UI",Arial,sans-serif;color:#2b2b3d;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .page{width:210mm;height:297mm;overflow:hidden;position:relative;page-break-after:always;break-after:page}
  .page:last-child{page-break-after:auto;break-after:auto}
  .fit{padding:15mm 18mm 20mm 22mm;font-size:11pt;display:flex;flex-direction:column}
  .fit::before{content:"";position:absolute;left:0;top:0;bottom:0;width:7mm;background:var(--a)}
  .inner{flex:1;display:flex;flex-direction:column;min-height:0}
  .foot{position:absolute;left:22mm;right:18mm;bottom:8mm;display:flex;justify-content:space-between;font-size:8pt;color:#9a9aae;border-top:.3mm solid #e6e6ee;padding-top:2.5mm}
  .foot b{color:var(--a)}
  .kicker{font-size:.85em;font-weight:800;letter-spacing:.18em;color:var(--a)}
  h2{font-family:Georgia,serif;font-size:2em;line-height:1.15;color:#1a1a2e;margin:.25em 0 .5em}
  h4{font-size:1.1em;color:#1a1a2e;margin:.9em 0 .1em}
  p{font-size:1em;line-height:1.5;margin:.4em 0}
  .lead{font-size:1.1em;line-height:1.6;margin:.7em 0}
  ul{font-size:1em;line-height:1.5;margin:.4em 0;padding-left:1.4em}
  li{margin:.15em 0}
  .goal{background:#f4f5ff;border-radius:.6em;padding:.6em .9em;font-size:1em;line-height:1.45;margin-bottom:.5em}
  .quote{border-left:.3em solid var(--a);background:#f7f6f2;padding:.65em .95em;font-family:Georgia,serif;font-size:1.05em;line-height:1.5;margin:.6em 0;border-radius:0 .6em .6em 0}
  .quote.big{font-size:1.3em;margin-top:1.4em}
  .challenge{background:#fff8e6;border:.08em solid #f3d98b;border-radius:.6em;padding:.65em .95em;line-height:1.5;margin:.6em 0}
  .timer{align-self:flex-start;background:#eef0fd;color:var(--a);font-weight:700;font-size:.92em;border-radius:99px;padding:.3em .95em;margin:.5em 0}
  .field{margin:.6em 0}
  .field label{font-size:.95em;font-weight:700;color:#1a1a2e;display:block}
  .line{border-bottom:.07em solid #b9b9c6;height:calc(var(--lh,1.9) * 1em)}
  .check{display:flex;align-items:center;gap:.7em;margin:.5em 0}
  .box{width:1.15em;height:1.15em;border:.12em solid var(--a);border-radius:.25em;flex-shrink:0}
  .win{margin-top:auto;background:#f0fbf6;border:.08em solid #2fb380;border-radius:.6em;padding:.7em 1em;font-family:Georgia,serif;font-size:1.05em;line-height:1.5}
  .win b{font-family:"Segoe UI",Arial,sans-serif;font-size:.8em;letter-spacing:.12em;color:#2fb380}
  .inner > .win{flex-shrink:0}
  .cover{background:linear-gradient(160deg,#eef0ff 0%,#fff 60%);border-bottom:12mm solid var(--a);display:flex;align-items:center;padding:0 24mm}
  .brand{position:absolute;top:16mm;left:24mm;font-weight:800;font-size:17pt;color:#1a1a2e}.brand span{color:#4C5FE0}
  .coverbody{width:100%}
  .withimg{flex-direction:column;justify-content:center;padding:14mm 24mm 22mm}
  .withimg .hero{height:178mm;width:auto;border-radius:5mm;box-shadow:0 3mm 10mm rgba(0,0,0,.18)}
  .withimg .value{margin-top:8mm}
  .withimg .note{margin-top:7mm;padding:4mm 5mm;font-size:11pt;width:100%}
  .value s{color:#8a8a9a;font-weight:600}.value b{color:#2fb380;margin-left:2mm}
  .badge{display:inline-block;background:var(--a);color:#fff;font-weight:800;font-size:11pt;letter-spacing:.14em;padding:2.5mm 6mm;border-radius:99px;margin-bottom:10mm}
  .cover h1{font-family:Georgia,serif;font-size:44pt;line-height:1.08;color:#1a1a2e;margin:0 0 9mm}
  .tag{font-size:16pt;line-height:1.5;color:#4a4a60;margin:0}
  .value{margin-top:10mm;font-weight:700;font-size:13pt;color:var(--a)}
  .note{margin-top:18mm;border:.5mm dashed var(--a);border-radius:4mm;padding:5mm 6mm;font-size:12.5pt;line-height:1.55;background:#fff}
  .end .lead{font-size:14pt;line-height:1.6;margin:5mm 0}
  .end h1{font-size:32pt}.sig{margin-top:10mm;font-family:Georgia,serif;font-style:italic;font-size:16pt}
  .feat{list-style:none;padding:0;columns:2;margin:1em 0}.feat li{margin:.4em 0}
  .tracker{margin-top:auto;border:.07em solid #dcdcea;border-radius:.7em;padding:.8em 1em}
  .dots{display:flex;gap:1em;margin-top:.7em;flex-wrap:wrap}.dots span{display:flex;align-items:center;gap:.4em;font-size:.95em}
  .dots i{width:1.15em;height:1.15em;border:.12em solid var(--a);border-radius:50%;display:inline-block}
  </style></head><body>${pages.join("")}
  <script>
  // Elige el tamaño de letra más grande con el que el contenido cabe en la página.
  document.querySelectorAll(".fit").forEach((pg) => {
    const inner = pg.querySelector(".inner");
    const max = parseFloat(pg.dataset.max) || 14;
    const fits = () => inner.scrollHeight <= inner.clientHeight + 1;
    // Prioriza letra grande; si no cabe, primero compacta las líneas de escritura y luego baja la letra.
    outer: for (let size = max; size >= 8; size -= 0.25) {
      for (const lh of [3.4, 3.0, 2.6, 2.2, 1.9, 1.6, 1.35]) {
        pg.style.fontSize = size + "pt"; pg.style.setProperty("--lh", lh);
        if (fits()) break outer;
      }
    }
  });
  </script></body></html>`;
}

const tmp = path.join(out, "_tmp");
fs.mkdirSync(tmp, { recursive: true });
for (const lang of ["es", "en"]) {
  const mod = await import(pathToFileURL(path.join(root, "src", `workbooksContent.${lang}.js`)).href);
  const t = T[lang];
  for (const w of mod.default) {
    const accent = w.number === 1 ? "#4C5FE0" : "#2fb380";
    const extra = w.number === 1 ? `${t.start} — ${t.startNote}` : t.after;
    const f = path.join(tmp, `${lang}-${w.number}.html`);
    fs.writeFileSync(f, html(w, t, accent, extra));
    const pdf = path.join(out, t.file(w.number));
    execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000", `--user-data-dir=${path.join(tmp, "chrome")}`, `--print-to-pdf=${pdf}`, pathToFileURL(f).href], { stdio: "ignore", timeout: 90000 });
    console.log("ok", pdf);
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
