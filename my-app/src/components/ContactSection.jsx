import { useState, useRef } from "react"
import { useInView } from "../hooks/useInView"
import { CONTACTS } from "../data/data"

/* ---------- Reveal ---------- */
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ---------- Contact Link ---------- */
function ContactLink({
  icon,
  label,
  value,
  href,
  type,
  delay,
  onClick,
  active,
  setHovered,
}) {
  const [hov, setHov] = useState(false)

  return (
    <Reveal delay={delay}>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault()
          onClick({ icon, label, value, href, type })
        }}
        onMouseEnter={() => {
          setHov(true)
          setHovered(label)
        }}
        onMouseLeave={() => {
          setHov(false)
          setHovered(null)
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 20px",
          borderRadius: 14,
          cursor: "pointer",

          background: active
            ? "rgba(56,189,248,0.15)"
            : hov
            ? "rgba(12,20,42,0.97)"
            : "rgba(8,14,30,0.85)",

          border: active
            ? "1px solid #38bdf8"
            : "1px solid rgba(56,189,248,0.1)",

          transform: hov
            ? "perspective(900px) rotateX(8deg) rotateY(-8deg) scale(1.05)"
            : "perspective(900px)",

          boxShadow: hov
            ? "0 30px 60px rgba(0,0,0,0.7), 0 0 30px rgba(56,189,248,0.25)"
            : "0 4px 16px rgba(0,0,0,0.3)",

          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(56,189,248,0.1)",
        }}>
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "#475569" }}>{label}</div>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: active ? "#38bdf8" : "#94a3b8",
          }}>
            {value}
          </div>
        </div>

        <span style={{ color: "#38bdf8" }}>↗</span>
      </a>
    </Reveal>
  )
}

/* ---------- MAIN ---------- */
export function ContactSection() {
  const [cardRef] = useInView()
  const card3DRef = useRef()
  const [activeContact, setActiveContact] = useState(CONTACTS[0])
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(null)

  /* ---------- LAZY PREVIEW ---------- */
  const handleClick = async (data) => {
    console.log("wrking")
    setActiveContact(data)
    setPreview(null)
    console.log(data)
    if (data.type !== "link") return

    setLoading(true)

    const delay = new Promise((res) => setTimeout(res, 600))

    try {
      const fetchData = fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(data.href)}`
      ).then((r) => r.json())

      const [json] = await Promise.all([fetchData, delay])

      setPreview({
        title: json.data?.title || data.label,
        description:
          json.data?.description || "No preview available.",
        image: json.data?.image?.url ||json.data?.logo?.url || null,
      })
    } catch {
      setPreview({
        title: data.label,
        description: "Preview failed to load.",
        image: null,
      })
    }

    setLoading(false)
  }

  /* ---------- 3D ---------- */
  const handleMouseMove = (e) => {
    const rect = card3DRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateY = ((x / rect.width) - 0.5) * 20
    const rotateX = ((y / rect.height) - 0.5) * -20

    card3DRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const resetTilt = () => {
    card3DRef.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)"
  }

  return (
    <section id="contact">
      <h2>CONTACT</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: 40,
      }}>
        {/* LEFT */}
        <div ref={cardRef}>
          <div
            ref={card3DRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{
              background: "#0b1220",
              borderRadius: 20,
              padding: 20,
              boxShadow: hovered
                ? "0 0 60px rgba(56,189,248,0.35)"
                : "0 20px 60px rgba(0,0,0,0.7)",
            }}
          >
            <div
              key={activeContact.label}
              style={{ animation: "fadeSlide 0.5s ease" }}
            >
              <h3 style={{ color: "#38bdf8" }}>
                {activeContact.label}
              </h3>

              <p>{activeContact.value}</p>

              {/* 🔥 BUTTON */}
              <a
                href={activeContact.href}
                target="_blank"
                rel="noreferrer"
                className="visit-btn"
              >
                Open ↗
              </a>

              {/* PHONE */}
              {activeContact.type === "phone" && (
                <img src="san.png" className="preview-img" />
              )}

                            {/* email*/}
              {activeContact.type === "email" && (
                <img src="san.png" className="preview-img" />
              )}

              {/* LOADING */}
              {loading && <div className="skeleton" />}

              {/* PREVIEW */}
              {preview && !loading && (
                <div className="preview-card">
                  <img
                    src={
                      preview.image ||
                      "https://via.placeholder.com/400x200?text=Preview"
                    }
                  />
                  <div className="preview-content">
                    <h4>{preview.title}</h4>
                    <p>{preview.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CONTACTS.map((c, i) => (
            <ContactLink
              key={c.label}
              {...c}
              delay={i * 80}
              onClick={handleClick}
              active={activeContact.label === c.label}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .visit-btn {
          display: inline-block;
          margin: 10px 0;
          padding: 8px 14px;
          border-radius: 8px;
          background: #38bdf8;
          color: black;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .visit-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 10px 25px rgba(56,189,248,0.4);
        }

        .preview-img {
          width: 100%;
          border-radius: 10px;
        }

        .skeleton {
          margin-top: 12px;
          height: 160px;
          border-radius: 12px;
          background: linear-gradient(90deg,#0f172a,#1e293b,#0f172a);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }

        @keyframes shimmer {
          0% {background-position: 200%}
          100% {background-position: -200%}
        }

        .preview-card {
          margin-top: 12px;
          border-radius: 12px;
          overflow: hidden;
          background: #020617;
          animation: previewIn 0.4s ease;
        }

        .preview-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .preview-content {
          padding: 10px;
        }

        @keyframes previewIn {
          from {opacity:0; transform:scale(0.95)}
          to {opacity:1; transform:scale(1)}
        }
      `}</style>
    </section>
  )
}