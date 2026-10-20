// components/ServiceCard.jsx

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }

const ICONS = {
  android: <><path d="M6 10h12v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" /><path d="M7 7a5 5 0 0 1 10 0z" /><path d="M9 3.5 8 2M15 3.5 16 2M3.5 11v4M20.5 11v4" /></>,
  mobile: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  design: <><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.5-1-1.6-1-3 0-1 .8-2 2-2h2.5A3.5 3.5 0 0 0 21 10.5C21 6.4 17 3 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="14.5" cy="7" r="1" /></>,
  web: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M8.5 14.5 7 16l1.5 1.5M15.5 14.5 17 16l-1.5 1.5" /></>,
}

export function ServiceCard({ title, description, icon }) {
  return (
    <article className="service-card">
      <span className="service-card__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" {...P}>{ICONS[icon] || ICONS.web}</svg>
      </span>
      <div>
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{description}</p>
      </div>
    </article>
  )
}
