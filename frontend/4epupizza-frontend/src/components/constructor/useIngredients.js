import { useEffect, useState } from 'react'
import { INGREDIENTS_API_URL, normalizeIngredient } from './constructorData'

export function useIngredients() {
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadIngredients() {
      try {
        setIsLoading(true)
        setLoadError('')

        const response = await fetch(INGREDIENTS_API_URL, {
          headers: {
            accept: 'application/json',
          },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load ingredients')
        }

        const data = await response.json()
        const availableIngredients = data
          .filter((ingredient) => ingredient.isAvailable !== false)
          .map(normalizeIngredient)

        setIngredients(availableIngredients)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setIngredients([])
          setLoadError('Не вдалося завантажити інгредієнти.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadIngredients()

    return () => controller.abort()
  }, [])

  return {
    ingredients,
    isLoading,
    loadError,
  }
}
