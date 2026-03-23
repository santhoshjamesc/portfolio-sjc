// components/ServiceCard.jsx

export function ServiceCard({ title, description }) {
    return (
      <div className="service-card">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{description}</p>
      </div>
    )
  }