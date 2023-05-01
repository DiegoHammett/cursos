import React, { useState } from 'react'
import { toPascalCase, checkEmail } from '../utils.js'
import { db } from '../dbconnect.js';
import md5 from 'md5';
import Navbar from '../Navbar';
import './register_styles.css';
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
                <div className='register-container '>

                    <div className='register-header'>
                        <div className='register-header_logo inset'>
                            <i className='bx bx-cube'> </i><span>Logo</span>
                        </div>
                        <div>
                            <h1 className='title'>Bienvenido a MARCA</h1>
                            <p className='description'>A continuación, llene todos los campos con su información. Al finalizar, presione 'Registrarse'.</p>
                            <p className='register-msg pill'><i class='bx bx-error-circle icon' ></i>Todos los campos son obligatorios.</p>
                        </div>

                    </div>

                    <div className='register-info'>
                        <div className='register-left inset'>

                            <form className='register-form'>
                                <div className='register-form_content'>
                                    <span className='register-form_subtitle title'>
                                        <b className='b-medium'>Información personal</b>
                                    </span>
                                    <span className='register-form_description'>
                                        <p className='description'>Ingresa tu información personal para conocernos mejor. </p>
                                    </span>


                                    <div className='register-forms-container'>
                                        <div className='register-form_item'>
                                            <label className='input-label lbl'>Nombre/s:</label>
                                            <input
                                                className='input-text'
                                                name="nombre"
                                                type='text'
                                                required
                                                onChange={handleChange}
                                                id="inputName" />

                                        </div>

                                        <div className='register-form_item'>
                                            <label className='input-label lbl'>Primer apellido:</label>
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
                                            <label className='input-label lbl'>Segundo apellido:</label>
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



                                </div>
                            </form>

                        </div>

                        <div className='register-right inset'>
                            <form className='register-form'>
                                <div className='register-form_content'>
                                    <span className='register-form_subtitle title'>
                                        <b className='b-medium'>Información de la cuenta</b>
                                    </span>
                                    <span className='register-form_description'>
                                        <p className='description'>Con esta información podrás acceder a la plataforma.</p>
                                    </span>


                                    <div className='register-forms-container'>
                                        <div className='register-form_item'>
                                            <label className='input-label lbl'>Correo electrónico</label>
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
                                            <label className='input-label lbl'>
                                                Crea una contraseña
                                                <p className='error-msg_label' hidden={!passAlert}>
                                                    <span><i class='bx bx-x' ></i>Las contraseñas no coinciden</span>
                                                </p>
                                            </label>
                                            <input className='input-text' name="password" onChange={handleChange} type="password" id="inputPassword1" required />

                                        </div>

                                        <div className='register-form_item'>
                                            <label className='input-label lbl'>
                                                Confirma la contraseña
                                                <p className='error-msg_label' hidden={!passAlert}>
                                                    <span><i class='bx bx-x' ></i>Las contraseñas no coinciden</span>
                                                </p>
                                            </label>
                                            <input className='input-text' onChange={handleCheckPassword} type="password" id="inputPassword2" required />

                                        </div>
                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>


                    <div className='register-pricing '>
                        <div className='register-pricing-table inset'>
                            <div className='register-pricing_content'>
                                <span className='register-form_subtitle title'>
                                    <b className='b-medium'>Planes disponibles</b>
                                </span>
                                <span className='register-form_description'>
                                    <p className='description'>Elige el plan que mejor se ajuste a ti. </p>
                                </span>

                            </div>
                            <div className='register-pricing_cards'>
                                <div className='pricing_card'>
                                    <input className='pricing_radio inset' type='radio' name='pricing' id='card1' />
                                    <label className='pricing_content' for='card1'>
                                        <label className='lbl'>Plan</label>
                                        <h5 className='pricing_title title'><b>BASIC</b></h5>
                                        <h2 className='pricing_price inset'>
                                            <span className='pricing_price_symbol'><i class='bx bx-dollar' ></i></span>
                                            <span className='pricing_price_amount'>99<sup className='pricing_price_cents'>99</sup></span>
                                            <span className='pricing_price_currency'>MXN</span>
                                        </h2>
                                    </label>
                                </div>
                                <div className='pricing_card'>
                                    <input className='pricing_radio inset' type='radio' name='pricing' id='card2' />
                                    <label className='pricing_content' for='card2'>
                                        <label className='lbl'>Plan</label>
                                        <h5 className='pricing_title title'><b>STANDARD</b></h5>
                                        <h2 className='pricing_price inset'>
                                            <span className='pricing_price_symbol'><i class='bx bx-dollar' ></i></span>
                                            <span className='pricing_price_amount'>249<sup className='pricing_price_cents'>99</sup></span>
                                            <span className='pricing_price_currency'>MXN</span>
                                        </h2>
                                    </label>
                                </div>
                                <div className='pricing_card'>
                                    <input className='pricing_radio inset' type='radio' name='pricing' id='card3' />
                                    <label className='pricing_content' for='card3'>
                                        <label className='lbl'>Plan</label>
                                        <h5 className='pricing_title title'><b>PREMIUM</b></h5>
                                        <h2 className='pricing_price inset'>
                                            <span className='pricing_price_symbol'><i class='bx bx-dollar' ></i></span>
                                            <span className='pricing_price_amount'>499<sup className='pricing_price_cents'>99</sup></span>
                                            <span className='pricing_price_currency'>MXN</span>
                                        </h2>
                                    </label>
                                </div>
                            </div>
                            <div className='register-pricing_moreinfo'>
                                <span className='description'>
                                    ¿No sabes qué plan elegir? Visita la sección de <a className='link-icon-text' href='/planes'>Planes<i class='bx bx-link-external' ></i></a> para obtener más información.
                                </span>
                            </div>


                        </div>
                    </div>

                    <div className='register-footer'>
                        <h6 hidden={!fillAlert}>
                            <span className='pill-error b-medium'>
                                <i class='bx bx-error icon' ></i>
                                Debes llenar todos los campos.
                            </span>

                        </h6>

                        <h6 hidden={!dupEmail}>
                            <span className='pill-error b-medium'>
                                <i class='bx bx-error icon' ></i>El email introducido ya está registrado en la plataforma
                            </span>
                        </h6>

                        <button className='btn' type="button" onClick={handleSubmit}>
                            Registrarse
                        </button>
                        <br></br>
                        <span className='description'>¿Ya tienes una cuenta?</span>
                        <a className='btn2' href='/login'>
                            Inicia sesión <i className='bx bxs-chevrons-right bx-fade-right' ></i>
                        </a>
                    </div>

                </div>
            </div>


        </React.Fragment>
    );
}

export default Register;