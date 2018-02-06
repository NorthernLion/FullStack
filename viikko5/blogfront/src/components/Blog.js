import React from 'react'
import blogService from '../services/blogs'
class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  addLike = async (event) => {
    try {
      event.preventDefault()
      const changedBlog = await blogService.update(this.props.blog._id, {
        title: this.props.blog.title,
        author: this.props.blog.author,
        url: this.props.blog.url,
        user: this.props.blog.user,
        likes: this.props.blog.likes + 1
      })

      console.log(changedBlog)
    } catch (exception) {
      console.log('errir')
      console.log(exception)
    }
    setTimeout(() => {
      this.setState({ error: null })
    }, 3000)

  }

  render() {

    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</div>
        <div style={showWhenVisible}>
          <a href={this.props.blog.url}>this.props.{this.props.blog.url}</a>
          <p>{this.props.blog.likes} likes <button onClick={this.addLike}>like</button></p>
          <p>added by {this.props.blog.user.name}</p>
        </div>
      </div>

    )
  }


}
export default Blog
