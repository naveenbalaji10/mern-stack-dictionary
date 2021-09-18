import express from 'express'
const router = express.Router()
import axios from 'axios'
import Word from '../models/WordModel.js'

router.get('/:id', async (req, res) => {
  try {
    const word = req.params.id

    const { data } = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    )
    console.log(data)
    const newWord = new Word({
      word: data[0].word,
      origin: data[0].origin,
      meanings: data[0].meanings,
      phonetics: data[0].phonetics,
    })
    await newWord.save()

    res.status(201)
    res.send(data)
  } catch (error) {
    console.error(error)
  }
})

export default router
