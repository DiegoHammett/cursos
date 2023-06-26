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
        <div className='math-body'>
            <div className='math-header'>
                <div className='cq-title title'>
                    <b className='b-medium'>Editor de expresiones matemáticas</b>
                </div>
                <span className='description'>Construya la expresión matemática deseada. Posteriormente, presione '<b>Insertar expresión</b>' para agregarla al texto que está editando:</span>
            </div>
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