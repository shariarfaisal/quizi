import React,{ useContext, useState, useEffect } from 'react'
import { AdminQuizContext } from '../contexts/AdminQuizContext'
import { useParams } from 'react-router-dom'
import QuizQuestion from './QuizQuestion'
import QuestionCreate from './QuestionCreate'
import QuizPublish from './QuizPublish'


const Quiz = (props) => {
  const { getQuiz, quiz } = useContext(AdminQuizContext)
  const { id } = useParams()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [createMode,setCreateMode] = useState(false)

  useEffect(() => {
    getQuiz({
      id, setLoading, setError
    })
  },[])

  return(
    <div className="quiz">
       <div className="row mx-0">

         {loading && <div className="col-12 text-center text-muted p-4 mt-5">
           Loading ...
         </div>}

         {error && <div className="col-12 p-5 text-center">
           <p>Not Found <i className="bx bx-error text-info"></i></p>
         </div>}

         {quiz && <div className="col-lg-10 my-5 p-4" style={{
           minHeight: '200px'
         }}>
           <div className="d-flex  align-items-center text-muted">
             <h3 title="Quiz title">{quiz.title}</h3>
             <div style={{fontSize: '10px'}} className="d-flex ml-auto align-items-center" title="Quiz duration">
               <i className="bx bx-timer text-info" style={{fontSize: '16px'}}></i>
               <span>{quiz.duration}min</span>
             </div>
           </div>

           <div className="d-flex my-3 bg-light p-3" style={{fontSize: '11px'}}>
             <div className="">
               Questions Count <span style={{fontSize: '12px'}} className="badge badge-info">{quiz.questionCount}</span>
             </div>
             <QuizPublish published={quiz.published} />
             <div onClick={e => setCreateMode(true)} className="d-flex text-info pointer">
               <i className="bx bx-plus"></i>
               <span>Add new question</span>
             </div>
           </div>

           {createMode && <QuestionCreate setEdit={setCreateMode}/>}

           <div className="questions list-group mt-3">
             {quiz.questions.map((q,i) => <QuizQuestion key={i} {...q} ans={q[q.answer]} />)}
           </div>
         </div>}


       </div>
    </div>
  )
}
export default Quiz
