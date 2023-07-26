import React, { useEffect, useState } from 'react';
import { db } from '../dbconnect';
import './navbar_styles.css'
import DarkMode from '../DarkMode';

function Navbar() {

    const [logged, setLogged] = useState(false)
    const [error, setError] = useState(false)
    // change nav color when scrolling
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 10) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

    useEffect(() => {
        const getUser = () => {
            fetch(db.session, {
                method: 'GET',
                credentials: 'include'
            }).then(res => res.json()).then(res => {
                if (res.loggedin !== 0) {
                    setLogged(true)
                }
            }).catch(err => setError(true))
        }
        getUser()
    }, [])

    window.addEventListener('scroll', changeColor)

    return (
        <div className='navbar-body'>
            <header className={color ? 'navbar-header navbar-header_bg' : 'navbar-header'}>

                <nav className='navbar-buttons_1'>
                    <a className='navbar-logo' href='/'>
                        <i className='bx bx-cube'> </i><span>Logo</span>
                    </a>
                    <ul className='navbar-links'>
                        <li className='navbar-links_item'>
                            <a href='/'>Cursos</a>
                        </li>
                        <li className='navbar-links_item'>
                            <a href='/'>Planes</a>
                        </li>
                        <li className='navbar-links_item'>
                            <a href='/'>Contacto</a>
                        </li>
                    </ul>
                </nav>
                <nav className='navbar-buttons_2'>
                    <div className='dm-container '>
                        <DarkMode />
                    </div>
                    {logged ?
                        <React.Fragment>
                            <a href='/dashboard' className='navbar-links_item-2'>Mi tablero</a>
                            <a href='/logout' className='navbar-links_item-2'>Cerrar sesión</a>
                        </React.Fragment> :
                        <React.Fragment>
                            <a href='/registro' className='navbar-links_item-2'>Regístrate</a>
                            <a href='/login' className='navbar-links_item-3'>Iniciar sesión</a>
                        </React.Fragment>
                    }

                </nav>
            </header>
        </div>
    );
}

export default Navbar;