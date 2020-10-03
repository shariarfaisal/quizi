import React from 'react'
import Input from './Input'


const QuestionForm = ({
  submitHandler,
  name,setName,
  optionA,setOptionA,
  optionB,setOptionB,
  optionC,setOptionC,
  optionD,setOptionD,
  answer,setAnswer,
  loading,
  setEdit,
  error
}) => {
  return(
    <form className="slow-mo" onSubmit={submitHandler}>
      <p style={{fontSize: '12px'}} className="text-center text-danger">{error.msg && error.msg}</p>
      <div className="d-flex">
        <div className="input-group-prepend ml-3">
          <label className="input-group-text rounded-0 border-0" htmlFor="question"><i className="bx bxl-quora text-info"></i></label>
        </div>
        <input
          className="form-control rounded-0 mr-3 w-100 border-0"
          type="text"
          required
          id="question"
          value={name}
          name="name"
          onChange={e => setName(e.target.value)}
          placeholder="Question..."
        />
        <small style={{fontSize: '9px'}} className="d-block text-danger">{error.name && error.name}</small>
      </div>
      <div className="row mx-0">
        <Input error={error} setValue={setOptionA} name="optionA" label="A" value={optionA} />
        <Input error={error} setValue={setOptionB} name="optionB" label="B" value={optionB} />
        <Input error={error} setValue={setOptionC} name="optionC" label="C" value={optionC} />
        <Input error={error} setValue={setOptionD} name="optionD" label="D" value={optionD} />
      </div>
      <div className="d-flex">
        <div className="input-group-prepend ml-3">
          <label className="input-group-text rounded-0 border-0" htmlFor="answer">Answer: </label>
        </div>
        <select required name="answer" onChange={e => setAnswer(e.target.value)} value={answer} className="custom-select border-0 rounded-0 mr-3">
          <option value="">Select Option</option>
          <option value="optionA">Opton A</option>
          <option value="optionB">Opton B</option>
          <option value="optionC">Opton C</option>
          <option value="optionD">Opton D</option>
        </select>
        <small style={{fontSize: '9px'}} className="text-danger">{error.answer && error.answer}</small>
      </div>
      <div className="d-flex justify-content-end align-items-center pt-3" style={{fontSize: '12px'}}>
        <span onClick={e => setEdit(false)} className="mx-3 pointer text-danger">cancel</span>
        <button disabled={loading} style={{fontSize: '12px'}} type="submit" className="btn rounded-0 border-0 mx-3 pointer text-success">
          save
          {loading && <i className="bx bx-loader bx-spin"></i>}
        </button>
      </div>
    </form>
  )
}
export default QuestionForm
