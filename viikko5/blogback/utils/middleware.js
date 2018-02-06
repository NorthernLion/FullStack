const logger = (request, response, next) => {
  if( process.env.NODE_ENV === 'test' ) {
    return next()
  }
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('Body:  ', request.get('authorization'))
  console.log('---')
  next()
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  logger,
  error,
  tokenExtractor
}