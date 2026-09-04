import { Router } from 'express'
import * as db from '../db/db_cards.ts'

const router = Router()

router.get('/environment-cards', async (req, res) => {
  try {
    const enCards = await db.getAllEnvironmentCards()
    res.json(enCards)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
