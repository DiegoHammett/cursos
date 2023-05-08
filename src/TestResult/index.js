import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './testresult_styles.css'

function TestResult({ ansList, total }) {

    const [count, setCount] = useState()
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

    return (
        <React.Fragment>
            <div className='finish-container inset'>
                <div className='finish-left'>
                    <div class="flip">
                        <div class="content">
                            <div class="front">
                                <h2>{count * 10 / total}</h2>
                                <p>Tu calificación</p>
                            </div>
                            <div class="back">
                                <h2></h2>
                                <p>¡Enhorabuena!, continúa aprendiendo :)</p>
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

                {/* <h2 className='test-description'>
                            Has completado el test con una calificación de <strong>  </strong>
                            </h2>
                            <h2 className='test-description'>Preguntas contestadas correctamente: <strong> {total} de {questions.length} </strong></h2> */}
            </div>
            <div className='finish-footer'>
                <a href='/' className='btn'>Continuar</a>
            </div>

        </React.Fragment>
    )
}

export default TestResult;