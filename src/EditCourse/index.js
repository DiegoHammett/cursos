import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import EditTest from '../EditTest'

function EditCourse({ courseID }) {

    const [error, setError] = useState(false)
    const [editTest, setEditTest] = useState(false)
    const [editInfo, setEditInfo] = useState(false)
    const [moduleID, setModuleID] = useState()
    const [modules, setModules] = useState([])
    const [editName, setEditName] = useState(false)
    const [courseName, setCourseName] = useState()
    const [course, setCourse] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [addInfo, setAddInfo] = useState(false)

    useEffect(() => {
        const getModules = () => {
            fetch(db.url + '?table=lista_modulos&where=curso IN (' + courseID + ')')
                .then(res => res.json())
                .then(res => setModules(res))
                .catch(err => setError(true))
        }
        getModules()
    }, [courseID, editTest, refresh])

    useEffect(() => {
        const getCourse = () => {
            fetch(db.url + '?table=curso&where=id IN (' + courseID + ')')
                .then(res => res.json())
                .then(res => setCourse(res[0]))
                .catch(err => setError(true))
        }
        getCourse()
    },[courseID, editName])

    const handleEdit = (id, tipo) => {
        setModuleID(id)
        if(parseInt(tipo) === 2) setEditTest(true)
    }

    const handleInsertTest = () => {
        const formData = new FormData()
        formData.append("nombre", "Nuevo examen")
        fetch(db.url + "?mode=insert&table=test", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    getLastOrder(res.id.replaceAll('"', ""))
                else console.log(res)
            }).catch(err => console.log(err))
    }

    const getLastOrder = (testID) => {
        fetch(db.url + '?table=modulos&column=max(orden) as max&where=curso IN (' + courseID + ')')
            .then(res => res.json())
            .then(res => {
                insertTestModule(testID, res[0].max)
            })
            .catch(err => console.log(err))
    }

    const insertTestModule = (testID, maxOrder) => {
        const formData = new FormData()
        formData.append("id_test", testID)
        formData.append("orden", maxOrder + 1)
        formData.append("curso", courseID)
        formData.append("tipo", 2)
        fetch(db.url + "?mode=insert&table=modulos", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setModuleID(testID)
                    setEditTest(true)
                }
                else console.log(res)
            }).catch(err => console.log(err))
    }

    const handleDelete = (e) => {
        fetch(db.url + "?table=modulos&id=" + e.target.id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") setRefresh(!refresh)
            }).catch(err => console.log(err))
    }

    const handleChangeTestName = () => {
        const formData = new FormData()
        formData.append("nombre", courseName)
        fetch(db.url + "?mode=update&table=curso&id=id&condition=" + courseID + "", {
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
            {!editInfo && !editTest &&
                <div className='et-body'>
                    <div className='et-container inset'>
                        <div className='cq-header'>
                            <label className='lbl'>Nombre del curso </label>
                            {!editName &&
                                <div className='et-lbl-name inset'>
                                    <label className='et-lbl-editar'><b className='b-medium'>{course.nombre}</b></label>
                                    <button className='et-btn-editar' onClick={() => { setEditName(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                </div>
                            }
                            {!!editName &&
                                <div className='et-lbl-name inset'>
                                    <input className='et-input-text' type='text' defaultValue={course.nombre} onChange={(e) => { setCourseName(e.target.value) }}></input>
                                    <button className='et-btn-editar' onClick={handleChangeTestName}><i className='bx bx-save icon' ></i>Guardar</button>
                                </div>
                            }
                        </div>
                        <div className='et-content-2_body '>
                            {modules.map(module => (
                                <div key={module.modulo} className='et-question-item inset' draggable="true">
                                    <div className='et-question-q'>
                                        {module.nombre}
                                    </div>
                                    <div className='et-question-btns'>
                                        <button className='btn-s' id={module.id} name={module.tipo} onClick={() => { handleEdit(module.id, module.tipo) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                        <button className='btn-s' id={module.modulo} name={module.tipo} onClick={handleDelete}><i className='bx bx-trash icon'></i>Eliminar</button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <div className='btn-container'>
                            <button className="btn" onClick={handleInsertTest}>Agregar examen</button>
                            <button className="btn" onClick={() => { setAddInfo(true) }}>Agregar clase</button>
                        </div>
                    </div>
                </div>}
            {!!editTest && <EditTest testID={moduleID} setEditTest={setEditTest}></EditTest>}
        </React.Fragment>
    )
}

export default EditCourse