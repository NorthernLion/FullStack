const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, usersInDb, initialUsers } = require('./test_helper')

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
        "likes": 20,
        "userId": "5a71ef66dc3e8f204bda2599"
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
        "likes": 20,
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
        "userId": "5a71ef66dc3e8f204bda2599"
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
  describe('when DELETE request is made to api/blogs/:id ', () => {
    let postResponse
    beforeAll(async () => {
      const addedBlog = new Blog({
        "title": "how to eat your face",
        "author": "zoiberg",
        "url": "google.fi",
        "likes": 20
      })

      postResponse = await api
        .post('/api/blogs')
        .send(addedBlog)
    })
    test('a blog can be deleted', async () => {
      const blogsAtStart = await blogsInDb()

      await api
        .delete(`api/blogs/${postResponse._id}`)

      const blogsAtEnd = await blogsInDb()

      expect(blogsAtEnd.length).toBe(blogsAtStart.length)
      expect(blogsAtEnd.map(Blog.formatNoId)).not.toContainEqual(newBlog)

    })
  })
  describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
      const usersBeforeOperation = await usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
      const usernames = usersAfterOperation.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
      const usersBeforeOperation = await usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body).toEqual({ error: 'username must be unique' })

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })
  })
  afterAll(() => {
    server.close()
  })
})
