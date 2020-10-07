import React,{ useContext } from 'react'
import Nav from './Nav'
import { AdminBaseContext } from '../../contexts/AdminBaseContext'

const AdminLayout = ({ children }) => {
  const { admin } = useContext(AdminBaseContext)
  return(
    <div className="wrapper layout">
      {!admin && <div className="text-muted">Loading...</div>}
      {admin && <div className="row mx-0 justify-content-center align-items-stretch" style={{minHeight: '100vh'}}>
        <div className="col-sm-3 bg-light">
          <Nav />
        </div>
        <div className="col-sm-9" >
          { children }
        </div>
      </div>}
    </div>
  )
}
export default AdminLayout
