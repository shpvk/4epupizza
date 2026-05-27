import pizza12 from '../assets/pizza12.png'
import pizza13 from '../assets/pizza13.png'
import pizza14 from '../assets/pizza14.png'
import pizza15 from '../assets/pizza15.png'
import pizza16 from '../assets/pizza16.png'
import pizza17 from '../assets/pizza17.png'
import './Events.css'

const events = [
  { id: 1, img: pizza12, title: 'Pizza Masterclass', date: 'June 12' },
  { id: 2, img: pizza13, title: 'Family Friday', date: 'June 18' },
  { id: 3, img: pizza14, title: 'Wood Oven Tour', date: 'June 24' },
  { id: 4, img: pizza15, title: 'Live Music Night', date: 'July 02' },
  { id: 5, img: pizza16, title: 'Dough Workshop', date: 'July 09' },
  { id: 6, img: pizza17, title: 'Sunday Brunch', date: 'July 15' },
]

export default function Events() {
  return (
    <section className="events" id="events">
      <div className="container">
        <h2 className="section-title">Events</h2>
        <p className="events__lead">
          Meet, eat, and learn — our pizzeria is more than just food.
        </p>

        <ul className="events-grid">
          {events.map((e, i) => (
            <li key={e.id} className={`event-card event-card--${i + 1}`}>
              <img src={e.img} alt={e.title} />
              <div className="event-card__caption">
                <span className="event-card__date">{e.date}</span>
                <h3>{e.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
