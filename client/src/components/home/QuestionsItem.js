import React from 'react'

const QuestionsItem = ({ optionA, optionB, optionC, optionD, ans }) => {
  return (
    <div style={{fontSize: '11px'}} className="list-group-item my-2 shadow rounded-0 border-0 py-3 px-4">
      <div className="row mx-0">
        <div className="col-6 py-1">A. {optionA}</div>
        <div className="col-6 py-1">B. {optionB}</div>
        <div className="col-6 py-1">C. {optionC}</div>
        <div className="col-6 py-1">D. {optionD}</div>
      </div>
      {ans && <div className="mt-3 px-3 d-flex">
        <div className="mx-3"><strong>Answred: </strong><span className={`text-${ans.answer === ans.question.answer ? 'success': 'danger'}`}>{ans.answer}</span></div>
        <div className="mx-3"><strong>Right Ans: </strong><span>{ans.question.answer}</span></div>
      </div>}
    </div>
  )
}
export default QuestionsItem
