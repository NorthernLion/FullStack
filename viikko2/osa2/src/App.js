import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            newNote: 'uusi muistiinpano...',
            showAll: true
        }
    }

    addNote = (event) => {
        event.preventDefault()

        const noteObject = {
            content: this.state.newNote,
            date: new Date(),
            important: Math.random() > 0.5
        }

        noteService.create(noteObject)
            .then(newNote => {
                this.setState({
                    notes: this.state.notes.concat(newNote),
                    newNote: ''
                })
            })
    }

    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNote: event.target.value })
    }

    toggleVisible = () => {
        this.setState({ showAll: !this.state.showAll })
    }

    toggleImportanceOf = (id) => {
        return () => {
            const note = this.state.notes.find(n => n.id === id)
            const changedNote = { ...note, important: !note.important }

            noteService
                .update(id, changedNote)
                .then(changedNote => {
                    this.setState({
                        notes: this.state.notes.map(note => note.id !== id ? note : changedNote)
                    })
                })
                .catch(error => {
                    alert(`muistiin pano '${note.content}' on jo valitettavasti poistettu palvelimelta`)
                    this.setState({ notes: this.state.notes.filter(n => n.id !== id) })
                })
        }
    }

    componentWillMount() {
        noteService
            .getAll()
            .then(response => {
                this.setState({ notes: response })
            })
    }

    render() {
        console.log('render')
        const noteToShow =
            this.state.showAll ?
                this.state.notes :
                this.state.notes.filter(note => note.important)

        const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

        return (
            <div>
                <h1>Muistiinpanot</h1>

                <div>
                    <button onClick={this.toggleVisible}>
                        näytä {label}
                    </button>
                </div>
                <ul>
                    {noteToShow.map(note => 
                    <Note 
                        key={note.id} 
                        note={note} 
                        toggleImportance={this.toggleImportanceOf(note.id)}
                        />
                    )}
                </ul>
                <form onSubmit={this.addNote}>
                    <input value={this.state.newNote}
                        onChange={this.handleNoteChange}
                    />
                    <button type="submit">tallenna</button>
                </form>
            </div>
        )
    }

}
export default App