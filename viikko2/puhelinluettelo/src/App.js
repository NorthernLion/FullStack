import React from 'react'
import Person from './components/Person'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
    }
  }


  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  destroyPerson = (person) => () => {
    if (window.confirm(`poistetaanko ${person.name}`)) {
      personService
        .destroy(person.id)
        .then(newPerson => {
          this.setState({
            persons: newPersons,
            newName: '',
            newNumber: ''
          })
        })
    }


  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  handlePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()

    if (this.state.persons.map(person => person.name === this.state.newName).includes(true)) {
      alert('nope')
    } else {

      const personObject = {
        id: this.state.newName,
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create(personObject)
        .then(newPerson => {
          const newPersons = this.state.persons
          newPersons.push(personObject)
          this.setState({
            persons: newPersons,
            newName: '',
            newNumber: ''
          })
        })
    }
  }

  render() {
    const filter = this.state.filter
    const persons = this.state.persons
    return (
      <div>
        <div>
          rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>

        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handlePersonChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {filterPersons(filter, persons).map(person =>
            <Person
              key={person.name}
              person={person}
              destroy={this.destroyPerson(person)}
            />
          )}
        </ul>
      </div>
    )
  }
}

const filterPersons = (filter, persons) => {
  if (filter.length > 0) {
    return (persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
  } else
    return persons
}




export default App;
