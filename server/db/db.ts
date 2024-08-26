import connection from './connection.ts'
import Bird from '../../models/bird.ts'

const db = connection

// Getting all birds
export function getAllBirds(): Promise<Bird[]> {
  return db('birds').select(
    'id',
    'name',
    'type',
    'color',
    'size',
    'habitat',
    'can_Fly as canFly',
  )
}

// Getting each birds id
export function getBirdById(id: number): Promise<Bird> {
  return db('birds')
    .where({ id })
    .first()
    .select(
      'id',
      'name',
      'type',
      'color',
      'size',
      'habitat',
      'can_Fly as canFly',
    )
}

// Deleting bird
export function deleteBird(id: number) {
  return db('birds').where({ id }).delete()
}

// Adding bird
export function addBird(newBird: Bird) {
  return db('birds').insert(newBird)
}
