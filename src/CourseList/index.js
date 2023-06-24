import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import { useNavigate } from 'react-router-dom'
import './courselist_styles.css';

function CourseList({ id, admin, setItemID, setMenuSelect }) {

    const [cursos, setCursos] = useState([])

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
        setItemID(id)
        setMenuSelect(1)
    }

    const handleEditCourse = (id) => {
        setItemID(id)
        setMenuSelect(2)
    }

    return (
        <React.Fragment>
            {cursos.length > 0 ? cursos.map(curso => (
                <div key={curso.id}>
                    <div className='courseCard'>
                        <span className='courseHeading' onClick={() => { handleGetCourse(curso.id) }}>
                            {curso.nombre}
                        </span>
                        <p className='courseDescription'>
                            {curso.descripcion}
                        </p>
                        <div className='courseBtns'>
                            <button className='acceptButton' onClick={() => { handleGetCourse(curso.id) }}>Ir al curso</button>
                            {!!admin && <button className='acceptButton2' onClick={() => { handleEditCourse(curso.id) }}>Editar</button>}
                        </div>
                    </div>
                </div>
            )) :
                <label className='lbl'>Sin cursos</label>
            }
        </React.Fragment>
    )
}

export default CourseList