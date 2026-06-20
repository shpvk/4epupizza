import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useCart } from '../../context/CartContext'
import { getAuthHeader } from '../../services/authApi'
import './Order.css'

const ORDER_API_URL = '/api/order'

function formatPrice(price) {
  return `${Math.round(Number(price) || 0)} грн`
}

function getPizzaId(item) {
  if (item.pizzaId !== undefined) {
    return Number(item.pizzaId) || 0
  }

  return Number(item.id) || 0
}

function buildOrderItems(items) {
  return items.map((item) => {
    const ingredientIds = (item.ingredientIds || []).map((id) => Number(id)).filter(Number.isFinite)

    if (String(item.id).startsWith('custom-pizza-')) {
      return {
        ingredientIds,
        quantity: item.quantity,
      }
    }

    return {
      pizzaId: getPizzaId(item),
      ingredientIds,
      quantity: item.quantity,
    }
  })
}

function Order() {
  const navigate = useNavigate()
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    address: '',
    comment: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deliveryPrice = totalPrice >= 500 || totalItems === 0 ? 0 : 59
  const finalPrice = totalPrice + deliveryPrice
  const orderItems = useMemo(() => buildOrderItems(items), [items])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (items.length === 0) {
      setStatus({ type: 'error', message: 'Кошик порожній. Додайте піцу перед оформленням.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          customerName: form.customerName.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          comment: form.comment.trim(),
          items: orderItems,
        }),
      })

      if (!response.ok) {
        throw new Error('Order request failed')
      }

      clearCart()
      setStatus({ type: 'success', message: 'Замовлення прийнято. Дякуємо!' })
      setTimeout(() => navigate('/'), 1500)
    } catch {
      setStatus({
        type: 'error',
        message: 'Не вдалося оформити замовлення. Перевірте дані та спробуйте ще раз.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="order-page">
      <Header />
      <main className="order" aria-labelledby="order-title">
        <section className="order__hero">
          <div>
            <span className="order__eyebrow">Доставка 4epupizza</span>
            <h1 id="order-title">Оформлення замовлення</h1>
            <p>Залиште контакти, адресу та коментар для кур'єра.</p>
          </div>
          <Link to="/cart" className="order__back">
            До кошика
          </Link>
        </section>

        <div className="order__layout">
          <form className="order-form" onSubmit={handleSubmit}>
            <label className="order-field">
              <span>Ім'я</span>
              <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={updateField}
                autoComplete="name"
                placeholder="Олександр"
                required
              />
            </label>

            <label className="order-field">
              <span>Телефон</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
                inputMode="tel"
                placeholder="+380 99 123 45 67"
                required
              />
            </label>

            <label className="order-field">
              <span>Адреса</span>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={updateField}
                autoComplete="street-address"
                placeholder="Одеса, вул. Дерибасівська, 12"
                required
              />
            </label>

            <label className="order-field">
              <span>Коментар</span>
              <textarea
                name="comment"
                value={form.comment}
                onChange={updateField}
                placeholder="Під'їзд, поверх, домофон або побажання до замовлення"
                rows="5"
              />
            </label>

            {status.message && (
              <p className={`order-status order-status--${status.type}`} role="status">
                {status.message}
              </p>
            )}

            <button className="order-form__submit" type="submit" disabled={isSubmitting || items.length === 0}>
              {isSubmitting ? 'Оформлюємо...' : 'Підтвердити замовлення'}
            </button>
          </form>

          <aside className="order-summary" aria-label="Підсумок замовлення">
            <h2>Ваше замовлення</h2>

            {items.length === 0 ? (
              <div className="order-summary__empty">
                <p>Кошик порожній.</p>
                <Link to="/">До меню</Link>
              </div>
            ) : (
              <div className="order-summary__items">
                {items.map((item) => (
                  <article className="order-summary__item" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>
                      {item.description && <p>{item.description}</p>}
                    </div>
                    <strong>
                      {item.quantity} × {formatPrice(item.price)}
                    </strong>
                  </article>
                ))}
              </div>
            )}

            <div className="order-summary__rows">
              <div>
                <span>Товари ({totalItems})</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <div>
                <span>Доставка</span>
                <strong>{deliveryPrice === 0 ? 'Безкоштовно' : formatPrice(deliveryPrice)}</strong>
              </div>
              <div className="order-summary__total">
                <span>Разом</span>
                <strong>{formatPrice(finalPrice)}</strong>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Order
