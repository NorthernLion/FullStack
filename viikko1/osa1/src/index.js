import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, your age is {props.age}</p>
        </div>

    )
}

const App = () => {
    const now = new Date()
    const a = 10
    const b = 20
    const nimi = 'Maukka'
    const ika = '10'

    console.log('Hello dear console')
    return (
        <div>
            <p>Hello World, it is {now.toString()}</p>
            <p>{a} plus {b} is {a+b}</p>
            <Hello name="Henkka" age={20+55}/>
            <Hello name={nimi} age={ika} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
