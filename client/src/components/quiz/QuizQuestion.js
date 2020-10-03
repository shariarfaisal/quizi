import React,{ useState, useContext } from 'react'
import { AdminQuizContext} from '../contexts/AdminQuizContext'
import QuizQuestionUpdate from './QuizQuestionUpdate'
import { useParams } from 'react-router-dom'

const QuizQuestion = ({ id, name, optionA, optionB, optionC, optionD, ans, answer }) => {
  const [edit,setEdit] = useState(false)
  const { deleteQuestion } = useContext(AdminQuizContext)
  const [loading,setLoading] = useState(false)
  const { id: quizId } = useParams()

  const deleteQuestionHandler = e => {
    deleteQuestion({
      quizId,
      questionId: id,
      setLoading
    })
  }

  return(
    !edit ?<div className="slow-mo list-group-item list-group-item-action list-group-item-light my-2 px-5 py-4 rounded-0 border-0 shadow  text-muted">
      <div className="d-flex justify-content-between">
        <h5 className="d-flex align-items-center">
          <i className='bx bxl-quora text-info bx-md'></i>
          {name}
        </h5>
        <div className="">
          <span onClick={e => setEdit(true)} className="mx-3"><i className="bx bx-edit pointer text-info"></i></span>
          <span onClick={deleteQuestionHandler} className="mx-3">
            <i className="bx bx-trash pointer text-danger"></i>
            {loading && <i className="bx bx-loader bx-spin text-muted"></i>}
          </span>
        </div>
      </div>
      <div className="row">
        <p style={{fontSize: '10px'}} className="col-6">A. {optionA}</p>
        <p style={{fontSize: '10px'}} className="col-6">B. {optionB}</p>
        <p style={{fontSize: '10px'}} className="col-6">C. {optionC}</p>
        <p style={{fontSize: '10px'}} className="col-6">D. {optionD}</p>
      </div>
      <p style={{fontSize: '11px'}}><strong>Answer:</strong> {ans}</p>
    </div>:
    <QuizQuestionUpdate
      setEdit={setEdit}
      {...{ id, name, optionA, optionB, optionC, optionD, answer }}
    />
  )
}
export default QuizQuestion
