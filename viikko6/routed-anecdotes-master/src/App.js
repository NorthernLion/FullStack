import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import Anecdote from './Anecdote'
import { Button, Col, Grid, ListGroup, ListGroupItem, Row, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

const menuStyle = {
  backgroundColor: 'blue' 
}
const Menu = () => (
  <div style={menuStyle}>
    <NavLink exact to="/" activeStyle={{fontWeight: 'bold', color: 'red'}}>anecdotes</NavLink> &nbsp;
    <NavLink exact to="/create" activeStyle={{ fontWeight: 'bold', color: 'red' }}>create new</NavLink> &nbsp;
    <NavLink exact to="/about" activeStyle={{ fontWeight: 'bold', color: 'red' }}>about</NavLink> &nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </ListGroupItem>)}
    </ListGroup>
  </div>
)

const About = () => (
  <Grid>
    <Row className="show-grid">
      <Col sm={16} md={5}>    
        <div>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </div>
      </Col>
      <Col sm={4} md={2}>
        <img src="https://cdn.arstechnica.net/wp-content/uploads/2013/02/linus-eff-you-640x363.png"/>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
        >
            <ControlLabel>Content</ControlLabel>
            <FormControl
             name='content' 
             value={this.state.content} 
             onChange={this.handleChange} 
             />
            <ControlLabel>Author</ControlLabel>
            <FormControl 
            name='author' 
            value={this.state.author} 
            onChange={this.handleChange} 
            />
            <ControlLabel>Url for more info</ControlLabel>
            <FormControl
            name='info' 
            value={this.state.info} 
            onChange={this.handleChange} 
            />
            <p></p>
          <Button type="submit">create</Button>
        </FormGroup>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `you created ${anecdote.content}` })
    setTimeout(() => {
      this.setState({ notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }



  render() {

    const notificationStyle = {
      color: 'green',
      borderStyle: 'solid',
      borderColor: 'green',
      padding: '5px 5px 5px 5px'
    }

    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <div style={notificationStyle}>{this.state.notification}</div>
        <Router>
          <div>
            <div>
              <Menu />
            </div>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/create" render={() =>
              this.state.notification
              ? <Redirect to="/" />
              : <CreateNew addNew={this.addNew}/>} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({match}) => 
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App;
