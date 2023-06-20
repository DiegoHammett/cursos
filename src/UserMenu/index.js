import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './usermenu_styles.css';
import DarkMode from '../DarkMode';
import UserImg from './user.png';
import CourseMenu from '../CourseMenu/index.';

function UserMenu({ email, admin }) {

    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = () => {
            fetch(db.url + "?table=usuario a,plan b&column=a.nombre, b.nombre as nombre_plan, b.id&where=a.email in ('" + email + "') and a.plan=b.id")
                .then(res => res.json())
                .then(res => setUser(res[0]))
                .catch(err => console.log(err))
        }
        getUser()
    }, [email])

    // Sidebar menu button
    const [sidebarActive, setSidebarActive] = useState(false);

    const handleSidebarClick = () => {
        setSidebarActive(!sidebarActive);
    };

    

    return (
        <React.Fragment>
            <div className='dashboard_body'>


                <div className={sidebarActive ? 'dashboard_menu-sidebar active' : 'dashboard_menu-sidebar'}>
                    <div className='d_m-s_top'>
                        <div className='d_m-s_top-logo-container'>
                        </div>
                        <i className='d_m-s_top-logo bx bx-menu' id='btn-menu' onClick={handleSidebarClick}></i>
                        <div className='d_m-s_top-user'>
                            <img className='d_m-s_top-user-img' src={UserImg} alt='me' />
                            <div className='d_m-s_top-user-info'>
                                <span className='top-user-name'><b>{user.nombre}</b></span>
                                <div className='top-user-plan-container'>
                                    {!admin && <label className='lbl'>PLAN</label>}
                                    <span className='top-user-plan'><b className='b-medium'>{user.nombre_plan}</b></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d_m-s_menu'>
                        <ul>
                            <li>
                                <button>
                                    <i className='bx bxs-home'></i>
                                    <span className='d_m-s_menu-item'>Inicio</span>
                                </button>
                                <span className='d_m-s_menu-tooltip'>Inicio</span>
                            </li>

                        </ul>
                    </div>

                    <div className='d_m-s_bottom'>

                    </div>
                </div>

                <div className='dashboard_main'>
                    <div className='dashboard_menu-header'>
                        <div className='d_m-h_container'>
                            <div className='d_m-h_logo'>
                                <a className='d_m-h-logo-item' href='/'>
                                    <i className='bx bx-cube'> </i><span>Logo</span>
                                </a>
                            </div>
                            <div className='d_m-h_options'>
                                <ul className='d_m-h_navbar-links'>
                                    <li className='navbar-links_item'>
                                        <a href='/'>#Item1</a>
                                    </li>
                                    <li className='navbar-links_item'>
                                        <a href='/'>#Item2</a>
                                    </li>
                                    <li className='navbar-links_item'>
                                        <a href='/'>#Item3</a>
                                    </li>
                                </ul>
                                <div className='d_m-h_navbar_session-btns'>
                                    <div className='d_m-h-darkmode '>
                                        <DarkMode />
                                    </div>
                                    <a href='/logout' className='btn-xs'>Cerrar sesión</a>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className='dashboard_main_container '>
                        {/* <SimMenu admin={admin}/> */}
                        <CourseMenu admin={admin}/>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

export default UserMenu;