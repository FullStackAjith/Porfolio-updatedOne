import { useState } from 'react'

// [symbol, name, logo file in /public/skills, [families]] — first family decides the tile colour
const ELEMENTS = [
  ['Ht', 'HTML', 'html', ['Frontend']],
  ['Cs', 'CSS', 'css', ['Frontend']],
  ['Js', 'JavaScript', 'javascript', ['Languages', 'Frontend']],
  ['Bs', 'Bootstrap', 'bootstrap', ['Frontend']],
  ['Re', 'React js', 'react', ['Frontend']],
  ['Jv', 'Java', 'java', ['Languages', 'Backend']],
  ['Py', 'Python', 'python', ['Languages', 'Backend', 'Data']],
  ['C++', 'C / C++', 'cpp', ['Languages']],
  ['R', 'R Programming', 'r', ['Languages', 'Data']],
  ['Sp', 'Spring Boot', 'spring', ['Backend']],
  ['Dj', 'Django', 'django', ['Backend']],
  ['Dr', 'Django REST', 'djangorest', ['Backend']],
  ['Nd', 'Node.js', 'node', ['Backend']],
  ['Ex', 'Express.js', 'express', ['Backend']],
  ['My', 'MySQL', 'mysql', ['Databases']],
  ['Mg', 'MongoDB', 'mongodb', ['Databases']],
  ['Pg', 'PostgreSQL', 'postgresql', ['Databases']],
  ['Gt', 'Git', 'git', ['Tools']],
  ['Gh', 'GitHub', 'github', ['Tools']],
  ['Pb', 'Power BI', 'powerbi', ['Data']],
  ['Np', 'NumPy', 'numpy', ['Data']],
  ['Pd', 'Pandas', 'pandas', ['Data']],
  ['Mp', 'Matplotlib', 'matplotlib', ['Data']],
  ['Xl', 'Excel', 'excel', ['Data']],
  ['Cp', 'GitHub Copilot', 'copilot', ['AI']],
  ['Cg', 'ChatGPT', 'chatgpt', ['AI']],
  ['Cl', 'Claude AI', 'claude', ['AI']],
  ['Gm', 'Gemini AI', 'gemini', ['AI']],
  ['Cv', 'Canva AI', 'canva', ['AI']],
  ['Fg', 'Figma AI', 'figma', ['AI']],
  ['Dk', 'Docker', 'docker', ['DevOps']],
  ['Ec', 'AWS EC2', 'ec2', ['DevOps']],
  ['CI', 'CI/CD Pipeline', 'cicd', ['DevOps', 'Tools']],
  ['Gn', 'Gen AI', 'genai', ['AI']],
  ['Ag', 'Agentic AI', 'agentic', ['AI']],
  ['ML', 'Machine Learning', 'ml', ['AI', 'Data']],
]
const FAMILIES = ['Languages', 'Frontend', 'Backend', 'Databases', 'Data', 'Tools', 'DevOps', 'AI']
const HUE = { Languages: 350, Frontend: 215, Backend: 28, Databases: 150, Data: 275, Tools: 190, DevOps: 205, AI: 320 }

export default function Skills() {
  const [tileHover, setTileHover] = useState(null)
  const [tilePin, setTilePin] = useState(null)
  const [chipHover, setChipHover] = useState(null)
  const [chipPin, setChipPin] = useState(null)

  const tile = tileHover ?? tilePin
  const chip = chipHover ?? chipPin
  const focus = tile !== null ? ELEMENTS[tile] : null
  const lit = focus ? focus[3] : chip ? [chip] : null

  return (
    <section
      className="section"
      id="skills"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(122,15,30,0.05), transparent)' }}
    >
      <div className="container">
        <div className="eyebrow reveal">Capabilities</div>
        <h2 className="section-title reveal">
          The periodic table <span className="pt-soft">of my stack.</span>
        </h2>
        <p className="pt-hint reveal">Hover a tile to see its family — or pick a family to light it up.</p>

        <div className="pt-chips reveal" onMouseLeave={() => setChipHover(null)}>
          {['All', ...FAMILIES].map((f) => {
            const on = f === 'All' ? !chip : chip === f
            return (
              <button
                key={f}
                className={`pt-chip${on ? ' on' : ''}`}
                onMouseEnter={() => setChipHover(f === 'All' ? null : f)}
                onClick={() => { setChipPin(f === 'All' ? null : f); setTilePin(null) }}
              >
                {f}
              </button>
            )
          })}
        </div>

        <div className="pt-layout">
          <div className="pt-grid reveal" onMouseLeave={() => setTileHover(null)}>
            {ELEMENTS.map(([sym, name, , fams], i) => {
              const on = !lit || fams.some((f) => lit.includes(f))
              return (
                <button
                  key={name}
                  className={`pt-tile${on ? '' : ' dim'}${tile === i ? ' active' : ''}`}
                  style={{ '--i': i, '--h': HUE[fams[0]] }}
                  onMouseEnter={() => setTileHover(i)}
                  onFocus={() => setTileHover(i)}
                  onBlur={() => setTileHover(null)}
                  onClick={() => setTilePin(tilePin === i ? null : i)}
                >
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <b>{sym}</b>
                  <em>{name}</em>
                </button>
              )
            })}
          </div>

          <aside className="pt-panel" aria-live="polite">
            {focus ? (
              <div className="pt-panel-body" key={focus[1]}>
                <div className="pt-logo-box"><img className="pt-logo" src={`/skills/${focus[2]}.svg`} alt={focus[1]} /></div>
                <div className="pt-panel-name">{focus[1]}</div>
                <div className="pt-panel-tags">
                  {focus[3].map((f) => <span key={f}>{f}</span>)}
                </div>
              </div>
            ) : (
              <div className="pt-panel-body idle">
                <div className="pt-count">{ELEMENTS.length}</div>
                <div className="pt-panel-name">elements in my stack</div>
                <div className="pt-panel-tags"><span>{chip ?? 'All families'}</span></div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
