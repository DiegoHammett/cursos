import React, { useEffect, useState } from 'react'
import '../App.css';
import { db } from '../dbconnect'
import Question from '../Question'
import TestResult from '../TestResult'
import Navbar from '../Navbar';
import './test_styles.css'

function Test({ id, type }) {

    const [test, setTest] = useState([])
    const [total, setTotal] = useState(0)
    const [questions, setQuestions] = useState([])
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
            fetch(db.url + '?table=pregunta&column=id&where=test IN (' + id + ')')
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
            <Navbar></Navbar>

            <div className='test-body'>
                <div className='test-container '>
                    <div className='test-header'>
                        <div className='test-title title'>
                            <b className='b-medium'>{test.nombre}</b>
                        </div>

                        <span className='test-description description'>
                            Seleccione la respuesta que considere correcta y presione el botón <b className='b-medium'>'Responder pregunta'</b> para que su respuesta sea registrada. Presione el botón <b className='b-medium'>'Terminar intento'</b> al finalizar.
                        </span>
                        <p className='pill'>
                            <i class='bx bx-info-circle'></i>Tu puntuación se verá reflejada en el recuadro flotante cada que respondas una pregunta.
                        </p>
                    </div>

                    {!finish &&
                        <React.Fragment>

                            <div className='test-questions-container'>
                                <div>
                                    {questions.map(q => (
                                        <div key={q.id}>
                                            <Question id={q.id} retro={type} suma={suma} />
                                        </div>
                                    ))}
                                    <div className='question-validate'>
                                        <button className='question-button-validate' onClick={() => { setFinish(true) }}>Terminar intento</button>
                                    </div>
                                    <TestResult result={total} total={questions.length} />
                                </div>
                            </div>
                        </React.Fragment>


                    }
                    {!!finish &&
                        <React.Fragment>
                            <div className='finish-container inset'>
                                <div className='finish-left'>
                                    <div class="flip">
                                        <div class="content">
                                            <div class="front">
                                                <h2>{total * 10 / questions.length}</h2>
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
                                                <span><b>{questions.length}</b></span>
                                            </div>
                                            <div className='finish-left-info_item inset'>
                                                <label className='lbl'>Preguntas contestadas correctamente</label>
                                                <span><b>{total}</b></span>
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

                    }
                </div>
            </div>

        </React.Fragment >
    );
}

export default Test;