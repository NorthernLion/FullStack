const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const notesRouter = require('./controller/notes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const config = require('./utils/config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(config.mingoUrl)
mongoose.Promise = global.Promise


app.use('/api/notes', notesRouter)
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)


app.use(middleware.error)

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})