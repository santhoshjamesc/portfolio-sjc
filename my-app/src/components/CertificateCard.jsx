// components/CertificateCard.jsx
import { useState } from "react"

export function CertificateCard({ title, image }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(12,20,42,0.97)" : "rgba(8,14,30,0.85)",
        border: hov ? "1px solid rgba(56,189,248,0.4)" : "1px solid rgba(56,189,248,0.1)",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hov
          ? "0 0 28px rgba(56,189,248,0.15), 0 12px 36px rgba(0,0,0,0.7)"
          : "0 4px 16px rgba(0,0,0,0.4)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "perspective(900px) translateY(-6px) scale(1.04)" : "perspective(900px)",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {/* Top bar */}
      <div style={{
        height: 2,
        background: hov
          ? "linear-gradient(90deg,#38bdf8,#2dd4bf)"
          : "linear-gradient(90deg,rgba(56,189,248,0.2),rgba(45,212,191,0.2))",
        transition: "all 0.35s",
      }} />

      {/* Image area */}
      <div style={{
        height: 120, overflow: "hidden",
        background: "rgba(4,6,15,0.8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: "80%", maxHeight: "80%",
            objectFit: "contain",
            opacity: hov ? 1 : 0.5,
            transform: hov ? "scale(1.1)" : "scale(1)",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            filter: hov ? "drop-shadow(0 0 12px rgba(56,189,248,0.4))" : "none",
          }}
        />
        {/* Radial glow behind image */}
        {hov && (
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at center, rgba(56,189,248,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* Title bar */}
      <div style={{
        padding: "12px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid rgba(56,189,248,0.08)",
      }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 9, fontWeight: 700, letterSpacing: 2,
          color: hov ? "#38bdf8" : "#475569",
          textTransform: "uppercase",
          transition: "color 0.3s",
        }}>
          {title}
        </span>
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: hov ? "#2dd4bf" : "#1e293b",
          boxShadow: hov ? "0 0 8px #2dd4bf" : "none",
          transition: "all 0.35s",
        }} />
      </div>
    </div>
  )
}