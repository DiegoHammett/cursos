import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import Test from '../Test'
import EditTest from '../EditTest'

function SimMenu({admin}) {

    const [menuSelect, setMenuSelect] = useState(0)
    const [simuladores, setSimuladores] = useState([])
    const [itemID, setItemID] = useState()
    const [time, setTime] = useState()

    useEffect(() => {
        const getSimuladores = () => {
            fetch(db.url + "?table=test&where=tipo IN (2)")
                .then(res => res.json())
                .then(res => setSimuladores(res))
                .catch(err => console.log(err))
        }
        getSimuladores()
    }, [menuSelect])

    const castTime = (t) => {
        const formatTime = t.split(":")
        setTime((parseInt(formatTime[0]) * 3600) + (parseInt(formatTime[1]) * 60) + parseInt(formatTime[0]))
    }

    return (
        <React.Fragment>
            {menuSelect === 0 &&
                <div>
                    <div className='coursemenu-header'>
                        <h1 className='title'>Todos los simuladores</h1>
                        <button className='btn'><i class='bx bx-plus-circle icon'></i>Agregar simulador</button>
                    </div>
                    <section className='cursos-container'>
                        <div className='courseCards inset'>
                            {simuladores.map(simulador => (
                                <div className='courseCard' key={simulador.id}>
                                    <p className='courseHeading'>
                                        {simulador.nombre}
                                    </p>
                                    <div className='courseBtns'>
                                        <button className='acceptButton' onClick={() => {
                                            setItemID(simulador.id)
                                            castTime(simulador.tiempo)
                                            setMenuSelect(1)
                                        }}>Ir al simulador</button>
                                        {!!admin && <button className='acceptButton2' onClick={() => {
                                            setItemID(simulador.id)
                                            setMenuSelect(2)
                                        }}>Editar</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            }

            {menuSelect === 1 &&
                <Test id={itemID} retro={false} time={time} />
            }

            {menuSelect === 2 &&
                <EditTest testID={itemID} />
            }
        </React.Fragment >
    )
}

export default SimMenu;