import { useState, useEffect } from "react"

export function EducationCard({
  institute,
  degree,
  location,
  mapLink,
  batch,
  score,      // number (e.g. 8.5 or 85)
  type = "cgpa" // "cgpa" or "percentage"
}) {
  const [hov, setHov] = useState(false)
  const [progress, setProgress] = useState(0)

  const max = type === "cgpa" ? 10 : 100
  const percent = (score / max) * 100

  useEffect(() => {
    if (hov) {
      let i = 0
      const interval = setInterval(() => {
        i += 2
        if (i >= percent) {
          i = percent
          clearInterval(interval)
        }
        setProgress(i)
      }, 10)
      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [hov, percent])

  const radius = 36
  const stroke = 5
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset =
    circumference - (progress / 100) * circumference

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(12,20,42,0.97)" : "rgba(8,14,30,0.85)",
        border: hov
          ? "1px solid rgba(56,189,248,0.4)"
          : "1px solid rgba(56,189,248,0.1)",
        borderRadius: 18,
        padding: "24px",
        boxShadow: hov
          ? "0 0 40px rgba(56,189,248,0.15), 0 20px 60px rgba(0,0,0,0.8)"
          : "0 6px 24px rgba(0,0,0,0.4)",
        transform: hov
          ? "translateY(-6px) scale(1.02)"
          : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 2,
        background: hov
          ? "linear-gradient(90deg,#38bdf8,#2dd4bf,#818cf8)"
          : "linear-gradient(90deg,rgba(56,189,248,0.15),transparent)"
      }} />

      {/* Institute */}
      <h3 style={{
        fontSize: 12,
        letterSpacing: 1.5,
        color: hov ? "#e2e8f0" : "#94a3b8",
        marginBottom: 6,
      }}>
        {institute}
      </h3>

      {/* Degree */}
      <p style={{
        fontSize: 15,
        fontWeight: 600,
        color: "#38bdf8",
        marginBottom: 6,
      }}>
        {degree}
      </p>

      {/* Location with map */}
      <a
        href={mapLink}
        target="_blank"
        rel="noreferrer"
        style={{
          fontSize: 13,
          color: "#64748b",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: 16,
        }}
      >
        📍 {location}
      </a>

      {/* Divider */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg,rgba(56,189,248,0.2),transparent)",
        marginBottom: 18,
      }} />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {/* Batch */}
        <div>
          <div style={{ fontSize: 10, color: "#475569" }}>BATCH</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#cbd5e1" }}>
            {batch}
          </div>
        </div>

        {/* Circular Score */}
        <div style={{ position: "relative", width: 80, height: 80 }}>
          <svg height="80" width="80">
            {/* Background */}
            <circle
              stroke="rgba(71,85,105,0.3)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="40"
              cy="40"
            />

            {/* Progress */}
            <circle
              stroke="url(#grad)"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 0.4s ease",
              }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx="40"
              cy="40"
            />

            {/* Gradient */}
            <defs>
              <linearGradient id="grad">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>

          {/* Score Text */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            textAlign: "center"
          }}>
            <div style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#e2e8f0"
            }}>
              {score}
            </div>
            <div style={{
              fontSize: 9,
              color: "#64748b"
            }}>
              {type === "cgpa" ? "CGPA" : "%"}
            </div>
          </div>
        </div>
      </div>

      {/* Glow orb */}
      <div style={{
        position: "absolute",
        bottom: -30,
        right: -30,
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: hov
          ? "radial-gradient(circle, rgba(56,189,248,0.15), transparent)"
          : "transparent",
        transition: "all 0.4s"
      }} />
    </div>
  )
}