import React,{ useContext } from 'react'
import Quizs from './Quizs'
import { AdminQuizContext } from '../contexts/AdminQuizContext'
import CreateQuiz from './CreateQuiz'
import './style.scss'


const QuizContent = (props) => {
  const { quizs } = useContext(AdminQuizContext)
  return(
    <div className="quiz">
      <div className="row mx-0">
        <CreateQuiz />
        <div className="col-lg-10 p-3">
          <h3>Quiz list</h3>
          {!quizs && <p className="text-muted text-center">loading ...</p>}
          {quizs && <Quizs quizs={quizs} />}
        </div>
      </div>
    </div>
  )
}
export default QuizContent
