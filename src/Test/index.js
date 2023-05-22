import React, { useEffect, useState } from 'react'
import '../App.css';
import { db } from '../dbconnect'
import Question from '../Question'
import TestResult from '../TestResult'
import './test_styles.css'

function Test({ id, retro }) {

    const [test, setTest] = useState([])
    const [total, setTotal] = useState(0)
    const [questions, setQuestions] = useState([])
    const [ansList, setAnsList] = useState([])
    const [error, setError] = useState(false)
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        const getTest = () => {
            fetch(db.url + '?table=test&where=id IN (' + id + ')')
                .then(res => res.json())
                .then(res => setTest(res[0]))
                .catch(err => setError(true))
        }
        const getQuestions = () => {
            fetch(db.url + '?table=pregunta&column=id&where=test IN (' + id + ')&extra=GROUP BY id ORDER BY RAND()')
                .then(res => res.json())
                .then(res => setQuestions(res))
                .catch(err => setError(true))
        }
        getTest();
        getQuestions();
    }, [id])

    const suma = (val) => {
        setTotal(total + parseInt(val))
    }

    return (
        <React.Fragment>
            <div className='test-body'>
                <div className='test-container '>
                    <div className='test-header'>
                        <div className='test-title title'>
                            <b className='b-medium'>{test.nombre}</b>
                        </div>
                        {retro === true && !finish &&
                            <React.Fragment>
                                <span className='test-description description'>
                                    Seleccione la respuesta que considere correcta y presione el botón <b className='b-medium'>'Responder pregunta'</b> para que su respuesta sea registrada. Presione el botón <b className='b-medium'>'Terminar intento'</b> al finalizar.
                                </span>
                                <p className='pill'>
                                    <i className='bx bx-info-circle icon'></i>Tu puntuación se verá reflejada en el recuadro flotante cada que respondas una pregunta.
                                </p>
                            </React.Fragment>
                        }
                        {retro === false && !finish &&
                            <span className='test-description description'>
                                Seleccione la respuesta que considere correcta para cada pregunta. Presione el botón <b className='b-medium'>'Terminar intento'</b> al finalizar.
                            </span>
                        }
                        {!!finish &&
                            <span className='test-description description'>
                                Estos son los resultados de tu test.
                            </span>
                        }
                    </div>

                    {!finish &&
                        <React.Fragment>

                            <div className='test-questions-container'>
                                <div>
                                    {questions.map(q => (
                                        <div key={q.id}>
                                            <Question id={q.id} retro={retro} suma={suma} ansList={ansList} setAnsList={setAnsList} />
                                        </div>
                                    ))}
                                    <div className='question-validate'>
                                        <button className='btn' onClick={() => { setFinish(true) }}>Terminar intento</button>
                                    </div>
                                </div>
                            </div>
                            {retro === true &&
                                <div className='testresult-container inset'>
                                    <span className='title'><b>PROGRESO</b></span>
                                    <div className='testresult-score'>
                                        <span className='lbl'>Has obtenido</span>
                                        <span className='title'>
                                            <b>{total} de {questions.length}</b>
                                        </span>
                                    </div>

                                </div>
                            }
                        </React.Fragment>
                    }
                    {!!finish && <TestResult ansList={ansList} total={questions.length} approveTest={test.aprobacion}/>}
                </div>
            </div>

        </React.Fragment >
    );
}

export default Test;