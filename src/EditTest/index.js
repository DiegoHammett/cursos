import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect';
import CreateQuestion from '../CreateQuestion';

function EditTest({ testID }) {

    const [create, setCreate] = useState(false)
    const [editName, setEditName] = useState(false)
    const [testName, setTestName] = useState()
    const [questions, setQuestions] = useState([])
    const [test, setTest] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(db.url + '?table=pregunta&where=test IN (' + testID + ')')
            .then(res => res.json())
            .then(res => setQuestions(res))
            .catch(err => setError(true))
    }, [create, testID])

    useEffect(() => {
        fetch(db.url + '?table=test&where=id IN (' + testID + ')')
            .then(res => res.json())
            .then(res => setTest(res[0]))
            .catch(err => setError(true))
    }, [editName, testID])

    const handleAddQuest = () => {
        setCreate(true)
    }

    const handleChangeTestName = () => {
        const formData = new FormData()
        formData.append("nombre",testName)
        fetch(db.url + "?mode=update&table=test&id=id&condition="+testID+"", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") 
                    setEditName(false)
                else setError(true)
            }).catch(err => setError(true))
    }

    return (
        <React.Fragment>

            {!editName && <div><h2>{test.nombre}</h2><button onClick={() => { setEditName(true) }}>Editar</button></div>}
            {!!editName && <div><input type='text' defaultValue={test.nombre} onChange={(e) => {setTestName(e.target.value)}}></input><button onClick={handleChangeTestName}>Guardar</button></div>}
            {questions.map(q => (
                <div key={q.id}>
                    <p>{q.pregunta}</p>
                </div>
            ))}
            {!create && <button onClick={handleAddQuest}>Agregar pregunta</button>}
            {!!create && <CreateQuestion testID={testID} setCreate={setCreate} />}
            {!!error && <p>Ha ocurrido un error</p>}
        </React.Fragment >
    )
}

export default EditTest;