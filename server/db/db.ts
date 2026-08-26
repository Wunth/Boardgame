import { Boardgame, BoardgameData } from '../../models/boardgames'
import db from './connection'

const columns = [
  'id',
  'name',
  'player_count as playerCount',
  'play_time as playTime',
  'category',
  'bgg_rating as bggRating',
  'personal_rating as personalRating',
  'status',
  'bgg_objectid as bggObjectid',
]

// get all games from database
export async function getBoardgames() {
  const result = await db('boardgames')
    .select(...columns)
    .orderBy('name')
  return result as Boardgame[]
}

// get game from database by id
export async function getBoardgameById(id: number) {
  const result = await db('boardgames')
    .select(...columns)
    .where({ id })
    .first()
  return result
}

// delete a game (non-destructive)
// get game from database by id
export async function deleteBoardgameById(id: number) {
  // check first with getBoardgameById(id)
  return db('boardgames').where({ id }).del()
}

// create a game (post)
export async function addBoardgame(data: BoardgameData) {
  //console.log(data)
  const result = await db('boardgames')
    .insert({
      name: data.name,
      player_count: data.playerCount,
      play_time: data.playTime,
      category: data.category,
      bgg_rating: data.bggRating,
      personal_rating: data.personalRating,
      status: data.status,
      bgg_objectid: data.bggObjectid,
    })
    .returning(columns)

  return result[0] as Boardgame
}

// edit a game (patch)
// TODO: Update a bird
// data to test postman post
// {
//     "name": "5-Minute Dungeon",
//     "playerCount": "2-5",
//     "playTime": "5-30",
//     "category": "",
//     "personalRating": "",
//     "bggRating": "6.89",
//     "status": "owned (for trade)"
// }

export async function updateBoardgame(
  id: number,
  data: Partial<BoardgameData>,
) {
  const result = await db('boardgames')
    .where({ id })
    .update({
      name: data.name,
      player_count: data.playerCount,
      play_time: data.playTime,
      category: data.category,
      personal_rating: data.personalRating,
      bgg_rating: data.bggRating,
      status: data.status,
      bgg_objectid: data.bggObjectid,
    })
    .returning(columns)

  return result[0] as Boardgame
}
