import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    console.log('mounting')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
    console.log(this.state.filter)
  }



  render() {
    console.log('rendering')
    return (
      <div>
        <p>find countries:</p>
        <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <Countries countries={Filter(this.state.filter, this.state.countries)} />
      </div>
    )
  }
}

const Countries = ({ countries }) => {
  if (OverTen(countries) || countries === null) {
    console.log('over ten')
    return (<div>too many matches, specify another filter</div>)
  } else if (One(countries)) {
    console.log('onecountry only activated')
    return (<FullCountry country={countries[0]} />)
  } else {
    return (
      countries.map(country => <Country country={country} />)
    )
  }
}

const FullCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} />>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>{country.name}</div>
  )
}

const OverTen = (countries) => countries.length > 10

const One = (countries) => countries.length === 1

const Filter = (filter, countries) => {
  return (countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())))
}


export default App

/*
name
nativeName
capital
population
flag
*/