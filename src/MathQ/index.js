import React from 'react'
import { addStyles, EditableMathField } from 'react-mathquill'
import TextSymbols from './TextSymbols'
import './style.css';

addStyles()

function MathQ({ latex, setLatex }) {

    function handleInsertSymbol(symbol) {
        setLatex(oldFormula => oldFormula + symbol);
    }

    return (
        <div>
            <EditableMathField
                latex={latex}
                onChange={(mathField) => {
                    setLatex(mathField.latex())
                }}
            />
            <TextSymbols onClick={handleInsertSymbol}></TextSymbols>
        </div>
    )

}

export default MathQ;