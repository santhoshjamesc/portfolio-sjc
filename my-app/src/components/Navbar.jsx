// components/Navbar.jsx
import { useState, useEffect, useRef } from "react"

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  )
}

export function Navbar({ links = [], theme = "dark", onToggleTheme, cursorFx = false, onToggleCursorFx }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const btnRef = useRef(null)
  const menuRef = useRef(null)

  // Mobile menu: focus first link on open, Escape closes, Tab is trapped
  useEffect(() => {
    if (!open) return
    const items = () => [btnRef.current, ...(menuRef.current?.querySelectorAll("a") ?? [])]
    menuRef.current?.querySelector("a")?.focus()
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); return }
      if (e.key !== "Tab") return
      const els = items().filter(Boolean)
      const first = els[0], last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = links.map(l => l.href.replace("#", ""))
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      // a section is "active" while it crosses a band around 40% down the viewport,
      // so tall sections highlight correctly regardless of how much is visible
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [links])

  return (
    <nav aria-label="Primary" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled
        ? "rgb(var(--bg-rgb) / 0.96)"
        : "rgb(var(--bg-rgb) / 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled
        ? "1px solid rgb(var(--cyan-rgb) / 0.12)"
        : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        maxWidth: 1120, margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 24px)",
        height: 64,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {/* Logo */}
        <a
          href="#main"
          aria-label="Santhosh James, back to top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
        >
          {/* Mini orbit icon */}
          <div style={{ position: "relative", width: 28, height: 28 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              border: "1.5px solid rgb(var(--cyan-rgb) / 0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg,var(--cyan),var(--teal))" }} />
            </div>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 36, height: 16,
              marginLeft: -18, marginTop: -8,
              border: "1px solid rgb(var(--cyan-rgb) / 0.2)",
              borderRadius: "50%",
              transform: "rotate(-30deg)",
            }} />
          </div>
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 14, fontWeight: 700, letterSpacing: 3,
            color: "var(--text-primary)",
          }}>
            SJC<span style={{ color: "var(--cyan)" }}>.</span>
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
                aria-current={isActive ? "page" : undefined}
                style={{
                  padding: "10px 14px",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 12, letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: isActive ? "var(--cyan)" : "var(--text-muted)",
                  textDecoration: "none",
                  borderRadius: 8,
                  background: isActive ? "rgb(var(--cyan-rgb) / 0.16)" : "transparent",
                  border: isActive ? "1px solid rgb(var(--cyan-rgb) / 0.5)" : "1px solid transparent",
                  fontWeight: isActive ? 700 : 400,
                  boxShadow: isActive ? "0 0 12px rgb(var(--cyan-rgb) / 0.2)" : "none",
                  transition: "all 0.25s",
                  position: "relative",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--cyan)"
                    e.currentTarget.style.background = "rgb(var(--cyan-rgb) / 0.05)"
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text-muted)"
                    e.currentTarget.style.background = "transparent"
                  }
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onToggleCursorFx && (
          <button
            type="button"
            className="theme-toggle cursor-toggle"
            onClick={onToggleCursorFx}
            aria-pressed={cursorFx}
            aria-label="Cursor trail effect"
            title={cursorFx ? "Cursor trail: on" : "Cursor trail: off"}
            style={{ opacity: cursorFx ? 1 : 0.6 }}
          >
            <SparkIcon />
          </button>
        )}
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Mobile toggle */}
        <button
          ref={btnRef}
          type="button"
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none", border: "1px solid rgb(var(--cyan-rgb) / 0.25)",
            color: "var(--cyan)", cursor: "pointer",
            minWidth: 44, height: 44, padding: "0 12px", borderRadius: 8, gap: 8,
            fontFamily: "'Orbitron', sans-serif", fontSize: 12, letterSpacing: 1.5,
            alignItems: "center", justifyContent: "center",
          }}
          className="mob-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span aria-hidden="true" style={{ fontSize: 16 }}>{open ? "✕" : "☰"}</span>
          <span>{open ? "CLOSE" : "MENU"}</span>
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" ref={menuRef} style={{
          background: "rgb(var(--bg-rgb) / 0.98)",
          borderTop: "1px solid rgb(var(--cyan-rgb) / 0.1)",
          padding: "16px clamp(16px, 4vw, 24px) 24px",
          display: "flex", flexDirection: "column", gap: 4,
          animation: "fadeDown 0.3s ease",
        }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active === link.href.replace("#", "") ? "page" : undefined}
              style={{
                padding: "14px 16px", minHeight: 44,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 13, letterSpacing: 2,
                color: active === link.href.replace("#", "") ? "var(--cyan)" : "var(--text-soft)",
                textDecoration: "none",
                borderBottom: "1px solid rgb(var(--cyan-rgb) / 0.06)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}