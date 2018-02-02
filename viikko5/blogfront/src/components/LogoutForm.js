import React from 'react'

const LogoutForm = ({onSubmit}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <button>logout</button>
      </form>
    </div>
  )
}

export default LogoutForm
