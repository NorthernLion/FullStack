import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'
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
                this.props.addVote(anecdote.id)
                this.props.notify(`you voted '${anecdote.content}'`, 10)
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
  notify
}

const ConnectedAnnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)


export default ConnectedAnnecdoteList
