import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({ quiz, user, result }) => {
  return(
    <div className="my-3 shadow bg-light d-flex align-items-center py-3 px-4">
      <div>
        <h4 className="mb-0">{quiz.title}</h4>
        <small className="text-muted"><Link to={`/admin/user/${user.id}`}>@{user.username}</Link></small>
      </div>
      <div className="ml-auto mr-5">
        <strong className="mx-2">Score: </strong>
        <span className="px-2">{result? result : 0}</span>/
        <span className="px-2">{quiz.questions.length}</span>
      </div>
      <div className="d-flex align-items-center">
        <i className="bx bx-time mr-2"></i>
        <span>{quiz.duration}min</span>
      </div>
    </div>
  )
}
export default Header
