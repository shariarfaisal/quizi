import React,{ useState, useContext } from 'react'
import { AdminQuizContext} from '../contexts/AdminQuizContext'
import { useParams } from 'react-router-dom'
import QuestionForm from './QuestionForm'

const QuizQuestionUpdate = ({ ...q }) => {
  const { id } = useParams()
  const { updateQuestion } = useContext(AdminQuizContext)
  const [name,setName] = useState(q.name)
  const [optionA,setOptionA] = useState(q.optionA)
  const [optionB,setOptionB] = useState(q.optionB)
  const [optionC,setOptionC] = useState(q.optionC)
  const [optionD,setOptionD] = useState(q.optionD)
  const [answer,setAnswer] = useState(q.answer)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  const submitHandler = async e => {
    e.preventDefault()
    updateQuestion({
      quizId: id,
      questionId: q.id,
      payloads: {name, optionA, optionB, optionC, optionD, answer},
      setError,
      setLoading,
      setEdit: q.setEdit
    })
  }

  return (
    <div className="list-group-item list-group-item-action list-group-item-light my-2 px-5 py-3 rounded-0 border-0 shadow  text-muted">
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
        setEdit={q.setEdit}
        error={error}
      />
    </div>
  )
}

export default QuizQuestionUpdate
