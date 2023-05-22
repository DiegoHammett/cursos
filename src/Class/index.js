import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'

function Class({ id }) {

    const [clase, setClase] = useState([])

    useEffect(() => {
        fetch(db.url + "?table=clase&where=id IN (" + id + ")")
            .then(res => res.json())
            .then(res => setClase(res[0]))
            .catch(err => console.log(err.error))
    }, [id])

    return (
        <React.Fragment>
            <div className='test-body'>
                <div className='test-container '>
                    <div className='test-header'>
                        <div className='test-title title'>
                            <b className='b-medium'>{clase.nombre}</b>
                        </div>
                    </div>
                    <div className='class-body'>
                        <div className='test-questions-container'>
                            {clase.contenido && <iframe src={db.docs + clase.contenido} title='Curso' width="80%" height="700" > </iframe>}
                        </div>
                    </div>

                </div>
            </div>








            <p>{clase.descripcion}</p>
        </React.Fragment>
    )
}

export default Class;