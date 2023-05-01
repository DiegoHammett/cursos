import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './testresult_styles.css'

function TestResult({ ansList, total }) {

    const [count, setCount] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        const map = new Map(Object.entries(ansList))
        if (map.size > 0) {
            let idList
            for (let [key, value] of map) {
                idList = idList + "," + value
            }
            idList = idList.replace("undefined,", "")
            fetch(db.url + '?table=respuesta&column=sum(tipo) as total&where=id IN (' + idList + ')')
                .then(res => res.json())
                .then(res => setCount(res[0].total))
                .catch(err => setError(true))
        }

    }, [ansList])

    return (
        <React.Fragment>
            <h2 className='test-description'>Has completado el test con una calificación de <strong> {parseInt(count)/parseInt(total)*10} </strong></h2>
            <h2 className='test-description'>Preguntas contestadas correctamente: <strong> {count} de {total} </strong></h2>
        </React.Fragment>
    )
}

export default TestResult;