import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import CourseList from '../CourseList'

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

    return (
        <React.Fragment>
            <div>{admin.nombre}</div>
            <div>{admin.nombre_plan}</div>
            <h2>
                Cursos
            </h2>
            <div>
                {asignaturas.map(asignatura => (
                    <div key={asignatura.id}>
                        <h3>{asignatura.nombre}</h3>
                        <button>Agregar curso</button>
                        <CourseList id={asignatura.id} admin={true}/>
                    </div>
                ))}
            </div>
            <h2>
                Simuladores
            </h2>
            <button>Crear simulador</button>
            <div>
                {simuladores.length > 0 && simuladores.map(simulador => (
                    <div key={simulador.id}>
                        <p>{simulador.nombre}</p>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default AdminMenu;