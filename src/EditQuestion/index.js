import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './createquestion_styles.css'

function EditQuestion({ testID, setEditQuestion, mode, questionID }) {

    const [quest, setQuest] = useState()
    const [defQuest, setDefQuest] = useState()
    const [defRetro, setDefRetro] = useState()
    const [defAns1, setDefAns1] = useState()
    const [defAns2, setDefAns2] = useState()
    const [defAns3, setDefAns3] = useState()
    const [defAns4, setDefAns4] = useState()
    const [cQuest, setCQuest] = useState()
    const [retro, setRetro] = useState()
    const [answers, setAnswers] = useState([])
    const [answersList, setAnswersList] = useState([])

    const [error, setError] = useState(false)

    useEffect(() => {
        const getQuestions = () => {
            fetch(db.url + '?table=pregunta&where=id IN (' + questionID + ')')
                .then(res => res.json())
                .then(res => {
                    setDefQuest(res[0].pregunta)
                    setDefRetro(res[0].retro)
                })
                .catch(err => setError(true))
        }
        const getAnswers = () => {
            fetch(db.url + '?table=respuesta&where=pregunta IN (' + questionID + ')')
                .then(res => res.json())
                .then(res => {
                    setAnswersList(res)
                    setDefAns1(res[0].respuesta)
                    if (parseInt(res[0].tipo) === 1) document.getElementById("rans1").defaultChecked = true
                    setDefAns2(res[1].respuesta)
                    if (parseInt(res[1].tipo) === 1) document.getElementById("rans2").defaultChecked = true
                    setDefAns3(res[2].respuesta)
                    if (parseInt(res[2].tipo) === 1) document.getElementById("rans3").defaultChecked = true
                    setDefAns4(res[3].respuesta)
                    if (parseInt(res[3].tipo) === 1) document.getElementById("rans4").defaultChecked = true
                })
                .catch(err => setError(true))
        }
        if (mode === "edit") {
            getQuestions()
            getAnswers()
        }
    }, [mode, questionID])

    const handleSave = () => {
        if (mode === "create") handleInsert()
        else handleUpdate()
    }

    const handleInsert = () => {
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
                    handleInsertAnswers(res.id.replaceAll('"', ""))
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleUpdate = () => {
        if (quest || retro) UpdateQuestion()
        UpdateAnswers()
        if (cQuest) UpdateZerosIncorrect()
        setEditQuestion(false)
    }

    const UpdateZerosIncorrect = () => {
        const formData = new FormData()
        formData.append("tipo", 0)
        fetch(db.url + '?mode=update&table=respuesta&id=pregunta&condition=' + questionID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") UpdateOneCorrect()
            }
            ).catch(err => setError(true))
    }

    const UpdateOneCorrect = () => {
        const formData = new FormData()
        formData.append("tipo", 1)
        fetch(db.url + '?mode=update&table=respuesta&id=id&condition=' + answersList[cQuest - 1].id, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status !== "OK") setError(true)
            }
            ).catch(err => setError(true))
    }

    const UpdateQuestion = () => {
        const formData = new FormData()
        if (quest) formData.append("pregunta", quest)
        if (retro) formData.append("retro", retro)
        fetch(db.url + '?mode=update&table=pregunta&id=id&condition=' + questionID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status !== "OK") setError(true)
            }).catch(err => setError(true))
    }

    const UpdateAnswers = () => {
        const map = new Map(Object.entries(answers))
        for (let [key, value] of map) {
            const formData = new FormData()
            formData.append("respuesta", value)
            fetch(db.url + '?mode=update&table=respuesta&id=id&condition=' + answersList[key - 1].id, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status !== "OK") setError(true)
                }).catch(err => setError(true))
        }
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
        setEditQuestion(false)
    }

    const handleAnswers = (e) => {
        setAnswers({ ...answers, [e.target.id]: e.target.value })
    }

    return (
        <React.Fragment>
            <div className='cq-container inset'>
                <div className='cq-header'>
                    <div className='cq-title title'>
                        <b className='b-medium'>Editar pregunta</b>
                    </div>

                    <span className='cq-description description'>
                        Llene todos los campos con la información que se indica para crear/editar una pregunta.
                    </span>
                    <p className='pill'>
                        <i className='bx bx-info-circle'></i>Todos los campos deben ser llenados.
                    </p>

                </div>
                <div className='cq-question'>
                    <label className='lbl'>Pregunta:</label>
                    <input className='input-text' type='text' onChange={(e) => { setQuest(e.target.value) }} defaultValue={defQuest}></input>
                </div>
                <div className='cq-answers'>
                    <label className='lbl'>Respuestas:</label>
                    <div className='cq-answers_inputs'>
                        <div className='cq-answers_inputs-item'>
                            <input type='radio' name='answers' id="rans1" onChange={(e) => { setCQuest(1) }} />
                            <input className='input-text' type='text' id="1" onChange={handleAnswers} defaultValue={defAns1}></input>
                        </div>

                        <div className='cq-answers_inputs-item'>
                            <input type='radio' name='answers' id="rans2" onChange={(e) => { setCQuest(2) }} />
                            <input className='input-text' type='text' id="2" onChange={handleAnswers} defaultValue={defAns2}></input>
                        </div>

                        <div className='cq-answers_inputs-item'>
                            <input type='radio' name='answers' id="rans3" onChange={(e) => { setCQuest(3) }} />
                            <input className='input-text' type='text' id="3" onChange={handleAnswers} defaultValue={defAns3}></input>
                        </div>

                        <div className='cq-answers_inputs-item'>

                            <input type='radio' name='answers' id="rans4" onChange={(e) => { setCQuest(4) }} />
                            <input className='input-text' type='text' id="4" onChange={handleAnswers} defaultValue={defAns4}></input>
                        </div>
                    </div>
                </div>
                <div className='cq-question'>
                    <label className='lbl'>Justificación:</label>
                    <input className='input-text' type='text' onChange={(e) => { setRetro(e.target.value) }} defaultValue={defRetro}></input>
                </div>

                <div className='cq-footer'>
                    {!!error &&
                        <p className='pill-error'><i className='bx bx-error icon' ></i>Ha ocurrido un error</p>
                    }<div className='btn-container'>
                        <button className='btn' onClick={handleSave} >Guardar</button>
                        <button className='btn' onClick={() => { setEditQuestion(false) }}>Cancelar</button>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default EditQuestion;