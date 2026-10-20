import { useState } from "react"

export function SmallHoverCard({ title, points = [] }) {
  const [hov, setHov] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setPos({ x, y })
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setHov(false)
        setPos({ x: 0, y: 0 })
      }}
      onMouseMove={handleMove}
      style={{
        background: "rgb(var(--surface-rgb) / 0.9)",
        border: hov
          ? "1px solid rgb(var(--cyan-rgb) / 0.5)"
          : "1px solid rgb(var(--cyan-rgb) / 0.08)",
        borderRadius: 18,
        padding: "22px 20px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",

        transform: `
          perspective(900px)
          rotateX(${pos.y * -8}deg)
          rotateY(${pos.x * 10}deg)
          scale(${hov ? 1.03 : 1})
        `,

        boxShadow: hov
          ? "0 0 40px rgb(var(--cyan-rgb) / 0.18), 0 20px 60px rgb(var(--shadow-rgb) / calc(0.8 * var(--shadow-k)))"
          : "0 6px 24px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))",

        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Animated glow background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hov
            ? "radial-gradient(circle at 50% 0%, rgb(var(--cyan-rgb) / 0.25), transparent 60%)"
            : "transparent",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />

      {/* Top animated line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: hov ? "0%" : "-100%",
          width: "100%",
          height: 2,
          background: "linear-gradient(90deg, var(--cyan), var(--teal))",
          transition: "left 0.5s ease",
        }}
      />

      {/* Corner pulse */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--teal)",
          opacity: hov ? 1 : 0.3,
          boxShadow: hov ? "0 0 10px var(--teal)" : "none",
          transition: "all 0.3s",
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 2,
          color: hov ? "var(--cyan)" : "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: 16,
          transition: "color 0.3s",
        }}
      >
        {title}
      </h3>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, rgb(var(--cyan-rgb) / 0.5), transparent)",
          marginBottom: 14,
          opacity: hov ? 1 : 0.3,
          transition: "opacity 0.3s",
        }}
      />

      {/* Points */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {points.map((p, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text-soft)",

              opacity: hov ? 1 : 0.6,
              transform: hov
                ? "translateX(0px)"
                : "translateX(-6px)",

              transition: `all 0.3s ease ${i * 60}ms`,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--cyan)",
                boxShadow: hov
                  ? "0 0 8px rgb(var(--cyan-rgb) / 0.8)"
                  : "none",
                transition: "all 0.3s",
              }}
            />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}