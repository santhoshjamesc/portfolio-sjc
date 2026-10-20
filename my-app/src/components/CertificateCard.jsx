import { asset } from "../utils/asset";
// components/CertificateCard.jsx
import { useState } from "react"

export function CertificateCard({ title, image }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgb(var(--surface-rgb) / 0.97)" : "rgb(var(--surface-rgb) / 0.85)",
        border: hov ? "1px solid rgb(var(--cyan-rgb) / 0.4)" : "1px solid rgb(var(--cyan-rgb) / 0.1)",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hov
          ? "0 0 28px rgb(var(--cyan-rgb) / 0.15), 0 12px 36px rgb(var(--shadow-rgb) / calc(0.7 * var(--shadow-k)))"
          : "0 4px 16px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))",
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
          ? "linear-gradient(90deg,var(--cyan),var(--teal))"
          : "linear-gradient(90deg,rgb(var(--cyan-rgb) / 0.2),rgb(var(--teal-rgb) / 0.2))",
        transition: "all 0.35s",
      }} />

      {/* Image area */}
      <div style={{
        height: 120, overflow: "hidden",
        background: "rgb(var(--bg-rgb) / 0.8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <img
          src={asset(image)}
          decoding="async"
          loading="lazy"
          alt={`${title} certificate`}
          style={{
            maxWidth: "80%", maxHeight: "80%",
            objectFit: "contain",
            opacity: hov ? 1 : 0.5,
            transform: hov ? "scale(1.1)" : "scale(1)",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            filter: hov ? "drop-shadow(0 0 12px rgb(var(--cyan-rgb) / 0.4))" : "none",
          }}
        />
        {/* Radial glow behind image */}
        {hov && (
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at center, rgb(var(--cyan-rgb) / 0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* Title bar */}
      <div style={{
        padding: "12px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid rgb(var(--cyan-rgb) / 0.08)",
      }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
          color: hov ? "var(--cyan)" : "var(--text-dim)",
          textTransform: "uppercase",
          transition: "color 0.3s",
        }}>
          {title}
        </span>
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: hov ? "var(--teal)" : "var(--skel-b)",
          boxShadow: hov ? "0 0 8px var(--teal)" : "none",
          transition: "all 0.35s",
        }} />
      </div>
    </div>
  )
}