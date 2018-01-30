const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type:', /application\/json/)
})

afterAll(() => {
  server.close
})