import React from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import './App.css'

class App extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: '',
      notification: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value })
  }

  handlePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  notify = (notification) => {
    this.setState({ notification})
    setTimeout(() => {
      this.setState({ notification: null})
    }, 3000)
  }

  addPerson = (event) => {
    event.preventDefault()

    if (this.state.persons.map(person => person.name === this.state.newName).includes(true)) {
      if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const person = this.state.persons.find(n => n.id === this.state.newName)
        const changedPerson = { ...person, number: this.state.newNumber }

        personService
          .update(this.state.newName, changedPerson)
          .then(changedPerson => {
            persons: this.state.persons.map(person => person.id !== this.state.newName ? person : changedPerson)
          })
          .catch(error => {
            this.setState({
              error: `henkilö on jo poistettu`,
              persons: this.state.persons.filter(n => n.id !== person.id)
            })
          })
      }
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
            error: `lisättiin ${newPerson.name}`,
            persons: newPersons,
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({
              error: ``
            })
          }, 1000)
        })
    }
  }

  destroyPerson = (person) => () => {
    if (window.confirm(`poistetaanko ${person.name}`)) {
      personService
        .destroy(person.id)
        .then(newPerson => {
          this.setState({
            error: `poistettiin ${person.name}`,
            newName: '',
            newNumber: ''
          })

          setTimeout(() => {
            this.setState({
              error: ``
            })
          }, 1000)
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
        <Notification message={this.state.error} />
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
