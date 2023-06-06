import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import CourseList from '../CourseList'

function UserMenu({ email }) {

    const [user, setUser] = useState([])
    const [asignaturas, setAsignaturas] = useState([])

    useEffect(() => {
        const getUser = () => {
            fetch(db.url + "?table=usuario a,plan b&column=a.nombre, b.nombre as nombre_plan, b.id&where=a.email in ('" + email + "') and a.plan=b.id")
                .then(res => res.json())
                .then(res => setUser(res[0]))
                .catch(err => console.log(err))
        }
        getUser()
    }, [email])

    useEffect(() => {
        const getAsignatura = () => {
            fetch(db.url + "?table=asignatura")
                .then(res => res.json())
                .then(res => setAsignaturas(res))
                .catch(err => console.log(err))
        }
        getAsignatura()
    }, [])



    return (
        <React.Fragment>
            <div>{user.nombre}</div>
            <div>PLAN {user.nombre_plan}</div>
            <div>
                Cursos:
            </div>
            <div>
                {asignaturas.map(asignatura => (
                    <div key={asignatura.id}>
                        <p>{asignatura.nombre}</p>
                        <CourseList id={asignatura.id} admin={false}/>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default UserMenu;