const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(Blog.format))
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(Blog.format(result))
    })
})

module.exports = blogsRouter