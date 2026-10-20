import { useEffect, useState } from "react"
import { CONTACTS, FOOTER } from "../data/data"
import { notify } from "../utils/notify"
import Reveal from "./Reveal"

const brandSrc = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${slug}.svg`

function BrandIcon({ slug, color, fallback }) {
  const [failed, setFailed] = useState(false)
  if (!slug || failed) return <>{fallback}</>
  return (
    <span className="brand-icon" style={{ "--brand": color, "--src": `url(${brandSrc(slug)})` }}>
      <img src={brandSrc(slug)} alt="" width="22" height="22" onError={() => setFailed(true)} />
    </span>
  )
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
)

const byType = (t) => CONTACTS.find((c) => c.type === t)

function useKochiTime() {
  const fmt = () => new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30000)
    return () => clearInterval(id)
  }, [])
  return t
}

function downloadVCard(email, phone) {
  const vcf = [
    "BEGIN:VCARD", "VERSION:3.0", `FN:${FOOTER.name.replace(/\b(\w)(\w*)/g, (_, a, b) => a + b.toLowerCase())}`,
    "TITLE:Software Developer", `EMAIL:${email.value}`, `TEL:${phone.value}`, "END:VCARD",
  ].join("\r\n")
  const url = URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }))
  const a = Object.assign(document.createElement("a"), { href: url, download: "santhosh-james.vcf" })
  a.click()
  URL.revokeObjectURL(url)
  notify({ kind: "contact", icon: "📇", body: "Saved my contact card. Now you can't lose me!" })
}

export function ContactSection() {
  const email = byType("email")
  const phone = byType("phone")
  const socials = CONTACTS.filter((c) => c.type === "link")
  const time = useKochiTime()
  const [name, setName] = useState("")
  const [msg, setMsg] = useState("")

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email.value)
      notify({ kind: "contact", icon: "📋", body: "Email copied. Paste it anywhere and say hi!" })
    } catch {
      notify({ kind: "contact", body: `Here it is: ${email.value}` })
    }
  }

  const send = (e) => {
    e.preventDefault()
    const subject = `Hello from ${name || "your portfolio"}`
    const body = `${msg}\n\n— ${name}`
    window.location.href = `mailto:${email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    notify({ kind: "contact", icon: "✉️", body: "Opening your mail app with the message ready. Just hit send!" })
  }

  return (
    <section id="contact" className="section ct">
      <Reveal variant="fadeUp">
        <p className="ct__status"><i aria-hidden="true" /> Available for work · Kochi, Kerala · {time} IST</p>
        <h2 className="ct__headline">Have an idea?<br /><span>Let&apos;s build it.</span></h2>
        <p className="ct__sub">Open to roles, freelance work and collaborations. I usually reply within a day.</p>
      </Reveal>

      <div className="ct__grid">
        {/* Composer */}
        <Reveal variant="fadeLeft" style={{ height: "100%" }}>
          <form className="ct-mail" onSubmit={send}>
            <div className="ct-mail__bar" aria-hidden="true"><i /><i /><i /><span>New message</span></div>
            <div className="ct-mail__field"><span>To</span><b>{email.value}</b></div>
            <label className="ct-mail__field">
              <span>From</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required autoComplete="name" />
            </label>
            <label className="ct-mail__body">
              <span className="sr-only">Message</span>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tell me about your project…" rows={6} required />
            </label>
            <div className="ct-mail__actions">
              <button type="submit" className="ct-btn ct-btn--primary">Send message ↗</button>
              <button type="button" className="ct-btn" onClick={copyEmail}>Copy email</button>
              <button type="button" className="ct-btn" onClick={() => downloadVCard(email, phone)}>Save contact</button>
            </div>
          </form>
        </Reveal>

        {/* Links */}
        <Reveal variant="fadeRight" style={{ height: "100%" }}>
          <div className="ct__side">
            <a className="ct-phone" href={phone.href} aria-label={`Call ${phone.value}`}>
              <span aria-hidden="true"><PhoneIcon /></span>
              <span><small>CALL ME</small><b>{phone.value}</b></span>
              <i aria-hidden="true">→</i>
            </a>
            <ul className="ct-socials">
              {socials.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`${c.label}: ${c.value} (opens in a new tab)`}>
                    <span aria-hidden="true"><BrandIcon slug={c.slug} color={c.color} fallback={c.icon} /></span>
                    <small>{c.label}</small>
                    <i aria-hidden="true">↗</i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
