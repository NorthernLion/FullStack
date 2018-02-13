import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    return [...state, state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)]
  }
  case 'CREATE':
    return [...state, { content: action.content, id: getId(), votes: 0 }]
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

export const addVote = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export default anecdoteReducer
