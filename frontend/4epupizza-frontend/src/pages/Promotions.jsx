import { Link } from 'react-router-dom'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import './Promotions.css'

const promotions = [
  {
    title: 'День народження',
    discount: '-20%',
    code: 'BDAY20',
    description: 'Святкуйте з піцою: промокод діє за 3 дні до та після дня народження.',
    accent: 'Свято',
  },
  {
    title: 'Самовивіз',
    discount: '-10%',
    code: 'PICKUP10',
    description: 'Забирайте замовлення самостійно з піцерії та отримуйте знижку на всю піцу.',
    accent: 'Швидко',
  },
  {
    title: 'Вечір з друзями',
    discount: '-15%',
    code: 'FRIENDS15',
    description: 'Для великих компаній: знижка на замовлення від трьох піц у кошику.',
    accent: 'Компанія',
  },
  {
    title: 'Студентський сет',
    discount: '-12%',
    code: 'STUDENT12',
    description: 'Покажіть студентський квиток курʼєру або на касі та їжте смачніше.',
    accent: 'Навчання',
  },
  {
    title: 'Сімейна неділя',
    discount: '2+1',
    code: 'FAMILY3',
    description: 'Кожної неділі третя піца у подарунок для сімейних замовлень.',
    accent: 'Вихідні',
  },
  {
    title: 'Гаряча новинка',
    discount: '-18%',
    code: 'NEW18',
    description: 'Спробуйте нову піцу місяця зі спеціальною ціною до кінця тижня.',
    accent: 'Новинка',
  },
]

function Promotions() {
  return (
    <div className="promotions-page">
      <Header />
      <main className="promotions" aria-labelledby="promotions-title">
        <section className="promotions__hero">
          <div>
            <span className="promotions__eyebrow">Промокоди 4epupizza</span>
            <h1 id="promotions-title">Акції для смачних приводів</h1>
            <p>
              Обирайте промокод, додавайте піцу в замовлення та отримуйте знижку на день народження,
              самовивіз, вечір з друзями або сімейну неділю.
            </p>
          </div>
          <Link to="/constructor" className="promotions__cta">
            Замовити піцу
          </Link>
        </section>

        <section className="promotions__grid" aria-label="Список акцій">
          {promotions.map((promotion) => (
            <article className="promotion-card" key={promotion.code}>
              <div className="promotion-card__topline">
                <span>{promotion.accent}</span>
                <strong>{promotion.discount}</strong>
              </div>
              <h2>{promotion.title}</h2>
              <p>{promotion.description}</p>
              <div className="promotion-card__code">
                <span>Промокод</span>
                <strong>{promotion.code}</strong>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Promotions
