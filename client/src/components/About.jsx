import pizza16 from '../assets/pizza16.png'
import pizza18 from '../assets/pizza18.png'
import './About.css'

const features = [
  {
    title: 'Wood-fired ovens',
    text: 'Real wood, real flavour — every pizza baked at 450°C in under 90 seconds.',
  },
  {
    title: 'Local ingredients',
    text: 'San Marzano tomatoes, buffalo mozzarella, and flour milled within 100km.',
  },
  {
    title: '30-minute promise',
    text: 'Hot at your door in 30 minutes — or your next pizza is on us.',
  },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about__inner">
        <div className="about__media">
          <img src={pizza16} alt="Pizza on board" className="about__photo about__photo--main" />
          <img src={pizza18} alt="Pizza closeup" className="about__photo about__photo--accent" />
          <div className="about__chip">
            <span className="about__chip-icon" aria-hidden="true">⚡</span>
            <div>
              <strong>10 yrs</strong>
              <span>making pizza</span>
            </div>
          </div>
        </div>

        <div className="about__copy">
          <p className="about__eyebrow">About us</p>
          <h2 className="about__title">
            Pizza is our<br />
            <span>passion</span>
          </h2>
          <p className="about__lead">
            We've been firing up wood ovens since 2015 — same recipe, same neighbourhood,
            same love for honest food. Every dough is hand-stretched, every sauce is made fresh, every day.
          </p>

          <ul className="about__features">
            {features.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>

          <button className="btn btn--primary">Our Story</button>
        </div>
      </div>
    </section>
  )
}
