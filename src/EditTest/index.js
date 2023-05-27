import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect';
import EditQuestion from '../EditQuestion';
import './edittest_styles.css';
import MathExp from '../MathExp';

function EditTest({ testID, setEditTest }) {

    const [questionMode, setQuestionMode] = useState()
    const [editQuestion, setEditQuestion] = useState(false)
    const [questionID, setQuestionID] = useState()
    const [refresh, setRefresh] = useState(false)
    const [editName, setEditName] = useState(false)
    const [editApprove, setEditApprove] = useState(false)
    const [approve, setApprove] = useState(false)
    const [testName, setTestName] = useState()
    const [questions, setQuestions] = useState([])
    const [test, setTest] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const getQuestions = () => {
            fetch(db.url + '?table=pregunta&where=test IN (' + testID + ')')
                .then(res => res.json())
                .then(res => setQuestions(res))
                .catch(err => setError(true))
        }
        getQuestions()
    }, [editQuestion, testID, refresh])

    useEffect(() => {
        const getTest = () => {
            fetch(db.url + '?table=test&where=id IN (' + testID + ')')
                .then(res => res.json())
                .then(res => setTest(res[0]))
                .catch(err => setError(true))
        }
        getTest()
    }, [editName, editApprove, testID])

    const handleChangeTestName = () => {
        const formData = new FormData()
        formData.append("nombre", testName)
        fetch(db.url + "?mode=update&table=test&id=id&condition=" + testID + "", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    setEditName(false)
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleChangeApprove = () => {
        const formData = new FormData()
        if (approve > 10)
            formData.append("aprobacion", 10)
        else
            formData.append("aprobacion", approve)
        fetch(db.url + "?mode=update&table=test&id=id&condition=" + testID + "", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    setEditApprove(false)
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleDeleteQuestion = (e) => {
        const formData = new FormData()
        formData.append("id", e.target.id)
        fetch(db.url + "?table=pregunta&id=" + e.target.id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") setRefresh(!refresh)
            }).catch(err => console.log(err))
    }

    const handleEditQuestion = (id) => {
        setQuestionID(id)
        setQuestionMode("edit")
        setEditQuestion(true)

    }

    const handleCreateQuestion = (e) => {
        setEditQuestion(true)
        setQuestionMode("create")
    }

    return (
        <React.Fragment>
            <button className='btn' onClick={() => { setEditTest(false) }}><i className='bx bx-left-arrow-alt'></i>Regresar</button>
            <div className='et-body'>
                <div className='et-container inset'>
                    <div className='et-header'>
                        <div className='et-title title'>
                            <b className='b-medium'>Editar test</b>
                        </div>
                        <span className='cq-description description'>
                            Aquí puede editar el test.
                        </span>
                    </div>
                    <div className='et-content-3'>
                        <div className='et-nombretest'>
                            <label className='lbl'>Nombre del test </label>
                            {!editName &&
                                <div className='ec-lbl-name inset'>
                                    <label className='et-lbl-editar it-inset-shadow' onClick={() => { setEditName(true) }}><b className='b-medium'>{test.nombre}</b></label>
                                    <button className='ec-btn-editar' onClick={() => { setEditName(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                </div>
                            }
                            {!!editName &&
                                <div className='ec-lbl-name inset'>
                                    <input autoFocus className='et-input-text it-inset-shadow' type='text' defaultValue={test.nombre} onChange={(e) => { setTestName(e.target.value) }}></input>
                                    
                                    <button className='ec-btn-editar' onClick={handleChangeTestName}><i className='bx bx-save icon' ></i>Guardar</button>
                                </div>
                            }
                        </div>

                        <div className='et-calificacion'>
                            <label className='lbl'>Calificación aprobatoria </label>
                            {!editApprove &&
                                <div className='ec-lbl-name inset'>
                                    <label className='et-lbl-editar it-inset-shadow'><b className='b-medium'>{test.aprobacion}</b></label>
                                    <button className='ec-btn-editar' onClick={() => { setEditApprove(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                </div>
                            }
                            {!!editApprove &&
                                <div className='ec-lbl-name inset'>
                                    <input className='et-input-text it-inset-shadow' type='number' min='1' max='10' defaultValue={test.aprobacion} onChange={(e) => { setApprove(e.target.value) }}></input>
                                    <button className='ec-btn-editar' onClick={handleChangeApprove}><i className='bx bx-save icon' ></i>Guardar</button>
                                </div>
                            }
                        </div>

                    </div>
                    <div className='et-content'>



                    </div>
                    <div className='et-footer'>
                    </div>
                </div>

                <div className='et-content-2 inset'>
                    <div className='et-container-2 '>
                        <div className='et-header'>
                            <div className='et-title title'>
                                <b className='b-medium'>Preguntas existentes</b>
                            </div>
                            <p className='cq-description description'>
                                Agregue, modifique o elimine preguntas en esta sección.
                            </p>
                        </div>
                        <div className='et-content-2_body '>
                            {questions.map(q => (
                                <div key={q.id} className='et-question-item inset'>
                                    <div className='et-question-q'>
                                        <MathExp text={q.pregunta}></MathExp>
                                    </div>
                                    <div className='et-question-btns'>
                                        <button className='btn-s' name={q.id} onClick={() => { handleEditQuestion(q.id) }}><i className='bx bx-edit icon-drag' ></i>Editar</button>
                                        <button className='btn-s' name={q.id} onClick={handleDeleteQuestion}><i className='bx bx-trash icon'></i>Eliminar</button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <div className='et-content-2_footer'>
                            <div className='btn-container'>
                                {!editQuestion && <button className='btn' onClick={handleCreateQuestion}><i className='bx bx-add-to-queue icon' ></i>Agregar pregunta</button>}
                                {!!editQuestion && <EditQuestion testID={testID} setEditQuestion={setEditQuestion} mode={questionMode} questionID={questionID} />}
                            </div >

                            {!!error && <p className='pill-error'><i className='bx bx-error icon' ></i>Ha ocurrido un error</p>}
                        </div>
                    </div>
                </div>

                <div className='et-content-3'>
                </div>
            </div>
        </React.Fragment >
    )
}

export default EditTest;