import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getEnvironmentCards } from '../apis/environmentCards.ts'
import { EnvironmentCard } from '../../models/card.ts'
import { fisherYatesShuffle } from '../helpers/shuffle.ts'
import { loadSaved, saveState } from '../helpers/persistedState.ts'

type Piles = {
  drawDeck: EnvironmentCard[]
  playArea: EnvironmentCard[]
  playerFarRow: EnvironmentCard[]
  playerNearRow: EnvironmentCard[]
  playerHand: EnvironmentCard[]
}

const PLAYER_COUNT = 2
const PLAY_AREA_SIZE = PLAYER_COUNT + 1
const FAR_ROW_SIZE = PLAYER_COUNT + 2
const NEAR_ROW_SIZE = PLAYER_COUNT + 1
const HAND_SIZE = PLAYER_COUNT

const ENVIRONMENT_CARDS_STORAGE_KEY = 'dapple-environment-cards'

export function useEnvironmentCards() {
  const query = useQuery({
    queryKey: ['environmentCards'],
    queryFn: getEnvironmentCards,
    staleTime: Infinity,
  })

  const [piles, setPiles] = useState<Piles | undefined>(() =>
    loadSaved<Piles>(ENVIRONMENT_CARDS_STORAGE_KEY),
  )

  if (query.data && !piles) {
    setPiles({
      drawDeck: fisherYatesShuffle(query.data),
      playArea: [],
      playerFarRow: [],
      playerNearRow: [],
      playerHand: [],
    })
  }

  useEffect(() => {
    if (piles) {
      saveState(ENVIRONMENT_CARDS_STORAGE_KEY, piles)
    }
  }, [piles])

  const startOver = () => {
    if (query.data) {
      setPiles({
        drawDeck: fisherYatesShuffle(query.data),
        playArea: [],
        playerFarRow: [],
        playerNearRow: [],
        playerHand: [],
      })
    }
  }

  const dealStartingCards = () => {
    setPiles((prev) => {
      if (!prev) return prev
      if (prev.playArea.length > 0) return prev // already dealt

      return {
        ...prev,
        drawDeck: prev.drawDeck.slice(PLAY_AREA_SIZE),
        playArea: prev.drawDeck.slice(0, PLAY_AREA_SIZE),
      }
    })
  }

  const dealToFarRow = () => {
    setPiles((prev) => {
      if (!prev) return prev
      if (prev.playerFarRow.length > 0 || prev.playerNearRow.length > 0)
        return prev // already dealt
      if (prev.playArea.length < PLAY_AREA_SIZE) return prev // deal starting cards first

      const farRowCards = prev.drawDeck.slice(0, FAR_ROW_SIZE)

      const nearRowCards = prev.drawDeck.slice(
        FAR_ROW_SIZE,
        FAR_ROW_SIZE + NEAR_ROW_SIZE,
      )
      const handCards = prev.drawDeck.slice(
        FAR_ROW_SIZE + NEAR_ROW_SIZE,
        FAR_ROW_SIZE + NEAR_ROW_SIZE + HAND_SIZE,
      )
      const remaining = prev.drawDeck.slice(
        FAR_ROW_SIZE + NEAR_ROW_SIZE + HAND_SIZE,
      )

      return {
        ...prev,
        drawDeck: remaining,
        playerFarRow: farRowCards,
        playerNearRow: nearRowCards,
        playerHand: handCards,
      }
    })
  }

  return {
    ...query,
    drawDeck: piles?.drawDeck,
    playArea: piles?.playArea,
    playerFarRow: piles?.playerFarRow,
    playerNearRow: piles?.playerNearRow,
    playerHand: piles?.playerHand,
    startOver,
    dealStartingCards,
    dealToFarRow,
  }
}
