import Reveal from "./Reveal"

// Git-style tree: trunk -> company node -> responsibility branches -> tech leaves
export function ExperienceTree({ items = [], notes = {} }) {
  return (
    <ol className="xtree" aria-label="Work experience">
      {items.map((e, i) => (
        <li className="xtree__node" key={i} data-kind="exp" data-label={`${e.role} · ${e.company}`} data-note={notes[e.company]}>
          <span className="xtree__dot" aria-hidden="true" />
          <Reveal variant="fadeUp" delay={i * 80}>
            <header className="xtree__head">
              {e.logo && <img src={e.logo} alt="" width="40" height="40" loading="lazy" decoding="async" className="xtree__logo" />}
              <div>
                <h3 className="xtree__company">{e.company}</h3>
                <p className="xtree__role">{e.role}</p>
                <p className="xtree__dates">{e.dates}</p>
              </div>
            </header>
            {e.responsibilities?.length > 0 && (
              <ul className="xtree__branches">
                {e.responsibilities.map((r, j) => <li key={j}>{r}</li>)}
              </ul>
            )}
            {e.techStack?.length > 0 && (
              <ul className="xtree__leaves">
                {e.techStack.map(t => <li key={t}>{t}</li>)}
              </ul>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
