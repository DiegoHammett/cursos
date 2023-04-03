import React from 'react'

function TestResult({result, total}){
    return(
        <React.Fragment>
            <h3>Has obtenido</h3>
            <h1>{result}/{total}</h1>
        </React.Fragment>
    )
}

export default TestResult;