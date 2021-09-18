import express from 'express'
const router = express.Router()
import Word from '../models/WordModel.js'

router.get('/', async (req, res) => {
  const words = await Word.find({})
  res.json(words)
})
export default router
