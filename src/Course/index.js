import React, { useEffect, useState, useCallback } from 'react'
import { db } from '../dbconnect';
import Class from '../Class';
import Test from '../Test';
import './course_styles.css'

function Course({ id, userID }) {

    const [modules, setModules] = useState([])
    const [currentModule, setCurrentModule] = useState()
    const [rendered, setRendered] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [error, setError] = useState(false)

    const getModules = useCallback(() => {
        fetch(db.url + "?table=lista_modulos a,modulo_usuario b&column=a.*, b.completado&where=a.modulo IN (b.modulo) AND curso in (" + id + ") ORDER BY orden")
            .then(res => res.json())
            .then(res => {
                if (res.length > 0) {
                    setModules(res)
                    setRendered(true)
                }
            })
            .catch(err => console.log(err))
    }, [id])

    const insertUserModule = useCallback((module) => {
        const formData = new FormData()
        formData.append("modulo", module)
        formData.append("usuario", userID)
        fetch(db.url + "?mode=insert&table=modulo_usuario", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status !== "OK") console.log(res)
            })
            .catch(err => console.log(err))
    }, [userID])

    const insertUserModules = useCallback(() => {
        fetch(db.url + "?table=lista_modulos&where=curso in (" + id + ") ORDER BY orden")
            .then(res => res.json())
            .then(res => {
                res.map(module => (
                    insertUserModule(module.modulo)
                ))
                getModules()
            })
            .catch(err => console.log(err))
    }, [insertUserModule, id, getModules])

    /// INICIO
    useEffect(() => {
        const getUserModules = () => {
            fetch(db.url + "?table=modulo_usuario&where=modulo in (SELECT id FROM modulos WHERE curso IN (" + id + ")) AND usuario IN (" + userID + ")")
                .then(res => res.json())
                .then(res => {
                    if (res.length === 0)
                        insertUserModules()
                    else getModules()
                    setCurrentModule(0)
                })
                .catch(err => console.log(err))
        }
        getUserModules()
    }, [id, insertUserModules, getModules, userID])

    const updateModule = useCallback((id, value) => {
        const formData = new FormData()
        formData.append("completado", value)
        fetch(db.url + "?mode=update&table=modulo_usuario&id=modulo&condition=" + id, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") getModules()
            }).catch(err => setError(true))
    }, [])

    useEffect(() => {
        if (currentModule !== undefined && !!rendered) {
            if (parseInt(modules[currentModule].tipo) === 1) {
                updateModule(modules[currentModule].modulo, 1)
                updateModule(modules[currentModule + 1].modulo, 0)
            }
        }
    }, [currentModule,rendered])

    return (
        <React.Fragment>
            {!!rendered &&
                <div className='course-body'>
                    <div className='course-navigation '>
                        <div className='course-navigation-item'>
                            {currentModule !== 0 &&
                                <button className='btn-s' onClick={() => { setCurrentModule(currentModule - 1) }}>
                                    <i className='bx bx-arrow-back icon'></i>Anterior
                                </button>
                            }
                        </div>
                        <div className='course-navigation-item-nav'>
                            {modules.map(module => (
                                <button onClick={() => { setCurrentModule(modules.indexOf(module)) }} key={module.modulo} className={modules.indexOf(module) === currentModule ? 'btn-nav-current' : 'btn-nav'}
                                    disabled={module.completado === null ? true
                                        : false}>
                                    {module.tipo === 1 &&
                                        <i className='bx bx-book-reader'></i>
                                    }
                                    {module.tipo === 2 &&
                                        <i className='bx bxs-graduation'></i>
                                    }
                                </button>
                            ))}
                        </div>
                        <div className='course-navigation-item'>
                            {currentModule !== modules.length - 1 &&
                                <button className='btn-s' onClick={() => { setCurrentModule(currentModule + 1) }} disabled={modules[currentModule + 1].completado === null}>
                                    Siguiente<i className='bx bx-right-arrow-alt icon-r' ></i>
                                </button>
                            }
                        </div>
                    </div>

                    <div className='course-content'>
                        {parseInt(modules[currentModule].tipo) === 1 && <Class id={modules[currentModule].id} />}
                        {parseInt(modules[currentModule].tipo) === 2 && <Test id={modules[currentModule].id} retro={true} setCompleted={setCompleted} />}
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Course;