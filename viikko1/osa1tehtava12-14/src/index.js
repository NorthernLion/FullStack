import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: []
        }
    }

    uusiAnecdootti = () => {
        this.setState({
            selected: Math.floor(Math.random() * 6)
        })
    }

    aanesta = () => {
        this.setState({
            votes: this.state.votes.concat(this.state.selected) 
        })
    }

    render() {
        return(
            <div>
                {this.props.anecdotes[this.state.selected]}
                <p>has {voteCount(this.state)} votes</p>
                <button onClick={this.aanesta}>vote</button>
                <button onClick={this.uusiAnecdootti}>next anecdote</button>


            </div>            
        )
    }
}

const voteCount = (info) => {
    const number = info.selected
    const list = info.votes
    if (list.length===0) {
        return 0
    }
    var count = 0
    for(var i = 0; i < list.length; i++) {
        if(list[i] === number) {
            count++
        }
    }
    return(count)
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
