import { playChime } from "./sound"

export const NOTIFY_EVENT = "sjc:notify"

// notify({ title, body, icon }) from anywhere; also vibrates on devices that support it
export function notify(n) {
  try { navigator.vibrate?.(10) } catch { /* unsupported */ }
  playChime(n.kind)
  window.dispatchEvent(new CustomEvent(NOTIFY_EVENT, { detail: n }))
}
