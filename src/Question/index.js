import React, { useState, useEffect } from 'react';
import { db } from '../dbconnect';
import './question_styles.css';

function Question({ id, retro, suma }) {

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
            .then(res => {
                setCorrect(res[0].tipo)
                suma(res[0].tipo)
            })
            .catch(err => setError(true))

        const map = new Map(Object.entries(options))
        for (let [key, value] of map) {

            document.getElementById(value.id).disabled = true
            document.getElementById(value.id).style.opacity = 0.75

        }
    }

    const handleSelectOption = (e) => {
        const map = new Map(Object.entries(options))
        for (let [key, value] of map) {
            if (value.id === e.target.id) {
                setAnswer(value.id)
                document.getElementById(value.id).style.background = "#9d2053"
            } else {
                document.getElementById(value.id).style.background = "rgb(29, 29, 29)"
            }

        }
    }

    return (
        <React.Fragment>
            <div className='question-container'>
                <h4 className='question-pregunta'>{question.pregunta}</h4>
                {options.map(op => (
                    <button className='question-respuesta' key={op.id} name={question.id} value={op.id} id={op.id} onClick={handleSelectOption}>
                        {op.respuesta}
                    </button>
                ))}
                {!(correct === "1" || correct === "0") &&
                    <div className='question-validate'>
                        <button className='question-button-validate' id={question.id} onClick={handleAnswer}>Enviar respuesta</button>
                    </div>

                }

                {(retro === true) && (correct === "1" || correct === "0") &&
                    <div className='question-retro'>
                        {correct === "1" && <p className='question-retro-c'><i class='bx bx-check bx-tada' ></i> CORRECTO</p>}
                        {correct === "0" && <p className='question-retro-i'><i class='bx bx-x bx-tada' ></i> INCORRECTO</p>}
                        <p className='question-retro-r'>{(correct === "1" || correct === "0") && question.retro}</p>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

export default Question;