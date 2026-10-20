import { asset } from "../utils/asset";
// components/HeroSection.jsx
import { useEffect, useRef, useState } from "react"
import { useInView } from "../hooks/useInView"
import { resumelink } from "../data/data"

function getDriveDownloadLink(viewLink) {
  const match = viewLink.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (!match) return null
  const fileId = match[1]
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

function TypeWriter({ text, speed = 60, startDelay = 800 }) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [started, displayed, text, speed])

  return (
    <span>
      {displayed}
      <span style={{
        display: "inline-block", width: 2, height: "0.9em",
        background: "var(--cyan)", marginLeft: 3,
        animation: "blink 1s step-end infinite",
        verticalAlign: "text-bottom",
      }} />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  )
}

// --- Proximity-colored character span ---
function CharSpan({ ch, mousePos }) {
  const ref = useRef(null)
  const RADIUS = 90

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dist = Math.hypot(mousePos.x - cx, mousePos.y - cy)
    const t = Math.max(0, 1 - dist / RADIUS)

    if (t < 0.05) {
      el.style.background = ""
      el.style.webkitBackgroundClip = ""
      el.style.webkitTextFillColor = ""
      el.style.backgroundClip = ""
      el.style.transform = ""
      el.style.textShadow = ""
      return
    }

    el.style.background = "linear-gradient(90deg, var(--cyan), var(--teal))"
    el.style.webkitBackgroundClip = "text"
    el.style.webkitTextFillColor = "transparent"
    el.style.backgroundClip = "text"
    el.style.textShadow = `0 0 ${Math.round(t * 12)}px rgb(var(--cyan-rgb) / ${(t * 0.4).toFixed(2)})`
  }, [mousePos])

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        color: "var(--text-primary)",
        transition: "text-shadow 0.12s",
      }}
    >
      {ch === " " ? "\u00a0" : ch}
    </span>
  )
}

// --- Name rendered as individual chars ---
function CharText({ text, mousePos, style }) {
  return (
    <h1 aria-label={text} style={{ ...style, display: "block", textAlign: "left", overflowWrap: "normal" }}>
      {text.split(" ").map((word, w, words) => (
        <span key={w} aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {[...word].map((ch, i) => (
            <CharSpan key={i} ch={ch} mousePos={mousePos} />
          ))}
          {w < words.length - 1 && <CharSpan ch=" " mousePos={mousePos} />}
        </span>
      ))}
    </h1>
  )
}

export function HeroSection() {
  const [ref1, in1] = useInView()
  const [ref2, in2] = useInView()
  const [ref3, in3] = useInView()
  const [ref4, in4] = useInView()
  const [ref5, in5] = useInView()
  const viewLink=resumelink
  const downloadLink = getDriveDownloadLink(viewLink)
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })

  const rafRef = useRef(0)

  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      setMousePos({ x, y })
    })
  }

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = 0
    setMousePos({ x: -9999, y: -9999 })
  }

  const reveal = (inView, delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px) scale(1)" : "translateY(56px) scale(0.97)",
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  const nameBaseStyle = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "clamp(26px, 11cqw, 72px)",
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: "0.02em",
    margin: 0,
    padding: 0,
  }

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      {/* Left — text */}
      <div className="hero-left">
        <div ref={ref1} style={reveal(in1, 0)}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px",
            border: "1px solid rgb(var(--cyan-rgb) / 0.25)",
            borderRadius: 20,
            marginBottom: 28,
            background: "rgb(var(--cyan-rgb) / 0.05)",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--teal)",
              boxShadow: "0 0 8px var(--teal)",
              animation: "pulse 2s infinite",
            }} />
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 12, color: "var(--teal)", letterSpacing: 2,
            }}>
              ONLINE · CSE GRADUATE 2025
            </span>
          </div>
        </div>

        {/* Name with proximity effect */}
        <div ref={ref2} style={reveal(in2, 120)}>
          <CharText
            text="SANTHOSH"
            mousePos={mousePos}
            style={{ ...nameBaseStyle, marginBottom: 8 }}
          />
          <CharText
            text="JAMES C"
            mousePos={mousePos}
            style={{ ...nameBaseStyle, marginBottom: 28 }}
          />
        </div>

        <div ref={ref3} style={{ ...reveal(in3, 240), marginBottom: 28 }}>
          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 14, color: "var(--cyan)", letterSpacing: 1.5,
            marginBottom: 16,
          }}>
            <TypeWriter text="Software Developer · Creative Technologist" />
          </p>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 18, color: "var(--text-muted)", lineHeight: 1.7,
            maxWidth: 440,
          }}>
            Building elegant software solutions at the intersection of AI, web technology, and human creativity. Seeking new frontiers.
          </p>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 16, color: "var(--cyan)", lineHeight: 1.6,
            maxWidth: 440, marginTop: 12,
          }}>
            ◆ Open-source contributor · 5 packages &amp; extensions published on npm and VS Marketplace
          </p>
        </div>

        <div ref={ref4} className="hero-cta" style={{ ...reveal(in4, 360), display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a
            href={downloadLink}
            download
            className="btn-primary"
          >
            ↓ DOWNLOAD CV
          </a>
          <a
            href= {viewLink}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
          >
            ↗ VIEW ONLINE
          </a>
        </div>

        {/* Stats row */}
        <div ref={ref5} className="hero-stats" style={{ ...reveal(in5, 480), display: "flex", gap: 36, marginTop: 48 }}>
          {[["5+", "PROJECTS"], ["4+", "CERTS"], ["3+", "ROLES"]].map(([num, lbl], i) => (
            <div key={i}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 28, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1,
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 12, color: "var(--text-dim)", letterSpacing: 2, marginTop: 6,
              }}>
                {lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — profile card */}
      <HeroCard />
    </section>
  )
}

function HeroCard() {
  const ref = useRef(null)
  const [inViewRef, inView] = useInView()
  const [rot, setRot] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16
    const y = ((e.clientY - r.top) / r.height - 0.5) * -16
    setRot({ x: y, y: x })
  }

  const handleLeave = () => setRot({ x: 0, y: 0 })

  return (
    <div
      ref={inViewRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px) scale(1)" : "translateY(56px) scale(0.97)",
        transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 200ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) 200ms",
      }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: rot.x === 0 ? "transform 0.6s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s linear",
          maxWidth: 400, margin: "0 auto", position: "relative",
        }}
      >
        {/* Outer orbit rings */}
        <div className="hero-orbit" aria-hidden="true" style={{ position: "absolute", inset: -30, borderRadius: "50%", border: "1px solid rgb(var(--cyan-rgb) / 0.06)", pointerEvents: "none" }} />
        <div className="hero-orbit" aria-hidden="true" style={{ position: "absolute", inset: -60, borderRadius: "50%", border: "1px solid rgb(var(--cyan-rgb) / 0.04)", pointerEvents: "none" }} />

        <div style={{
          background: "rgb(var(--surface-rgb) / 0.9)",
          border: "1px solid rgb(var(--cyan-rgb) / 0.2)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 0 60px rgb(var(--cyan-rgb) / 0.12), 0 32px 80px rgb(var(--shadow-rgb) / calc(0.8 * var(--shadow-k)))",
          position: "relative",
        }}>
          {/* Gradient scan line effect */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "linear-gradient(180deg, rgb(var(--cyan-rgb) / 0.04) 0%, transparent 30%, transparent 70%, rgb(var(--teal-rgb) / 0.03) 100%)",
          }} />

          {/* Cyan top bar */}
          <div style={{
            height: 3,
            background: "linear-gradient(90deg, var(--cyan), var(--teal), var(--indigo))",
          }} />

          {/* Header with coordinates */}
          <div style={{
            padding: "14px 20px 0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 12, color: "var(--cyan)", letterSpacing: 1.5,
            }}>
              SUBJECT_ID:SJC_001
            </span>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--teal)",
              boxShadow: "0 0 10px var(--teal)",
              animation: "pulse 2s infinite",
            }} />
          </div>

          {/* Photo */}
          <div style={{ padding: "16px 20px 0" }}>
            <img
              src={asset("sant.webp")}
              fetchPriority="high"
              alt="Santhosh James"
              style={{
                width: "100%",
                borderRadius: 14,
                display: "block",
                aspectRatio: "3/4",
                objectFit: "cover",
                border: "1px solid rgb(var(--cyan-rgb) / 0.15)",
              }}
            />
          </div>

          {/* Info panel */}
          <div style={{ padding: "18px 20px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["NAME", "Santhosh James C"],
                ["ROLE", "Software Developer"],
                ["LOC", "Kerala, India"],
                ["STATUS", "Open to Work"],
              ].map(([lbl, val], i) => (
                <div key={i} style={{
                  background: "rgb(var(--cyan-rgb) / 0.04)",
                  border: "1px solid rgb(var(--cyan-rgb) / 0.1)",
                  borderRadius: 10, padding: "10px 12px",
                }}>
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 12, color: "var(--cyan)", letterSpacing: 1.5, marginBottom: 4,
                  }}>
                    {lbl}
                  </div>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 15, color: "var(--text-primary)", fontWeight: 600,
                  }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}