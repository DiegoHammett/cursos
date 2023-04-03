import React, { useEffect, useState } from 'react'
import '../App.css';
import { db } from '../dbconnect'
import Question from '../Question'
import TestResult from '../TestResult'
import Navbar from '../Navbar';

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
        setTotal(total + val)
    }

    return (
        <React.Fragment>
            <Navbar></Navbar>
            <br/><br/><br/>
            <div className='App'>
                <div className='App-header'>
                    <h1>{test.nombre}</h1>
                    {!finish && <div>
                        {questions.map(q => (
                            <div key={q.id}>
                                <Question id={q.id} retro={type} suma={suma} />
                            </div>
                        ))}
                        <button onClick={() => { setFinish(true) }}>Terminar intento</button>
                    </div>
                    }
                    <TestResult result={total} total={questions.length} />
                </div>
            </div>
            <br/><br/><br/>
        </React.Fragment>
    );
}

export default Test;