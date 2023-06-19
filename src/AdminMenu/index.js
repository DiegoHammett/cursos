import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import CourseList from '../CourseList'
import DarkMode from '../DarkMode';
import UserImg from './user.png';
import './adminmenu_styles.css'

function AdminMenu({ email }) {

    const [admin, setAdmin] = useState([])
    const [asignaturas, setAsignaturas] = useState([])
    const [simuladores, setSimuladores] = useState([])

    useEffect(() => {
        const getUser = () => {
            fetch(db.url + "?table=usuario&where=email IN ('" + email + "')")
                .then(res => res.json())
                .then(res => setAdmin(res[0]))
                .catch(err => console.log(err))
        }
        getUser()
    }, [email])

    useEffect(() => {
        const getAsignaturas = () => {
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
        getAsignaturas()
        getSimuladores()
    }, [])

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
                                <span className='top-user-name'><b>{admin.nombre}</b></span>
                                <div className='top-user-plan-container'>
                                    <label className='lbl'>RANGO</label>
                                    <span className='top-user-plan'><b className='b-medium'>{admin.nombre_plan}</b></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d_m-s_menu'>
                        <ul>
                            <li>
                                <a href='#'>
                                    <i class='bx bxs-home'></i>
                                    <span className='d_m-s_menu-item'>Inicio</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Inicio</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i class='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i class='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i class='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i class='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i class='bx bx-cube'></i>
                                    <span className='d_m-s_menu-item'>Item</span>
                                </a>
                                <span className='d_m-s_menu-tooltip'>Item</span>
                            </li>
                            <li>
                                <a href='#'>
                                    <i class='bx bx-cube'></i>
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
                                    <button className='btn-xs'>Cerrar sesión</button>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className='dashboard_main_container '>
                        <div className='tabs'>
                            <Tabs>
                                <Tab label="Cursos">
                                    <section className='cursos-container'>
                                        <div className='cursos-container-header'>
                                            <h1>Cursos</h1>
                                            <button className='btn'><i class='bx bx-plus-circle icon'></i>Agregar curso</button>
                                        </div>

                                        {asignaturas.map(asignatura => (
                                            <div className='cursos-container-item' key={asignatura.id}>
                                                <div class="three">
                                                    <h1>{asignatura.nombre}</h1>
                                                </div>
                                                <div className='courseCards inset'>
                                                    <CourseList id={asignatura.id} admin={true} />
                                                </div>

                                            </div>
                                        ))}
                                    </section>
                                </Tab>
                                <Tab label="Simuladores">
                                    <section className='cursos-container'>
                                        <div className='cursos-container-header'>
                                            <h1>Simuladores</h1>
                                            <button className='btn'><i class='bx bx-plus-circle icon'></i>Crear simulador</button>
                                        </div>


                                        {simuladores.length > 0 && simuladores.map(simulador => (
                                            <div key={simulador.id}>
                                                <div class="three">
                                                    <h1>{simulador.nombre}</h1>
                                                </div>
                                            </div>
                                        ))}
                                    </section>
                                </Tab>
                            </Tabs>
                        </div>







                    </div>

                </div>
            </div>

          
        </React.Fragment>
    )
}

class Tabs extends React.Component {
    state = {
        activeTab: this.props.children[0].props.label
    }
    changeTab = (tab) => {

        this.setState({ activeTab: tab });
    };
    render() {

        let content;
        let buttons = [];
        return (
            <div>
                {React.Children.map(this.props.children, child => {
                    buttons.push(child.props.label)
                    if (child.props.label === this.state.activeTab) content = child.props.children
                })}

                <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab} />
                <div className="tab-content">{content}</div>

            </div>
        );
    }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {

    return (
        <div className="tab-buttons">
            {buttons.map(button => {
                return <button className={button === activeTab ? 'active' : ''} onClick={() => changeTab(button)}>{button}</button>
            })}
        </div>
    )
}

const Tab = props => {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}


export default AdminMenu;