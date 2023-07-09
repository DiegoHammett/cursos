import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'

function EditZoom({ zoomID, create }) {

    const [editName, setEditName] = useState(false)
    const [editDesc, setEditDesc] = useState(false)
    const [editLink, setEditLink] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [zoomName, setZoomName] = useState()
    const [zoomDesc, setZoomDesc] = useState()
    const [zoomLink, setZoomLink] = useState()
    const [zoom, setZoom] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const getZoom = () => {
            fetch(db.url + '?table=zoom&where=id IN (' + zoomID + ')')
                .then(res => res.json())
                .then(res => setZoom(res[0]))
                .catch(err => setError(true))
        }
        if (create) console.log("CREATE")
        else {
            getZoom()
        }
    }, [create, zoomID, editDesc, editLink, editName, editActive])

    const handleEditName = () => {
        const formData = new FormData()
        formData.append("nombre", zoomName)
        fetch(db.url + "?mode=update&table=zoom&id=id&condition=" + zoomID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    setEditName(false)
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleEditDesc = () => {
        const formData = new FormData()
        formData.append("descripcion", zoomDesc)
        fetch(db.url + "?mode=update&table=zoom&id=id&condition=" + zoomID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    setEditDesc(false)
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleEditLink = () => {
        const formData = new FormData()
        formData.append("link", zoomLink)
        fetch(db.url + "?mode=update&table=zoom&id=id&condition=" + zoomID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    setEditLink(false)
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleActive = () => {
        const formData = new FormData()
        if(!zoom.activo) 
            formData.append("activo", 1)
        else
            formData.append("activo", 0)
        fetch(db.url + "?mode=update&table=zoom&id=id&condition=" + zoomID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK"){
                    setEditActive(!editActive)}
                else setError(true)
            }).catch(err => setError(true))
    }

    return (
        <div className='ec-body'>
            <div className='ec-container inset'>
                <div className='ec-header'>
                    <span className='register-form_subtitle title'>
                        <b className='b-medium'>Editar sesión de zoom</b>
                    </span>
                    <span className='register-form_description'>
                        <p className='description'>Modifique a su gusto los detalles de la sesión de zoom. </p>
                    </span>
                    <p className='register-msg pill'>
                        <i className='bx bx-right-arrow-alt icon'></i>
                        Asegúrese de guardar los cambios después de realizar modificaciones.
                    </p>
                    <div className='ec-datos-curso_body'>
                        <div>
                            <label className='input-label lbl'>Nombre del curso:</label>
                            {!editName &&
                                <div className='ec-lbl-name '>
                                    <label className='ec-lbl-editar it-inset-shadow' ><b className='b-medium'>{zoom.nombre}</b></label>
                                    <button className='ec-btn-editar' onClick={() => { setEditName(true) }}>
                                        <i className='bx bx-edit icon' ></i> Editar
                                    </button>
                                </div>
                            }
                            {!!editName &&
                                <div className='ec-lbl-name'>
                                    <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={zoom.nombre} onChange={(e) => { setZoomName(e.target.value) }}></input>
                                    <button className='ec-btn-editar it-inset-shadow' onClick={handleEditName}><i className='bx bx-save icon' ></i>Guardar</button>
                                </div>
                            }
                        </div>
                        <div>
                            <label className='input-label lbl'>Descripción del curso:</label>
                            {!editDesc &&
                                <div className='ec-lbl-name'>
                                    <label className='ec-lbl-editar it-inset-shadow'><b className='b-medium'>{zoom.descripcion}</b></label>
                                    <button className='ec-btn-editar it-inset-shadow' onClick={() => { setEditDesc(true) }}>
                                        <i className='bx bx-edit icon' ></i>Editar
                                    </button>
                                </div>
                            }
                            {!!editDesc &&
                                <div className='ec-lbl-name'>
                                    <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={zoom.descripcion} onChange={(e) => { setZoomDesc(e.target.value) }}></input>
                                    <button className='ec-btn-editar it-inset-shadow' onClick={handleEditDesc}><i className='bx bx-save icon' ></i>Guardar</button>
                                </div>
                            }
                        </div>
                        <div>
                            <label className='input-label lbl'>Link del curso:</label>
                            {!editLink &&
                                <div className='ec-lbl-name'>
                                    <label className='ec-lbl-editar it-inset-shadow'><b className='b-medium'>{zoom.link}</b></label>
                                    <button className='ec-btn-editar it-inset-shadow' onClick={() => { setEditLink(true) }}>
                                        <i className='bx bx-edit icon' ></i>Editar
                                    </button>
                                </div>
                            }
                            {!!editLink &&
                                <div className='ec-lbl-name'>
                                    <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={zoom.link} onChange={(e) => { setZoomLink(e.target.value) }}></input>
                                    <button className='ec-btn-editar it-inset-shadow' onClick={handleEditLink}><i className='bx bx-save icon' ></i>Guardar</button>
                                </div>
                            }
                        </div>
                        <div>
                            <label className='input-label lbl'>Activo:</label>
                            <input
                                type="checkbox"
                                className='editcourse-checkbox'
                                id='darkmode-toggle'
                                defaultChecked={zoom.activo}
                                onClick={handleActive}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditZoom