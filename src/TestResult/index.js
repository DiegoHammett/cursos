import React from 'react'
import './testresult_styles.css'

function TestResult({ result, total }) {
    return (
        <React.Fragment>
            <div className='testresult-body'>
                <div className='testresult-container'>
                    <h3>Has obtenido</h3>
                    <h1>{result}/{total}</h1>
                </div>
            </div>

        </React.Fragment>
    )
}

export default TestResult;