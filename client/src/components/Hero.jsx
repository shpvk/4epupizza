import heroPizza from '../assets/pizza15.png'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">
            <span aria-hidden="true">⚡</span>
            <span>30 min delivery</span>
          </span>
          <h1 className="hero__title">
            The Fastest
            <span className="hero__title--script">Pizza</span>
            Delivery
          </h1>
          <p className="hero__lead">
            Hot, fresh, and on your doorstep in 30 minutes — straight from our wood-fired ovens.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary">Order Now</button>
            <button className="btn btn--ghost">See Menu</button>
          </div>

          <ul className="hero__stats">
            <li><strong>30<span>min</span></strong><span>Delivery</span></li>
            <li><strong>4.9<span>★</span></strong><span>Rating</span></li>
            <li><strong>50+<span></span></strong><span>Pizzas</span></li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <img src={heroPizza} alt="Pizza" className="hero__pizza" />
          <span className="hero__badge">
            <span className="hero__badge-value">$9</span>
            <span className="hero__badge-label">only</span>
          </span>
        </div>
      </div>
    </section>
  )
}
