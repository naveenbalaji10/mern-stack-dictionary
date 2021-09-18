import mongoose from 'mongoose'

//word schema
const wordSchema = mongoose.Schema({
  word: {
    type: 'String',
    unique: true,
  },
  origin: {
    type: 'String',
  },
  meanings: [
    {
      partOfSpeech: {
        type: 'String',
      },
      definitions: [
        {
          definition: {
            type: 'String',
          },
          example: {
            type: 'String',
          },
          synonyms: [{ type: 'String' }],
          antonyms: [{ type: 'String' }],
        },
      ],
    },
  ],
  phonetics: [
    {
      text: { type: 'String' },
      audio: { type: 'String' },
    },
  ],
})

const Word = mongoose.model('Word', wordSchema)
export default Word
