import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect';
import Class from '../Class';
import Test from '../Test';
import Navbar from '../Navbar';
import './course_styles.css'

function Course({ id }) {

    const [modules, setModules] = useState([])
    const [currentModule, setCurrentModule] = useState(0)
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        const getModules = () => {
            fetch(db.url + "?table=modulos&where=curso in (" + id + ")")
                .then(res => res.json())
                .then(res => {
                    setModules(res)
                    setRendered(true)
                })
                .catch(err => console.log(err))
        }
        getModules()
    }, [id])

    return (
        <React.Fragment>
            <div className='course-body'>
                <div className='course-navigation'>
                    <div className='course-navigation-item'>
                        {currentModule !== 0 &&
                            <button className='btn-s' onClick={() => { setCurrentModule(currentModule - 1) }}>
                                <i class='bx bx-arrow-back icon'></i>Anterior
                            </button>
                        }
                    </div>
                    <div className='course-navigation-item'>
                        {currentModule !== modules.length - 1 &&
                            <button className='btn-s' onClick={() => { setCurrentModule(currentModule + 1) }}>
                                Siguiente<i class='bx bx-right-arrow-alt icon-r' ></i>
                            </button>
                        }
                    </div>


                </div>

                {!!rendered &&
                    <div>
                        {parseInt(modules[currentModule].tipo) === 1 && <Class id={modules[currentModule].id_clase} />}
                        {parseInt(modules[currentModule].tipo) === 2 && <Test id={modules[currentModule].id_test} retro={true} />}
                    </div>
                }
            </div>



        </React.Fragment>
    )
}

export default Course;