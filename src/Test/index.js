import React, { useEffect, useState } from 'react'
import '../App.css';
import { db } from '../dbconnect'
import Question from '../Question'
import TestResult from '../TestResult'
import './test_styles.css'
import { useTimer } from 'react-timer-hook'

function Test({ id, time, setCompleted }) {

    const [test, setTest] = useState([])
    const [total, setTotal] = useState(0)
    const [questions, setQuestions] = useState([])
    const [ansList, setAnsList] = useState([])
    const [error, setError] = useState(false)
    const [finish, setFinish] = useState(false)
    const [retro, setRetro] = useState(false)

    const {
        seconds,
        minutes,
        hours
    } = useTimer({ expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + time), onExpire: () => { setFinish(true) } });

    useEffect(() => {
        const getTest = () => {
            fetch(db.url + '?table=test&where=id IN (' + id + ')')
                .then(res => res.json())
                .then(res => {
                    setTest(res[0])
                    if (res[0].tipo === 1) setRetro(true)
                })
                .catch(err => setError(true))
        }
        const getQuestions = () => {
            fetch(db.url + '?table=pregunta&column=id&where=test IN (' + id + ')&extra=GROUP BY id ORDER BY RAND()')
                .then(res => res.json())
                .then(res => {
                    setQuestions(res)
                })
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
            <div className={'test-body' + !retro ? 'sim' : ''}>
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

                            <div className='test-contenedor'>
                                <div className='test-questions-container'>
                                    <div>
                                        {questions.map(q => (
                                            <div key={q.id} id={q.id}>
                                                <Question id={q.id} retro={retro} suma={suma} ansList={ansList} setAnsList={setAnsList} />
                                            </div>
                                        ))}
                                        <div className='question-validate'>
                                            <button className='btn' onClick={() => { setFinish(true) }}>Terminar intento</button>
                                        </div>
                                    </div>
                                </div>

                                <div className='testresult-container inset'>
                                    <span className='title'><b>PROGRESO ACTUAL</b></span>
                                    <div className='testresult-score inset'>
                                        <span className='lbl'>Has obtenido</span>
                                        <span className='lbl'>
                                            <b>{total} de {questions.length}</b>
                                        </span>
                                        <span className='lbl'>aciertos.</span>
                                    </div>



                                    <div className='testresult-btns-container'>
                                        <span className='title'><b>NAVEGACIÓN DE PREGUNTAS</b></span>
                                        <div className='testresult-btns inset'>
                                            {questions.map(q => (
                                                ansList[q.id] === undefined ?
                                                    <a href={"#q" + q.id} type='button' className='btn-question-nans it-inset-shadow' key={q.id}>
                                                        {questions.indexOf(q) + 1}
                                                    </a> :
                                                    <a href={"#q" + q.id} type='button' className='btn-question-ans it-inset-shadow' key={q.id}>
                                                        {questions.indexOf(q) + 1}
                                                    </a>
                                            ))}
                                        </div>

                                    </div>


                                    {retro === false &&
                                        <div className='testresult-btns-container'>
                                            <span className='title'><b>TIEMPO RESTANTE</b></span>
                                            <div className='testresult-score inset'>
                                                <span className='lbl'>{hours > 9 ? hours : "0" + hours}:{minutes > 9 ? minutes : "0" + minutes}:{seconds > 9 ? seconds : "0" + seconds}</span>
                                            </div>

                                        </div>
                                    }
                                </div>
                            </div>



                        </React.Fragment>
                    }
                    {!!finish && <TestResult ansList={ansList} total={questions.length} approveTest={test.aprobacion} setCompleted={setCompleted} />}
                </div>
            </div>

        </React.Fragment >
    );
}

export default Test;