// components/ExperienceCard.jsx
import { useState } from "react"

export function ExperienceCard({ role, org, duration, details }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(12,20,42,0.97)" : "rgba(8,14,30,0.85)",
        border: hov ? "1px solid rgba(56,189,248,0.4)" : "1px solid rgba(56,189,248,0.1)",
        borderRadius: 16,
        padding: "22px 20px",
        boxShadow: hov
          ? "0 0 28px rgba(56,189,248,0.12), 0 12px 36px rgba(0,0,0,0.7)"
          : "0 4px 16px rgba(0,0,0,0.4)",
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
          ? "linear-gradient(180deg,#38bdf8,#2dd4bf)"
          : "linear-gradient(180deg,rgba(56,189,248,0.2),rgba(45,212,191,0.2))",
        borderRadius: "0 2px 2px 0",
        transition: "all 0.35s",
      }} />

      {/* Role */}
      <h3 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 11, fontWeight: 700, letterSpacing: 2,
        color: hov ? "#e2e8f0" : "#94a3b8",
        textTransform: "uppercase",
        marginBottom: 10,
        transition: "color 0.3s",
        lineHeight: 1.4,
      }}>
        {role}
      </h3>

      {/* Org + duration row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 14, fontWeight: 600, color: "#38bdf8",
        }}>
          {org}
        </span>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 8, color: "#2dd4bf",
          border: "1px solid rgba(45,212,191,0.25)",
          padding: "3px 10px", borderRadius: 20, letterSpacing: 1,
          whiteSpace: "nowrap",
        }}>
          {duration}
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: hov
          ? "linear-gradient(90deg,rgba(56,189,248,0.3),transparent)"
          : "linear-gradient(90deg,rgba(56,189,248,0.08),transparent)",
        marginBottom: 14,
        transition: "all 0.35s",
      }} />

      {/* Details */}
      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: 14, color: "#475569", lineHeight: 1.6,
      }}>
        {details}
      </p>

      {/* Corner glow on hover */}
      {hov && (
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 80, height: 80, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />
      )}
    </div>
  )
}