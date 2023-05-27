import React from 'react'
import { MathJaxContext, MathJax } from 'better-react-mathjax';

function MathExp({text}) {
    return (
        <MathJaxContext>
                <MathJax>{text}</MathJax>
        </MathJaxContext>
    )
}

export default MathExp;