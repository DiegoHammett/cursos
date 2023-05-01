import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect';
import CreateQuestion from '../CreateQuestion';
import './edittest_styles.css';

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

    return (
        <React.Fragment>

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
                    <div className='et-content'>
                        <label className='lbl'>Nombre del test </label>

                        {!editName &&
                            <div className='et-lbl-name inset'>
                                <label className='et-lbl-editar'><b className='b-medium'>{test.nombre}</b></label>
                                <button className='et-btn-editar' onClick={() => { setEditName(true) }}><i class='bx bx-edit icon' ></i>Editar nombre</button>
                            </div>
                        }
                        {!!editName &&
                            <div className='et-lbl-name inset'>
                                <input className='et-input-text' type='text' defaultValue={test.nombre} onChange={(e) => { setTestName(e.target.value) }}></input>
                                <button className='et-btn-editar' onClick={handleChangeTestName}><i class='bx bx-save icon' ></i>Guardar</button>
                            </div>
                        }



                    </div>



                    <div className='et-footer'>

                    </div>
                </div>

                <div className='et-content-2'>

                    {!create &&
                        <button className='btn' onClick={handleAddQuest}><i class='bx bx-add-to-queue icon' ></i>Agregar pregunta</button>
                    }
                    {!!create &&
                        <CreateQuestion testID={testID} setCreate={setCreate} />
                    }
                    {
                        !!error && <p className='pill-error'><i class='bx bx-error icon' ></i>Ha ocurrido un error</p>
                    }
                </div>

                <div className='et-content-2'>
                    {questions.map(q => (
                        <div key={q.id}>
                            <p>{q.pregunta}</p>
                        </div>
                    ))
                    }
                </div>

            </div>

            {/* {!editName &&
                <div className='et-name'>
                    <h2>{test.nombre}</h2>
                    <button onClick={() => { setEditName(true) }}>Editar</button>
                </div>
            }
            {!!editName &&
                <div className='et-name_edit'>
                    <input type='text' defaultValue={test.nombre} onChange={(e) => { setTestName(e.target.value) }}></input>
                    <button onClick={handleChangeTestName}>Guardar</button>
                </div>
            } */}

            {/* {questions.map(q => (
                <div key={q.id}>
                    <p>{q.pregunta}</p>
                </div>
            ))
            }
            {!create &&
                <button onClick={handleAddQuest}>Agregar pregunta</button>
            }
            {!!create &&
                <CreateQuestion testID={testID} setCreate={setCreate} />
            }
            {
                !!error && <p>Ha ocurrido un error</p>
            } */}
        </React.Fragment >
    )
}

export default EditTest;