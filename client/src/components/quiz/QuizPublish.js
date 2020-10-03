import React,{ useContext, useState } from 'react'
import { AdminQuizContext } from '../contexts/AdminQuizContext'
import { useParams } from 'react-router-dom'

const QuizPublish = ({ published }) => {
  const { publishQuiz } = useContext(AdminQuizContext)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const { id } = useParams()

  const publishHandler = (pub) => {
    publishQuiz({
      quizId: id,
      setLoading,
      setError,
      published: pub
    })
  }

  return(
    !published ? <div onClick={e => publishHandler(true)} className="ml-auto text-warning px-4 mx-3 text-center ">
      <div className="d-flex pointer justify-content-center">
        <i style={{fontSize: '15px'}} className="bx bx-cloud-upload"></i>
        <span>publish</span>
      </div>
      <small className="text-danger">{error.published && error.published}</small>
    </div>
    : <div onClick={e => publishHandler(false)} className="ml-auto  text-success px-4 mx-3">
      <div className="d-flex pointer  justify-content-center">
        <i style={{fontSize: '15px'}} className="bx bx-cloud-download"></i>
        <span>unpublish</span>
      </div>
      <small className="text-danger">{error.published && error.published}</small>
    </div>
  )
}
export default QuizPublish
