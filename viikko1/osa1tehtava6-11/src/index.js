import React from 'react';
import ReactDOM from 'react-dom';



const Positiivisa = ({hyva, neutraali, huono}) => {
    if(hyva + neutraali + huono === 0) {
        return 0
    }
    return 100 * (hyva/ (hyva + neutraali + huono))
}

const Keskiarvo = ({hyva, neutraali, huono}) => {
    if(hyva + neutraali + huono === 0) {
        return 0
    }
    return (hyva - huono)
}


const Button = ({nimi, aktion}) => {
    return (
    <button onClick={aktion}>{nimi}</button>)
} 

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    asetaArvoon = (name) => {
        return () => {
            this.setState({ [name]: this.state[name] +1})
        }
    }
        render() {
            return (
                <div>
                    <div>
                        <h1>anna palautetta</h1>
                        <Button nimi='hyvä' aktion={this.asetaArvoon('hyva')} />
                        <Button nimi='neutraali' aktion={this.asetaArvoon('neutraali')} />
                        <Button nimi='huono' aktion={this.asetaArvoon('huono')} />
                        <h1>statistiikka</h1>
                        <Statistics currentState={this.state} />
                        
                    </div>
                </div>    
            )
        }
    }

const Statistics = (stats) => {
    const currentState = stats.currentState
    if (currentState.hyva + currentState.neutraali + currentState.huono === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }
    return(
        <table>
            <Statistic teksti='hyvä' arvo={currentState.hyva} />            
            <Statistic teksti='neutraali' arvo={currentState.neutraali} />
            <Statistic teksti='huono' arvo={currentState.huono} />        
            <Statistic teksti='keskiarvo' arvo={Keskiarvo(currentState)} />
            <Statistic teksti='positiivisia' arvo={Positiivisa(currentState)} /> 
        </table>
    )
}

const Statistic = ({teksti, arvo}) => {
    if (teksti === 'positiivisia') {
        return (
                <tr>
                <td> {teksti} </td>
                <td> {arvo} % </td>
                </tr>
            
        )
    }
    return (
            <tr>
                <td> {teksti} </td>
                <td> {arvo} </td>
            </tr>
        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));





