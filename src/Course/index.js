import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect';
import Class from '../Class';
import Test from '../Test';
import './course_styles.css'

function Course({ id }) {

    const [modules, setModules] = useState([])
    const [currentModule, setCurrentModule] = useState(0)
    const [rendered, setRendered] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        const getModules = () => {
            fetch(db.url + "?table=lista_modulos&where=curso in (" + id + ")")
                .then(res => res.json())
                .then(res => {
                    setModules(res)
                    setRendered(true)
                })
                .catch(err => console.log(err))
        }
        getModules()
    }, [id])

    useEffect(() => {
        const getUser = () => {
            fetch(db.session, {
                method: 'GET',
                credentials: 'include'
            }).then(res => res.json()).then(res => {
                if (res.loggedin === 0) {
                    console.log("NOT LOGGED")
                } else {
                    setUser(res.id)
                }
            }).catch(err => console.log(err))
        }
        getUser()
    }, [id])

    useEffect(() => {
        if (user !== undefined) {
            fetch(db.url + "?table=modulo_usuario&where=usuario in (" + user + ")")
                .then(res => res.json())
                .then(res => {
                })
                .catch(err => console.log(err))
        }
    }, [user])

    return (
        <React.Fragment>
            <div className='course-body'>

                <div className='course-navigation'>
                    <div className='course-navigation-item'>
                        {currentModule !== 0 &&
                            <button className='btn-s' onClick={() => { setCurrentModule(currentModule - 1) }}>
                                <i className='bx bx-arrow-back icon'></i>Anterior
                            </button>
                        }
                    </div>
                    <div className='course-navigation-item'>
                        {modules.map(module => (
                            modules.indexOf(module) === currentModule ?
                                <button onClick={() => { setCurrentModule(modules.indexOf(module)) }} key={module.id} className='btn-nav-current'>
                                    {module.tipo === 1 && "Clase"}
                                    {module.tipo === 2 && "Test"}
                                </button> :
                                <button onClick={() => { setCurrentModule(modules.indexOf(module)) }} key={module.id} className='btn-nav'>
                                    {module.tipo === 1 && "Clase"}
                                    {module.tipo === 2 && "Test"}
                                </button>
                        ))}
                    </div>
                    <div className='course-navigation-item'>
                        {currentModule !== modules.length - 1 &&
                            <button className='btn-s' onClick={() => { setCurrentModule(currentModule + 1) }}>
                                Siguiente<i className='bx bx-right-arrow-alt icon-r' ></i>
                            </button>
                        }
                    </div>
                </div>

                {!!rendered &&
                    <div>
                        {parseInt(modules[currentModule].tipo) === 1 && <Class id={modules[currentModule].id} />}
                        {parseInt(modules[currentModule].tipo) === 2 && <Test id={modules[currentModule].id} retro={true} />}
                    </div>
                }
            </div>



        </React.Fragment>
    )
}

export default Course;