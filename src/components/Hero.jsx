import { useEffect, useRef, useState } from 'react'
import ParticleField from './ParticleField.jsx'
import HeroMarquee from './HeroMarquee.jsx'

const ROLES = [
  'Java Developer',
  'Python Developer',
  'MERN Developer',
  'Data Analyst',
  'Generative AI Developer',
  'Data Scientist',
]

export default function Hero() {
  const [cur, setCur] = useState(0)
  const [flip, setFlip] = useState(false)
  useEffect(() => {
    let t
    const id = setInterval(() => {
      setFlip(true) // page lifts and turns over the rings
      t = setTimeout(() => { setCur((c) => c + 1); setFlip(false) }, 800)
    }, 2600)
    return () => { clearInterval(id); clearTimeout(t) }
  }, [])
  const portraitRef = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    function onMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 14
      const y = (e.clientY / window.innerHeight - 0.5) * 8
      if (nameRef.current) {
        nameRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      if (portraitRef.current) {
        portraitRef.current.style.setProperty('--px', `${-x * 1.2}px`)
        portraitRef.current.style.setProperty('--py', `${-y * 1.2}px`)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <header className="hero" id="top">
      <ParticleField />
      <div className="hero-grid-overlay"></div>
      <div className="container hero-content">
        <div className="row">
          <div className="col-lg-7">
            <div className="eyebrow">Full Stack Developer Portfolio</div>
            <h1 className="hero-name" ref={nameRef}>
              Ajith<span className="accent-letter">kumar</span>
            </h1>
            <div className="hero-roles">
              <span className="hero-roles-label"><span className="dot"></span> I am a</span>
              <div className="role-pad">
                <div className="role-rings" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, i) => <i key={i}></i>)}
                </div>
                <div className="role-card" aria-label={ROLES[cur % ROLES.length]}>
                  <div className={`role-persp${flip ? ' flipping' : ''}`}>
                    <div className="role-page under">{ROLES[(cur + 1) % ROLES.length]}</div>
                    <div className={`role-page flap${flip ? ' flip' : ''}`}>{ROLES[cur % ROLES.length]}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a href="#projects" className="btn-portfolio primary">
                View My Work <i className="bi bi-arrow-up-right"></i>
              </a>
              <a href="/resume.pdf" download="Ajithkumar_Resume.pdf" id="hero-resume" className="btn-portfolio">
                Download Resume <i className="bi bi-download"></i>
              </a>
              <a href="#contact" className="btn-portfolio">
                Contact Me <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <HeroMarquee />
      </div>
      <figure className="hero-portrait" ref={portraitRef}>
        <div className="hero-portrait-glow"></div>
        <div className="hero-portrait-inner">
          <img src="/hero-portrait.png" alt="Ajithkumar, Full Stack Developer" />
        </div>
      </figure>
    </header>
  )
}
