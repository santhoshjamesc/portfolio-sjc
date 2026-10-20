import { asset } from "../utils/asset";
import { useEffect, useRef, useState } from "react"
import { notify, NOTIFY_EVENT as EVT } from "../utils/notify"
import { KINDS, noteFor } from "../data/notes"

const MAX = 3
const LIFE = 3400

export function Toasts() {
  const [items, setItems] = useState([])
  const id = useRef(0)
  const timers = useRef(new Map())
  const lastNote = useRef({ label: "", at: 0 })

  const dismiss = (i) => {
    clearTimeout(timers.current.get(i))
    timers.current.delete(i)
    setItems(l => l.map(t => t.id === i ? { ...t, leaving: true } : t))
    setTimeout(() => setItems(l => l.filter(t => t.id !== i)), 320)
  }
  const arm = (i) => timers.current.set(i, setTimeout(() => dismiss(i), LIFE))

  useEffect(() => {
    const add = (n) => {
      const i = ++id.current
      setItems(l => [{ id: i, ...n }, ...l].slice(0, MAX))
      arm(i)
    }
    const onNotify = (e) => add(e.detail)

    // Delegated: tell the visitor what a tap/click on a link did
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]")
      const el = !a && e.target.closest?.("[data-kind]")
      if (el) {
        const { kind, label = "", note: fixed } = el.dataset
        const text = fixed || noteFor(kind, label)
        if (!text) return
        const now = Date.now()
        if (lastNote.current.label === label && now - lastNote.current.at < 2500) return
        lastNote.current = { label, at: now }
        notify({ kind, sub: label, body: text })
        return
      }
      if (!a) return
      const href = a.getAttribute("href") || ""
      if (href.startsWith("mailto:")) notify({ kind: "contact", sub: "Mail", body: `Opening your mail app for ${href.slice(7).split("?")[0]}. Can't wait to hear from you!` })
      else if (href.startsWith("tel:")) notify({ kind: "contact", sub: "Phone", body: `Dialing ${href.slice(4)}. Talk soon!` })
      else if (a.target === "_blank") {
        let host = href
        try { host = new URL(a.href).hostname.replace(/^www\./, "") } catch { /* keep raw */ }
        notify({ kind: "link", sub: host, body: `Opening ${host} in a new tab for you.` })
      }
    }
    window.addEventListener(EVT, onNotify)
    document.addEventListener("click", onClick)
    const t = timers.current
    return () => {
      window.removeEventListener(EVT, onNotify)
      document.removeEventListener("click", onClick)
      t.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {items.map(t => {
        const k = KINDS[t.kind] || KINDS.system
        return (
          <div
            key={t.id}
            className={`toast${t.leaving ? " toast--out" : ""}`}
            style={{ "--accent": k.color }}
            role="status"
            onClick={() => dismiss(t.id)}
            onMouseEnter={() => clearTimeout(timers.current.get(t.id))}
            onMouseLeave={() => !t.leaving && arm(t.id)}
          >
            <span className="toast__avatar" aria-hidden="true">
              <img src={asset("san.webp")} alt="" width="38" height="38" decoding="async" />
              <em className="toast__badge">{t.icon || k.badge}</em>
            </span>
            <span className="toast__text">
              <span className="toast__row">
                <b>Santhosh James</b>
                <span className="toast__chip">{k.label}</span>
                <span className="toast__time">now</span>
              </span>
              {t.sub && <span className="toast__sub">{t.sub}</span>}
              <span className="toast__msg">{t.body}</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
