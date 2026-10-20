import { useEffect } from "react"

function ShootingStarCursor({ enabled = true, theme = "dark" }) {
  useEffect(() => {
    if (!enabled) return
    const rgb = theme === "light" ? "3, 105, 161" : "0, 255, 255"
    const glowRgb = theme === "light" ? "3, 105, 161" : "0, 200, 255"
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    document.body.appendChild(canvas)

    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"

    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    let mouse = { x: width / 2, y: height / 2 }
    let prev = { ...mouse }

    let points = []
    const maxPoints = 50

    const maxParticles = 150
    let particles = []

    const move = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      const dx = mouse.x - prev.x
      const dy = mouse.y - prev.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      points.push({
        x: mouse.x,
        y: mouse.y,
        life: 1,
        speed
      })

      if (points.length > maxPoints) points.shift()

      // spawn particles
      for (let i = 0; i < 3 && particles.length < maxParticles; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 2 + 1
        })
      }

      prev = { ...mouse }

      if (!rafId) rafId = requestAnimationFrame(draw)
    }

    window.addEventListener("mousemove", move, { passive: true })

    function draw() {
      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = "lighter"

      // TRAIL
      for (let i = 0; i < points.length - 1; i++) {
        const p = points[i]
        const next = points[i + 1]

        const alpha = p.life
        const widthScale = 6 + p.speed * 0.15

        ctx.strokeStyle = `rgba(${rgb}, ${alpha * 0.2})`
        ctx.lineWidth = widthScale * alpha

        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(next.x, next.y)
        ctx.stroke()

        p.life *= 0.94
      }

      // PARTICLES
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.life *= 0.92

        ctx.fillStyle = `rgba(${rgb}, ${p.life})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

      }
      particles = particles.filter((p) => p.life >= 0.05)

      // GLOW
      const head = points[points.length - 1]
      if (head) {
        const glow = ctx.createRadialGradient(
          head.x, head.y, 0,
          head.x, head.y, 45
        )

        glow.addColorStop(0.2, `rgba(${glowRgb}, 0.2)`)
        glow.addColorStop(1, "transparent")

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(head.x, head.y, 45, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = "source-over"

      // drop faded trail points, and stop the loop once nothing is left to animate
      points = points.filter((p) => p.life >= 0.02)
      if (points.length || particles.length) {
        rafId = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, width, height)
        rafId = 0
      }
    }

    let rafId = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("resize", resize)
      if (rafId) cancelAnimationFrame(rafId)
      canvas.remove()
    }
  }, [enabled, theme])

  return null
}

export default ShootingStarCursor