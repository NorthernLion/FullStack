import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'
class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                const updatedAnecdote = anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
                this.props.addVote(updatedAnecdote)
                this.props.notificationChange(`you voted '${anecdote.content}'`)
                setTimeout(() => { this.props.notificationRemove() }, 5000)
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

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: filterAnecdotes(state.anecdotes, state.filter).sort((th, nd) => nd.votes - th.votes)
  }
}

const mapDispatchToProps = {
  addVote,
  notificationRemove,
  notificationChange
}

const ConnectedAnnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)


export default ConnectedAnnecdoteList
