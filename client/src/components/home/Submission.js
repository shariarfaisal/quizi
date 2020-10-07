import React,{ useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AdminSubmissionContext } from '../contexts/AdminSubmissionContext'
import QuestionsItem from './QuestionsItem'
import Header from './Header'


const Submission = (props) => {
  const { id } = useParams()
  const { getSubmission, submission } = useContext(AdminSubmissionContext)
  const [error,setError] = useState('')


  useEffect(() => {
    getSubmission({ id, setError })
  },[id])

  const checkAnswer = (id) => {
    return submission.answers.find(i => {
      return i.question.id === id
    })
  }


  return(
    <div className="row mx-0 justify-content-center">
      {!submission && !error &&  <div>Loading...</div>}
      {error && <div className="text-center m-5">Not Found</div>}

      {submission && <div style={{fontSize: '12px'}} className="col-10 my-5">

        <Header {...submission} />

        <div className="list-group">
          {submission.quiz.questions.map(
            (q,i) => <QuestionsItem
                        key={i}
                        {...q}
                        ans={checkAnswer(q.id)}
                      />
          )}
        </div>


      </div>}


    </div>
  )
}
export default Submission
