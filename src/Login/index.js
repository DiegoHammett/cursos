import React, { useState } from 'react'
import md5 from 'md5'
import { db } from '../dbconnect'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar';
import './login_styles.css'
import PortadaLogin from './img/login_portada2.jpg';

function Login() {

    const [logAlert, setLogAlert] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState()
    const [pass, setPass] = useState()
    const nav = useNavigate()

    const handleLogin = () => {
        const formData = new FormData()

        formData.append("email", user)
        formData.append("password", md5(pass))
        formData.append("mode", "LOGIN")

        fetch(db.session, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(res => res.text()).then(res => {
            if (res === "CORRECT")
                nav("/dashboard")
            else {
                setLogAlert(true)
            }
        }).catch(err => setError(true))
    }

    const handleEnter = (e) => {
        if(e.key === "Enter") handleLogin()
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className='login-body'>
                <div className='login-container'>
                    <div className='login-left inset'>
                        <div className='login-header'>
                            <div className='register-header_logo'>
                                <i className='bx bx-cube'> </i><span>Logo</span>
                            </div>
                            <div>
                                <h1 className='title'>Bienvenido a <b className='b-medium'>MARCA</b></h1>
                                <p className='description'>Por favor, inicie sesión para usar la plataforma</p>
                            </div>

                        </div>
                        <form className='login-form'>
                            <div className='login-form_content'>

                                <div className='login-form_item'>
                                    <label className='input-label lbl'>Correo electrónico</label>
                                    <input
                                        className='input-text it-inset-shadow'
                                        type="email"
                                        id="typeEmail"
                                        onChange={(e) => { setUser(e.target.value); setLogAlert(false) }}
                                        onKeyDown={handleEnter}
                                    />

                                </div>

                                <div className='login-form_item'>
                                    <label className='input-label lbl'>Contraseña</label>
                                    <input
                                        className='input-text it-inset-shadow'
                                        type="password"
                                        id="typePassword"
                                        onChange={(e) => { setPass(e.target.value); setLogAlert(false) }}
                                        onKeyDown={handleEnter}
                                    />

                                </div>

                                <div hidden={!logAlert}>
                                    <div className='pill-error'>
                                        <i className='bx bx-error icon' ></i>
                                        <span>Usuario o contraseña incorrectos, intente de nuevo.</span>
                                    </div>

                                </div>

                            </div>
                            <div className='login-goto_register'>

                                <div className='login-footer'>
                                    <button className='btn' type="button" onClick={handleLogin}>
                                        Iniciar sesión
                                    </button>
                                    <br></br>
                                    <span className='description'>¿Aún no tienes una cuenta?</span>
                                    <a className='btn2' href='/registro'>
                                        Regístrate aquí <i className='bx bxs-chevrons-right bx-fade-right' ></i>
                                    </a>
                                </div>

                            </div>

                        </form>
                    </div>


                    <div className='login-right'>
                        <img src={PortadaLogin} />
                    </div>
                </div>
            </div>


        </React.Fragment>
    );
}

export default Login;