// hooks/useTheme.js
import { useState, useCallback } from "react"

const KEY = "theme"

function readInitial() {
  const attr = document.documentElement.dataset.theme
  if (attr === "light" || attr === "dark") return attr
  return "dark"
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitial)

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark"
      const root = document.documentElement
      root.classList.add("theme-transition")
      root.dataset.theme = next
      window.setTimeout(() => root.classList.remove("theme-transition"), 400)
      try { localStorage.setItem(KEY, next) } catch { /* ignore */ }
      document.querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "dark" ? "#04060f" : "#f1f5f9")
      return next
    })
  }, [])

  return [theme, toggleTheme]
}
