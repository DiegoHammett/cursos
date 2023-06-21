import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './testresult_styles.css'

function TestResult({ ansList, total, approveTest, setCompleted }) {

    const [count, setCount] = useState()
    const [approve, setApprove] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getCount = () => {
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
        }
        getCount()
    }, [ansList])

    useEffect(() => {
        if (count * 10 / total >= approveTest) {
            setApprove(true)
            setCompleted(true)
        }
    }, [count, approveTest, total, setCompleted])

    return (
        <React.Fragment>
            <div className='finish-container inset'>
                <div className='finish-left'>
                    <div className="flip">
                        <div className="content">
                            <div className="front">
                                <h2>{count * 10 / total}</h2>
                                <p>Tu calificación</p>
                            </div>

                            <div className="back">
                                <h2>{approveTest}</h2>
                                <p>Calificación aprobatoria</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='finish-right'>
                    <div className='finish-left-info'>
                        <div className='finish-left-info_header'>
                            <h2 className='title'>Estadísticas del test</h2>
                            <span className='description'>Este es el desglose de tu resultado.</span>
                        </div>
                        <div className='finish-left-info_body'>
                            <div>
                                {!approve && <p>No has obtenido los resultados esperados, pero no te preocupes, puedes intentarlo de nuevo</p>}
                                {!!approve && <p>¡Enhorabuena, has aprobado el examen! Continúa aprendiendo</p>}
                            </div>
                            <br />
                            <div className='finish-left-info_item inset'>
                                <label className='lbl'>Tu calificación</label>
                                <span><b>{count * 10 / total}</b></span>
                            </div>
                            <div className='finish-left-info_item inset'>
                                <label className='lbl'>Calificación aprobatoria</label>
                                <span><b>{approveTest}</b></span>
                            </div>
                            <br />
                            <div className='finish-left-info_item inset'>
                                <label className='lbl'>Cantidad de preguntas evaluadas</label>
                                <span><b>{total}</b></span>
                            </div>
                            <div className='finish-left-info_item inset'>
                                <label className='lbl'>Preguntas contestadas correctamente</label>
                                <span><b>{count}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default TestResult;