import { useState, useEffect, useRef } from "react";

const ACCENT = "#4C5FE0";
const GREEN = "#2fb380";
const DARK = "#1a1a2e";
const TEXT = "#2b2b3d";
const TEXT_SOFT = "#6b6b80";
const SAND = "#f7f6f2";

const WB_KEY = "startnow_workbooks";

function loadWb() {
  try {
    const raw = localStorage.getItem(WB_KEY);
    if (raw) return { answers: {}, daysDone: {}, ...JSON.parse(raw) };
  } catch (e) {}
  return { answers: {}, daysDone: {} };
}

const sans = { fontFamily: "sans-serif" };

function Btn({ children, onClick, variant = "primary", style = {}, className }) {
  const variants = {
    primary: { background: ACCENT, color: "#fff", border: "none" },
    success: { background: GREEN, color: "#fff", border: "none" },
    outline: { background: "transparent", color: DARK, border: "1.5px solid #ddd" },
  };
  return (
    <button className={className} onClick={onClick} style={{
      ...sans, borderRadius: "12px", padding: "13px 18px", fontWeight: 700, fontSize: "0.92rem",
      cursor: "pointer", width: "100%", ...variants[variant], ...style,
    }}>{children}</button>
  );
}

function Timer({ seconds, S }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const endRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.round((endRef.current - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) setRunning(false);
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  function toggle() {
    if (running) { setRunning(false); return; }
    const start = left === 0 ? seconds : left;
    setLeft(start);
    endRef.current = Date.now() + start * 1000;
    setRunning(true);
  }
  function reset() { setRunning(false); setLeft(seconds); }

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <div className="wb-timer" style={{ background: "#eef0fd", borderRadius: "12px", padding: "14px", textAlign: "center" }}>
      <div style={{ ...sans, fontWeight: 800, fontSize: "2rem", color: left === 0 ? GREEN : ACCENT, letterSpacing: "1px" }}>
        {mm}:{ss}
      </div>
      {left === 0 && <div style={{ ...sans, fontSize: "0.82rem", color: GREEN, fontWeight: 700, marginBottom: "6px" }}>{S.timerDone}</div>}
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <Btn onClick={toggle} style={{ padding: "10px" }}>{running ? S.timerPause : S.timerStart}</Btn>
        <Btn variant="outline" onClick={reset} style={{ padding: "10px", width: "40%" }}>{S.timerReset}</Btn>
      </div>
    </div>
  );
}

function Block({ b, wbKey, wb, setAnswer, S }) {
  const val = (wb.answers[wbKey] || {})[b.id];
  switch (b.t) {
    case "h":
      return <h4 style={{ ...sans, fontSize: "0.95rem", color: DARK, margin: "6px 0 0" }}>{b.text}</h4>;
    case "p":
      return <p style={{ ...sans, fontSize: "0.88rem", color: TEXT, lineHeight: 1.65, margin: 0 }}>{b.text}</p>;
    case "list":
      return (
        <ul style={{ ...sans, fontSize: "0.86rem", color: TEXT, lineHeight: 1.6, margin: 0, paddingLeft: "20px" }}>
          {b.items.map((it, i) => <li key={i} style={{ marginBottom: "4px" }}>{it}</li>)}
        </ul>
      );
    case "quote":
      return (
        <div style={{ borderLeft: `3px solid ${ACCENT}`, background: SAND, borderRadius: "0 10px 10px 0", padding: "12px 14px", fontFamily: "Georgia, serif", fontSize: "0.92rem", color: TEXT, lineHeight: 1.6 }}>
          {b.text}
        </div>
      );
    case "challenge":
      return (
        <div style={{ background: "#fff8e6", border: "1.5px solid #f3d98b", borderRadius: "12px", padding: "12px 14px" }}>
          <div style={{ ...sans, fontWeight: 800, fontSize: "0.88rem", color: DARK, marginBottom: "4px" }}>{b.title}</div>
          <div style={{ ...sans, fontSize: "0.86rem", color: TEXT, lineHeight: 1.6 }}>{b.text}</div>
        </div>
      );
    case "timer":
      return <Timer seconds={b.seconds} S={S} />;
    case "field":
      return (
        <label style={{ display: "block" }}>
          <span style={{ ...sans, display: "block", fontWeight: 700, fontSize: "0.82rem", color: DARK, marginBottom: "5px" }}>{b.label}</span>
          <textarea
            value={val || ""}
            rows={b.rows || 2}
            placeholder={S.placeholder}
            onChange={(e) => setAnswer(wbKey, b.id, e.target.value)}
            style={{ ...sans, width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: "10px", border: "1.5px solid #e6e6ee", fontSize: "0.88rem", color: TEXT, resize: "vertical", background: "#fff" }}
          />
        </label>
      );
    case "check":
      return (
        <label style={{ ...sans, display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: TEXT, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={!!val}
            onChange={(e) => setAnswer(wbKey, b.id, e.target.checked)}
            style={{ width: "22px", height: "22px", accentColor: GREEN, flexShrink: 0 }}
          />
          <span>{b.label}</span>
        </label>
      );
    default:
      return null;
  }
}

export default function Workbooks({ workbooks, S, onBack }) {
  const [wb, setWb] = useState(loadWb);
  const [open, setOpen] = useState(null); // { key, page: "intro" | number | "final" }

  useEffect(() => {
    try { localStorage.setItem(WB_KEY, JSON.stringify(wb)); } catch (e) {}
  }, [wb]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [open && open.key, open && open.page]);

  function setAnswer(wbKey, id, value) {
    setWb((s) => ({ ...s, answers: { ...s.answers, [wbKey]: { ...(s.answers[wbKey] || {}), [id]: value } } }));
  }
  function toggleDay(wbKey, n) {
    setWb((s) => {
      const cur = s.daysDone[wbKey] || [];
      const next = cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n];
      return { ...s, daysDone: { ...s.daysDone, [wbKey]: next } };
    });
  }

  /* ---- Índice de bonos ---- */
  if (!open) {
    return (
      <div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: DARK, marginBottom: "6px" }}>{S.title}</h2>
        <p style={{ ...sans, fontSize: "0.82rem", color: TEXT_SOFT, marginBottom: "16px", lineHeight: 1.5 }}>{S.sub}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {workbooks.map((w) => {
            const done = (wb.daysDone[w.key] || []).length;
            return (
              <div key={w.key} style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 14px rgba(26,26,46,0.06)", borderTop: `4px solid ${w.number === 1 ? ACCENT : GREEN}` }}>
                {w.img && <img src={w.img} alt={w.title} style={{ width: "100%", borderRadius: "12px", display: "block", marginBottom: "12px" }} />}
                <div style={{ ...sans, fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.5px", color: w.number === 1 ? ACCENT : GREEN }}>{w.badge}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: DARK, margin: "6px 0" }}>{w.icon} {w.title}</div>
                <p style={{ ...sans, fontSize: "0.84rem", color: TEXT_SOFT, lineHeight: 1.55, margin: "0 0 8px" }}>{w.tagline}</p>
                <div style={{ ...sans, fontSize: "0.8rem", fontWeight: 700, color: DARK, marginBottom: "10px" }}>{w.valueLabel} <s style={{ color: TEXT_SOFT }}>{w.valueAmount}</s> <span style={{ color: GREEN, fontWeight: 800 }}>{S.free}</span></div>
                {w.features && (
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ ...sans, fontSize: "0.78rem", fontWeight: 700, color: DARK, marginBottom: "4px" }}>{S.included}</div>
                    {w.features.map((f) => (
                      <div key={f} style={{ ...sans, fontSize: "0.8rem", color: TEXT, lineHeight: 1.6 }}>✓ {f}</div>
                    ))}
                  </div>
                )}
                <div style={{ ...sans, fontSize: "0.76rem", color: done === w.days.length ? GREEN : TEXT_SOFT, fontWeight: 700, marginBottom: "10px" }}>
                  {S.dayProgress(done, w.days.length)}
                </div>
                <Btn onClick={() => setOpen({ key: w.key, page: "intro" })}>{S.open}</Btn>
              </div>
            );
          })}
        </div>
        <p style={{ ...sans, fontSize: "0.82rem", color: TEXT_SOFT, lineHeight: 1.6, textAlign: "center", marginTop: "16px", fontStyle: "italic" }}>{S.system}</p>
      </div>
    );
  }

  /* ---- Un bono abierto ---- */
  const w = workbooks.find((x) => x.key === open.key);
  const idx = workbooks.indexOf(w);
  const done = wb.daysDone[w.key] || [];
  const pages = ["intro", ...w.days.map((d) => d.n), "final"];
  const pageIdx = pages.indexOf(open.page);
  const go = (page) => setOpen({ key: w.key, page });
  const day = typeof open.page === "number" ? w.days.find((d) => d.n === open.page) : null;

  return (
    <div className="wb-print-root">
      <style>{`@media print { .no-print { display: none !important; } body { background: #fff !important; } .wb-timer { display: none !important; } textarea { border: 1px solid #999 !important; } }`}</style>
      <button className="no-print" onClick={() => setOpen(null)} style={{ ...sans, background: "none", border: "none", color: ACCENT, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", padding: "0 0 12px" }}>
        {S.back}
      </button>
      <div style={{ ...sans, fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.5px", color: w.number === 1 ? ACCENT : GREEN }}>{w.badge}</div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: DARK, margin: "4px 0 12px" }}>{w.icon} {w.title}</h2>

      {/* Navegación por días */}
      <div className="no-print" style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "10px", marginBottom: "6px" }}>
        {pages.map((p) => {
          const active = p === open.page;
          const isDone = typeof p === "number" && done.includes(p);
          const label = p === "intro" ? "★" : p === "final" ? "🏁" : p;
          return (
            <button key={p} onClick={() => go(p)} aria-label={p === "intro" ? S.intro : p === "final" ? S.finalPage : S.dayLabel(p)} style={{
              ...sans, flexShrink: 0, minWidth: "38px", height: "38px", borderRadius: "10px", cursor: "pointer", fontWeight: 800, fontSize: "0.85rem",
              border: active ? `2px solid ${ACCENT}` : "1.5px solid #e6e6ee",
              background: isDone ? GREEN : active ? "#eef0fd" : "#fff",
              color: isDone ? "#fff" : active ? ACCENT : TEXT_SOFT,
            }}>{label}</button>
          );
        })}
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 14px rgba(26,26,46,0.06)", display: "flex", flexDirection: "column", gap: "14px" }}>
        {open.page === "intro" && (
          <>
            {w.img && <img src={w.img} alt={w.title} style={{ width: "100%", borderRadius: "12px", display: "block" }} />}
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: DARK, margin: 0 }}>{S.introTitle}</h3>
            <p style={{ ...sans, fontSize: "0.9rem", color: DARK, fontWeight: 700, lineHeight: 1.5, margin: 0 }}>{w.tagline}</p>
            {w.intro.map((t, i) => <p key={i} style={{ ...sans, fontSize: "0.88rem", color: TEXT, lineHeight: 1.65, margin: 0 }}>{t}</p>)}
          </>
        )}

        {day && (
          <>
            <div>
              <div style={{ ...sans, fontSize: "0.74rem", fontWeight: 800, color: ACCENT }}>{S.dayLabel(day.n).toUpperCase()}</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", color: DARK, margin: "2px 0 0" }}>{day.icon} {day.title}</h3>
            </div>
            <div style={{ background: SAND, borderRadius: "10px", padding: "10px 12px", ...sans, fontSize: "0.84rem", color: TEXT, lineHeight: 1.55 }}>
              <strong>{S.objective}:</strong> {day.objective}
            </div>
            {day.blocks.map((b, i) => <Block key={i} b={b} wbKey={w.key} wb={wb} setAnswer={setAnswer} S={S} />)}
            <div style={{ background: "#f0fbf6", border: `1.5px solid ${GREEN}`, borderRadius: "12px", padding: "12px 14px" }}>
              <div style={{ ...sans, fontWeight: 800, fontSize: "0.82rem", color: GREEN, marginBottom: "4px" }}>{S.win}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "0.92rem", color: DARK, lineHeight: 1.55 }}>{day.win}</div>
            </div>
            <Btn className="no-print" variant={done.includes(day.n) ? "outline" : "success"} onClick={() => toggleDay(w.key, day.n)}>
              {done.includes(day.n) ? S.dayDone : S.markDayDone}
            </Btn>
          </>
        )}

        {open.page === "final" && (
          <>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", color: DARK, margin: 0 }}>🎉 {w.closing.title}</h3>
            {w.closing.paragraphs.map((t, i) => <p key={i} style={{ ...sans, fontSize: "0.88rem", color: TEXT, lineHeight: 1.65, margin: 0 }}>{t}</p>)}
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: DARK }}>{w.closing.signature}</div>
            {w.bridge && (
              <div style={{ borderLeft: `3px solid ${GREEN}`, background: "#f0fbf6", borderRadius: "0 10px 10px 0", padding: "12px 14px", fontFamily: "Georgia, serif", fontSize: "0.92rem", color: DARK, lineHeight: 1.6 }}>
                {w.bridge}
              </div>
            )}
            {workbooks[idx + 1] && (
              <Btn onClick={() => setOpen({ key: workbooks[idx + 1].key, page: "intro" })}>{S.nextBonus}</Btn>
            )}
          </>
        )}
      </div>

      <div className="no-print" style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
        {pageIdx > 0 && <Btn variant="outline" onClick={() => go(pages[pageIdx - 1])}>{S.prev}</Btn>}
        {pageIdx < pages.length - 1 && (
          <Btn onClick={() => go(pages[pageIdx + 1])}>{pageIdx === pages.length - 2 ? S.finish : S.next}</Btn>
        )}
      </div>
      <button className="no-print" onClick={() => window.print()} style={{ ...sans, display: "block", margin: "14px auto 0", background: "none", border: "none", color: TEXT_SOFT, textDecoration: "underline", fontSize: "0.78rem", cursor: "pointer" }}>
        🖨️ {S.print}
      </button>
    </div>
  );
}
