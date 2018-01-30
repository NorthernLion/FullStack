const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const notesRouter = require('./controller/notes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise


app.use('/api/notes', notesRouter)
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)


app.use(middleware.error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})