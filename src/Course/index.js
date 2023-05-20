import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect';
import Class from '../Class';
import Test from '../Test';

function Course({ id }) {

    const [modules, setModules] = useState([])
    const [currentModule, setCurrentModule] = useState(0)
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        const getModules = () => {
            fetch(db.url + "?table=modulos&where=curso in (" + id + ")")
                .then(res => res.json())
                .then(res => {
                    setModules(res)
                    setRendered(true)
                })
                .catch(err => console.log(err))
        }
        getModules()
    }, [id])

    return (
        <React.Fragment>
            {currentModule !== 0 && <button onClick={() => { setCurrentModule(currentModule - 1) }}>Anterior</button>}
            {currentModule !== modules.length-1 && <button onClick={() => { setCurrentModule(currentModule + 1) }}>Siguiente</button>}
            {!!rendered &&
                <div>
                    {parseInt(modules[currentModule].tipo) === 1 && <Class id={modules[currentModule].id_clase} />}
                    {parseInt(modules[currentModule].tipo) === 2 && <Test id={modules[currentModule].id_test} retro={true} />}
                </div>
            }

        </React.Fragment>
    )
}

export default Course;