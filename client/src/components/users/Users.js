import React,{ useContext, useEffect } from 'react'
import UsersItem from './UsersItem'
import { AdminBaseContext } from '../contexts/AdminBaseContext'

const Users = (props) => {
  const { users, getUsers } = useContext(AdminBaseContext)

  useEffect(() => {
    getUsers()
  },[])

  return(
    <div className="row mx-0 justify-content-center">
      <div className="col-md-10 my-5">
        <h4 className="text-muted">Users</h4>
        <div className="list-group">
          {users && users.length === 0 && <div className="list-group-item rounded-0 border-0 my-2 p-3 text-center">No Users Found</div>}
          {users && users.map((user,i) => <UsersItem key={i} i={i} {...user} />)}

        </div>
      </div>
    </div>
  )
}
export default Users
