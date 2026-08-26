import request from 'superagent'
import { Boardgame, BoardgameData } from '../../models/boardgames'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getBoardgames() {
  const response = await request.get(`${rootURL}/boardgames`)
  //console.log(response.type, response.body, response.text)
  return response.body as Boardgame[]
}

export async function getBoardgameById(id: number) {
  const response = await request.get(`${rootURL}/boardgames/${id}`)
  return response.body as Boardgame
}

// Create a bird via my API
export async function createBoardgame(data: BoardgameData) {
  const response = await request.post(`${rootURL}/boardgames`).send(data)
  return response.body as Boardgame
}

// Delete bird by ID from my API
export async function deleteBoardgame(id: number) {
  await request.delete(`${rootURL}/boardgames/${id}`)
}

// UPDATE
export async function updateBoardgame(id: number, data: BoardgameData) {
  const response = await request.patch(`${rootURL}/boardgames/${id}`).send(data)
  return response.body as Boardgame
}
