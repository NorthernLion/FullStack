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
      {osat.map((osa, i) => <Osa key={i} osa={osa.nimi} tehtavat={osa.tehtavia} />)}
    </div>
  )
}


const Yhteensa = (props) => {
  const osat = props.osat
  return (
    <div>
      <p> Yhteensä {osat.reduce((prev, next) => prev + next.tehtavia, 0)} tehtävää</p>
    </div>
  )
}


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
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}
const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Kurssit kurssit={kurssit} />
    </div>
  )
}

const Kurssit = ({kurssit}) => {
  <div>
    {kurssit.kurssit.map(kurssi=><Kurssi kurssi={kurssi} />)}
  </div>  
  
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)