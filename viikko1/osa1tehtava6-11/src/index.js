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
                        <button onClick={this.klikHyva}>hyvä</button>
                        <button onClick={this.klikNeutraali}>neutraali</button>
                        <button onClick={this.klikHuono}>huono</button>
                        <h1>statistiikka</h1>
                        <p> hyvä {this.state.hyva} </p>
                        <p> neutraali {this.state.neutraali} </p>
                        <p> huono {this.state.huono} </p>
                        <p> keskiarvo {Keskiarvo(this.state)} </p>
                        <p> positiivisia {Positiivisa(this.state)} % </p>
                        
                    </div>
                </div>    
            )
        }
    }


ReactDOM.render(<App />, document.getElementById('root'));





