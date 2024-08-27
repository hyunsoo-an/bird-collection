import request from 'superagent'
import Bird from '../../models/bird'

export async function getBirds() {
  const result = await request.get(`/api/v1/birds`)
  console.log(result.body)
  return result.body as Bird[]
}

export async function getBirdById(id: number) {
  const result = await request.get(`/api/v1/birds/${id}`)
  console.log(result.body)
  return result.body as Bird
}

export async function deleteBirdById(id: number) {
  const result = await request.delete(`/api/v1/birds/${id}`)
  console.log(result.statusCode)
  return
}

export async function addBird(newBird: Bird) {
  const result = await request.post(`/api/v1/birds`).send(newBird)
  console.log(result.statusCode)
  return
}
