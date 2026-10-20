// Synthesised notification chimes (Web Audio, no asset files). Each kind has its own two-note motif.
const MOTIFS = {
  edu:     [659, 880],
  exp:     [523, 784],
  vol:     [587, 698],
  project: [784, 1047],
  oss:     [698, 932],
  cert:    [880, 1175],
  service: [494, 740],
  link:    [988],
  contact: [659, 988],
  system:  [440],
}

let ctx
let on = (() => { try { return localStorage.getItem("sound") !== "off" } catch { return true } })()

export const isSoundOn = () => on
export function setSoundOn(v) {
  on = v
  try { localStorage.setItem("sound", v ? "on" : "off") } catch { /* ignore */ }
}

export function playChime(kind = "system") {
  if (!on) return
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    ctx ??= new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === "suspended") ctx.resume()
    const t0 = ctx.currentTime
    ;(MOTIFS[kind] || MOTIFS.system).forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      const t = t0 + i * 0.11
      o.type = "sine"
      o.frequency.value = f
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.025, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45)
      o.connect(g).connect(ctx.destination)
      o.start(t)
      o.stop(t + 0.5)
    })
  } catch { /* audio unavailable */ }
}
