import React, { useState } from 'react'
import { db } from '../dbconnect'
import './createquestion_styles.css'

function CreateQuestion({ testID, setCreate }) {

    const [quest, setQuest] = useState()
    const [cQuest, setCQuest] = useState()
    const [retro, setRetro] = useState()
    const [answers, setAnswers] = useState([])

    const [error, setError] = useState(false)

    const handleSave = () => {
        const formData = new FormData()
        formData.append("pregunta", quest)
        formData.append("retro", retro)
        formData.append("test", testID)
        fetch(db.url + '?mode=insert&table=pregunta', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    handleInsertAnswers(res.id)
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleInsertAnswers = (id) => {
        const map = new Map(Object.entries(answers))
        for (let [key, value] of map) {
            const formData = new FormData()
            if (parseInt(key) === parseInt(cQuest))
                formData.append("tipo", 1)
            else
                formData.append("tipo", 0)
            formData.append("pregunta", id)
            formData.append("respuesta", value)
            fetch(db.url + '?mode=insert&table=respuesta', {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status !== "OK") setError(true)
                }).catch(err => setError(true))
        }
        setCreate(false)
    }

    const handleAnswers = (e) => {
        setAnswers({ ...answers, [e.target.id]: e.target.value })
    }

    return (
        <React.Fragment>
            
                <div className='cq-container inset'>
                    <div className='cq-header'>
                        <div className='cq-title title'>
                            <b className='b-medium'>Crear pregunta</b>
                        </div>

                        <span className='cq-description description'>
                            Llene todos los campos con la información que se indica para crear una pregunta.
                        </span>
                        <p className='pill'>
                            <i class='bx bx-info-circle'></i>Todos los campos deben ser llenados.
                        </p>

                    </div>
                    <div className='cq-question'>
                        <label className='lbl'>Pregunta:</label>
                        <input className='input-text' type='text' onChange={(e) => { setQuest(e.target.value) }}></input>
                    </div>
                    <div className='cq-answers'>
                        <label className='lbl'>Respuestas:</label>
                        <div className='cq-answers_inputs'>
                            <div className='cq-answers_inputs-item'>
                                <input type='radio' name='answers' onChange={(e) => { setCQuest(1) }} />
                                <input className='input-text' type='text' id="1" onChange={handleAnswers}></input>
                            </div>

                            <div className='cq-answers_inputs-item'>
                                <input type='radio' name='answers' onChange={(e) => { setCQuest(2) }} />
                                <input className='input-text' type='text' id="2" onChange={handleAnswers}></input>
                            </div>

                            <div className='cq-answers_inputs-item'>
                                <input type='radio' name='answers' onChange={(e) => { setCQuest(3) }} />
                                <input className='input-text' type='text' id="3" onChange={handleAnswers}></input>
                            </div>

                            <div className='cq-answers_inputs-item'>

                                <input type='radio' name='answers' onChange={(e) => { setCQuest(4) }} />
                                <input className='input-text' type='text' id="4" onChange={handleAnswers}></input>
                            </div>
                        </div>
                    </div>
                    <div className='cq-question'>
                        <label className='lbl'>Justificación:</label>
                        <input className='input-text' type='text' onChange={(e) => { setRetro(e.target.value) }}></input>
                    </div>

                    <div className='cq-footer'>
                        {!!error &&
                            <p className='pill-error'><i class='bx bx-error icon' ></i>Ha ocurrido un error</p>
                        }
                        <button className='btn' onClick={handleSave} >Guardar</button>

                    </div>
                </div>
            


            {/* <br></br><br></br><br></br><br></br>
            Pregunta:
            <input type='text' onChange={(e) => { setQuest(e.target.value) }}></input>
            <div>
                Respuestas:
                <input type='radio' name='answers' onChange={(e) => { setCQuest(1) }} /><input type='text' id="1" onChange={handleAnswers}></input>
                <input type='radio' name='answers' onChange={(e) => { setCQuest(2) }} /><input type='text' id="2" onChange={handleAnswers}></input>
                <input type='radio' name='answers' onChange={(e) => { setCQuest(3) }} /><input type='text' id="3" onChange={handleAnswers}></input>
                <input type='radio' name='answers' onChange={(e) => { setCQuest(4) }} /><input type='text' id="4" onChange={handleAnswers}></input>
            </div>
            Justificación:
            <input type='text' onChange={(e) => { setRetro(e.target.value) }}></input>
            <button onClick={handleSave} >Guardar</button> */}

        </React.Fragment>
    )
}

export default CreateQuestion;