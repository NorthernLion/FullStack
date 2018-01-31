const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: `You need to give title and url in order to post a blog` })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(Blog.format(savedBlog))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: `something went wrong...` })
  }
})

module.exports = blogsRouter
