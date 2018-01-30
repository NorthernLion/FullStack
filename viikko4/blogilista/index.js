const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb://admin:muumio@ds119028.mlab.com:19028/bloglistausdb_dev'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use('api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
