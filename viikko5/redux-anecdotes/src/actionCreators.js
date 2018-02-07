
export default {
  addVote(id) {
    return {
      type: 'ADD_VOTE',
      data: { id }
    }
  }
}
