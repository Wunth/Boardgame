import connection from './connection.ts'
import { EnvironmentCard } from '../../models/card.ts'

export async function getAllFruits(db = connection): Promise<EnvironmentCard[]> {
  return db('fruit').select()
}
