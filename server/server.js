import express from 'express'
const app = express()
import cors from 'cors'
import getRoute from './routes/getRoute.js'
import getData from './routes/getData.js'
import connectDB from './config/data.js'


app.use(express.json())

app.use(cors())
connectDB()
const PORT = process.env.PORT || 5000
app.use('/api/search', getRoute)
app.use('/', getData)

app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`)
})
