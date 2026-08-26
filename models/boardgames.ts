export interface BoardgameData {  // BEFORE it's in the DB — no id yet
  name: string
  playerCount: string
  playTime: string
  category: string
  bggRating: string
  personalRating: string
  status: string
}

export interface Boardgame extends BoardgameData {   // FROM the DB — has an id
  id: number
}