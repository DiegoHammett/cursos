import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'


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
        if(mode === "edit"){
            fetch(db.url + "?mode=update&table=clase&id=id&condition="+classID, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") setEditClass(false)
            })
            .catch(err => console.log(err))
        }else{
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
            <button className='btn' onClick={() => {setEditClass(false)}}><i className='bx bx-left-arrow-alt'></i>Regresar</button>
            <label>Nombre de la clase:</label>
            <input type='text' id='nombre' onChange={handleChange} defaultValue={defaultClase.nombre}></input>
            <label>Descripción:</label>
            <textarea type='text' id='descripcion' onChange={handleChange} defaultValue={defaultClase.descripcion}></textarea>
            {mode === "edit" && defaultClase.contenido && <iframe src={db.docs + defaultClase.contenido} title='Curso' width="80%" height="700" > </iframe>}
            <input type="file" name="contenido" onChange={handleChangeFile} ></input>
            <button onClick={handleSubmit}>Guardar</button>
        </React.Fragment>
    )
}

export default EditClass;