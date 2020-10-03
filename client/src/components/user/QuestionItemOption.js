import React from 'react'

const QuestionItemOption = ({ id, setAnswer, answer, option, }) => {
  return (
    <div className="form-check col-6 p-2" style={{fontSize: '12px'}}>
      <input
        className="form-check-input"
        type="radio"
        name="answer"
        value={option}
        onChange={e => setAnswer(e.target.value)}
        id={id}
      />
      <label className="form-check-label ml-3" htmlFor={id}>
        {option}
      </label>
     </div>
  )
}

export default React.memo(QuestionItemOption)
