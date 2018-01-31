const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", {username: 1, name: 1})
  response.json(blogs.map(Blog.format))
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog =  new Blog ({
      _id: request.params.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })    
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: `something went wrong...` })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: `You need to give title and url in order to post a blog` })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(Blog.format(savedBlog))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: `something went wrong...` })
  }
})

module.exports = blogsRouter
