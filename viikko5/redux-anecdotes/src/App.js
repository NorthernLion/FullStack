import React from 'react'
import actionFor from './actionCreators'

class App extends React.Component {
  addVote = (id) => () => {
    this.props.store.dispatch(actionFor.addVote(id))
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.anecdoteCreation(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  compare = (th, nd) => {
    return nd.votes - th.votes
  }

  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort(this.compare)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App