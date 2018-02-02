import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      author: '',
      title: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService
      .getAll()
      .then(blogs =>
        this.setState({ blogs })
      )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = async (event) => {
    try {
      event.preventDefault()
      const newBlog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.setState({
        title: '',
        author: '',
        url: '',
        blogs: this.state.blogs.concat(newBlog)
      })
    } catch (ex) {
      this.setState({
        error: `couldn't add new blog due to an error: ${ex}`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 3000)
    }
  }






  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      this.setState({
        username: '',
        password: '',
        user: null
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        user
      })

    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )

    const logoutForm = () => (
      <div>
        <form onSubmit={this.logout}>
          <button>logout</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>
          <button>create</button>
        </form>
      </div>
    )

    return (
      <div>
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            {logoutForm()}
            {blogForm()}
            {blogList()}
          </div>

        }
      </div>
    )
  }
}

  export default App
