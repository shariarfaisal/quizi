import React from 'react'
import Nav from '../admin-layout/Nav'


const AdminLayout = ({ children }) => {
  return(
    <div className="wrapper layout">
      <div className="row mx-0 justify-content-center align-items-stretch" style={{minHeight: '100vh'}}>
        <div className="col-sm-3 bg-light">
          <Nav />
        </div>
        <div className="col-sm-9" >
          { children }
        </div>
      </div>
    </div>
  )
}
export default AdminLayout
