import './AboutUs.css'

const MELLSTROY_PHOTO_URL =
  'https://icdn.lenta.ru/images/2025/02/18/13/20250218135014332/detail_b8b65bfc921c242ee9c94e9a7d7c4fe2.jpg'

function AboutUs() {
  return (
    <section className="about-us-page">
      <div className="about-us-hero">
        <div className="about-us-copy">
          <span className="about-us-kicker">О нас</span>
          <h1>Самая крутая пицца в Одессе</h1>
          <p>
            4epupizza - это горячее тесто, честная начинка и вкус, который
            хочется заказывать снова. Мы делаем пиццу для тех, кто любит
            мощный сыр, хрустящий борт и нормальные порции без скучной экономии.
          </p>
          <p className="about-us-quote">
            Меллстрой советует: если брать пиццу в Одессе, то брать здесь.
          </p>
        </div>

        <figure className="about-us-photo">
          <img src={MELLSTROY_PHOTO_URL} alt="Меллстрой" />
          <figcaption>Mellstroy approved mood</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default AboutUs
