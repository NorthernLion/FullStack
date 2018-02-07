import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

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
      url: '',
      notification: null,
      selectedBlog: null
    }
  }

  compareLikes = (th, nd) => {
    return nd.likes - th.likes
  }
  componentDidMount() {
    blogService
      .getAll()
      .then(blogs =>
        this.setState({ blogs: blogs.sort(this.compareLikes) })
      )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  notify = (notification) => {
    this.setState({ notification })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }

  addBlog = async (event) => {
    try {
      event.preventDefault()
      const newBlog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.notify(`A new blog ${this.state.title} by ${this.state.author} added`)

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
      this.notify(`Wrong username or password`)
      console.log(exception)
    }
  }

  render() {
    const loginForm = () => (
      <LoginForm
        onSubmit={this.login}
        username={this.state.username}
        password={this.state.password}
        handleChange={this.handleChange}
      />
    )

    const logoutForm = () => (
      <LogoutForm
        onSubmit={this.logout}
      />
    )

    const blogForm = () => (
      <Togglable buttonLabel="create">
        <BlogForm
          onSubmit={this.addBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleChange={this.handleChange}
        />
      </Togglable>
    )

    return (
      <div>
        <Notification message={this.state.notification} />
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            {logoutForm()}
            {blogForm()}
            <h2>blogs</h2>
            {this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog} user={this.state.user} />
            )}
          </div>

        }
      </div>
    )
  }
}

export default App
