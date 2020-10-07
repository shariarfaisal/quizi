import React,{ useState, useContext } from 'react'
import QuestionItemOption from './QuestionItemOption'
import { UserSubmissionContext } from '../../contexts/UserSubmissionContext'
import { useParams } from 'react-router-dom'


const QuestionItem = ({ id, name, optionA, optionB, optionC, optionD, answer: ans, counter }) => {
  const [answer,setAnswer] = useState('')
  const { makeAnswer } = useContext(UserSubmissionContext)
  const { id: submissionId } = useParams()

  const submitHandler = (e) => {
    makeAnswer({
      questionId: id,
      submissionId,
      payloads:{ answer }
    })
  }

  return(
    <div className="list-group-item px-5 py-4 shadow border-0 rounded-0 my-2 bg-light">
      <h5 className="d-flex align-items-center"><i className="bx bx-md bxl-quora mr-2">.</i>{name}</h5>

      {!ans && counter && counter !== 'Time over' && <div className="row mx-0">
        <QuestionItemOption
          id={id+'optionA'}
          name={id+'answer'}
          answer='optionA'
          setAnswer={setAnswer}
          option={optionA}
          ans={ans}
          checked={ans && ans.answer === 'optionA'? true : false}
        />
        <QuestionItemOption
          id={id+"optionB"}
          name={id+'answer'}
          answer='optionB'
          setAnswer={setAnswer}
          option={optionB}
          checked={ ans && ans.answer === 'optionB'? true : false}
        />
        <QuestionItemOption
          id={id+'optionC'}
          name={id+'answer'}
          answer='optionC'
          setAnswer={setAnswer}
          option={optionC}
          checked={ ans && ans.answer === 'optionC'? true : false}
        />
        <QuestionItemOption
          id={id+'optionD'}
          name={id+'answer'}
          answer='optionD'
          setAnswer={setAnswer}
          option={optionD}
          checked={ans && ans.answer === 'optionD'? true : false}
        />

        <div className="col-10 p-2">
          <button onClick={submitHandler} style={{borderRadius: '20px'}} className="btn btn-sm btn-info px-4" type="button">Submit</button>
        </div>

      </div>}

      {(ans || counter === 'Time over') && <div className="row mx-0" style={{fontSize: '12px'}}>
        <div className="col-6 py-2">
          <strong>A.</strong><span>{optionA}</span>
        </div>
        <div className="col-6 py-2">
          <strong>B.</strong><span>{optionB}</span>
        </div>
        <div className="col-6 py-2">
          <strong>C.</strong><span>{optionC}</span>
        </div>
        <div className="col-6 py-2">
          <strong>D.</strong><span>{optionD}</span>
        </div>

        {ans && <div className="col-12 d-flex py-2">
          <div>
            <strong>Answered: </strong> <span className={`text-${ans.question.answer === ans.answer ? 'success': 'danger'}`}>{ans.answer}</span>
          </div>
          <div className="mx-3">
            <strong>Ans: </strong> <span>{ans.question.answer}</span>
          </div>
        </div>}

      </div>}




    </div>
  )
}
export default QuestionItem
