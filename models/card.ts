export interface EnvironmentCard {
  id: number
  suit: string
  environmentColour: string
}

export type GemColour = 'red' | 'blue' | 'yellow' | 'white' | 'green'

export interface RecipeCard {
  id: number
  gems: GemColour[] // always length 4, canonically ordered, never all four identical
}
