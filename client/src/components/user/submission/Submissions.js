import React,{ useContext, useEffect } from 'react'
import { UserSubmissionContext } from '../../contexts/UserSubmissionContext'
import SubmissionsItem from './SubmissionsItem'


const Submissions = (props) => {
  const { getSubmissions, submissions } = useContext(UserSubmissionContext)

  useEffect(() => {
    getSubmissions()
  },[])

  return(
    <div className="row mx-0 justify-content-center">
      <div className="col-sm-10 col-md-8 mb-5">
        <h2 className="text-center my-5 text-muted">Submissions</h2>
        <div className="list-group">

          <div style={{fontSize: '12px'}} className="list-group-item bg-dark text-light my-2 p-3 shadow border-0 rounded-0 d-flex align-items-center">
            <div style={{width: "10%"}}>#</div>
            <div style={{width: "60%"}}>Title</div>
            <div style={{width: "15%"}}>Duration</div>
            <div style={{width: "15%"}}>Result</div>
          </div>


          { submissions && submissions.map((s,i) => <SubmissionsItem key={i} i={i+1} {...s} />)}
        </div>
      </div>
    </div>
  )
}
export default Submissions
