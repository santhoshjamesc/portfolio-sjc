// Resolve a public/ asset against Vite's base so it works on subpath hosts (e.g. GitHub Pages).
export const asset = (p) =>
  !p || /^(https?:)?\/\/|^data:/.test(p) ? p : `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`
