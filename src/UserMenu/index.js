import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './usermenu_styles.css';
import DarkMode from '../DarkMode';
import UserImg from './user.png';
import CourseMenu from '../CourseMenu';
import SimMenu from '../SimMenu';

import { Tabs, TabList, Tab, TabPanel } from "https://cdn.skypack.dev/react-tabs@3.2.2";
import StatsMenu from '../StatsMenu';

function UserMenu({ userID, admin }) {

    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = () => {
            fetch(db.url + "?table=usuario a,plan b&column=a.nombre, b.nombre as nombre_plan, b.id&where=a.id in (" + userID + ") and a.plan=b.id")
                .then(res => res.json())
                .then(res => setUser(res[0]))
                .catch(err => console.log(err))
        }
        getUser()
    }, [userID])

    // Sidebar menu button
    const [sidebarActive, setSidebarActive] = useState(false);

    const handleSidebarClick = () => {
        setSidebarActive(!sidebarActive);
    };

    return (
        <React.Fragment>

            <Tabs>
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
                            <TabList className="mt--10">
                                <Tab>
                                    <button>
                                        <i className='bx bxs-home'></i>
                                        <span className='d_m-s_menu-item'>Inicio</span>
                                    </button>
                                    <span className='d_m-s_menu-tooltip'>Inicio</span>
                                </Tab>
                                <Tab>
                                    <button>
                                        <i className='bx bxs-book-open'></i>
                                        <span className='d_m-s_menu-item'>Cursos</span>
                                    </button>
                                    <span className='d_m-s_menu-tooltip'>Cursos</span>
                                </Tab>
                                <Tab>
                                    <button>
                                        <i className='bx bx-desktop'></i>
                                        <span className='d_m-s_menu-item'>Simuladores</span>
                                    </button>
                                    <span className='d_m-s_menu-tooltip'>Simuladores</span>
                                </Tab>

                            </TabList>


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
                                            <button className='btn-xs'>Ir atrás</button>
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
                            <TabPanel>
                                <StatsMenu admin={admin} user={user}/>
                            </TabPanel>
                            
                            <TabPanel>
                                <CourseMenu admin={admin} userID={userID}/>
                            </TabPanel>

                            <TabPanel>
                                <SimMenu admin={admin} />
                            </TabPanel>
                            
                        </div>
                    </div>
                </div>
            </Tabs>


        </React.Fragment>
    );
}

export default UserMenu;