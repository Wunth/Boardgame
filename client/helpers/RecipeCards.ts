import type { GemColour, RecipeCard } from '../../models/card.ts'

const GEM_COLOURS: GemColour[] = ['red', 'blue', 'yellow', 'white', 'green']

export function generateRecipeCatalog(): RecipeCard[] {
  const catalog: RecipeCard[] = []
  let id = 0

  for (let i = 0; i < GEM_COLOURS.length; i++) {
    for (let j = i; j < GEM_COLOURS.length; j++) {
      for (let k = j; k < GEM_COLOURS.length; k++) {
        for (let l = k; l < GEM_COLOURS.length; l++) {
          const allSame = i === j && j === k && k === l
          if (allSame) continue

          catalog.push({
            id: id++,
            gems: [
              GEM_COLOURS[i],
              GEM_COLOURS[j],
              GEM_COLOURS[k],
              GEM_COLOURS[l],
            ],
          })
        }
      }
    }
  }

  return catalog
}
