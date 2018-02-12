import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)

    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button onClick={ () => {
            this.props.notificationChange(`you created a new anecdote successfully`)
            setTimeout(() => { this.props.notificationRemove() }, 5000)
          }
          }>
          create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  notificationRemove,
  notificationChange
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)


export default ConnectedAnecdoteForm

