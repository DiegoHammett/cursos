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
        const getSimuladores = () => {
            fetch(db.url + "?table=test&where=tipo IN (2)")
                .then(res => res.json())
                .then(res => setSimuladores(res))
                .catch(err => console.log(err))
        }
        getAsignatura()
        getSimuladores()
    }, [menuSelect])


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
                                <button onClick={() => { setMenuSelect(0) }}>
                                    <i className='bx bxs-home'></i>
                                    <span className='d_m-s_menu-item'>Inicio</span>
                                </button>
                                <span className='d_m-s_menu-tooltip'>Inicio</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Mis cursos</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
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

                        {menuSelect === 0 &&
                            <div>

                                <div className="nine">
                                    <h1>Cursos<span>Todos los cursos disponibles</span></h1>
                                </div>
                                <section className='cursos-container'>
                                    {asignaturas.map(asignatura => (
                                        <div key={asignatura.id}>
                                            <div className="three">
                                                <h1>{asignatura.nombre}</h1>
                                            </div>
                                            <div className='courseCards inset'>
                                                <CourseList id={asignatura.id} admin={admin} setItemID={setItemID} setMenuSelect={setMenuSelect} />
                                            </div>

                                        </div>
                                    ))}
                                </section>

                                <div className="nine">
                                    <h1>Simuladores<span>Todos los simuladores disponibles</span></h1>
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
                            </div>
                        }

                        {menuSelect === 1 &&
                            <Course id={itemID} />
                        }

                        {menuSelect === 2 &&
                            <EditCourse courseID={itemID} />
                        }

                        {menuSelect === 3 &&
                            <Test id={itemID} retro={false} time={time} />
                        }

                        {menuSelect === 4 &&
                            <EditTest testID={itemID} />
                        }
                    </div>



                </div>
            </div>

        </React.Fragment>
    );
}

export default UserMenu;