import React from 'react'
import { Link } from 'react-router-dom'

const QuizsItem = ({ i, id, title, duration, createdAt, published, questionCount }) => {
  return(
    <div style={{
      fontSize: '10px'
    }} className="list-group-item py-3 my-2 border-0 bg-light rounded-0 shadow-sm">
      <div className="d-flex justify-content-around align-items-center text-muted">
        <div style={{width: '8%'}}>#{i}</div>
        <div style={{
          whiteSpace: 'nowrap',
          width: '50%',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          paddingRight: '10px'
        }}>
          <Link className="text-info" to={`/admin/quiz/${id}`}>{title}</Link>
        </div>
        <div style={{width: '14%'}}>
          {published? <span className="text-success">Yes</span>: <span className="text-danger">No</span>}
        </div>
        <div style={{width: '14%'}}>{duration}min</div>
        <div style={{width: '14%'}}>{questionCount}</div>
      </div>
    </div>
  )
}
export default QuizsItem
