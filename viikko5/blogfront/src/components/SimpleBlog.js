import React from 'react'

const SimpleBlog = ({ blog, onclick }) => (
  <div>
    <div className="titleAndAuthor">
      {blog.title} {blog.author}
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onclick}>likes</button>
    </div>
  </div>
)

export default SimpleBlog
