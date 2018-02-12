import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {

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

export default App
