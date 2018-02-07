export default {
  addVote (id) {
    return {
      type: 'ADD_VOTE',
      data: { id }
    }
  },
  anecdoteCreation (content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content,
        votes: 0
      }
    }
  }
}
