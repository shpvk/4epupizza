import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './PizzaConstructorPage.css'
import { formatPrice } from '../../utils/priceFormatter'
import { CART_STORAGE_KEY } from '../cart/cartData'

const INGREDIENTS_API_URL = '/api/ingredients'
const API_FALLBACK_IMAGE_URL = '/img/cart.png'

const categoryLabels = {
  1: 'Мясо',
  2: 'Грибы',
  3: 'Сыр',
  4: 'Соус',
}

const apiFallbackIngredients = [
  {
    id: 'fallback-cheese',
    label: 'Тестовый сыр',
    price: 1.5,
    imageUrl: API_FALLBACK_IMAGE_URL,
    category: 3,
    categoryLabel: categoryLabels[3],
    size: getIngredientSize(3),
  },
  {
    id: 'fallback-mushrooms',
    label: 'Тестовые грибы',
    price: 1.3,
    imageUrl: API_FALLBACK_IMAGE_URL,
    category: 2,
    categoryLabel: categoryLabels[2],
    size: getIngredientSize(2),
  },
]

function normalizeIngredient(ingredient) {
  return {
    id: String(ingredient.id),
    label: ingredient.name,
    price: Number(ingredient.price),
    imageUrl: ingredient.imageUrl,
    category: ingredient.category,
    categoryLabel: categoryLabels[ingredient.category] || 'Другое',
    size: getIngredientSize(ingredient.category),
  }
}

function getIngredientSize(category) {
  if (category === 4) {
    return 220
  }

  if (category === 3) {
    return 130
  }

  if (category === 2) {
    return 430
  }

  return 78
}

function magnetizePosition(position, stageElement, partSize) {
  const stageWidth = stageElement.clientWidth
  const stageHeight = stageElement.clientHeight
  const centerX = stageWidth / 2
  const centerY = stageHeight / 2
  const circleRadius = Math.min(stageWidth, stageHeight) * 0.42
  const partCenterX = position.x + partSize / 2
  const partCenterY = position.y + partSize / 2
  const distanceX = partCenterX - centerX
  const distanceY = partCenterY - centerY
  const distance = Math.hypot(distanceX, distanceY)

  if (distance <= circleRadius) {
    return position
  }

  const ratio = circleRadius / distance

  return {
    x: centerX + distanceX * ratio - partSize / 2,
    y: centerY + distanceY * ratio - partSize / 2,
  }
}

function getDropPosition(event, stageElement, partSize) {
  const rect = stageElement.getBoundingClientRect()
  const position = {
    x: event.clientX - rect.left - partSize / 2,
    y: event.clientY - rect.top - partSize / 2,
  }

  return magnetizePosition(position, stageElement, partSize)
}

function PizzaConstructorPage() {
  const stageRef = useRef(null)
  const trashRef = useRef(null)
  const paletteDragRef = useRef(null)
  const [ingredients, setIngredients] = useState([])
  const [placedParts, setPlacedParts] = useState([])
  const [draggedPart, setDraggedPart] = useState(null)
  const [paletteDrag, setPaletteDrag] = useState(null)
  const [isTrashActive, setIsTrashActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadIngredients() {
      try {
        setIsLoading(true)
        setLoadError('')

        const response = await fetch(INGREDIENTS_API_URL, {
          headers: {
            accept: '*/*',
          },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load ingredients')
        }

        const data = await response.json()
        const availableIngredients = data
          .filter((ingredient) => ingredient.isAvailable && ingredient.imageUrl)
          .map(normalizeIngredient)

        setIngredients(availableIngredients)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setIngredients(apiFallbackIngredients)
          setLoadError('API недоступен, показаны тестовые ингредиенты')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadIngredients()

    return () => controller.abort()
  }, [])

  const totalPrice = useMemo(
    () => placedParts.reduce((sum, placedPart) => sum + placedPart.price, 0),
    [placedParts],
  )

  const addPart = useCallback((partId, position) => {
    const part = ingredients.find((item) => item.id === partId)

    if (!part) {
      return
    }

    setPlacedParts((current) => [
      ...current,
      {
        ...part,
        placedId: `${part.id}-${Date.now()}-${current.length}`,
        x: position.x,
        y: position.y,
      },
    ])
  }, [ingredients])

  const draggedPalettePart = useMemo(
    () => ingredients.find((item) => item.id === paletteDrag?.partId),
    [ingredients, paletteDrag],
  )

  useEffect(() => {
    if (!paletteDrag) {
      return
    }

    function handleWindowPointerMove(event) {
      paletteDragRef.current = {
        ...paletteDragRef.current,
        x: event.clientX,
        y: event.clientY,
      }

      setPaletteDrag((current) =>
        current
          ? {
              ...current,
              x: event.clientX,
              y: event.clientY,
            }
          : current,
      )
    }

    function handleWindowPointerUp(event) {
      const currentDrag = paletteDragRef.current
      const part = ingredients.find((item) => item.id === currentDrag?.partId)

      if (part && stageRef.current) {
        const stageRect = stageRef.current.getBoundingClientRect()
        const isOverStage =
          event.clientX >= stageRect.left &&
          event.clientX <= stageRect.right &&
          event.clientY >= stageRect.top &&
          event.clientY <= stageRect.bottom

        if (isOverStage) {
          addPart(part.id, getDropPosition(event, stageRef.current, part.size))
        }
      }

      paletteDragRef.current = null
      setPaletteDrag(null)
    }

    window.addEventListener('pointermove', handleWindowPointerMove)
    window.addEventListener('pointerup', handleWindowPointerUp)

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove)
      window.removeEventListener('pointerup', handleWindowPointerUp)
    }
  }, [addPart, ingredients, paletteDrag])

  function handlePaletteDragStart(event, partId) {
    event.dataTransfer.setData('text/plain', partId)
    event.dataTransfer.effectAllowed = 'copy'
  }

  function handlePalettePointerDown(event, partId) {
    if (event.button !== 0) {
      return
    }

    event.preventDefault()

    const nextDrag = {
      partId,
      x: event.clientX,
      y: event.clientY,
    }

    paletteDragRef.current = nextDrag
    setPaletteDrag(nextDrag)
  }

  function handlePaletteDoubleClick(partId) {
    const part = ingredients.find((item) => item.id === partId)

    if (!part) {
      return
    }

    addPart(partId, {
      x: 170 - part.size / 2,
      y: 170 - part.size / 2,
    })
  }

  function handleStageDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  function handleStageDrop(event) {
    event.preventDefault()

    const partId = event.dataTransfer.getData('text/plain')
    const part = ingredients.find((item) => item.id === partId)

    if (!part || !stageRef.current) {
      return
    }

    addPart(partId, getDropPosition(event, stageRef.current, part.size))
  }

  function handlePlacedPointerDown(event, placedPart) {
    if (!stageRef.current) {
      return
    }

    const stageRect = stageRef.current.getBoundingClientRect()

    setDraggedPart({
      placedId: placedPart.placedId,
      offsetX: event.clientX - stageRect.left - placedPart.x,
      offsetY: event.clientY - stageRect.top - placedPart.y,
    })
  }

  function isPointerOverTrash(event) {
    if (!trashRef.current) {
      return false
    }

    const trashRect = trashRef.current.getBoundingClientRect()

    return (
      event.clientX >= trashRect.left &&
      event.clientX <= trashRect.right &&
      event.clientY >= trashRect.top &&
      event.clientY <= trashRect.bottom
    )
  }

  function handleStagePointerMove(event) {
    if (!draggedPart || !stageRef.current) {
      return
    }

    const stageRect = stageRef.current.getBoundingClientRect()
    setIsTrashActive(isPointerOverTrash(event))

    setPlacedParts((current) =>
      current.map((part) =>
        part.placedId === draggedPart.placedId
          ? {
              ...part,
              ...magnetizePosition(
                {
                  x: event.clientX - stageRect.left - draggedPart.offsetX,
                  y: event.clientY - stageRect.top - draggedPart.offsetY,
                },
                stageRef.current,
                part.size,
              ),
            }
          : part,
      ),
    )
  }

  function stopMovingPart(event) {
    if (draggedPart && isPointerOverTrash(event)) {
      setPlacedParts((current) => current.filter((part) => part.placedId !== draggedPart.placedId))
    }

    setDraggedPart(null)
    setIsTrashActive(false)
  }

  function handleImageError(event) {
    event.currentTarget.style.display = 'none'
  }

  function handleOrderClick() {
    if (placedParts.length === 0) {
      return
    }

    const firstImage = placedParts.find((part) => part.imageUrl)?.imageUrl || API_FALLBACK_IMAGE_URL

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'custom-pizza',
          name: 'Custom Pizza',
          price: totalPrice,
          imageUrl: firstImage,
          quantity: 1,
        },
      ]),
    )

    window.location.assign('/checkout')
  }

  return (
    <section className="pizza-constructor">
      <div className="pizza-constructor__inner">
        <div className="pizza-constructor__workspace">
          <div
            className="pizza-constructor__stage"
            ref={stageRef}
            onDragOver={handleStageDragOver}
            onDrop={handleStageDrop}
            onPointerMove={handleStagePointerMove}
            onPointerUp={stopMovingPart}
            onPointerLeave={stopMovingPart}
          >
            <div className="pizza-constructor__target">
              {placedParts.length === 0 && <span>Перетащите сюда ингредиенты</span>}
            </div>

            {placedParts.map((part) => (
              <button
                className={`pizza-constructor__placed-part pizza-constructor__placed-part--category-${part.category}`}
                type="button"
                key={part.placedId}
                style={{
                  left: `${part.x}px`,
                  top: `${part.y}px`,
                  width: `${part.size}px`,
                  height: `${part.size}px`,
                }}
                onPointerDown={(event) => handlePlacedPointerDown(event, part)}
                aria-label={`Переместить ${part.label}`}
              >
                <img
                  src={part.imageUrl}
                  alt={part.label}
                  draggable="false"
                  onError={handleImageError}
                />
              </button>
            ))}

            {draggedPart && (
              <div
                className={isTrashActive ? 'pizza-constructor__trash is-active' : 'pizza-constructor__trash'}
                ref={trashRef}
                aria-label="Удалить ингредиент"
              >
                <span>Удалить</span>
              </div>
            )}
          </div>

          <button
            className="pizza-constructor__clear"
            type="button"
            onClick={() => setPlacedParts([])}
            disabled={placedParts.length === 0}
          >
            Очистить
          </button>

          <div className="pizza-constructor__heading">
            <h1>Конструктор пиццы</h1>
            <p>Перетащите ингредиенты на рабочее поле. Уже добавленные элементы можно двигать по месту.</p>
          </div>
        </div>

        <div className="pizza-constructor__panel">
          <section className="pizza-constructor__section">
            <h2>Ингредиенты</h2>
            {isLoading && <p className="pizza-constructor__status">Загрузка...</p>}
            {loadError && <p className="pizza-constructor__status">{loadError}</p>}
            <div className="pizza-constructor__parts">
              {ingredients.map((part) => (
                <button
                  className="pizza-constructor__part"
                  type="button"
                  key={part.id}
                  draggable={false}
                  onPointerDown={(event) => handlePalettePointerDown(event, part.id)}
                  onDragStart={(event) => handlePaletteDragStart(event, part.id)}
                  onDoubleClick={() => handlePaletteDoubleClick(part.id)}
                >
                  <img
                    src={part.imageUrl}
                    alt=""
                    draggable="false"
                    onError={handleImageError}
                  />
                  <span>{part.label}</span>
                  <small>{part.categoryLabel}</small>
                  <strong>{formatPrice(part.price)}</strong>
                </button>
              ))}
            </div>
          </section>

          <div className="pizza-constructor__summary">
            <div>
              <span>В составе</span>
              <strong>{placedParts.length} шт.</strong>
            </div>
            <div>
              <span>Итого</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <button type="button" onClick={handleOrderClick} disabled={placedParts.length === 0}>
              Заказать
            </button>
          </div>
        </div>
      </div>

      {paletteDrag && draggedPalettePart && (
        <div
          className="pizza-constructor__drag-preview"
          style={{
            left: `${paletteDrag.x}px`,
            top: `${paletteDrag.y}px`,
            width: `${draggedPalettePart.size}px`,
            height: `${draggedPalettePart.size}px`,
          }}
        >
          <img src={draggedPalettePart.imageUrl} alt="" draggable="false" onError={handleImageError} />
        </div>
      )}
    </section>
  )
}

export default PizzaConstructorPage
