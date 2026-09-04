import request from 'superagent'
import { EnvironmentCard } from '../../models/card.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getEnvironmentCards(): Promise<EnvironmentCard[]> {
  const response = await request.get(`${rootURL}/environment-cards`)
  return response.body as EnvironmentCard[]
}
