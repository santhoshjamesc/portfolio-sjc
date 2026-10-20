import { useState } from "react"
import { TECH_ICONS } from "../data/techIcons"

export function TechIcon({ name, size = 20 }) {
  const [failed, setFailed] = useState(false)
  const src = TECH_ICONS[name]
  if (!src || failed) return <span className="tech-icon tech-icon--letter" style={{ width: size, height: size }} aria-hidden="true">{name[0]}</span>
  return (
    <span className="tech-icon" style={{ width: size, height: size }} aria-hidden="true">
      <img src={src} alt="" width={size - 6} height={size - 6} loading="lazy" decoding="async" onError={() => setFailed(true)} />
    </span>
  )
}
