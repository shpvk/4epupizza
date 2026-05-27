import pizza13 from '../assets/pizza13.png'
import pizza15 from '../assets/pizza15.png'
import pizza17 from '../assets/pizza17.png'
import pizza18 from '../assets/pizza18.png'
import pizza14 from '../assets/pizza14.png'
import './MostPopular.css'

const popular = [
  { id: 1, name: 'Pepperoni Supreme', tag: 'Hot', price: 14, img: pizza13 },
  { id: 2, name: 'Margherita Classic', tag: 'New', price: 10, img: pizza15 },
  { id: 3, name: 'Quattro Formaggi', tag: 'Best', price: 12, img: pizza17 },
  { id: 4, name: 'Wood Fired', tag: 'Chef', price: 13, img: pizza18 },
]

export default function MostPopular() {
  return (
    <section className="popular" id="popular">
      <div
        className="popular__hero"
        style={{ backgroundImage: `url(${pizza14})` }}
      >
        <div className="popular__hero-overlay" />
        <div className="container popular__hero-inner">
          <p className="popular__hero-eyebrow">Special offer</p>
          <h2 className="popular__hero-title">
            Buy 1 Pizza<br />
            Get 1 <span>Free Coffee</span>
          </h2>
          <button className="btn btn--primary">Grab Offer</button>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Most Popular Pizza</h2>

        <ul className="popular-grid">
          {popular.map((p) => (
            <li key={p.id} className="popular-card">
              <span className="popular-card__tag">{p.tag}</span>
              <div className="popular-card__media">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="popular-card__body">
                <h3>{p.name}</h3>
                <div className="popular-card__row">
                  <span className="popular-card__price">${p.price}</span>
                  <button className="popular-card__cta">Order</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
