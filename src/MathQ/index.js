import React, { useState } from 'react'
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill'
import TextSymbols from './TextSymbols'
import './style.css';
import MathExp from '../MathExp';

addStyles()

function MathQ() {
    const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')

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
            <StaticMathField>{latex}</StaticMathField>
            
            <TextSymbols onClick={handleInsertSymbol}></TextSymbols>
            <MathExp text={latex}/>
        </div>

    )

}

export default MathQ;