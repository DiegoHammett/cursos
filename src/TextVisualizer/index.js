import React, { useEffect, useState } from 'react'
import { StaticMathField } from 'react-mathquill'
import './styles.css'

function TextVisualizer({ text }) {

    const [sections, setSections] = useState()
    const [rendered, setRendered] = useState()

    useEffect(() => {
        if (text !== undefined) {
            const parts = text.split("@")
            const cleanParts = parts.filter(p => p !== "");
            setSections(cleanParts)
            setRendered(true)
        }
    }, [text])

    return (
        <React.Fragment>
            {!!rendered &&
                sections.map(section => (
                    <label key={sections.indexOf(section)} className='text-visualizer'>
                        {section[0] === "#" && section[section.length - 1] === "#" ?
                            <StaticMathField>{section.replaceAll("#", '')}</StaticMathField> :
                            section}
                    </label>
                ))
            }
        </React.Fragment>
    )
}

export default TextVisualizer