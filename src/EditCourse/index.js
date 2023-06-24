import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import EditTest from '../EditTest'
import EditClass from '../EditClass'
import './editcourse_styles.css'

function EditCourse({ courseID }) {

    const [error, setError] = useState(false)
    const [editTest, setEditTest] = useState(false)
    const [editClass, setEditClass] = useState(false)
    const [moduleID, setModuleID] = useState()
    const [modules, setModules] = useState([])
    const [editName, setEditName] = useState(false)
    const [editDesc, setEditDesc] = useState(false)
    const [courseName, setCourseName] = useState()
    const [courseDesc, setCourseDesc] = useState()
    const [course, setCourse] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getModules = () => {
            fetch(db.url + '?table=lista_modulos&where=curso IN (' + courseID + ')')
                .then(res => res.json())
                .then(res => setModules(res))
                .catch(err => setError(true))
        }
        getModules()
    }, [courseID, editTest, refresh, editClass])

    useEffect(() => {
        const getCourse = () => {
            fetch(db.url + '?table=curso&where=id IN (' + courseID + ')')
                .then(res => res.json())
                .then(res => setCourse(res[0]))
                .catch(err => setError(true))
        }
        getCourse()
    }, [courseID, editName, editDesc])

    const handleEdit = (id, tipo) => {
        setModuleID(id)
        if (parseInt(tipo) === 2) setEditTest(true)
        else setEditClass(true)
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
                    getLastOrder(res.id.replaceAll('"', ""), 2)
                else console.log(res)
            }).catch(err => console.log(err))
    }

    const handleInsertClass = () => {
        const formData = new FormData()
        formData.append("nombre", "Nueva clase")
        fetch(db.url + "?mode=insert&table=clase", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    getLastOrder(res.id.replaceAll('"', ""), 1)
                else console.log(res)
            }).catch(err => console.log(err))
    }

    const getLastOrder = (testID, type) => {
        fetch(db.url + '?table=modulos&column=max(orden) as max&where=curso IN (' + courseID + ')')
            .then(res => res.json())
            .then(res => {
                insertModule(testID, res[0].max, type)
            })
            .catch(err => console.log(err))
    }

    const insertModule = (newID, maxOrder, type) => {
        const formData = new FormData()
        if (type === 2) formData.append("id_test", newID)
        else formData.append("id_clase", newID)
        formData.append("orden", parseInt(maxOrder) + 1)
        formData.append("curso", courseID)
        formData.append("tipo", type)
        fetch(db.url + "?mode=insert&table=modulos", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setModuleID(newID)
                    if (type === 2) setEditTest(true)
                    else setEditClass(true)
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
        if (courseName !== undefined) {
            const formData = new FormData()
            formData.append("nombre", courseName)
            fetch(db.url + "?mode=update&table=curso&id=id&condition=" + courseID, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK")
                        setEditName(false)
                    else setError(true)
                }).catch(err => setError(true))
        }
    }

    const handleChangeDescription = () => {
        if (courseDesc !== undefined) {
            const formData = new FormData()
            formData.append("descripcion", courseDesc)
            fetch(db.url + "?mode=update&table=curso&id=id&condition=" + courseID, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK")
                        setEditDesc(false)
                    else setError(true)
                }).catch(err => setError(true))
        }
    }

    const handleMoveUp = (module) => {
        moveModule(module.modulo, modules[modules.indexOf(module) - 1].orden)
        moveModule(modules[modules.indexOf(module) - 1].modulo, module.orden)
    }

    const handleMoveDown = (module) => {
        moveModule(module.modulo, modules[modules.indexOf(module) + 1].orden)
        moveModule(modules[modules.indexOf(module) + 1].modulo, module.orden)
    }

    const moveModule = (id, orden) => {
        const formData = new FormData()
        formData.append("orden", orden)
        fetch(db.url + "?mode=update&table=modulos&id=id&condition=" + id, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    setRefresh(!refresh)
                else setError(true)
            }).catch(err => setError(true))
    }

    return (
        <React.Fragment>
            {!editClass && !editTest &&
                <div className='ec-body'>
                    <div className='ec-container inset'>
                        <div className='ec-header'>
                            <span className='register-form_subtitle title'>
                                <b className='b-medium'>Editar curso</b>
                            </span>
                            <span className='register-form_description'>
                                <p className='description'>Modifique a su gusto el contenido del curso seleccionado. </p>
                            </span>
                        </div>

                        <div className='ec-datos-curso inset'>
                            <div className='ec-datos-curso_header'>
                                <h2 className='title'>
                                    Datos generales del curso
                                </h2>
                                <span className='description'>
                                    Modifique los <b className='b-medium'>datos generales</b> del curso.
                                </span>
                                <p className='register-msg pill'>
                                    <i className='bx bx-right-arrow-alt icon'></i>
                                    Asegúrese de guardar los cambios después de realizar modificaciones.
                                </p>
                            </div>

                            <div className='ec-datos-curso_body'>
                                <div>
                                    <label className='input-label lbl'>Nombre del curso:</label>
                                    {!editName &&
                                        <div className='ec-lbl-name '>
                                            <label className='ec-lbl-editar it-inset-shadow' onClick={() => { setEditName(true) }}><b className='b-medium'>{course.nombre}</b></label>
                                            <button className='ec-btn-editar' onClick={() => { setEditName(true) }}>
                                                <i className='bx bx-edit icon' ></i> Editar
                                            </button>
                                        </div>
                                    }
                                    {!!editName &&
                                        <div className='ec-lbl-name'>
                                            <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={course.nombre} onChange={(e) => { setCourseName(e.target.value) }}></input>
                                            <button className='ec-btn-editar it-inset-shadow' onClick={handleChangeTestName}><i className='bx bx-save icon' ></i>Guardar</button>
                                        </div>
                                    }
                                </div>
                                <div>
                                    <label className='input-label lbl'>Descripción del curso:</label>
                                    {!editDesc &&
                                        <div className='ec-lbl-name'>
                                            <label className='ec-lbl-editar it-inset-shadow'><b className='b-medium'>{course.descripcion}</b></label>
                                            <button className='ec-btn-editar it-inset-shadow' onClick={() => { setEditDesc(true) }}>
                                                <i className='bx bx-edit icon' ></i>Editar
                                            </button>
                                        </div>
                                    }
                                    {!!editDesc &&
                                        <div className='ec-lbl-name'>
                                            <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={course.descripcion} onChange={(e) => { setCourseDesc(e.target.value) }}></input>
                                            <button className='ec-btn-editar it-inset-shadow' onClick={handleChangeDescription}><i className='bx bx-save icon' ></i>Guardar</button>
                                        </div>
                                    }
                                </div>



                            </div>

                        </div>

                        <div className='ec-datos-curso inset'>
                            <div className='ec-datos-curso_header'>
                                <span className='register-form_subtitle title'>
                                    <b className='b-medium'>Módulos existentes</b>
                                </span>
                                <span className='register-form_description'>
                                    <p className='description'>Aquí se muestran todos los módulos existentes en el sistema</p>
                                </span>
                                <p className='register-msg pill'>
                                    <i className='bx bx-right-arrow-alt icon'></i>
                                    Utilice los botones <button className='btn-pill'><i className='bx bxs-up-arrow'></i></button> o <button className='btn-pill'><i className='bx bxs-down-arrow'></i></button> para cambiar el orden en que se mostrarán los módulos.
                                </p>
                            </div>
                            <div className='ec-content-2_body '>
                                {modules.map(module => (
                                    <div key={module.modulo} className='ec-question-item it-inset-shadow'>

                                        <div className='ec-question-q'>
                                            <div className='ec-updown-btns'>
                                                {modules.indexOf(module) !== 0 &&
                                                    <button className='ec-updown-item' onClick={() => { handleMoveUp(module) }}>
                                                        <i className='bx bxs-up-arrow'></i>
                                                    </button>
                                                }
                                                {modules.indexOf(module) !== modules.length - 1 &&
                                                    <button className='ec-updown-item' onClick={() => { handleMoveDown(module) }}>
                                                        <i className='bx bxs-down-arrow'></i>
                                                    </button>
                                                }
                                            </div>
                                            {module.nombre}
                                        </div>
                                        <div className='ec-question-btns'>
                                            <button className='btn-s' id={module.id} name={module.tipo} onClick={() => { handleEdit(module.id, module.tipo) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                            <button className='btn-s' id={module.modulo} name={module.tipo} onClick={handleDelete}><i className='bx bx-trash icon'></i>Eliminar</button>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>

                        <div className='btn-container'>
                            <button className="btn" onClick={handleInsertTest}>Agregar examen</button>
                            <button className="btn" onClick={handleInsertClass}>Agregar clase</button>
                        </div>
                    </div>
                </div>}
            {!!editTest && <EditTest testID={moduleID} setEditTest={setEditTest}></EditTest>}
            {!!editClass && <EditClass classID={moduleID} setEditClass={setEditClass} mode="edit"></EditClass>}
        </React.Fragment>
    )
}

export default EditCourse