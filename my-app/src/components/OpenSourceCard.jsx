// components/OpenSourceCard.jsx
const KIND_LABEL = { npm: "NPM PACKAGE", vscode: "VS CODE EXTENSION" }

export function OpenSourceCard({ kind, name, version, license, description, tags = [], link, repo }) {
  return (
    <article className="os-card">
      <div className="os-card__top">
        <span className={`os-card__kind os-card__kind--${kind}`}>{KIND_LABEL[kind]}</span>
        <span className="os-card__meta">v{version}{license ? ` · ${license}` : ""}</span>
      </div>
      <h3 className="os-card__title">{name}</h3>
      <p className="os-card__desc">{description}</p>
      <div className="os-card__tags">
        {tags.map(t => <span key={t} className="os-card__tag">{t}</span>)}
      </div>
      <div className="os-card__links">
        <a href={link} target="_blank" rel="noopener noreferrer" className="os-card__link">
          ↗ {kind === "npm" ? "VIEW ON NPM" : "VIEW ON MARKETPLACE"}
        </a>
        {repo && (
          <a href={repo} target="_blank" rel="noopener noreferrer" className="os-card__link">↗ SOURCE</a>
        )}
      </div>
    </article>
  )
}
