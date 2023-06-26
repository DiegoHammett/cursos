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
    const [mathSelector, setMathSelector] = useState()
    const [retro, setRetro] = useState()
    const [latex, setLatex] = useState('')
    const [answers, setAnswers] = useState([])
    const [answersImg, setAnswersImg] = useState([])
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
        for (const k = 1; k < 5; k++) {
            if (answers[k] || answersImg[k]) {
                const formData = new FormData()
                if (answersImg[k]) {
                    formData.append("imagen", answersImg[k].name)
                    formData.append("fileImg" + k, answersImg[k])
                }
                if(answers[k]) formData.append("respuesta", answers[k])
                fetch(db.url + '?mode=update&table=respuesta&id=id&condition=' + answersList[k - 1].id, {
                    method: 'POST',
                    body: formData
                }).then(res => res.json())
                    .then(res => {
                        if (res.status !== "OK") setError(true)
                    }).catch(err => setError(true))
            }
        }
    }

    const handleInsertAnswers = (id) => {
        for (let k = 1; k < 5; k++) {
            if (answers[k] || answersImg[k]) {
                const formData = new FormData()
                if (answersImg[k]) {
                    formData.append("imagen", answersImg[k].name)
                    formData.append("fileImg" + k, answersImg[k])
                }
                if (parseInt(k) === parseInt(cQuest))
                    formData.append("tipo", 1)
                else
                    formData.append("tipo", 0)
                if (answers[k]) {
                    formData.append("respuesta", answers[k]) 
                }
                formData.append("pregunta", id)
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
    }

    const handleAnswers = (id, value) => {
        setAnswers({ ...answers, [id]: value })
    }

    const handleAnswersImg = (id, value) => {
        setAnswersImg({ ...answersImg, [id]: value })
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
                        <div className='eq-lbl-container '>
                            {defQuest !== undefined &&
                                <div className='eq-lbl-editar-pregunta it-inset-shadow' onClick={() => { setEditQuestionText(true) }}>
                                    <TextVisualizer text={defQuest} />
                                </div>
                            }
                            <button className='eq-btn-editar' onClick={() => { setEditQuestionText(true) }}><i className='bx bx-edit icon' ></i>Editar pregunta</button>
                        </div>
                    }
                    {!!editQuestionText &&
                        <div className='eq-editquestiontext-container'>
                            <textarea autoFocus className='eq-input-text it-inset-shadow' type='text' onChange={(e) => { setQuest(e.target.value) }} defaultValue={defQuest} id='textAreaQuestion'></textarea>
                            <TextVisualizer text={quest}></TextVisualizer>

                            <div className='eq-editquestiontext-btns'>
                                {!mathEditor &&
                                    <div className='eq-editquestiontext-btns-1'>
                                        <div className='eq-content-item1'>
                                            <label className='lbl'>Insertar imagen:</label>
                                            <input className='file-input__input it-inset-shadow' type="file" name="questionImage" onChange={(e) => { setQuestionImage(e.target.files[0]) }} />
                                        </div>
                                        <div className='eq-editquestiontext-btns-item1'>
                                            <button className='btn' onClick={() => { setMathEditor(true); setMathSelector(0) }}>Insertar expresión</button>
                                            <button className='btn' onClick={() => { setDefQuest(document.getElementById('textAreaQuestion').value); setEditQuestionText(false); setQuest(document.getElementById('textAreaQuestion').value) }}>Aceptar</button>
                                        </div>
                                    </div>

                                }

                                {!!mathEditor && mathSelector === 0 &&
                                    <div className='eq-ecuaciones-contenedor inset'>
                                        <MathQ latex={latex} setLatex={setLatex} />
                                        <div className='eq-editquestiontext-btns-2'>
                                            <button className='btn' onClick={() => { handleInsertMathQuestion('textAreaQuestion') }}>Insertar</button>
                                            <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                    }

                </div>
                <div className='cq-answers'>
                    <label className='lbl'>Respuestas:</label>
                    <div className='cq-answers_inputs'>

                        <div className='ans1-container'>
                            <input type='radio' name='answers' id="rans1" onChange={(e) => { setCQuest(1) }} />
                            {!editAns1 &&
                                <div className='ans-container-answer '>
                                    {defAns1 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns1(true) }}>
                                            <TextVisualizer text={defAns1} />
                                        </div>
                                    }
                                    <button className='eq-btn-editar' onClick={() => { setEditAns1(true) }}><i className='bx bx-edit icon' ></i>Editar respuesta</button>
                                </div>
                            }
                            {!!editAns1 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text it-inset-shadow' autoFocus type='text' id="anstext1" onChange={(e) => { handleAnswers(1, e.target.value) }} defaultValue={defAns1}></textarea>
                                    {!mathEditor &&
                                        <div className='eq-editquestiontext-btns-1'>
                                            <div className='eq-content-item1'>
                                                <label className='lbl'>Insertar imagen:</label>
                                                <input className='file-input__input it-inset-shadow' type="file" name="questionImage" onChange={(e) => { handleAnswersImg(1, e.target.files[0]) }} />
                                            </div>
                                            <div className='eq-editquestiontext-btns-item1'>
                                                <button className='btn' onClick={() => { setMathEditor(true); setMathSelector(1)}}>Insertar expresión</button>
                                                <button className='btn' onClick={() => { setDefAns1(document.getElementById('anstext1').value); handleAnswers(1, document.getElementById('anstext1').value); setEditAns1(false) }}>Aceptar</button>
                                            </div>
                                        </div>
                                    }
                                    {!!mathEditor && mathSelector === 1 &&
                                        <div className='eq-ecuaciones-contenedor inset'>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <div className='eq-editquestiontext-btns-2'>
                                                <button className='btn' onClick={() => { handleInsertMathAns(1, 'anstext1') }}>Insertar</button>
                                                <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                            </div>

                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className='ans1-container'>
                            <input type='radio' name='answers' id="rans2" onChange={(e) => { setCQuest(2) }} />
                            {!editAns2 &&
                                <div className='ans-container-answer '>
                                    {defAns2 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns2(true) }}>
                                            <TextVisualizer text={defAns2} />
                                        </div>
                                    }
                                    <button className='eq-btn-editar' onClick={() => { setEditAns2(true) }}><i className='bx bx-edit icon' ></i>Editar respuesta</button>
                                </div>
                            }
                            {!!editAns2 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text it-inset-shadow' autoFocus type='text' id="anstext2" onChange={(e) => { handleAnswers(2, e.target.value) }} defaultValue={defAns2}></textarea>
                                    {!mathEditor &&
                                        <div className='eq-editquestiontext-btns-1'>
                                            <div className='eq-content-item1'>
                                                <label className='lbl'>Insertar imagen:</label>
                                                <input className='file-input__input it-inset-shadow' type="file" name="questionImage" onChange={(e) => { handleAnswersImg(2, e.target.files[0]) }} />
                                            </div>
                                            <div className='eq-editquestiontext-btns-item1'>
                                                <button className='btn' onClick={() => { setMathEditor(true); setMathSelector(2) }}>Insertar expresión</button>
                                                <button className='btn' onClick={() => { setDefAns2(document.getElementById('anstext2').value); handleAnswers(2, document.getElementById('anstext2').value); setEditAns2(false)  }}>Aceptar</button>
                                            </div>
                                        </div>
                                    }
                                    {!!mathEditor &&  mathSelector === 2 &&
                                        <div className='eq-ecuaciones-contenedor inset'>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <div className='eq-editquestiontext-btns-2'>
                                                <button className='btn' onClick={() => { handleInsertMathAns(2, 'anstext2') }}>Insertar</button>
                                                <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                            </div>

                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className='ans1-container'>
                            <input type='radio' name='answers' id="rans3" onChange={(e) => { setCQuest(3) }} />
                            {!editAns3 &&
                                <div className='ans-container-answer '>
                                    {defAns3 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns3(true) }}>
                                            <TextVisualizer text={defAns3} />
                                        </div>
                                    }
                                    <button className='eq-btn-editar' onClick={() => { setEditAns3(true) }}><i className='bx bx-edit icon' ></i>Editar respuesta</button>
                                </div>
                            }
                            {!!editAns3 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text it-inset-shadow' autoFocus type='text' id="anstext3" onChange={(e) => { handleAnswers(3, e.target.value) }} defaultValue={defAns3}></textarea>
                                    {!mathEditor &&
                                        <div className='eq-editquestiontext-btns-1'>
                                            <div className='eq-content-item1'>
                                                <label className='lbl'>Insertar imagen:</label>
                                                <input className='file-input__input it-inset-shadow' type="file" name="questionImage" onChange={(e) => { handleAnswersImg(3, e.target.files[0]) }} />
                                            </div>
                                            <div className='eq-editquestiontext-btns-item1'>
                                                <button className='btn' onClick={() => { setMathEditor(true); setMathSelector(3)}}>Insertar expresión</button>
                                                <button className='btn' onClick={() => { setDefAns3(document.getElementById('anstext3').value); handleAnswers(3, document.getElementById('anstext3').value); setEditAns3(false)  }}>Aceptar</button>
                                            </div>
                                        </div>
                                    }
                                    {!!mathEditor &&  mathSelector === 3 &&
                                        <div className='eq-ecuaciones-contenedor inset'>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <div className='eq-editquestiontext-btns-2'>
                                                <button className='btn' onClick={() => { handleInsertMathAns(3, 'anstext3') }}>Insertar</button>
                                                <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                            </div>

                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className='ans1-container'>
                            <input type='radio' name='answers' id="rans4" onChange={(e) => { setCQuest(4) }} />
                            {!editAns4 &&
                                <div className='ans-container-answer '>
                                    {defAns4 !== undefined &&
                                        <div className='et-lbl-editar it-inset-shadow' onClick={() => { setEditAns4(true) }}>
                                            <TextVisualizer text={defAns4} />
                                        </div>
                                    }
                                    <button className='eq-btn-editar' onClick={() => { setEditAns4(true) }}><i className='bx bx-edit icon' ></i>Editar respuesta</button>
                                </div>
                            }
                            {!!editAns4 &&
                                <div className='cq-answers_inputs-item'>
                                    <textarea className='input-text it-inset-shadow' autoFocus type='text' id="anstext4" onChange={(e) => { handleAnswers(4, e.target.value) }} defaultValue={defAns4}></textarea>
                                    {!mathEditor &&
                                        <div className='eq-editquestiontext-btns-1'>
                                            <div className='eq-content-item1'>
                                                <label className='lbl'>Insertar imagen:</label>
                                                <input className='file-input__input it-inset-shadow' type="file" name="questionImage" onChange={(e) => { handleAnswersImg(4, e.target.files[0]) }} />
                                            </div>
                                            <div className='eq-editquestiontext-btns-item1'>
                                                <button className='btn' onClick={() => { setMathEditor(true); setMathSelector(4) }}>Insertar expresión</button>
                                                <button className='btn' onClick={() => { setDefAns4(document.getElementById('anstext4').value); handleAnswers(4, document.getElementById('anstext4').value); setEditAns4(false)  }}>Aceptar</button>
                                            </div>
                                        </div>
                                    }
                                    {!!mathEditor &&  mathSelector === 4 &&
                                        <div className='eq-ecuaciones-contenedor inset'>
                                            <MathQ latex={latex} setLatex={setLatex} />
                                            <div className='eq-editquestiontext-btns-2'>
                                                <button className='btn' onClick={() => { handleInsertMathAns(4, 'anstext4') }}>Insertar</button>
                                                <button className='btn' onClick={() => { setMathEditor(false) }}>Cancelar</button>
                                            </div>

                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='cq-question'>
                    <label className='lbl'>Justificación:</label>
                    <input className='eq-input-text it-inset-shadow' type='text' onChange={(e) => { setRetro(e.target.value) }} defaultValue={defRetro}></input>
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