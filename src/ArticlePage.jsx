import { useState, useEffect, useRef } from "react";

const ACCENT = "#e81a41";
const DARK = "#1a1a2e";
const TEXT = "#2b2b3d";
const TEXT_SOFT = "#5b5b6e";
const BG = "#fdfaf5";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Stars({ count = 5 }) {
  return <span style={{ color: "#f5a623", letterSpacing: "1px" }}>{"★".repeat(count)}</span>;
}

function ImagePlaceholder({ src, label, tall }) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        style={{
          width: "100%",
          aspectRatio: tall ? "4/3" : "16/9",
          objectFit: "cover",
          borderRadius: "14px",
          margin: "20px 0",
          display: "block",
        }}
      />
    );
  }
  return (
    <div style={{
      background: `linear-gradient(135deg, #efe6d8, #f7ead8)`,
      border: "1px solid #e6d9c4",
      borderRadius: "14px",
      aspectRatio: tall ? "4/3" : "16/9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#a8987e",
      fontSize: "0.85rem",
      fontFamily: "sans-serif",
      fontWeight: 600,
      textAlign: "center",
      padding: "12px",
      margin: "20px 0",
    }}>
      {label}
    </div>
  );
}

function Paragraphs({ text }) {
  return text.split("\n\n").map((p, i) => (
    <p key={i} style={{ fontSize: "1.05rem", lineHeight: 1.75, color: TEXT, marginBottom: "18px", fontFamily: "Georgia, serif" }}>
      {p}
    </p>
  ));
}

export default function ArticlePage({ content }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const c = content;

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100svh" }}>

      {/* STICKY OFFER BAR */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: DARK, color: "#fff",
        padding: "10px 16px",
        display: scrolled ? "flex" : "none",
        alignItems: "center", justifyContent: "space-between", gap: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,.25)",
      }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, fontFamily: "sans-serif", whiteSpace: "pre-line", lineHeight: 1.3 }}>
          {c.stickyOffer.title}
        </div>
        <a href={c.quizUrl} style={{
          background: ACCENT, color: "#fff", fontWeight: 800, fontSize: "0.78rem",
          padding: "10px 16px", borderRadius: "8px", textDecoration: "none",
          whiteSpace: "nowrap", fontFamily: "sans-serif",
        }}>
          {c.stickyOffer.buttonText}
        </a>
      </div>

      <article style={{ maxWidth: "700px", margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* HERO */}
        <FadeIn>
          <div style={{
            display: "inline-block", background: "#ffe8ea", color: ACCENT,
            fontSize: "0.72rem", fontWeight: 800, letterSpacing: "1px",
            padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase",
            fontFamily: "sans-serif", marginBottom: "14px",
          }}>
            {c.breadcrumb}
          </div>
          <div style={{ fontSize: "0.8rem", color: TEXT_SOFT, fontFamily: "sans-serif", marginBottom: "10px" }}>
            {c.date}
          </div>
          <h1 style={{
            fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "clamp(1.6rem, 5vw, 2.3rem)",
            lineHeight: 1.25, marginBottom: "12px", color: DARK,
          }}>
            {c.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: TEXT_SOFT, marginBottom: "18px", fontFamily: "Georgia, serif" }}>
            {c.subtitleRegular} <strong style={{ color: ACCENT }}>{c.subtitleHighlighted}</strong>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", fontFamily: "sans-serif" }}>
            {c.authorImage && (
              <img src={c.authorImage} alt={c.author} style={{
                width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", flexShrink: 0,
              }} />
            )}
            <span style={{ fontSize: "0.85rem", color: TEXT_SOFT }}>{c.author}</span>
            <span style={{ color: "#ccc" }}>•</span>
            <Stars /> <span style={{ fontSize: "0.82rem", color: TEXT_SOFT }}>{c.ratingsNumber}</span>
          </div>
          <ImagePlaceholder src={c.heroImage} label={c.heroImageLabel} />
        </FadeIn>

        {/* INTRO STORY */}
        <FadeIn><Paragraphs text={c.intro} /></FadeIn>

        {/* DISCOVERY */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.discoveryTitle}
          </h2>
          <Paragraphs text={c.discoveryText} />
          <ImagePlaceholder src={c.discoveryImage} label={c.discoveryImageLabel} />
        </FadeIn>

        {/* SCIENCE */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.scienceTitle}
          </h2>
          <Paragraphs text={c.scienceText} />
          <ImagePlaceholder src={c.scienceImage} label={c.scienceImageLabel} />
          <Paragraphs text={c.appRevealText} />
        </FadeIn>

        {/* DAY 1 */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.day1Title}
          </h2>
          <Paragraphs text={c.day1Text} />
          <ImagePlaceholder src={c.day1Image} label={c.day1ImageLabel} />
        </FadeIn>

        {/* DAY 3 */}
        <FadeIn><Paragraphs text={c.day3Text} /></FadeIn>

        {/* WEEK 1 */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.week1Title}
          </h2>
          <Paragraphs text={c.week1Text} />
          <ImagePlaceholder src={c.week1Image} label={c.week1ImageLabel} />
        </FadeIn>

        {/* WEEK 3 */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.week3Title}
          </h2>
          <Paragraphs text={c.week3Text} />
          <ImagePlaceholder src={c.week3Image} label={c.week3ImageLabel} />
        </FadeIn>

        {/* WEEK 4 */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.week4Title}
          </h2>
          <Paragraphs text={c.week4Text} />
          <ImagePlaceholder src={c.week4Image} label={c.week4ImageLabel} />
        </FadeIn>

        {/* HOW IT WORKS */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.howItWorksTitle}
          </h2>
          <Paragraphs text={c.howItWorksText} />
          <ImagePlaceholder src={c.howItWorksImage} label={c.howItWorksImageLabel} />
          <Paragraphs text={c.resultsRecapText} />
        </FadeIn>

        {/* BEYOND CLEAN */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.beyondTitle}
          </h2>
          <Paragraphs text={c.beyondText} />
        </FadeIn>

        {/* REVIEWS */}
        <FadeIn>
          <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.2rem", margin: "32px 0 16px", color: DARK }}>
            {c.reviewsTitle}
          </h3>
          {c.reviews.map((r, i) => (
            <div key={i} style={{
              background: "#fff", border: "1px solid #eee0cc", borderRadius: "14px",
              padding: "18px 20px", marginBottom: "14px",
            }}>
              <Stars />
              <p style={{ fontStyle: "italic", fontSize: "0.98rem", lineHeight: 1.6, margin: "10px 0 8px", fontFamily: "Georgia, serif" }}>
                "{r.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "sans-serif" }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${ACCENT}, #f5a623)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0,
                }}>
                  {r.user[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{r.user}</div>
                  <div style={{ fontSize: "0.72rem", color: TEXT_SOFT }}>{r.reviewedIn}</div>
                </div>
              </div>
            </div>
          ))}
          <ImagePlaceholder src={c.afterReviewsImage} label={c.afterReviewsImageLabel} />
        </FadeIn>

        {/* WHY HAVEN'T YOU HEARD */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.whyNotHeardTitle}
          </h2>
          <Paragraphs text={c.whyNotHeardText} />
          <ImagePlaceholder src={c.pricingImage} label={c.pricingImageLabel} />
          <Paragraphs text={c.pricingCompareText} />
        </FadeIn>

        {/* QUIZ INTRO */}
        <FadeIn>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.4rem", margin: "28px 0 14px", color: DARK }}>
            {c.quizIntroTitle}
          </h2>
          <ImagePlaceholder src={c.quizImage} label={c.quizImageLabel} />
          <Paragraphs text={c.quizIntroText} />
        </FadeIn>

        {/* BANNER CTA */}
        <FadeIn>
          <div style={{
            background: DARK, borderRadius: "18px", padding: "32px 24px", textAlign: "center", margin: "24px 0",
          }}>
            <p style={{
              color: "#fff", fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.3,
              marginBottom: "18px", fontFamily: "sans-serif", textTransform: "uppercase",
            }}>
              {c.bannerTitle}
            </p>
            <a href={c.quizUrl} style={{
              display: "inline-block", background: ACCENT, color: "#fff", fontWeight: 800,
              padding: "16px 32px", borderRadius: "50px", textDecoration: "none",
              fontSize: "1rem", fontFamily: "sans-serif",
            }}>
              {c.bannerButton}
            </a>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", marginTop: "14px", fontFamily: "sans-serif" }}>
              {c.bannerDisclaimer}
            </p>
          </div>
        </FadeIn>

        {/* URGENCY / GUARANTEE */}
        <FadeIn>
          <div style={{
            background: "#fff4e0", border: "1px solid #f0d9a8", borderRadius: "14px",
            padding: "18px 20px", marginBottom: "10px", fontFamily: "sans-serif",
          }}>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: TEXT }}>
              {c.urgencyRegular} <strong style={{ color: ACCENT }}>{c.urgencyHighlighted}</strong>
            </p>
          </div>
        </FadeIn>

        {/* COMMENTS */}
        <FadeIn>
          <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.2rem", margin: "36px 0 16px", color: DARK }}>
            {c.commentsTitle}
          </h3>
          {c.comments.map((cm, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee0cc", padding: "14px 0", fontFamily: "sans-serif" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: ACCENT, marginBottom: "4px" }}>{cm.name}</div>
              <div style={{ fontSize: "0.9rem", lineHeight: 1.6, color: TEXT }}>{cm.text}</div>
            </div>
          ))}
        </FadeIn>

      </article>
    </div>
  );
}
