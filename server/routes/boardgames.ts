import express from 'express'
// import { boardgame } from '../../models/boardgames'
import * as db from '../db/db'

const router = express.Router()

// GET /api/v1/boardgames
router.get('/', async (req, res) => {
  try {
    const games = await db.getBoardgames()
    res.json(games)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/boardgames/id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const game = await db.getBoardgameById(id)
    res.json(game)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

// DELETE /api/v1/boardgames/id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!id) {
    console.error(id + ' is an invalid id')
    return res.status(400).send('Bad request')
  }
  try {
    await db.deleteBoardgameById(id)

    res.status(200).send()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

// POST http://localhost:3000/api/v1/boardgames
// {
//     "name": "5-Minute Dungeon",
//     "playerCount": "2-5",
//     "playTime": "5-30",
//     "category": "",
//     "personalRating": "",
//     "bggRating": "6.89",
//     "status": "owned (for trade)"
// }
router.post('/', async (req, res) => {
  try {
    const boardgame = await db.addBoardgame(req.body)

    res.status(201).json(boardgame)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

// PATCH

export default router
