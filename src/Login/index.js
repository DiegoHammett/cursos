import React, { useState } from 'react'
import md5 from 'md5'
import { db } from '../dbconnect'
import { useNavigate } from 'react-router-dom'

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
                nav("/dashboard")
            else {
                setLogAlert(false)
                document.getElementById("typePassword").value = ""
                document.getElementById("typeEmail").value = ""
            }
        }).catch(err => setError(true))
    }

    return (
        <React.Fragment>
            <div>
                <label>Correo electrónico</label>
                <input placeholder="Correo electrónico" type="email" id="typeEmail" onChange={(e) => { setUser(e.target.value); setLogAlert(true) }} />
            </div>

            <div>
                <label>Contraseña</label>
                <input placeholder="Contraseña" type="password" id="typePassword" onChange={(e) => { setPass(e.target.value); setLogAlert(true) }} />
            </div>

            <p hidden={logAlert}>Usuario o contraseña incorrectos</p>
            <div>
                <button type="button" onClick={handleLogin}>Enviar</button>
            </div>
        </React.Fragment>
    );
}

export default Login;