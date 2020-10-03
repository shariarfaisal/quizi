import React,{ useContext, useState } from 'react'
import { AdminQuizContext } from '../contexts/AdminQuizContext'
import { Link } from 'react-router-dom'


const CreateQuizForm = ({ setOpen }) => {
  const [title,setTitle] = useState('')
  const [duration,setDuration] = useState(5)
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState(null)
  const { createQuiz } = useContext(AdminQuizContext)

  const submitHandler = e => {
    e.preventDefault()
    createQuiz({
      payloads:{ title, duration },
      setLoading,
      setData,
      setError
    })
  }

  return(
    <form onSubmit={submitHandler} className="row mx-0"  style={{fontSize: '12px'}}>

      <div className="col-12 py-3 text-muted d-flex justify-content-between">
        <h5 className="">Create New Quiz</h5>
        <i onClick={e => setOpen(false)} className="bx bx-x text-danger pointer bx-md"></i>
      </div>


      {!data && <div className="col-12 row mx-0">
        <div>
          <small className="text-center text-danger">{error.msg && error.msg}</small>
        </div>
        <div className="form-group col-8">
          <label>Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={e =>setTitle(e.target.value)}
            placeholder="Quiz Title ..."
            className="form-control border-0 border-bottom"
          />
          <small style={{fontSize: '8px'}}  className="text-center text-danger">{error.title && error.title}</small>
        </div>
        <div className="form-group col-4">
          <label>Duration</label>
          <input
            type="number"
            onChange={e => setDuration(e.target.value)}
            placeholder="5 min"
            value={duration}
            required
            className="form-control border-0 border-bottom"
          />
          <small style={{fontSize: '8px'}} className="text-center text-danger">{error.duration && error.duration}</small>
        </div>
        <div className="col-12 py-3 text-center">
          <button disabled={loading || (!title || !duration)} style={{borderRadius: '20px'}} type="submit" className="btn btn-success px-4">
            Create
            {loading && <i className="bx bx-loader bx-spin text-muted"></i>}
          </button>
        </div>
      </div>}


      {data && <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <Link to={`/admin/quiz/${data.id}`} className="text-center my-4">{data.title}</Link>
      </div>}


    </form>
  )
}
export default CreateQuizForm
