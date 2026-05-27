import { useState } from 'react'
import './CheckoutPage.css'
import { CART_STORAGE_KEY, fallbackCartItems } from '../cart/cartData'
import { formatPrice } from '../../utils/priceFormatter'

function getInitialCartItems() {
  const savedItems = localStorage.getItem(CART_STORAGE_KEY)

  if (!savedItems) {
    return fallbackCartItems
  }

  try {
    const parsedItems = JSON.parse(savedItems)
    return Array.isArray(parsedItems) && parsedItems.length > 0 ? parsedItems : fallbackCartItems
  } catch {
    return fallbackCartItems
  }
}

function CheckoutPage() {
  const [isSent, setIsSent] = useState(false)
  const [cartItems] = useState(getInitialCartItems)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleSubmit(event) {
    event.preventDefault()
    setIsSent(true)
  }

  return (
    <section className="checkout">
      <div className="checkout__inner">
        <a className="checkout__back" href="/">
          Вернуться к меню
        </a>

        <div className="checkout__heading">
          <h1>Оформление заказа</h1>
          <p>Заполните данные для доставки, и мы подготовим ваш заказ.</p>
        </div>

        <div className="checkout__content">
          <form className="checkout__form" onSubmit={handleSubmit}>
            <label className="checkout__field">
              <span>Имя</span>
              <input type="text" name="name" placeholder="Ваше имя" required />
            </label>

            <label className="checkout__field">
              <span>Телефон</span>
              <input type="tel" name="phone" placeholder="+380 ..." required />
            </label>

            <label className="checkout__field checkout__field--wide">
              <span>Адрес доставки</span>
              <input type="text" name="address" placeholder="Улица, дом, квартира" required />
            </label>

            <label className="checkout__field">
              <span>Способ оплаты</span>
              <select name="payment" defaultValue="cash">
                <option value="cash">Наличными</option>
                <option value="card">Картой курьеру</option>
                <option value="online">Онлайн</option>
              </select>
            </label>

            <label className="checkout__field checkout__field--wide">
              <span>Комментарий</span>
              <textarea name="comment" placeholder="Домофон, подъезд, пожелания к заказу" rows="4" />
            </label>

            <button className="checkout__submit" type="submit">
              Подтвердить заказ
            </button>

            {isSent && <p className="checkout__success">Заказ принят в тестовом режиме.</p>}
          </form>

          <aside className="checkout__summary" aria-label="Ваш заказ">
            <h2>Ваш заказ</h2>

            <div className="checkout__summary-items">
              {cartItems.map((item) => (
                <article className="checkout__summary-item" key={item.id}>
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.quantity} шт.</span>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </article>
              ))}
            </div>

            <div className="checkout__summary-total">
              <span>Итого</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage
