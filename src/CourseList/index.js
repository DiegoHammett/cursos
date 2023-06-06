import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import { useNavigate } from 'react-router-dom'

function CourseList({ id, admin }) {

    const [cursos, setCursos] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const getCourse = () => {
            fetch(db.url + "?table=curso&where=asignatura IN (" + id + ")")
                .then(res => res.json())
                .then(res => setCursos(res))
                .catch(err => console.log(err))
        }
        getCourse()
    }, [id])

    const handleGetCourse = (id) => {
        nav("/course/" + id)
    }

    const handleEditCourse = (id) => {
        nav("/edit/" + id)
    }

    return (
        <React.Fragment>
            {cursos.length > 0 ? cursos.map(curso => (
                <div key={curso.id}>
                    <p onClick={() => { handleGetCourse(curso.id) }}>{curso.nombre}</p>
                    {!!admin && <button onClick={() => {handleEditCourse(curso.id)}}>Editar</button>}
                </div>
            )) :
                <p>Sin cursos</p>
            }
        </React.Fragment>
    )
}

export default CourseList