import React, { useState } from 'react'
import { toPascalCase, checkEmail } from '../utils.js'
import { db } from '../dbconnect.js';
import md5 from 'md5';
import Navbar from '../Navbar';
import './register_styles.css'
import { useNavigate } from 'react-router-dom';

function Register() {

    const [emailAlert, setEmailAlert] = useState(false)
    const [dupEmail, setDupEmail] = useState(false)
    const [ok, setOk] = useState(false)
    const [error, setError] = useState(false)
    const [passAlert, setPassAlert] = useState(false)
    const [fillAlert, setFillAlert] = useState(false)
    const [user, setUser] = useState([])
    const nav = useNavigate()

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
                    nav("/login")
                } else {
                    setError(true)
                }
            }).catch(err => setError(true))

    }

    return (
        <React.Fragment>
            <Navbar />
            <div className='register-body'>
                <div className='register-container'>

                    <div className='register-header'>
                        <div className='register-header_logo'>
                            <i className='bx bx-cube'> </i><span>Logo</span>
                        </div>
                        <h1>Bienvenido a <b>MARCA</b></h1>
                        <p>A continuación, llene todos los campos con su información. Al finalizar, presione 'Registrarse'.</p>
                        <p>Todos los campos son obligatrios.</p>
                    </div>

                    <div className='register-left'>

                        <form className='register-form'>
                            <div className='register-form_content'>
                                <span className='register-form_subtitle'>Información personal</span>

                                <div className='register-form_item'>
                                    <label className='input-label'>Nombre/s:</label>
                                    <input
                                        className='input-text'
                                        name="nombre"
                                        type='text'
                                        required
                                        onChange={handleChange}
                                        id="inputName" />

                                </div>

                                <div className='register-form_item'>
                                    <label className='input-label'>Primer apellido:</label>
                                    <input
                                        className='input-text'
                                        name="apellido_p"
                                        type='text'
                                        required
                                        onChange={handleChange}
                                        id="inputLName1"
                                    />
                                </div>

                                <div className='register-form_item'>
                                    <label className='input-label'>Segundo apellido:</label>
                                    <input
                                        className='input-text'
                                        name="apellido_m"
                                        type='text'
                                        required
                                        onChange={handleChange}
                                        id="inputLName2"
                                    />
                                </div>

                            </div>
                        </form>

                    </div>

                    <div className='register-right'>
                        <form className='register-form'>
                            <div className='register-form_content'>
                                <span className='register-form_subtitle'>Información de la cuenta</span>

                                <div className='register-form_item'>
                                    <label className='input-label'>Correo electrónico</label>
                                    <input
                                        className='input-text'
                                        name="email"
                                        onChange={handleChange}
                                        type="text"
                                        id="inputEmail"
                                        required
                                    />
                                </div>

                                <div className='register-form_item'>
                                    <label className='input-label'>Crea una contraseña</label>
                                    <input
                                        className='input-text'
                                        name="password"
                                        onChange={handleChange}
                                        type="password"
                                        id="inputPassword1"
                                        required
                                    />
                                    <p className='error-msg_label' hidden={!passAlert}>
                                        <label>
                                            <i className='bx bx-x bx-tada' ></i><span>Las contraseñas no coinciden</span>
                                        </label>
                                    </p>
                                </div>

                                <div className='register-form_item'>
                                    <label className='input-label'>Confirma la contraseña</label>
                                    <input
                                        className='input-text'
                                        onChange={handleCheckPassword}
                                        type="password"
                                        id="inputPassword2"
                                        required
                                    />
                                    <p className='error-msg_label' hidden={!passAlert}>
                                        <label>
                                            <i className='bx bx-x bx-tada' ></i><span>Las contraseñas no coinciden</span>
                                        </label>

                                    </p>
                                </div>

                            </div>
                        </form>
                    </div>

                    <div className='register-pricing'>
                        <span className='register-form_subtitle'>Paquetes disponibles</span>
                    </div>

                    <div className='register-footer'>
                        <h6
                            className='error-msg_label'
                            hidden={!fillAlert}
                        >

                            <i className='bx bxs-error-circle bx-flashing' ></i>
                            <label>
                                <b>Error</b>·<span>Debes llenar todos los campos.</span>
                            </label>

                        </h6>

                        <h6
                            className='error-msg_label'
                            hidden={!dupEmail}
                        >

                            <i className='bx bxs-error-circle bx-flashing' ></i>
                            <label>
                                <b>Error</b>·<span>El email introducido ya está registrado en la plataforma</span>
                            </label>

                        </h6>

                        <button className='register-button' type="button" onClick={handleSubmit}>
                            Registrarse
                        </button>

                        <span>¿Ya tienes una cuenta?</span>
                        <a href='/login'>
                            Inicia sesión <i className='bx bxs-chevrons-right bx-fade-right' ></i>
                        </a>
                    </div>

                </div>
            </div>


        </React.Fragment>
    );
}

export default Register;