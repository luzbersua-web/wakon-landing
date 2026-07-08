import { useState, useEffect, useMemo } from "react";
import {
  STRINGS as S,
  PLAN,
  WEEKS,
  CATEGORY_META,
  TRIGGER_TO_CATEGORY,
  AVOIDANCE_TO_CATEGORY,
  CHECKIN_QUESTION,
} from "./appContent.es";

const ACCENT = "#4C5FE0";
const GREEN = "#2fb380";
const DARK = "#1a1a2e";
const TEXT = "#2b2b3d";
const TEXT_SOFT = "#6b6b80";
const BG = "#fdfaf5";
const CARD = "#ffffff";

const STATE_KEY = "startnow_state";
const QUIZ_KEY = "startnow_quiz_result";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function addDays(dateStr, n) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    onboarded: false,
    name: "",
    category: null,
    startedAt: null,
    completedDays: {},
    checkins: {},
    streak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
  };
}
function saveState(s) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch (e) {}
}
function loadQuizResult() {
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}
function deriveCategory(quizResult) {
  if (!quizResult) return null;
  if (quizResult.avoidanceKey && AVOIDANCE_TO_CATEGORY[quizResult.avoidanceKey]) {
    return AVOIDANCE_TO_CATEGORY[quizResult.avoidanceKey];
  }
  const triggers = quizResult.triggers || [];
  for (const t of triggers) {
    const label = t.label || t;
    if (TRIGGER_TO_CATEGORY[label]) return TRIGGER_TO_CATEGORY[label];
  }
  return null;
}

function Button({ children, onClick, variant = "primary", disabled, style = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: "8px", border: "none", borderRadius: "12px", padding: "14px 20px",
    fontWeight: 700, fontSize: "0.98rem", fontFamily: "sans-serif", cursor: disabled ? "default" : "pointer",
    width: "100%", opacity: disabled ? 0.5 : 1, transition: "opacity .15s",
  };
  const variants = {
    primary: { background: ACCENT, color: "#fff" },
    success: { background: GREEN, color: "#fff" },
    outline: { background: "transparent", color: DARK, border: `1.5px solid #ddd` },
    ghost: { background: "transparent", color: TEXT_SOFT, padding: "8px" },
  };
  return (
    <button disabled={disabled} onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: CARD, borderRadius: "16px", padding: "20px",
      boxShadow: "0 2px 14px rgba(26,26,46,0.06)", ...style,
    }}>
      {children}
    </div>
  );
}

function CategoryBadge({ category }) {
  const m = CATEGORY_META[category];
  if (!m) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: "#eef0fd", color: ACCENT, fontSize: "0.72rem", fontWeight: 800,
      padding: "4px 10px", borderRadius: "20px", fontFamily: "sans-serif",
    }}>
      {m.icon} {m.label}
    </span>
  );
}

/* ---------------- Onboarding ---------------- */

function Onboarding({ quizResult, onDone }) {
  const derivedCategory = useMemo(() => deriveCategory(quizResult), [quizResult]);
  const [step, setStep] = useState(0);
  const [name, setName] = useState(quizResult?.name || "");
  const [category, setCategory] = useState(derivedCategory);

  const steps = quizResult
    ? ["welcome", "quiz-summary", name ? null : "name"].filter(Boolean)
    : ["welcome", "category", "name"];

  const key = steps[step];

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else finish();
  }
  function finish() {
    onDone({ name: name.trim(), category: category || "clutter" });
  }

  return (
    <div style={{ minHeight: "100svh", background: BG, display: "flex", flexDirection: "column", justifyContent: "center", padding: "28px 20px" }}>
      <div style={{ maxWidth: "420px", margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: "1.3rem", color: DARK }}>
            Start<span style={{ color: ACCENT }}>Now</span>
          </div>
        </div>

        {key === "welcome" && (
          <Card style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: "8px" }}>🌱</div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: DARK, marginBottom: "10px" }}>
              {S.onboarding.welcomeTitle}
            </h1>
            <p style={{ color: TEXT_SOFT, fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px", fontFamily: "sans-serif" }}>
              {S.onboarding.welcomeBody}
            </p>
            <Button onClick={next}>{S.onboarding.continueBtn}</Button>
          </Card>
        )}

        {key === "quiz-summary" && (
          <Card style={{ textAlign: "center" }}>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", color: DARK, marginBottom: "10px" }}>
              {S.onboarding.withQuizTitle(quizResult.name)}
            </h1>
            <p style={{ color: TEXT_SOFT, fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "16px", fontFamily: "sans-serif" }}>
              {S.onboarding.withQuizBody}
            </p>
            {category && (
              <div style={{ marginBottom: "20px" }}>
                <CategoryBadge category={category} />
              </div>
            )}
            <Button onClick={next}>{S.onboarding.continueBtn}</Button>
          </Card>
        )}

        {key === "category" && (
          <Card>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: DARK, marginBottom: "16px", textAlign: "center" }}>
              {S.onboarding.categoryPrompt}
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
              {Object.entries(CATEGORY_META).map(([key, m]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "14px 16px", borderRadius: "12px",
                    border: category === key ? `2px solid ${ACCENT}` : "1.5px solid #eee",
                    background: category === key ? "#eef0fd" : "#fff",
                    fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.92rem", color: DARK,
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{m.icon}</span> {m.label}
                </button>
              ))}
            </div>
            <Button onClick={next} disabled={!category}>{S.onboarding.continueBtn}</Button>
          </Card>
        )}

        {key === "name" && (
          <Card>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: DARK, marginBottom: "16px", textAlign: "center" }}>
              {S.onboarding.namePrompt}
            </h1>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={S.onboarding.namePlaceholder}
              style={{
                width: "100%", padding: "14px 16px", borderRadius: "12px",
                border: "1.5px solid #eee", fontSize: "0.95rem", marginBottom: "18px",
                fontFamily: "sans-serif", boxSizing: "border-box",
              }}
            />
            <Button onClick={finish}>{S.onboarding.startBtn}</Button>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ---------------- Today ---------------- */

function TodayScreen({ state, onComplete, category, onRestart }) {
  const completedCount = Object.keys(state.completedDays).length;
  const currentDay = completedCount + 1;
  const isDoneToday = state.lastCompletedDate === todayStr();
  const finishedAll = completedCount >= PLAN.length;

  if (finishedAll) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "2.6rem", marginBottom: "10px" }}>🎉</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", color: DARK, marginBottom: "10px" }}>
          {S.today.finishedAllTitle}
        </h2>
        <p style={{ color: TEXT_SOFT, fontSize: "0.95rem", lineHeight: 1.6, fontFamily: "sans-serif", marginBottom: "20px" }}>
          {S.today.finishedAllBody}
        </p>
        <Button onClick={onRestart}>{S.today.restartBtn}</Button>
      </div>
    );
  }

  const entry = PLAN[currentDay - 1];
  const isFeatured = category && entry.category === category;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: 800, color: DARK, fontSize: "1rem" }}>
          {S.today.dayLabel(currentDay)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "sans-serif", fontWeight: 700, color: "#e8952a", fontSize: "0.9rem" }}>
          🔥 {state.streak} {S.today.streakLabel}
        </div>
      </div>

      <Card>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
          <CategoryBadge category={entry.category} />
          <span style={{ fontFamily: "sans-serif", fontSize: "0.78rem", color: TEXT_SOFT, fontWeight: 600 }}>
            ⏱ {S.today.minutesLabel(entry.minutes)}
          </span>
          {isFeatured && (
            <span style={{ fontFamily: "sans-serif", fontSize: "0.72rem", color: GREEN, fontWeight: 800 }}>
              ★ Prioridad para vos
            </span>
          )}
        </div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", color: DARK, marginBottom: "10px" }}>
          {entry.title}
        </h2>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.9rem", color: TEXT_SOFT, lineHeight: 1.6, marginBottom: "16px" }}>
          {entry.lesson}
        </p>
        <div style={{
          background: "#f7f6f2", borderRadius: "12px", padding: "16px",
          fontFamily: "Georgia, serif", fontSize: "1.02rem", color: TEXT, lineHeight: 1.6, marginBottom: "18px",
        }}>
          {entry.task}
        </div>

        {isDoneToday ? (
          <Button variant="outline" disabled>{S.today.alreadyDone}</Button>
        ) : (
          <Button variant="success" onClick={onComplete}>{S.today.markDone}</Button>
        )}
      </Card>

      {isDoneToday && (
        <p style={{ textAlign: "center", color: TEXT_SOFT, fontSize: "0.85rem", fontFamily: "sans-serif", marginTop: "14px" }}>
          {S.today.doneBody}
        </p>
      )}
    </div>
  );
}

/* ---------------- Plan ---------------- */

function PlanScreen({ state }) {
  const completedCount = Object.keys(state.completedDays).length;
  const currentDay = completedCount + 1;
  const [openDay, setOpenDay] = useState(null);

  return (
    <div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: DARK, marginBottom: "16px" }}>
        {S.plan.title}
      </h2>
      {WEEKS.map((w) => (
        <div key={w.week} style={{ marginBottom: "22px" }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: "0.85rem", color: ACCENT, textTransform: "uppercase", marginBottom: "4px" }}>
            Semana {w.week} · {w.title}
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: "0.82rem", color: TEXT_SOFT, marginBottom: "10px" }}>
            {w.desc}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {PLAN.filter((d) => d.week === w.week).map((d) => {
              const isDone = !!state.completedDays[d.day];
              const isToday = d.day === currentDay && !isDone;
              const isLocked = d.day > currentDay;
              return (
                <button
                  key={d.day}
                  onClick={() => (!isLocked ? setOpenDay(d.day) : null)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 14px", borderRadius: "12px", textAlign: "left",
                    border: isToday ? `1.5px solid ${ACCENT}` : "1.5px solid #eee",
                    background: isDone ? "#f0fbf6" : isToday ? "#eef0fd" : "#fff",
                    fontFamily: "sans-serif", cursor: isLocked ? "default" : "pointer",
                    opacity: isLocked ? 0.55 : 1,
                  }}
                >
                  <span style={{
                    width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isDone ? GREEN : isLocked ? "#eee" : ACCENT, color: "#fff",
                    fontSize: "0.75rem", fontWeight: 800,
                  }}>
                    {isDone ? "✓" : isLocked ? "🔒" : d.day}
                  </span>
                  <span style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: DARK }}>
                      {isLocked ? `Día ${d.day}` : d.title}
                    </div>
                    <div style={{ fontSize: "0.76rem", color: TEXT_SOFT }}>
                      {isDone ? S.plan.done : isToday ? S.plan.today : isLocked ? S.plan.locked : ""}
                    </div>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {openDay && (
        <DayModal day={PLAN.find((d) => d.day === openDay)} onClose={() => setOpenDay(null)} />
      )}
    </div>
  );
}

function DayModal({ day, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(26,26,46,0.5)",
        display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: "20px 20px 0 0", padding: "24px 20px 32px",
        width: "100%", maxWidth: "480px",
      }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <CategoryBadge category={day.category} />
        </div>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: DARK, marginBottom: "8px" }}>
          Día {day.day}: {day.title}
        </h3>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.88rem", color: TEXT_SOFT, lineHeight: 1.6, marginBottom: "12px" }}>
          {day.lesson}
        </p>
        <div style={{ background: "#f7f6f2", borderRadius: "12px", padding: "14px", fontFamily: "Georgia, serif", color: TEXT, marginBottom: "16px" }}>
          {day.task}
        </div>
        <Button variant="outline" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}

/* ---------------- Progress ---------------- */

function ProgressScreen({ state }) {
  const completedDates = useMemo(() => new Set(Object.values(state.completedDays)), [state.completedDays]);
  const totalDays = Object.keys(state.completedDays).length;
  const last30 = useMemo(() => {
    const arr = [];
    const start = addDays(todayStr(), -29);
    for (let i = 0; i < 30; i++) arr.push(addDays(start, i));
    return arr;
  }, []);

  const checkinEntries = Object.entries(state.checkins || {});

  return (
    <div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: DARK, marginBottom: "16px" }}>
        {S.progress.title}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
        {[
          [S.progress.currentStreak, state.streak],
          [S.progress.longestStreak, state.longestStreak],
          [S.progress.totalDays, totalDays],
        ].map(([label, value], i) => (
          <Card key={i} style={{ textAlign: "center", padding: "14px 8px" }}>
            <div style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: "1.4rem", color: ACCENT }}>{value}</div>
            <div style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: TEXT_SOFT, marginTop: "2px" }}>{label}</div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.88rem", color: DARK, marginBottom: "12px" }}>
          {S.progress.calendarTitle}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "5px" }}>
          {last30.map((d) => (
            <div
              key={d}
              title={d}
              style={{
                aspectRatio: "1", borderRadius: "5px",
                background: completedDates.has(d) ? GREEN : "#eee",
              }}
            />
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.88rem", color: DARK, marginBottom: "12px" }}>
          {S.progress.checkinsTitle}
        </div>
        {checkinEntries.length === 0 ? (
          <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: TEXT_SOFT, lineHeight: 1.6 }}>
            {S.progress.noCheckins}
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {checkinEntries.map(([day, value]) => {
              const opt = CHECKIN_QUESTION.options.find((o) => o.value === value);
              return (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: "0.85rem" }}>
                  <span style={{ color: TEXT_SOFT }}>Día {day}</span>
                  <span style={{ fontWeight: 700, color: DARK }}>{opt ? opt.label : value}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ---------------- Settings ---------------- */

function SettingsScreen({ state, onUpdateName, onReset }) {
  const [name, setName] = useState(state.name || "");
  const [notifStatus, setNotifStatus] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    function handler(e) {
      e.preventDefault();
      setInstallPrompt(e);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function requestNotif() {
    if (typeof Notification === "undefined") return;
    Notification.requestPermission().then((perm) => setNotifStatus(perm));
  }

  function doReset() {
    if (window.confirm(S.settings.resetConfirm)) onReset();
  }

  return (
    <div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: DARK, marginBottom: "16px" }}>
        {S.settings.title}
      </h2>

      <Card style={{ marginBottom: "16px" }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.85rem", color: DARK, marginBottom: "8px" }}>
          {S.settings.nameLabel}
        </div>
        <input
          value={name}
          onChange={(e) => { setName(e.target.value); onUpdateName(e.target.value); }}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: "10px",
            border: "1.5px solid #eee", fontSize: "0.9rem", fontFamily: "sans-serif", boxSizing: "border-box",
          }}
        />
      </Card>

      <Card style={{ marginBottom: "16px" }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.85rem", color: DARK, marginBottom: "6px" }}>
          {S.settings.reminderTitle}
        </div>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.82rem", color: TEXT_SOFT, lineHeight: 1.5, marginBottom: "12px" }}>
          {S.settings.reminderBody}
        </p>
        {notifStatus === "granted" ? (
          <Button variant="outline" disabled>{S.settings.reminderOn}</Button>
        ) : notifStatus === "denied" ? (
          <p style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "#c0392b" }}>{S.settings.reminderBlocked}</p>
        ) : (
          <Button onClick={requestNotif}>{S.settings.reminderEnable}</Button>
        )}
      </Card>

      {installPrompt && (
        <Card style={{ marginBottom: "16px" }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.85rem", color: DARK, marginBottom: "6px" }}>
            {S.settings.installTitle}
          </div>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.82rem", color: TEXT_SOFT, lineHeight: 1.5, marginBottom: "12px" }}>
            {S.settings.installBody}
          </p>
          <Button onClick={() => { installPrompt.prompt(); setInstallPrompt(null); }}>
            Instalar app
          </Button>
        </Card>
      )}

      <Card>
        <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#c0392b", marginBottom: "6px" }}>
          {S.settings.resetTitle}
        </div>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.82rem", color: TEXT_SOFT, lineHeight: 1.5, marginBottom: "12px" }}>
          {S.settings.resetBody}
        </p>
        <Button variant="outline" onClick={doReset} style={{ borderColor: "#c0392b", color: "#c0392b" }}>
          {S.settings.resetBtn}
        </Button>
      </Card>
    </div>
  );
}

/* ---------------- Checkin modal ---------------- */

function CheckinModal({ day, onSubmit }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(26,26,46,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: "20px",
    }}>
      <div style={{ background: "#fff", borderRadius: "18px", padding: "26px 22px", width: "100%", maxWidth: "400px" }}>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: DARK, marginBottom: "6px" }}>
          {S.checkin.title}
        </h3>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.88rem", color: TEXT_SOFT, lineHeight: 1.6, marginBottom: "16px" }}>
          {CHECKIN_QUESTION.prompt}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {CHECKIN_QUESTION.options.map((o) => (
            <button
              key={o.value}
              onClick={() => onSubmit(day, o.value)}
              style={{
                textAlign: "left", padding: "12px 14px", borderRadius: "10px",
                border: "1.5px solid #eee", background: "#fff", fontFamily: "sans-serif",
                fontSize: "0.88rem", fontWeight: 600, color: DARK, cursor: "pointer",
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Shell ---------------- */

export default function StartNowApp() {
  const [state, setState] = useState(loadState);
  const [tab, setTab] = useState("today");
  const [pendingCheckinDay, setPendingCheckinDay] = useState(null);
  const quizResult = useMemo(loadQuizResult, []);

  useEffect(() => { saveState(state); }, [state]);

  function handleOnboardingDone({ name, category }) {
    setState((s) => ({ ...s, onboarded: true, name, category, startedAt: Date.now() }));
  }

  function handleComplete() {
    const completedCount = Object.keys(state.completedDays).length;
    const currentDay = completedCount + 1;
    if (state.lastCompletedDate === todayStr()) return;
    const yesterday = addDays(todayStr(), -1);
    const newStreak = state.lastCompletedDate === yesterday ? state.streak + 1 : 1;
    const entry = PLAN[currentDay - 1];

    setState((s) => ({
      ...s,
      completedDays: { ...s.completedDays, [currentDay]: todayStr() },
      lastCompletedDate: todayStr(),
      streak: newStreak,
      longestStreak: Math.max(s.longestStreak, newStreak),
    }));

    if (entry && entry.checkin) setPendingCheckinDay(currentDay);
  }

  function handleCheckinSubmit(day, value) {
    setState((s) => ({ ...s, checkins: { ...s.checkins, [day]: value } }));
    setPendingCheckinDay(null);
  }

  function handleReset() {
    const fresh = {
      onboarded: true, name: state.name, category: state.category, startedAt: Date.now(),
      completedDays: {}, checkins: {}, streak: 0, longestStreak: 0, lastCompletedDate: null,
    };
    setState(fresh);
    setTab("today");
  }

  if (!state.onboarded) {
    return <Onboarding quizResult={quizResult} onDone={handleOnboardingDone} />;
  }

  const tabs = [
    ["today", S.nav.today, "☀️"],
    ["plan", S.nav.plan, "🗓️"],
    ["progress", S.nav.progress, "📈"],
    ["settings", S.nav.settings, "⚙️"],
  ];

  return (
    <div style={{ minHeight: "100svh", background: BG, display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "18px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: "560px", margin: "0 auto", width: "100%", boxSizing: "border-box",
      }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: "1.05rem", color: DARK }}>
          Start<span style={{ color: ACCENT }}>Now</span>
        </div>
        {state.name && (
          <div style={{ fontFamily: "sans-serif", fontSize: "0.82rem", color: TEXT_SOFT }}>Hola, {state.name}</div>
        )}
      </div>

      <div style={{ flex: 1, maxWidth: "560px", margin: "0 auto", width: "100%", padding: "0 20px 100px", boxSizing: "border-box" }}>
        {tab === "today" && <TodayScreen state={state} onComplete={handleComplete} category={state.category} onRestart={handleReset} />}
        {tab === "plan" && <PlanScreen state={state} />}
        {tab === "progress" && <ProgressScreen state={state} />}
        {tab === "settings" && (
          <SettingsScreen
            state={state}
            onUpdateName={(name) => setState((s) => ({ ...s, name }))}
            onReset={handleReset}
          />
        )}
      </div>

      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff",
        borderTop: "1px solid #eee", display: "flex", justifyContent: "center",
        boxShadow: "0 -2px 14px rgba(0,0,0,0.04)",
      }}>
        <div style={{ display: "flex", width: "100%", maxWidth: "560px" }}>
          {tabs.map(([key, label, icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1, background: "none", border: "none", padding: "10px 4px 12px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
                cursor: "pointer", color: tab === key ? ACCENT : TEXT_SOFT,
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{icon}</span>
              <span style={{ fontFamily: "sans-serif", fontSize: "0.68rem", fontWeight: 700 }}>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {pendingCheckinDay && <CheckinModal day={pendingCheckinDay} onSubmit={handleCheckinSubmit} />}
    </div>
  );
}
