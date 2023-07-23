import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import Test from '../Test'
import EditTest from '../EditTest'

function SimMenu({ admin }) {

    const [menuSelect, setMenuSelect] = useState(0)
    const [simuladores, setSimuladores] = useState([])
    const [itemID, setItemID] = useState()
    const [time, setTime] = useState()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getSimuladores = () => {
            fetch(db.url + "?table=test&where=tipo IN (2)" + (!admin ? " AND activo" : ""))
                .then(res => res.json())
                .then(res => setSimuladores(res))
                .catch(err => console.log(err))
        }
        getSimuladores()
    }, [menuSelect, refresh, admin])

    const castTime = (t) => {
        const formatTime = t.split(":")
        setTime((parseInt(formatTime[0]) * 3600) + (parseInt(formatTime[1]) * 60) + parseInt(formatTime[2]))
    }

    const handleAddSim = () => {
        const formData = new FormData()
        formData.append("nombre", "Nuevo simulador")
        formData.append("tiempo", "01:00:00")
        formData.append("aprobacion", '8.0')
        formData.append("tipo", 2)
        fetch(db.url + "?mode=insert&table=test", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setMenuSelect(2)
                    setItemID(res.id)
                }
                else console.log(res)
            }).catch(err => console.log(err))
    }

    const handleDeleteSim = (id) => {
        fetch(db.url + "?table=test&id=" + id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") setRefresh(!refresh)
                else console.log(res)
            }).catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            {menuSelect === 0 &&
                <div>
                    <div className='coursemenu-header'>
                        <h1 className='title'>Todos los simuladores</h1>
                        <button className='btn' onClick={handleAddSim}><i className='bx bx-plus-circle icon'></i>Agregar simulador</button>
                    </div>
                    <section className='cursos-container'>
                        <div className='courseCards inset'>
                            {simuladores.map(simulador => (
                                <div className={"courseCard" + (!simulador.activo ? " inactive" : "")} key={simulador.id}>
                                    <p className='courseHeading'>
                                        {simulador.nombre}
                                    </p>
                                    {!!admin && !simulador.activo &&
                                        <p className='courseDescription'>
                                            (Inactivo)
                                        </p>
                                    }
                                    <p className='courseDescription'>
                                        Tiempo límite: {simulador.tiempo}
                                    </p>
                                    <div className='courseBtns'>
                                        <button className='acceptButton' onClick={() => {
                                            castTime(simulador.tiempo)
                                            setItemID(simulador.id)
                                            setMenuSelect(1)
                                        }}>Ir al simulador</button>
                                        {!!admin && <button className='acceptButton2' onClick={() => {
                                            setItemID(simulador.id)
                                            setMenuSelect(2)
                                        }}>Editar</button>}
                                        {!!admin && <button className='acceptButton2' onClick={() => { handleDeleteSim(simulador.id) }}>Eliminar</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            }

            {menuSelect === 1 &&
                <div>
                    <button className='btn-xs' onClick={() => {setMenuSelect(0)}}>Regresar</button>
                    <Test id={itemID} retro={false} time={time} />
                </div>
            }

            {menuSelect === 2 &&
                <div>
                    <button className='btn-xs' onClick={() => {setMenuSelect(0)}}>Regresar</button>
                    <EditTest testID={itemID} />
                </div>
            }
        </React.Fragment >
    )
}

export default SimMenu;