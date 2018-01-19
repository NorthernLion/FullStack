import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

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

export default Kurssi