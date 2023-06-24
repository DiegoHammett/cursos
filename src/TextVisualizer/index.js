import React, { useEffect, useState } from 'react'
import { StaticMathField } from 'react-mathquill'

function TextVisualizer({ text }) {

    const [sections, setSections] = useState()
    const [rendered, setRendered] = useState()

    useEffect(() => {
        const parts = text.split("@")
        const cleanParts = parts.filter(p => p !== "");
        setSections(cleanParts)
        setRendered(true)
    }, [text])

    return (
        <React.Fragment>
            {!!rendered &&
                sections.map(section => (
                    <div key={sections.indexOf(section)}>
                        {section[0] === "#" && section[section.length - 1] === "#" ?
                        <StaticMathField>{section.replaceAll("#",'')}</StaticMathField> :
                        <label>{section}</label>}
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export default TextVisualizer