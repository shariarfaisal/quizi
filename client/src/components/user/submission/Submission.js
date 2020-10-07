import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserSubmissionContext } from '../../contexts/UserSubmissionContext'
import Header from './Header'
import Questions from './Questions'

const Submission = (props) => {
  const { id } = useParams()
  const [counter,setCounter] = useState(null)
  const { getSubmission, submission } = useContext(UserSubmissionContext)

  useEffect(() => {
    getSubmission({ id })
  },[])

  useEffect(() => {
    setTimeout(() => {
      if(submission){
        const createdAt = new Date(submission.createdAt).getTime()
        const duration = submission.quiz.duration * 60 * 1000
        const deadline = createdAt + duration
        const now = new Date().getTime()

        const due = deadline - now

        const dueSec = due/1000
        const dueMin = dueSec / 60
        const dueHour = Math.floor(dueMin) / 60

        if(due < 0){
          setCounter('Time over')
        }else{
          setCounter(`
            ${dueHour >= 1 ? Math.floor(dueHour)+':' : ''}
            ${Math.floor(dueMin)}:
            ${Math.floor((dueMin - Math.floor(dueMin)) * 60)}
          `)
        }

      }
    },1000)
  },[submission,counter])



  return(
    <div className="row mx-0 justify-content-center">
      {!(submission && counter) && <div className="col-3 mt-5 text-muted">Loading...</div> }

      {submission && counter &&  <div className="col-md-8 col-lg-6 my-5" style={{minHeight: '400px'}}>
        <Header
          title={submission.quiz.title}
          counter={counter}
          result={submission.result}
          wrong={submission.answers.length - submission.result}
          done={submission.answers.length === submission.quiz.questions.length}
        />
        {submission && counter && <Questions
          {...submission}
          counter={counter}
        />}

      </div>}

    </div>
  )
}
export default Submission
