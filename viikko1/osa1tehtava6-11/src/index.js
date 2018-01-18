import React from 'react';
import ReactDOM from 'react-dom';



const Positiivisa = ({hyva, neutraali, huono, kaikki}) => {
    if(hyva + neutraali + huono === 0) {
        return 0
    }
    return 100 * (hyva/ (hyva + neutraali + huono))
}

const Keskiarvo = ({hyva, neutraali, huono, kaikki}) => {
    if(hyva + neutraali + huono === 0) {
        return 0
    }
    const sum = kaikki.reduce((previous, current) => current += previous);
    return sum / kaikki.length 
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
            huono: 0,
            kaikki: [],
        }
    }
        klikHyva = () => {
            this.setState({
                hyva: this.state.hyva +1,
                kaikki: this.state.kaikki.concat(1),
            })
        }

        klikNeutraali = () => {
            this.setState({
                neutraali: this.state.neutraali +1,
                kaikki: this.state.kaikki.concat(0)
            })
        }

        klikHuono = () => {
            this.setState({
                huono: this.state.huono +1,
                kaikki: this.state.kaikki.concat(-1)
            })
        }

        render() {
            return (
                <div>
                    <div>
                        <h1>anna palautetta</h1>
                        <Button nimi='hyvä' aktion={this.klikHyva} />
                        <Button nimi='neutraali' aktion={this.klikNeutraali} />
                        <Button nimi='huono' aktion={this.klikHuono} />
                        <Statistics currentState={this.state} />
                        
                    </div>
                </div>    
            )
        }
    }

const Statistics = (stats) => {
    const currentState = stats.currentState
    return(
        <div>
            <h1>statistiikka</h1>
            <Statistic teksti='hyvä' arvo={currentState.hyva} />            
            <Statistic teksti='neutraali' arvo={currentState.neutraali} />
            <Statistic teksti='huono' arvo={currentState.huono} />        
            <Statistic teksti='keskiarvo' arvo={Keskiarvo(currentState)} />
            <Statistic teksti='positiivisia' arvo={Positiivisa(currentState)} /> 
        </div>
    )
}

const Statistic = ({teksti, arvo}) => {
    if (teksti === 'positiivisia') {
        return (
            <div>
                <p> {teksti} {arvo} % </p>
            </div>
        )
    }
    return (
        <div>
            <p> {teksti} {arvo} </p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));





