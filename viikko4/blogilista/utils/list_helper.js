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
  let likes = blogs.map(blog => blog.likes)
  let maxLikes = Math.max(...likes)
  let favorite = blogs.find(element => element.likes === maxLikes)
  return favorite
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
