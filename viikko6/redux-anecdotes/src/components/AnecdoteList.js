import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
class AnecdoteList extends React.Component {
  render() {
    const { anecdotes, filter } = this.props
    return (
      <div>
        <h2>Anecdotes</h2>
        {filterAnecdotes(anecdotes, filter).sort((th, nd) => nd.votes - th.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.addVote(anecdote.id)
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
    anecdotes: state.anecdotes,
    filter: state.filter
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
