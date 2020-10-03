import React,{ useState, useContext } from 'react'
import { AdminQuizContext} from '../contexts/AdminQuizContext'
import QuestionForm from './QuestionForm'
import { useParams } from 'react-router-dom'

const QuestionCreate = ({ setEdit }) => {
  const { createQuestion } = useContext(AdminQuizContext)
  const [name,setName] = useState('')
  const [optionA,setOptionA] = useState('')
  const [optionB,setOptionB] = useState('')
  const [optionC,setOptionC] = useState('')
  const [optionD,setOptionD] = useState('')
  const [answer,setAnswer] = useState()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const { id } = useParams()

  const submitHandler = e => {
    e.preventDefault()
    createQuestion({
      quizId: id,
      payloads:{ name, optionA, optionB, optionC, optionD, answer },
      setLoading,
      setError,
      setEdit
    })
  }



  return(
    <div className="p-3 shadow bg-dark my-3" style={{minHeight: '150px'}}>
      <p className="text-center text-info">Add new question</p>
      <QuestionForm
        submitHandler={submitHandler}
        name={name}
        setName={setName}
        optionA={optionA}
        setOptionA={setOptionA}
        optionB={optionB}
        setOptionB={setOptionB}
        optionC={optionC}
        setOptionC={setOptionC}
        optionD={optionD}
        setOptionD={setOptionD}
        answer={answer}
        setAnswer={setAnswer}
        loading={loading}
        setEdit={setEdit}
        error={error}
      />
    </div>
  )
}
export default QuestionCreate
