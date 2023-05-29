import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import { useNavigate } from 'react-router-dom'

function UserMenu({ email }) {

    const [user, setUser] = useState([])
    const [cursos, setCursos] = useState([])
    const nav = useNavigate()

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
        const getCourse = () => {
            fetch(db.url + "?table=curso")
                .then(res => res.json())
                .then(res => setCursos(res))
                .catch(err => console.log(err))
        }
        getCourse()
    },[])

    const handleGetCurso = (id) => {
        nav("/course/"+id)
    }

    return (
        <React.Fragment>
            <div>{user.nombre}</div>
            <div>PLAN {user.nombre_plan}</div>
            <div>
                Cursos:
            </div>
            <div>
                {cursos.map(curso => (
                    <p onClick={() => {handleGetCurso(curso.id)}}>{curso.nombre}</p>
                ))}
            </div>
        </React.Fragment>
    );
}

export default UserMenu;