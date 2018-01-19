import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  const osat = props.osat
  /*
    shift + controll + i
  */
  return (
    <div>
      {osat.map((osa, i) => <Osa key={i} osa={osa.nimi} tehtavat={osa.tehtavia} />)}
    </div>
  )
}

/*
const Yhteensa = (props) => {
  const osat = props.osat
  return (
    <div>
      <p> Yhteensä {osat[0].tehtavia + osat[1].tehtavia + osat[2].tehtavia} tehtävää</p>
    </div>  
  )
}
*/

const Osa = (props) => {
  return (
    <div>
      <p> {props.osa} {props.tehtavat} </p>
    </div>
  )
}

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
    </div>
  )
}
const App = () => {
  const kurssi = {
    nimi: 'Half Stack sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)