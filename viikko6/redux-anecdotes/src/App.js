import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  componentDidMount = () => {
    this.props.anecdoteInitialization()
  }

  render() {
    return (
      <div>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInitialization }
)(App)

