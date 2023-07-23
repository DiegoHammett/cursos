import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import { useNavigate } from 'react-router-dom'
import './courselist_styles.css';

function CourseList({ id, admin, setItemID, setMenuSelect }) {

    const [cursos, setCursos] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getCourse = () => {
            fetch(db.url + "?table=curso&where=asignatura IN (" + id + ")" + (!admin ? " AND activo" : ""))
                .then(res => res.json())
                .then(res => setCursos(res))
                .catch(err => console.log(err))
        }
        getCourse()
    }, [id, refresh])

    const handleGetCourse = (id) => {
        setItemID(id)
        setMenuSelect(1)
    }

    const handleEditCourse = (id) => {
        setItemID(id)
        setMenuSelect(2)
    }

    const handleDeleteCourse = (id) => {
        fetch(db.url + "?table=curso&id=" + id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") setRefresh(!refresh)
                else console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            {cursos.length > 0 ? cursos.map(curso => (
                <div key={curso.id}>
                    <div className={"courseCard" + (!curso.activo ? " inactive" : "")}>
                        <span className='courseHeading' onClick={() => { handleGetCourse(curso.id) }}>
                            {curso.nombre}
                        </span>
                        {!!admin && !curso.activo &&
                            <p className='courseDescription'>
                                (Inactivo)
                            </p>
                        }
                        <p className='courseDescription'>
                            {curso.descripcion}
                        </p>
                        <div className='courseBtns'>
                            <button className='acceptButton' onClick={() => { handleGetCourse(curso.id) }}>Ir al curso</button>
                            {!!admin && <button className='acceptButton2' onClick={() => { handleEditCourse(curso.id) }}>Editar</button>}
                            {!!admin && <button className='acceptButton2' onClick={() => { handleDeleteCourse(curso.id) }}>Eliminar</button>}
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