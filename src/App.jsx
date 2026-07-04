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

function Testimonial({ name, location, text, delay }) {
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
            background: `linear-gradient(135deg, ${ACCENT}, #f5a623)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: "1.1rem",
          }}>
            {name[0]}
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

function CTAButton({ label = "¡Quiero acceder ahora!", large = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    // TODO: Reemplazar href con URL real del afiliado
    <a
      href="#acceso"
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
        {scrolled && (
          <a
            href="#acceso"
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
            Acceder ahora
          </a>
        )}
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
        {/* Decorative circles */}
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
            🇯🇵 Método Japonés de Limpieza
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
            ¿Tu casa nunca está limpia,<br />
            <span style={{ color: "#f5a623" }}>sin importar cuánto te esfuerces?</span>
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
            Descubre el secreto que las mujeres japonesas llevan siglos usando para mantener
            su hogar <strong style={{ color: "#fff" }}>inmaculado en solo 20 minutos al día</strong> — sin agotarse.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <CTAButton label="Descubrir el Método Ahora →" large />
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
                +12,000 hogares transformados
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Hero image placeholder */}
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
            {/* TODO: Reemplazar con imagen real del producto/presentadora */}
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
                ¿Reconoces esta situación?
              </h2>
              <div style={{ textAlign: "left" }}>
                {[
                  "Limpias el lunes y el viernes ya parece que nunca lo hiciste",
                  "Sientes culpa cada vez que ves el desorden acumulado",
                  "Pasas horas limpiando pero el resultado dura muy poco",
                  "La procrastinación te impide empezar, y cuando empiezas, te agota",
                  "Sientes que tu hogar controla tu estado de ánimo y tu energía",
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
                No es tu culpa. Nadie te enseñó el <strong>sistema correcto</strong>.
                Y ese sistema existe desde hace siglos en Japón.
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
              {/* TODO: Reemplazar con foto real de la presentadora */}
              <div style={{
                width: "120px", height: "120px", borderRadius: "50%",
                overflow: "hidden",
                border: `4px solid ${ACCENT}`,
                marginBottom: "20px",
                boxShadow: "0 8px 24px rgba(232,82,90,0.25)",
              }}>
                <img
                  src="https://via.placeholder.com/120x120/e8525a/ffffff?text=EG"
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
                Presentado por
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
                Experta en organización del hogar y bienestar doméstico
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
                "Durante años luché con el mismo problema que tú. Mi casa nunca estaba realmente limpia,
                y yo me sentía agotada solo de pensarlo. Hasta que en un viaje a Japón descubrí algo
                que cambió mi vida para siempre..."
              </p>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: TEXT, marginBottom: "16px" }}>
                "Las mujeres japonesas no limpian más que nosotras. Limpian <strong>diferente</strong>.
                Tienen un sistema ancestral que convierte el orden en un hábito automático, no en una tarea."
              </p>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.8, color: TEXT }}>
                "Hoy quiero compartir contigo ese mismo método — el <strong>{PRODUCT}</strong> —
                exactamente como lo aprendí y como lo aplico cada día."
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
              El Programa
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
              Un sistema completo basado en la filosofía japonesa del <em>Ma</em> (el espacio vacío),
              el <em>Wabi-Sabi</em> y las rutinas ancestrales de las amas de casa japonesas
              que llevan generaciones perfeccionando el arte del hogar limpio.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}>
            {[
              { icon: "⏱️", title: "Solo 20 min/día", desc: "Sistema rápido y sostenible" },
              { icon: "🧘", title: "Sin estrés", desc: "Mentalidad japonesa del flujo" },
              { icon: "🏡", title: "Hogar tranquilo", desc: "Ambiente que da paz" },
              { icon: "♾️", title: "Hábito permanente", desc: "No más recaídas en el desorden" },
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
            <CTAButton label="Quiero el Método Japonés →" large />
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
              Lo que descubrirás dentro del programa
            </h2>
            <p style={{
              textAlign: "center",
              color: "#777",
              fontSize: "0.97rem",
              marginBottom: "40px",
              fontFamily: "sans-serif",
            }}>
              Todo lo que necesitas para transformar tu hogar y tu rutina de forma permanente
            </p>
          </FadeIn>

          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "36px 28px",
            boxShadow: "0 4px 32px rgba(48,40,80,0.08)",
          }}>
            {[
              "El principio del Ma: por qué menos objetos = menos caos (y cómo aplicarlo hoy)",
              "La rutina de los 20 minutos que las japonesas hacen cada mañana y que lo cambia todo",
              "El método de las 3 zonas: cómo dividir tu hogar para que se limpie casi solo",
              "Técnica de limpieza en espiral: el secreto para no repasar dos veces el mismo lugar",
              "Cómo eliminar el desorden emocional que acumulas sin darte cuenta",
              "Los productos de limpieza japoneses que cuestan menos y limpian más",
              "Plan de 7 días para implementar el método desde cero en cualquier tipo de hogar",
              "Cómo enseñar el sistema a toda la familia sin conflictos",
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
                Lo que dicen las mujeres que ya lo aplicaron
              </h2>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", alignItems: "center", fontFamily: "sans-serif" }}>
                <StarRating />
                <span style={{ color: TEXT, fontWeight: 700 }}>4.9 / 5</span>
                <span style={{ color: "#888", fontSize: "0.85rem" }}>(+2,847 valoraciones)</span>
              </div>
            </div>
          </FadeIn>

          <Testimonial
            name="Claudia M."
            location="Madrid, España"
            delay={0}
            text="Llevo 3 semanas con el método y por primera vez en años siento mi casa realmente limpia. Lo más increíble es que solo dedico 20 minutos por la mañana. Eleanor explica todo de forma clarísima."
          />
          <Testimonial
            name="Valeria R."
            location="Buenos Aires, Argentina"
            delay={0.1}
            text="Era una procrastinadora empedernida con la limpieza. Este programa me cambió la mentalidad completamente. Ahora limpio sin que me pese porque el sistema está diseñado para que no se acumule el trabajo."
          />
          <Testimonial
            name="Patricia L."
            location="Ciudad de México"
            delay={0.2}
            text="Mi marido no podía creer el cambio. La casa siempre está recogida y yo tengo más tiempo libre que antes. El método japonés es real, funciona y es sorprendentemente sencillo."
          />
          <Testimonial
            name="Sofía G."
            location="Barcelona, España"
            delay={0.3}
            text="Pensé que era otro curso más. Pero la técnica de las 3 zonas me voló la cabeza. En 7 días ya notaba la diferencia. Ahora mis amigas me preguntan cómo mantengo mi piso tan ordenado."
          />
        </div>
      </section>

      {/* OFFER / CTA SECTION */}
      <section id="acceso" style={{ background: `linear-gradient(160deg, #302850, #1a1a2e)`, padding: "70px 24px" }}>
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
              Empieza hoy mismo con el {PRODUCT}
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "36px",
              fontFamily: "sans-serif",
            }}>
              Accede al programa completo, los materiales descargables y el plan de 7 días
              con una sola inversión. Sin suscripciones, sin sorpresas.
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
                Precio habitual: 97€
              </div>
              <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {/* TODO: Reemplazar con precio real del producto */}
                <span style={{ color: "#f5a623" }}>27€</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: "28px", fontFamily: "sans-serif" }}>
                Precio especial por tiempo limitado
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px", textAlign: "left" }}>
                {[
                  "✅ Acceso inmediato al programa completo",
                  "✅ Plan de 7 días paso a paso",
                  "✅ Guía descargable de las técnicas",
                  "✅ Soporte de {BRAND} community",
                  "✅ Garantía de satisfacción 30 días",
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

              <CTAButton label="¡Acceder Ahora por 27€ →" large />

              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}>
                {["🔒 Pago seguro", "30 días garantía", "Acceso inmediato"].map((item, i) => (
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
                  Precio especial solo por hoy
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.83rem", lineHeight: 1.5, fontFamily: "sans-serif" }}>
                  Esta oferta está disponible mientras dure la campaña de lanzamiento.
                  Una vez cerrada, el precio volverá a 97€.
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
              Preguntas frecuentes
            </h2>
          </FadeIn>

          {[
            {
              q: "¿Para quién es este programa?",
              a: "Para cualquier persona que quiera tener su hogar ordenado y limpio sin pasar horas agotadoras fregando. No importa el tamaño de tu casa ni tu situación familiar."
            },
            {
              q: "¿Necesito comprar productos especiales?",
              a: "No. El método japonés se basa en lo que ya tienes en casa. De hecho, parte del sistema es reducir la cantidad de productos que usas."
            },
            {
              q: "¿Funciona si tengo hijos pequeños en casa?",
              a: "¡Especialmente! El programa incluye una sección dedicada a cómo adaptar el método cuando hay niños e incluso cómo involucrarlos desde pequeños."
            },
            {
              q: "¿Cuánto tiempo necesito al día?",
              a: "La rutina principal lleva 20 minutos por la mañana. Los primeros días de implementación pueden requerir algo más, pero el sistema está diseñado para ser sostenible."
            },
            {
              q: "¿Qué pasa si no me funciona?",
              a: "Tienes 30 días de garantía de satisfacción. Si aplicas el método y no notas resultados, te devolvemos el 100% sin preguntas."
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
              Tu hogar limpio y tranquilo te está esperando
            </h2>
            <p style={{
              color: "#666",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "32px",
              fontFamily: "sans-serif",
            }}>
              Miles de familias ya han transformado su hogar y su bienestar con el {PRODUCT}.
              Hoy es tu turno.
            </p>
            <CTAButton label="Sí, quiero transformar mi hogar →" large />
            <p style={{
              marginTop: "16px",
              color: "#aaa",
              fontSize: "0.8rem",
              fontFamily: "sans-serif",
            }}>
              🔒 Compra 100% segura · Garantía 30 días · Acceso inmediato
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
          {/* TODO: Añadir dirección legal, política de privacidad y términos reales */}
          © {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.
          Los resultados individuales pueden variar.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {["Política de privacidad", "Términos de uso", "Contacto", "Aviso legal"].map((link, i) => (
            <a key={i} href="#" style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.75rem",
              textDecoration: "none",
              fontFamily: "sans-serif",
              // TODO: Añadir URLs reales de páginas legales
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
            ¡Solo hoy: 27€!
          </div>
        </div>
        <a
          href="#acceso"
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
          Acceder →
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