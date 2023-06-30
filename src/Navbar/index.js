import React, { useEffect, useState } from 'react';
import './navbar_styles.css'
import DarkMode from '../DarkMode';

function Navbar() {

    // change nav color when scrolling
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 10) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

    window.addEventListener('scroll', changeColor)


    const [buttons, setButtons] = useState("navbar-links active")
    const [buttons2, setButtons2] = useState("navbar-links_2 active")
    const [flag, setFlag] = useState(false)
    const [icons, setIcons] = useState("bx bx-x")

    useEffect(() => {
        if (flag) {
            setIcons("bx bx-x")
            setButtons("navbar-links active")
            setButtons2("navbar-links_2 active")
        } else {
            setIcons("bx bx-menu")
            setButtons("navbar-links")
            setButtons2("navbar-links_2")
        }
    }, [flag])

    const handleClick = () => {
        setFlag(!flag)
    }

    return (
        <div className='navbar-body'>
            <header className={color ? 'navbar-header navbar-header_bg' : 'navbar-header'}>

                <nav className='navbar-buttons_1'>
                    <a className='navbar-logo' href='/'>
                        <i className='bx bx-cube'> </i><span>Logo</span>
                    </a>
                    <ul className={buttons}>
                        <div className='nav-links_items_1'>
                            <li className='navbar-links_item'>
                                <a href='/'>Cursos</a>
                            </li>
                            <li className='navbar-links_item'>
                                <a href='/'>Planes</a>
                            </li>
                            <li className='navbar-links_item'>
                                <a href='/'>Contacto</a>
                            </li>
                        </div>
                        <div className='nav-links_items_2'>
                            <a href='/registro' className='navbar-links_item-2'>Regístrate</a>
                            <a href='/login' className='navbar-links_item-3'>Iniciar sesión</a>
                        </div>
                    </ul>
                    <ul className='nav-login-reg'>
                        <div className='dm-container '>
                            <DarkMode />
                        </div>
                        <div className='nav-login-reg-btns'>
                            <a href='/registro' className='navbar-links_item-2'>Regístrate</a>
                            <a href='/login' className='navbar-links_item-3'>Iniciar sesión</a>
                        </div>

                    </ul>
                </nav>

                <div className='navbar-menu-icons' onClick={handleClick}>
                    <i class={icons}></i>
                </div>
            </header>
        </div>
    );
}

export default Navbar;