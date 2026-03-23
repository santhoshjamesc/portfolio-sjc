// components/ProjectCard.jsx
import { useState, useRef } from "react"

export function ProjectCard({ title, description, stack = [], images = [], github, onHoverChange, index, total }) {
  const [idx, setIdx] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [hov, setHov] = useState(false)
  const ref = useRef(null)

  const open = pinned || hov

  const next = (e) => { e.stopPropagation(); setIdx(p => (p + 1) % images.length) }
  const prev = (e) => { e.stopPropagation(); setIdx(p => (p - 1 + images.length) % images.length) }

  const handleMouseEnter = () => { setHov(true); onHoverChange?.(true) }
  const handleMouseLeave = () => { setHov(false); if (!pinned) onHoverChange?.(false) }
  const handleClick = () => { const n = !pinned; setPinned(n); onHoverChange?.(n) }

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
        .pc-row:hover .pc-thumb-img { transform: scale(1.08); opacity: 0.85; }
        .pc-row:hover .pc-title { color: #38bdf8; }
        .pc-row:hover .pc-chevron { color: rgba(56,189,248,0.8) !important; }
        .pc-thumb-img { transition: transform 0.4s ease, opacity 0.4s ease; }
        .pc-title { transition: color 0.3s; }
        .pc-chevron { transition: color 0.3s; }
        .pc-github-btn:hover {
          background: rgba(56,189,248,0.08) !important;
          border-color: #38bdf8 !important;
          box-shadow: 0 0 16px rgba(56,189,248,0.2) !important;
        }
        .pc-arrow-btn:hover {
          background: rgba(56,189,248,0.18) !important;
          border-color: #38bdf8 !important;
        }
      `}</style>

      <div
        ref={ref}
        style={{ width: "100%", perspective: "1200px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >

        {/* ── COLLAPSED ROW ── */}
        {!open && (
          <div className="pc-row" style={{
            display: "flex", alignItems: "center", gap: 20,
            padding: "14px 20px",
            background: "rgba(8,14,30,0.85)",
            border: "1px solid rgba(56,189,248,0.1)",
            borderRadius: 14,
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            cursor: "pointer",
          }}>

            {/* Index / total */}
            <div style={{
              flexShrink: 0, textAlign: "right",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 9, letterSpacing: 1.5,
              lineHeight: 1.4,
            }}>
              <span style={{ color: "rgba(56,189,248,0.7)" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span style={{ color: "rgba(56,189,248,0.2)", fontSize: 7 }}>
                /{String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Thumbnail */}
            {images.length > 0 && (
              <div style={{
                width: 72, height: 48, borderRadius: 8,
                overflow: "hidden", flexShrink: 0,
                border: "1px solid rgba(56,189,248,0.15)",
                background: "#04060f",
              }}>
                <img src={images[0]} alt=""
                  className="pc-thumb-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, display: "block" }}
                />
              </div>
            )}

            {/* Title */}
            <h3 className="pc-title" style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: "#94a3b8", margin: 0, flex: 1,
            }}>{title}</h3>

            {/* Stack pills */}
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              {stack.slice(0, 3).map(t => (
                <span key={t} style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 9, fontWeight: 600, letterSpacing: 1,
                  color: "rgba(56,189,248,0.5)",
                  background: "rgba(56,189,248,0.06)",
                  border: "1px solid rgba(56,189,248,0.12)",
                  borderRadius: 5, padding: "2px 7px",
                }}>{t}</span>
              ))}
              {stack.length > 3 && (
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 9, color: "rgba(56,189,248,0.3)", padding: "2px 4px",
                }}>+{stack.length - 3}</span>
              )}
            </div>

            <span className="pc-chevron" style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 10, color: "rgba(56,189,248,0.3)", flexShrink: 0,
            }}>▸</span>
          </div>
        )}

        {/* ── EXPANDED CARD ── */}
        {open && (
          <div style={{
            background: "rgba(10,18,38,0.98)",
            border: pinned ? "1px solid rgba(56,189,248,0.55)" : "1px solid rgba(56,189,248,0.3)",
            borderRadius: 18, overflow: "hidden",
            boxShadow: pinned
              ? "0 0 60px rgba(56,189,248,0.18), 0 24px 64px rgba(0,0,0,0.85)"
              : "0 0 32px rgba(56,189,248,0.1), 0 16px 48px rgba(0,0,0,0.7)",
            position: "relative",
            cursor: pinned ? "default" : "pointer",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}>

            <div style={{ height: 3, background: "linear-gradient(90deg,#38bdf8,#2dd4bf,#818cf8)" }} />

            {/* Index badge */}
            <div style={{
              position: "absolute", top: 14, left: 20, zIndex: 10,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 9, letterSpacing: 1.5,
              animation: "fadeUp 0.6s both",
            }}>
              <span style={{ color: "rgba(56,189,248,0.7)" }}>{String(index + 1).padStart(2, "0")}</span>
              <span style={{ color: "rgba(56,189,248,0.25)", fontSize: 7 }}>/{String(total).padStart(2, "0")}</span>
            </div>

            {/* Pin hint */}
            <div style={{
              position: "absolute", top: 16, right: 16, zIndex: 10,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 7, letterSpacing: 2,
              color: pinned ? "rgba(56,189,248,0.5)" : "rgba(56,189,248,0.3)",
              animation: "fadeUp 0.6s both",
            }}>
              {pinned ? "PINNED · CLICK TO CLOSE" : "CLICK TO PIN"}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320 }}>

              {/* LEFT */}
              <div style={{
                padding: "48px 32px 28px",
                display: "flex", flexDirection: "column", justifyContent: "center",
                animation: "slideInLeft 0.8s cubic-bezier(0.16,1,0.3,1) both",
                borderRight: "1px solid rgba(56,189,248,0.08)",
              }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 8, letterSpacing: 3, color: "rgba(56,189,248,0.5)",
                  marginBottom: 10, animation: "fadeUp 0.6s 0.2s both",
                }}>PROJECT</div>

                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 14, fontWeight: 700, letterSpacing: 1.5,
                  color: "#e2e8f0", margin: "0 0 14px", lineHeight: 1.5,
                  animation: "fadeUp 0.6s 0.35s both",
                }}>{title}</h3>

                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 14, color: "#94a3b8",
                  margin: "0 0 18px", lineHeight: 1.7,
                  animation: "fadeUp 0.6s 0.5s both",
                }}>{description}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                  {stack.map((tech, i) => (
                    <span key={tech} style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: 10, fontWeight: 600, letterSpacing: 1,
                      color: "#38bdf8",
                      background: "rgba(56,189,248,0.08)",
                      border: "1px solid rgba(56,189,248,0.2)",
                      borderRadius: 6, padding: "3px 9px",
                      animation: `chipPop 0.5s ${0.65 + i * 0.1}s cubic-bezier(0.16,1,0.3,1) both`,
                    }}>{tech}</span>
                  ))}
                </div>

                <a
                  href={github} target="_blank" rel="noopener noreferrer"
                  className="pc-github-btn"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", alignSelf: "flex-start",
                    background: "transparent",
                    border: "1px solid rgba(56,189,248,0.3)",
                    color: "#38bdf8", borderRadius: 10,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 9, letterSpacing: 2,
                    textDecoration: "none", transition: "all 0.3s",
                    animation: "fadeUp 0.6s 1.1s both",
                  }}
                >↗ VIEW ON GITHUB</a>
              </div>

              {/* RIGHT */}
              <div style={{
                position: "relative", background: "#04060f", overflow: "hidden",
                animation: "slideInRight 0.8s cubic-bezier(0.16,1,0.3,1) both",
              }}>
                {images.length > 0 && (
                  <img key={idx} src={images[idx]} alt=""
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      opacity: 0.88, display: "block",
                      animation: "fadeUp 0.6s both",
                    }}
                  />
                )}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to top, rgba(8,14,30,0.6) 0%, transparent 50%)",
                }} />
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(transparent 40%, rgba(56,189,248,0.04) 50%, transparent 60%)",
                  animation: "scanline 2s linear infinite",
                }} />
                {images.length > 1 && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: "rgba(4,6,15,0.7)",
                    border: "1px solid rgba(56,189,248,0.2)",
                    borderRadius: 20, padding: "3px 10px",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 8, color: "#38bdf8", letterSpacing: 1,
                  }}>{idx + 1}/{images.length}</div>
                )}
                {images.length > 1 && (<>
                  <button className="pc-arrow-btn" onClick={prev} style={{
                    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(4,6,15,0.8)", border: "1px solid rgba(56,189,248,0.3)",
                    color: "#38bdf8", borderRadius: 8, width: 32, height: 32, cursor: "pointer",
                    fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}>‹</button>
                  <button className="pc-arrow-btn" onClick={next} style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(4,6,15,0.8)", border: "1px solid rgba(56,189,248,0.3)",
                    color: "#38bdf8", borderRadius: 8, width: 32, height: 32, cursor: "pointer",
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
                      <div key={i} onClick={(e) => { e.stopPropagation(); setIdx(i) }} style={{
                        width: i === idx ? 16 : 5, height: 5, borderRadius: 3,
                        background: i === idx ? "#38bdf8" : "rgba(56,189,248,0.25)",
                        cursor: "pointer", transition: "all 0.3s",
                        boxShadow: i === idx ? "0 0 8px rgba(56,189,248,0.6)" : "none",
                      }} />
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