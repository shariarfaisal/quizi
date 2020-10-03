import React,{ useContext, useState } from 'react'
import { UserBaseContext } from '../contexts/UserBaseContext'


const TakeQuiz = (props) => {
  const { takeQuiz } = useContext(UserBaseContext)
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  const takeHandler = async (e) => {
    await takeQuiz({
      setData,
      setLoading,
      setError
    })
  }
console.log(data);
  return(
    <div className="col-md-6 col-lg-4 d-flex pointer justify-content-center  shadow p-5">
      {!data && <h5 className="text-info" onClick={takeHandler}>
        Take A Quize
        {loading && <i className="bx bx-loader bx-spin ml-3 text-muted"></i>}
      </h5>}
      {data && <div className="text-center text-success">
        <p className="mb-0">{data.title}</p>
        <small className="mb-4 d-block text-info">{data.duration}min</small>
        <button style={{borderRadius: '20px'}} className="btn btn-info mx-auto px-5" type="button">Get Start</button>
      </div>}
      {error && <div className="text-muted text-center">Not available</div>}
    </div>
  )
}
export default TakeQuiz
