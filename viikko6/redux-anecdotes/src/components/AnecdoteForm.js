import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <input name='anecdote' />
          <button onClick={ () => {
            this.props.notificationChange('you created a new anecdote successfully')
            setTimeout(() => { this.props.notificationRemove() }, 5000)
          }
          }>
          create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  notificationRemove,
  notificationChange
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)


export default ConnectedAnecdoteForm
