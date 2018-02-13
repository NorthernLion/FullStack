import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const id = action.data.id
    const anecdoteToChange = state.find(n => n.id === id)
    const changedAnecdote = { ...anecdoteToChange, votes: (anecdoteToChange.votes + 1) }
    return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : changedAnecdote)
  }
  case 'CREATE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getOne(id)
    const updatedToAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(updatedToAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer
