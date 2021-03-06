const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const notify = (notification, time) => {
  return async (dispatch) => {
    dispatch( {
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*1000)
  }
}

export default notificationReducer
