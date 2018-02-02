import React from 'react'

const LoginForm = ({ onSubmit, username, password, handleChange }) => {
  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={onSubmit}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button>kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm
