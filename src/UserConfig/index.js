import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import md5 from 'md5'

function UserConfig({ userID }) {

    const [user, setUser] = useState([])
    const [userName, setUserName] = useState()
    const [userLName1, setUserLName1] = useState()
    const [userLName2, setUserLName2] = useState()
    const [userNewPass, setUserNewPass] = useState()
    const [userNewPassC, setUserNewPassC] = useState()
    const [userPass, setUserPass] = useState()
    const [editName, setEditName] = useState(false)
    const [editLName1, setEditLName1] = useState(false)
    const [editLName2, setEditLName2] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [errorNewPass, setErrorNewPass] = useState(false)
    const [errorFill, setErrorFill] = useState(false)
    const [errorOldFill, setErrorOldFill] = useState(false)
    const [errorNewFill, setErrorNewFill] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getUser = () => {
            fetch(db.url + '?table=usuario&where=id IN (' + userID + ')')
                .then(res => res.json())
                .then(res => setUser(res[0]))
                .catch(err => setError(true))
        }
        getUser()
    }, [userID, editName, editLName1, editLName2])

    const handleEditName = () => {
        if (userName !== undefined) {
            const formData = new FormData()
            formData.append("nombre", userName)
            fetch(db.url + "?mode=update&table=usuario&id=id&condition=" + userID, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK")
                        setEditName(false)
                    else setError(true)
                }).catch(err => setError(true))
        } else setEditName(false)
    }

    const handleEditLName1 = () => {
        if (userLName1 !== undefined) {
            const formData = new FormData()
            formData.append("apellido_p", userLName1)
            fetch(db.url + "?mode=update&table=usuario&id=id&condition=" + userID, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK")
                        setEditLName1(false)
                    else setError(true)
                }).catch(err => setError(true))
        } else setEditLName1(false)
    }

    const handleEditLName2 = () => {
        if (userLName2 !== undefined) {
            const formData = new FormData()
            formData.append("apellido_m", userLName2)
            fetch(db.url + "?mode=update&table=usuario&id=id&condition=" + userID, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK")
                        setEditLName2(false)
                    else setError(true)
                }).catch(err => setError(true))
        } else setEditLName2(false)
    }

    const handleChangePassword = () => {
        if (userPass && userNewPass && userNewPassC) {
            if (userNewPass === undefined || userNewPassC === undefined || userNewPass === "" || userNewPassC === "") setErrorNewFill(true)
            if (userPass === undefined || userPass === "") setErrorFill(true)
            if (userNewPass !== userNewPassC) setErrorNewPass(true)
            else {
                fetch(db.url + "?table=usuario&where=id IN (" + userID + ") AND password IN ('" + md5(userPass) + "')")
                    .then(res => res.json())
                    .then(res => {
                        if (res.length > 0) {
                            handleUpdatePassword()
                        } else {
                            setErrorPass(true)
                        }
                    })
                    .catch(err => setError(true))
            }
        } else {
            setErrorFill(true)
        }
    }

    const handleUpdatePassword = () => {
        const formData = new FormData()
        formData.append("password", md5(userNewPass))
        fetch(db.url + "?mode=update&table=usuario&id=id&condition=" + userID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    setEditPassword(false)
                else setError(true)
            }).catch(err => setError(true))
    }

    const clearAlerts = () => {
        setErrorFill(false)
        setErrorOldFill(false)
        setErrorNewFill(false)
        setErrorPass(false)
    }

    const handleCheckPassword = () => {
        setErrorNewPass(true);
        const p1 = document.getElementById("newPass1")
        const p2 = document.getElementById("newPass2")
        if (p1.value === p2.value) {
            setErrorNewPass(false);
            return true
        } else return false
    }

    return (
        <div>
            <div className='coursemenu-header'>
                <h1 className='title'>Configuración</h1>
            </div>
            <div className='ec-body'>
                <div className='ec-container inset'>
                    <div className='ec-header'>
                        <span className='register-form_subtitle title'>
                            <b className='b-medium'>Editar perfil</b>
                        </span>
                        <span className='register-form_description'>
                            <p className='description'>Modifique a su gusto los detalles de su perfil. </p>
                        </span>
                        <p className='register-msg pill'>
                            <i className='bx bx-right-arrow-alt icon'></i>
                            Asegúrese de guardar los cambios después de realizar modificaciones.
                        </p>
                        <div className='ec-datos-curso_body'>
                            <div>
                                <label className='input-label lbl'>Nombre:</label>
                                {!editName &&
                                    <div className='ec-lbl-name '>
                                        <label className='ec-lbl-editar it-inset-shadow' ><b className='b-medium'>{user.nombre}</b></label>
                                        <button className='ec-btn-editar' onClick={() => { setEditName(true) }}>
                                            <i className='bx bx-edit icon' ></i> Editar
                                        </button>
                                    </div>
                                }
                                {!!editName &&
                                    <div className='ec-lbl-name'>
                                        <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={user.nombre} onChange={(e) => { setUserName(e.target.value) }}></input>
                                        <button className='ec-btn-editar it-inset-shadow' onClick={handleEditName}><i className='bx bx-save icon' ></i>Guardar</button>
                                    </div>
                                }
                            </div>
                            <div>
                                <label className='input-label lbl'>Apellidos:</label>
                                {!editLName1 &&
                                    <div className='ec-lbl-name'>
                                        <label className='ec-lbl-editar it-inset-shadow'><b className='b-medium'>{user.apellido_p}</b></label>
                                        <button className='ec-btn-editar it-inset-shadow' onClick={() => { setEditLName1(true) }}>
                                            <i className='bx bx-edit icon' ></i>Editar
                                        </button>
                                    </div>
                                }
                                {!!editLName1 &&
                                    <div className='ec-lbl-name'>
                                        <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={user.apellido_p} onChange={(e) => { setUserLName1(e.target.value) }}></input>
                                        <button className='ec-btn-editar it-inset-shadow' onClick={handleEditLName1}><i className='bx bx-save icon' ></i>Guardar</button>
                                    </div>
                                }
                                {!editLName2 &&
                                    <div className='ec-lbl-name'>
                                        <label className='ec-lbl-editar it-inset-shadow'><b className='b-medium'>{user.apellido_m}</b></label>
                                        <button className='ec-btn-editar it-inset-shadow' onClick={() => { setEditLName2(true) }}>
                                            <i className='bx bx-edit icon' ></i>Editar
                                        </button>
                                    </div>
                                }
                                {!!editLName2 &&
                                    <div className='ec-lbl-name'>
                                        <input autoFocus className='ec-input-text it-inset-shadow' type='text' defaultValue={user.apellido_m} onChange={(e) => { setUserLName2(e.target.value) }}></input>
                                        <button className='ec-btn-editar it-inset-shadow' onClick={handleEditLName2}><i className='bx bx-save icon' ></i>Guardar</button>
                                    </div>
                                }
                            </div>
                            {!editPassword &&
                                <button className='ec-btn-editar it-inset-shadow' onClick={() => { setEditPassword(true) }}>
                                    <i className='bx bx-edit icon' ></i>Cambiar contraseña
                                </button>
                            }
                            {!!editPassword &&
                                <div className='ec-container inset'>
                                    <div className='ec-datos-curso_body'>
                                        <span className='register-form_subtitle title'>
                                            <b className='b-medium'>Cambiar contraseña</b>
                                        </span>
                                        <div className='ec-lbl-name'>
                                            <label className='input-label lbl'>Contraseña actual:</label>
                                            <input autoFocus className='ec-input-text it-inset-shadow' type='password' onChange={(e) => { clearAlerts(); setUserPass(e.target.value) }}></input>
                                        </div>
                                        <hr />
                                        <div className='ec-lbl-name'>
                                            <label className='input-label lbl'>Nueva contraseña:</label>
                                            <input autoFocus className='ec-input-text it-inset-shadow' type='password' id="newPass1" onChange={(e) => { setUserNewPass(e.target.value); clearAlerts(); handleCheckPassword() }}></input>
                                        </div>
                                        {!!errorNewPass && <p>Las contraseñas no coinciden</p>}
                                        <div className='ec-lbl-name'>
                                            <label className='input-label lbl'>Confirmar nueva contraseña:</label>
                                            <input autoFocus className='ec-input-text it-inset-shadow' type='password' id="newPass2" onChange={(e) => { setUserNewPassC(e.target.value); clearAlerts(); handleCheckPassword() }}></input>
                                        </div>
                                        {!!errorNewPass && <p>Las contraseñas no coinciden</p>}
                                    </div>
                                    {!!errorPass && <p>La contraseña actual que ha introducido es incorrecta</p>}
                                    {!!errorOldFill && <p>Debe introducir la contraseña actual</p>}
                                    {!!errorFill && <p>Debe llenar todos los campos</p>}
                                    {!!errorNewFill && <p>Debe introducir la nueva contraseña y su confirmación</p>}

                                    <button className='ec-btn-editar it-inset-shadow' onClick={handleChangePassword}>
                                        Aceptar
                                    </button>
                                    <button className='ec-btn-editar it-inset-shadow' onClick={() => { setEditPassword(false) }}>
                                        Cancelar
                                    </button>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserConfig