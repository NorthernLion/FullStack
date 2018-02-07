import React from 'react'
import { filterChange } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (e) => {
    e.preventDefault()
    const filter = e.target.value
    this.props.store.dispatch(filterChange(filter))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

export default Filter
