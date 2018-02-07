import React from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

class App extends React.Component {
  filterSelected = (value) => () {
    console.log(value)
  }
  render() {
    return (
      <div>
        <NoteForm />
        <div>
          kaikki <input type="radio" name="filter" onChange={this.filterSelected('ALL')} />
          tärkeät <input type="radio" name="filter" onChange={this.filterSelected('IMPORTANT')} />
          eitärkeät <input type="radio" name="filter" onChange={this.filterSelected('NONIMPORTANT')} />
        </div>
        <NoteList />
      </div>
    )
  }
}

export default App