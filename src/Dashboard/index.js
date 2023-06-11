import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import UserMenu from '../UserMenu'
import AdminMenu from '../AdminMenu'

function Dashboard() {

    const [error, setError] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState(false)
    const [email, setEmail] = useState()

    useEffect(() => {
        const getUser = () => {
            fetch(db.session, {
                method: 'GET',
                credentials: 'include'
            }).then(res => res.json()).then(res => {
                if (res.loggedin === 0) {
                    console.log("NOT LOGGED")
                } else {
                    if (parseInt(res.plan) === 0)
                        setAdmin(true)
                    else
                        setUser(true)
                    setEmail(res.email)
                }
            }).catch(err => setError(true))
        }
        getUser()
    }, [])


    return (
        <React.Fragment>
            {!!user && <UserMenu email={email}/>}
            {!!admin && <AdminMenu email={email}/>}
        </React.Fragment>
    )
}

export default Dashboard;