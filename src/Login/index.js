import React, { useState } from 'react'
import md5 from 'md5'
import { db } from '../dbconnect'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar';
import './login_styles.css'
import PortadaLogin from './img/login_portada.jpg';

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
            console.log(res)
            if (res === "CORRECT")
                nav("/test")
            else {
                setLogAlert(true)
            }
        }).catch(err => setError(true))
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className='login-body'>
                <div className='login-container'>
                    <div className='login-left'>
                        <div className='login-header'>
                            <div className='login-header_logo'>
                                <i className='bx bx-cube'> </i><span>Logo</span>
                            </div>
                            <h1>Bienvenido a <b>MARCA</b></h1>
                            <p>Por favor, inicie sesión para usar la plataforma</p>
                        </div>
                        <form className='login-form'>
                            <div className='login-form_content'>

                                <div className='login-form_item'>
                                    <label className='input-label'>Correo electrónico</label>
                                    <input
                                        className='input-text'
                                        type="email"
                                        id="typeEmail"
                                        onChange={(e) => { setUser(e.target.value); setLogAlert(false) }}
                                    />

                                </div>

                                <div className='login-form_item'>
                                    <label className='input-label'>Contraseña</label>
                                    <input
                                        className='input-text'
                                        type="password"
                                        id="typePassword"
                                        onChange={(e) => { setPass(e.target.value); setLogAlert(false) }}
                                    />

                                </div>

                                <div hidden={!logAlert}>
                                    <div className='error-msg_label'>
                                        <i className='bx bxs-error-circle bx-flashing' ></i>
                                        <label>
                                            <b>Error</b>·<span>Usuario o contraseña incorrectos.</span>
                                        </label>
                                    </div>

                                </div>

                                <button className='login-button' type="button" onClick={handleLogin}>
                                    Iniciar sesión
                                </button>
                            </div>
                            <div className='login-goto_register'>
                                <div className='login-footer'>
                                    <span>¿Aún no tienes una cuenta?</span>
                                    <a href='/registro'>
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