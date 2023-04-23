import React, { useState } from 'react'
import { db } from '../dbconnect'

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
            <button onClick={handleSave} >Guardar</button>
            {!!error && <p>Ha ocurrido un error</p>}
        </React.Fragment>
    )
}

export default CreateQuestion;