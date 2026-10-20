// hooks/useInView.js
import { useRef, useState, useEffect } from "react"

export function useInView(options = {}) {
  const { threshold = 0.1, ...rest } = options
  const restKey = JSON.stringify(rest)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold, ...JSON.parse(restKey) }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, restKey])

  return [ref, inView]
}