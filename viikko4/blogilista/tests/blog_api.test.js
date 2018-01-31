const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]


beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when GET request is made, ', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the amount of returned blogs is equal to the amount in database', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(blogs.length)
  })

  test("the author of first blog is Michael Chan", async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0].author).toBe('Michael Chan')
  })
})

describe('when POST request is made, ', () => {
  test('a valid blog can be added', async () => {
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


    const response = await api
      .get('/api/blogs')

    const contents = response.body.map(r => r.content)

    expect(response.body.length).toBe(blogs.length + 1)
    expect(Blog.formatNoId(response.body[response.body.length - 1])).toEqual(Blog.formatNoId(newBlog))
    expect(Blog.formatNoId(postResponse.body)).toEqual(Blog.formatNoId(newBlog))
  })

  test("a blog without title is not added", async () => {
    newBlog = {
      "author": "zoiberg",
      "url": "google.fi",
      "likes": 20
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)


    const response = await api
      .get('/api/blogs')

    const contents = response.body.map(r => r.content)

    expect(response.body.length).toBe(blogs.length + 1)
  })

  test("a blog without likes is added and gets value of 0 likes", async () => {
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


    const response = await api
      .get('/api/blogs')

    const contents = response.body.map(r => r.content)

    expect(response.body.length).toBe(blogs.length + 2)
    expect(Blog.formatNoId(postResponse.body).likes).toEqual(0)
  })
})

afterAll(() => {
  server.close()
})