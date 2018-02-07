import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './noteReducer'
import filterReducer from './filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(noteReducer)

ReactDOM.render(
  <Provider store={createStore(noteReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
)