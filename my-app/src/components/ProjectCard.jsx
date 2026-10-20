// components/ProjectCard.jsx
import { useState, useRef, useEffect } from "react"

export function ProjectCard({ title, description, stack = [], images = [], github, index, total }) {
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const rowRef = useRef(null)
  const closeRef = useRef(null)
  const wasOpen = useRef(false)

  const next = () => setIdx(p => (p + 1) % images.length)
  const prev = () => setIdx(p => (p - 1 + images.length) % images.length)

  const toggle = () => setOpen(o => !o)

  // Keep keyboard focus sensible when the card swaps between row and expanded view
  useEffect(() => {
    if (open) closeRef.current?.focus()
    else if (wasOpen.current) rowRef.current?.focus()
    wasOpen.current = open
  }, [open])

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px) rotateY(-12deg); }
          to   { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px) rotateY(12deg) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) rotateY(0deg) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chipPop {
          from { opacity: 0; transform: scale(0.75) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scanline {
          0%   { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }
        .pc-row { cursor: pointer; }
        .pc-row:hover .pc-thumb-img { transform: scale(1.08); opacity: 0.85; }
        .pc-row:hover .pc-title { color: var(--cyan); }
        .pc-row:hover .pc-chevron { color: var(--cyan) !important; }
        .pc-thumb-img { transition: transform 0.4s ease, opacity 0.4s ease; }
        .pc-title { transition: color 0.3s; }
        .pc-chevron { transition: color 0.3s; }
        .pc-github-btn:hover {
          background: rgb(var(--cyan-rgb) / 0.08) !important;
          border-color: var(--cyan) !important;
          box-shadow: 0 0 16px rgb(var(--cyan-rgb) / 0.2) !important;
        }
        .pc-arrow-btn:hover {
          background: rgb(var(--cyan-rgb) / 0.18) !important;
          border-color: var(--cyan) !important;
        }
      `}</style>

      <div style={{ width: "100%" }}>

        {/* ── COLLAPSED CASE-STUDY CARD ── */}
        {!open && (
          <button type="button" className="pc-row cs-card" ref={rowRef}
            aria-expanded="false"
            aria-label={`${title}: open case study`}
            onClick={toggle}>
            <div className="cs-card__cover">
              {images.length > 0 && (
                <img src={images[0]} alt={`${title} preview`} loading="lazy" decoding="async" className="pc-thumb-img" />
              )}
              <span className="cs-card__count">
                {images.length > 1 ? `${images.length} screens` : "Case study"}
              </span>
            </div>
            <div className="cs-card__body">
              <span className="cs-card__idx">
                {String(index + 1).padStart(2, "0")}<small>/{String(total).padStart(2, "0")}</small>
                <i aria-hidden="true" /> CASE STUDY
              </span>
              <h3 className="pc-title cs-card__title">{title}</h3>
              <p className="cs-card__desc">{description}</p>
              <ul className="cs-card__tags">
                {stack.slice(0, 4).map(t => <li key={t}>{t}</li>)}
                {stack.length > 4 && <li className="cs-card__more">+{stack.length - 4}</li>}
              </ul>
              <span className="cs-card__cta pc-chevron">VIEW CASE STUDY <b aria-hidden="true">→</b></span>
            </div>
          </button>
        )}

        {/* ── EXPANDED CARD ── */}
        {open && (
          <div style={{
            background: "rgb(var(--surface-rgb) / 0.98)",
            border: "1px solid rgb(var(--cyan-rgb) / 0.55)",
            borderRadius: 18, overflow: "hidden",
            boxShadow: "0 0 60px rgb(var(--cyan-rgb) / 0.18), 0 24px 64px rgb(var(--shadow-rgb) / calc(0.85 * var(--shadow-k)))",
            position: "relative",
          }}>

            <div style={{ height: 3, background: "linear-gradient(90deg,var(--cyan),var(--teal),var(--indigo))" }} />

            {/* Index badge */}
            <div style={{
              position: "absolute", top: 14, left: 20, zIndex: 10,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 11, letterSpacing: 1.5,
              animation: "fadeUp 0.6s both",
            }}>
              <span style={{ color: "var(--cyan)" }}>{String(index + 1).padStart(2, "0")}</span>
              <span style={{ color: "var(--cyan)", fontSize: 12 }}>/{String(total).padStart(2, "0")}</span>
            </div>

            {/* Close control */}
            <button
              type="button" ref={closeRef}
              aria-label="Close project details"
              onClick={toggle}
              style={{
                position: "absolute", top: 8, right: 10, zIndex: 10,
                minHeight: 36, padding: "6px 12px",
                background: "rgb(var(--bg-rgb) / 0.6)", border: "1px solid rgb(var(--cyan-rgb) / 0.25)", borderRadius: 8,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 12, letterSpacing: 1.5, cursor: "pointer",
                color: "var(--cyan)",
                animation: "fadeUp 0.6s both",
              }}
            >
              ✕ CLOSE
            </button>

            <div className="pc-expanded-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320 }}>

              {/* LEFT */}
              <div className="pc-expanded-left" style={{
                padding: "48px 32px 28px",
                display: "flex", flexDirection: "column", justifyContent: "center",
                animation: "slideInLeft 0.8s cubic-bezier(0.16,1,0.3,1) both",
                borderRight: "1px solid rgb(var(--cyan-rgb) / 0.08)",
              }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 12, letterSpacing: 2, color: "var(--cyan)",
                  marginBottom: 10, animation: "fadeUp 0.6s 0.2s both",
                }}>PROJECT</div>

                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 17, fontWeight: 700, letterSpacing: 1,
                  color: "var(--text-primary)", margin: "0 0 14px", lineHeight: 1.5,
                  animation: "fadeUp 0.6s 0.35s both",
                }}>{title}</h3>

                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 16, color: "var(--text-muted)",
                  margin: "0 0 18px", lineHeight: 1.7,
                  animation: "fadeUp 0.6s 0.5s both",
                }}>{description}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                  {stack.map((tech, i) => (
                    <span key={tech} style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                      color: "var(--cyan)",
                      background: "rgb(var(--cyan-rgb) / 0.08)",
                      border: "1px solid rgb(var(--cyan-rgb) / 0.2)",
                      borderRadius: 6, padding: "3px 9px",
                      animation: `chipPop 0.5s ${0.65 + i * 0.1}s cubic-bezier(0.16,1,0.3,1) both`,
                    }}>{tech}</span>
                  ))}
                </div>

                <a
                  href={github} target="_blank" rel="noopener noreferrer"
                  className="pc-github-btn"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", alignSelf: "flex-start",
                    background: "transparent",
                    border: "1px solid rgb(var(--cyan-rgb) / 0.3)",
                    color: "var(--cyan)", borderRadius: 10,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 12, letterSpacing: 1.5,
                    textDecoration: "none", transition: "all 0.3s",
                    animation: "fadeUp 0.6s 1.1s both",
                  }}
                >↗ VIEW ON GITHUB</a>
              </div>

              {/* RIGHT */}
              <div style={{
                position: "relative", background: "var(--bg)", overflow: "hidden",
                animation: "slideInRight 0.8s cubic-bezier(0.16,1,0.3,1) both",
              }}>
                {images.length > 0 && (
                  <img key={idx} src={images[idx]} alt={`${title} screenshot ${idx + 1}`} loading="lazy" decoding="async"
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      opacity: 0.88, display: "block",
                      animation: "fadeUp 0.6s both",
                    }}
                  />
                )}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to top, rgb(var(--surface-rgb) / 0.6) 0%, transparent 50%)",
                }} />
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(transparent 40%, rgb(var(--cyan-rgb) / 0.04) 50%, transparent 60%)",
                  animation: "scanline 2s linear infinite",
                }} />
                {images.length > 1 && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: "rgb(var(--bg-rgb) / 0.7)",
                    border: "1px solid rgb(var(--cyan-rgb) / 0.2)",
                    borderRadius: 20, padding: "3px 10px",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 12, color: "var(--cyan)", letterSpacing: 1,
                  }}>{idx + 1}/{images.length}</div>
                )}
                {images.length > 1 && (<>
                  <button type="button" className="pc-arrow-btn" aria-label="Previous screenshot" onClick={prev} style={{
                    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                    background: "rgb(var(--bg-rgb) / 0.8)", border: "1px solid rgb(var(--cyan-rgb) / 0.3)",
                    color: "var(--cyan)", borderRadius: 8, width: 44, height: 44, cursor: "pointer",
                    fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}>‹</button>
                  <button type="button" className="pc-arrow-btn" aria-label="Next screenshot" onClick={next} style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "rgb(var(--bg-rgb) / 0.8)", border: "1px solid rgb(var(--cyan-rgb) / 0.3)",
                    color: "var(--cyan)", borderRadius: 8, width: 44, height: 44, cursor: "pointer",
                    fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}>›</button>
                </>)}
                {images.length > 1 && (
                  <div style={{
                    position: "absolute", bottom: 12, left: 0, right: 0,
                    display: "flex", justifyContent: "center", gap: 5,
                  }}>
                    {images.map((_, i) => (
                      <button key={i} type="button" className="pc-dot"
                        aria-label={`Show screenshot ${i + 1} of ${images.length}`}
                        aria-current={i === idx ? "true" : undefined}
                        onClick={() => setIdx(i)}>
                        <span style={{
                          width: i === idx ? 16 : 6,
                          background: i === idx ? "var(--cyan)" : "rgb(var(--cyan-rgb) / 0.4)",
                          boxShadow: i === idx ? "0 0 8px rgb(var(--cyan-rgb) / 0.6)" : "none",
                        }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}