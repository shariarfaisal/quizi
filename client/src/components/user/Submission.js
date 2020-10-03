import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserBaseContext } from '../contexts/UserBaseContext'
import QuestionItemOption from './QuestionItemOption'



const QuestionItem = ({ id, name, optionA, optionB, optionC, optionD }) => {
  const [answer,setAnswer] = useState('')
  return(
    <div className="list-group-item px-5 py-4 shadow border-0 rounded-0 my-2 bg-light">
      <h5 className="d-flex align-items-center"><i className="bx bx-md bxl-quora mr-2">.</i>{name}</h5>
      <div className="row mx-0">

        <QuestionItemOption id="optionA" answer={answer} setAnswer={setAnswer} option={optionA} />
        <QuestionItemOption id="optionB" answer={answer} setAnswer={setAnswer} option={optionB} />
        <QuestionItemOption id="optionC" answer={answer} setAnswer={setAnswer} option={optionC} />
        <QuestionItemOption id="optionD" answer={answer} setAnswer={setAnswer} option={optionD} />

      </div>
    </div>
  )
}

const Submission = (props) => {
  const { id } = useParams()
  const [data,setData] = useState(null)
  const { getSubmission } = useContext(UserBaseContext)

  const timeFunction = (prev,next) => {
    const diff = new Date() - new Date(prev)
    const value = next * 60 * 1000

    if(diff > value){
      return 'Time over'
    }

    return `${Math.floor((value - diff) / 60)}: ${(Math.floor((value - diff) / 60) * 60 ) - value - diff}`
  }

  useEffect(() => {
    getSubmission({ id, setData })
  },[])

  return(
    <div className="row mx-0 justify-content-center">
      {data && <div className="col-md-8 col-lg-6 my-5" style={{minHeight: '400px'}}>

        <div className="d-flex justify-content-between align-items-center bg-light my-3 p-4 text-muted shadow">
          <h4>{data.quiz.title}</h4>
          <span className="d-flex align-items-center" style={{fontSize: '10px'}}>
            <i className="bx bxs-time mr-2"></i>
            {timeFunction(data.createdAt,data.quiz.duration)}
          </span>
        </div>

        <div className="list-group">
          {data.quiz.questions.map((q,i) => <QuestionItem key={i} {...q} /> )}
        </div>

        <div className=" py-4 mb-5 text-center">
          <button style={{borderRadius: '20px'}} className="btn btn-success px-5" type="button">Get Result</button>
        </div>

      </div>}
    </div>
  )
}
export default Submission
