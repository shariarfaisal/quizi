import React from 'react'
import QuestionItem from './QuestionItem'

const Questions = ({ answers, quiz, counter, status }) => {

  const checkAnswer = (id) => {
    return answers.find(i => {
      return i.question.id === id
    })
  }

  return(
    <div className="list-group">
      {quiz.questions.map((q,i) =>
        <QuestionItem key={i} {...q}
          counter={counter}
          status={status}
          answer={checkAnswer(q.id)}/>
      )}
    </div>
  )
}
export default Questions
