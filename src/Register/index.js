import React, { useState } from 'react'
import { toPascalCase, checkEmail } from '../utils.js'
import { db } from '../dbconnect.js';
import md5 from 'md5';

function Register() {

    const [emailAlert, setEmailAlert] = useState(false)
    const [dupEmail, setDupEmail] = useState(false)
    const [ok, setOk] = useState(false)
    const [error, setError] = useState(false)
    const [passAlert, setPassAlert] = useState(false)
    const [fillAlert, setFillAlert] = useState(false)
    const [user, setUser] = useState([])

    const handleChange = e => {
        if (e.target.name === "password") {
            handleCheckPassword()
            setUser({
                ...user, [e.target.name]: md5(e.target.value)
            })
        } else if (e.target.name === "nombre" || e.target.name === "apellido_m" || e.target.name === "apellido_p") {
            setUser({
                ...user, [e.target.name]: toPascalCase(e.target.value)
            })
        } else if (e.target.name === "email") {
            checkEmail()
            setUser({
                ...user, [e.target.name]: e.target.value.toLowerCase()
            })
        } else {
            setUser({
                ...user, [e.target.name]: e.target.value
            })
        }
    }

    const handleCheckPassword = () => {
        setPassAlert(true);
        const p1 = document.getElementById("inputPassword1")
        const p2 = document.getElementById("inputPassword2")
        if (p1.value === p2.value) {
            setPassAlert(false);
            return true
        } else return false
    }

    const handleSubmit = () => {
        const formData = new FormData()

        const map = new Map(Object.entries(user))
        for (let [key, value] of map) { formData.append(key, value) }

        fetch(db.url + '?mode=insert&table=usuario', {
            method: 'POST',
            body: formData
        }).then(res => res.text())
            .then(res => {
                if (res.includes("1062 Duplicate entry") && res.includes("for key 'email'")) {
                    setDupEmail(true)
                } else if (res === 'OK') {
                    setOk(true)
                } else {
                    setError(true)
                }
            }).catch(err => setError(true))

    }

    return (
        <React.Fragment>
            <header><h1>Registro</h1></header>
            <form action='#'>
                <div>
                    <h3>Información personal</h3>
                    <div>
                        <label>Nombre(s) *</label>
                        <input name="nombre" type='text' placeholder='Nombre(s)' required onChange={handleChange} id="inputName"></input>
                    </div>
                    <div>
                        <div>
                            <label>Apellido paterno *</label>
                            <input name="apellido_p" type='text' placeholder='Apellido paterno' required onChange={handleChange} id="inputLName1"></input>
                        </div>
                        <div>
                            <label>Apellido materno *</label>
                            <input name="apellido_m" type='text' placeholder='Apellido materno' required onChange={handleChange} id="inputLName2"></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Correo electrónico *</label>
                            <input name="email" type='email' placeholder='Ingrese su correo electrónico' required onChange={handleChange} id="inputEmail" aria-describedby="emailHelp"></input>
                            <p hidden={!emailAlert}>Introduce una dirección de correo electrónico válida</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Paquete</h3>
                    <label>Selecciona el paquete que deseas contratar</label>
                    <div>

                    </div>
                </div>

                <div>
                    <h3>Información de la plataforma</h3>
                    <div>
                        <label htmlFor="inputPassword1">Cree una contraseña *</label>
                        <input placeholder='Ingrese una contraseña' name="password" onChange={handleChange} type="password" id="inputPassword1" required></input>
                        <p hidden={!passAlert}>Las contraseñas no coinciden</p>
                    </div>
                    <div>
                        <label>Confirmar contraseña *</label>
                        <input placeholder='Confirme la contraseña' onChange={handleCheckPassword} type="password" id="inputPassword2" required></input>
                    </div>
                    <p hidden={!passAlert}>Las contraseñas no coinciden</p>

                </div>

                <h6 hidden={!fillAlert}>Debes llenar todos los campos (*)</h6>
                <div>
                    <label>Finalizar pre-registro</label>
                    {!!ok && <label>Registro exitoso</label>}
                    {!!dupEmail && <label>Email duplicado</label>}
                    {!!error && <label>Error</label>}
                    <button type="button" onClick={handleSubmit}>Enviar</button>
                    {/* <CustomModal id="Modal" message="¡Tus documentos han sido enviados correctamente! Inicia sesión para ver más detalles." route="/login"></CustomModal>
                        <CustomModal id="Boleta" message="La boleta introducida ya está registrada en la plataforma"></CustomModal>
                        <CustomModal id="Email" message="El email introducido ya está registrado en la plataforma"></CustomModal>
                        <CustomModal id="Seminario" message="En estos momentos el pre-registro se encuentra deshabilitado. Intenta de nuevo más tarde." route="/"></CustomModal>
                        <ErrorMessage show={error} /> */}
                </div>
            </form>
        </React.Fragment>
    );
}

export default Register;