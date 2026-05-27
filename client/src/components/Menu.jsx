import { useState } from 'react'
import pizza12 from '../assets/pizza12.png'
import pizza13 from '../assets/pizza13.png'
import pizza14 from '../assets/pizza14.png'
import pizza15 from '../assets/pizza15.png'
import pizza16 from '../assets/pizza16.png'
import pizza17 from '../assets/pizza17.png'
import pizza18 from '../assets/pizza18.png'
import './Menu.css'

const categories = [
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'burrito', label: 'Burrito', icon: '🌯' },
  { id: 'fries', label: 'Fries', icon: '🍟' },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'breakfast', label: 'Breakfast', icon: '🥓' },
]

const pizzas = [
  { id: 1, name: 'Margherita', desc: 'Tomato, mozzarella, basil', price: 9, img: pizza12 },
  { id: 2, name: 'Pepperoni', desc: 'Pepperoni, mozzarella, oregano', price: 11, img: pizza13 },
  { id: 3, name: 'Quattro Formaggi', desc: 'Four cheeses on tomato', price: 12, img: pizza14 },
  { id: 4, name: 'Hawaiian', desc: 'Ham, pineapple, cheese', price: 10, img: pizza15 },
  { id: 5, name: 'BBQ Chicken', desc: 'Chicken, BBQ sauce, onion', price: 13, img: pizza16 },
  { id: 6, name: 'Veggie Supreme', desc: 'Peppers, olives, mushrooms', price: 10, img: pizza17 },
  { id: 7, name: 'Meat Lovers', desc: 'Pepperoni, sausage, bacon', price: 14, img: pizza18 },
  { id: 8, name: 'Diavola', desc: 'Spicy salami, chilli, mozzarella', price: 12, img: pizza12 },
]

export default function Menu() {
  const [active, setActive] = useState('pizza')

  return (
    <section className="menu" id="menu">
      <div className="container">
        <h2 className="section-title">Menu</h2>

        <ul className="categories">
          {categories.map((c) => (
            <li key={c.id}>
              <button
                className={`category ${active === c.id ? 'category--active' : ''}`}
                onClick={() => setActive(c.id)}
              >
                <span className="category__icon" aria-hidden="true">{c.icon}</span>
                <span>{c.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <ul className="pizza-grid">
          {pizzas.map((p) => (
            <li key={p.id} className="pizza-card">
              <div className="pizza-card__media">
                <img src={p.img} alt={p.name} />
              </div>
              <h3 className="pizza-card__name">{p.name}</h3>
              <p className="pizza-card__desc">{p.desc}</p>
              <div className="pizza-card__footer">
                <span className="pizza-card__price">${p.price}</span>
                <button className="pizza-card__add" aria-label={`Add ${p.name} to cart`}>
                  <span>+</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
