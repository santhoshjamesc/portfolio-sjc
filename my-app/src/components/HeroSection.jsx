// components/HeroSection.jsx
import { useEffect, useRef, useState } from "react"
import { useInView } from "../hooks/useInView"
import { resumelink } from "../data/data"

function getDriveDownloadLink(viewLink) {
  const match = viewLink.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (!match) return null
  const fileId = match[1]
  console.log(fileId)
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
        background: "#38bdf8", marginLeft: 3,
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

  const getProximityStyle = () => {
    if (!ref.current) return {}
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dist = Math.hypot(mousePos.x - cx, mousePos.y - cy)
    const t = Math.max(0, 1 - dist / RADIUS)

    if (t < 0.05) return {}

    return {
      background: "linear-gradient(90deg, #38bdf8, #2dd4bf)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      transform: `scale(${1 + t * 0.1})`,
      textShadow: `0 0 ${Math.round(t * 18)}px rgba(56,189,248,${(t * 0.6).toFixed(2)})`,
    }
  }

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        color: "#e2e8f0",
        transition: "transform 0.12s, text-shadow 0.12s",
        ...getProximityStyle(),
      }}
    >
      {ch === " " ? "\u00a0" : ch}
    </span>
  )
}

// --- Name rendered as individual chars ---
function CharText({ text, mousePos, style }) {
  return (
    <h1 style={{ ...style, display: "block" }}>
      {[...text].map((ch, i) => (
        <CharSpan key={i} ch={ch} mousePos={mousePos} />
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

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -9999, y: -9999 })
  }

  const reveal = (inView, delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  const nameBaseStyle = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "clamp(38px, 6vw, 72px)",
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: 2,
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
      <div>
        <div ref={ref1} style={reveal(in1, 0)}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px",
            border: "1px solid rgba(56,189,248,0.25)",
            borderRadius: 20,
            marginBottom: 28,
            background: "rgba(56,189,248,0.05)",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#2dd4bf",
              boxShadow: "0 0 8px #2dd4bf",
              animation: "pulse 2s infinite",
            }} />
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 9, color: "#2dd4bf", letterSpacing: 3,
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
            fontSize: 13, color: "#38bdf8", letterSpacing: 2,
            marginBottom: 16,
          }}>
            <TypeWriter text="Software Developer · Creative Technologist" />
          </p>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 16, color: "#94a3b8", lineHeight: 1.8,
            maxWidth: 440,
          }}>
            Building elegant software solutions at the intersection of AI, web technology, and human creativity. Seeking new frontiers.
          </p>
        </div>

        <div ref={ref4} style={{ ...reveal(in4, 360), display: "flex", gap: 14, flexWrap: "wrap" }}>
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
        <div ref={ref5} style={{ ...reveal(in5, 480), display: "flex", gap: 36, marginTop: 48 }}>
          {[["5+", "PROJECTS"], ["4+", "CERTS"], ["3+", "ROLES"]].map(([num, lbl], i) => (
            <div key={i}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 28, fontWeight: 900, color: "#e2e8f0", lineHeight: 1,
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 8, color: "#475569", letterSpacing: 3, marginTop: 6,
              }}>
                {lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — profile card */}
      <HeroCard />

      <style>{`
        @keyframes pulse {
          0%,100%{box-shadow:0 0 8px #2dd4bf}
          50%{box-shadow:0 0 18px #2dd4bf}
        }
        @media(max-width:768px){
          section#about {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 200ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
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
          maxWidth: 400, margin: "0 auto",
        }}
      >
        {/* Outer orbit rings */}
        <div style={{ position: "absolute", inset: -30, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: -60, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.04)", pointerEvents: "none" }} />

        <div style={{
          background: "rgba(8,14,30,0.9)",
          border: "1px solid rgba(56,189,248,0.2)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(56,189,248,0.12), 0 32px 80px rgba(0,0,0,0.8)",
          position: "relative",
        }}>
          {/* Gradient scan line effect */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(56,189,248,0.04) 0%, transparent 30%, transparent 70%, rgba(45,212,191,0.03) 100%)",
          }} />

          {/* Cyan top bar */}
          <div style={{
            height: 3,
            background: "linear-gradient(90deg, #38bdf8, #2dd4bf, #818cf8)",
          }} />

          {/* Header with coordinates */}
          <div style={{
            padding: "14px 20px 0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 8, color: "#38bdf8", letterSpacing: 2, opacity: 0.7,
            }}>
              SUBJECT_ID:SJC_001
            </span>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#2dd4bf",
              boxShadow: "0 0 10px #2dd4bf",
              animation: "pulse 2s infinite",
            }} />
          </div>

          {/* Photo */}
          <div style={{ padding: "16px 20px 0" }}>
            <img
              src="sant.jpg"
              alt="Santhosh James"
              style={{
                width: "100%",
                borderRadius: 14,
                display: "block",
                aspectRatio: "3/4",
                objectFit: "cover",
                border: "1px solid rgba(56,189,248,0.15)",
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
                  background: "rgba(56,189,248,0.04)",
                  border: "1px solid rgba(56,189,248,0.1)",
                  borderRadius: 10, padding: "10px 12px",
                }}>
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 7, color: "#38bdf8", letterSpacing: 2, marginBottom: 4,
                  }}>
                    {lbl}
                  </div>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 13, color: "#e2e8f0", fontWeight: 600,
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