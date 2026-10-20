// components/ExperienceCard.jsx
import { useState } from "react"

export function ExperienceCard({ role, org, duration, details }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgb(var(--surface-rgb) / 0.97)" : "rgb(var(--surface-rgb) / 0.85)",
        border: hov ? "1px solid rgb(var(--cyan-rgb) / 0.4)" : "1px solid rgb(var(--cyan-rgb) / 0.1)",
        borderRadius: 16,
        padding: "22px 20px",
        boxShadow: hov
          ? "0 0 28px rgb(var(--cyan-rgb) / 0.12), 0 12px 36px rgb(var(--shadow-rgb) / calc(0.7 * var(--shadow-k)))"
          : "0 4px 16px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "perspective(900px) translateY(-5px) scale(1.015)" : "perspective(900px)",
        transformStyle: "preserve-3d",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3,
        background: hov
          ? "linear-gradient(180deg,var(--cyan),var(--teal))"
          : "linear-gradient(180deg,rgb(var(--cyan-rgb) / 0.2),rgb(var(--teal-rgb) / 0.2))",
        borderRadius: "0 2px 2px 0",
        transition: "all 0.35s",
      }} />

      {/* Role */}
      <h3 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 12, fontWeight: 700, letterSpacing: 2,
        color: hov ? "var(--text-primary)" : "var(--text-muted)",
        textTransform: "uppercase",
        marginBottom: 10,
        transition: "color 0.3s",
        lineHeight: 1.4,
      }}>
        {role}
      </h3>

      {/* Org + duration row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 15, fontWeight: 600, color: "var(--cyan)",
        }}>
          {org}
        </span>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 12, color: "var(--teal)",
          border: "1px solid rgb(var(--teal-rgb) / 0.25)",
          padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5,
          whiteSpace: "nowrap",
        }}>
          {duration}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: hov
          ? "linear-gradient(90deg,rgb(var(--cyan-rgb) / 0.3),transparent)"
          : "linear-gradient(90deg,rgb(var(--cyan-rgb) / 0.08),transparent)",
        marginBottom: 14,
        transition: "all 0.35s",
      }} />

      {/* Details */}
      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6,
      }}>
        {details}
      </p>

      {/* Corner glow on hover */}
      {hov && (
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 80, height: 80, borderRadius: "50%",
          background: "radial-gradient(circle,rgb(var(--cyan-rgb) / 0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />
      )}
    </div>
  )
}