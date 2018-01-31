const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  describe('when GET request is made to api/blogs, ', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('the amount of returned blogs is equal to the amount in database', async () => {
      const blogInDatabase = await blogsInDb()
      
      const response = await api
        .get('/api/blogs')
      expect(response.body.length).toBe(blogInDatabase.length)
    })

    test("the author of first blog is Michael Chan", async () => {
      const response = await api
        .get('/api/blogs')

      expect(response.body[0].author).toBe('Michael Chan')
    })
  })

  describe('when POST request is made to api/blogs ', () => {
    test('a valid blog can be added', async () => {
      const blogsAtStart = await blogsInDb()

      const newBlog = {
        "title": "how to eat your face",
        "author": "zoiberg",
        "url": "google.fi",
        "likes": 20
      }
      const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfterOperation = await blogsInDb()

      const titles = blogsAfterOperation.map(r => r.title)

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
      expect(blogsAfterOperation.map(Blog.formatNoId)).toContainEqual(newBlog)
      expect(titles).toContainEqual(newBlog.title)
    })

    test("a blog without title is not added", async () => {
      const blogsAtStart = await blogsInDb()
      newBlog = {
        "author": "zoiberg",
        "url": "google.fi",
        "likes": 20
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)


      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
      expect(blogsAfterOperation.length).toEqual(blogsAtStart.length)
    })

    test("a blog without likes is added and gets value of 0 likes", async () => {
      const blogsAtStart = await blogsInDb()

      newBlog = {
        "title": "how to eat your face",
        "author": "zoiberg",
        "url": "google.fi",
      }
      const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

      expect(postResponse.body.likes).toEqual(0)
    })
  })

  afterAll(() => {
    server.close()
  })
})
