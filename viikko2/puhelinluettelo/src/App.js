import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }



  handlePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()

    if (this.state.persons.map(person => person.name === this.state.newName).includes(true)) {
      alert('nope')
    } else {

      const personObject = {
        name: this.state.newName
      }
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: ''
      })
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handlePersonChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <Person key={person.name} person={person} />)}
        </ul>
      </div>
    )
  }
}

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

export default App;
