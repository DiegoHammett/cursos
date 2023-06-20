import React, { useEffect, useState } from 'react';
import { db } from '../dbconnect';
import './statsmenu_styles.css';
import UserImg from './user.png';

function StatsMenu({ admin, email }) {

    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = () => {
            fetch(db.url + "?table=usuario a,plan b&column=a.nombre, b.nombre as nombre_plan, b.id&where=a.email in ('" + email + "') and a.plan=b.id")
                .then(res => res.json())
                .then(res => setUser(res[0]))
                .catch(err => console.log(err))
        }
        getUser()
    }, [email])

    return (
        <React.Fragment>
            <div className='stats-body'>
                <div className='stats-profile-card inset'>
                    <div className='stats-info-item'>
                        <div className='profile-card-user'>
                            <img className='profile-card-img' src={UserImg} alt='me' />
                            <div className='profile-card-info'>

                                <span className='profile-card-username'>
                                    ¡Bienvenido, <b>{user.nombre}</b>!
                                </span>

                                <div className='profile-card-user-info-container'>
                                    <span className='user-plan lbl'>
                                        {admin &&
                                            <React.Fragment>
                                                Tu rol es
                                                <label><b className='b-medium'>{user.nombre_plan}</b></label>
                                            </React.Fragment>

                                        }
                                        {!admin &&
                                            <React.Fragment>
                                                Tu plan actual es
                                                <label><b className='b-medium'>{user.nombre_plan}</b></label>
                                            </React.Fragment>
                                        }
                                    </span>

                                    <label className='lbl'>·</label>

                                    <span className='user-plan lbl'>
                                        {admin &&
                                            <React.Fragment>

                                                <label><b className='b-medium'>#</b></label>
                                                cursos existentes
                                            </React.Fragment>
                                        }
                                        {!admin &&
                                            <React.Fragment>
                                                <label><b className='b-medium'>#</b></label>
                                                cursos realizados
                                            </React.Fragment>
                                        }
                                    </span>

                                    <label className='lbl'>·</label>

                                    <span className='user-plan lbl'>
                                        {admin &&
                                            <React.Fragment>

                                                <label><b className='b-medium'>#</b></label>
                                                simuladores existentes
                                            </React.Fragment>
                                        }
                                        {!admin &&
                                            <React.Fragment>
                                                <label><b className='b-medium'>#</b></label>
                                                simuladores realizados
                                            </React.Fragment>
                                        }
                                    </span>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='stats-info'>

                    <div className='stats-info-item1 inset'>
                        <span className='profile-card-username'>
                            Contenido 1
                        </span>
                    </div>

                    <div className='stats-info-item1 inset'>
                        <span className='profile-card-username'>
                            Contenido 2
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatsMenu;