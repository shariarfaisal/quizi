import React,{ useContext, useState, useEffect } from 'react'
import { AdminBaseContext } from '../contexts/AdminBaseContext'
import AdminsItem from './AdminsItem'

const Admins = (props) => {
  const { admins, getAdmins } = useContext(AdminBaseContext)
  const [loading,setLoading] = useState(false)
  const [errors,setErrors] = useState('')

  useEffect(() => {
    getAdmins({
      setLoading,
      setErrors
    })
  },[])

  return(
    <div className="admins">
      <div className="row mx-0">
        <div className="list-group col-md-8 col-lg-6 m-5 p-4" style={{minHeight: '200px',fontSize: '14px'}}>
          <h3>Admins</h3>

          {loading && <div className="text-center py-5 text-muted">
            loading ...
          </div>}

          {errors && <div>
            <p className="text-danger text-center py-5 "><i className="bx bx-error bx-flashing"></i> Server Error</p>
          </div>}

          {admins && admins.map((admin,i) => <AdminsItem key={i} {...admin} />)}

        </div>
      </div>
    </div>
  )
}
export default Admins
