import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  componentDidMount = () => {
    this.props.anecdoteInitialization()
  }

  render() {
    return (
      <div>
        <Notification />
        <Router>
          <div>
            <div>
              <Link to="/">anecdotes</Link> &nbsp;
              <Link to="/create">create new</Link> &nbsp;
              <Link to="/about">about</Link> &nbsp;
            </div>
            <Route exact path="/" render={() => <AnecdoteList />} />
            <Route exact path="/create" render={() => <AnecdoteForm />} />
            <Route exact path="/about" render={() => <AnecdoteList />} />
          </div>
        </Router>
        <p>source code for this application can be found on Github</p>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInitialization }
)(App)

