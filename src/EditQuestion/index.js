import React, { useEffect, useState } from 'react'
import { db } from '../dbconnect'
import './createquestion_styles.css'
import MathQ from '../MathQ'
import TextVisualizer from '../TextVisualizer'

function EditQuestion({ testID, setEditQuestion, mode, questionID }) {

    const [quest, setQuest] = useState()
    const [defQuest, setDefQuest] = useState()
    const [defRetro, setDefRetro] = useState()
    const [defAns1, setDefAns1] = useState()
    const [defAns2, setDefAns2] = useState()
    const [defAns3, setDefAns3] = useState()
    const [defAns4, setDefAns4] = useState()
    const [editAns1, setEditAns1] = useState(false)
    const [editAns2, setEditAns2] = useState(false)
    const [editAns3, setEditAns3] = useState(false)
    const [editAns4, setEditAns4] = useState(false)
    const [cQuest, setCQuest] = useState()
    const [mathEditor, setMathEditor] = useState(false)
    const [retro, setRetro] = useState()
    const [latex, setLatex] = useState('')
    const [answers, setAnswers] = useState([])
    const [answersList, setAnswersList] = useState([])
    const [editQuestionText, setEditQuestionText] = useState(false)
    const [questionImage, setQuestionImage] = useState()

    const [error, setError] = useState(false)

    useEffect(() => {
        const getQuestions = () => {
            fetch(db.url + '?table=pregunta&where=id IN (' + questionID + ')')
                .then(res => res.json())
                .then(res => {
                    setDefQuest(res[0].pregunta)
                    setDefRetro(res[0].retro)
                })
                .catch(err => setError(true))
        }
        const getAnswers = () => {
            fetch(db.url + '?table=respuesta&where=pregunta IN (' + questionID + ')')
                .then(res => res.json())
                .then(res => {
                    setAnswersList(res)
                    setDefAns1(res[0].respuesta)
                    if (parseInt(res[0].tipo) === 1) document.getElementById("rans1").defaultChecked = true
                    setDefAns2(res[1].respuesta)
                    if (parseInt(res[1].tipo) === 1) document.getElementById("rans2").defaultChecked = true
                    setDefAns3(res[2].respuesta)
                    if (parseInt(res[2].tipo) === 1) document.getElementById("rans3").defaultChecked = true
                    setDefAns4(res[3].respuesta)
                    if (parseInt(res[3].tipo) === 1) document.getElementById("rans4").defaultChecked = true
                })
                .catch(err => setError(true))
        }
        if (mode === "edit") {
            getQuestions()
            getAnswers()
        }
    }, [mode, questionID])

    const handleSave = () => {
        if (mode === "create") handleInsert()
        else handleUpdate()
    }

    const handleInsert = () => {
        const formData = new FormData()
        formData.append("pregunta", quest)
        formData.append("retro", retro)
        formData.append("test", testID)
        if (questionImage) {
            formData.append("imagen", questionImage.name)
            formData.append("questionIMG", questionImage)
        }
        fetch(db.url + '?mode=insert&table=pregunta', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK")
                    handleInsertAnswers(res.id.replaceAll('"', ""))
                else setError(true)
            }).catch(err => setError(true))
    }

    const handleUpdate = () => {
        if (quest || retro || questionImage) UpdateQuestion()
        UpdateAnswers()
        if (cQuest) UpdateZerosIncorrect()
        setEditQuestion(false)
    }

    const UpdateZerosIncorrect = () => {
        const formData = new FormData()
        formData.append("tipo", 0)
        fetch(db.url + '?mode=update&table=respuesta&id=pregunta&condition=' + questionID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") UpdateOneCorrect()
            }
            ).catch(err => setError(true))
    }

    const UpdateOneCorrect = () => {
        const formData = new FormData()
        formData.append("tipo", 1)
        fetch(db.url + '?mode=update&table=respuesta&id=id&condition=' + answersList[cQuest - 1].id, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status !== "OK") setError(true)
            }
            ).catch(err => setError(true))
    }

    const UpdateQuestion = () => {
        const formData = new FormData()
        if (quest) formData.append("pregunta", quest)
        if (retro) formData.append("retro", retro)
        if (questionImage) {
            formData.append("imagen", questionImage.name)
            formData.append("questionIMG", questionImage)
        }
        fetch(db.url + '?mode=update&table=pregunta&id=id&condition=' + questionID, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.status !== "OK") setError(true)
            }).catch(err => setError(true))
    }

    const UpdateAnswers = () => {
        const map = new Map(Object.entries(answers))
        for (let [key, value] of map) {
            const formData = new FormData()
            formData.append("respuesta", value)
            fetch(db.url + '?mode=update&table=respuesta&id=id&condition=' + answersList[key - 1].id, {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status !== "OK") setError(true)
                }).catch(err => setError(true))
        }
    }

    const handleInsertAnswers = (id) => {
        const map = new Map(Object.entries(answers))
        for (let [key, value] of map) {
            const formData = new FormData()
            if (parseInt(key) === parseInt(cQuest))
                formData.append("tipo", 1)
            else
                formData.append("tipo", 0)
            formData.append("pregunta", id)
            formData.append("respuesta", value)
            fetch(db.url + '?mode=insert&table=respuesta', {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => {
                    if (res.status !== "OK") setError(true)
                }).catch(err => setError(true))
        }
        setEditQuestion(false)
    }

    const handleAnswers = (id, value) => {
        setAnswers({ ...answers, [id]: value })
    }

    const handleInsertMathAns = (id, element) => {
        const limitadorIn = "@#"
        const limitadorFin = "#@"
        setAnswers({ ...answers, [id]: document.getElementById(element).value + limitadorIn + latex + limitadorFin })
        document.getElementById(element).value = document.getElementById(element).value + limitadorIn + latex + limitadorFin
        setLatex('')
        setMathEditor(false)
    }

    const handleInsertMathQuestion = (id) => {
        const limitadorIn = "@#"
        const limitadorFin = "#@"
        setQuest(document.getElementById(id).value + limitadorIn + latex + limitadorFin)
        document.getElementById(id).value = document.getElementById(id).value + limitadorIn + latex + limitadorFin
        setLatex('')
        setMathEditor(false)
    }

    return (
        <React.Fragment>
            <div className='cq-container inset'>
                <div className='cq-header'>
                    <div className='cq-title title'>
                        <b className='b-medium'>Editar pregunta</b>
                    </div>

                    <span className='cq-description description'>
                        Llene todos los campos con la información que se indica para crear/editar una pregunta.
                    </span>
                    <p className='pill'>
                        <i className='bx bx-info-circle'></i>Todos los campos deben ser llenados.
                    </p>

                </div>
                <div className='cq-question'>
                    <label className='lbl'>Pregunta:</label>

                    {!editQuestionText &&
                        <div className='ec-lbl-name inset'>
                            {defQuest !== undefined &&
                                <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditQuestionText(true) }}>
                                    <TextVisualizer text={defQuest} />
                                </div>
                            }
                            <button className='ec-btn-editar' onClick={() => { setEditQuestionText(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                        </div>
                    }
                    {!!editQuestionText &&
                        <div>
                            <textarea className='input-text' type='text' onChange={(e) => { setQuest(e.target.value) }} defaultValue={defQuest} id='textAreaQuestion'></textarea>
                            <TextVisualizer text={quest}></TextVisualizer>
                            {!mathEditor && 
                                <div>
                                    <button className='btn' onClick={() => { setMathEditor(true) }}>Insertar ecuación</button>
                                    <div className='eclass-content'>
                                        <label className='lbl'>Insertar imagen</label>
                                        <input type="file" name="questionImage" onChange={(e) => { setQuestionImage(e.target.files[0]) }} />
                                    </div>
                                    <button className='btn' onClick={() => { setEditQuestionText(false) }}>Cancelar</button>
                                </div>
                            }

                            {!!mathEditor &&
                                <div>
                                    <MathQ latex={latex} setLatex={setLatex} />
                                    <button className='btn' onClick={() => { handleInsertMathQuestion('textAreaQuestion') }}>Insertar</button>
                                    <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                </div>
                            }
                        </div>
                    }

                </div>
                <div className='cq-answers'>
                    <label className='lbl'>Respuestas:</label>
                    <div className='cq-answers_inputs'>
                        <div className='ans1-container'>
                            <input type='radio' name='answers' id="rans1" onChange={(e) => { setCQuest(1) }} />
                            {!editAns1 &&
                                <div className='ec-lbl-name inset'>
                                    {defAns1 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns1(true) }}>
                                            <TextVisualizer text={defAns1} />
                                        </div>
                                    }
                                    <button className='ec-btn-editar' onClick={() => { setEditAns1(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                </div>
                            }
                            {!!editAns1 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text' type='text' id="anstext1" onChange={(e) => { handleAnswers(1, e.target.value) }} defaultValue={defAns1}></textarea>
                                    {!mathEditor &&
                                        <div>
                                            <button className='btn' onClick={() => { setMathEditor(true) }}>Insertar ecuación</button>
                                            <button className='btn' onClick={() => { setEditAns1(false) }}>Cancelar</button>
                                        </div>
                                    }
                                    {!!mathEditor &&
                                        <div>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <button className='btn' onClick={() => { handleInsertMathAns(1, 'anstext1') }}>Insertar</button>
                                            <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        <div className='ans2-container'>
                            <input type='radio' name='answers' id="rans2" onChange={() => { setCQuest(2) }} />
                            {!editAns2 &&
                                <div className='ec-lbl-name inset'>
                                    {defAns2 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns2(true) }}>
                                            <TextVisualizer text={defAns2} />
                                        </div>
                                    }
                                    <button className='ec-btn-editar' onClick={() => { setEditAns2(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                </div>
                            }
                            {!!editAns2 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text' type='text' id="anstext2" onChange={(e) => { handleAnswers(2, e.target.value) }} defaultValue={defAns2}></textarea>
                                    <TextVisualizer text={answers[2]}></TextVisualizer>
                                    {!mathEditor &&
                                        <div>
                                            <button className='btn' onClick={() => { setMathEditor(true) }}>Insertar ecuación</button>
                                            <button className='btn' onClick={() => { setEditAns2(false) }}>Cancelar</button>
                                        </div>
                                    }
                                    {!!mathEditor &&
                                        <div>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <button className='btn' onClick={() => { handleInsertMathAns(2, 'anstext2') }}>Insertar</button>
                                            <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className='ans3-container'>
                            <input type='radio' name='answers' id="rans3" onChange={() => { setCQuest(3) }} />
                            {!editAns3 &&
                                <div className='ec-lbl-name inset'>
                                    {defAns3 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns3(true) }}>
                                            <TextVisualizer text={defAns3} />
                                        </div>
                                    }
                                    <button className='ec-btn-editar' onClick={() => { setEditAns3(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                </div>
                            }
                            {!!editAns3 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text' type='text' id="anstext3" onChange={(e) => { handleAnswers(3, e.target.value) }} defaultValue={defAns3}></textarea>
                                    <TextVisualizer text={answers[3]}></TextVisualizer>
                                    {!mathEditor &&
                                        <div>
                                            <button className='btn' onClick={() => { setMathEditor(true) }}>Insertar ecuación</button>
                                            <button className='btn' onClick={() => { setEditAns3(false) }}>Cancelar</button>
                                        </div>
                                    }
                                    {!!mathEditor &&
                                        <div>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <button className='btn' onClick={() => { handleInsertMathAns(3, 'anstext3') }}>Insertar</button>
                                            <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className='ans4-container'>
                            <input type='radio' name='answers' id="rans4" onChange={() => { setCQuest(4) }} />
                            {!editAns4 &&
                                <div className='ec-lbl-name inset'>
                                    {defAns4 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns4(true) }}>
                                            <TextVisualizer text={defAns4} />
                                        </div>
                                    }
                                    <button className='ec-btn-editar' onClick={() => { setEditAns4(true) }}><i className='bx bx-edit icon' ></i>Editar</button>
                                </div>
                            }
                            {!!editAns4 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text' type='text' id="anstext4" onChange={(e) => { handleAnswers(4, e.target.value) }} defaultValue={defAns4}></textarea>
                                    <TextVisualizer text={answers[4]}></TextVisualizer>
                                    {!mathEditor &&
                                        <div>
                                            <button className='btn' onClick={() => { setMathEditor(true) }}>Insertar ecuación</button>
                                            <button className='btn' onClick={() => { setEditAns4(false) }}>Cancelar</button>
                                        </div>
                                    }
                                    {!!mathEditor &&
                                        <div>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <button className='btn' onClick={() => { handleInsertMathAns(4, 'anstext4') }}>Insertar</button>
                                            <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        {/* <div className='cq-answers_inputs-item'>
                            <input type='radio' name='answers' id="rans2" onChange={(e) => { setCQuest(2) }} />
                            <input className='input-text' type='text' id="2" onChange={() => {handleAnswers(2)}} defaultValue={defAns2}></input>
                        </div>

                        <div className='cq-answers_inputs-item'>
                            <input type='radio' name='answers' id="rans3" onChange={(e) => { setCQuest(3) }} />
                            <input className='input-text' type='text' id="3" onChange={handleAnswers} defaultValue={defAns3}></input>
                        </div>

                        <div className='cq-answers_inputs-item'>
                            <input type='radio' name='answers' id="rans4" onChange={(e) => { setCQuest(4) }} />
                            <input className='input-text' type='text' id="4" onChange={handleAnswers} defaultValue={defAns4}></input>
                        </div> */}
                    </div>
                </div>
                <div className='cq-question'>
                    <label className='lbl'>Justificación:</label>
                    <input className='input-text' type='text' onChange={(e) => { setRetro(e.target.value) }} defaultValue={defRetro}></input>
                </div>

                <div className='cq-footer'>
                    {!!error &&
                        <p className='pill-error'><i className='bx bx-error icon' ></i>Ha ocurrido un error</p>
                    }<div className='btn-container'>
                        <button className='btn' onClick={handleSave} >Guardar</button>
                        <button className='btn' onClick={() => { setEditQuestion(false) }}>Cancelar</button>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default EditQuestion;