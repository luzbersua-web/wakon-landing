/* ============================================================
   MOTOR DEL QUIZ (compartido) — todo el texto vive en content.js
   (STRINGS, QUESTIONS, TESTIMONIALS, PLANS, FAQ, BONUS_MODULES).
   No debería hacer falta tocar este archivo para traducir o
   cambiar contenido.
   ============================================================ */

const S = STRINGS;

const state = {
  step: 0,                 // índice dentro del flujo (steps[])
  answers: {},              // { questionN: value | [values] }
  gender: null,
  age: null,
  name: "",
  email: "",
  selectedPlan: "essential",
};

const root = document.getElementById("app");

function buildSteps() {
  const steps = ["gender", "age", "social-proof"];
  QUESTIONS.forEach(q => {
    steps.push({ type: "question", data: q });
    if (INTERSTITIALS[q.n]) steps.push({ type: "interstitial", data: INTERSTITIALS[q.n] });
  });
  steps.push("results-loading", "results", "plan-ready", "name", "email", "included", "pricing", "checkout");
  return steps;
}
const STEPS = buildSteps();

function go(delta) {
  state.step = Math.max(0, Math.min(STEPS.length - 1, state.step + delta));
  render();
  window.scrollTo(0, 0);
}
function goTo(step) { state.step = step; render(); window.scrollTo(0, 0); }

function render() {
  const step = STEPS[state.step];
  const key = typeof step === "string" ? step : step.type;
  const renderers = {
    "gender": renderGender,
    "age": renderAge,
    "social-proof": renderSocialProof,
    "question": () => renderQuestion(step.data),
    "interstitial": () => renderInterstitial(step.data),
    "results-loading": renderResultsLoading,
    "results": renderResults,
    "plan-ready": renderPlanReady,
    "name": renderName,
    "email": renderEmail,
    "included": renderIncluded,
    "pricing": renderPricing,
    "checkout": renderCheckout,
  };
  root.innerHTML = "";
  renderers[key]();
}

function topBar(withProgress) {
  const bar = document.createElement("div");
  bar.className = "topbar";
  const back = document.createElement("button");
  back.className = "back-btn";
  back.textContent = "‹";
  back.onclick = () => go(-1);
  bar.appendChild(back);
  if (withProgress) {
    const track = document.createElement("div");
    track.className = "progress-track";
    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = (withProgress.n / 23 * 100) + "%";
    track.appendChild(fill);
    bar.appendChild(track);
    const count = document.createElement("div");
    count.className = "progress-count";
    count.textContent = `${withProgress.n}/23`;
    bar.appendChild(count);
  }
  return bar;
}

function logoEl() {
  const d = document.createElement("div");
  d.className = "logo";
  d.innerHTML = `${BRAND.replace(/(Now|Day|Start)/,'<span>$1</span>')}`;
  return d;
}

/* ---------------- intro screens ---------------- */
function renderGender() {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(logoEl());
  const h = document.createElement("h1");
  h.className = "headline";
  h.textContent = S.gender.headline;
  s.appendChild(h);
  const sub = document.createElement("p");
  sub.className = "subheadline";
  sub.textContent = S.gender.sub;
  s.appendChild(sub);

  const grid = document.createElement("div");
  grid.className = "gender-grid";
  [["male", S.gender.male, "/shared/images/male-avatar.jpg"], ["female", S.gender.female, "/shared/images/female-avatar.jpg"]].forEach(([key, label, img]) => {
    const card = document.createElement("button");
    card.className = `gender-card ${key}` + (state.gender === key ? " selected" : "");
    card.innerHTML = `<img src="${img}" alt="${label}"><div class="label">${label} <span>›</span></div>`;
    card.onclick = () => { state.gender = key; render(); };
    grid.appendChild(card);
  });
  s.appendChild(grid);

  const btn = primaryBtn(S.continueBtn, () => { if (state.gender) go(1); });
  if (!state.gender) btn.style.opacity = "0.5";
  s.appendChild(btn);

  const testimonialIntro = document.createElement("p");
  testimonialIntro.className = "helper-text";
  testimonialIntro.style.textAlign = "center";
  testimonialIntro.style.margin = "22px 0 12px";
  testimonialIntro.textContent = S.gender.testimonialIntro;
  s.appendChild(testimonialIntro);

  [0, 3, 1].map((i) => TESTIMONIALS[i]).forEach((t) => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <div class="who"><img class="avatar" src="${t.img}" alt="${t.name}"><div><div class="name">${t.name}</div><div class="role">${t.role}</div></div></div>
      <div class="quote">${t.quote}</div>
      <div class="body">${t.body}</div>
      <div class="stars">★★★★★</div><div class="date">${t.date}</div>
    `;
    s.appendChild(card);
  });

  root.appendChild(s);
}

function renderAge() {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(topBar());
  s.innerHTML += `<div class="icon-badge">👥</div>
    <div class="q-title">${S.age.title}</div>
    <div class="q-subtitle">${S.age.subtitle}</div>`;
  const opts = document.createElement("div");
  opts.className = "options";
  S.age.options.forEach(label => {
    const o = document.createElement("div");
    o.className = "option";
    o.textContent = label;
    o.onclick = () => { state.age = label; go(1); };
    opts.appendChild(o);
  });
  s.appendChild(opts);
  root.appendChild(s);
}

const MAP_PINS = [
  { left: "6%", top: "56%", size: 48, img: "/shared/images/male-avatar.jpg" },
  { left: "22%", top: "8%", size: 58, img: "/shared/images/testimonial-1.jpg" },
  { left: "46%", top: "42%", size: 44, img: "/shared/images/testimonial-2.jpg" },
  { left: "60%", top: "4%", size: 50, img: "/shared/images/testimonial-4.jpg" },
  { left: "28%", top: "72%", size: 54, img: "/shared/images/female-avatar.jpg" },
  { left: "80%", top: "32%", size: 60, img: "/shared/images/testimonial-3.jpg" },
  { left: "66%", top: "68%", size: 46, img: "/shared/images/testimonial-5.jpg" },
];

function renderSocialProof() {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(topBar());
  s.innerHTML += `
    <h1 class="headline">${S.socialProof.pre}<span style="color:var(--blue)">${S.socialProof.highlight}</span></h1>
    <p class="subheadline">${S.socialProof.sub}</p>
    <div class="callout-box" style="text-align:center;">${S.socialProof.callout}</div>
    <div class="world-map">
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="none">
        <circle cx="200" cy="130" r="118" fill="none" stroke="var(--lavender-dark)" stroke-width="2"/>
        <circle cx="200" cy="130" r="82" fill="none" stroke="var(--lavender-dark)" stroke-width="2"/>
        <circle cx="200" cy="130" r="46" fill="none" stroke="var(--lavender-dark)" stroke-width="2"/>
        <ellipse cx="200" cy="130" rx="42" ry="118" fill="none" stroke="var(--lavender-dark)" stroke-width="2"/>
        <ellipse cx="200" cy="130" rx="82" ry="118" fill="none" stroke="var(--lavender-dark)" stroke-width="2"/>
        <line x1="82" y1="130" x2="318" y2="130" stroke="var(--lavender-dark)" stroke-width="2"/>
      </svg>
      ${MAP_PINS.map((p) => `
        <div class="map-pin" style="left:${p.left};top:${p.top};--pin-size:${p.size}px;">
          <img src="${p.img}" alt="">
        </div>
      `).join("")}
    </div>
  `;
  s.appendChild(primaryBtn(S.continueBtn, () => go(1)));
  root.appendChild(s);
}

/* ---------------- questions ---------------- */
function renderQuestion(q) {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(topBar(q));
  s.innerHTML += `<div class="icon-badge">${q.icon}</div>
    <div class="q-title">${q.text}</div>
    ${q.subtitle ? `<div class="q-subtitle">${q.subtitle}</div>` : ""}`;

  const opts = document.createElement("div");
  opts.className = "options";

  if (q.type === "scale") {
    SCALE_OPTIONS.forEach(o => {
      const el = document.createElement("div");
      el.className = "option";
      el.innerHTML = `<span class="opt-icon">${o.icon}</span> ${o.label}`;
      el.onclick = () => { state.answers[q.n] = o; go(1); };
      opts.appendChild(el);
    });
  } else if (q.type === "single") {
    q.options.forEach(o => {
      const el = document.createElement("div");
      el.className = "option";
      el.textContent = o.label;
      el.onclick = () => { state.answers[q.n] = o.label; go(1); };
      opts.appendChild(el);
    });
  } else if (q.type === "multi") {
    const selected = new Set(state.answers[q.n] || []);
    q.options.forEach(o => {
      const el = document.createElement("div");
      el.className = "option" + (selected.has(o.label) ? " selected" : "");
      el.innerHTML = `${o.icon ? `<span class="opt-emoji">${o.icon}</span>` : ""} ${o.label} <span class="checkbox"></span>`;
      el.onclick = () => {
        selected.has(o.label) ? selected.delete(o.label) : selected.add(o.label);
        state.answers[q.n] = [...selected];
        render();
      };
      opts.appendChild(el);
    });
    s.appendChild(opts);
    const btn = primaryBtn(S.continueBtn, () => go(1));
    s.appendChild(btn);
    root.appendChild(s);
    return;
  }
  s.appendChild(opts);
  root.appendChild(s);
}

/* ---------------- interstitials ---------------- */
function renderInterstitial(data) {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(topBar());
  const h = document.createElement("h1");
  h.className = "headline";
  h.textContent = data.title;
  s.appendChild(h);

  if (data.cards) {
    data.cards.forEach(c => {
      const box = document.createElement("div");
      box.className = "callout-box";
      box.innerHTML = `<div class="callout-title">${c.heading}</div><div>${c.body}</div>`;
      s.appendChild(box);
    });
  }
  if (data.subtitle) {
    const p = document.createElement("p");
    p.className = "subheadline";
    p.textContent = data.subtitle;
    s.appendChild(p);
  }
  if (data.bullets) {
    const box = document.createElement("div");
    box.className = "callout-box";
    data.bullets.forEach(b => {
      box.innerHTML += `<div class="bullet-row"><div class="icon-badge">${b.icon}</div><div>${b.text}</div></div>`;
    });
    s.appendChild(box);
  }
  if (data.body) {
    const p = document.createElement("p");
    p.className = "subheadline";
    p.style.textAlign = "left";
    p.textContent = data.body;
    s.appendChild(p);
  }
  if (data.approach) {
    const box = document.createElement("div");
    box.className = "callout-box";
    box.innerHTML = `<b>${S.approachIntro}</b><ul style='margin-top:8px;padding-left:18px;'>` +
      data.approach.map(a => `<li>${a}</li>`).join("") + "</ul>";
    s.appendChild(box);
  }
  if (data.badge) {
    const b = document.createElement("div");
    b.className = "badge-pill";
    b.textContent = data.badge;
    s.appendChild(b);
  }
  s.appendChild(primaryBtn(S.continueBtn, () => go(1)));
  root.appendChild(s);
}

/* ---------------- results ---------------- */
function computeResult() {
  const scaleAnswers = Object.entries(state.answers)
    .map(([n, v]) => QUESTIONS.find(q => q.n == n && q.type === "scale") ? v.weight : null)
    .filter(v => v !== null);
  const avg = scaleAnswers.length ? scaleAnswers.reduce((a, b) => a + b, 0) / scaleAnswers.length : 1.5;
  const score = Math.round((avg / 3) * 100 * 10) / 10; // 0-100

  let stress = S.results.stressLevels.low;
  if (score > 70) stress = S.results.stressLevels.high;
  else if (score > 40) stress = S.results.stressLevels.medium;
  else if (score > 20) stress = S.results.stressLevels.average;

  const triggers = state.answers[17] || [];
  const mainTrigger = triggers[0] || S.results.defaultTrigger;

  const avoidanceKey = (state.answers[4] && state.answers[4].label === SCALE_OPTIONS[0].label)
    ? "overwhelm"
    : (state.answers[5] && state.answers[5].label === SCALE_OPTIONS[0].label)
      ? "distraction"
      : "overwhelm";
  const avoidance = S.results.avoidancePatterns[avoidanceKey];

  return { score, stress, mainTrigger, avoidance, avoidanceKey };
}

function persistStartNowResult() {
  const r = computeResult();
  const plan = PLANS.find(p => p.key === state.selectedPlan);
  const payload = {
    name: state.name || "",
    gender: state.gender,
    age: state.age,
    score: r.score,
    stress: r.stress,
    mainTrigger: r.mainTrigger,
    avoidanceKey: r.avoidanceKey,
    triggers: state.answers[17] || [],
    planKey: plan.key,
    includedModules: plan.modules,
    savedAt: Date.now(),
  };
  try { localStorage.setItem("startnow_quiz_result", JSON.stringify(payload)); } catch (e) {}
}

function renderResultsLoading() {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(logoEl());
  s.innerHTML += `<h2 style="text-align:center;margin-bottom:24px;">${S.resultsLoading.headlinePre}<span style="color:var(--blue);">${S.resultsLoading.headlineHighlight}</span>${S.resultsLoading.headlinePost}</h2>`;

  const rows = S.resultsLoading.steps.map(step => {
    const row = document.createElement("div");
    row.style.marginBottom = "16px";
    row.innerHTML = `
      <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600;margin-bottom:6px;">
        <span>${step.label}</span>
        <span class="pct">0%</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:0%;"></div></div>
    `;
    s.appendChild(row);
    return { fill: row.querySelector(".progress-fill"), pct: row.querySelector(".pct") };
  });

  const t = document.createElement("div");
  t.className = "testimonial-card";
  t.innerHTML = `<div class="stars" style="margin-bottom:8px;">★★★★★</div>
    <div class="quote">${S.resultsLoading.testimonialQuote}</div>
    <div class="body">"${S.resultsLoading.testimonialBody}"</div>
    <div style="font-size:12px;color:var(--text-soft);">${S.resultsLoading.testimonialAuthor}</div>`;
  s.appendChild(t);
  root.appendChild(s);

  const STEP_DURATION = 2400;
  const STEP_GAP = 400;

  function animateStep(row, onDone) {
    const start = performance.now();
    row.fill.style.transition = "none";
    row.fill.style.width = "0%";
    requestAnimationFrame(() => {
      row.fill.style.transition = `width ${STEP_DURATION}ms ease`;
      row.fill.style.width = "100%";
    });
    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / STEP_DURATION) * 100));
      row.pct.textContent = pct + "%";
      if (elapsed < STEP_DURATION) {
        requestAnimationFrame(tick);
      } else {
        row.pct.textContent = "✅";
        onDone();
      }
    }
    requestAnimationFrame(tick);
  }

  let i = 0;
  function next() {
    if (i >= rows.length) { setTimeout(() => go(1), 900); return; }
    animateStep(rows[i], () => { i++; setTimeout(next, STEP_GAP); });
  }
  next();
}

function renderResults() {
  const r = computeResult();
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(logoEl());
  s.innerHTML += `<h2 style="text-align:center;margin-bottom:16px;">${S.results.title}</h2>`;

  const gauge = document.createElement("div");
  gauge.className = "score-gauge";
  gauge.innerHTML = `
    <div>${S.results.youLabel} - <span class="score-value">${r.score}</span></div>
    <div class="score-bar"><div class="score-marker" style="left:${r.score}%;"></div></div>
    <div class="score-labels">${S.results.scoreLabels.map(l => `<span>${l}</span>`).join("")}</div>
  `;
  s.appendChild(gauge);

  [["⚡", S.results.statLabels[0], r.stress], ["🎯", S.results.statLabels[1], r.mainTrigger], ["🌀", S.results.statLabels[2], r.avoidance]]
    .forEach(([icon, label, value]) => {
      const row = document.createElement("div");
      row.className = "stat-row";
      row.innerHTML = `<div class="icon-badge">${icon}</div><div><div class="label">${label}</div><div class="value">${value}</div></div>`;
      s.appendChild(row);
    });

  const copy = document.createElement("div");
  copy.className = "result-copy";
  copy.textContent = S.results.copyTemplate(r.stress);
  s.appendChild(copy);

  s.appendChild(primaryBtn(S.continueBtn, () => go(1)));
  root.appendChild(s);
}

function renderPlanReady() {
  const s = document.createElement("div");
  s.className = "screen";
  s.style.textAlign = "center";
  s.appendChild(logoEl());
  const targetDate = new Date(Date.now() + 30 * 86400000).toLocaleDateString(S.locale, { weekday: "short", month: "short", day: "2-digit", year: "numeric" });

  const card = document.createElement("div");
  card.className = "callout-box";
  card.style.padding = "16px 12px 14px";
  card.innerHTML = `
    <div class="chart-wrap">
      <svg viewBox="0 0 300 170" preserveAspectRatio="none" style="width:100%;height:100%;display:block;">
        <line x1="40" y1="0" x2="40" y2="130" stroke="var(--lavender-dark)" stroke-dasharray="3,3"/>
        <line x1="170" y1="0" x2="170" y2="130" stroke="var(--lavender-dark)" stroke-dasharray="3,3"/>
        <line x1="270" y1="0" x2="270" y2="130" stroke="var(--lavender-dark)" stroke-dasharray="3,3"/>
        <defs>
          <linearGradient id="planCurveGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="var(--yellow)"/>
            <stop offset="55%" stop-color="var(--green)"/>
            <stop offset="100%" stop-color="var(--green)"/>
          </linearGradient>
        </defs>
        <path d="M0,128 C25,120 45,136 70,128 C95,120 120,138 150,128 C180,118 205,136 230,126 C255,116 280,132 300,124" fill="none" stroke="var(--red)" stroke-width="2.5" opacity=".55"/>
        <path d="M0,115 C20,108 30,95 40,90 C90,72 130,55 170,45 C210,36 245,20 270,10 C285,4 300,-4 312,-16" fill="none" stroke="url(#planCurveGrad)" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="40" cy="90" r="5" fill="var(--yellow)"/>
        <circle cx="170" cy="45" r="5" fill="var(--green)"/>
        <circle cx="270" cy="10" r="6" fill="var(--green)"/>
        <text x="40" y="148" font-size="11" fill="#4A4A68" text-anchor="middle">${S.planReady.months[0]}</text>
        <text x="170" y="148" font-size="11" fill="#4A4A68" text-anchor="middle">${S.planReady.months[1]}</text>
        <text x="270" y="148" font-size="11" fill="#4A4A68" text-anchor="middle">${S.planReady.months[2]}</text>
      </svg>
      <div class="chart-bubble" style="left:${(40 / 300 * 100).toFixed(2)}%;top:${(90 / 170 * 100).toFixed(2)}%;">${S.planReady.lessAvoidance}</div>
      <div class="chart-bubble" style="left:${(170 / 300 * 100).toFixed(2)}%;top:${(45 / 170 * 100).toFixed(2)}%;">${S.planReady.momentum}</div>
      <div class="chart-bubble" style="left:${(240 / 300 * 100).toFixed(2)}%;top:${(38 / 170 * 100).toFixed(2)}%;">${S.planReady.habitInstalled}</div>
    </div>
    <div class="chart-legend">
      <div class="chart-legend-item"><span class="chart-dot" style="background:var(--green)"></span>${S.planReady.legendWith} ${BRAND}</div>
      <div class="chart-legend-item"><span class="chart-dot" style="background:var(--red)"></span>${S.planReady.legendWithout}</div>
    </div>
  `;
  s.appendChild(card);

  const disclaimer = document.createElement("p");
  disclaimer.className = "chart-disclaimer";
  disclaimer.textContent = S.planReady.disclaimer;
  s.appendChild(disclaimer);

  const headline = document.createElement("h2");
  headline.className = "plan-ready-headline";
  headline.innerHTML = `${S.planReady.headlinePre}<span style="color:var(--green)">${S.planReady.headlineHighlight}</span>${S.planReady.headlinePost}`;
  s.appendChild(headline);

  const sub = document.createElement("p");
  sub.className = "subheadline";
  sub.style.marginBottom = "16px";
  sub.innerHTML = `${S.planReady.subPre} <b>${targetDate}</b>`;
  s.appendChild(sub);

  s.appendChild(primaryBtn(S.continueBtn, () => go(1)));
  root.appendChild(s);
}

function renderName() {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(logoEl());
  s.innerHTML += `<h2 style="margin-bottom:16px;">${S.name.title}</h2>`;
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = S.name.placeholder;
  input.value = state.name;
  input.oninput = e => state.name = e.target.value;
  s.appendChild(input);
  s.appendChild(primaryBtn(S.continueBtn, () => go(1)));
  root.appendChild(s);
}

function renderEmail() {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(logoEl());
  s.innerHTML += `<h2 style="text-align:center;margin-bottom:16px;">${S.email.title}</h2>`;
  const input = document.createElement("input");
  input.type = "email";
  input.placeholder = S.email.placeholder;
  input.value = state.email;
  input.oninput = e => state.email = e.target.value;
  s.appendChild(input);
  const privacy = document.createElement("div");
  privacy.className = "callout-box";
  privacy.style.display = "flex";
  privacy.style.gap = "10px";
  privacy.style.fontSize = "13px";
  privacy.innerHTML = `<span>🔒</span><span>${S.email.privacy}</span>`;
  s.appendChild(privacy);
  s.appendChild(primaryBtn(S.continueBtn, () => go(1)));
  root.appendChild(s);
}

function renderIncluded() {
  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(logoEl());
  s.innerHTML += `<h2 style="margin-bottom:16px;">${S.included.title}</h2>`;
  S.included.items.forEach(([icon, h, p]) => {
    const row = document.createElement("div");
    row.className = "feature-row";
    row.innerHTML = `<div class="icon-badge">${icon}</div><div><h4>${h}</h4><p>${p}</p></div>`;
    s.appendChild(row);
  });
  s.appendChild(primaryBtn(S.continueBtn, () => go(1)));
  root.appendChild(s);
}

/* ---------------- pricing ---------------- */
let countdownSeconds = 15 * 60;
function renderPricing() {
  const s = document.createElement("div");
  s.style.paddingBottom = "20px";

  // sticky top bar
  const sticky = document.createElement("div");
  sticky.className = "sticky-topbar";
  sticky.innerHTML = `<div><div class="label">${S.pricing.stickyLabel}</div><div class="timer" id="stickyTimer">15:00</div></div>`;
  const getBtn = document.createElement("button");
  getBtn.className = "btn btn-primary";
  getBtn.textContent = S.pricing.getPlanBtn;
  getBtn.onclick = scrollToPlans;
  sticky.appendChild(getBtn);
  s.appendChild(sticky);

  const body = document.createElement("div");
  body.className = "screen";
  body.innerHTML = `<h1 class="headline">${S.pricing.headline}</h1><p class="subheadline">${S.pricing.headlineSub}</p>`;
  s.appendChild(body);

  // timeline
  const tl = document.createElement("div");
  tl.className = "timeline-compare";
  tl.innerHTML = `<div class="col now"><span class="tag">${S.pricing.timelineNow}</span></div><div class="col"><span class="tag" style="background:${'#16A34A'}">${S.pricing.timelineGoal}</span></div>`;
  body.appendChild(tl);
  S.pricing.timelineRows.forEach(([label, before, after]) => {
    const row = document.createElement("div");
    row.className = "timeline-row";
    row.innerHTML = `<div><b>${label}</b><div class="before">${before}</div></div><div class="after">${after}</div>`;
    body.appendChild(row);
  });

  const weekWrap = document.createElement("div");
  S.pricing.weeks.forEach(([label, items]) => {
    const block = document.createElement("div");
    block.className = "week-block";
    block.innerHTML = `<h5>${label}</h5><ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    weekWrap.appendChild(block);
  });
  s.appendChild(weekWrap);

  const shift = document.createElement("p");
  shift.className = "subheadline";
  shift.style.margin = "16px";
  shift.textContent = S.pricing.shift;
  s.appendChild(shift);

  // plans
  const timerBar = document.createElement("div");
  timerBar.className = "timer-bar";
  timerBar.innerHTML = `${S.pricing.timerBarLabel} <span class="digits" id="barMin">15</span>:<span class="digits" id="barSec">00</span>`;
  s.appendChild(timerBar);

  const plansWrap = document.createElement("div");
  plansWrap.id = "plansWrap";
  plansWrap.style.marginTop = "16px";
  PLANS.forEach(p => plansWrap.appendChild(planCard(p)));
  s.appendChild(plansWrap);

  const cta = primaryBtn(S.pricing.getPlanBtn, checkoutClick);
  cta.style.margin = "0 16px 12px";
  cta.style.width = "calc(100% - 32px)";
  s.appendChild(cta);

  const safe = document.createElement("div");
  safe.className = "pay-safe";
  safe.textContent = S.pricing.paySafe;
  s.appendChild(safe);

  const icons = document.createElement("div");
  icons.className = "pay-icons";
  S.pricing.payIcons.forEach(t => {
    icons.innerHTML += `<span>${t}</span>`;
  });
  s.appendChild(icons);

  const g = document.createElement("div");
  g.className = "guarantee-line";
  g.textContent = S.pricing.guaranteeLine;
  s.appendChild(g);

  const fine = document.createElement("div");
  fine.className = "fine-print";
  fine.innerHTML = finePrint();
  s.appendChild(fine);

  const gbox = document.createElement("div");
  gbox.className = "guarantee-box";
  gbox.innerHTML = `<div class="badge-icon">🛡️</div><div><h4>${S.pricing.guaranteeBoxTitle}</h4><p>${S.pricing.guaranteeBoxBody}</p></div>`;
  s.appendChild(gbox);

  // testimonials
  const tHead = document.createElement("h3");
  tHead.textContent = S.pricing.testimonialsHeadline;
  tHead.style.textAlign = "center";
  tHead.style.margin = "20px 16px 12px";
  s.appendChild(tHead);
  TESTIMONIALS.forEach(t => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.style.margin = "0 16px 12px";
    card.innerHTML = `<div class="who"><img class="avatar" src="${t.img}" alt="${t.name}"><div><div class="name">${t.name}</div><div class="role">${t.role}</div></div></div>
      <div class="quote">${t.quote}</div><div class="body">${t.body}</div>
      <div class="stars">★★★★★</div><div class="date">${t.date}</div>`;
    s.appendChild(card);
  });

  const cta2 = primaryBtn(S.pricing.getPlanBtn, checkoutClick);
  cta2.style.margin = "16px";
  cta2.style.width = "calc(100% - 32px)";
  s.appendChild(cta2);

  // FAQ
  const faq = document.createElement("div");
  faq.className = "faq-section";
  faq.innerHTML = `<h2>${S.pricing.faqTitle}</h2>`;
  FAQ.forEach(({ q, a }) => {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `<div class="faq-q">${q}<span class="plus">+</span></div><div class="faq-a">${a}</div>`;
    item.querySelector(".faq-q").onclick = () => item.classList.toggle("open");
    faq.appendChild(item);
  });
  s.appendChild(faq);

  root.appendChild(s);
  startCountdown();
}

function planCard(p) {
  const isSelected = state.selectedPlan === p.key;
  const card = document.createElement("div");
  card.className = "plan-card" + (isSelected ? " selected" : "");
  const savings = (p.was - p.now).toFixed(2);
  const includedModules = BONUS_MODULES.filter(m => p.modules.includes(m.key));
  const includedItems = [S.pricing.corePlanLabel, ...includedModules.map(m => m.label)];
  card.innerHTML = `
    ${p.tag ? `<div class="plan-tag ${p.badgeClass}">${p.tagIcon || "⭐"} ${p.tag}</div>` : ""}
    <div class="plan-body">
      <div class="plan-radio"></div>
      <div class="plan-info">
        <div class="plan-name">${p.label}</div>
        <div class="plan-discount">${p.discountLabel}</div>
        <div class="plan-price-row"><span class="plan-price-old">$${p.was}</span><span class="plan-price-new">$${p.now}</span></div>
        <div class="plan-savings">🔥 ${S.pricing.savingsLabel} $${savings}</div>
        <ul class="plan-includes">${includedItems.map(item => `<li>✓ ${item}</li>`).join("")}</ul>
      </div>
      <div class="plan-perday"><span class="big">${S.pricing.oneTimeLabel}</span></div>
    </div>
  `;
  card.onclick = () => { state.selectedPlan = p.key; render(); };
  return card;
}

function finePrint() {
  const plan = PLANS.find(p => p.key === state.selectedPlan);
  return S.checkout.finePrint(BRAND, plan.label, plan.now, plan.was);
}

function scrollToPlans() {
  document.getElementById("plansWrap")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
function checkoutClick() {
  goTo(STEPS.indexOf("checkout"));
}

let paymentMethod = "paypal";
function renderCheckout() {
  persistStartNowResult();
  const plan = PLANS.find(p => p.key === state.selectedPlan);
  const includedModules = BONUS_MODULES.filter(m => plan.modules.includes(m.key));
  const bonusTotal = includedModules.reduce((sum, m) => sum + m.was, 0);
  const saved = (plan.was + bonusTotal - plan.now).toFixed(1);

  const s = document.createElement("div");
  s.className = "screen";
  s.appendChild(topBar());
  s.innerHTML += `<h2 style="margin-bottom:14px;">${S.checkout.title}</h2>`;

  const methodRow = document.createElement("div");
  methodRow.style.display = "grid";
  methodRow.style.gridTemplateColumns = "1fr 1fr";
  methodRow.style.gap = "12px";
  methodRow.style.marginBottom = "24px";
  methodRow.innerHTML = `
    <div class="pay-method ${paymentMethod === "paypal" ? "selected" : ""}" data-m="paypal">
      <span style="font-weight:800;color:#003087;">Pay<span style="color:#009cde;">Pal</span></span>
    </div>
    <div class="pay-method ${paymentMethod === "card" ? "selected" : ""}" data-m="card">
      <span style="font-weight:700;">${S.checkout.creditCard}</span>
      <div class="pay-icons" style="margin:6px 0 0;"><span>Visa</span><span>Mastercard</span></div>
    </div>
  `;
  methodRow.querySelectorAll(".pay-method").forEach(el => {
    el.onclick = () => { paymentMethod = el.dataset.m; render(); };
  });
  s.appendChild(methodRow);

  const totalRow = document.createElement("div");
  totalRow.innerHTML = `
    <div style="display:flex;justify-content:space-between;font-weight:800;font-size:20px;margin-bottom:6px;">
      <span>${S.checkout.total}</span><span>$${plan.now}</span>
    </div>
    <div style="display:flex;justify-content:space-between;color:var(--red);font-size:13px;font-weight:600;">
      <span>${S.checkout.discount}</span><span>${S.checkout.saved}$${saved}</span>
    </div>
    <hr style="border:none;border-top:1px solid var(--lavender-dark);margin:16px 0;">
  `;
  s.appendChild(totalRow);

  if (includedModules.length === 0) {
    const noModules = document.createElement("p");
    noModules.className = "helper-text";
    noModules.textContent = S.checkout.noModulesLine;
    s.appendChild(noModules);
  } else {
    const bonusHead = document.createElement("h3");
    bonusHead.style.marginBottom = "10px";
    bonusHead.textContent = S.checkout.bonusHead;
    s.appendChild(bonusHead);

    includedModules.forEach(m => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.fontSize = "14px";
      row.style.padding = "6px 0";
      row.innerHTML = `<span>${m.label}</span><span><span style="text-decoration:line-through;color:var(--text-soft);">$${m.was}</span> <b style="color:var(--green)">${S.checkout.includedLabel}</b></span>`;
      s.appendChild(row);
    });
  }

  const paypalBtn = document.createElement("button");
  paypalBtn.className = "btn";
  paypalBtn.style.background = "#FFC439";
  paypalBtn.style.marginTop = "20px";
  paypalBtn.innerHTML = `<span style="font-weight:800;color:#003087;">Pay<span style="color:#009cde;">Pal</span></span>`;
  paypalBtn.onclick = () => showPaymentNotice(notice, appLink);
  s.appendChild(paypalBtn);

  const gpayBtn = document.createElement("button");
  gpayBtn.className = "btn";
  gpayBtn.style.background = "#000";
  gpayBtn.style.color = "#fff";
  gpayBtn.style.marginTop = "10px";
  gpayBtn.textContent = S.checkout.gpay;
  gpayBtn.onclick = () => showPaymentNotice(notice, appLink);
  s.appendChild(gpayBtn);

  const notice = document.createElement("p");
  notice.className = "helper-text";
  notice.style.marginTop = "10px";
  notice.style.visibility = "hidden";
  notice.textContent = S.checkout.paymentNotice(BRAND);
  s.appendChild(notice);

  const appLink = document.createElement("a");
  appLink.href = "/app/";
  appLink.className = "btn";
  appLink.style.marginTop = "12px";
  appLink.style.background = "var(--green)";
  appLink.style.color = "#fff";
  appLink.style.textDecoration = "none";
  appLink.style.display = "none";
  appLink.style.textAlign = "center";
  appLink.textContent = S.checkout.openAppBtn;
  s.appendChild(appLink);

  root.appendChild(s);
}

function showPaymentNotice(el, linkEl) {
  el.style.visibility = "visible";
  if (linkEl) linkEl.style.display = "block";
}

function startCountdown() {
  clearInterval(window.__timer);
  window.__timer = setInterval(() => {
    countdownSeconds = Math.max(0, countdownSeconds - 1);
    const m = String(Math.floor(countdownSeconds / 60)).padStart(2, "0");
    const s = String(countdownSeconds % 60).padStart(2, "0");
    const st = document.getElementById("stickyTimer");
    const bm = document.getElementById("barMin");
    const bs = document.getElementById("barSec");
    if (st) st.textContent = `${m}:${s}`;
    if (bm) bm.textContent = m;
    if (bs) bs.textContent = s;
  }, 1000);
}

/* ---------------- helpers ---------------- */
function primaryBtn(label, onClick) {
  const btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = label;
  btn.style.marginTop = "10px";
  btn.onclick = onClick;
  return btn;
}

render();
