import React, {useState} from 'react';
import './navbar_styles.css'

function Navbar() {

    // change nav color when scrolling
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 90) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

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
                    <a href='/' className='navbar-links_item-2'>Regístrate</a>
                    <a href='/' className='navbar-links_item-3'>Iniciar sesión</a>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;