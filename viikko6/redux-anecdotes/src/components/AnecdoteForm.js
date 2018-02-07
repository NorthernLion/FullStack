import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationChange } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(anecdoteCreation(content))

    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button onClick={ () => {
            this.props.store.dispatch(notificationChange(`you created a new anecdote successfully`))
            setTimeout(() => { this.props.store.dispatch(notificationRemove()) }, 5000)
          }
          }>
          create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
