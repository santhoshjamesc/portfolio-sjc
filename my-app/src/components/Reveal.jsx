// components/Reveal.jsx
import { useState, useEffect, useRef } from "react"
import VARIANTS from "../utils/animationVariants"

function Reveal({
  children,
  delay = 0,
  variant = "fadeUp",
  once = false,
  className = "",
  style = {},
}) {
  const ref = useRef(null)
  const [state, setState] = useState("hidden") // "hidden" | "visible" | "exitDown" | "exitUp"
  const hasEntered = useRef(false)
  const exitTimer = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (exitTimer.current) {
            clearTimeout(exitTimer.current)
            exitTimer.current = null
          }
          hasEntered.current = true
          setState("visible")
        } else if (hasEntered.current && !once) {
          const isAboveViewport = entry.boundingClientRect.bottom < 0
          setState(isAboveViewport ? "exitDown" : "exitUp")

          exitTimer.current = setTimeout(() => {
            setState("hidden")
            exitTimer.current = null
          }, 550)
        }
      },
      { threshold: [0, 0.12, 0.5, 1], rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (exitTimer.current) clearTimeout(exitTimer.current)
    }
  }, [once])

  const v = VARIANTS[variant]?.(delay) ?? VARIANTS.fadeUp(delay)
  const currentStyle = v[state] ?? v.hidden

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...currentStyle, willChange: "opacity, transform", ...style }}
    >
      {children}
    </div>
  )
}

export default Reveal