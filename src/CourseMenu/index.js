import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import CourseList from '../CourseList'
import Course from '../Course'
import EditCourse from '../EditCourse'



function CourseMenu({admin}) {

    const [menuSelect, setMenuSelect] = useState(0)
    const [asignaturas, setAsignaturas] = useState([])
    const [itemID, setItemID] = useState()

    useEffect(() => {
        const getAsignatura = () => {
            fetch(db.url + "?table=asignatura")
                .then(res => res.json())
                .then(res => setAsignaturas(res))
                .catch(err => console.log(err))
        }
        getAsignatura()
    }, [menuSelect])

    return (
        <React.Fragment>
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
                </div>
            }

            {
                menuSelect === 1 &&
                <Course id={itemID} />
            }

            {
                menuSelect === 2 &&
                <EditCourse courseID={itemID} />
            }
        </React.Fragment >
    )
}

export default CourseMenu;