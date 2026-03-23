// components/Navbar.jsx
import { useState, useEffect } from "react"

export function Navbar({ links = [] }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = links.map(l => l.href.replace("#", ""))
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [links])

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled
        ? "rgba(4, 6, 15, 0.96)"
        : "rgba(4, 6, 15, 0.5)",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled
        ? "1px solid rgba(56,189,248,0.12)"
        : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        maxWidth: 1120, margin: "0 auto",
        padding: "0 24px",
        height: 64,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {/* Logo */}
        <a href="#about" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          {/* Mini orbit icon */}
          <div style={{ position: "relative", width: 28, height: 28 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              border: "1.5px solid rgba(56,189,248,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg,#38bdf8,#2dd4bf)" }} />
            </div>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 36, height: 16,
              marginLeft: -18, marginTop: -8,
              border: "1px solid rgba(56,189,248,0.2)",
              borderRadius: "50%",
              transform: "rotate(-30deg)",
            }} />
          </div>
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 14, fontWeight: 700, letterSpacing: 3,
            color: "#e2e8f0",
          }}>
            SJC<span style={{ color: "#38bdf8" }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desk-nav">
          {links.map((link, i) => {
            const isActive = active === link.href.replace("#", "")
            return (
              <a
                key={i}
                href={link.href}
                style={{
                  padding: "6px 14px",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 9, letterSpacing: 2,
                  textTransform: "uppercase",
                  color: isActive ? "#38bdf8" : "#94a3b8",
                  textDecoration: "none",
                  borderRadius: 8,
                  background: isActive ? "rgba(56,189,248,0.08)" : "transparent",
                  border: isActive ? "1px solid rgba(56,189,248,0.2)" : "1px solid transparent",
                  transition: "all 0.25s",
                  position: "relative",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#38bdf8"
                    e.currentTarget.style.background = "rgba(56,189,248,0.05)"
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#94a3b8"
                    e.currentTarget.style.background = "transparent"
                  }
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none", border: "1px solid rgba(56,189,248,0.25)",
            color: "#38bdf8", cursor: "pointer",
            width: 36, height: 36, borderRadius: 8,
            fontFamily: "'Orbitron', sans-serif", fontSize: 16,
            alignItems: "center", justifyContent: "center",
          }}
          className="mob-btn"
        >
          {open ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "rgba(4,6,15,0.98)",
          borderTop: "1px solid rgba(56,189,248,0.1)",
          padding: "16px 24px 24px",
          display: "flex", flexDirection: "column", gap: 4,
          animation: "fadeDown 0.3s ease",
        }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                padding: "12px 16px",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10, letterSpacing: 2, color: "#94a3b8",
                textDecoration: "none",
                borderBottom: "1px solid rgba(56,189,248,0.06)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .desk-nav { display: none !important; }
          .mob-btn  { display: flex !important; }
        }
        @keyframes fadeDown {
          from { opacity:0; transform: translateY(-8px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  )
}