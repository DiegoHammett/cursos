import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import EditTest from '../EditTest'

function EditCourse({ courseID }) {

    const [error, setError] = useState(false)
    const [editTest, setEditTest] = useState(false)
    const [editInfo, setEditInfo] = useState(false)
    const [moduleID, setModuleID] = useState()
    const [modules, setModules] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [addTest, setAddTest] = useState(false)
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

    const handleEdit = (id) => {
        setModuleID(id)
        setEditTest(true)
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

    return (
        <React.Fragment>
            {!editInfo && !editTest &&
                <div className='et-body'>
                    <div className='et-container inset'>
                        <div className='cq-header'>
                            <div className='cq-title title'>
                                <b className='b-medium'>Editar curso</b>
                            </div>
                        </div>
                        <div className='et-content-2_body '>
                            {modules.map(module => (
                                <div key={module.modulo} className='et-question-item inset' draggable="true">
                                    <div className='et-question-q'>
                                        {module.nombre}
                                    </div>
                                    <div className='et-question-btns'>
                                        <button className='btn-s' id={module.id} name={module.tipo} onClick={() => { handleEdit(module.id) }}><i className='bx bx-edit icon' ></i>Editar</button>
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