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

    const iterateTest = () => {

    }

    return (
        <React.Fragment>
            <Navbar></Navbar>

            <div className='test-body'>
                <div className='test-container'>
                    <div className='test-title'>
                        {test.nombre}
                    </div>
                    {!finish &&
                        <React.Fragment>
                            <div className='test-description inset'>
                                <p>Seleccione la respuesta que considere correcta y presione 'Enviar respuesta'. <br />Al finalizar, presione el botón 'Terminar intento' cuando se active.</p>
                            </div>
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
                    {!!finish && <div>
                        <h1 className='test-description'>Has completado el test satisfactoriamente, con un resultado de: {total}/{questions.length} </h1>
                    </div>
                    }
                </div>
            </div>

        </React.Fragment >
    );
}

export default Test;