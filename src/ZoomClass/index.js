import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import EditZoom from '../EditZoom'

function ZoomClass({ admin }) {

    const [zoom, setZoom] = useState([])
    const [menuSelect, setMenuSelect] = useState(0)
    const [zID, setZID] = useState()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getZoom = () => {
            fetch(db.url + "?table=zoom" + (!admin ? "&where=activo" : ""))
                .then(res => res.json())
                .then(res => setZoom(res))
                .catch(err => console.log(err))
        }
        getZoom()
    }, [menuSelect, refresh, admin])

    const handleInsertZoom = () => {
        const formData = new FormData()
        formData.append("nombre", "Nueva sesión")
        fetch(db.url + "?mode=insert&table=zoom", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    console.log(res)
                    setZID(res.id)
                    setMenuSelect(1)
                }
                else console.log(res)
            }).catch(err => console.log(err))
    }

    const handleDeleteZoom = (id) => {
        fetch(db.url + "?table=zoom&id=" + id, {
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
                        <h1 className='title'>Sesiones en vivo ZOOM <i className='bx bxl-zoom'></i></h1>
                        <button className='btn' onClick={handleInsertZoom}><i className='bx bx-plus-circle icon'></i>Agregar sesión de ZOOM</button>
                    </div>
                    <section className='cursos-container'>
                        <div className='courseCards inset'>
                            {zoom.map(z => (
                                <div className={"courseCard" + (!z.activo ? " inactive" : "")} key={z.id}>
                                    <p className='courseHeading'>
                                        {z.nombre}
                                    </p>
                                    {!!admin && !z.activo &&
                                        <p className='courseDescription'>
                                            (Inactivo)
                                        </p>
                                    }
                                    <p className='courseDescription'>
                                        {z.descripcion}
                                    </p>
                                    <div className='courseBtns'>
                                        <a className='acceptButton' href={z.link} target="_blank" rel="noreferrer">Ir a la clase</a>
                                        {!!admin && <button className='acceptButton2' onClick={() => { setMenuSelect(1); setZID(z.id) }}>Editar</button>}
                                        {!!admin && <button className='acceptButton2' onClick={() => { handleDeleteZoom(z.id) }}>Eliminar</button>}
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
                    <EditZoom zoomID={zID} />
                </div>
            }
        </React.Fragment>
    )
}

export default ZoomClass;