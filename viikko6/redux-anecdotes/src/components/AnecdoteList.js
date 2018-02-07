import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationChange } from '../reducers/notificationReducer'
class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {filterAnecdotes(this.props.store.getState().anecdotes, this.props.store.getState().filter).sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(addVote(anecdote.id))
                this.props.store.dispatch(notificationChange(`you voted '${anecdote.content}'`))
                setTimeout(() => { this.props.store.dispatch(notificationRemove()) }, 5000)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filterAnecdotes = (anecdotes, filter) => {
  if (filter.length > 0) {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  } else {
    return anecdotes
  }
}

export default AnecdoteList
