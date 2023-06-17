import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import UserMenu from '../UserMenu'

function Dashboard() {

    const [error, setError] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [email, setEmail] = useState()
    const [rendered, setRendered] = useState(false)

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
                        setAdmin(false)
                    setEmail(res.email)
                    setRendered(true)
                }
            }).catch(err => setError(true))
        }
        getUser()
    }, [])


    return (
        <React.Fragment>
            {!!rendered && <UserMenu email={email} admin={admin}/>}
        </React.Fragment>
    )
}

export default Dashboard;