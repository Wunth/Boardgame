import { useEffect, useState } from 'react'
import type { RecipeCard } from '../../models/card.ts'
import { generateRecipeCatalog } from '../helpers/RecipeCards.ts'
import { fisherYatesShuffle } from '../helpers/shuffle.ts'
import { loadSaved, saveState } from '../helpers/persistedState.ts'

type RecipePiles = {
  drawDeck: RecipeCard[]
  recipeRow: RecipeCard[]
}

const RECIPE_ROW_SIZE = 5
const RECIPE_CARDS_STORAGE_KEY = 'dapple-recipe-cards'

const RECIPE_CATALOG = generateRecipeCatalog()

export function useRecipeCards() {
  const [piles, setPiles] = useState<RecipePiles | undefined>(() =>
    loadSaved<RecipePiles>(RECIPE_CARDS_STORAGE_KEY),
  )

  if (!piles) {
    setPiles({
      drawDeck: fisherYatesShuffle(RECIPE_CATALOG),
      recipeRow: [],
    })
  }

  useEffect(() => {
    if (piles) {
      saveState(RECIPE_CARDS_STORAGE_KEY, piles)
    }
  }, [piles])

  const startOver = () => {
    setPiles({
      drawDeck: fisherYatesShuffle(RECIPE_CATALOG),
      recipeRow: [],
    })
  }

  const dealRecipeRow = () => {
    setPiles((prev) => {
      if (!prev) return prev
      if (prev.recipeRow.length > 0) return prev // already dealt

      return {
        drawDeck: prev.drawDeck.slice(RECIPE_ROW_SIZE),
        recipeRow: prev.drawDeck.slice(0, RECIPE_ROW_SIZE),
      }
    })
  }

  return {
    recipeDeck: piles?.drawDeck,
    recipeRow: piles?.recipeRow,
    startOver,
    dealRecipeRow,
  }
}
