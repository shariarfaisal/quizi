import React from 'react'


const QuestionItemOption = ({ id, name, setAnswer, answer, option, ans}) => {
  return (
    <div className="form-check col-6 p-2" style={{fontSize: '12px'}}>
      <input
        className="form-check-input"
        type="radio"
        name={name}
        value={answer}
        onChange={e => setAnswer(answer)}
        id={id}
      />
      <label className="form-check-label ml-3" htmlFor={id}>
        {option}
      </label>
     </div>
  )
}

export default React.memo(QuestionItemOption)
