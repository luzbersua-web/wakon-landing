import { useState, useEffect, useRef } from "react";

const BRAND = "Wakon";
const AUTHOR = "Eleanor Grant";
const PRODUCT = "Simple Japanese Cleaning Method";
const ACCENT = "#e8525a";
const ACCENT_DARK = "#c73d45";
const DARK = "#1a1a2e";
const TEXT = "#302850";
const LIGHT_BG = "#faf9f7";
const CREAM = "#fef6ee";

function useInView(threshold = 0.15) {
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

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StarRating({ count = 5 }) {
  return (
    <span style={{ color: "#f5a623", fontSize: "1.1rem", letterSpacing: "2px" }}>
      {"★".repeat(count)}
    </span>
  );
}

function Testimonial({ name, location, text, img, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "28px 24px",
        boxShadow: "0 4px 24px rgba(48,40,80,0.09)",
        marginBottom: "20px",
      }}>
        <StarRating />
        <p style={{ color: TEXT, fontSize: "0.97rem", lineHeight: 1.7, margin: "12px 0 16px", fontStyle: "italic" }}>
          "{text}"
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "50%",
            overflow: "hidden", flexShrink: 0,
          }}>
            <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: TEXT, fontSize: "0.9rem" }}>{name}</div>
            <div style={{ color: "#888", fontSize: "0.8rem" }}>{location}</div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function CheckItem({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
      <div style={{
        width: "24px", height: "24px", borderRadius: "50%",
        background: ACCENT, display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0, marginTop: "2px",
      }}>
        <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>✓</span>
      </div>
      <span style={{ color: TEXT, fontSize: "0.97rem", lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

function CTAButton({ label = "Get access now!", large = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    // TODO: Replace href with the real affiliate URL
    <a
      href="#access"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        background: hovered
          ? `linear-gradient(135deg, ${ACCENT_DARK}, #d4431a)`
          : `linear-gradient(135deg, ${ACCENT}, #f07b2f)`,
        color: "#fff",
        fontWeight: 800,
        fontSize: large ? "1.15rem" : "1rem",
        padding: large ? "20px 44px" : "16px 36px",
        borderRadius: "50px",
        textDecoration: "none",
        boxShadow: hovered
          ? "0 8px 32px rgba(232,82,90,0.55)"
          : "0 4px 20px rgba(232,82,90,0.38)",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px) scale(1.03)" : "scale(1)",
        letterSpacing: "0.3px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      {label}
    </a>
  );
}

function QuizBanner() {
  return (
    <section style={{ background: LIGHT_BG, padding: "48px 24px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "32px 28px",
            boxShadow: "0 4px 32px rgba(48,40,80,0.08)",
            textAlign: "center",
            border: `1px dashed rgba(232,82,90,0.35)`,
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🎯</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: TEXT, marginBottom: "10px" }}>
              Bonus: find out your procrastination type
            </h3>
            <p style={{ color: "#666", fontSize: "0.93rem", lineHeight: 1.6, marginBottom: "20px", fontFamily: "sans-serif" }}>
              A free 2-minute quiz, separate from the {BRAND} program, to understand why you put off things around the house.
            </p>
            <a
              href="/en/quiz/index.html"
              style={{
                display: "inline-block",
                background: DARK,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "14px 30px",
                borderRadius: "50px",
                textDecoration: "none",
                fontFamily: "sans-serif",
              }}
            >
              Take the quiz →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: TEXT, background: LIGHT_BG, overflowX: "hidden" }}>

      {/* STICKY TOP BAR */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? "rgba(26,26,46,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.4s ease",
        padding: "14px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontWeight: 800, fontSize: "1.35rem",
          color: scrolled ? "#fff" : DARK,
          letterSpacing: "1px",
          fontFamily: "sans-serif",
        }}>
          {BRAND.toUpperCase()}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a href="/" style={{
            color: scrolled ? "rgba(255,255,255,0.7)" : "rgba(48,40,80,0.6)",
            fontSize: "0.78rem",
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}>
            ES
          </a>
          {scrolled && (
            <a
              href="#access"
              style={{
                background: ACCENT,
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "50px",
                fontSize: "0.82rem",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "sans-serif",
              }}
            >
              Get access
            </a>
          )}
        </div>
      </div>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(160deg, #1a1a2e 0%, #302850 60%, #4a2040 100%)`,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "rgba(232,82,90,0.12)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: "rgba(245,166,35,0.1)", pointerEvents: "none",
        }} />

        <FadeIn>
          <div style={{
            background: "rgba(232,82,90,0.18)",
            border: "1px solid rgba(232,82,90,0.4)",
            borderRadius: "50px",
            padding: "6px 18px",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "#f5a623",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "24px",
            fontFamily: "sans-serif",
            display: "inline-block",
          }}>
            🇯🇵 Japanese Cleaning Method
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontSize: "clamp(2rem, 7vw, 3.2rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.2,
            maxWidth: "720px",
            margin: "0 auto 20px",
            fontFamily: "Georgia, serif",
          }}>
            Is your home never really clean,<br />
            <span style={{ color: "#f5a623" }}>no matter how hard you try?</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            color: "rgba(255,255,255,0.82)",
            maxWidth: "580px",
            margin: "0 auto 36px",
            lineHeight: 1.7,
            fontFamily: "sans-serif",
          }}>
            Discover the secret Japanese women have used for centuries to keep
            their home <strong style={{ color: "#fff" }}>spotless in just 20 minutes a day</strong> — without burning out.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <CTAButton label="Discover the Method Now →" large />
        </FadeIn>

        <FadeIn delay={0.4}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "28px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <div style={{ display: "flex", gap: "-8px" }}>
              {["A","B","C","D","E"].map((l, i) => (
                <div key={i} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: `hsl(${i * 40 + 10}, 70%, 55%)`,
                  border: "2px solid #302850",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "0.75rem", fontWeight: 700,
                  marginLeft: i > 0 ? "-10px" : "0",
                }}>
                  {l}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "sans-serif" }}>
              <div style={{ color: "#f5a623", fontSize: "0.85rem", fontWeight: 700 }}>
                <StarRating count={5} /> 4.9/5
              </div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.75rem" }}>
                +12,000 homes transformed
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} style={{ marginTop: "48px", width: "100%", maxWidth: "560px" }}>
          <div style={{
            background: "rgba(255,255,255,0.07)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.12)",
            overflow: "hidden",
            aspectRatio: "16/9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            {/* TODO: Replace with a real product/presenter image */}
            <img
              src="https://via.placeholder.com/560x315/2d2550/ffffff?text=Simple+Japanese+Cleaning+Method"
              alt={PRODUCT}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute",
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(232,82,90,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 0 0 12px rgba(232,82,90,0.2)",
            }}>
              <span style={{ color: "#fff", fontSize: "1.4rem", marginLeft: "4px" }}>▶</span>
            </div>
          </div>
        </FadeIn>
      </section>

      <QuizBanner />

      {/* PROBLEM SECTION */}
      <section style={{ background: CREAM, padding: "70px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              textAlign: "center",
              background: "#fff",
              borderRadius: "20px",
              padding: "40px 32px",
              boxShadow: "0 4px 32px rgba(48,40,80,0.08)",
              borderLeft: `5px solid ${ACCENT}`,
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>😩</div>
              <h2 style={{
                fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
                fontWeight: 800,
                color: TEXT,
                marginBottom: "20px",
                lineHeight: 1.3,
              }}>
                Does this sound familiar?
              </h2>
              <div style={{ textAlign: "left" }}>
                {[
                  "You clean on Monday and by Friday it looks like you never did",
                  "You feel guilty every time you see the clutter pile up",
                  "You spend hours cleaning but the result barely lasts",
                  "Procrastination keeps you from starting, and when you do, it wears you out",
                  "You feel like your home controls your mood and your energy",
                ].map((p, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "12px", alignItems: "flex-start",
                    marginBottom: "14px", padding: "12px 16px",
                    background: "rgba(232,82,90,0.05)",
                    borderRadius: "10px",
                  }}>
                    <span style={{ color: ACCENT, fontSize: "1.1rem", flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: "0.95rem", lineHeight: 1.5, fontFamily: "sans-serif" }}>{p}</span>
                  </div>
                ))}
              </div>
              <p style={{
                marginTop: "24px",
                fontSize: "1rem",
                color: "#666",
                lineHeight: 1.7,
                fontFamily: "sans-serif",
              }}>
                It's not your fault. Nobody ever taught you the <strong>right system</strong>.
                And that system has existed in Japan for centuries.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AUTHOR / BRIDGE */}
      <section style={{ background: "#fff", padding: "70px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{
                width: "120px", height: "120px", borderRadius: "50%",
                overflow: "hidden",
                border: `4px solid ${ACCENT}`,
                marginBottom: "20px",
                boxShadow: "0 8px 24px rgba(232,82,90,0.25)",
              }}>
                <img
                  src="/shared/images/female-avatar.jpg"
                  alt={AUTHOR}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{
                background: "rgba(232,82,90,0.08)",
                borderRadius: "8px",
                padding: "4px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: ACCENT,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "12px",
                fontFamily: "sans-serif",
              }}>
                Presented by
              </div>
              <h2 style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: TEXT,
                marginBottom: "8px",
              }}>
                {AUTHOR}
              </h2>
              <p style={{
                fontSize: "0.9rem",
                color: "#888",
                marginBottom: "24px",
                fontFamily: "sans-serif",
              }}>
                Home organization and domestic wellness expert
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{
              background: CREAM,
              borderRadius: "16px",
              padding: "28px",
              borderLeft: `4px solid #f5a623`,
              fontFamily: "sans-serif",
            }}>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: TEXT, marginBottom: "16px" }}>
                "For years I struggled with the same problem you have. My home was never really clean,
                and just thinking about it exhausted me. Until a trip to Japan I discovered something
                that changed my life for good..."
              </p>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: TEXT, marginBottom: "16px" }}>
                "Japanese women don't clean more than we do. They clean <strong>differently</strong>.
                They have an ancestral system that turns order into an automatic habit, not a chore."
              </p>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: TEXT }}>
                "Today I want to share that same method with you — the <strong>{PRODUCT}</strong> —
                exactly as I learned it and as I apply it every day."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section style={{ background: `linear-gradient(135deg, #1a1a2e, #302850)`, padding: "70px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{
              display: "inline-block",
              background: "rgba(245,166,35,0.15)",
              border: "1px solid rgba(245,166,35,0.3)",
              borderRadius: "50px",
              padding: "6px 18px",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#f5a623",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "sans-serif",
            }}>
              The Program
            </div>
            <h2 style={{
              fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "16px",
              lineHeight: 1.25,
            }}>
              {PRODUCT}
            </h2>
            <p style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
              marginBottom: "48px",
              fontFamily: "sans-serif",
            }}>
              A complete system based on the Japanese philosophy of <em>Ma</em> (empty space),
              <em> Wabi-Sabi</em>, and the ancestral routines Japanese homemakers
              have spent generations perfecting the art of a clean home.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}>
            {[
              { icon: "⏱️", title: "Just 20 min/day", desc: "A fast, sustainable system" },
              { icon: "🧘", title: "No stress", desc: "The Japanese flow mindset" },
              { icon: "🏡", title: "A calm home", desc: "An environment that brings peace" },
              { icon: "♾️", title: "A lasting habit", desc: "No more falling back into clutter" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  padding: "28px 20px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                  <div style={{ color: "#fff", fontWeight: 700, marginBottom: "8px", fontFamily: "sans-serif" }}>
                    {item.title}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontFamily: "sans-serif" }}>
                    {item.desc}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <CTAButton label="I want the Japanese Method →" large />
          </FadeIn>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section style={{ background: LIGHT_BG, padding: "70px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{
              fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)",
              fontWeight: 800,
              color: TEXT,
              textAlign: "center",
              marginBottom: "12px",
            }}>
              What you'll discover inside the program
            </h2>
            <p style={{
              textAlign: "center",
              color: "#777",
              fontSize: "0.97rem",
              marginBottom: "40px",
              fontFamily: "sans-serif",
            }}>
              Everything you need to permanently transform your home and your routine
            </p>
          </FadeIn>

          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "36px 28px",
            boxShadow: "0 4px 32px rgba(48,40,80,0.08)",
          }}>
            {[
              "The Ma principle: why fewer objects means less chaos (and how to apply it today)",
              "The 20-minute routine Japanese women do every morning that changes everything",
              "The 3-zone method: how to divide your home so it practically cleans itself",
              "The spiral cleaning technique: the secret to never going over the same spot twice",
              "How to clear the emotional clutter you accumulate without realizing it",
              "The Japanese cleaning products that cost less and clean more",
              "A 7-day plan to implement the method from scratch in any type of home",
              "How to teach the system to the whole family without conflict",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <CheckItem text={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: CREAM, padding: "70px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 style={{
                fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)",
                fontWeight: 800,
                color: TEXT,
                marginBottom: "8px",
              }}>
                What women who've tried it are saying
              </h2>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", alignItems: "center", fontFamily: "sans-serif" }}>
                <StarRating />
                <span style={{ color: TEXT, fontWeight: 700 }}>4.9 / 5</span>
                <span style={{ color: "#888", fontSize: "0.85rem" }}>(+2,847 reviews)</span>
              </div>
            </div>
          </FadeIn>

          <Testimonial
            name="Sarah Mitchell"
            location="Chicago, USA"
            img="/shared/images/testimonial-1.jpg"
            delay={0}
            text="I've been on the method for 3 weeks and for the first time in years my house actually feels clean. The wildest part is it only takes 20 minutes in the morning. Eleanor explains everything so clearly."
          />
          <Testimonial
            name="Emily Turner"
            location="Toronto, Canada"
            img="/shared/images/testimonial-2.jpg"
            delay={0.1}
            text="I was a hardcore procrastinator when it came to cleaning. This program completely changed my mindset. Now I clean without dreading it because the system is built so the work never piles up."
          />
          <Testimonial
            name="Priya Anand"
            location="Manchester, UK"
            img="/shared/images/testimonial-3.jpg"
            delay={0.2}
            text="My husband couldn't believe the change. The house is always tidy and I have more free time than before. The Japanese method is real, it works, and it's surprisingly simple."
          />
          <Testimonial
            name="Grace Thompson"
            location="Melbourne, Australia"
            img="/shared/images/testimonial-4.jpg"
            delay={0.3}
            text="I thought it was just another course. But the 3-zone technique blew my mind. Within 7 days I already noticed the difference. Now my friends ask how I keep my place so organized."
          />
        </div>
      </section>

      {/* OFFER / CTA SECTION */}
      <section id="access" style={{ background: `linear-gradient(160deg, #302850, #1a1a2e)`, padding: "70px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🎌</div>
            <h2 style={{
              fontSize: "clamp(1.6rem, 5vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}>
              Start today with the {PRODUCT}
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "36px",
              fontFamily: "sans-serif",
            }}>
              Get the full program, the downloadable materials, and the 7-day plan
              with a single payment. No subscriptions, no surprises.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "24px",
              padding: "40px 32px",
              marginBottom: "32px",
            }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "8px", fontFamily: "sans-serif", textDecoration: "line-through" }}>
                Regular price: $97
              </div>
              <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {/* TODO: Replace with the real product price */}
                <span style={{ color: "#f5a623" }}>$27</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: "28px", fontFamily: "sans-serif" }}>
                Special price for a limited time
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px", textAlign: "left" }}>
                {[
                  "✅ Instant access to the full program",
                  "✅ Step-by-step 7-day plan",
                  "✅ Downloadable technique guide",
                  "✅ Support from the {BRAND} community",
                  "✅ 30-day satisfaction guarantee",
                ].map((item, i) => (
                  <div key={i} style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.9rem",
                    fontFamily: "sans-serif",
                    display: "flex",
                    gap: "8px",
                  }}>
                    {item.replace("{BRAND}", BRAND)}
                  </div>
                ))}
              </div>

              <CTAButton label="Get Access Now for $27 →" large />

              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}>
                {["🔒 Secure payment", "30-day guarantee", "Instant access"].map((item, i) => (
                  <span key={i} style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.78rem",
                    fontFamily: "sans-serif",
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{
              background: "rgba(245,166,35,0.1)",
              border: "1px solid rgba(245,166,35,0.25)",
              borderRadius: "12px",
              padding: "16px 20px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              textAlign: "left",
            }}>
              <span style={{ fontSize: "1.5rem" }}>⚠️</span>
              <div>
                <div style={{ color: "#f5a623", fontWeight: 700, fontSize: "0.9rem", marginBottom: "4px", fontFamily: "sans-serif" }}>
                  Special price today only
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.83rem", lineHeight: 1.5, fontFamily: "sans-serif" }}>
                  This offer is available while the launch campaign lasts.
                  Once it closes, the price goes back to $97.
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", padding: "70px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 800,
              color: TEXT,
              textAlign: "center",
              marginBottom: "40px",
            }}>
              Frequently asked questions
            </h2>
          </FadeIn>

          {[
            {
              q: "Who is this program for?",
              a: "For anyone who wants a tidy, clean home without spending exhausting hours scrubbing. It doesn't matter how big your house is or what your family situation looks like."
            },
            {
              q: "Do I need to buy special products?",
              a: "No. The Japanese method is based on what you already have at home. In fact, part of the system is reducing how many products you use."
            },
            {
              q: "Does it work if I have young kids at home?",
              a: "Especially then! The program includes a section dedicated to adapting the method when there are kids, and even how to get them involved from an early age."
            },
            {
              q: "How much time do I need each day?",
              a: "The main routine takes 20 minutes in the morning. The first days of setting it up may take a bit more, but the system is designed to be sustainable."
            },
            {
              q: "What if it doesn't work for me?",
              a: "You have a 30-day satisfaction guarantee. If you apply the method and don't see results, we'll refund you 100%, no questions asked."
            },
          ].map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: CREAM, padding: "70px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🏡</div>
            <h2 style={{
              fontSize: "clamp(1.6rem, 5vw, 2.3rem)",
              fontWeight: 800,
              color: TEXT,
              marginBottom: "16px",
              lineHeight: 1.25,
            }}>
              Your clean, calm home is waiting for you
            </h2>
            <p style={{
              color: "#666",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "32px",
              fontFamily: "sans-serif",
            }}>
              Thousands of families have already transformed their home and their well-being with the {PRODUCT}.
              Today it's your turn.
            </p>
            <CTAButton label="Yes, I want to transform my home →" large />
            <p style={{
              marginTop: "16px",
              color: "#aaa",
              fontSize: "0.8rem",
              fontFamily: "sans-serif",
            }}>
              🔒 100% secure purchase · 30-day guarantee · Instant access
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: DARK,
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <div style={{
          fontWeight: 800,
          fontSize: "1.4rem",
          color: "#fff",
          letterSpacing: "1px",
          fontFamily: "sans-serif",
          marginBottom: "16px",
        }}>
          {BRAND.toUpperCase()}
        </div>
        <p style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.78rem",
          maxWidth: "480px",
          margin: "0 auto 16px",
          lineHeight: 1.6,
          fontFamily: "sans-serif",
        }}>
          {/* TODO: Add real legal address, privacy policy and terms */}
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
          Individual results may vary.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Use", "Contact", "Legal Notice"].map((link, i) => (
            <a key={i} href="#" style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.75rem",
              textDecoration: "none",
              fontFamily: "sans-serif",
              // TODO: Add real URLs for legal pages
            }}>
              {link}
            </a>
          ))}
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 998,
        background: "rgba(26,26,46,0.97)",
        backdropFilter: "blur(8px)",
        padding: "12px 20px",
        display: scrolled ? "flex" : "none",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
      }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", fontFamily: "sans-serif" }}>
            {PRODUCT}
          </div>
          <div style={{ color: "#f5a623", fontSize: "0.78rem", fontFamily: "sans-serif" }}>
            Today only: $27!
          </div>
        </div>
        <a
          href="#access"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #f07b2f)`,
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "50px",
            fontSize: "0.85rem",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
            fontFamily: "sans-serif",
            boxShadow: "0 4px 16px rgba(232,82,90,0.4)",
          }}
        >
          Get access →
        </a>
      </div>
    </div>
  );
}

function FAQItem({ q, a, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div style={{
        borderBottom: "1px solid rgba(48,40,80,0.1)",
        marginBottom: "4px",
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 0",
            textAlign: "left",
            gap: "12px",
          }}
        >
          <span style={{
            fontWeight: 700,
            color: TEXT,
            fontSize: "0.97rem",
            fontFamily: "sans-serif",
          }}>
            {q}
          </span>
          <span style={{
            color: ACCENT,
            fontSize: "1.2rem",
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.25s ease",
          }}>
            +
          </span>
        </button>
        <div style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}>
          <p style={{
            padding: "0 0 18px",
            color: "#666",
            fontSize: "0.93rem",
            lineHeight: 1.7,
            fontFamily: "sans-serif",
            margin: 0,
          }}>
            {a}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
