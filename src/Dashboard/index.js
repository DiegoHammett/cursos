import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import UserMenu from '../UserMenu'

function Dashboard() {

    const [error, setError] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [plan, setPlan] = useState()
    const [id, setID] = useState()
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        const getUser = () => {
            fetch(db.session, {
                method: 'GET',
                credentials: 'include'
            }).then(res => res.json()).then(res => {
                if (res.loggedin !== 0){
                    setPlan(res.plan)
                    if (parseInt(res.plan) === 0)
                        setAdmin(true)
                    else
                        setAdmin(false)
                    setID(res.userid)
                    setRendered(true)
                }
            }).catch(err => setError(true))
        }
        getUser()
    }, [])


    return (
        <React.Fragment>
            {!!rendered && <UserMenu userID={id} admin={admin} plan={plan}/>}
        </React.Fragment>
    )
}

export default Dashboard;