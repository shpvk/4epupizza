import { useEffect, useState } from 'react'
import { INGREDIENTS_API_URL, normalizeIngredient } from './constructorData'

const INGREDIENTS_CACHE_KEY = '4epupizza_ingredients_cache'

let ingredientsCache = readIngredientsCache()
let ingredientsRequest = null

function readIngredientsCache() {
  try {
    const stored = localStorage.getItem(INGREDIENTS_CACHE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // ignore
  }

  return []
}

function saveIngredientsCache(ingredients) {
  ingredientsCache = ingredients

  try {
    localStorage.setItem(INGREDIENTS_CACHE_KEY, JSON.stringify(ingredients))
  } catch {
    // ignore
  }
}

function preloadIngredientImages(ingredients) {
  ingredients.forEach((ingredient) => {
    if (!ingredient.imageUrl) return

    const image = new Image()
    image.src = ingredient.imageUrl
  })
}

async function fetchIngredients(signal) {
  const response = await fetch(INGREDIENTS_API_URL, {
    headers: {
      accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    throw new Error('Failed to load ingredients')
  }

  const data = await response.json()
  const ingredients = data
    .filter((ingredient) => ingredient.isAvailable !== false)
    .map(normalizeIngredient)

  saveIngredientsCache(ingredients)
  preloadIngredientImages(ingredients)

  return ingredients
}

export function preloadIngredients() {
  if (!ingredientsRequest) {
    ingredientsRequest = fetchIngredients()
      .catch((error) => {
        ingredientsRequest = null
        throw error
      })
  }

  return ingredientsRequest
}

export function useIngredients() {
  const [ingredients, setIngredients] = useState(ingredientsCache)
  const [isLoading, setIsLoading] = useState(ingredientsCache.length === 0)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    async function loadIngredients() {
      try {
        setLoadError('')
        setIsLoading(ingredientsCache.length === 0)

        const freshIngredients = ingredientsRequest
          ? await ingredientsRequest
          : await fetchIngredients(controller.signal)

        if (isMounted) {
          setIngredients(freshIngredients)
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          if (ingredientsCache.length > 0) {
            setIngredients(ingredientsCache)
          } else {
            setIngredients([])
            setLoadError('Не вдалося завантажити інгредієнти.')
          }
        }
      } finally {
        if (!controller.signal.aborted && isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadIngredients()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return {
    ingredients,
    isLoading,
    loadError,
  }
}
