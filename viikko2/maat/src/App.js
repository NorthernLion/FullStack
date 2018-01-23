import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      filter: '',
      country: '',
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
    this.setState({ 
      filter: event.target.value,
      country: ''
    })
    console.log(this.state.filter)
  }

  handleCountryChange = (event) => {
    this.setState({ 
      country: event.target.value,
      filter: ''
    })
    console.log(event.target.value)
  }  

  filter = (filter, countries) => {
    return (countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())))
  }


  countries = ({ countries }) => {
    if (this.state.country.length > 2) {
      const theOne = this.filter(this.state.country, this.state.countries)
      console.log(theOne)
      return (<FullCountry country={theOne[0]} />)
    } else if (OverTen(countries) || countries === null) {
      console.log('over ten')
      return (<div>too many matches, specify another filter</div>)
    } else if (One(countries)) {
      console.log('onecountry only activated')
      return (<FullCountry country={countries[0]} />)
    } else {
      return (
        countries.map(country => <this.country country={country} />)
      )
    }
  }

  country = ({ country }) => {
    return (
      <div>
        <button value={country.name} onClick={this.handleCountryChange}>{country.name}</button>
      </div>
    )
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
        <this.countries countries={this.filter(this.state.filter, this.state.countries)} />
      </div>
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

const OverTen = (countries) => countries.length > 10

const One = (countries) => countries.length === 1



export default App

/*
name
nativeName
capital
population
flag
*/