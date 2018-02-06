import React from 'react'
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
          <p>{this.props.blog.likes} likes <button>like</button></p>
          <p>added by {this.props.blog.user.name}</p>
        </div>
      </div>

    )
  }


}
export default Blog
