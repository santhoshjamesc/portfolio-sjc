import { useState, useRef, useEffect } from "react"
import './App.css'
import { Navbar } from "./components/Navbar"
import ShootingStarCursor from "./components/ui/ShootingStarCursor"
import { SmallHoverCard } from "./components/SmallHoverCard"
import { ProjectCard } from "./components/ProjectCard"
import { CertificateCard } from "./components/CertificateCard"
import { ExperienceCard } from "./components/ExperienceCard"
import { ExperienceTimelineCard } from "./components/ExperienceTimelineCard"
import { ServiceCard } from "./components/ServiceCard"
import { EducationCard } from "./components/EducationCard"
import { HeroSection } from "./components/HeroSection"
import { ContactSection } from "./components/ContactSection"
import Reveal from "./components/Reveal"

import {
  NAV_LINKS,
  SKILLS,
  SERVICES,
  PROJECTS,
  CERTIFICATES,
  EXPERIENCE,
  VOLUNTEERING,
  EDUCATION,
  FOOTER,
} from "./data/data"

// ── Section heading ──────────────────────────────────────────
function SectionHeading({ label, number }) {
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
      <span className="section-number">{number}</span>
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

  useEffect(() => {
    const el = ref.current
    if (!el) return
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
  }, [target, duration])

  return <span ref={ref}>{String(count).padStart(2, "0")}</span>
}

// ── App ──────────────────────────────────────────────────────
function App() {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <>
      <ShootingStarCursor />

      <div className="starfield" aria-hidden="true">
        {Array.from({ length: 120 }).map((_, i) => (
          <div key={i} className="star" style={{
            left:              `${Math.random() * 100}%`,
            top:               `${Math.random() * 100}%`,
            width:             `${Math.random() * 2.5 + 0.5}px`,
            height:            `${Math.random() * 2.5 + 0.5}px`,
            animationDuration: `${Math.random() * 4 + 2}s`,
            animationDelay:    `${Math.random() * 4}s`,
          }} />
        ))}
      </div>

      <div className="nebula nebula-1" aria-hidden="true" />
      <div className="nebula nebula-2" aria-hidden="true" />
      <div className="nebula nebula-3" aria-hidden="true" />

      <Navbar links={NAV_LINKS} />

      <main className="main-container">

        <HeroSection />

        {/* ── Skills (01) ──────────────────────────────────── */}
        <section id="skills" className="section">
          <SectionHeading label="SKILLS" number="01" />
          <div className="grid-auto-sm">
            {SKILLS.map((s, i) => (
              <Reveal key={i} delay={i * 80} variant="zoomSpin">
                <SmallHoverCard title={s.title} points={s.points} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Services (02) ────────────────────────────────── */}
        <section id="services" className="section">
          <SectionHeading label="SERVICES" number="02" />
          <div className="grid-auto-sm">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 90} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"}>
                <ServiceCard title={s.title} description={s.description} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Projects (03) ────────────────────────────────── */}
        <section id="projects" className="section">
          <SectionHeading label="PROJECTS" number="03" />

          <Reveal delay={100} variant="fadeLeft">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 28 }}>
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize:   "clamp(24px, 5vw, 36px)",
                fontWeight: 900,
                color:      "#38bdf8",
                lineHeight: 1,
                textShadow: "0 0 24px rgba(56,189,248,0.4)",
              }}>
                <CountUp target={PROJECTS.length} duration={900} />
              </span>
              <span style={{
                fontFamily:    "'Rajdhani', sans-serif",
                fontSize:      "clamp(11px, 1.5vw, 13px)",
                letterSpacing: 3,
                color:         "rgba(56,189,248,0.4)",
                textTransform: "uppercase",
              }}>
                projects
              </span>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PROJECTS.map((p, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"}
                style={{ gridColumn: hoveredProject === i ? "1 / -1" : "auto" }}
              >
                <ProjectCard
                  {...p}
                  index={i}
                  total={PROJECTS.length}
                  onHoverChange={(h) => setHoveredProject(h ? i : null)}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Certificates (04) ────────────────────────────── */}
        <section id="certificates" className="section">
          <SectionHeading label="CERTIFICATES" number="04" />
          <div className="grid-auto-cert">
            {CERTIFICATES.map((c, i) => (
              <Reveal key={i} delay={i * 100} variant="zoomSpin">
                <CertificateCard title={c.title} image={c.image} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Experience (05) ──────────────────────────────── */}
        <section id="experience" className="section">
          <SectionHeading label="EXPERIENCE" number="05" />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={i} delay={i * 110} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"}>
                <ExperienceTimelineCard {...e} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Volunteering (06) ────────────────────────────── */}
        <section id="volunteering" className="section">
          <SectionHeading label="VOLUNTEERING" number="06" />
          <div className="grid-auto-sm">
            {VOLUNTEERING.map((e, i) => (
              <Reveal key={i} delay={i * 80} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"}>
                <ExperienceCard {...e} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Education (07) ───────────────────────────────── */}
        <section id="education" className="section">
          <SectionHeading label="EDUCATION" number="07" />
          <div className="grid-auto-md">
            {EDUCATION.map((e, i) => (
              <Reveal key={i} delay={i * 130} variant="fadeUp">
                <EducationCard {...e} />
              </Reveal>
            ))}
          </div>
        </section>

        <ContactSection />

      </main>

      <footer className="footer">
        <span>{FOOTER.name}</span>
        <span className="footer-dot">◈</span>
        <span>{FOOTER.detail}</span>
      </footer>
    </>
  )
}

export default App