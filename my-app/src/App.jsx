import { useState, useRef, useEffect } from "react"
import './App.css'
import { Navbar } from "./components/Navbar"
import ShootingStarCursor from "./components/ui/ShootingStarCursor"
import { ProjectCard } from "./components/ProjectCard"
import { OpenSourceCard } from "./components/OpenSourceCard"
import { CertificateCard } from "./components/CertificateCard"
import { ExperienceCard } from "./components/ExperienceCard"
import { ExperienceTree } from "./components/ExperienceTree"
import { ServiceCard } from "./components/ServiceCard"
import { EducationCard } from "./components/EducationCard"
import { HeroSection } from "./components/HeroSection"
import { ContactSection } from "./components/ContactSection"
import { TechIcon } from "./components/TechIcon"
import { Toasts } from "./components/Toasts"
import { EDU_NOTES, EXP_NOTES, VOL_NOTES } from "./data/notes"
import { notify } from "./utils/notify"
import { isSoundOn, setSoundOn } from "./utils/sound"
import { HScroll } from "./components/HScroll"
import Reveal from "./components/Reveal"
import { useTheme } from "./hooks/useTheme"

import {
  NAV_LINKS,
  SKILLS,
  SERVICES,
  PROJECTS,
  OPEN_SOURCE,
  OPEN_SOURCE_PROFILES,
  CERTIFICATES,
  EXPERIENCE,
  VOLUNTEERING,
  EDUCATION,
  FOOTER,
} from "./data/data"

// ── Section heading ──────────────────────────────────────────
function SectionHeading({ label }) {
  return (
    <Reveal
      variant="flipY"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(10px, 3vw, 18px)",
        marginBottom: "clamp(28px, 5vw, 48px)",
        flexWrap: "wrap",
      }}
    >
      <h2 className="section-title">{label}</h2>
      <div className="section-line" />
    </Reveal>
  )
}

// ── Animated count-up ────────────────────────────────────────
function CountUp({ target, duration = 1200 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
      if (!entry.isIntersecting) {
        started.current = false
        setCount(0)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, reduced])

  return <span ref={ref}>{String(reduced ? target : count).padStart(2, "0")}</span>
}

const TECH_LIST = [...new Set(SKILLS.filter(s => s.title !== "Soft Skills").flatMap(s => s.points))]

// ── Boot loader (0–100%) ─────────────────────────────────────
function Loader() {
  const skip = (() => {
    try { return sessionStorage.getItem("booted") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches } catch { return false }
  })()
  const [pct, setPct] = useState(skip ? 100 : 0)
  const [gone, setGone] = useState(skip)
  useEffect(() => {
    if (skip) return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / 1300, 1)
      setPct(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => { setGone(true); try { sessionStorage.setItem("booted", "1") } catch { /* ignore */ } }, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [skip])
  if (gone) return null
  return (
    <div className={`loader${pct === 100 ? " loader--done" : ""}`} role="status" aria-label="Loading">
      <span className="loader__cmd">➜ ~/sjc <em>booting portfolio_</em></span>
      <span className="loader__pct">{String(pct).padStart(3, "0")}%</span>
      <div className="loader__bar"><div style={{ width: `${pct}%` }} /></div>
    </div>
  )
}

// ── App ──────────────────────────────────────────────────────
function App() {
  const [allProjects, setAllProjects] = useState(false)
  const [theme, rawToggleTheme] = useTheme()
  const toggleTheme = () => {
    rawToggleTheme()
    notify({ kind: "system", icon: theme === "dark" ? "☀️" : "🌙", body: theme === "dark" ? "Switched to light mode. Easier on the eyes in daylight!" : "Back to dark mode. Much better for late-night scrolling." })
  }
  const [cursorFx, setCursorFx] = useState(() => {
    try { return localStorage.getItem("cursorFx") === "on" } catch { return false }
  })
  const [sound, setSound] = useState(isSoundOn)
  const toggleSound = () => {
    const n = !sound
    setSoundOn(n)
    setSound(n)
    notify({ kind: "system", icon: n ? "🔊" : "🔇", body: n ? "Sound is on. You'll hear a little chime." : "Sound is off. Quiet mode." })
  }
  const toggleCursorFx = () => {
    const n = !cursorFx
    setCursorFx(n)
    try { localStorage.setItem("cursorFx", n ? "on" : "off") } catch { /* ignore */ }
    notify({ kind: "system", icon: "✨", body: n ? "Cursor trail is on. Try moving your mouse around!" : "Cursor trail is off. Back to the normal cursor." })
  }
  const [stars] = useState(() => Array.from({ length: 70 }, () => ({
    left:              `${Math.random() * 100}%`,
    top:               `${Math.random() * 100}%`,
    width:             `${Math.random() * 2.5 + 0.5}px`,
    height:            `${Math.random() * 2.5 + 0.5}px`,
    animationDuration: `${Math.random() * 4 + 2}s`,
    animationDelay:    `${Math.random() * 4}s`,
  })))

  return (
    <>
      <Loader />
      <Toasts />
      <div className="scroll-progress" aria-hidden="true" />
      <a href="#main" className="skip-link">Skip to content</a>
      <ShootingStarCursor enabled={cursorFx} theme={theme} />

      <div className="starfield" aria-hidden="true">
        {stars.map((style, i) => <div key={i} className="star" style={style} />)}
      </div>

      <div className="nebula nebula-1" aria-hidden="true" />
      <div className="nebula nebula-2" aria-hidden="true" />
      <div className="nebula nebula-3" aria-hidden="true" />

      <Navbar links={NAV_LINKS} theme={theme} onToggleTheme={toggleTheme} cursorFx={cursorFx} onToggleCursorFx={toggleCursorFx} />

      <main id="main" tabIndex={-1} className="main-container">

        <HeroSection />

        {/* ── Skills (01) ──────────────────────────────────── */}
        <section id="skills" className="section">
          {[false, true].map(rev => (
            <div key={rev} className={`ticker${rev ? " ticker--rev" : ""}`} aria-hidden="true">
              <div className="ticker__track">
                {[0, 1].map(k => (rev ? [...TECH_LIST].reverse() : TECH_LIST).map(t => (
                  <span key={`${k}-${t}`} className="ticker__item"><TechIcon name={t} size={30} />{t}</span>
                )))}
              </div>
            </div>
          ))}
        </section>

        {/* ── Projects (03) ────────────────────────────────── */}
        <section id="projects" className="section">
          <SectionHeading label="PROJECTS" />

          <Reveal delay={100} variant="fadeLeft">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 28 }}>
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize:   "clamp(24px, 5vw, 36px)",
                fontWeight: 900,
                color:      "var(--cyan)",
                lineHeight: 1,
                textShadow: "0 0 24px rgb(var(--cyan-rgb) / 0.4)",
              }}>
                <CountUp target={PROJECTS.length} duration={900} />
              </span>
              <span style={{
                fontFamily:    "'Rajdhani', sans-serif",
                fontSize:      "clamp(13px, 1.5vw, 15px)",
                letterSpacing: 2,
                color:         "var(--text-dim)",
                textTransform: "uppercase",
              }}>
                projects
              </span>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PROJECTS.slice(0, allProjects ? PROJECTS.length : 4).map((p, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"}
              >
                <div data-kind="project" data-label={p.title}>
                  <ProjectCard
                    {...p}
                    index={i}
                    total={PROJECTS.length}
                  />
                </div>
              </Reveal>
            ))}
          </div>
          {PROJECTS.length > 4 && (
            <button type="button" className="more-btn" aria-expanded={allProjects} onClick={() => { setAllProjects(v => !v); notify({ kind: "system", icon: "📂", body: allProjects ? "Showing just the top projects." : `Here are all ${PROJECTS.length} projects. Take your time!` }) }}>
              {allProjects ? "↑ SHOW FEWER" : `↓ SHOW ALL ${PROJECTS.length} PROJECTS`}
            </button>
          )}
        </section>

        {/* ── Open Source (04) ─────────────────────────────── */}
        <section id="open-source" className="section">
          <SectionHeading label="OPEN SOURCE CONTRIBUTIONS" />
          {[
            ["npm", "NPM PACKAGES", "NPM packages"],
            ["vscode", "VS CODE EXTENSIONS", "VS Code extensions"],
          ].map(([kind, title, label]) => (
            <div key={kind} className="os-group">
              <h3 className="os-group__title">{title}</h3>
              <Reveal variant="fadeUp">
                <HScroll cardWidth={340} label={label}>
                  {OPEN_SOURCE.filter(o => o.kind === kind).map(o => (
                    <div className="hscroll__item" key={o.name} data-kind="oss" data-label={o.name}><OpenSourceCard {...o} /></div>
                  ))}
                </HScroll>
              </Reveal>
            </div>
          ))}
          <Reveal delay={200} variant="fadeUp">
            <div className="os-profiles">
              {OPEN_SOURCE_PROFILES.map(p => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="os-card__link">
                  ↗ {p.label.toUpperCase()}
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Certificates (05) ────────────────────────────── */}
        <section id="certificates" className="section">
          <SectionHeading label="CERTIFICATES" />
          <Reveal variant="fadeUp">
            <HScroll cardWidth={230} label="Certificates">
              {CERTIFICATES.map((c, i) => (
                <div className="hscroll__item" key={i} data-kind="cert" data-label={c.title}><CertificateCard title={c.title} image={c.image} /></div>
              ))}
            </HScroll>
          </Reveal>
        </section>

        {/* ── Experience (06) ──────────────────────────────── */}
        <section id="experience" className="section">
          <SectionHeading label="EXPERIENCE" />
          <ExperienceTree items={EXPERIENCE} notes={EXP_NOTES} />
        </section>

        {/* ── Volunteering (07) ────────────────────────────── */}
        <section id="volunteering" className="section">
          <SectionHeading label="VOLUNTEERING" />
          <Reveal variant="fadeUp">
            <HScroll cardWidth={300} label="Volunteering">
              {VOLUNTEERING.map((e, i) => <div className="hscroll__item" key={i} data-kind="vol" data-label={e.role + " · " + e.org} data-note={VOL_NOTES[e.org]}><ExperienceCard {...e} /></div>)}
            </HScroll>
          </Reveal>
        </section>

        {/* ── Education (08) ───────────────────────────────── */}
        <section id="education" className="section">
          <SectionHeading label="EDUCATION" />
          <Reveal variant="fadeUp">
            <div className="grid-auto-md">
              {EDUCATION.map((e, i) => <div key={i} data-kind="edu" data-label={e.degree} data-note={EDU_NOTES[e.degree]}><EducationCard {...e} /></div>)}
            </div>
          </Reveal>
        </section>

        {/* ── Services ────────────────────────────────── */}
        <section id="services" className="section">
          <SectionHeading label="SERVICES" />
          <Reveal variant="fadeUp">
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <div key={i} data-kind="service" data-label={s.title}><ServiceCard {...s} /></div>
              ))}
            </div>
          </Reveal>
        </section>

        <ContactSection />

      </main>

      <footer className="footer">
        <span>{FOOTER.name}</span>
        <span className="footer-dot" aria-hidden="true">◈</span>
        <span>{FOOTER.detail}</span>
        <a href="#main" className="footer-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>↑ BACK TO TOP</a>
        <button type="button" className="footer-link" aria-pressed={sound} onClick={toggleSound}>
          SOUND: {sound ? "ON" : "OFF"}
        </button>
        <button type="button" className="footer-link" aria-pressed={cursorFx} onClick={toggleCursorFx}>
          CURSOR TRAIL: {cursorFx ? "ON" : "OFF"}
        </button>
        <span className="footer-copy">© {new Date().getFullYear()} {FOOTER.name}</span>
      </footer>
    </>
  )
}

export default App