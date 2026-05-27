import { useEffect, useState } from 'react'
import './CartButton.css'
import { CART_STORAGE_KEY, fallbackCartItems } from './cartData'

const API_URL = 'https://localhost:7067/api/pizzas'

function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(fallbackCartItems)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const controller = new AbortController()

    async function loadTestCartItem() {
      try {
        setIsLoading(true)
        const response = await fetch(API_URL, {
          headers: {
            accept: '*/*',
          },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load pizzas')
        }

        const pizzas = await response.json()
        const firstPizza = pizzas?.[0]

        if (firstPizza) {
          setItems([{ ...firstPizza, quantity: 1 }])
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setItems(fallbackCartItems)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTestCartItem()

    return () => controller.abort()
  }, [isOpen])

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleOrderClick() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    window.location.assign('/checkout')
  }

  return (
    <div className="cart">
      <button
        className="cart__button"
        type="button"
        aria-expanded={isOpen}
        aria-label="Open cart"
        onClick={() => setIsOpen((current) => !current)}
      >
        <img src="/img/Group 3.png" alt="" />
      </button>

      {isOpen && (
        <div className="cart__window" role="dialog" aria-label="Cart">
          <div className="cart__header">
            <h2>Корзина</h2>
            <button
              className="cart__close"
              type="button"
              aria-label="Close cart"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="cart__items">
            {isLoading ? (
              <p className="cart__message">Загрузка...</p>
            ) : (
              items.map((item) => (
                <article className="cart__item" key={item.id}>
                  <img className="cart__item-image" src={item.imageUrl} alt={item.name} />
                  <div className="cart__item-info">
                    <h3>{item.name}</h3>
                    <span>{item.quantity} шт.</span>
                  </div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </article>
              ))
            )}
          </div>

          <div className="cart__footer">
            <span>Итого</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button className="cart__order" type="button" onClick={handleOrderClick}>
            Заказать
          </button>
        </div>
      )}
    </div>
  )
}

export default CartButton
