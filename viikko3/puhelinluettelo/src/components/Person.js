import React from 'react'

const Person = ({ person, destroy }) => {
    return (
        <li>{person.name} {person.number} <button onClick={destroy}>poista</button></li>
    )
}

export default Person
