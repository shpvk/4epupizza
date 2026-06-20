import { Link } from 'react-router-dom'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useAuth } from '../../context/useAuth'
import { getOrderHistory } from '../../services/orderHistory'
import './Profile.css'

function formatPrice(price) {
  return `${Math.round(Number(price) || 0)} грн`
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return 'Нещодавно'
  }
}

function getInitial(username) {
  return username?.trim()?.charAt(0)?.toUpperCase() || 'U'
}

function Profile() {
  const { user, logout } = useAuth()
  const orders = getOrderHistory(user)
  const totalSpent = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0)
  const favoriteItem = orders
    .flatMap((order) => order.items || [])
    .reduce((favorite, item) => {
      const quantity = Number(item.quantity) || 0
      if (!favorite || quantity > favorite.quantity) {
        return { name: item.name, quantity }
      }
      return favorite
    }, null)

  return (
    <div className="profile-page">
      <Header />
      <main className="profile" aria-labelledby="profile-title">
        <section className="profile-hero">
          <div className="profile-hero__identity">
            <div className="profile-avatar" aria-hidden="true">
              {getInitial(user?.username)}
            </div>
            <div>
              <span className="profile-hero__eyebrow">Особистий кабінет</span>
              <h1 id="profile-title">{user?.username}</h1>
            </div>
          </div>

          <div className="profile-hero__actions">
            <Link to="/" className="profile-action profile-action--primary">
              До меню
            </Link>
            <button className="profile-action profile-action--ghost" type="button" onClick={logout}>
              Вийти
            </button>
          </div>
        </section>

        <section className="profile-stats" aria-label="Статистика профілю">
          <article className="profile-stat">
            <span>Замовлень</span>
            <strong>{orders.length}</strong>
          </article>
          <article className="profile-stat">
            <span>Витрачено</span>
            <strong>{formatPrice(totalSpent)}</strong>
          </article>
          {favoriteItem && (
            <article className="profile-stat">
              <span>Улюблене</span>
              <strong>{favoriteItem.name}</strong>
            </article>
          )}
        </section>

        <section className="profile-layout">
          <aside className="profile-panel" aria-label="Дані профілю">
            <h2>Ваш профіль</h2>
            <div className="profile-info">
              <div>
                <span>Логін</span>
                <strong>{user?.username}</strong>
              </div>
              <div>
                <span>ID</span>
                <strong>{user?.id || 'Локальний акаунт'}</strong>
              </div>
            </div>
          </aside>

          <section className="profile-history" aria-labelledby="history-title">
            <div className="profile-history__header">
              <div>
                <span className="profile-history__eyebrow">Історія</span>
                <h2 id="history-title">Ваші замовлення</h2>
              </div>
              {orders.length > 0 && <span className="profile-history__count">{orders.length}</span>}
            </div>

            {orders.length === 0 ? (
              <div className="profile-empty">
                <h3>Замовлень ще немає</h3>
                <p>Після оформлення покупки вона з'явиться тут із сумою, адресою та складом.</p>
                <Link to="/" className="profile-empty__link">
                  Обрати піцу
                </Link>
              </div>
            ) : (
              <div className="profile-orders">
                {orders.map((order, index) => (
                  <article className="profile-order" key={order.id}>
                    <div className="profile-order__top">
                      <div>
                        <span className="profile-order__number">Замовлення #{orders.length - index}</span>
                        <h3>{formatDate(order.createdAt)}</h3>
                      </div>
                      <span className="profile-order__status">{order.status}</span>
                    </div>

                    <div className="profile-order__meta">
                      <span>{order.address}</span>
                      <strong>{formatPrice(order.totalPrice)}</strong>
                    </div>

                    <div className="profile-order__items">
                      {(order.items || []).map((item) => (
                        <div className="profile-order-item" key={`${order.id}-${item.id}`}>
                          <span>{item.name}</span>
                          <strong>
                            {item.quantity} x {formatPrice(item.price)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
