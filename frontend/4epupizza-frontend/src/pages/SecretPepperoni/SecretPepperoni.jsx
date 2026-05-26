import { useEffect, useMemo, useState } from 'react'
import Header from '../../components/header/header'
import './SecretPepperoni.css'

const PIZZAS_API_URL = '/api/pizzas'
const API_ORIGIN = 'https://localhost:7067'

const UI = {
  heading: '\u041f\u0435\u043f\u043f\u0435\u0440\u043e\u043d\u0438 \u0438\u0437 API',
  loading: '\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043c \u0434\u0430\u043d\u043d\u044b\u0435 \u0438\u0437 API...',
  loadError:
    '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435. \u041f\u0440\u043e\u0432\u0435\u0440\u044c, \u0447\u0442\u043e API \u0437\u0430\u043f\u0443\u0449\u0435\u043d \u043d\u0430 https://localhost:7067.',
  notFound:
    '\u0412 API \u043d\u0435 \u043d\u0430\u0448\u043b\u0430\u0441\u044c \u043f\u0438\u0446\u0446\u0430 \u0441 \u043f\u0435\u043f\u043f\u0435\u0440\u043e\u043d\u0438.',
  apiReturned: '\u0418\u0437 API \u043f\u0440\u0438\u0448\u043b\u0438:',
  noPhoto: '\u0424\u043e\u0442\u043e \u043d\u0435 \u043f\u0440\u0438\u0448\u043b\u043e \u0438\u0437 API',
  apiUnavailable: 'API \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d',
  waiting: '\u0416\u0434\u0435\u043c API',
  defaultName: '\u041f\u0435\u043f\u043f\u0435\u0440\u043e\u043d\u0438',
  defaultDescription:
    '\u041f\u0438\u0446\u0446\u0430 \u043f\u0435\u043f\u043f\u0435\u0440\u043e\u043d\u0438 \u0438\u0437 \u043c\u0435\u043d\u044e 4epupizza.',
  id: 'ID',
  cheeseId: 'Cheese ID',
  name: '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435',
  price: '\u0426\u0435\u043d\u0430',
  imageUrl: 'Image URL',
  allData: '\u0412\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u0438\u0446\u0446\u044b',
}

function normalizeText(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replaceAll('\u0451', '\u0435')
}

function getArray(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (Array.isArray(value?.$values)) {
    return value.$values
  }

  return []
}

function getPizzaList(data) {
  if (Array.isArray(data) || Array.isArray(data?.$values)) {
    return getArray(data)
  }

  const possibleLists = [
    getArray(data?.items),
    getArray(data?.pizzas),
    getArray(data?.data),
    getArray(data?.result),
  ]

  return possibleLists.find((list) => list.length > 0) || []
}

function getPizzaName(pizza) {
  return (
    pizza?.Name ||
    pizza?.name ||
    pizza?.title ||
    pizza?.pizzaName ||
    pizza?.pizza_name ||
    pizza?.productName ||
    pizza?.product_name ||
    pizza?.pizzaTitle ||
    ''
  )
}

function getSearchableValue(value) {
  if (Array.isArray(value) || Array.isArray(value?.$values)) {
    return getArray(value).map(getSearchableValue).join(' ')
  }

  if (value && typeof value === 'object') {
    return Object.values(value).map(getSearchableValue).join(' ')
  }

  return normalizeText(value)
}

function isPepperoniPizza(pizza) {
  const searchableText = [
    getPizzaName(pizza),
  ]
    .map(getSearchableValue)
    .join(' ')

  return /pep+eroni|pepperoni|\u043f\u0435\u043f+\u0435\u0440\u043e\u043d[\u0456\u0438]|\u043f\u0435\u043f\u043f\u0435\u0440\u043e\u043d[\u0456\u0438]/i.test(
    searchableText,
  )
}

function formatPrice(value) {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return String(value)
  }

  return new Intl.NumberFormat('ru-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(numericValue)
}

function resolveApiUrl(value) {
  if (!value || typeof value !== 'string') {
    return ''
  }

  if (value.startsWith(API_ORIGIN)) {
    return `/api-assets${value.slice(API_ORIGIN.length)}`
  }

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `/api-assets${value.startsWith('/') ? value : `/${value}`}`
}

function getPizzaImage(pizza) {
  return resolveApiUrl(
    pizza?.ImageUrl ||
      pizza?.imageUrl ||
      pizza?.imageURL ||
      pizza?.imgUrl ||
      pizza?.photoUrl ||
      pizza?.photoURL ||
      pizza?.pictureUrl ||
      pizza?.pictureURL ||
      pizza?.image ||
      pizza?.photo ||
      pizza?.picture ||
      '',
  )
}

function getPizzaId(pizza) {
  return pizza?.Id ?? pizza?.id ?? ''
}

function getCheeseId(pizza) {
  return pizza?.CheeseId ?? pizza?.cheeseId ?? ''
}

function getPizzaPrice(pizza) {
  return pizza?.Price ?? pizza?.price ?? ''
}

function getRawImageUrl(pizza) {
  return pizza?.ImageUrl || pizza?.imageUrl || ''
}

function DetailItem({ label, value }) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return (
    <div>
      <dt>{label}</dt>
      <dd>{String(value)}</dd>
    </div>
  )
}

function SecretPepperoni() {
  const [pizzas, setPizzas] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPizzas() {
      try {
        setStatus('loading')
        setError('')

        const response = await fetch(PIZZAS_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`API status ${response.status}`)
        }

        const data = await response.json()
        setPizzas(getPizzaList(data))
        setStatus('success')
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return
        }

        setError(requestError.message || UI.loadError)
        setStatus('error')
      }
    }

    loadPizzas()

    return () => controller.abort()
  }, [])

  const pepperoni = useMemo(() => pizzas.find(isPepperoniPizza), [pizzas])
  const visibleNames = useMemo(
    () => pizzas.map(getPizzaName).filter(Boolean).slice(0, 10),
    [pizzas],
  )

  const name = pepperoni ? getPizzaName(pepperoni) || UI.defaultName : ''
  const price = pepperoni ? formatPrice(getPizzaPrice(pepperoni)) : ''
  const image = pepperoni ? getPizzaImage(pepperoni) : ''
  const rawImageUrl = pepperoni ? getRawImageUrl(pepperoni) : ''

  return (
    <div className="secret-pepperoni-page">
      <Header />

      <main className="pepperoni-shell">
        <section className="pepperoni-hero" aria-live="polite">
          <div className="pepperoni-copy">
            <span className="pepperoni-kicker">Secret Pepperoni</span>
            <h1>{UI.heading}</h1>

            {status === 'loading' && <p className="pepperoni-status">{UI.loading}</p>}

            {status === 'error' && (
              <>
                <p className="pepperoni-status pepperoni-status--error">{UI.loadError}</p>
                <p className="pepperoni-status pepperoni-status--muted">{error}</p>
              </>
            )}

            {status === 'success' && !pepperoni && (
              <>
                <p className="pepperoni-status">{UI.notFound}</p>
                {visibleNames.length > 0 && (
                  <>
                    <p className="pepperoni-status pepperoni-status--muted">
                      {UI.apiReturned}
                    </p>
                    <ul className="pepperoni-list">
                      {visibleNames.map((pizzaName) => (
                        <li key={pizzaName}>{pizzaName}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}

            {pepperoni && (
              <>
                <p className="pepperoni-description">
                  {UI.defaultDescription}
                </p>

                <dl className="pepperoni-details">
                  <DetailItem label={UI.id} value={getPizzaId(pepperoni)} />
                  <DetailItem label={UI.cheeseId} value={getCheeseId(pepperoni)} />
                  <DetailItem label={UI.name} value={name} />
                  <DetailItem label={UI.price} value={price} />
                  <DetailItem label={UI.imageUrl} value={rawImageUrl} />
                </dl>

                <section className="pepperoni-raw">
                  <h2>{UI.allData}</h2>
                  <pre>{JSON.stringify(pepperoni, null, 2)}</pre>
                </section>
              </>
            )}
          </div>

          <div className="pepperoni-visual">
            {image && <img src={image} alt={name} />}

            {!image && status === 'loading' && (
              <div className="pepperoni-empty-visual">{UI.waiting}</div>
            )}

            {!image && status === 'error' && (
              <div className="pepperoni-empty-visual pepperoni-empty-visual--error">
                {UI.apiUnavailable}
              </div>
            )}

            {!image && status === 'success' && (
              <div className="pepperoni-empty-visual">{UI.noPhoto}</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default SecretPepperoni
