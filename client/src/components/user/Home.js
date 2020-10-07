import React,{ useContext, useEffect, useState } from 'react'
import { UserSubmissionContext } from '../contexts/UserSubmissionContext'
import { Link } from 'react-router-dom'

const Home = (props) => {
  const [loading,setLoading] = useState(false)
  const { quizs, getQuizs, takeQuiz } = useContext(UserSubmissionContext)

  useEffect(() => {
    getQuizs()
  },[])

  const quizTakingHandler = (id) => {
    takeQuiz({
      id,
      setLoading
    })
  }


  return(
    <div style={{minHeight: '80vh'}} className="row mx-0 justify-content-center mt-5">
      <div className="col-md-10 col-lg-8 my-5">

        <div className="list-group">

          <div style={{fontSize: '10px'}} className="list-group-item bg-dark text-light shadow-sm my-2 py-2 px-4 border-0 rounded-0 d-flex align-items-center">
            <div style={{width: '7%'}}>#</div>
            <div style={{width: '50%'}}>Title</div>
            <div style={{width: '15%'}}>Duration</div>
            <div style={{width: '10%'}}>Q Count</div>
            <div style={{width: '18%'}}>Actions</div>
          </div>

          {quizs && quizs.map((quiz,i) => (
            <div key={i} style={{fontSize: '10px'}} className="list-group-item list-group-item-info shadow-sm my-2 py-2 px-4 border-0 rounded-0 d-flex align-items-center">
              <div style={{width: '7%'}}>{i+1}</div>
              <div style={{width: '50%'}}>{quiz.title}</div>
              <div style={{width: '15%'}}>{quiz.duration}min</div>
              <div style={{width: '10%'}}>{quiz.questionCount}</div>
              <div style={{width: '18%'}}>
                <button onClick={e => quizTakingHandler(quiz.id)} style={{borderRadius: '20px'}} type="button" className="btn btn-sm px-4 btn-success">take</button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}
export default Home
