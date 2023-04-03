import React, { useState, useEffect } from 'react';
import { db } from '../dbconnect';

function Question({ id }) {

    const [question, setQuestion] = useState([])
    const [options, setOptions] = useState([])
    const [error, setError] = useState(false)
    const [answer, setAnswer] = useState()
    const [correct, setCorrect] = useState([])

    useEffect(() => {
        const getQuestion = () => {
            fetch(db.url + '?table=pregunta&where=id IN (' + id + ')')
                .then(res => res.json())
                .then(res => setQuestion(res[0]))
                .catch(err => setError(true))
        }
        const getOptions = () => {
            fetch(db.url + '?table=respuesta&where=pregunta IN (' + id + ')')
                .then(res => res.json())
                .then(res => setOptions(res))
                .catch(err => setError(true))
        }
        getQuestion();
        getOptions();
    }, [id])

    const handleAnswer = () => {
        fetch(db.url + '?table=respuesta&column=tipo&where=id IN (' + answer + ')')
            .then(res => res.json())
            .then(res => setCorrect(res[0].tipo))
            .catch(err => setError(true))
    }

    return (
        <React.Fragment>
            <div>
                <h2>{question.pregunta}</h2>
                {options.map(op => (
                    <div key={op.id}>
                        <input type="radio" name="answer" value={op.id} onChange={(e) => { setAnswer(e.target.value) }} />
                        <label htmlFor="contactChoice1">{op.respuesta}</label>
                    </div>
                ))}
                <button onClick={handleAnswer}>Enviar</button>
            </div>
            {correct === '1' && <p>EL RESULTADO ES CORRECTO</p>}
            {correct === '0' && <p>EL RESULTADO ES INCORRECTO</p>}
        </React.Fragment>
    );
}

export default Question;