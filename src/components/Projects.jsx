import { useRef } from 'react'

const ITEMS = [
  {
    tag: 'FULL STACK',
    hue: 24,
    title: 'Library Management System',
    desc: 'A full stack system for managing library records, built with Java, Spring Boot and REST APIs backed by relational database integration.',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'MySQL'],
    icon: 'bi-book',
    github: 'https://github.com/FullStackAjith',
  },
  {
    tag: 'DATA',
    hue: 165,
    title: 'Power BI Sales Dashboard',
    desc: 'A sales analytics dashboard built with Power BI — data cleaning, DAX measures, and interactive visualizations to analyze sales performance.',
    tech: ['Power BI', 'DAX', 'Data Cleaning'],
    icon: 'bi-bar-chart-line',
    github: 'https://github.com/FullStackAjith',
  },
  {
    tag: 'MERN',
    hue: 350,
    title: 'E-Commerce Web Application',
    desc: 'A responsive MERN-stack e-commerce app with product browsing, authentication, cart, order management and REST APIs.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    icon: 'bi-cart3',
    github: 'https://github.com/FullStackAjith',
  },
  {
    tag: 'MERN',
    hue: 270,
    title: 'Food Ball E-Commerce Website',
    desc: 'An online food ordering and e-commerce platform with product browsing, cart, and checkout flow.',
    tech: ['React', 'Node.js', 'MongoDB'],
    icon: 'bi-egg-fried',
    github: 'https://github.com/FullStackAjith',
  },
  {
    tag: 'SPRING BOOT',
    hue: 210,
    title: 'Student Management System',
    desc: 'A system for managing student records, attendance, and academic data with role-based access.',
    tech: ['Java', 'Spring Boot', 'MySQL'],
    icon: 'bi-mortarboard',
    github: 'https://github.com/FullStackAjith',
  },
  {
    tag: 'REACT',
    hue: 42,
    title: 'Weather App — React',
    desc: 'A React weather application that fetches live forecasts by city with a clean, responsive UI.',
    tech: ['React', 'Weather API', 'CSS'],
    icon: 'bi-cloud-sun',
    github: 'https://github.com/FullStackAjith',
  },
  {
    tag: 'REACT',
    hue: 320,
    title: 'Watch Store — React JS',
    desc: 'A React-based e-commerce storefront for browsing and purchasing watches, with product filtering and a cart.',
    tech: ['React', 'JavaScript', 'CSS'],
    icon: 'bi-smartwatch',
    github: 'https://github.com/FullStackAjith',
  },
  {
    tag: 'FULL STACK',
    hue: 140,
    title: 'Food Shop',
    desc: 'A food ordering web app connecting customers with local shops, featuring menus, cart, and order flow.',
    tech: ['React', 'Node.js', 'Express.js'],
    icon: 'bi-shop',
    github: 'https://github.com/FullStackAjith',
  },
]

function ProjectCard({ tag, hue, title, desc, tech, icon, github, n }) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * 18}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 18}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }
  function onLeave() {
    const el = ref.current
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }

  return (
    <a
      ref={ref}
      href={github}
      target="_blank"
      rel="noreferrer"
      className="pcard"
      style={{ '--hue': hue }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      title={desc}
    >
      <div className="pcard-shine"></div>
      <div className="pcard-top">
        <span className="pcard-tag">{tag}</span>
        <span className="pcard-eq"><i></i><i></i><i></i><i></i></span>
      </div>
      <div className="pcard-stage">
        <span className="pcard-ring r1"></span>
        <span className="pcard-ring r2"></span>
        <span className="pcard-ring r3"></span>
        <div className="pcard-orb"></div>
        <i className={`bi ${icon} pcard-icon`}></i>
      </div>
      <div className="pcard-title">{title}</div>
      <p className="pcard-desc">{desc}</p>
      <div className="pcard-foot">
        <span className="pcard-tech">{tech.slice(0, 3).join(' · ')}</span>
        <span className="pcard-go"><i className="bi bi-arrow-up-right"></i></span>
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="eyebrow reveal">Selected Work</div>
        <h2 className="section-title reveal" style={{ marginBottom: '0.6rem' }}>
          Projects
        </h2>
        <p
          className="reveal"
          style={{
            color: 'var(--text-low)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
            marginBottom: '2.2rem',
          }}
        >
          Click any project to open its GitHub repository ↗
        </p>
        <div className="pcard-grid">
          {ITEMS.map((p, i) => (
            <div className="reveal" key={i} style={{ transitionDelay: `${(i % 4) * 0.07}s` }}>
              <ProjectCard {...p} n={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
