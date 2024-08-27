import Router from 'express'
import * as db from '../db/db.ts'

const router = Router()

// GET 'api/v1/birds'

router.get('/', async (req, res) => {
  try {
    const birds = await db.getAllBirds()
    res.json(birds)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// GET 'api/v1/birds/:id'
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const bird = await db.getBirdById(id)
    res.json(bird)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// DEL 'api/v1/birds/:id'
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteBird(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// POST 'api/v1/birds'
router.post('/', async (req, res) => {
  const newBird = req.body
  try {
    await db.addBird(newBird)
    res.sendStatus(200)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// Patch

export default router
