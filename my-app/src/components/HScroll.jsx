import { useRef, useState, useEffect, useCallback } from "react"

// Scroll-snap carousel: drag/swipe/wheel-free, arrow buttons
export function HScroll({ children, cardWidth = 300, label = "carousel" }) {
  const ref = useRef(null)
  const [p, setP] = useState({ start: true, end: false, ratio: 0 })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setP({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, ratio: max > 0 ? el.scrollLeft / max : 1 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  const go = (dir) => {
    const el = ref.current
    try { navigator.vibrate?.(6) } catch { /* unsupported */ }
    el?.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" })
  }

  // mouse drag (touch uses native scrolling)
  const drag = useRef(null)
  const onDown = (e) => {
    if (e.pointerType !== "mouse" || e.target.closest("a,button")) return
    drag.current = { x: e.clientX, left: ref.current.scrollLeft }
    ref.current.classList.add("hscroll--drag")
  }
  const onMove = (e) => { if (drag.current) ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x) }
  const onUp = () => { drag.current = null; ref.current?.classList.remove("hscroll--drag") }

  return (
    <div className="hscroll" style={{ "--card-w": `${cardWidth}px` }}>
      <div
        ref={ref}
        className="hscroll__track"
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1)
          if (e.key === "ArrowLeft") go(-1)
        }}
      >
        {children}
      </div>
      <div className="hscroll__bar">
        <div className="hscroll__btns">
          <button type="button" onClick={() => go(-1)} disabled={p.start} aria-label={`Scroll ${label} left`}>←</button>
          <button type="button" onClick={() => go(1)} disabled={p.end} aria-label={`Scroll ${label} right`}>→</button>
        </div>
      </div>
    </div>
  )
}
