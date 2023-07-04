import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './editclass_styles.css'

function EditClass({ classID, mode, setEditClass }) {

    const [clase, setClase] = useState([])
    const [defaultClase, setDefaultClase] = useState([])
    const [file, setFile] = useState()

    const handleChange = (e) => {
        setClase({ ...clase, [e.target.id]: [e.target.value] })
    }

    const handleChangeFile = (e) => {
        setClase({ ...clase, "contenido": [e.target.files[0].name] })
        setFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        const formData = new FormData()

        const map = new Map(Object.entries(clase))
        for (let [key, value] of map) { formData.append(key, value) }
        if (file) formData.append("file", file)
        if (mode === "edit") {
            fetch(db.url + "?mode=update&table=clase&id=id&condition=" + classID, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK") setEditClass(false)
                })
                .catch(err => console.log(err))
        } else {
            fetch(db.url + "?mode=insert&table=clase", {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK") console.log("INSERTED")
                })
                .catch(err => console.log(err))
        }

    }

    useEffect(() => {
        if (mode === "edit") {
            fetch(db.url + "?table=clase&where=id IN (" + classID + ")")
                .then(res => res.json())
                .then(res => setDefaultClase(res[0]))
                .catch(err => console.log(err.error))
        }
    }, [mode, classID])

    return (
        <React.Fragment>
            <button className='btn' onClick={() => { setEditClass(false) }}><i className='bx bx-left-arrow-alt'></i>Regresar</button>
            <div className='eclass-body'>
                <div className='eclass-container inset'>
                    <div className='eclass-header'>
                        <div className='eclass-title title'>
                            <b className='b-medium'>Editar clase</b>
                        </div>
                        <span className='cq-description description'>
                            Cree una clase, asígnele un nombre y cargue el contenido correspondiente.
                        </span>
                    </div>
                    <div className='eclass-content'>
                        <label className='lbl'>Nombre de la clase</label>
                        <input className='input-text it-inset-shadow' type='text' id='nombre' onChange={handleChange} defaultValue={defaultClase.nombre}></input>
                    </div>

                    <div className='eclass-content'>
                        <label className='lbl'>Descripción</label>
                        <textarea className='text-area input-text it-inset-shadow' type='text' id='descripcion' onChange={handleChange} defaultValue={defaultClase.descripcion}></textarea>
                    </div>

                    <div className='eclass-content'>
                        <label className='lbl'>Contenido de la clase</label>

                        <input className='it-inset-shadow' type="file" name="contenido" onChange={handleChangeFile} />
                    </div>
                    
                    <div className='eclass-content'>
                        {mode === "edit" && defaultClase.contenido &&
                            <React.Fragment>
                                <label className='lbl'>Previsualización del contenido</label>
                                <div className='eclass-preview'>
                                    <iframe src={db.docs + defaultClase.contenido} title='Curso' width="80%" height="700" > </iframe>
                                </div>

                            </React.Fragment>

                        }
                    </div>

                    <div className='btn-container'>
                        <button className='btn' onClick={handleSubmit}>Guardar cambios</button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default EditClass;