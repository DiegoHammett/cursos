import React, { useState, useEffect } from 'react';
import { db } from '../dbconnect';
import './question_styles.css';
import TextVisualizer from '../TextVisualizer';

function Question({ id, retro, suma, setAnsList, ansList }) {

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
            fetch(db.url + '?table=respuesta&where=pregunta IN (' + id + ')&extra=GROUP BY id ORDER BY RAND()')
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
            if (parseInt(value.id) === parseInt(e.target.id)) {
                setAnswer(value.id)
                setAnsList({ ...ansList, [id]: value.id })
            }
        }
    }

    return (
        <React.Fragment>
            <div className='question-container inset' id={'q' + question.id}>
                <div className='question-header'>
                    {/* <span className='pill'>Pregunta:</span> */}
                    <h4 className='question-pregunta title'>
                        <TextVisualizer text={question.pregunta} />
                    </h4>
                </div>
                {question.imagen &&
                    <div className='question-imagen it-inset-shadow'>
                        <img src={db.docs + question.imagen} className='question-img'></img>
                    </div>
                }

                <div className='question-q-container'>
                    <span className='lbl'>Selecciona una respuesta:</span>
                    {options.map(op => (
                        <div className='q_card' key={op.id}>
                            <input className='q_radio it-inset-shadow' type='radio' name={question.id} id={op.id} onClick={handleSelectOption} />
                            <label className='q_content ' htmlFor={op.id}>
                                <TextVisualizer text={op.respuesta} />
                            </label>
                        </div>
                    ))}
                </div>

                {(retro === true) && !(correct === 1 || correct === 0) &&
                    <div className='question-validate'>
                        <button className='btn' id={question.id} onClick={handleAnswer}>Responder pregunta</button>
                    </div>
                }

                {(retro === true) && (correct === 1 || correct === 0) &&
                    <div className='question-retro'>
                        {correct === 1 && <p className='question-retro-c'> CORRECTO</p>}
                        {correct === 0 && <p className='question-retro-i'>INCORRECTO</p>}
                        <p className='question-retro-r lbl'>{(correct === 1 || correct === 0) && question.retro}</p>
                    </div>
                }
            </div>
        </React.Fragment >
    );
}

export default Question;