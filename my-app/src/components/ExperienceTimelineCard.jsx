// components/ExperienceTimelineCard.jsx

export function ExperienceTimelineCard({
    company,
    role,
    dates,
    logo,
    responsibilities = [],
    techStack = [],
  }) {
    return (
      <div className="exp-card">
        <div className="exp-card__header">
          {logo && (
            <img
              src={logo}
              alt={`${company} logo`}
              className="exp-card__logo"
            />
          )}
          <div className="exp-card__meta">
            <h3 className="exp-card__company">{company}</h3>
            <span className="exp-card__role">{role}</span>
            <span className="exp-card__dates">{dates}</span>
          </div>
        </div>
  
        {responsibilities.length > 0 && (
          <ul className="exp-card__list">
            {responsibilities.map((item, i) => (
              <li key={i} className="exp-card__list-item">{item}</li>
            ))}
          </ul>
        )}
  
        {techStack.length > 0 && (
          <div className="exp-card__stack">
            {techStack.map((tech, i) => (
              <span key={i} className="exp-card__tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    )
  }