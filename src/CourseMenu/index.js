import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import CourseList from '../CourseList'
import Course from '../Course'
import EditCourse from '../EditCourse'



function CourseMenu({ admin, userID }) {

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

    const handleAddCourse = () => {
        const formData = new FormData()
        formData.append("nombre", "Nuevo curso")
        formData.append("descripcion", "Descripción del curso")
        formData.append("asignatura", 1)
        fetch(db.url + "?mode=insert&table=curso", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setMenuSelect(2)
                    setItemID(res.id)
                }
                else console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            {menuSelect === 0 &&
                <div>

                    <div className='coursemenu-header'>
                        <h1 className='title'>Todos los cursos</h1>
                        <button className='btn' onClick={handleAddCourse}><i className='bx bx-plus-circle icon'></i>Agregar curso</button>
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
                <div>
                    <button className='btn-xs' onClick={() => {setMenuSelect(0)}}>Regresar</button>
                    <Course id={itemID} userID={userID} />
                </div>
            }

            {
                menuSelect === 2 &&
                <div>
                    <button className='btn-xs' onClick={() => {setMenuSelect(0)}}>Regresar</button>
                    <EditCourse courseID={itemID} />
                </div>
            }
        </React.Fragment >
    )
}

export default CourseMenu;