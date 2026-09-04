import connection from './connection.ts'
import { EnvironmentCard } from '../../models/card.ts'

// unused for now:
export interface EnvironmentCardData {
  id: number
  suit_id: number
  environment_colour_id: number
}

export async function getAllEnvironmentCards(
  db = connection,
): Promise<EnvironmentCard[]> {
  const cards = await db('environment_deck')
    .join('suits', 'suits.id', 'environment_deck.suit_id')
    .join(
      'environment_colours',
      'environment_colours.id',
      'environment_deck.environment_colour_id',
    )
    .select(
      'environment_deck.id',
      'suits.name as suit',
      'environment_colours.name as environmentColour',
    ) // .orderByRaw('RANDOM()')
  return cards
}
