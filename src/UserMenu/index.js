import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import CourseList from '../CourseList'
import './usermenu_styles.css';
import DarkMode from '../DarkMode';
import UserImg from './user.png';
import Course from '../Course';
import EditCourse from '../EditCourse';
import Test from '../Test';
import EditTest from '../EditTest';

import { Tabs, TabList, Tab, TabPanel } from "https://cdn.skypack.dev/react-tabs@3.2.2";

function UserMenu({ email, admin }) {

    const [user, setUser] = useState([])
    const [asignaturas, setAsignaturas] = useState([])
    const [simuladores, setSimuladores] = useState([])
    const [menuSelect, setMenuSelect] = useState(0)
    const [itemID, setItemID] = useState()
    const [time, setTime] = useState()

    useEffect(() => {
        const getUser = () => {
            fetch(db.url + "?table=usuario a,plan b&column=a.nombre, b.nombre as nombre_plan, b.id&where=a.email in ('" + email + "') and a.plan=b.id")
                .then(res => res.json())
                .then(res => setUser(res[0]))
                .catch(err => console.log(err))
        }
        getUser()
    }, [email])

    useEffect(() => {
        const getAsignatura = () => {
            fetch(db.url + "?table=asignatura")
                .then(res => res.json())
                .then(res => setAsignaturas(res))
                .catch(err => console.log(err))
        }
        getAsignatura()
    }, [])


    // Sidebar menu button
    const [sidebarActive, setSidebarActive] = useState(false);

    const handleSidebarClick = () => {
        setSidebarActive(!sidebarActive);
    };

    const castTime = (t) => {
        const formatTime = t.split(":")
        setTime((parseInt(formatTime[0]) * 3600) + (parseInt(formatTime[1]) * 60) + parseInt(formatTime[0]))
    }

    return (
        <React.Fragment>
            <div className='dashboard_body'>
                <Tabs>
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
                                        <label className='lbl'>PLAN</label>
                                        <span className='top-user-plan'><b className='b-medium'>{user.nombre_plan}</b></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d_m-s_menu'>
                            <TabList className="mt--10">
                                <Tab>
                                    <button>
                                        <i class='bx bxs-home'></i>
                                        <span className='d_m-s_menu-item'>Inicio</span>
                                    </button>
                                    <span className='d_m-s_menu-tooltip'>Inicio</span>
                                </Tab>
                                <Tab>
                                    <button>
                                        <i class='bx bxs-book-content'></i>
                                        <span className='d_m-s_menu-item'>Cursos</span>
                                    </button>
                                    <span className='d_m-s_menu-tooltip'>Cursos</span>
                                </Tab>
                                <Tab>
                                    <button>
                                        <i class='bx bx-desktop'></i>
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

                                        </li>
                                    </ul>
                                    <div className='d_m-h_navbar_session-btns'>
                                        <div className='d_m-h-darkmode '>
                                            <DarkMode />
                                        </div>
                                        <button className='btn-xs'>Cerrar sesión</button>
                                    </div>
                                </div>


                            </div>

                        </div>

                        <div className='dashboard_main_container '>
                            <TabPanel className='cursos-container'>
                                <div className='d_m_c-user-container '>
                                    <div className='d_m_c-user-card inset'>
                                        <div className='d_m_c-user-card-head'>
                                            <img className='d_m-s_top-user-img' src={UserImg} alt='me' />
                                            <div className='d_m_c-user-card-info '>
                                                <span>¡Hola, <b className='b-medium'>{user.nombre}</b>!</span>
                                                <div className='user-card-info-detail'>
                                                    <span>
                                                        Tu plan actual es <b className='b-medium'>{user.nombre_plan}</b>
                                                    </span>
                                                    <span>
                                                        ·
                                                    </span>
                                                    <span>
                                                        Estudiante
                                                    </span>
                                                    <span>
                                                        ·
                                                    </span>
                                                    <span>
                                                        <b className='b-medium'>#</b> cursos realizados
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d_m_c-user-card-head-2'>
                                            <button className='btn-xs inset' title='Editar perfil'><i class='bx bxs-pencil'></i></button>
                                        </div>


                                    </div>
                                    <div className='d_m_c-user-statistics'>
                                        <div className='d_m_c-user-statistics-item inset'>
                                            <div className='statistics-item-title'>
                                                Estadística 1
                                            </div>
                                            <div className='statistics-item-content'>
                                                Contenido 1
                                            </div>
                                        </div>
                                        <div className='d_m_c-user-statistics-item inset'>
                                            <div className='statistics-item-title'>
                                                Estadística 2
                                            </div>
                                            <div className='statistics-item-content'>
                                                Contenido 2
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className='cursos-container'>
                                <div className='cursos-container-header-2'>
                                    <h1>Cursos</h1>
                                    <span>
                                        Elige entre los cursos online listados a continuación para aprender desde cero o desarrollar las habilidades necesarias para aprobar tu examen de admisión.
                                    </span>
                                </div>
                                {asignaturas.map(asignatura => (
                                    <div className='cursos-container-item' key={asignatura.id}>
                                        <div class="three">
                                            <h1>{asignatura.nombre}</h1>
                                        </div>
                                        <div className='courseCards inset'>
                                            <CourseList id={asignatura.id} admin={false} />
                                        </div>

                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel className='cursos-container'>
                                <div className='cursos-container-header-2'>
                                    <h1>Simuladores</h1>
                                    <span>
                                        Todos los simuladores disponibles.
                                    </span>
                                </div>
                                <section className='cursos-container'>
                                    <div className='courseCards inset'>
                                        {simuladores.map(simulador => (
                                            <div className='courseCard' key={simulador.id}>
                                                <p className='courseHeading'>
                                                    {simulador.nombre}
                                                </p>
                                                <div className='courseBtns'>
                                                    <button className='acceptButton' onClick={() => {
                                                        setItemID(simulador.id)
                                                        castTime(simulador.tiempo)
                                                        setMenuSelect(3)
                                                    }}>Ir al simulador</button>
                                                    {!!admin && <button className='acceptButton2' onClick={() => {
                                                        setItemID(simulador.id)
                                                        setMenuSelect(4)
                                                    }}>Editar</button>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </TabPanel>

                        </div>

                    </div>
                </Tabs>


            </div>

        </React.Fragment>
    );
}

export default UserMenu;