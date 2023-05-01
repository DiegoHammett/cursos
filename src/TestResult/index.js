import React from 'react'
import './testresult_styles.css'

function TestResult({ result, total }) {
    return (
        <React.Fragment>
            <div className='testresult-body'>

                <div className='testresult-container inset'>
                    <span className='title'><b>PROGRESO</b></span>
                    <div className='testresult-score'>
                        <span className='lbl'>Has obtenido</span> 
                        <span className='title'>
                            <b>{result} de {total}</b>
                        </span>
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}

export default TestResult;