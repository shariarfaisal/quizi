import React from 'react'
import { Link } from 'react-router-dom'


const UsersItem = ({ id, i, username }) => {
  return(
    <div style={{fontSize: '12px'}} className="list-group-item rounded-0 border-0 shadow bg-light my-2 p-3 d-flex">
      <div style={{width: '10%'}}>{i+1}</div>
      <Link style={{width: '30%'}} to={`/admin/users/${id}`}>{username}</Link>
      <Link style={{width: '30%'}} to={`/admin/users/${id}/submissions`}>Submissions</Link>
    </div>
  )
}
export default UsersItem
