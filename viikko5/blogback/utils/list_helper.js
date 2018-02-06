const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  const favorite = blogs.find(element => element.likes === maxLikes)
  return favorite
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return null
  }
  const authors = blogs.map(blog => blog.author)

  let mf = 1
  let m = 0
  let author = authors[0]
  for (var i = 0; i < authors.length; i++) {
    for (var j = i; j < authors.length; j++) {
      if (authors[i] === authors[j]) {
        m++
      }
      if (mf < m) {
        mf = m
        author = authors[i]
      }
    }
    m = 0
  }

  return {
    author: author,
    blogs: mf
  }
}

const mostLikes = (blogs) => {

  const authors = blogs.map(blog => blog.author)
  const votes = blogs.map(blog => blog.votes)
  let sumVotes

  for (var i = 0; i < authors.length; i++) {
    for (var j = 0; j < authors.length; j++) {
      if (authors[i] === authors[j]) {
        votes
      }
      if (mf < m) {
        mf = m
        author = authors[i]
      }
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
