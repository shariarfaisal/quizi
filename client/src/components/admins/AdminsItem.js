import React from 'react'

const AdminsItem = ({ username, id }) => {
  return (
    <div className="list-group-item bg-light d-flex justify-content-around py-2 shadow-sm border-0 rounded-0 my-2">
      <div>{username}</div>
      <div>
        <span style={{fontSize: '10px', cursor: 'pointer'}} className="text-danger"><i className="bx bx-trash"></i> delete</span>
      </div>
    </div>
  )
}
export default AdminsItem
