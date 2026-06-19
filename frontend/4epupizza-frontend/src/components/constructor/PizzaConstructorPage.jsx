import { useMemo, useState } from 'react'
import Header from '../header/header'
import {
  BASE_PIZZA_PRICE,
  categoryDescriptions,
  categoryLabels,
  categoryOrder,
} from './constructorData'
import { useIngredients } from './useIngredients'
import { useCart } from '../../context/CartContext'
import './PizzaConstructorPage.css'

function formatConstructorPrice(price) {
  return `${Math.round(Number(price) || 0)} грн`
}

function groupIngredientsByCategory(ingredients) {
  return ingredients.reduce((groups, ingredient) => {
    const key = ingredient.categoryKey || ingredient.category

    return {
      ...groups,
      [key]: [...(groups[key] || []), ingredient],
    }
  }, {})
}

function PizzaConstructorPage() {
  const { ingredients, isLoading, loadError } = useIngredients()
  const [selectedCounts, setSelectedCounts] = useState({})
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const groupedIngredients = useMemo(() => groupIngredientsByCategory(ingredients), [ingredients])
  const dynamicCategoryOrder = useMemo(() => {
    const apiCategories = Object.keys(groupedIngredients).filter((category) => !categoryOrder.includes(category))
    return [...categoryOrder, ...apiCategories]
  }, [groupedIngredients])

  const selectedIngredients = useMemo(
    () =>
      ingredients
        .map((ingredient) => ({
          ...ingredient,
          count: selectedCounts[ingredient.id] || 0,
        }))
        .filter((ingredient) => ingredient.count > 0),
    [ingredients, selectedCounts],
  )

  const ingredientsPrice = useMemo(
    () => selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price * ingredient.count, 0),
    [selectedIngredients],
  )

  const totalPrice = BASE_PIZZA_PRICE + ingredientsPrice
  const selectedTotal = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.count, 0)

  function addIngredient(ingredientId) {
    setSelectedCounts((current) => ({
      ...current,
      [ingredientId]: (current[ingredientId] || 0) + 1,
    }))
  }

  function removeIngredient(ingredientId) {
    setSelectedCounts((current) => {
      const nextCount = Math.max((current[ingredientId] || 0) - 1, 0)

      if (nextCount === 0) {
        const rest = { ...current }
        delete rest[ingredientId]
        return rest
      }

      return {
        ...current,
        [ingredientId]: nextCount,
      }
    })
  }

  function clearPizza() {
    setSelectedCounts({})
  }

  function handleAddToCart() {
    const ingredientNames = selectedIngredients.map((i) => i.label)
    addItem({
      id: 'custom-pizza-' + Date.now(),
      name: 'Піца з конструктора',
      description: ingredientNames.length > 0 ? ingredientNames.join(', ') : 'Класична основа',
      price: totalPrice,
      quantity: 1,
      ingredients: ingredientNames,
    })
    setSelectedCounts({})
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  function handleImageError(event) {
    event.currentTarget.classList.add('is-hidden')
  }

  return (
    <div className="pizza-constructor-page">
      <Header />
      <section className="pizza-constructor" aria-labelledby="constructor-title">
        <div className="pizza-constructor__inner">
          <div className="pizza-constructor__content">
            <div className="pizza-constructor__topline">
              <div>
                <span className="pizza-constructor__eyebrow">Конструктор піци</span>
                <h1 id="constructor-title">Зберіть свою піцу</h1>
              </div>
              <button
                className="pizza-constructor__clear"
                type="button"
                onClick={clearPizza}
                disabled={selectedTotal === 0}
              >
                Очистити
              </button>
            </div>

            <section className="pizza-constructor__section">
              <div className="pizza-constructor__section-head">
                <h2>Інгредієнти</h2>
                {isLoading && <span>Завантаження...</span>}
              </div>

              {loadError && <p className="pizza-constructor__status">{loadError}</p>}

              <div className="pizza-constructor__parts">
                <div className="pizza-constructor__category">
                  <div className="pizza-constructor__category-head">
                    <h3>Основа</h3>
                    <p>Базова ціна піци без додаткових інгредієнтів</p>
                  </div>
                  <article className="pizza-constructor__base-option">
                    <span>Класична основа</span>
                    <strong>{formatConstructorPrice(BASE_PIZZA_PRICE)}</strong>
                  </article>
                </div>

                {dynamicCategoryOrder.map((category) => {
                  const parts = groupedIngredients[category]

                  if (!parts?.length) {
                    return null
                  }

                  return (
                    <div className="pizza-constructor__category" key={category}>
                      <div className="pizza-constructor__category-head">
                        <h3>{categoryLabels[category] || category}</h3>
                        <p>{categoryDescriptions[category] || `Інгредієнти категорії ${category}`}</p>
                      </div>
                      <div className="pizza-constructor__category-grid">
                        {parts.map((part) => {
                          const count = selectedCounts[part.id] || 0

                          return (
                            <article
                              className={count > 0 ? 'pizza-constructor__part is-selected' : 'pizza-constructor__part'}
                              key={part.id}
                            >
                              <span className="pizza-constructor__part-image">
                                <img src={part.imageUrl} alt="" onError={handleImageError} />
                              </span>
                              <span className="pizza-constructor__part-name">{part.label}</span>
                              <strong>{formatConstructorPrice(part.price)}</strong>
                              <div className="pizza-constructor__counter" aria-label={`Кількість ${part.label}`}>
                                <button
                                  type="button"
                                  onClick={() => removeIngredient(part.id)}
                                  disabled={count === 0}
                                  aria-label={`Прибрати ${part.label}`}
                                >
                                  −
                                </button>
                                <span>{count}</span>
                                <button
                                  type="button"
                                  onClick={() => addIngredient(part.id)}
                                  aria-label={`Додати ${part.label}`}
                                >
                                  +
                                </button>
                              </div>
                            </article>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          <aside className="pizza-constructor__panel" aria-label="Вибір інгредієнтів і підсумок">
            <section className="pizza-constructor__summary">
              <div>
                <span>Основа</span>
                <strong>{formatConstructorPrice(BASE_PIZZA_PRICE)}</strong>
              </div>
              <div>
                <span>Разом</span>
                <strong>{formatConstructorPrice(totalPrice)}</strong>
              </div>
            </section>

            <section className="pizza-constructor__composition">
              <h2>Склад</h2>
              <ul>
                <li>
                  <span>Класична основа</span>
                  <strong>{formatConstructorPrice(BASE_PIZZA_PRICE)}</strong>
                </li>
                {selectedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    <span>{ingredient.label}</span>
                    <strong>
                      {ingredient.count} × {formatConstructorPrice(ingredient.price)}
                    </strong>
                  </li>
                ))}
              </ul>
            </section>

            <button
              type="button"
              className="pizza-constructor__add-to-cart"
              onClick={handleAddToCart}
              id="add-custom-pizza-to-cart"
            >
              Додати до кошика — {formatConstructorPrice(totalPrice)}
            </button>

            {addedToCart && (
              <div className="pizza-constructor__toast">
                ✓ Піцу додано до кошика!
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  )
}

export default PizzaConstructorPage
